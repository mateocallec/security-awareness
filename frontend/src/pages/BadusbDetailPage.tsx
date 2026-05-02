import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, MapPin, Usb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api, BadUSB, Questionnaire } from "@/lib/api";
import { DashboardHeader } from "@/components/DashboardHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { QuestionnaireTable } from "@/components/QuestionnaireTable";
import { toast } from "@/hooks/use-toast";

export default function BadusbDetailPage() {
  const { sub = "" } = useParams();
  const [device, setDevice] = useState<BadUSB | null>(null);
  const [answers, setAnswers] = useState<Questionnaire[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const [b, q] = await Promise.all([api.listBadusb(), api.listQuestionnaire()]);
      const found = b.badusb_list.find((u) => u.sub === sub) ?? null;
      setDevice(found);
      setNotFound(!found);
      setAnswers(q.questionnaire_list.filter((a) => a.badusb_sub === sub));
    } catch (err) {
      toast({
        title: "Failed to load",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [sub]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function handleDeleteAnswer(s: string) {
    await api.deleteQuestionnaire(s);
    toast({ title: "Answer deleted" });
    await refresh();
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <DashboardHeader />
      <main className="container space-y-6 py-8">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to dashboard
          </Link>
        </Button>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : notFound || !device ? (
          <Card className="p-10 text-center">
            <h2 className="text-lg font-semibold">Device not found</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              No BadUSB matches this identifier.
            </p>
          </Card>
        ) : (
          <>
            <Card className="shadow-card">
              <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Usb className="h-6 w-6" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">{device.name}</h1>
                    <p className="font-mono text-xs text-muted-foreground">{device.sub}</p>
                    {device.drop_location && (
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        {device.drop_location}
                      </p>
                    )}
                  </div>
                </div>
                <StatusBadge status={device.status} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Questionnaire answers for this device</CardTitle>
              </CardHeader>
              <CardContent>
                <QuestionnaireTable
                  rows={answers}
                  onDelete={handleDeleteAnswer}
                  showBadusbColumn={false}
                  emptyMessage="No answers submitted for this device yet."
                />
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}