interface Headings {
    h1: number;
    h2: number;
    h3: number;
    h4: number;
    h5: number;
    h6: number;
}

interface Links {
    total: number;
}

interface Images {
    total: number;
}

interface ContentAnalysisProps {
    wordCount: number;
    readingTime: number;
    pageSize: string;
    loadTime: string;
    headings: Headings;
    links: Links;
    images: Images;
}

export default function ContentAnalysis({
    wordCount,
    readingTime,
    pageSize,
    loadTime,
    headings,
    links,
    images,
}: ContentAnalysisProps) {

    const stats = [
        {
            label: "Word Count",
            value: wordCount.toLocaleString(),
        },
        {
            label: "Reading Time",
            value: `${readingTime} min`,
        },
        {
            label: "Page Size",
            value: pageSize,
        },
        {
            label: "Load Time",
            value: loadTime,
        },
        {
            label: "Total Links",
            value: links.total,
        },
        {
            label: "Total Images",
            value: images.total,
        },
        {
            label: "Total Headings",
            value:
                headings.h1 +
                headings.h2 +
                headings.h3 +
                headings.h4 +
                headings.h5 +
                headings.h6,
        },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Content Stats */}

            <div className="bg-card border border-border rounded-2xl p-6">

                <h3 className="text-lg font-semibold mb-4">
                    Content Stats
                </h3>

                <div className="space-y-4">

                    {stats.map((item) => (

                        <div
                            key={item.label}
                            className="flex justify-between items-center p-3 bg-muted/50 border border-border rounded-xl"
                        >
                            <span className="text-sm text-muted-foreground">
                                {item.label}
                            </span>

                            <span className="font-bold">
                                {item.value}
                            </span>

                        </div>

                    ))}

                </div>

            </div>

            {/* Heading Hierarchy */}

            <div className="bg-card border border-border rounded-2xl p-6">

                <h3 className="text-lg font-semibold mb-4">
                    Heading Hierarchy
                </h3>

                <div className="space-y-2">

                    {(["h1","h2","h3","h4","h5","h6"] as const).map((tag, index) => {

                        const count = headings[tag];

                        return (

                            <div
                                key={tag}
                                className="flex items-center gap-3 p-2.5 bg-muted/30 border border-border rounded-lg"
                                style={{
                                    paddingLeft: `${index * 12 + 12}px`,
                                }}
                            >

                                <span className="font-mono text-primary font-bold uppercase">
                                    &lt;{tag}&gt;
                                </span>

                                <span className="flex-1 text-sm">
                                    {count} {count === 1 ? "tag" : "tags"}
                                </span>

                            </div>

                        );

                    })}

                </div>

            </div>

        </div>
    );
}