import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, Calculator, Download } from "lucide-react";

export default function Salary() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<any[]>([]);
  const [salaryPayments, setSalaryPayments] = useState<any[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  useEffect(() => {
    checkAuth();
    fetchData();
  }, [selectedMonth, selectedYear]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) navigate("/auth");
  };

  const fetchData = async () => {
    const [empRes, salaryRes] = await Promise.all([
      supabase.from("employees").select("*, salary_structure(*)")
        .eq("status", "active")
        .order("full_name"),
      supabase.from("salary_payments").select("*, employees(full_name, employee_id)")
        .eq("month", selectedMonth)
        .eq("year", selectedYear)
    ]);

    if (empRes.data) setEmployees(empRes.data);
    if (salaryRes.data) setSalaryPayments(salaryRes.data);
    setLoading(false);
  };

  const calculateSalary = async (employee: any) => {
    const salaryStructure = employee.salary_structure[0];
    if (!salaryStructure) {
      toast.error("No salary structure found for this employee");
      return;
    }

    // Get attendance for the month
    const startDate = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-01`;
    const endDate = new Date(selectedYear, selectedMonth, 0).toISOString().split('T')[0];

    const { data: attendanceData } = await supabase
      .from("attendance")
      .select("status")
      .eq("employee_id", employee.id)
      .gte("date", startDate)
      .lte("date", endDate);

    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const presentDays = attendanceData?.filter(a => a.status === "present").length || 0;
    const halfDays = attendanceData?.filter(a => a.status === "half_day").length || 0;
    const totalPresentDays = presentDays + (halfDays * 0.5);
    const absentDays = daysInMonth - totalPresentDays;

    const basicSalary = parseFloat(salaryStructure.basic_salary);
    const allowances = 
      parseFloat(salaryStructure.hra || 0) +
      parseFloat(salaryStructure.transport_allowance || 0) +
      parseFloat(salaryStructure.other_allowances || 0);
    
    const grossSalary = basicSalary + allowances;
    const perDayAmount = grossSalary / daysInMonth;
    const deductions = perDayAmount * absentDays;
    const netSalary = grossSalary - deductions;

    setSelectedEmployee({
      ...employee,
      workingDays: daysInMonth,
      presentDays: totalPresentDays,
      absentDays,
      basicSalary,
      allowances,
      grossSalary,
      deductions,
      netSalary
    });
    setDialogOpen(true);
  };

  const saveSalaryPayment = async () => {
    if (!selectedEmployee) return;

    const { data: { session } } = await supabase.auth.getSession();

    const { error } = await supabase.from("salary_payments").insert([{
      employee_id: selectedEmployee.id,
      month: selectedMonth,
      year: selectedYear,
      basic_salary: selectedEmployee.basicSalary,
      allowances: selectedEmployee.allowances,
      gross_salary: selectedEmployee.grossSalary,
      deductions: selectedEmployee.deductions,
      net_salary: selectedEmployee.netSalary,
      working_days: selectedEmployee.workingDays,
      present_days: selectedEmployee.presentDays,
      absent_days: selectedEmployee.absentDays,
      status: "pending",
      created_by: session?.user.id
    }]);

    if (error) {
      toast.error("Failed to save salary payment");
    } else {
      toast.success("Salary payment saved successfully");
      setDialogOpen(false);
      fetchData();
    }
  };

  const markAsPaid = async (paymentId: string) => {
    const { error } = await supabase
      .from("salary_payments")
      .update({ 
        status: "paid",
        paid_on: new Date().toISOString().split('T')[0]
      })
      .eq("id", paymentId);

    if (error) {
      toast.error("Failed to mark as paid");
    } else {
      toast.success("Marked as paid");
      fetchData();
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
          <h1 className="text-3xl font-bold">Salary Management</h1>
        </div>
        <div className="flex gap-4">
          <Select value={selectedMonth.toString()} onValueChange={(v) => setSelectedMonth(parseInt(v))}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>
                  {new Date(0, i).toLocaleString('default', { month: 'long' })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedYear.toString()} onValueChange={(v) => setSelectedYear(parseInt(v))}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[2024, 2025, 2026].map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Calculate Salaries</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Basic Salary</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.filter(emp => emp.salary_structure.length > 0).map((emp) => (
                  <TableRow key={emp.id}>
                    <TableCell>{emp.employee_id}</TableCell>
                    <TableCell>{emp.full_name}</TableCell>
                    <TableCell>{emp.designation}</TableCell>
                    <TableCell>₹{emp.salary_structure[0]?.basic_salary}</TableCell>
                    <TableCell>
                      <Button size="sm" onClick={() => calculateSalary(emp)}>
                        <Calculator className="h-4 w-4 mr-2" />
                        Calculate
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Salary Payments for {new Date(0, selectedMonth - 1).toLocaleString('default', { month: 'long' })} {selectedYear}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Gross Salary</TableHead>
                  <TableHead>Deductions</TableHead>
                  <TableHead>Net Salary</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salaryPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.employees?.full_name} ({payment.employees?.employee_id})</TableCell>
                    <TableCell>₹{payment.gross_salary}</TableCell>
                    <TableCell>₹{payment.deductions}</TableCell>
                    <TableCell className="font-bold">₹{payment.net_salary}</TableCell>
                    <TableCell>
                      <Badge variant={payment.status === "paid" ? "default" : "secondary"}>
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {payment.status === "pending" && (
                          <Button size="sm" onClick={() => markAsPaid(payment.id)}>
                            Mark as Paid
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Slip
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Salary Calculation</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg">{selectedEmployee.full_name}</h3>
                <p className="text-sm text-muted-foreground">{selectedEmployee.employee_id}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Working Days:</span>
                  <span className="font-medium">{selectedEmployee.workingDays}</span>
                </div>
                <div className="flex justify-between">
                  <span>Present Days:</span>
                  <span className="font-medium">{selectedEmployee.presentDays}</span>
                </div>
                <div className="flex justify-between">
                  <span>Absent Days:</span>
                  <span className="font-medium">{selectedEmployee.absentDays}</span>
                </div>
                <div className="flex justify-between">
                  <span>Basic Salary:</span>
                  <span className="font-medium">₹{selectedEmployee.basicSalary.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Allowances:</span>
                  <span className="font-medium">₹{selectedEmployee.allowances.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Gross Salary:</span>
                  <span className="font-medium">₹{selectedEmployee.grossSalary.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Deductions:</span>
                  <span className="font-medium">-₹{selectedEmployee.deductions.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Net Salary:</span>
                  <span>₹{selectedEmployee.netSalary.toFixed(2)}</span>
                </div>
              </div>
              <Button onClick={saveSalaryPayment} className="w-full">
                Save Salary Payment
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
