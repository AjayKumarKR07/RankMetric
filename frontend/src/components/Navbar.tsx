import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import {
  Search,
  BarChart3,
  History,
  LogOut,
  Menu,
  X,
  Target,
  Sun,
  Moon,
  ChartNoAxesColumnIcon,
  GitCompareArrows,
  Bell,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const { theme, setTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const notificationRef = useRef<HTMLDivElement>(null);
    const [notificationOpen, setNotificationOpen] = useState(false);

const [notifications, setNotifications] = useState([
  {
    title: "Analysis completed",
    time: "2 minutes ago",
    unread: true,
  },
  {
    title: "SEO Score improved by 8 points",
    time: "10 minutes ago",
    unread: true,
  },
  {
    title: "PDF Report downloaded",
    time: "1 hour ago",
    unread: false,
  },
  {
    title: "Rank changed for keyword",
    time: "Yesterday",
    unread: false,
  },
]);

    // Close profile dropdown when clicking outside
   useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target as Node)
    ) {
      setProfileOpen(false);
    }

    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target as Node)
    ) {
      setNotificationOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };
    const isActive = (path: string) => location.pathname === path;
    const handleProtectedNavigation = (path: string) => {
    const token = localStorage.getItem("token");

   if (!token) {
    navigate("/login");
    return;
}

    navigate(path);
};

    const navLinks = [
    {
        path: "/dashboard",
        label: "Dashboard",
        icon: <BarChart3 size={18} />,
    },
    {
        path: "/analyze",
        label: "Analyze",
        icon: <Search size={18} />,
    },
    {
        path: "/rank-tracker",
        label: "Rank Tracker",
        icon: <Target size={18} />,
    },
    {
        path: "/history",
        label: "History",
        icon: <History size={18} />,
    },
    {
        path: "/compare",
        label: "Compare",
        icon: <GitCompareArrows size={18} />,
    },
];

    return (
        <nav className="fixed top-0 w-full bg-background/70 backdrop-blur-lg z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <ChartNoAxesColumnIcon />
                        <span className="text-xl tracking-tight text-foreground">RankFlow</span>
                    </Link>

                    {/* Desktop nav */}
                   <div className="hidden md:flex items-center gap-1">
    {navLinks.map((link) => (
        <button
            key={link.path}
            onClick={() => handleProtectedNavigation(link.path)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                isActive(link.path)
                    ? "bg-accent/5 text-accent font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
            }`}
        >
            {link.icon}
            {link.label}
        </button>
    ))}
</div>
                    

                    {/* Right side */}
                    <div className="hidden md:flex items-center gap-3">
                        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors flex items-center justify-center" aria-label="Toggle theme">
                            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        <div ref={notificationRef} className="relative">
                            <button onClick={() => {
                              setProfileOpen(false);
                            setNotificationOpen(!notificationOpen);
                          }} className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors">
                                <Bell size={20} />
                            </button>
                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white font-bold">
                            {notifications.filter((n) => n.unread).length}
                            </span>

                            {notificationOpen && (
                                <div className="absolute right-0 mt-3 w-80 rounded-xl border border-border bg-card shadow-xl overflow-hidden z-50">
                                    <div className="p-4 border-b border-border">
                                        <h3 className="font-semibold text-foreground">Notifications</h3>
                                    </div>
                                    <div className="divide-y divide-border">
                                        {notifications.map((notification, index) => (
  <div
    key={index}
    className="px-5 py-4 hover:bg-muted transition-colors"
  >
    <div className="flex justify-between items-start">

      <div>
        <p className="font-medium">
          {notification.title}
        </p>

        <p className="text-sm text-muted-foreground">
          {notification.time}
        </p>
      </div>

      {notification.unread && (
        <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
      )}

    </div>
  </div>
))}

                                      <div className="border-t border-border p-3 flex justify-between items-center">

  <button
    className="text-sm text-muted-foreground hover:text-foreground"
    onClick={() => {
      // Navigate to notification page later
      setNotificationOpen(false);
    }}
  >
    View All
  </button>

  <button
    className="text-sm text-blue-500 hover:text-blue-600 font-medium"
    onClick={() => {
      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          unread: false,
        }))
      );
    }}
  >
    Mark all as read
  </button>


                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {user ? (
                            <div ref={profileRef} className="relative">
                                <button onClick={() => {
                              setNotificationOpen(false);
                                    setProfileOpen(!profileOpen);
                                     }} className="flex items-center gap-2 px-2 py-1.5 rounded-full border border-border bg-card text-sm hover:bg-muted transition-all">
                                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold" style={{ color: "var(--background)" }}>
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-foreground font-medium">{user.name}</span>
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium uppercase bg-accent/10 border border-accent/15 text-accent">
                                        {user.plan}
                                    </span>
                                    <span className="text-xs">▼</span>
                                </button>

                                {profileOpen && (
                                    <div className="absolute right-0 mt-3 w-56 rounded-xl border border-border bg-card shadow-xl overflow-hidden z-50">
                                        <Link to="/settings" onClick={() => setProfileOpen(false)} className="block px-4 py-3 hover:bg-muted transition">
                                            👤 My Profile
                                        </Link>
                                        <Link to="/settings" onClick={() => setProfileOpen(false)} className="block px-4 py-3 hover:bg-muted transition">
                                            ⚙️ Account Settings
                                        </Link>
                                        <Link to="/dashboard" onClick={() => setProfileOpen(false)} className="block px-4 py-3 hover:bg-muted transition">
                                            📊 Dashboard
                                        </Link>
                                        <Link to="/history" onClick={() => setProfileOpen(false)} className="block px-4 py-3 hover:bg-muted transition">
                                            📜 History
                                        </Link>
                                        <hr className="border-border" />
                                        <button onClick={() => {
                                            handleLogout();
                                            setProfileOpen(false);
                                        }} className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-500/10 transition">
                                            🚪 Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                    Log In
                                </Link>
                                <Link
  to="/login"
  className="px-5 py-2 rounded-full bg-primary text-sm transition-opacity"
  style={{ color: "var(--background)" }}
>
  Get Started
</Link>
                            </>
                        )}
                    </div>

                    {/* Mobile toggle container */}
                    <div className="flex items-center gap-2 md:hidden">
                        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors">
                            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <button className="text-muted-foreground hover:text-foreground p-2" onClick={() => setMobileOpen(!mobileOpen)}>
                            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden border-b border-border bg-background origin-top">
                    <div className="px-4 py-3 space-y-1">
                        {user ? (
                            <>
                                <Link
    to="/settings"
    className="flex items-center gap-2 px-2 py-1.5 rounded-full border border-border bg-card text-sm hover:bg-muted transition-all"
>
    <div
        className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold"
        style={{ color: "var(--background)" }}
    >
        {user.name.charAt(0).toUpperCase()}
    </div>

    <span className="text-foreground font-medium">
        {user.name}
    </span>

    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium uppercase bg-accent/10 border border-accent/15 text-accent">
        {user.plan}
    </span>
</Link>
        
                                <div className="py-2 space-y-1">
                                    {navLinks.map((link) => (
    <button
        key={link.path}
        onClick={() => {
            handleProtectedNavigation(link.path);
            setMobileOpen(false);
        }}
        className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all ${
            isActive(link.path)
                ? "bg-accent/10 text-accent"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
        }`}
    >
        {link.icon}
        {link.label}
    </button>
))}
                                </div>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMobileOpen(false);
                                    }}
                                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-danger hover:bg-danger/10 w-full mt-2"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="py-2 space-y-2">
                                <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-3 text-sm font-medium text-foreground text-center rounded-lg hover:bg-muted">
                                    Log In
                                </Link>
                                <Link
  to="/login"
  onClick={() => setMobileOpen(false)}
  className="block px-3 py-3 text-sm font-semibold text-center rounded-lg bg-primary"
  style={{ color: "var(--background)" }}
>
  Get Started
</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
