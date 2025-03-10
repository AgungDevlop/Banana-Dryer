import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
        <div className="text-xl font-semibold text-orange-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="bg-orange-100 p-6 rounded-lg shadow-md text-orange-700">
          <h2 className="text-lg font-bold">Error</h2>
          <p className="text-base">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-orange-600 mb-6">Dashboard</h1>

        {/* Device Summary - Versi yang Diperkecil */}
        <div className="bg-white shadow-xl rounded-xl p-4 mb-6 border border-orange-100">
          <h2 className="text-xl font-semibold text-orange-600 mb-3 flex items-center">
            <span className="mr-2">Device Summary</span>
            <span className="inline-block bg-orange-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
              {devices.length}
            </span>
          </h2>
          {devices.length === 0 ? (
            <p className="text-base text-gray-700">No devices found.</p>
          ) : (
            <ul className="space-y-3">
              {devices.map((device) => (
                <li
                  key={device.id}
                  className="bg-gradient-to-r from-gray-50 to-orange-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-orange-500"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium text-orange-600">
                      Device ID: {device.id}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
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
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                    <div className="flex items-center">
                      <span className="font-medium text-orange-600 mr-1">Temp:</span>
                      <span>{device.temperature}°C</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-orange-600 mr-1">Hum:</span>
                      <span>{device.humidity}%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-orange-600 mr-1">pH:</span>
                      <span>{device.ph}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-orange-600 mr-1">Weight:</span>
                      <span>{device.weight}g</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-orange-600 mr-1">Target:</span>
                      <span>{device.target}g</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-orange-600 mr-1">F1:</span>
                      <div className="w-full max-w-[80px] bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: `${device.feeder_level1}%` }}
                        ></div>
                      </div>
                      <span className="ml-1">{device.feeder_level1}%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-orange-600 mr-1">F2:</span>
                      <div className="w-full max-w-[80px] bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: `${device.feeder_level2}%` }}
                        ></div>
                      </div>
                      <span className="ml-1">{device.feeder_level2}%</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
