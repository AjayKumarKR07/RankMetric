/* eslint-disable react-refresh/only-export-components */
import { BarChart3Icon, EyeIcon, FileSearchIcon, GlobeIcon, ShieldIcon, TargetIcon, TrendingUpIcon, ZapIcon } from "lucide-react";

export const homeFeaturesData = [
    {
        icon: <BarChart3Icon size={28} />,
        title: "SEO Score",
        desc: "Get a comprehensive SEO score analyzing 50+ ranking factors with AI-powered insights.",
    },
    {
        icon: <ZapIcon size={28} />,
        title: "Performance",
        desc: "Analyze load times, page size, and Core Web Vitals to maximize your site speed.",
    },
    {
        icon: <ShieldIcon size={28} />,
        title: "Best Practices",
        desc: "Check meta tags, heading structure, image optimization, and technical SEO health.",
    },
    {
        icon: <EyeIcon size={28} />,
        title: "Accessibility",
        desc: "Ensure your site is accessible to all users with alt text, ARIA, and contrast checks.",
    },
    {
        icon: <TargetIcon size={28} />,
        title: "Keyword Analysis",
        desc: "Discover top keywords, density analysis, and content optimization opportunities.",
    },
    {
        icon: <TrendingUpIcon size={28} />,
        title: "Actionable Fixes",
        desc: "Get prioritized, actionable recommendations to boost your search rankings.",
    },
];

export const homeHowItWorksData = [
    {
        num: "01",
        icon: <GlobeIcon size={24} />,
        title: "Enter Your URL",
        desc: "Paste any website URL into the analyzer bar.",
    },
    {
        num: "02",
        icon: <FileSearchIcon size={24} />,
        title: "AI Scans Your Site",
        desc: "RankFlow visits your site and OpenAI analyzes every SEO factor.",
    },
    {
        num: "03",
        icon: <BarChart3Icon size={24} />,
        title: "Get Your Report",
        desc: "Receive a detailed report with scores, issues, and recommendations.",
    },
];

export const homefooterLinks = [
    {
        title: "Product",
        links: ["Features", "Pricing", "API", "Browser Extension"],
    },
    {
        title: "Resources",
        links: ["Documentation", "Blog", "SEO Guide", "Support"],
    },
    {
        title: "Company",
        links: ["About Us", "Careers", "Contact", "Press"],
    },
    {
        title: "Legal",
        links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
    },
];

export const HomeWave = () => (
    <svg className="w-full h-[15vh] min-h-[60px] max-h-[120px]" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
        <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="var(--accent)" opacity="0.05" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="var(--accent)" opacity="0.1" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="var(--accent)" opacity="0.15" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="var(--accent)" opacity="0.2" />
        </g>
    </svg>
);

