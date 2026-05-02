import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Activity, ClipboardList, Loader2, Usb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api, BadUSB, Questionnaire } from "@/lib/api";
import { DashboardHeader } from "@/components/DashboardHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { CreateBadusbDialog } from "@/components/CreateBadusbDialog";
import { ConfirmDelete } from "@/components/ConfirmDelete";
import { QuestionnaireTable } from "@/components/QuestionnaireTable";
import { toast } from "@/hooks/use-toast";

interface Stats {
  badusb_total: number;
  badusb_plugged: number;
  questionnaire_answers: number;
}

function StatCard({ icon: Icon, label, value, accent }: { icon: any; label: string; value: number | string; accent: string }) {
  return (
    <Card className="shadow-card">
      <CardContent className="flex items-center gap-4 p-6">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${accent}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [badusbs, setBadusbs] = useState<BadUSB[]>([]);
  const [answers, setAnswers] = useState<Questionnaire[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const [s, b, q] = await Promise.all([
        api.getStats(),
        api.listBadusb(),
        api.listQuestionnaire(),
      ]);
      setStats({
        badusb_total: s.badusb_total,
        badusb_plugged: s.badusb_plugged,
        questionnaire_answers: s.questionnaire_answers,
      });
      setBadusbs(b.badusb_list);
      setAnswers(q.questionnaire_list);
    } catch (err) {
      toast({
        title: "Failed to load data",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function handleDeleteBadusb(sub: string) {
    await api.deleteBadusb(sub);
    toast({ title: "BadUSB deleted" });
    await refresh();
  }

  async function handleDeleteAnswer(sub: string) {
    await api.deleteQuestionnaire(sub);
    toast({ title: "Answer deleted" });
    await refresh();
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <DashboardHeader />
      <main className="container space-y-10 py-8">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            {/* Stats */}
            <section className="grid gap-4 sm:grid-cols-3">
              <StatCard
                icon={Usb}
                label="Total BadUSBs deployed"
                value={stats?.badusb_total ?? 0}
                accent="bg-primary/10 text-primary"
              />
              <StatCard
                icon={Activity}
                label="Currently plugged in"
                value={stats?.badusb_plugged ?? 0}
                accent="bg-success/10 text-success"
              />
              <StatCard
                icon={ClipboardList}
                label="Questionnaire answers"
                value={stats?.questionnaire_answers ?? 0}
                accent="bg-warning/10 text-warning"
              />
            </section>

            {/* BadUSB list */}
            <section>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>Deployed BadUSBs</CardTitle>
                  <CreateBadusbDialog onCreated={refresh} />
                </CardHeader>
                <CardContent>
                  {badusbs.length === 0 ? (
                    <div className="flex flex-col items-center gap-4 rounded-md border bg-muted/30 px-6 py-12 text-center">
                      <p className="text-sm text-muted-foreground">No BadUSBs deployed yet.</p>
                      <CreateBadusbDialog onCreated={refresh} triggerLabel="Add your first BadUSB" />
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Drop location</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {badusbs.map((u) => (
                            <TableRow key={u.sub}>
                              <TableCell>
                                <Link
                                  to={`/dashboard/badusb/${u.sub}`}
                                  className="font-medium text-primary hover:underline"
                                >
                                  {u.name}
                                </Link>
                                <div className="font-mono text-xs text-muted-foreground">{u.sub}</div>
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {u.drop_location || "—"}
                              </TableCell>
                              <TableCell>
                                <StatusBadge status={u.status} />
                              </TableCell>
                              <TableCell className="text-right">
                                <ConfirmDelete
                                  title={`Delete "${u.name}"?`}
                                  description="This will also delete all questionnaire answers for this device."
                                  onConfirm={() => handleDeleteBadusb(u.sub)}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>

            {/* Answers */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle>Questionnaire Answers</CardTitle>
                </CardHeader>
                <CardContent>
                  <QuestionnaireTable
                    rows={answers}
                    onDelete={handleDeleteAnswer}
                    emptyMessage="No questionnaire answers submitted yet."
                  />
                </CardContent>
              </Card>
            </section>
          </>
        )}
      </main>
    </div>
  );
}