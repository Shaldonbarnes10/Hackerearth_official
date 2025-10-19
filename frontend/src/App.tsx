// src/App.tsx

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import PastEvents from "./pages/Events";
import Team from "./pages/Team";
import Domains from "./pages/Domains";
import Leaderboard from "./pages/Leaderboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LoginPage from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext"; 
import ScrollToTop from "./components/ScrollTop";
import Sidebar from "./components/Sidebar";
import SpotlightCursor from "./components/CustomCursor";

function AppWrapper() {
  const location = useLocation();
  const { isDark } = useTheme(); // <-- Get the theme state
  const isAuthPage = location.pathname === "/login";
  const isDomainPage = location.pathname.startsWith("/domains");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false); // close sidebar on route change
  }, [location]);

  // This effect adds/removes a class to the body to hide the default cursor
  // useEffect(() => {
  //   if (isDark) {
  //     document.body.classList.add('dark-cursor');
  //   } else {
  //     document.body.classList.remove('dark-cursor');
  //   }
  // }, [isDark]);

  return (
    <div
      id="scroll-container"
      className="min-h-screen h-full w-full overflow-y-auto bg-slate-50 dark:bg-gray-950 transition-colors duration-300"
    >
      <SpotlightCursor /> {/* <-- Add the cursor component here */}
      
      {!isAuthPage && <Navbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />}
      {!isAuthPage && <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />}

      <main className="pt-0 transition-all duration-300 ease-in-out">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<PastEvents />} />
          <Route path="/team" element={<Team />} />
          <Route path="/domains" element={<Domains />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>

      {!isAuthPage && !isDomainPage && <Footer />}
    </div>
  );
}

export default function App() { 
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <AppWrapper />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}