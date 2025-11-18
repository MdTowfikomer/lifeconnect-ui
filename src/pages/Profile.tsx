import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, Mail, Phone, MapPin, Calendar, LogOut, Fingerprint } from "lucide-react";

export default function Profile() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Profile Picture */}
      <Card className="p-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-2">John Doe</h3>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">Change Photo</Button>
              <Button variant="outline" size="sm">Remove</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Personal Information */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg text-foreground mb-4">Personal Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-name">First Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="first-name" defaultValue="John" className="pl-10" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="last-name">Last Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="last-name" defaultValue="Doe" className="pl-10" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="email" type="email" defaultValue="john.doe@email.com" className="pl-10" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="phone" defaultValue="(555) 123-4567" className="pl-10" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="dob" defaultValue="1979-05-15" className="pl-10" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="address" defaultValue="123 Main St, Downtown" className="pl-10" />
            </div>
          </div>
        </div>
        <Button className="mt-4">Save Changes</Button>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg text-foreground mb-4">Notification Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Emergency Alerts</p>
              <p className="text-sm text-muted-foreground">Receive critical emergency notifications</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Appointment Reminders</p>
              <p className="text-sm text-muted-foreground">Get notified about upcoming appointments</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Medication Reminders</p>
              <p className="text-sm text-muted-foreground">Daily reminders for your medications</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Health Tips</p>
              <p className="text-sm text-muted-foreground">Weekly health and wellness tips</p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      {/* Security */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg text-foreground mb-4">Security</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Fingerprint className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Biometric Authentication</p>
                <p className="text-sm text-muted-foreground">Use fingerprint or face ID</p>
              </div>
            </div>
            <Switch />
          </div>
          <Button variant="outline" className="w-full">Change Password</Button>
          <Button variant="outline" className="w-full">Two-Factor Authentication</Button>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-destructive/20">
        <h3 className="font-semibold text-lg text-foreground mb-4">Account Actions</h3>
        <div className="space-y-3">
          <Button variant="outline" className="w-full">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
          <Button variant="destructive" className="w-full">
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  );
}
