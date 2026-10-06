import {
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";

export interface ChecklistItem {
  title: string;
  status: "pass" | "warning" | "fail";
  description?: string;
  recommendation?: string;
}

interface Props {
  items: ChecklistItem[];
}

export default function SeoChecklist({ items }: Props) {
  const passed = items.filter(
    (item) => item.status === "pass"
  ).length;

  const warnings = items.filter(
    (item) => item.status === "warning"
  ).length;

  const failed = items.filter(
    (item) => item.status === "fail"
  ).length;

  const health = Math.round(
    (passed / items.length) * 100
  );

  const getIcon = (
    status: ChecklistItem["status"]
  ) => {
    switch (status) {
      case "pass":
        return (
          <CheckCircle
            size={22}
            className="text-green-500"
          />
        );

      case "warning":
        return (
          <AlertTriangle
            size={22}
            className="text-yellow-500"
          />
        );

      default:
        return (
          <XCircle
            size={22}
            className="text-red-500"
          />
        );
    }
  };

  const getBadge = (
    status: ChecklistItem["status"]
  ) => {
    switch (status) {
      case "pass":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";

      case "warning":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";

      default:
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    }
  };

  return (
    <div className="glass rounded-2xl p-6 space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold">
            SEO Audit Checklist
          </h2>

          <p className="text-sm text-muted-foreground">
            Review your website SEO health.
          </p>
        </div>

        <div className="text-right">
          <div className="text-3xl font-bold text-blue-600">
            {health}%
          </div>

          <div className="text-sm text-muted-foreground">
            SEO Health
          </div>
        </div>

      </div>

      {/* Progress */}

      <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

        <div
          className="h-full bg-blue-600 transition-all"
          style={{
            width: `${health}%`,
          }}
        />

      </div>

      {/* Summary */}

      <div className="grid grid-cols-3 gap-4">

        <div className="rounded-xl bg-green-100 dark:bg-green-900/20 p-4 text-center">

          <div className="text-2xl font-bold text-green-600">
            {passed}
          </div>

          <div className="text-sm">
            Passed
          </div>

        </div>

        <div className="rounded-xl bg-yellow-100 dark:bg-yellow-900/20 p-4 text-center">

          <div className="text-2xl font-bold text-yellow-600">
            {warnings}
          </div>

          <div className="text-sm">
            Warnings
          </div>

        </div>

        <div className="rounded-xl bg-red-100 dark:bg-red-900/20 p-4 text-center">

          <div className="text-2xl font-bold text-red-600">
            {failed}
          </div>

          <div className="text-sm">
            Critical
          </div>

        </div>

      </div>

      {/* Checklist */}

      <div className="space-y-4">

        {items.map((item, index) => (

          <div
            key={index}
            className="rounded-xl border border-border p-5 hover:shadow-md transition"
          >

            <div className="flex items-start justify-between">

              <div className="flex gap-4">

                {getIcon(item.status)}

                <div>

                  <h3 className="font-semibold">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  )}

                  {item.recommendation && (
                    <p className="mt-2 text-sm text-blue-600">
                      💡 {item.recommendation}
                    </p>
                  )}

                </div>

              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getBadge(
                  item.status
                )}`}
              >
                {item.status}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}