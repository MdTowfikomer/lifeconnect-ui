import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Hospital, 
  Ambulance, 
  AlertTriangle,
  FolderOpen,
  CreditCard,
  Stethoscope,
  Building2,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Hospital, label: "Hospitals", path: "/hospitals" },
  { icon: Ambulance, label: "Ambulance", path: "/ambulance" },
  { icon: AlertTriangle, label: "Accident Reporting", path: "/accident-report" },
  { icon: FolderOpen, label: "Medical Vault", path: "/medical-vault" },
  { icon: CreditCard, label: "Emergency Card", path: "/emergency-card" },
  { icon: Stethoscope, label: "Doctor Portal", path: "/doctor-portal" },
  { icon: Building2, label: "Hospital Admin", path: "/hospital-admin" },
  { icon: User, label: "Profile", path: "/profile" },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border fixed h-full overflow-y-auto">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Hospital className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-foreground">LifeConnect</h1>
              <p className="text-xs text-muted-foreground">Health Intelligence</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Top Navbar */}
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
              <p className="text-sm text-muted-foreground">Stay healthy, stay connected</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-emergency text-emergency-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
                Emergency SOS
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">John Doe</p>
                  <p className="text-xs text-muted-foreground">Patient</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