export const dummyAnalysisData = [
    {
        categories: { seo: 65, performance: 50, accessibility: 85, bestPractices: 70 },
        metaData: {
            title: "Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in",
            description: "Amazon.in: Online Shopping India - Buy mobiles, laptops, cameras, books, watches, apparel, shoes and e-Gift Cards. Free Shipping & Cash on Delivery Available.",
            canonical: "https://www.amazon.in/",
            robots: "",
            ogTitle: "",
            ogDescription: "Amazon.in: Online Shopping India - Buy mobiles, laptops, cameras, books, watches, apparel, shoes and e-Gift Cards. Free Shipping & Cash on Delivery Available.",
            ogImage: "https://m.media-amazon.com/images/I/51HCHFclmmL.jpg",
            twitterCard: "",
            viewport: "",
            charset: "utf-8",
        },
        headings: { h1: 0, h2: 25, h3: 0, h4: 0, h5: 7, h6: 0, h1Texts: [] },
        links: { broken: 0, internal: 350, external: 25, total: 375 },
        images: { total: 229, missingAlt: 10, withAlt: 219 },
        _id: "69fafd289a3aab480dd24147",
        userId: "69dcf7cacc98f8daf29ecca3",
        url: "https://amazon.in/",
        overallScore: 72,
        loadTime: 5032,
        pageSize: 1163453,
        wordCount: 2132,
        status: "completed",
        createdAt: "2026-05-06T08:34:48.581Z",
        updatedAt: "2026-05-06T08:35:24.611Z",
    },
    {
        categories: { seo: 65, performance: 55, accessibility: 60, bestPractices: 80 },
        metaData: {
            twitterCard: "",
            viewport: "",
            charset: "",
            title: "eBay - Export from India | Become a global online seller",
            description: "eBay is a leading global selling platform for online sellers to export products from India and sell globally. Start your global selling journey with eBay today! Low set-up cost | High profitability",
            canonical: "https://export.ebay.com/in/",
            robots: "",
            ogTitle: "eBay - Export from India | Become a global online seller",
            ogDescription: "eBay is a leading global selling platform for online sellers to export products from India and sell globally. Start your global selling journey with eBay today! Low set-up cost | High profitability",
            ogImage: "/_next/static/images/og-image-ebay-9997ef0e03c45b550a3e445b411aa3c7.png",
        },
        headings: { h4: 0, h5: 0, h6: 0, h1: 0, h2: 33, h3: 3, h1Texts: [] },
        links: { broken: 0, total: 0, internal: 131, external: 20 },
        images: { withAlt: 0, total: 26, missingAlt: 6 },
        _id: "69faf680e608e8071d2bd73f",
        userId: "69dcf7cacc98f8daf29ecca3",
        url: "https://ebay.in/",
        overallScore: 72,
        loadTime: 4936,
        pageSize: 352368,
        wordCount: 1191,
        status: "completed",
        createdAt: "2026-05-06T08:06:24.382Z",
        updatedAt: "2026-05-06T08:06:50.481Z",
    },
    {
        categories: { seo: 85, performance: 75, accessibility: 70, bestPractices: 80 },
        metaData: {
            title: "Microsoft – AI, Cloud, Productivity, Computing, Gaming & Apps",
            description: "Explore Microsoft products and services and support for your home or business. Shop Microsoft 365, Copilot, Teams, Xbox, Windows, Azure, Surface and more.",
            canonical: "https://www.microsoft.com/en-us",
            robots: "index, follow",
            ogTitle: "Microsoft – AI, Cloud, Productivity, Computing, Gaming & Apps",
            ogDescription: "Explore Microsoft products and services and support for your home or business. Shop Microsoft 365, Copilot, Teams, Xbox, Windows, Azure, Surface and more.",
            ogImage: "",
            twitterCard: "summary",
            viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
            charset: "UTF-8",
        },
        headings: { h1: 1, h2: 18, h3: 8, h4: 0, h5: 0, h6: 0, h1Texts: ["Get the ultimate college bundle"] },
        links: { broken: 0, internal: 88, external: 44, total: 132 },
        images: { total: 29, missingAlt: 6, withAlt: 23 },
        _id: "69faf23859140a797168cd5d",
        userId: "69dcf7cacc98f8daf29ecca3",
        url: "https://microsoft.com/",
        overallScore: 75,
        loadTime: 4929,
        pageSize: 454183,
        wordCount: 650,
        status: "completed",
        createdAt: "2026-05-06T07:48:09.000Z",
        updatedAt: "2026-05-06T07:49:09.170Z",
    },
    {
        categories: { seo: 91, performance: 100, accessibility: 90, bestPractices: 90 },
        metaData: {
           title: "Website SEO Analysis Report",
           description: "AI-powered SEO analysis and website performance report.",
           canonical: "https://example.com",
           robots: "",
           ogTitle: "Website SEO Analysis Report",
           ogDescription: "AI-powered SEO analysis and website performance report.",
            ogImage: "",
            twitterCard: "summary",
            viewport: "width=device-width, initial-scale=1",
            charset: "utf-8",
        },
        headings: { h1: 1, h2: 34, h3: 0, h4: 0, h5: 0, h6: 0, h1Texts: ["Website SEO Analysis"] },
        links: { broken: 0, internal: 55, external: 4, total: 60 },
        images: { total: 61, missingAlt: 16, withAlt: 45 },
        _id: "69fad6f73b51176579cd75a9",
        userId: "69dcf7cacc98f8daf29ecca3",
        url: "https://example.com",
        overallScore: 93,
        loadTime: 2210,
        pageSize: 126438,
        wordCount: 349,
        status: "completed",
        createdAt: "2026-05-06T05:51:51.274Z",
        updatedAt: "2026-05-06T05:53:15.015Z",
    },
    {
        categories: { seo: 80, performance: 100, accessibility: 60, bestPractices: 85 },
        metaData: {
            title: "RankFlow",
            description: "Give your agents access to the whole web.",
            canonical: "https://www.rankflow.com//",
            robots: "",
            ogTitle: "RankFlow",
            ogDescription: "Give your agents access to the whole web.",
            ogImage: "https://cdn.sanity.io/images/yd6zslid/production/150f4783739729cce34cd1a71ecbd63e0a4de5a9-1824x960.png?w=1200&amp;q=85&amp;auto=format&w=1200&h=628&fit=crop&q=60&fm=jpg",
            twitterCard: "",
            viewport: "width=device-width, initial-scale=1",
            charset: "utf-8",
        },
        headings: { h1: 1, h2: 7, h3: 23, h4: 10, h5: 0, h6: 0, h1Texts: ["RankFlow"] },
        links: { broken: 0, internal: 77, external: 15, total: 98 },
        images: { total: 21, missingAlt: 14, withAlt: 7 },
        _id: "69e1f7d91d170e16d40f88df",
        userId: "69dcf7cacc98f8daf29ecca3",
        url: "https://www.rankflow.com/",
        overallScore: 81,
        loadTime: 920,
        pageSize: 155506,
        wordCount: 952,
        status: "completed",
        createdAt: "2026-04-17T09:05:29.350Z",
        updatedAt: "2026-04-17T09:06:32.723Z",
    },
    {
        categories: { seo: 86, performance: 93, accessibility: 83, bestPractices: 100 },
        metaData: {
            title: "Vercel: Build and deploy the best web experiences with the AI Cloud",
            description: "Vercel gives developers the frameworks, workflows, and infrastructure to build a faster, more personalized web.",
            canonical: "https://vercel.com/",
            robots: "index, max-image-preview:large",
            ogTitle: "Vercel: Build and deploy the best web experiences with the AI Cloud – Vercel",
            ogDescription: "Vercel gives developers the frameworks, workflows, and infrastructure to build a faster, more personalized web.",
            ogImage: "https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/4JmubmYDJnFtstwHbaZPev/0c3576832aae5b1a4d98c8c9f98863c3/Vercel_Home_OG.png",
            twitterCard: "summary_large_image",
            viewport: "width=device-width, initial-scale=1, maximum-scale=1",
            charset: "utf-8",
        },
        headings: { h1: 2, h2: 18, h3: 7, h4: 0, h5: 9, h6: 0, h1Texts: ["Build and deploy on the AI Cloud.", "Build and deploy on the AI Cloud."] },
        links: { broken: 0, internal: 114, external: 18, total: 132 },
        images: { total: 49, missingAlt: 7, withAlt: 42 },
        _id: "69e0b571d1621b9576e47c2a",
        userId: "69dcf7cacc98f8daf29ecca3",
        url: "https://vercel.com/",
        overallScore: 91,
        loadTime: 2797,
        pageSize: 921750,
        wordCount: 775,
        status: "completed",
        createdAt: "2026-04-16T10:09:53.689Z",
        updatedAt: "2026-04-16T10:11:05.444Z",
    },
    {
        categories: { seo: 63, performance: 100, accessibility: 100, bestPractices: 100 },
        metaData: {
            title: "Tailwind CSS UI Components & Templates - PrebuiltUI",
            description: "Tailwind CSS UI components and templates for modern web development. Get access to free, responsive and modern Tailwind CSS components to speed up your web development.",
            canonical: "https://prebuiltui.com/",
            robots: "",
            ogTitle: "PrebuiltUI - Free Tailwind CSS Components & UI Templates",
            ogDescription: "Get access to free, responsive and modern Tailwind CSS components to speed up your web development process.",
            ogImage: "https://prebuiltui.com/opengraph-image.png?opengraph-image.09u6fxlvvs1rv.png",
            twitterCard: "summary_large_image",
            viewport: "width=device-width, initial-scale=1",
            charset: "utf-8",
        },
        headings: { h1: 1, h2: 11, h3: 7, h4: 6, h5: 0, h6: 0, h1Texts: ["Explore the Ultimate  Collection of UI Components"] },
        links: { broken: 0, internal: 397, external: 6, total: 403 },
        images: { total: 124, missingAlt: 0, withAlt: 124 },
        _id: "69ddf15f1ec6a4dc0025f4bc",
        userId: "69dcf7cacc98f8daf29ecca3",
        url: "https://prebuiltui.com/",
        overallScore: 91,
        loadTime: 2022,
        pageSize: 263904,
        wordCount: 1097,
        status: "completed",
        createdAt: "2026-04-14T07:48:47.541Z",
        updatedAt: "2026-04-14T07:49:35.291Z",
    },
];

