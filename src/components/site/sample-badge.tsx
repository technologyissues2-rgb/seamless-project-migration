import { Badge } from "@/components/ui/badge";

/**
 * Marks figures as demonstration data until verified research data exists.
 * Never present invented numbers as real findings.
 */
export function SampleBadge({ label = "Sample data" }: { label?: string }) {
  return (
    <Badge
      variant="outline"
      className="border-dashed border-primary/40 bg-primary/5 text-[11px] font-semibold uppercase tracking-wider text-primary"
    >
      {label}
    </Badge>
  );
}
