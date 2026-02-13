import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Edit, X, Upload, LogOut, Shield, Users, CalendarDays, Ban, CheckCircle, UserPlus, ArrowUp, ArrowDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Event, AdminUser } from "@shared/schema";

type Tab = "events" | "users";

export default function Admin() {
  const { user, isLoading: authLoading, isAuthenticated, login, loginError, isLoggingIn, logout, isLoggingOut } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<Tab>("events");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    registrationLink: "",
    registrationLinkText: "Register Now",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserName, setNewUserName] = useState("");

  const { data: adminCheck, isLoading: adminCheckLoading, error: adminError } = useQuery({
    queryKey: ["/api/admin/check"],
    queryFn: async () => {
      const res = await fetch("/api/admin/check", { credentials: "include" });
      if (!res.ok) {
        throw new Error(`${res.status}: ${await res.text()}`);
      }
      return res.json();
    },
    enabled: isAuthenticated,
    retry: false,
  });

  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ["/api/events"],
    queryFn: async () => {
      const res = await fetch("/api/events");
      if (!res.ok) throw new Error("Failed to fetch events");
      return res.json() as Promise<Event[]>;
    },
    enabled: !!adminCheck?.isAdmin,
  });

  const { data: adminUsers, isLoading: usersLoading } = useQuery({
    queryKey: ["/api/admin/users"],
    queryFn: async () => {
      const res = await fetch("/api/admin/users", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json() as Promise<AdminUser[]>;
    },
    enabled: !!adminCheck?.isAdmin && activeTab === "users",
  });

  const createMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch("/api/admin/events", {
        method: "POST",
        body: data,
        credentials: "include",
      });
      if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({ title: "Event created successfully" });
      resetForm();
    },
    onError: (error: Error) => {
      toast({ title: "Failed to create event", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: FormData }) => {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: "PATCH",
        body: data,
        credentials: "include",
      });
      if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({ title: "Event updated successfully" });
      resetForm();
    },
    onError: (error: Error) => {
      toast({ title: "Failed to update event", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({ title: "Event deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to delete event", description: error.message, variant: "destructive" });
    },
  });

  const reorderMutation = useMutation({
    mutationFn: async (orderedIds: number[]) => {
      const res = await fetch("/api/admin/events/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds }),
        credentials: "include",
      });
      if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to reorder events", description: error.message, variant: "destructive" });
    },
  });

  const moveEvent = (index: number, direction: "up" | "down") => {
    if (!events) return;
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= events.length) return;
    const reordered = [...events];
    [reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]];
    reorderMutation.mutate(reordered.map((e) => e.id));
  };

  const addUserMutation = useMutation({
    mutationFn: async (data: { email: string; displayName: string }) => {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({ message: "Failed to add user" }));
        throw new Error(errBody.message);
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "User added successfully" });
      setIsUserDialogOpen(false);
      setNewUserEmail("");
      setNewUserName("");
    },
    onError: (error: Error) => {
      toast({ title: "Failed to add user", description: error.message, variant: "destructive" });
    },
  });

  const toggleBanMutation = useMutation({
    mutationFn: async ({ id, isBanned }: { id: number; isBanned: boolean }) => {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isBanned }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update user");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "User updated" });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to update user", description: error.message, variant: "destructive" });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete user");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "User removed" });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to remove user", description: error.message, variant: "destructive" });
    },
  });

  const resetForm = () => {
    setIsDialogOpen(false);
    setEditingEvent(null);
    setFormData({ title: "", description: "", registrationLink: "", registrationLinkText: "Register Now" });
    setImageFile(null);
    setImagePreview(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title || "",
      description: event.description || "",
      registrationLink: event.registrationLink || "",
      registrationLinkText: event.registrationLinkText || "Register Now",
    });
    setImagePreview(event.imageUrl);
    setIsDialogOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    if (formData.title) data.append("title", formData.title);
    if (formData.description) data.append("description", formData.description);
    if (formData.registrationLink) data.append("registrationLink", formData.registrationLink);
    if (formData.registrationLink && formData.registrationLinkText) data.append("registrationLinkText", formData.registrationLinkText);

    if (editingEvent) {
      if (imageFile) data.append("image", imageFile);
      updateMutation.mutate({ id: editingEvent.id, data });
    } else {
      if (!imageFile) {
        toast({ title: "Image is required", variant: "destructive" });
        return;
      }
      data.append("image", imageFile);
      createMutation.mutate(data);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email: loginEmail, password: loginPassword });
    } catch {
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-secondary/30">
          <Card className="max-w-md w-full mx-4">
            <CardHeader className="text-center">
              <Shield className="h-16 w-16 mx-auto text-primary mb-4" />
              <CardTitle className="text-2xl">Admin Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    data-testid="input-login-email"
                    id="login-email"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="admin@gicmasjid.org"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    data-testid="input-login-password"
                    id="login-password"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password"
                    className="mt-1"
                    required
                  />
                </div>
                {loginError && (
                  <p className="text-sm text-destructive" data-testid="text-login-error">
                    {loginError.message}
                  </p>
                )}
                <Button
                  data-testid="button-login"
                  type="submit"
                  className="w-full rounded-full bg-primary"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  if (adminCheckLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (adminError) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-secondary/30">
          <Card className="max-w-md w-full mx-4">
            <CardHeader className="text-center">
              <X className="h-16 w-16 mx-auto text-destructive mb-4" />
              <CardTitle className="text-2xl">Access Denied</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                Only authorized accounts can access the admin panel.
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Signed in as: {user?.email}
              </p>
              <Button
                variant="outline"
                className="w-full rounded-full"
                onClick={() => logout()}
                disabled={isLoggingOut}
              >
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-secondary/30 py-12">
        <div className="max-w-7xl mx-auto container px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Admin Panel</h1>
              <p className="text-muted-foreground">Signed in as {user?.email}</p>
            </div>
            <Button
              data-testid="button-logout"
              variant="outline"
              className="rounded-full"
              onClick={() => logout()}
              disabled={isLoggingOut}
            >
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </div>

          <div className="flex gap-2 mb-8 border-b">
            <button
              data-testid="tab-events"
              onClick={() => setActiveTab("events")}
              className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "events"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <CalendarDays className="h-4 w-4" />
              Events
            </button>
            <button
              data-testid="tab-users"
              onClick={() => setActiveTab("users")}
              className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "users"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users className="h-4 w-4" />
              Users
            </button>
          </div>

          {activeTab === "events" && (
            <>
              <div className="flex justify-end mb-6">
                <Button data-testid="button-add-event" onClick={openCreateDialog} className="rounded-full bg-primary">
                  <Plus className="mr-2 h-4 w-4" /> Add Event
                </Button>
              </div>

              {eventsLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : events && events.length > 0 ? (
                <div className="space-y-3">
                  {events.map((event, index) => (
                    <Card key={event.id} className="overflow-hidden">
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="flex flex-col gap-1 shrink-0">
                          <Button
                            data-testid={`button-move-up-${event.id}`}
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => moveEvent(index, "up")}
                            disabled={index === 0 || reorderMutation.isPending}
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button
                            data-testid={`button-move-down-${event.id}`}
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => moveEvent(index, "down")}
                            disabled={index === events.length - 1 || reorderMutation.isPending}
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="h-20 w-16 rounded-md overflow-hidden shrink-0">
                          <img
                            src={event.imageUrl}
                            alt={event.title || "Event"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">{event.title || "Untitled Event"}</h3>
                          {event.description && (
                            <p className="text-sm text-muted-foreground line-clamp-1">{event.description}</p>
                          )}
                          {event.registrationLink && (
                            <p className="text-xs text-primary truncate mt-1">{event.registrationLink}</p>
                          )}
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <Button
                            data-testid={`button-edit-event-${event.id}`}
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(event)}
                          >
                            <Edit className="mr-1 h-3 w-3" /> Edit
                          </Button>
                          <Button
                            data-testid={`button-delete-event-${event.id}`}
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this event?")) {
                                deleteMutation.mutate(event.id);
                              }
                            }}
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground mb-4">No events yet. Create your first event!</p>
                  <Button onClick={openCreateDialog} className="rounded-full bg-primary">
                    <Plus className="mr-2 h-4 w-4" /> Add Event
                  </Button>
                </Card>
              )}
            </>
          )}

          {activeTab === "users" && (
            <>
              <div className="flex justify-end mb-6">
                <Button data-testid="button-add-user" onClick={() => setIsUserDialogOpen(true)} className="rounded-full bg-primary">
                  <UserPlus className="mr-2 h-4 w-4" /> Add User
                </Button>
              </div>

              {usersLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : adminUsers && adminUsers.length > 0 ? (
                <div className="space-y-3">
                  {adminUsers.map((adminUser) => (
                    <Card key={adminUser.id} className={`${adminUser.isBanned ? "opacity-60 border-destructive/30" : ""}`}>
                      <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-medium truncate" data-testid={`text-user-email-${adminUser.id}`}>
                              {adminUser.email}
                            </p>
                            {adminUser.isWhitelisted && (
                              <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                <CheckCircle className="h-3 w-3" /> Whitelisted
                              </span>
                            )}
                            {adminUser.isBanned && (
                              <span className="inline-flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                                <Ban className="h-3 w-3" /> Banned
                              </span>
                            )}
                          </div>
                          {adminUser.displayName && (
                            <p className="text-sm text-muted-foreground">{adminUser.displayName}</p>
                          )}
                          {adminUser.createdAt && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Added {new Date(adminUser.createdAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <Button
                            data-testid={`button-toggle-ban-${adminUser.id}`}
                            variant={adminUser.isBanned ? "default" : "outline"}
                            size="sm"
                            onClick={() =>
                              toggleBanMutation.mutate({
                                id: adminUser.id,
                                isBanned: !adminUser.isBanned,
                              })
                            }
                            disabled={toggleBanMutation.isPending}
                          >
                            {adminUser.isBanned ? (
                              <><CheckCircle className="mr-1 h-3 w-3" /> Unban</>
                            ) : (
                              <><Ban className="mr-1 h-3 w-3" /> Ban</>
                            )}
                          </Button>
                          <Button
                            data-testid={`button-delete-user-${adminUser.id}`}
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              if (confirm(`Remove ${adminUser.email} from the admin users list?`)) {
                                deleteUserMutation.mutate(adminUser.id);
                              }
                            }}
                            disabled={deleteUserMutation.isPending}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    No users in the admin list yet. You can add users here to whitelist them.
                  </p>
                  <Button onClick={() => setIsUserDialogOpen(true)} className="rounded-full bg-primary">
                    <UserPlus className="mr-2 h-4 w-4" /> Add User
                  </Button>
                </Card>
              )}
            </>
          )}
        </div>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingEvent ? "Edit Event" : "Add New Event"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="image">Event Image {!editingEvent && <span className="text-destructive">*</span>}</Label>
              <div className="mt-2">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(editingEvent?.imageUrl || null);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Click to upload image</span>
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
                {imageFile && (
                  <p className="text-xs text-muted-foreground mt-1">{imageFile.name}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="title">Title (optional)</Label>
              <Input
                data-testid="input-event-title"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Event title"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                data-testid="input-event-description"
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Event description"
                className="mt-1"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="registrationLink">Registration Link (optional)</Label>
              <Input
                data-testid="input-event-registration-link"
                id="registrationLink"
                value={formData.registrationLink}
                onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })}
                placeholder="https://..."
                className="mt-1"
              />
            </div>

            {formData.registrationLink && (
              <div>
                <Label htmlFor="registrationLinkText">Button Text</Label>
                <Input
                  data-testid="input-event-link-text"
                  id="registrationLinkText"
                  value={formData.registrationLinkText}
                  onChange={(e) => setFormData({ ...formData, registrationLinkText: e.target.value })}
                  placeholder="Register Now"
                  className="mt-1"
                />
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                data-testid="button-cancel"
                type="button"
                variant="outline"
                onClick={resetForm}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                data-testid="button-submit-event"
                type="submit"
                className="flex-1 bg-primary"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {(createMutation.isPending || updateMutation.isPending) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {editingEvent ? "Update Event" : "Create Event"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Whitelisted User</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!newUserEmail.trim()) return;
              addUserMutation.mutate({ email: newUserEmail.trim(), displayName: newUserName.trim() });
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="user-email">Email Address *</Label>
              <Input
                data-testid="input-user-email"
                id="user-email"
                type="email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                placeholder="user@example.com"
                className="mt-1"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                This user will be granted admin access even without a @gicmasjid.org email.
              </p>
            </div>

            <div>
              <Label htmlFor="user-name">Display Name (optional)</Label>
              <Input
                data-testid="input-user-name"
                id="user-name"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                placeholder="John Doe"
                className="mt-1"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsUserDialogOpen(false);
                  setNewUserEmail("");
                  setNewUserName("");
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                data-testid="button-submit-user"
                type="submit"
                className="flex-1 bg-primary"
                disabled={addUserMutation.isPending}
              >
                {addUserMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add User
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
