import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Props {
  icon: LucideIcon;
  name: string;
  description: string;
}

export function ThreatCard({ icon: Icon, name, description }: Props) {
  return (
    <Card className="group relative overflow-hidden border-l-4 border-l-primary p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-danger">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-semibold leading-tight">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  );
}