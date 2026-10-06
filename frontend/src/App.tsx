import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Analyze from "./pages/Analyze";
import Report from "./pages/Report";
import History from "./pages/History";
import RankTracker from "./pages/RankTracker";
import RankDetail from "./pages/RankDetail";
import { Toaster } from "react-hot-toast";
import Compare from "./pages/Compare";
import Settings from "./pages/Settings";
export default function App() {
    const location = useLocation();

   const hideNavbar = location.pathname === "/login";

    return (
        <>
            <Toaster />
            {!hideNavbar && <Navbar />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/analyze" element={<Analyze />} />
                    <Route path="/report/:id" element={<Report />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/rank-tracker" element={<RankTracker />} />
                    <Route path="/rank/:id" element={<RankDetail />} />
                    <Route path="/compare" element={<Compare />} />
                    <Route path="/settings" element={<Settings />} />
                </Route>
            </Routes>
        </>
    );
}
