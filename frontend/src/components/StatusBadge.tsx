import { Badge } from "@/components/ui/badge";

export function StatusBadge({ status }: { status: 0 | 1 }) {
  if (status === 1) {
    return (
      <Badge className="bg-success text-success-foreground hover:bg-success/90">
        <span className="mr-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-success-foreground" />
        Plugged in
      </Badge>
    );
  }
  return (
    <Badge variant="secondary">
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground" />
      Dropped
    </Badge>
  );
}