import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { COMFORT_LABELS, INSERTION_REASONS, Questionnaire } from "@/lib/api";
import { ConfirmDelete } from "./ConfirmDelete";

interface Props {
  rows: Questionnaire[];
  onDelete: (sub: string) => Promise<void>;
  showBadusbColumn?: boolean;
  emptyMessage?: string;
}

export function QuestionnaireTable({ rows, onDelete, showBadusbColumn = true, emptyMessage = "No answers yet." }: Props) {
  if (rows.length === 0) {
    return (
      <div className="rounded-md border bg-muted/30 px-6 py-12 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {showBadusbColumn && <TableHead>BadUSB</TableHead>}
            <TableHead>Email</TableHead>
            <TableHead>Location found</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Comfort</TableHead>
            <TableHead>Malicious</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((q) => (
            <TableRow key={q.sub}>
              {showBadusbColumn && (
                <TableCell>
                  <Link
                    to={`/dashboard/badusb/${q.badusb_sub}`}
                    className="font-mono text-sm text-primary hover:underline"
                  >
                    {q.badusb_sub}
                  </Link>
                </TableCell>
              )}
              <TableCell className="text-sm">{q.email || "—"}</TableCell>
              <TableCell className="text-sm">{q.location_found}</TableCell>
              <TableCell className="text-sm">{INSERTION_REASONS[q.insertion_reason]}</TableCell>
              <TableCell className="text-sm">{COMFORT_LABELS[q.comfort_rating]}</TableCell>
              <TableCell>
                {q.malicious ? (
                  <Badge className="bg-warning text-warning-foreground hover:bg-warning/90">Yes</Badge>
                ) : (
                  <Badge variant="secondary">No</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <ConfirmDelete
                  title="Delete this answer?"
                  description="This will permanently remove the questionnaire response."
                  onConfirm={() => onDelete(q.sub)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}