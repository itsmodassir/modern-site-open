import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, Calendar } from "lucide-react";

export default function Attendance() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (employees.length > 0) {
      fetchAttendance();
    }
  }, [selectedDate, employees]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) navigate("/auth");
  };

  const fetchEmployees = async () => {
    const { data } = await supabase
      .from("employees")
      .select("*")
      .eq("status", "active")
      .order("full_name");
    
    if (data) setEmployees(data);
    setLoading(false);
  };

  const fetchAttendance = async () => {
    const { data } = await supabase
      .from("attendance")
      .select("*")
      .eq("date", selectedDate);
    
    if (data) setAttendance(data);
  };

  const markAttendance = async (employeeId: string, status: string) => {
    const existing = attendance.find(a => a.employee_id === employeeId);

    if (existing) {
      const { error } = await supabase
        .from("attendance")
        .update({ status })
        .eq("id", existing.id);
      
      if (error) {
        toast.error("Failed to update attendance");
      } else {
        toast.success("Attendance updated");
        fetchAttendance();
      }
    } else {
      const { error } = await supabase
        .from("attendance")
        .insert([{
          employee_id: employeeId,
          date: selectedDate,
          status,
        }]);
      
      if (error) {
        toast.error("Failed to mark attendance");
      } else {
        toast.success("Attendance marked");
        fetchAttendance();
      }
    }
  };

  const getAttendanceStatus = (employeeId: string) => {
    const record = attendance.find(a => a.employee_id === employeeId);
    return record?.status || "absent";
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
          <h1 className="text-3xl font-bold">Attendance Management</h1>
        </div>
        <div className="flex items-center gap-4">
          <Calendar className="h-5 w-5" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mark Attendance for {selectedDate}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((emp) => {
                const status = getAttendanceStatus(emp.id);
                return (
                  <TableRow key={emp.id}>
                    <TableCell className="font-medium">{emp.employee_id}</TableCell>
                    <TableCell>{emp.full_name}</TableCell>
                    <TableCell>{emp.designation}</TableCell>
                    <TableCell>
                      <Badge variant={status === "present" ? "default" : status === "absent" ? "destructive" : "secondary"}>
                        {status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select value={status} onValueChange={(value) => markAttendance(emp.id, value)}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="present">Present</SelectItem>
                          <SelectItem value="absent">Absent</SelectItem>
                          <SelectItem value="half_day">Half Day</SelectItem>
                          <SelectItem value="leave">Leave</SelectItem>
                          <SelectItem value="holiday">Holiday</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
