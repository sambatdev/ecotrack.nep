"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Bell, Lock, CreditCard, BarChart3, LogOut, Check } from "lucide-react"

interface UserProfile {
  name: string
  email: string
  accountType: string
  location: string
  company?: string
  role?: string
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "Alexandra Johnson",
    email: "alex.johnson@example.com",
    accountType: "personal",
    location: "San Francisco, CA",
  })

  const [editMode, setEditMode] = useState(false)
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    weeklyReport: true,
    disasterAlerts: true,
    newFeatures: true,
  })
  const [twoFA, setTwoFA] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  const handleProfileChange = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    setSaveMessage("Profile saved successfully!")
    setEditMode(false)
    setTimeout(() => setSaveMessage(""), 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Profile & Settings</h1>
          <p className="text-muted-foreground">Manage your account, preferences, and subscription.</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-card border">
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Lock className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="subscription" className="gap-2">
              <CreditCard className="w-4 h-4" />
              Subscription
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            {saveMessage && (
              <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
                <Check className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700 dark:text-green-200">{saveMessage}</AlertDescription>
              </Alert>
            )}

            <Card className="border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Personal Information</CardTitle>
                <Button
                  onClick={() => (editMode ? handleSave() : setEditMode(true))}
                  className={editMode ? "bg-primary hover:bg-primary/90" : ""}
                >
                  {editMode ? "Save Changes" : "Edit Profile"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Avatar */}
                <div className="flex items-center gap-6 pb-6 border-b">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold">
                    {profile.name.charAt(0)}
                  </div>
                  {editMode && <Button variant="outline">Change Avatar</Button>}
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Full Name</label>
                    <Input
                      value={profile.name}
                      onChange={(e) => handleProfileChange("name", e.target.value)}
                      disabled={!editMode}
                      className="border bg-card"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Email Address</label>
                    <Input
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleProfileChange("email", e.target.value)}
                      disabled={!editMode}
                      className="border bg-card"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Location</label>
                    <Input
                      value={profile.location}
                      onChange={(e) => handleProfileChange("location", e.target.value)}
                      disabled={!editMode}
                      className="border bg-card"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Account Type</label>
                    <Select value={profile.accountType} disabled={!editMode}>
                      <SelectTrigger className="border bg-card">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="corporate">Corporate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {profile.accountType === "corporate" && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Company Name</label>
                        <Input
                          value={profile.company || ""}
                          onChange={(e) => handleProfileChange("company", e.target.value)}
                          disabled={!editMode}
                          className="border bg-card"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Job Title</label>
                        <Input
                          value={profile.role || ""}
                          onChange={(e) => handleProfileChange("role", e.target.value)}
                          disabled={!editMode}
                          className="border bg-card"
                        />
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Account Statistics */}
            <Card className="border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Account Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-card border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Account Created</p>
                    <p className="font-semibold">March 2024</p>
                  </div>
                  <div className="text-center p-4 bg-card border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Total CO₂ Tracked</p>
                    <p className="font-semibold">156 tons</p>
                  </div>
                  <div className="text-center p-4 bg-card border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Days Streak</p>
                    <p className="font-semibold">42 days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="border">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {[
                    {
                      key: "emailAlerts",
                      title: "Email Alerts",
                      description: "Receive email notifications about your carbon tracking progress",
                    },
                    {
                      key: "weeklyReport",
                      title: "Weekly Report",
                      description: "Get a weekly summary of your emissions and optimization opportunities",
                    },
                    {
                      key: "disasterAlerts",
                      title: "Disaster Alerts",
                      description: "Receive alerts about extreme weather and disaster risks in your area",
                    },
                    {
                      key: "newFeatures",
                      title: "New Features",
                      description: "Stay informed about new features and product updates",
                    },
                  ].map((item) => (
                    <label
                      key={item.key}
                      className="flex items-start gap-4 p-4 hover:bg-muted rounded transition cursor-pointer"
                    >
                      <Checkbox
                        checked={notifications[item.key as keyof typeof notifications]}
                        onCheckedChange={() =>
                          setNotifications((prev) => ({
                            ...prev,
                            [item.key]: !prev[item.key as keyof typeof notifications],
                          }))
                        }
                        className="mt-1"
                      />
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <Button className="bg-primary hover:bg-primary/90">Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="border">
              <CardHeader>
                <CardTitle>Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Current Password</label>
                  <Input type="password" className="border bg-card" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">New Password</label>
                  <Input type="password" className="border bg-card" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Confirm New Password</label>
                  <Input type="password" className="border bg-card" />
                </div>
                <Button className="bg-primary hover:bg-primary/90">Update Password</Button>
              </CardContent>
            </Card>

            <Card className="border">
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4 p-4 bg-muted rounded-lg">
                  <div>
                    <p className="font-semibold">{twoFA ? "Enabled" : "Disabled"}</p>
                    <p className="text-sm text-muted-foreground">
                      {twoFA ? "Your account is protected with 2FA" : "Add an extra layer of security"}
                    </p>
                  </div>
                  <Button onClick={() => setTwoFA(!twoFA)} className={twoFA ? "bg-green-600 hover:bg-green-700" : ""}>
                    {twoFA ? "Disable" : "Enable"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border">
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-card border rounded">
                    <div>
                      <p className="font-semibold text-sm">Chrome on MacOS</p>
                      <p className="text-xs text-muted-foreground">Last active: 2 minutes ago</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded">
                      Current
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-card border rounded">
                    <div>
                      <p className="font-semibold text-sm">Safari on iPhone</p>
                      <p className="text-xs text-muted-foreground">Last active: 1 day ago</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Logout
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription" className="space-y-6">
            <Card className="border">
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-primary/10 to-transparent p-6 rounded-lg border border-primary/20 mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Active Plan</p>
                  <p className="text-3xl font-bold text-primary mb-2">Pro Plan</p>
                  <p className="text-sm text-muted-foreground mb-4">$29/month • Renews on May 15, 2025</p>
                  <Button className="bg-primary hover:bg-primary/90">Manage Billing</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border">
              <CardHeader>
                <CardTitle>Plan Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    "Unlimited carbon tracking logs",
                    "Advanced data center optimization",
                    "Priority disaster alerts",
                    "Export reports as PDF/CSV",
                    "Team collaboration (up to 5 users)",
                    "API access",
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border">
              <CardHeader>
                <CardTitle>Upgrade to Enterprise</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Get unlimited everything, dedicated support, custom integrations, and more.
                </p>
                <Button variant="outline">Contact Sales</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Logout */}
        <div className="mt-8 pt-6 border-t">
          <Button
            variant="outline"
            className="gap-2 border-red-200 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 bg-transparent"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
