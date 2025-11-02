import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, Plus } from "lucide-react";

export default function Funds() {
  const navigate = useNavigate();
  const [allocations, setAllocations] = useState<any[]>([]);
  const [sites, setSites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    site_id: "",
    amount: "",
    purpose: "",
    allocation_date: new Date().toISOString().split('T')[0],
    notes: ""
  });

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) navigate("/auth");
  };

  const fetchData = async () => {
    const [allocRes, sitesRes] = await Promise.all([
      supabase.from("fund_allocations").select("*, sites(name)").order("allocation_date", { ascending: false }),
      supabase.from("sites").select("*")
    ]);

    if (allocRes.data) setAllocations(allocRes.data);
    if (sitesRes.data) setSites(sitesRes.data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { data: { session } } = await supabase.auth.getSession();

    const { error } = await supabase.from("fund_allocations").insert([{
      site_id: formData.site_id || null,
      amount: parseFloat(formData.amount),
      purpose: formData.purpose,
      allocation_date: formData.allocation_date,
      notes: formData.notes || null,
      allocated_by: session?.user.id,
      status: "allocated"
    }]);

    if (error) {
      toast.error("Failed to allocate funds");
    } else {
      toast.success("Funds allocated successfully!");
      setDialogOpen(false);
      fetchData();
      setFormData({
        site_id: "",
        amount: "",
        purpose: "",
        allocation_date: new Date().toISOString().split('T')[0],
        notes: ""
      });
    }
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("fund_allocations")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update status");
    } else {
      toast.success("Status updated");
      fetchData();
    }
  };

  const getTotalByStatus = (status: string) => {
    return allocations
      .filter(a => a.status === status)
      .reduce((sum, a) => sum + parseFloat(a.amount), 0);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Fund Management</h1>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Allocate Funds
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Allocate Funds</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="site_id">Site (Optional)</Label>
                <Select value={formData.site_id} onValueChange={(value) => setFormData({ ...formData, site_id: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select site" />
                  </SelectTrigger>
                  <SelectContent>
                    {sites.map(site => (
                      <SelectItem key={site.id} value={site.id}>{site.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="amount">Amount*</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="purpose">Purpose*</Label>
                <Input
                  id="purpose"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="allocation_date">Allocation Date</Label>
                <Input
                  id="allocation_date"
                  type="date"
                  value={formData.allocation_date}
                  onChange={(e) => setFormData({ ...formData, allocation_date: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full">Allocate Funds</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Allocated</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₹{getTotalByStatus("allocated").toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Utilized</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₹{getTotalByStatus("utilized").toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Returned</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₹{getTotalByStatus("returned").toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Fund Allocations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Site</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allocations.map((allocation) => (
                <TableRow key={allocation.id}>
                  <TableCell>{allocation.allocation_date}</TableCell>
                  <TableCell>{allocation.sites?.name || "General"}</TableCell>
                  <TableCell>{allocation.purpose}</TableCell>
                  <TableCell className="font-bold">₹{allocation.amount}</TableCell>
                  <TableCell>
                    <Badge variant={
                      allocation.status === "allocated" ? "default" :
                      allocation.status === "utilized" ? "secondary" : "outline"
                    }>
                      {allocation.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={allocation.status} 
                      onValueChange={(value) => updateStatus(allocation.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="allocated">Allocated</SelectItem>
                        <SelectItem value="utilized">Utilized</SelectItem>
                        <SelectItem value="returned">Returned</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