export const websiteAnalysis = {
    categories: {
        seo: 91,
        performance: 100,
        accessibility: 90,
        bestPractices: 90
    },

    metaData: {
        title: "Website SEO Analysis Report",
        description: "AI-powered SEO analysis and website performance report.",
        canonical: "https://example.com",
        robots: "index, follow",
        ogTitle: "Website SEO Analysis Report",
        ogDescription: "AI-powered SEO analysis and website performance report.",
        ogImage: "",
        twitterCard: "summary",
        viewport: "width=device-width, initial-scale=1",
        charset: "utf-8",
    },
    headings: { h1: 1, h2: 34, h3: 0, h4: 0, h5: 0, h6: 0, h1Texts: ["Website SEO Analysis"] },
    links: { broken: 0, internal: 55, external: 4, total: 60 },
    images: { total: 61, missingAlt: 16, withAlt: 45 },
    _id: "69fad6f73b51176579cd75a9",
    userId: "69dcf7cacc98f8daf29ecca3",
    url: "https://example.com",
    overallScore: 93,
    loadTime: 2210,
    pageSize: 126438,
    wordCount: 349,
    status: "completed",
   keywords: [
  { word: "seo", count: 28, density: 8.02, _id: "1" },
  { word: "website", count: 19, density: 5.44, _id: "2" },
  { word: "analysis", count: 12, density: 3.44, _id: "3" },
  { word: "performance", count: 9, density: 2.58, _id: "4" },
  { word: "ranking", count: 8, density: 2.29, _id: "5" }
],
   issues: [
    {
        severity: "critical",
        category: "SEO",
        message: "Meta description is missing or too short.",
        recommendation: "Add a unique meta description between 150–160 characters."
    },
    {
        severity: "warning",
        category: "Accessibility",
        message: "Several images are missing alt text.",
        recommendation: "Provide descriptive alt attributes for all important images."
    },
    {
        severity: "warning",
        category: "Performance",
        message: "Page size is larger than recommended.",
        recommendation: "Compress images and remove unused assets to reduce load time."
    },
    {
        severity: "warning",
        category: "Best Practices",
        message: "Some external links do not use secure HTTPS connections.",
        recommendation: "Update all external links to use HTTPS where available."
    },
    {
        severity: "info",
        category: "SEO",
        message: "Keyword density could be improved for target search terms.",
        recommendation: "Use primary keywords naturally in headings and content."
    },
    {
        severity: "info",
        category: "Accessibility",
        message: "Heading structure can be improved.",
        recommendation: "Use a logical H1 → H2 → H3 hierarchy across the page."
    },
    {
        severity: "info",
        category: "Performance",
        message: "Browser caching opportunities detected.",
        recommendation: "Configure cache headers for static assets."
    }
],
    createdAt: "2026-05-06T05:51:51.274Z",
    updatedAt: "2026-05-06T05:53:15.015Z",
};
   
