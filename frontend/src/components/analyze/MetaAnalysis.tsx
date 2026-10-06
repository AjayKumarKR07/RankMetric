import { FileText } from "lucide-react";

interface MetaData {
    title: string;
    description: string;
    canonical: string;
    robots: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    twitterCard: string;
    viewport: string;
    charset: string;
}

interface MetaAnalysisProps {
    metaData: MetaData;
}

export default function MetaAnalysis({
    metaData,
}: MetaAnalysisProps) {

    const fields = [
        {
            label: "Title",
            value: metaData.title,
            ideal: "50–60 characters",
            len: metaData.title.length,
        },
        {
            label: "Description",
            value: metaData.description,
            ideal: "150–160 characters",
            len: metaData.description.length,
        },
        {
            label: "Canonical URL",
            value: metaData.canonical,
        },
        {
            label: "Robots",
            value: metaData.robots,
        },
        {
            label: "Viewport",
            value: metaData.viewport,
        },
        {
            label: "Charset",
            value: metaData.charset,
        },
        {
            label: "OG Title",
            value: metaData.ogTitle,
        },
        {
            label: "OG Description",
            value: metaData.ogDescription,
        },
        {
            label: "OG Image",
            value: metaData.ogImage,
        },
        {
            label: "Twitter Card",
            value: metaData.twitterCard,
        },
    ];

    return (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">

            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <FileText
                    size={20}
                    className="text-primary"
                />
                Meta Tags Analysis
            </h3>

            <div className="space-y-4">

                {fields.map((field) => (

                    <div
                        key={field.label}
                        className="bg-muted/50 border border-border rounded-xl p-4"
                    >

                        <div className="flex items-center justify-between mb-2">

                            <span className="font-medium">
                                {field.label}
                            </span>

                            <div className="flex items-center gap-2">

                                {field.len !== undefined && (
                                    <span className="text-xs text-muted-foreground">
                                        {field.len} chars
                                    </span>
                                )}

                                <span
                                    className={`w-2 h-2 rounded-full ${
                                        field.value
                                            ? "bg-green-500"
                                            : "bg-red-500"
                                    }`}
                                />

                            </div>

                        </div>

                        {field.value ? (
                            <p className="text-sm break-all">
                                {field.value}
                            </p>
                        ) : (
                            <p className="text-sm italic text-red-500">
                                Missing
                            </p>
                        )}

                        {field.ideal && (
                            <p className="text-xs text-muted-foreground mt-2">
                                Ideal: {field.ideal}
                            </p>
                        )}

                    </div>

                ))}

            </div>

        </div>
    );
}