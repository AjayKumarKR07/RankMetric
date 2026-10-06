interface TechnicalSEOProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export default function TechnicalSEO({
    activeTab,
    onTabChange,
}: TechnicalSEOProps) {

    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "meta", label: "Meta" },
        { id: "content", label: "Content" },
        { id: "issues", label: "Issues" },
    ];

    return (
        <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => (
                <button
    key={tab.id}
    onClick={() => onTabChange(tab.id)}
    className={`px-4 py-2 rounded-lg transition ${
        activeTab === tab.id
            ? "bg-blue-600 text-white"
            : "bg-gray-800 text-gray-200 hover:bg-gray-700"
    }`}
>
    {tab.label}
</button>
            ))}
        </div>
    );
}