export const dummyRankings = [
    {
    _id: "69faeb22c92887355e43fef3",
    userId: "69dcf7cacc98f8daf29ecca3",
    keyword: "website seo analysis",
    url: "https://example.com",
    domain: "example.com",
    currentPosition: 7,
    currentPage: 1,
    bestPosition: 5,
    positionChange: 2,
    active: true,
    lastChecked: "2026-05-06T07:18:32.603Z",
    status: "completed",
    competitors: [
        {
            position: 1,
            url: "https://semrush.com",
            domain: "semrush.com",
            title: "Semrush SEO Platform",
            snippet: "Analyze website health, rankings and SEO opportunities."
        },
        {
            position: 2,
            url: "https://ahrefs.com",
            domain: "ahrefs.com",
            title: "Ahrefs Webmaster Tools",
            snippet: "SEO analysis and backlink monitoring platform."
        },
        {
            position: 3,
            url: "https://semrush.com/siteaudit",
            domain: "semrush.com",
            title: "Site Audit Tool",
            snippet: "Find technical SEO issues and improve rankings."
        }
    ],
    createdAt: "2026-05-06T07:17:54.335Z",
    updatedAt: "2026-05-06T07:18:32.607Z",
    __v: 1,
},
{
    _id: "69e0baa3d1621b9576e47c73",
    userId: "69dcf7cacc98f8daf29ecca3",
    keyword: "keyword ranking tracker",
    url: "https://example.com",
    domain: "example.com",
    currentPosition: 13,
    currentPage: 2,
    bestPosition: 10,
    positionChange: 4,
    active: true,
    lastChecked: "2026-05-06T07:32:00.565Z",
    status: "completed",
    competitors: [
        {
            position: 1,
            url: "https://seranking.com",
            domain: "seranking.com",
            title: "SE Ranking",
            snippet: "Keyword tracking and SEO monitoring software."
        },
        {
            position: 2,
            url: "https://wincher.com",
            domain: "wincher.com",
            title: "Wincher Rank Tracker",
            snippet: "Track keyword positions and search visibility."
        },
        {
            position: 3,
            url: "https://mangools.com",
            domain: "mangools.com",
            title: "Mangools Rank Tracker",
            snippet: "Monitor rankings and keyword performance."
        }
    ],
    createdAt: "2026-04-16T10:32:03.352Z",
    updatedAt: "2026-05-06T07:32:00.566Z",
    __v: 5,
},
{
    _id: "69dd0cbd0fa79fd71e3b0473",
    userId: "69dcf7cacc98f8daf29ecca3",
    keyword: "seo analyzer",
    url: "https://example.com",
    domain: "example.com",
    currentPosition: 2,
    currentPage: 1,
    bestPosition: 2,
    positionChange: 0,
    active: true,
    lastChecked: "2026-05-06T09:04:47.211Z",
    status: "completed",
    competitors: [
        {
            position: 1,
            url: "https://ahrefs.com",
            domain: "ahrefs.com",
            title: "Ahrefs SEO Tools",
            snippet: "Professional SEO toolkit for marketers and businesses."
        },
        {
            position: 3,
            url: "https://moz.com",
            domain: "moz.com",
            title: "Moz Pro",
            snippet: "SEO software for site audits and keyword tracking."
        },
        {
            position: 4,
            url: "https://ubersuggest.com",
            domain: "ubersuggest.com",
            title: "Ubersuggest",
            snippet: "SEO analysis, keyword research and backlink tools."
        }
    ],
    createdAt: "2026-04-13T15:33:17.509Z",
    updatedAt: "2026-05-06T09:04:47.214Z",
    __v: 3,
},
{
    _id: "69dd07c59343d7f693931c97",
    userId: "69dcf7cacc98f8daf29ecca3",
    keyword: "seo tools",
    url: "https://example.com",
    domain: "example.com",
    currentPosition: 11,
    currentPage: 1,
    bestPosition: 8,
    positionChange: 1,
    active: true,
    lastChecked: "2026-05-06T09:08:13.422Z",
    status: "completed",
    competitors: [
        {
            position: 1,
            url: "https://smallseotools.com",
            domain: "smallseotools.com",
            title: "Small SEO Tools",
            snippet: "Free SEO tools for optimization and analysis."
        },
        {
            position: 2,
            url: "https://moz.com/free-seo-tools",
            domain: "moz.com",
            title: "Moz Free SEO Tools",
            snippet: "Keyword research, audits and backlink tools."
        },
        {
            position: 3,
            url: "https://technicalseo.com/tools",
            domain: "technicalseo.com",
            title: "Technical SEO Tools",
            snippet: "Useful tools for technical SEO analysis."
        }
    ],
    createdAt: "2026-04-13T15:12:05.900Z",
    updatedAt: "2026-05-06T09:08:13.425Z",
    __v: 3,
}];

