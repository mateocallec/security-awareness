import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ShieldQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted px-4">
      <div className="max-w-md text-center">
        <ShieldQuestion className="mx-auto mb-6 h-16 w-16 text-primary" />
        <h1 className="mb-2 text-7xl font-extrabold tracking-tight">404</h1>
        <h2 className="mb-3 text-2xl font-semibold">Page not found</h2>
        <p className="mb-8 text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <Button asChild>
          <Link to="/dashboard">Go to dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
