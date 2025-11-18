import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, Mail, Phone, MapPin, Calendar, LogOut, Fingerprint, Plus, Trash2 } from "lucide-react";
import { getUser, updateUser, addEmergencyContact, removeEmergencyContact, EmergencyContact } from "@/lib/localStorage";

export default function Profile() {
  const [user, setUser] = useState(getUser());
  const [isEditing, setIsEditing] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", relationship: "", phone: "" });
  const [formData, setFormData] = useState({
    firstName: user.name.split(" ")[0],
    lastName: user.name.split(" ")[1] || "",
    email: user.email,
    phone: user.phone,
    dateOfBirth: user.dateOfBirth,
    address: user.address,
    medicalHistory: user.medicalHistory,
    allergies: user.allergies,
    bloodType: user.bloodType,
  });

  const handleSaveChanges = () => {
    updateUser({
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      address: formData.address,
      medicalHistory: formData.medicalHistory,
      allergies: formData.allergies,
      bloodType: formData.bloodType,
    });
    setUser(getUser());
    setIsEditing(false);
  };

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      const contact: EmergencyContact = {
        id: `ec-${Date.now()}`,
        name: newContact.name,
        relationship: newContact.relationship,
        phone: newContact.phone
      };
      addEmergencyContact(contact);
      setUser(getUser());
      setNewContact({ name: "", relationship: "", phone: "" });
    }
  };

  const handleRemoveContact = (contactId: string) => {
    removeEmergencyContact(contactId);
    setUser(getUser());
  };

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
            <h3 className="font-semibold text-lg text-foreground mb-2">{user.name}</h3>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">Change Photo</Button>
              <Button variant="outline" size="sm">Remove</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Personal Information */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg text-foreground">Personal Information</h3>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-name">First Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                id="first-name" 
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                disabled={!isEditing}
                className="pl-10" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="last-name">Last Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                id="last-name"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                disabled={!isEditing}
                className="pl-10" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                id="email" 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                disabled={!isEditing}
                className="pl-10" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                disabled={!isEditing}
                className="pl-10" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                id="dob"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                disabled={!isEditing}
                className="pl-10" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                disabled={!isEditing}
                className="pl-10" 
              />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="blood-type">Blood Type</Label>
            <Input 
              id="blood-type"
              value={formData.bloodType}
              onChange={(e) => setFormData({...formData, bloodType: e.target.value})}
              disabled={!isEditing}
              placeholder="e.g., O+"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="allergies">Allergies</Label>
            <Input 
              id="allergies"
              value={formData.allergies}
              onChange={(e) => setFormData({...formData, allergies: e.target.value})}
              disabled={!isEditing}
              placeholder="List any allergies (comma-separated)"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="medical-history">Medical History</Label>
            <textarea 
              id="medical-history"
              value={formData.medicalHistory}
              onChange={(e) => setFormData({...formData, medicalHistory: e.target.value})}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
              rows={3}
              placeholder="Any significant medical conditions or past treatments"
            />
          </div>
        </div>
        {isEditing && <Button className="mt-4" onClick={handleSaveChanges}>Save Changes</Button>}
      </Card>

      {/* Medical Information */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg text-foreground mb-4">Medical Information</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Blood Type</p>
            <p className="font-semibold text-foreground">{user.bloodType}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Allergies</p>
            <p className="font-semibold text-foreground">{user.allergies}</p>
          </div>
        </div>
      </Card>

      {/* Emergency Contacts */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg text-foreground mb-4">Emergency Contacts</h3>
        <div className="space-y-4">
          {user.emergencyContacts.map((contact) => (
            <div key={contact.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-semibold text-foreground">{contact.name}</p>
                <p className="text-sm text-muted-foreground">{contact.relationship} • {contact.phone}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveContact(contact.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          
          <div className="border-t border-border pt-4">
            <p className="text-sm font-semibold text-foreground mb-3">Add New Contact</p>
            <div className="space-y-3">
              <Input 
                placeholder="Name"
                value={newContact.name}
                onChange={(e) => setNewContact({...newContact, name: e.target.value})}
              />
              <Input 
                placeholder="Relationship"
                value={newContact.relationship}
                onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
              />
              <Input 
                placeholder="Phone Number"
                value={newContact.phone}
                onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
              />
              <Button onClick={handleAddContact} size="sm" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Contact
              </Button>
            </div>
          </div>
        </div>
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
