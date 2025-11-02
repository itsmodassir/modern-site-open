import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, Plus, FileText } from "lucide-react";

export default function Bills() {
  const navigate = useNavigate();
  const [bills, setBills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    description: "",
    amount: "",
    tax_amount: "",
    bill_date: new Date().toISOString().split('T')[0],
    due_date: ""
  });

  useEffect(() => {
    checkAuth();
    fetchBills();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) navigate("/auth");
  };

  const fetchBills = async () => {
    const { data } = await supabase
      .from("bills")
      .select("*")
      .order("bill_date", { ascending: false });
    
    if (data) setBills(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { data: { session } } = await supabase.auth.getSession();
    const amount = parseFloat(formData.amount);
    const taxAmount = parseFloat(formData.tax_amount || "0");
    const totalAmount = amount + taxAmount;

    const { error } = await supabase.from("bills").insert([{
      bill_number: "",
      client_name: formData.client_name,
      client_email: formData.client_email || null,
      client_phone: formData.client_phone || null,
      description: formData.description,
      amount: amount,
      tax_amount: taxAmount,
      total_amount: totalAmount,
      bill_date: formData.bill_date,
      due_date: formData.due_date || null,
      status: "unpaid",
      paid_amount: 0,
      created_by: session?.user.id
    }]);

    if (error) {
      toast.error("Failed to create bill");
    } else {
      toast.success("Bill created successfully!");
      setDialogOpen(false);
      fetchBills();
      setFormData({
        client_name: "",
        client_email: "",
        client_phone: "",
        description: "",
        amount: "",
        tax_amount: "",
        bill_date: new Date().toISOString().split('T')[0],
        due_date: ""
      });
    }
  };

  const markAsPaid = async (id: string) => {
    const bill = bills.find(b => b.id === id);
    if (!bill) return;

    const { error } = await supabase
      .from("bills")
      .update({ 
        status: "paid",
        paid_amount: bill.total_amount
      })
      .eq("id", id);

    if (error) {
      toast.error("Failed to mark as paid");
    } else {
      toast.success("Bill marked as paid");
      fetchBills();
    }
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
          <h1 className="text-3xl font-bold">Bill Management</h1>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Generate Bill
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Generate New Bill</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client_name">Client Name*</Label>
                  <Input
                    id="client_name"
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="client_email">Client Email</Label>
                  <Input
                    id="client_email"
                    type="email"
                    value={formData.client_email}
                    onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="client_phone">Client Phone</Label>
                  <Input
                    id="client_phone"
                    value={formData.client_phone}
                    onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
                  />
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
                  <Label htmlFor="tax_amount">Tax Amount</Label>
                  <Input
                    id="tax_amount"
                    type="number"
                    step="0.01"
                    value={formData.tax_amount}
                    onChange={(e) => setFormData({ ...formData, tax_amount: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="bill_date">Bill Date</Label>
                  <Input
                    id="bill_date"
                    type="date"
                    value={formData.bill_date}
                    onChange={(e) => setFormData({ ...formData, bill_date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="due_date">Due Date</Label>
                  <Input
                    id="due_date"
                    type="date"
                    value={formData.due_date}
                    onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description*</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div className="bg-muted p-4 rounded">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount:</span>
                  <span>₹{(parseFloat(formData.amount || "0") + parseFloat(formData.tax_amount || "0")).toFixed(2)}</span>
                </div>
              </div>
              <Button type="submit" className="w-full">Generate Bill</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Bills</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bill Number</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Bill Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Tax</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bills.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell className="font-medium">{bill.bill_number}</TableCell>
                  <TableCell>{bill.client_name}</TableCell>
                  <TableCell>{bill.bill_date}</TableCell>
                  <TableCell>{bill.due_date || "-"}</TableCell>
                  <TableCell>₹{bill.amount}</TableCell>
                  <TableCell>₹{bill.tax_amount}</TableCell>
                  <TableCell className="font-bold">₹{bill.total_amount}</TableCell>
                  <TableCell>
                    <Badge variant={bill.status === "paid" ? "default" : bill.status === "cancelled" ? "destructive" : "secondary"}>
                      {bill.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {bill.status === "unpaid" && (
                        <Button size="sm" onClick={() => markAsPaid(bill.id)}>
                          Mark Paid
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
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