export const dummyWebsiteRanking = {
_id: "69dd0cbd0fa79fd71e3b0473",
userId: "69dcf7cacc98f8daf29ecca3",
keyword: "SEO Analyzer",
url: "https://example.com",
domain: "example.com",

currentPosition: 2,
currentPage: 1,
bestPosition: 2,
positionChange: 7,

active: true,
lastChecked: "2026-05-06T09:04:47.211Z",
status: "completed",

rankHistory: [
    {
        date: "2026-05-01T18:30:00.000Z",
        position: 18,
        page: 2,
        title: "SEO Analyzer - SEO Audit Tool",
        snippet: "Analyze websites and discover SEO opportunities."
    },
    {
        date: "2026-05-02T18:30:00.000Z",
        position: 16,
        page: 2,
        title: "SEO Analyzer - Website SEO Checker",
        snippet: "Technical SEO audits and performance monitoring."
    },
    {
        date: "2026-05-03T18:30:00.000Z",
        position: 13,
        page: 2,
        title: "SEO Analyzer - Technical SEO Platform",
        snippet: "Track rankings and monitor website health."
    },
    {
        date: "2026-05-04T18:30:00.000Z",
        position: 11,
        page: 2,
        title: "SEO Analyzer - Site Audit Dashboard",
        snippet: "Generate detailed SEO reports for any website."
    },
    {
        date: "2026-05-05T18:30:00.000Z",
        position: 9,
        page: 2,
        title: "SEO Analyzer - Website Audit Tool",
        snippet: "Analyze website SEO, performance and accessibility."
    },
    {
        date: "2026-05-06T18:30:00.000Z",
        position: 8,
        page: 2,
        title: "SEO Analyzer - SEO Audit Platform",
        snippet: "Identify technical SEO issues and improve rankings."
    },
    {
        date: "2026-05-07T18:30:00.000Z",
        position: 6,
        page: 1,
        title: "SEO Analyzer - Technical SEO Checker",
        snippet: "Monitor website health and improve search visibility."
    },
    {
        date: "2026-05-08T18:30:00.000Z",
        position: 5,
        page: 1,
        title: "SEO Analyzer - Rank Tracking Dashboard",
        snippet: "Keyword tracking and competitor monitoring platform."
    },
    {
        date: "2026-05-09T18:30:00.000Z",
        position: 4,
        page: 1,
        title: "SEO Analyzer - AI SEO Reports",
        snippet: "AI-powered SEO recommendations and insights."
    },
    {
        date: "2026-05-10T18:30:00.000Z",
        position: 2,
        page: 1,
        title: "SEO Analyzer - Complete SEO Toolkit",
        snippet: "Website auditing, rank tracking and SEO monitoring."
    }
],

competitors: [
    {
        position: 1,
        url: "https://ahrefs.com",
        domain: "ahrefs.com",
        title: "Ahrefs SEO Tools",
        snippet: "Keyword research, backlink analysis and website auditing."
    },
    {
        position: 2,
        url: "https://semrush.com",
        domain: "semrush.com",
        title: "Semrush SEO Platform",
        snippet: "All-in-one SEO, content marketing and competitor analysis."
    },
    {
        position: 3,
        url: "https://moz.com",
        domain: "moz.com",
        title: "Moz Pro",
        snippet: "SEO software for rankings, audits and keyword tracking."
    },
    {
        position: 4,
        url: "https://seranking.com",
        domain: "seranking.com",
        title: "SE Ranking",
        snippet: "Rank tracking and website monitoring tools."
    },
    {
        position: 5,
        url: "https://ubersuggest.com",
        domain: "ubersuggest.com",
        title: "Ubersuggest",
        snippet: "Keyword research and SEO analysis platform."
    },
    {
        position: 6,
        url: "https://screamingfrog.co.uk",
        domain: "screamingfrog.co.uk",
        title: "Screaming Frog SEO Spider",
        snippet: "Technical SEO crawler and website audit software."
    }
],

createdAt: "2026-04-13T15:33:17.509Z",
updatedAt: "2026-05-06T09:04:47.214Z",
__v: 3
};