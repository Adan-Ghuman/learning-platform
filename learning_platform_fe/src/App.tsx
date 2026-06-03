import { Routes, Route, Link, useNavigate, useLocation, NavLink } from "react-router-dom";
import { useState } from "react";

import CourseList from "./pages/course-list";
import CourseDetail from "./pages/course-detail";
import LearnerResponses from "./pages/learner-responses";
import Login from "./pages/login";

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const confirmLogout = () => {
    localStorage.removeItem("token");
    setShowLogoutDialog(false);
    navigate("/login");
  };

  const showNavbar = location.pathname !== "/login";

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {showNavbar && (
        <nav className="sticky top-0 z-50 border-b border-border-subtle bg-surface/90 backdrop-blur-md shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto p-4 lg:px-8 gap-4 sm:gap-0">
            <Link to="/" className="font-display font-medium text-2xl tracking-wide text-primary hover:text-primary/80 transition-colors duration-300">
              Learning Platform
            </Link>
            <div className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm font-semibold tracking-widest uppercase">
              <NavLink 
                to="/courses" 
                className={({ isActive }) => `transition-colors duration-200 ${isActive ? 'text-primary' : 'text-ink-light hover:text-primary'}`}
              >
                Courses
              </NavLink>
              {token ? (
                <>
                  <button 
                    onClick={() => setShowLogoutDialog(true)} 
                    className="border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-200 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md font-semibold"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <NavLink 
                  to="/login" 
                  className={({ isActive }) => `px-4 py-1.5 sm:px-5 sm:py-2 transition-all duration-200 rounded-md font-semibold ${isActive ? 'bg-primary text-surface' : 'bg-ink text-surface hover:bg-primary'}`}
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </nav>
      )}
      <main className="grow flex flex-col">
        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/responses" element={<LearnerResponses />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      {showLogoutDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-surface p-6 md:p-8 rounded-lg shadow-xl border border-border-subtle max-w-sm w-full transition-all transform duration-300">
            <h3 className="text-2xl font-display font-medium mb-3 text-ink">Confirm Logout</h3>
            <p className="text-ink-light mb-8">Are you sure you want to log out of your account?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 text-ink-light border border-border-subtle hover:bg-surface-alt hover:text-ink transition-colors duration-200 rounded-md font-semibold"
                onClick={() => setShowLogoutDialog(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-primary text-surface hover:opacity-90 transition-opacity duration-200 rounded-md font-semibold"
                onClick={confirmLogout}
              >
                Confirm Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return <Layout />;
}

export default App;