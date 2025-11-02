import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { 
  Users, Calendar, DollarSign, FileText, 
  TrendingUp, BarChart3, Briefcase, Shield,
  UserCircle, Settings, LogOut
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    setUserEmail(session.user.email || "");

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id);

    if (roles) {
      setUserRoles(roles.map(r => r.role));
    }
    
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  const hasRole = (role: string) => userRoles.includes(role);
  const isAdmin = hasRole("admin");
  const isManager = hasRole("manager");

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Employee Management System</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
              <UserCircle className="h-4 w-4" />
              {userEmail}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {userRoles.map(role => (
                <Badge key={role} variant="secondary">
                  {role.replace("_", " ").toUpperCase()}
                </Badge>
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={() => navigate("/settings")}>
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Employee Management */}
          {(isAdmin || isManager) && (
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/employees")}>
              <CardHeader>
                <Users className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Employee Management</CardTitle>
                <CardDescription>Manage employee records and details</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Add, edit, view employee information with auto-generated IDs
                </p>
              </CardContent>
            </Card>
          )}

          {/* Attendance */}
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/attendance")}>
            <CardHeader>
              <Calendar className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Attendance</CardTitle>
              <CardDescription>Track daily attendance records</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Mark attendance, manage leaves, view reports
              </p>
            </CardContent>
          </Card>

          {/* Salary Management */}
          {(isAdmin || hasRole("cash_manager") || isManager) && (
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/salary")}>
              <CardHeader>
                <DollarSign className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Salary Management</CardTitle>
                <CardDescription>Calculate and manage salaries</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Auto-calculate salary, generate slips, payment history
                </p>
              </CardContent>
            </Card>
          )}

          {/* Expenses */}
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/expenses")}>
            <CardHeader>
              <FileText className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Expenses</CardTitle>
              <CardDescription>Track and manage expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Record expenses, approve, generate reports
              </p>
            </CardContent>
          </Card>

          {/* Bills */}
          {(isAdmin || hasRole("cash_manager") || isManager) && (
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bills")}>
              <CardHeader>
                <FileText className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Bill Generation</CardTitle>
                <CardDescription>Create and manage bills</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Generate bills automatically, track payments
                </p>
              </CardContent>
            </Card>
          )}

          {/* Fund Management */}
          {(isAdmin || hasRole("fund_manager")) && (
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/funds")}>
              <CardHeader>
                <TrendingUp className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Fund Management</CardTitle>
                <CardDescription>Allocate and track funds</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Manage fund allocations, track utilization
                </p>
              </CardContent>
            </Card>
          )}

          {/* Sites/Projects */}
          {(isAdmin || isManager || hasRole("site_manager")) && (
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/sites")}>
              <CardHeader>
                <Briefcase className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Sites & Projects</CardTitle>
                <CardDescription>Manage construction sites</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Track projects, assign managers, monitor progress
                </p>
              </CardContent>
            </Card>
          )}

          {/* Work Progress */}
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/work-progress")}>
            <CardHeader>
              <BarChart3 className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Work Progress</CardTitle>
              <CardDescription>Track task progress</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Assign tasks, monitor completion, generate reports
              </p>
            </CardContent>
          </Card>

          {/* User Roles */}
          {isAdmin && (
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/roles")}>
              <CardHeader>
                <Shield className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>User Roles</CardTitle>
                <CardDescription>Manage user permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Assign roles to users, manage access control
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
