import { useEffect, useState } from "react";
import { FaClipboardList, FaClock, FaWeightHanging, FaRobot, FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";

interface DryingLog {
  id: number;
  device_id: number;
  start_time: string | null;
  end_time: string | null;
  drying_mode: "fast" | "slow" | "normal";
  final_weight: number;
  status: "in_progress" | "completed" | "failed";
  created_at: string;
  updated_at: string;
}

const DryingLogs: React.FC = () => {
  const [logs, setLogs] = useState<DryingLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch("https://myapi.agungbot.my.id/drying_logs");
        if (!response.ok) throw new Error("Failed to fetch drying logs");
        const data: DryingLog[] = await response.json();
        setLogs(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-2xl font-semibold text-orange-600 animate-pulse flex items-center">
          <FaSpinner className="mr-2 animate-spin" /> Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="bg-orange-100 p-8 rounded-xl shadow-2xl text-orange-700 border border-orange-200 transform transition-all duration-300">
          <h2 className="text-xl font-bold mb-2 flex items-center">
            <FaTimesCircle className="mr-2" /> Error
          </h2>
          <p className="text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-orange-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-extrabold text-orange-600 flex items-center">
            <FaClipboardList className="mr-3" /> Drying Logs
            <span className="ml-3 bg-orange-500 text-white text-sm font-medium px-3 py-1 rounded-full shadow-md">
              {logs.length}
            </span>
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {logs.map((log) => (
            <div
              key={log.id}
              className="group bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-orange-500 hover:scale-105 transform bg-gradient-to-br from-white to-orange-50"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-orange-600 flex items-center">
                  <FaClipboardList className="mr-2" /> Log #{log.id}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${
                    log.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : log.status === "in_progress"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {log.status === "completed" ? <FaCheckCircle className="mr-1" /> : 
                   log.status === "in_progress" ? <FaSpinner className="mr-1 animate-spin" /> : 
                   <FaTimesCircle className="mr-1" />}
                  {log.status.replace("_", " ")}
                </span>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 flex items-center">
                  <FaRobot className="mr-2 text-orange-500" />
                  <span className="font-medium text-orange-600">Device:</span> {log.device_id}
                </p>
                <p className="text-gray-700 flex items-center">
                  <FaClock className="mr-2 text-orange-500" />
                  <span className="font-medium text-orange-600">Start:</span>{" "}
                  {log.start_time ? new Date(log.start_time).toLocaleString() : "N/A"}
                </p>
                <p className="text-gray-700 flex items-center">
                  <FaClock className="mr-2 text-orange-500" />
                  <span className="font-medium text-orange-600">End:</span>{" "}
                  {log.end_time ? new Date(log.end_time).toLocaleString() : "N/A"}
                </p>
                <p className="text-gray-700 flex items-center">
                  <FaRobot className="mr-2 text-orange-500" />
                  <span className="font-medium text-orange-600">Mode:</span>{" "}
                  <span
                    className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                      log.drying_mode === "fast"
                        ? "bg-blue-100 text-blue-800"
                        : log.drying_mode === "slow"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {log.drying_mode}
                  </span>
                </p>
                <p className="text-gray-700 flex items-center">
                  <FaWeightHanging className="mr-2 text-orange-500" />
                  <span className="font-medium text-orange-600">Final Weight:</span> {log.final_weight}g
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DryingLogs;
