import { useEffect, useState } from "react";
import { FaHistory, FaThermometerHalf, FaTint, FaBullseye, FaWeightHanging, FaVial, FaSpinner, FaTimesCircle, FaRobot } from "react-icons/fa";

interface History {
  id: number;
  device_id: number;
  temperature: number;
  humidity: number;
  target: number;
  weight: number;
  ph: number;
  feeder_level1: number;
  feeder_level2: number;
  created_at: string;
  updated_at: string;
}

const Histories: React.FC = () => {
  const [histories, setHistories] = useState<History[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistories = async () => {
      try {
        const response = await fetch("https://myapi.agungbot.my.id/histories");
        if (!response.ok) throw new Error("Failed to fetch histories");
        const data: History[] = await response.json();
        setHistories(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistories();
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
            <FaHistory className="mr-3" /> Histories
            <span className="ml-3 bg-orange-500 text-white text-sm font-medium px-3 py-1 rounded-full shadow-md">
              {histories.length}
            </span>
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {histories.map((history) => (
            <div
              key={history.id}
              className="group bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-orange-500 hover:scale-105 transform bg-gradient-to-br from-white to-orange-50"
            >
              <h3 className="text-xl font-bold text-orange-600 mb-4 flex items-center">
                <FaHistory className="mr-2" /> History #{history.id}
              </h3>
              <div className="space-y-4">
                <p className="text-gray-700 flex items-center">
                  <FaRobot className="mr-2 text-orange-500" />
                  <span className="font-medium text-orange-600">Device:</span> {history.device_id}
                </p>
                <p className="text-gray-700 flex items-center">
                  <FaThermometerHalf className="mr-2 text-orange-500" />
                  <span className="font-medium text-orange-600">Temp:</span>{" "}
                  <span className="ml-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-sm font-medium">
                    {history.temperature}°C
                  </span>
                </p>
                <p className="text-gray-700 flex items-center">
                  <FaTint className="mr-2 text-orange-500" />
                  <span className="font-medium text-orange-600">Humidity:</span>{" "}
                  <span className="ml-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                    {history.humidity}%
                  </span>
                </p>
                <p className="text-gray-700 flex items-center">
                  <FaBullseye className="mr-2 text-orange-500" />
                  <span className="font-medium text-orange-600">Target:</span> {history.target}g
                </p>
                <p className="text-gray-700 flex items-center">
                  <FaWeightHanging className="mr-2 text-orange-500" />
                  <span className="font-medium text-orange-600">Weight:</span> {history.weight}g
                </p>
                <p className="text-gray-700 flex items-center">
                  <FaVial className="mr-2 text-orange-500" />
                  <span className="font-medium text-orange-600">pH:</span>{" "}
                  <span className="ml-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium">
                    {history.ph}
                  </span>
                </p>
                <p className="text-gray-700 flex items-center">
                  <FaRobot className="mr-2 text-orange-500" />
                  <span className="font-medium text-orange-600">Feeder 1:</span>
                  <div className="flex items-center ml-2 w-full max-w-[120px]">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-orange-500 h-3 rounded-full group-hover:bg-orange-600 transition-colors duration-200"
                        style={{ width: `${history.feeder_level1}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm">{history.feeder_level1}%</span>
                  </div>
                </p>
                <p className="text-gray-700 flex items-center">
                  <FaRobot className="mr-2 text-orange-500" />
                  <span className="font-medium text-orange-600">Feeder 2:</span>
                  <div className="flex items-center ml-2 w-full max-w-[120px]">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-orange-500 h-3 rounded-full group-hover:bg-orange-600 transition-colors duration-200"
                        style={{ width: `${history.feeder_level2}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm">{history.feeder_level2}%</span>
                  </div>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Histories;