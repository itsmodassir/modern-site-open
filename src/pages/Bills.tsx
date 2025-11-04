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
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ArrowLeft, Plus, FileText } from "lucide-react";

export default function Bills() {
  const navigate = useNavigate();
  const [bills, setBills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    company_name: "",
    company_address: "",
    company_gstin: "",
    client_name: "",
    client_email: "",
    client_phone: "",
    client_address: "",
    client_gstin: "",
    description: "",
    amount: "",
    gst_enabled: false,
    gst_rate: "18",
    bill_date: new Date().toISOString().split('T')[0],
    due_date: ""
  });

  const calculateGST = () => {
    if (!formData.gst_enabled) return { cgst: 0, sgst: 0, total: 0 };
    const amount = parseFloat(formData.amount || "0");
    const rate = parseFloat(formData.gst_rate || "18");
    const gstTotal = (amount * rate) / 100;
    const cgst = gstTotal / 2;
    const sgst = gstTotal / 2;
    return { cgst, sgst, total: gstTotal };
  };

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
    const gst = calculateGST();
    const totalAmount = amount + gst.total;

    const billData = {
      bill_number: "",
      client_name: formData.client_name,
      client_email: formData.client_email || null,
      client_phone: formData.client_phone || null,
      description: formData.description,
      amount: amount,
      tax_amount: gst.total,
      total_amount: totalAmount,
      bill_date: formData.bill_date,
      due_date: formData.due_date || null,
      status: "unpaid",
      paid_amount: 0,
      created_by: session?.user.id
    };

    // Store additional GST details in localStorage for PDF generation
    const billMetadata = {
      company_name: formData.company_name,
      company_address: formData.company_address,
      company_gstin: formData.company_gstin,
      client_address: formData.client_address,
      client_gstin: formData.client_gstin,
      gst_enabled: formData.gst_enabled,
      gst_rate: formData.gst_rate,
      cgst: gst.cgst,
      sgst: gst.sgst
    };

    const { data: insertedBill, error } = await supabase
      .from("bills")
      .insert([billData])
      .select()
      .single();

    if (error) {
      toast.error("Failed to create bill");
    } else {
      // Store metadata for this bill
      localStorage.setItem(`bill_metadata_${insertedBill.id}`, JSON.stringify(billMetadata));
      
      toast.success("Bill created successfully!");
      setDialogOpen(false);
      fetchBills();
      setFormData({
        company_name: "",
        company_address: "",
        company_gstin: "",
        client_name: "",
        client_email: "",
        client_phone: "",
        client_address: "",
        client_gstin: "",
        description: "",
        amount: "",
        gst_enabled: false,
        gst_rate: "18",
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

    // Retrieve bill metadata
    const metadata = JSON.parse(localStorage.getItem(`bill_metadata_${bill.id}`) || '{}');
    const isGSTBill = metadata.gst_enabled;

    const billHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Bill ${bill.bill_number}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Arial', sans-serif; padding: 30px; max-width: 210mm; margin: 0 auto; background: white; }
            .invoice-container { border: 2px solid #333; padding: 20px; }
            
            .company-header { text-align: center; border-bottom: 3px solid #333; padding-bottom: 15px; margin-bottom: 20px; }
            .company-header h1 { font-size: 28px; color: #1a1a1a; margin-bottom: 5px; letter-spacing: 1px; }
            .company-header .company-details { font-size: 11px; line-height: 1.6; color: #555; margin-top: 8px; }
            .company-header .gstin { font-weight: bold; color: #000; margin-top: 5px; }
            
            .invoice-type { text-align: center; background: #f5f5f5; padding: 8px; margin: 15px 0; font-weight: bold; font-size: 16px; border: 1px solid #ddd; }
            
            .bill-info { display: flex; justify-content: space-between; margin: 20px 0; }
            .bill-info-box { width: 48%; border: 1px solid #ddd; padding: 12px; }
            .bill-info-box h3 { font-size: 12px; color: #666; text-transform: uppercase; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px; }
            .bill-info-box p { font-size: 13px; margin: 5px 0; line-height: 1.5; }
            .bill-info-box strong { color: #000; }
            
            .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; border: 1px solid #333; }
            .items-table th { background: #333; color: white; padding: 10px; text-align: left; font-size: 12px; }
            .items-table td { padding: 10px; border-bottom: 1px solid #ddd; font-size: 13px; }
            .items-table th:last-child, .items-table td:last-child { text-align: right; }
            
            .tax-summary { margin: 20px 0; border: 1px solid #ddd; }
            .tax-summary table { width: 100%; border-collapse: collapse; }
            .tax-summary th { background: #f5f5f5; padding: 8px; text-align: left; font-size: 11px; border: 1px solid #ddd; }
            .tax-summary td { padding: 8px; font-size: 12px; border: 1px solid #ddd; text-align: right; }
            
            .totals { width: 40%; margin-left: auto; border: 1px solid #333; margin-top: 20px; }
            .totals table { width: 100%; border-collapse: collapse; }
            .totals td { padding: 10px; font-size: 13px; border-bottom: 1px solid #ddd; }
            .totals td:last-child { text-align: right; font-weight: bold; }
            .total-row { background: #333; color: white !important; font-weight: bold; font-size: 16px; }
            .total-row td { border: none !important; color: white; }
            
            .amount-words { margin: 20px 0; padding: 12px; background: #f9f9f9; border: 1px solid #ddd; font-style: italic; }
            
            .footer { margin-top: 40px; border-top: 2px solid #333; padding-top: 20px; }
            .footer-content { display: flex; justify-content: space-between; }
            .footer-section { width: 48%; font-size: 12px; }
            .footer h4 { font-size: 13px; margin-bottom: 8px; }
            .signature-box { border-top: 1px solid #333; margin-top: 40px; padding-top: 10px; text-align: center; font-size: 12px; }
            
            .terms { margin-top: 20px; font-size: 11px; color: #666; line-height: 1.6; }
            .terms h4 { font-size: 12px; margin-bottom: 5px; color: #000; }
            
            @media print { 
              .no-print { display: none; }
              body { padding: 0; }
              .invoice-container { border: none; }
            }
            
            .print-button { 
              position: fixed; 
              top: 20px; 
              right: 20px; 
              padding: 12px 30px; 
              background: #333; 
              color: white; 
              border: none; 
              border-radius: 5px; 
              cursor: pointer; 
              font-size: 14px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            }
            .print-button:hover { background: #555; }
          </style>
        </head>
        <body>
          <button class="print-button no-print" onclick="window.print()">🖨️ Print Bill</button>
          
          <div class="invoice-container">
            <!-- Company Header -->
            <div class="company-header">
              <h1>${metadata.company_name || 'YOUR COMPANY NAME'}</h1>
              <div class="company-details">
                ${metadata.company_address || 'Company Address Line 1, City, State - PIN'}
              </div>
              ${isGSTBill ? `<div class="gstin">GSTIN: ${metadata.company_gstin || 'XXXXXXXXXXXX'}</div>` : ''}
            </div>
            
            <!-- Invoice Type -->
            <div class="invoice-type">
              ${isGSTBill ? 'TAX INVOICE (GST)' : 'INVOICE (NON-GST)'}
            </div>
            
            <!-- Bill Information -->
            <div class="bill-info">
              <div class="bill-info-box">
                <h3>Bill To:</h3>
                <p><strong>${bill.client_name}</strong></p>
                ${metadata.client_address ? `<p>${metadata.client_address}</p>` : ''}
                ${bill.client_email ? `<p>Email: ${bill.client_email}</p>` : ''}
                ${bill.client_phone ? `<p>Phone: ${bill.client_phone}</p>` : ''}
                ${isGSTBill && metadata.client_gstin ? `<p><strong>GSTIN:</strong> ${metadata.client_gstin}</p>` : ''}
              </div>
              <div class="bill-info-box">
                <h3>Invoice Details:</h3>
                <p><strong>Invoice No:</strong> ${bill.bill_number}</p>
                <p><strong>Date:</strong> ${new Date(bill.bill_date).toLocaleDateString('en-IN')}</p>
                ${bill.due_date ? `<p><strong>Due Date:</strong> ${new Date(bill.due_date).toLocaleDateString('en-IN')}</p>` : ''}
                <p><strong>Status:</strong> <span style="color: ${bill.status === 'paid' ? 'green' : 'red'};">${bill.status.toUpperCase()}</span></p>
              </div>
            </div>
            
            <!-- Items Table -->
            <table class="items-table">
              <thead>
                <tr>
                  <th style="width: 60px;">S.No</th>
                  <th>Description of Services/Goods</th>
                  <th style="width: 120px; text-align: right;">Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>${bill.description}</td>
                  <td style="text-align: right;">₹${bill.amount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            
            ${isGSTBill ? `
            <!-- GST Breakdown -->
            <div class="tax-summary">
              <table>
                <thead>
                  <tr>
                    <th>Taxable Amount</th>
                    <th style="text-align: center;">CGST (${(parseFloat(metadata.gst_rate) / 2)}%)</th>
                    <th style="text-align: center;">SGST (${(parseFloat(metadata.gst_rate) / 2)}%)</th>
                    <th style="text-align: right;">Total Tax</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="text-align: left;">₹${bill.amount.toFixed(2)}</td>
                    <td>₹${metadata.cgst?.toFixed(2) || '0.00'}</td>
                    <td>₹${metadata.sgst?.toFixed(2) || '0.00'}</td>
                    <td>₹${bill.tax_amount.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            ` : ''}
            
            <!-- Totals -->
            <div class="totals">
              <table>
                <tr>
                  <td>Subtotal:</td>
                  <td>₹${bill.amount.toFixed(2)}</td>
                </tr>
                ${isGSTBill ? `
                <tr>
                  <td>GST (${metadata.gst_rate}%):</td>
                  <td>₹${bill.tax_amount.toFixed(2)}</td>
                </tr>
                ` : ''}
                <tr class="total-row">
                  <td>TOTAL AMOUNT:</td>
                  <td>₹${bill.total_amount.toFixed(2)}</td>
                </tr>
                ${bill.paid_amount > 0 ? `
                <tr>
                  <td>Paid:</td>
                  <td style="color: green;">₹${bill.paid_amount.toFixed(2)}</td>
                </tr>
                <tr style="background: #fff3cd;">
                  <td>Balance Due:</td>
                  <td style="color: #d9534f;">₹${(bill.total_amount - bill.paid_amount).toFixed(2)}</td>
                </tr>
                ` : ''}
              </table>
            </div>
            
            <!-- Amount in Words -->
            <div class="amount-words">
              <strong>Amount in Words:</strong> <span id="amountInWords"></span> Rupees Only
            </div>
            
            <!-- Footer -->
            <div class="footer">
              <div class="footer-content">
                <div class="footer-section">
                  <h4>Payment Terms:</h4>
                  <p>Please make payment within due date.</p>
                  ${bill.due_date ? `<p>Due by: ${new Date(bill.due_date).toLocaleDateString('en-IN')}</p>` : ''}
                </div>
                <div class="footer-section" style="text-align: right;">
                  <h4>For ${metadata.company_name || 'Company Name'}</h4>
                  <div class="signature-box">
                    Authorized Signatory
                  </div>
                </div>
              </div>
              
              <div class="terms">
                <h4>Terms & Conditions:</h4>
                <p>1. Payment is due within the specified due date. Late payments may incur additional charges.</p>
                <p>2. All disputes subject to local jurisdiction only.</p>
                ${isGSTBill ? '<p>3. This is a computer-generated GST invoice and does not require physical signature.</p>' : ''}
              </div>
            </div>
          </div>
          
          <script>
            function numberToWords(num) {
              const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
              const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
              const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
              
              if (num === 0) return 'Zero';
              
              const crore = Math.floor(num / 10000000);
              num %= 10000000;
              const lakh = Math.floor(num / 100000);
              num %= 100000;
              const thousand = Math.floor(num / 1000);
              num %= 1000;
              const hundred = Math.floor(num / 100);
              num %= 100;
              
              let words = '';
              
              if (crore > 0) words += convertTens(crore) + ' Crore ';
              if (lakh > 0) words += convertTens(lakh) + ' Lakh ';
              if (thousand > 0) words += convertTens(thousand) + ' Thousand ';
              if (hundred > 0) words += ones[hundred] + ' Hundred ';
              if (num > 0) words += convertTens(num);
              
              return words.trim();
              
              function convertTens(n) {
                if (n < 10) return ones[n];
                if (n >= 10 && n < 20) return teens[n - 10];
                return tens[Math.floor(n / 10)] + ' ' + ones[n % 10];
              }
            }
            
            // Set amount in words on page load
            document.getElementById('amountInWords').textContent = numberToWords(${bill.total_amount});
          </script>
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
            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
              {/* Company Details Section */}
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-3">Company Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="company_name">Company Name*</Label>
                    <Input
                      id="company_name"
                      value={formData.company_name}
                      onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                      required
                      placeholder="Your Company Name"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="company_address">Company Address*</Label>
                    <Textarea
                      id="company_address"
                      value={formData.company_address}
                      onChange={(e) => setFormData({ ...formData, company_address: e.target.value })}
                      required
                      placeholder="Full company address"
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {/* GST Toggle */}
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <Label htmlFor="gst_enabled" className="text-base font-semibold">GST Bill</Label>
                  <p className="text-sm text-muted-foreground">Enable GST calculations</p>
                </div>
                <Switch
                  id="gst_enabled"
                  checked={formData.gst_enabled}
                  onCheckedChange={(checked) => setFormData({ ...formData, gst_enabled: checked })}
                />
              </div>

              {/* GST Details (conditional) */}
              {formData.gst_enabled && (
                <div className="border-b pb-4">
                  <h3 className="font-semibold mb-3">GST Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company_gstin">Company GSTIN*</Label>
                      <Input
                        id="company_gstin"
                        value={formData.company_gstin}
                        onChange={(e) => setFormData({ ...formData, company_gstin: e.target.value })}
                        required={formData.gst_enabled}
                        placeholder="00XXXXX0000X0X0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="gst_rate">GST Rate (%)*</Label>
                      <Input
                        id="gst_rate"
                        type="number"
                        step="0.01"
                        value={formData.gst_rate}
                        onChange={(e) => setFormData({ ...formData, gst_rate: e.target.value })}
                        required={formData.gst_enabled}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="client_gstin">Client GSTIN (if applicable)</Label>
                      <Input
                        id="client_gstin"
                        value={formData.client_gstin}
                        onChange={(e) => setFormData({ ...formData, client_gstin: e.target.value })}
                        placeholder="00XXXXX0000X0X0"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Client Details Section */}
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-3">Client Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
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
                  <div className="col-span-2">
                    <Label htmlFor="client_address">Client Address</Label>
                    <Textarea
                      id="client_address"
                      value={formData.client_address}
                      onChange={(e) => setFormData({ ...formData, client_address: e.target.value })}
                      placeholder="Client's full address"
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {/* Bill Details Section */}
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-3">Bill Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="description">Description*</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      placeholder="Describe the goods/services"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount">Base Amount*</Label>
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
                    <Label htmlFor="bill_date">Bill Date*</Label>
                    <Input
                      id="bill_date"
                      type="date"
                      value={formData.bill_date}
                      onChange={(e) => setFormData({ ...formData, bill_date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="due_date">Due Date</Label>
                    <Input
                      id="due_date"
                      type="date"
                      value={formData.due_date}
                      onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Calculation Summary */}
              <div className="bg-primary/5 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Base Amount:</span>
                  <span className="font-semibold">₹{parseFloat(formData.amount || "0").toFixed(2)}</span>
                </div>
                {formData.gst_enabled && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span>CGST ({(parseFloat(formData.gst_rate || "18") / 2).toFixed(2)}%):</span>
                      <span className="font-semibold">₹{calculateGST().cgst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>SGST ({(parseFloat(formData.gst_rate || "18") / 2).toFixed(2)}%):</span>
                      <span className="font-semibold">₹{calculateGST().sgst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm border-t pt-2">
                      <span>Total GST:</span>
                      <span className="font-semibold">₹{calculateGST().total.toFixed(2)}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between text-lg font-bold border-t-2 pt-2">
                  <span>Total Amount:</span>
                  <span>₹{(parseFloat(formData.amount || "0") + calculateGST().total).toFixed(2)}</span>
                </div>
              </div>

              <Button type="submit" className="w-full">Generate Professional Bill</Button>
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
