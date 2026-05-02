import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  AlertTriangle,
  Lock,
  Keyboard,
  Monitor,
  FolderArchive,
  ShieldOff,
  Loader2,
  CheckCircle2,
  Usb,
  PartyPopper,
} from "lucide-react";
import { api, ApiError, INSERTION_REASONS, COMFORT_LABELS } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ThreatCard } from "@/components/ThreatCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "@/hooks/use-toast";

const THREATS = [
  { icon: Lock, name: "Ransomware", description: "Encrypts all your files and demands a ransom to restore them. You could permanently lose documents, photos, and work data." },
  { icon: Keyboard, name: "Keylogger", description: "Records every keystroke silently in the background. Passwords, credit card numbers and private messages all get sent to an attacker." },
  { icon: Monitor, name: "Remote Access Trojan (RAT)", description: "Gives an attacker full remote control of your PC. They can browse your files, turn on your webcam or microphone, and use your machine to attack others." },
  { icon: FolderArchive, name: "Data Stealer", description: "Silently exfiltrates saved passwords, cookies, browser history and documents to a remote server." },
  { icon: ShieldOff, name: "Antivirus Disabler", description: "Some payloads kill or blind your antivirus before running. Once protection is gone, any subsequent malware goes completely undetected." },
];

type Status = "loading" | "ready" | "not-found" | "error";

