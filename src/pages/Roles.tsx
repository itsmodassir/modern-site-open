import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function Roles() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [userRoles, setUserRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) navigate("/auth");

    // Check if user is admin
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id);

    const isAdmin = roles?.some(r => r.role === "admin");
    if (!isAdmin) {
      toast.error("Access denied. Admin only.");
      navigate("/dashboard");
    }
  };

  const fetchData = async () => {
    // Get all user roles with their email from auth metadata
    const { data: rolesData } = await supabase
      .from("user_roles")
      .select("*");

    // Get unique user IDs from roles
    const userIds = [...new Set(rolesData?.map(r => r.user_id) || [])];
    
    // Create user objects from the roles data
    const usersFromRoles = userIds.map(id => ({
      id,
      email: `User ${id.slice(0, 8)}...`, // Show partial ID
      created_at: new Date().toISOString()
    }));

    setUsers(usersFromRoles);
    if (rolesData) setUserRoles(rolesData);
    setLoading(false);
  };

  const assignRole = async () => {
    if (!selectedUserId || !selectedRole) {
      toast.error("Please enter user ID and select role");
      return;
    }

    const { error } = await supabase.from("user_roles").insert([{
      user_id: selectedUserId,
      role: selectedRole as "admin" | "manager" | "site_manager" | "cash_manager" | "fund_manager"
    }]);

    if (error) {
      if (error.code === "23505") {
        toast.error("User already has this role");
      } else {
        toast.error("Failed to assign role: " + error.message);
      }
    } else {
      toast.success("Role assigned successfully!");
      setDialogOpen(false);
      setSelectedUserId("");
      setSelectedRole("");
      fetchData();
    }
  };

  const removeRole = async (id: string) => {
    if (!confirm("Are you sure you want to remove this role?")) return;

    const { error } = await supabase.from("user_roles").delete().eq("id", id);
    
    if (error) {
      toast.error("Failed to remove role");
    } else {
      toast.success("Role removed successfully");
      fetchData();
    }
  };

  const getUserRoles = (userId: string) => {
    return userRoles.filter(r => r.user_id === userId);
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
          <h1 className="text-3xl font-bold">User Roles Management</h1>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Assign Role
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Role to User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>User ID</Label>
                <Input 
                  placeholder="Enter user ID" 
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Get user ID from authentication system
                </p>
              </div>
              <div>
                <Label>Select Role</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="site_manager">Site Manager</SelectItem>
                    <SelectItem value="cash_manager">Cash Manager</SelectItem>
                    <SelectItem value="fund_manager">Fund Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={assignRole} className="w-full">
                Assign Role
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users and Their Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => {
                const roles = getUserRoles(user.id);
                return (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.email}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 flex-wrap">
                        {roles.length > 0 ? (
                          roles.map(role => (
                            <Badge key={role.id} variant="default">
                              {role.role.replace("_", " ").toUpperCase()}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-muted-foreground">No roles assigned</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {roles.map(role => (
                        <Button
                          key={role.id}
                          variant="ghost"
                          size="icon"
                          onClick={() => removeRole(role.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      ))}
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
