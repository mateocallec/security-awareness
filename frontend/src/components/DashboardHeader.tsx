import { Link, useNavigate } from "react-router-dom";
import { LogOut, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "./ThemeToggle";

export function DashboardHeader() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
          <ShieldAlert className="h-6 w-6 text-primary" />
          <span>Security Awareness</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="hidden text-sm text-muted-foreground sm:inline">
            Signed in
          </span>
          <ThemeToggle />
          {/*<Button
            variant="outline"
            size="sm"
            onClick={() => {
              logout();
              navigate("/login", { replace: true });
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>*/}
        </div>
      </div>
    </header>
  );
}