export default function HitPage() {
  const [params] = useSearchParams();
  const sub = params.get("id") ?? "";

  const [status, setStatus] = useState<Status>("loading");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [reason, setReason] = useState<string>("");
  const [comfort, setComfort] = useState<string>("");
  const [malicious, setMalicious] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!sub) {
      setStatus("not-found");
      return;
    }
    api
      .badusbHit(sub)
      .then(() => setStatus("ready"))
      .catch((e) => {
        if (e instanceof ApiError && e.status === 404) {
          setStatus("not-found");
        } else {
          setErrorMsg(e instanceof Error ? e.message : "Unexpected error");
          setStatus("error");
        }
      });
  }, [sub]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (reason === "" || comfort === "" || malicious === "" || !location.trim()) {
      toast({ title: "Please complete all required fields.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      await api.submitQuestionnaire(sub, {
        badusb_sub: sub,
        email: email.trim(),
        location_found: location.trim(),
        insertion_reason: Number(reason),
        comfort_rating: Number(comfort),
        malicious: malicious === "true",
      });
      setSubmitted(true);
    } catch (err) {
      toast({
        title: "Could not submit",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (status === "not-found") {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="max-w-md p-8 text-center">
          <ShieldOff className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <h1 className="mb-2 text-2xl font-semibold">This device was not recognised.</h1>
          <p className="text-muted-foreground">
            We could not match this identifier to a known device.
          </p>
        </Card>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="max-w-md p-8 text-center">
          <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-destructive" />
          <h1 className="mb-2 text-2xl font-semibold">Something went wrong</h1>
          <p className="text-muted-foreground">{errorMsg}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Alarming red banner */}
      <div className="sticky top-0 z-30 animate-pulse-danger bg-gradient-danger text-destructive-foreground shadow-danger">
        <div className="container flex items-center justify-between gap-3 py-3">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider">
            <AlertTriangle className="h-5 w-5" />
            Security Alert
          </div>
          <ThemeToggle />
        </div>
      </div>

      <main className="container max-w-5xl space-y-16 py-12">
        {/* Hero */}
        <section className="text-center">
          <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <AlertTriangle className="h-9 w-9 text-primary" />
          </div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            You could have been{" "}
            <span className="bg-gradient-danger bg-clip-text text-transparent">hacked!</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            This USB drive could have contained malicious software. Here is what
            could have happened to your machine.
          </p>
        </section>

        {/* Meme */}
        <section className="flex justify-center">
          <img
            src="/meme.jpg"
            alt="Security awareness meme"
            className="max-h-[480px] w-auto rounded-2xl shadow-lg"
          />
        </section>

        <section>
          <Card className="overflow-hidden border-2 border-dashed">
            <CardContent className="grid gap-6 p-6 md:grid-cols-3">
              {[
                { label: "You", color: "bg-primary text-primary-foreground", icon: "👀" },
                { label: "Random USB drive", color: "bg-warning text-warning-foreground", icon: "🔌" },
                { label: "Your data security", color: "bg-muted text-muted-foreground", icon: "😢" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center justify-center gap-3 rounded-lg border bg-card p-6 text-center"
                >
                  <div className="text-5xl">{item.icon}</div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${item.color}`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </CardContent>
            <div className="border-t bg-muted/40 px-6 py-3 text-center text-sm text-muted-foreground">
              "Distracted boyfriend" — but it's your data on the line.
            </div>
          </Card>
        </section>

        {/* Threats */}
        <section>
          <h2 className="mb-6 text-2xl font-bold">What could have happened</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {THREATS.map((t) => (
              <ThreatCard key={t.name} icon={t.icon} name={t.name} description={t.description} />
            ))}
          </div>
        </section>

        {/* Questionnaire */}
        <section>
          {submitted ? (
            <Card className="border-2 border-success/30 bg-success/5 p-10 text-center">
              <PartyPopper className="mx-auto mb-4 h-12 w-12 text-success" />
              <h2 className="mb-2 text-2xl font-bold">Thank you for your participation! 🎉</h2>
              <p className="text-muted-foreground">
                Your answers help raise awareness about USB security risks.
              </p>
            </Card>
          ) : (
            <Card className="p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <Usb className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-bold sm:text-2xl">
                  Help us understand — answer a few anonymous questions
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="space-y-2">
                  <Label htmlFor="email">Your email (optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">
                    Where did you find this USB drive? <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="location"
                    placeholder="e.g. Parking lot, meeting room, reception desk…"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label>
                    Why did you plug it in? <span className="text-destructive">*</span>
                  </Label>
                  <RadioGroup value={reason} onValueChange={setReason}>
                    {INSERTION_REASONS.map((label, idx) => (
                      <div key={idx} className="flex items-center space-x-2 rounded-md border p-3 transition-colors hover:bg-accent/5">
                        <RadioGroupItem value={String(idx)} id={`reason-${idx}`} />
                        <Label htmlFor={`reason-${idx}`} className="flex-1 cursor-pointer font-normal">
                          {label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label>
                    How comfortable did you feel plugging in a USB drive you found?{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <RadioGroup value={comfort} onValueChange={setComfort} className="grid gap-2 sm:grid-cols-5">
                    {COMFORT_LABELS.map((label, idx) => (
                      <label
                        key={idx}
                        htmlFor={`comfort-${idx}`}
                        className={`flex cursor-pointer flex-col items-center gap-2 rounded-md border p-3 text-center text-xs transition-colors hover:bg-accent/5 ${
                          comfort === String(idx) ? "border-primary bg-primary/5" : ""
                        }`}
                      >
                        <RadioGroupItem value={String(idx)} id={`comfort-${idx}`} className="sr-only" />
                        <span className="text-lg font-semibold">{idx + 1}</span>
                        <span className="text-muted-foreground">{label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label>
                    Did you suspect it could be malicious? <span className="text-destructive">*</span>
                  </Label>
                  <RadioGroup value={malicious} onValueChange={setMalicious} className="grid grid-cols-2 gap-2">
                    <label
                      htmlFor="mal-yes"
                      className={`flex cursor-pointer items-center justify-center gap-2 rounded-md border p-3 ${
                        malicious === "true" ? "border-primary bg-primary/5" : ""
                      }`}
                    >
                      <RadioGroupItem value="true" id="mal-yes" className="sr-only" />
                      Yes, I suspected it
                    </label>
                    <label
                      htmlFor="mal-no"
                      className={`flex cursor-pointer items-center justify-center gap-2 rounded-md border p-3 ${
                        malicious === "false" ? "border-primary bg-primary/5" : ""
                      }`}
                    >
                      <RadioGroupItem value="false" id="mal-no" className="sr-only" />
                      No, I did not
                    </label>
                  </RadioGroup>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                  )}
                  Send my answers
                </Button>
              </form>
            </Card>
          )}
        </section>
      </main>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        Security Awareness Experiment — Stay safe out there.
      </footer>
    </div>
  );
}