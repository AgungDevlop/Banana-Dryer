import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHistory, FaCalendarAlt, FaClipboardList } from "react-icons/fa";

interface Device {
  id: number;
  token: string;
  state: "idle" | "feed" | "take_picture" | "drying" | "finished";
  temperature: number;
  humidity: number;
  ph: number;
  weight: number;
  target: number;
  feeder_level1: number;
  feeder_level2: number;
  created_at: string;
  updated_at: string;
}

const Dashboard: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch("https://myapi.agungbot.my.id/devices");
        if (!response.ok) throw new Error("Failed to fetch devices");
        const data: Device[] = await response.json();
        setDevices(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-2xl font-semibold text-orange-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="bg-orange-100 p-8 rounded-lg shadow-md text-orange-700">
          <h2 className="text-xl font-bold">Error</h2>
          <p className="text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      <div className="p-8">
        <h1 className="text-4xl font-bold text-orange-600 mb-8">Dashboard</h1>

        {/* Device Summary */}
        <div className="bg-white shadow-2xl rounded-2xl p-8 mb-8 border border-orange-100">
          <h2 className="text-2xl font-semibold text-orange-600 mb-6 flex items-center">
            <span className="mr-2">Device Summary</span>
            <span className="inline-block bg-orange-500 text-white text-sm font-medium px-2.5 py-0.5 rounded-full">
              {devices.length}
            </span>
          </h2>
          {devices.length === 0 ? (
            <p className="text-lg text-gray-700">No devices found.</p>
          ) : (
            <ul className="space-y-6">
              {devices.map((device) => (
                <li
                  key={device.id}
                  className="bg-gradient-to-r from-gray-50 to-orange-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-medium text-orange-600">
                      Device ID: {device.id}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        device.state === "finished"
                          ? "bg-green-100 text-green-800"
                          : device.state === "drying"
                          ? "bg-orange-100 text-orange-800"
                          : device.state === "idle"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {device.state.charAt(0).toUpperCase() + device.state.slice(1)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-lg text-gray-700">
                    <div className="flex items-center">
                      <span className="font-medium text-orange-600 mr-2">Token:</span>
                      <span>{device.token}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-orange-600 mr-2">Temperature:</span>
                      <span>{device.temperature}°C</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-orange-600 mr-2">Humidity:</span>
                      <span>{device.humidity}%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-orange-600 mr-2">pH:</span>
                      <span>{device.ph}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-orange-600 mr-2">Weight:</span>
                      <span>{device.weight}g</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-orange-600 mr-2">Target:</span>
                      <span>{device.target}g</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-orange-600 mr-2">Feeder 1:</span>
                      <div className="w-full max-w-[100px] bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-orange-500 h-2.5 rounded-full"
                          style={{ width: `${device.feeder_level1}%` }}
                        ></div>
                      </div>
                      <span className="ml-2">{device.feeder_level1}%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-orange-600 mr-2">Feeder 2:</span>
                      <div className="w-full max-w-[100px] bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-orange-500 h-2.5 rounded-full"
                          style={{ width: `${device.feeder_level2}%` }}
                        ></div>
                      </div>
                      <span className="ml-2">{device.feeder_level2}%</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/drying_logs"
            className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100 hover:bg-orange-50 transform hover:-translate-y-1"
          >
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-full group-hover:bg-orange-200 transition-colors duration-300">
                <FaClipboardList className="text-orange-500 text-3xl" />
              </div>
              <div className="ml-4">
                <span className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                  Drying Logs
                </span>
                <p className="text-sm text-gray-600 mt-1">View drying process records</p>
              </div>
            </div>
          </Link>
          <Link
            to="/histories"
            className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100 hover:bg-orange-50 transform hover:-translate-y-1"
          >
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-full group-hover:bg-orange-200 transition-colors duration-300">
                <FaHistory className="text-orange-500 text-3xl" />
              </div>
              <div className="ml-4">
                <span className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                  Histories
                </span>
                <p className="text-sm text-gray-600 mt-1">Check historical data</p>
              </div>
            </div>
          </Link>
          <Link
            to="/schedules"
            className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100 hover:bg-orange-50 transform hover:-translate-y-1"
          >
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-full group-hover:bg-orange-200 transition-colors duration-300">
                <FaCalendarAlt className="text-orange-500 text-3xl" />
              </div>
              <div className="ml-4">
                <span className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                  Schedules
                </span>
                <p className="text-sm text-gray-600 mt-1">Manage drying schedules</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;