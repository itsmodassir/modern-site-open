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

  const generateBillPDF = (bill: any) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error("Please allow popups to generate bill");
      return;
    }

    const billHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Bill ${bill.bill_number}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
            .header h1 { margin: 0; color: #333; }
            .info-section { display: flex; justify-content: space-between; margin: 30px 0; }
            .info-box { width: 48%; }
            .info-box h3 { margin: 0 0 10px 0; color: #666; font-size: 14px; text-transform: uppercase; }
            .info-box p { margin: 5px 0; }
            table { width: 100%; border-collapse: collapse; margin: 30px 0; }
            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background: #f5f5f5; font-weight: bold; }
            .totals { margin-top: 20px; text-align: right; }
            .totals table { width: 300px; margin-left: auto; }
            .total-row { font-weight: bold; font-size: 18px; }
            .footer { margin-top: 50px; text-align: center; color: #666; font-size: 12px; }
            @media print { .no-print { display: none; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>INVOICE</h1>
            <p>Bill Number: ${bill.bill_number}</p>
          </div>
          
          <div class="info-section">
            <div class="info-box">
              <h3>Bill To:</h3>
              <p><strong>${bill.client_name}</strong></p>
              ${bill.client_email ? `<p>Email: ${bill.client_email}</p>` : ''}
              ${bill.client_phone ? `<p>Phone: ${bill.client_phone}</p>` : ''}
            </div>
            <div class="info-box">
              <h3>Bill Details:</h3>
              <p>Date: ${new Date(bill.bill_date).toLocaleDateString()}</p>
              ${bill.due_date ? `<p>Due Date: ${new Date(bill.due_date).toLocaleDateString()}</p>` : ''}
              <p>Status: <strong>${bill.status.toUpperCase()}</strong></p>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th style="text-align: right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${bill.description}</td>
                <td style="text-align: right;">₹${bill.amount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          
          <div class="totals">
            <table>
              <tr>
                <td>Subtotal:</td>
                <td style="text-align: right;">₹${bill.amount.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Tax:</td>
                <td style="text-align: right;">₹${(bill.tax_amount || 0).toFixed(2)}</td>
              </tr>
              <tr class="total-row">
                <td>Total:</td>
                <td style="text-align: right;">₹${bill.total_amount.toFixed(2)}</td>
              </tr>
              ${bill.paid_amount > 0 ? `
              <tr>
                <td>Paid:</td>
                <td style="text-align: right;">₹${bill.paid_amount.toFixed(2)}</td>
              </tr>
              <tr class="total-row">
                <td>Balance Due:</td>
                <td style="text-align: right;">₹${(bill.total_amount - bill.paid_amount).toFixed(2)}</td>
              </tr>
              ` : ''}
            </table>
          </div>
          
          <div class="footer">
            <p>Thank you for your business!</p>
            <button class="no-print" onclick="window.print()" style="margin-top: 20px; padding: 10px 30px; background: #333; color: white; border: none; border-radius: 5px; cursor: pointer;">Print Bill</button>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(billHTML);
    printWindow.document.close();
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
                      <Button size="sm" variant="outline" onClick={() => generateBillPDF(bill)} title="Generate Bill">
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
