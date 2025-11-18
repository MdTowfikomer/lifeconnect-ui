import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface QuickActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
  variant?: "default" | "emergency";
}

export default function QuickActionCard({ 
  icon: Icon, 
  title, 
  description, 
  to,
  variant = "default" 
}: QuickActionCardProps) {
  return (
    <Link 
      to={to}
      className={cn(
        "block p-6 rounded-xl border transition-all hover:scale-105 hover:shadow-lg",
        variant === "emergency" 
          ? "bg-emergency/5 border-emergency/20 hover:border-emergency/40" 
          : "bg-card border-border hover:border-primary/40"
      )}
    >
      <div className={cn(
        "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
        variant === "emergency" 
          ? "bg-emergency/10" 
          : "bg-primary/10"
      )}>
        <Icon className={cn(
          "w-6 h-6",
          variant === "emergency" ? "text-emergency" : "text-primary"
        )} />
      </div>
      <h3 className="font-semibold text-lg mb-2 text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Link>
  );
}
