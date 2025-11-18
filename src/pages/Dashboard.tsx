import QuickActionCard from "@/components/QuickActionCard";
import { Hospital, Ambulance, FolderOpen, CreditCard, AlertTriangle, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const recentActivity = [
    { id: 1, type: "Appointment", detail: "Checkup with Dr. Smith", date: "2 days ago" },
    { id: 2, type: "Report", detail: "Blood test results uploaded", date: "5 days ago" },
    { id: 3, type: "Prescription", detail: "Monthly medication refill", date: "1 week ago" },
  ];

  return (
    <div className="space-y-8">
      {/* Emergency Banner */}
      <Card className="bg-emergency/5 border-emergency/20 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emergency/10 rounded-full flex items-center justify-center animate-pulse">
              <AlertTriangle className="w-6 h-6 text-emergency" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">In Emergency?</h3>
              <p className="text-sm text-muted-foreground">Quick access to emergency services and nearby help</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-emergency text-emergency-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Call 911
            </button>
            <button className="px-6 py-3 bg-card border border-emergency/20 text-emergency rounded-lg font-semibold hover:bg-emergency/5 transition-colors">
              Report Accident
            </button>
          </div>
        </div>
      </Card>

      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Good Morning, John!</h2>
        <p className="text-muted-foreground">Here's your health dashboard overview</p>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-foreground">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <QuickActionCard
            icon={Hospital}
            title="Find Hospitals"
            description="Search nearby hospitals and check availability"
            to="/hospitals"
          />
          <QuickActionCard
            icon={Ambulance}
            title="Book Ambulance"
            description="Request emergency ambulance service"
            to="/ambulance"
          />
          <QuickActionCard
            icon={FolderOpen}
            title="Medical Vault"
            description="Access your medical records securely"
            to="/medical-vault"
          />
          <QuickActionCard
            icon={CreditCard}
            title="Emergency Card"
            description="View your emergency medical information"
            to="/emergency-card"
          />
          <QuickActionCard
            icon={AlertTriangle}
            title="Report Emergency"
            description="Alert nearby hospitals about accidents"
            to="/accident-report"
            variant="emergency"
          />
          <QuickActionCard
            icon={Activity}
            title="Health Metrics"
            description="Track your vitals and health data"
            to="/"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-foreground">Recent Activity</h3>
        <Card className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <Badge variant="secondary" className="mb-2">{activity.type}</Badge>
                  <p className="text-sm font-medium text-foreground">{activity.detail}</p>
                </div>
                <span className="text-sm text-muted-foreground">{activity.date}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
