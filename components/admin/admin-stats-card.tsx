import { cn } from "@/lib/utils";

export default function AdminStatsCard({
  all,
  approved,
  pending,
  rejected,
}: {
  all: number;
  approved: number;
  pending: number;
  rejected: number;
}) {
  const stats = [
    {
      label: "Total",
      count: all,
      color: "bg-primary/10",
    },
    {
      label: "Pending",
      count: pending,
      color: "bg-yellow-500/10",
    },
    {
      label: "Approved",
      count: approved,
      color: "bg-green-500/10",
    },
    {
      label: "Rejected",
      count: rejected,
      color: "bg-red-500/10",
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ label, count, color }) => (
        <div className={cn(color, "status-badge-card")} key={label}>
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="text-3xl font-bold">{count}</p>
        </div>
      ))}
    </div>
  );
}
