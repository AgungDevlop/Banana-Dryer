import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaClipboardList, FaHistory, FaCalendarAlt } from "react-icons/fa";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const goHome = () => navigate("/");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-orange-500 text-white p-4 flex items-center justify-between z-50 shadow-md">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Banana Dryer</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 pt-16 pb-20">{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-orange-500 text-white p-4 flex justify-around items-center z-50 shadow-md">
        <Link to="/" className="flex flex-col items-center hover:text-orange-100 transition-colors">
          <FaHome className="text-2xl" />
          <span className="text-xs">Home</span>
        </Link>
        <Link to="/drying_logs" className="flex flex-col items-center hover:text-orange-100 transition-colors">
          <FaClipboardList className="text-2xl" />
          <span className="text-xs">Logs</span>
        </Link>
        <Link to="/histories" className="flex flex-col items-center hover:text-orange-100 transition-colors">
          <FaHistory className="text-2xl" />
          <span className="text-xs">Histories</span>
        </Link>
        <Link to="/schedules" className="flex flex-col items-center hover:text-orange-100 transition-colors">
          <FaCalendarAlt className="text-2xl" />
          <span className="text-xs">Schedules</span>
        </Link>
      </nav>
    </div>
  );
};

export default Layout;