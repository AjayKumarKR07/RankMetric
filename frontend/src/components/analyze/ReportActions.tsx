import { Download } from "lucide-react";

interface ReportActionsProps {
    analysisId: string;
}

export default function ReportActions({
    analysisId,
}: ReportActionsProps) {
    return (
        <div className="flex gap-3">

            <button
                onClick={() =>
                    window.open(
                        `http://localhost:5000/api/report/pdf/${analysisId}`,
                        "_blank"
                    )
                }
                className="bg-primary px-4 py-2 rounded-lg text-sm font-semibold text-primary-foreground flex items-center gap-2 hover:opacity-90"
                style={{ color: "var(--background)" }}
            >
                <Download size={18} />
                Download PDF
            </button>

        </div>
    );
}