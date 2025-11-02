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
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { ArrowLeft, Plus } from "lucide-react";

export default function WorkProgress() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<any[]>([]);
  const [sites, setSites] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    site_id: "",
    task_name: "",
    description: "",
    assigned_to: "",
    start_date: "",
    end_date: "",
    progress_percentage: "0",
    status: "pending"
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
    const [tasksRes, sitesRes, empRes] = await Promise.all([
      supabase.from("work_progress").select("*, sites(name), employees(full_name, employee_id)").order("created_at", { ascending: false }),
      supabase.from("sites").select("*").eq("status", "active"),
      supabase.from("employees").select("*").eq("status", "active")
    ]);

    if (tasksRes.data) setTasks(tasksRes.data);
    if (sitesRes.data) setSites(sitesRes.data);
    if (empRes.data) setEmployees(empRes.data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { data: { session } } = await supabase.auth.getSession();

    const { error } = await supabase.from("work_progress").insert([{
      ...formData,
      assigned_to: formData.assigned_to || null,
      progress_percentage: parseInt(formData.progress_percentage),
      created_by: session?.user.id
    }]);

    if (error) {
      toast.error("Failed to create task");
    } else {
      toast.success("Task created successfully!");
      setDialogOpen(false);
      fetchData();
      setFormData({
        site_id: "",
        task_name: "",
        description: "",
        assigned_to: "",
        start_date: "",
        end_date: "",
        progress_percentage: "0",
        status: "pending"
      });
    }
  };

  const updateProgress = async (id: string, progress: number, status: string) => {
    const { error } = await supabase
      .from("work_progress")
      .update({ 
        progress_percentage: progress,
        status: status
      })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update progress");
    } else {
      toast.success("Progress updated");
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
          <h1 className="text-3xl font-bold">Work Progress Tracking</h1>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="site_id">Site*</Label>
                  <Select value={formData.site_id} onValueChange={(value) => setFormData({ ...formData, site_id: value })} required>
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
                  <Label htmlFor="task_name">Task Name*</Label>
                  <Input
                    id="task_name"
                    value={formData.task_name}
                    onChange={(e) => setFormData({ ...formData, task_name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="assigned_to">Assign To</Label>
                  <Select value={formData.assigned_to} onValueChange={(value) => setFormData({ ...formData, assigned_to: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map(emp => (
                        <SelectItem key={emp.id} value={emp.id}>{emp.full_name} ({emp.employee_id})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="on_hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="end_date">End Date</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full">Create Task</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Site</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{task.task_name}</p>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>{task.sites?.name}</TableCell>
                  <TableCell>{task.employees ? `${task.employees.full_name} (${task.employees.employee_id})` : "-"}</TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <Progress value={task.progress_percentage} />
                      <span className="text-sm">{task.progress_percentage}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      task.status === "completed" ? "default" : 
                      task.status === "in_progress" ? "secondary" : 
                      "outline"
                    }>
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={task.progress_percentage.toString()} 
                      onValueChange={(value) => {
                        const progress = parseInt(value);
                        const status = progress === 100 ? "completed" : progress > 0 ? "in_progress" : "pending";
                        updateProgress(task.id, progress, status);
                      }}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 25, 50, 75, 100].map(val => (
                          <SelectItem key={val} value={val.toString()}>{val}%</SelectItem>
                        ))}
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
