import { useEffect, useState } from "react";
import { FaCalendarAlt, FaClock, FaBullseye, FaRobot, FaCheckCircle, FaTimesCircle, FaSpinner, FaEdit, FaSave } from "react-icons/fa";

interface Schedule {
  id: number;
  device_id: number;
  timer: string;
  target: number;
  drying_mode: "aktif" | "tidak aktif";
  active: number;
  created_at: string;
  updated_at: string;
}

const Schedules: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Schedule>>({});

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await fetch("https://myapi.agungbot.my.id/schedules");
        if (!response.ok) throw new Error("Failed to fetch schedules");
        const data: Schedule[] = await response.json();
        setSchedules(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  const handleEditClick = (schedule: Schedule) => {
    setEditingId(schedule.id);
    setEditForm({
      timer: schedule.timer,
      target: schedule.target,
      drying_mode: schedule.drying_mode,
      active: schedule.active, // Pastikan active juga disertakan
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: name === "active" ? parseInt(value) : value }));
  };

  const handleSave = async (id: number) => {
    try {
      const response = await fetch(`https://myapi.agungbot.my.id/schedules/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to update schedule");

      setSchedules((prev) =>
        prev.map((schedule) =>
          schedule.id === id ? { ...schedule, ...editForm } : schedule
        )
      );
      setEditingId(null);
      alert("Schedule updated successfully!");
    } catch (err) {
      setError((err as Error).message);
    }
  };

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
            <FaCalendarAlt className="mr-3" /> Schedules
            <span className="ml-3 bg-orange-500 text-white text-sm font-medium px-3 py-1 rounded-full shadow-md">
              {schedules.length}
            </span>
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedules.map((schedule) => (
            <div
              key={schedule.id}
              className="group bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-orange-500 hover:scale-105 transform bg-gradient-to-br from-white to-orange-50"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-orange-600 flex items-center">
                  <FaCalendarAlt className="mr-2" /> Schedule #{schedule.id}
                </h3>
                <div className="flex space-x-2">
                  {editingId === schedule.id ? (
                    <button
                      onClick={() => handleSave(schedule.id)}
                      className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                    >
                      <FaSave />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditClick(schedule)}
                      className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
                    >
                      <FaEdit />
                    </button>
                  )}
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${
                      schedule.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {schedule.active ? <FaCheckCircle className="mr-1 animate-pulse" /> : <FaTimesCircle className="mr-1" />}
                    {schedule.active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 flex items-center">
                  <FaRobot className="mr-2 text-orange-500" />
                  <span className="font-medium text-orange-600">Device:</span> {schedule.device_id}
                </p>
                <p className="text-gray-700 flex items-center">
                  <FaClock className="mr-2 text-orange-500" />
                  <span className="font-medium text-orange-600">Timer:</span>{" "}
                  {editingId === schedule.id ? (
                    <input
                      type="text"
                      name="timer"
                      value={editForm.timer || ""}
                      onChange={handleInputChange}
                      className="ml-2 px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm font-medium border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="HH:MM:SS"
                    />
                  ) : (
                    <span className="ml-2 px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm font-medium">
                      {schedule.timer}
                    </span>
                  )}
                </p>
                <p className="text-gray-700 flex items-center">
                  <FaBullseye className="mr-2 text-orange-500" />
                  <span className="font-medium text-orange-600">Target:</span>{" "}
                  {editingId === schedule.id ? (
                    <input
                      type="number"
                      name="target"
                      value={editForm.target || ""}
                      onChange={handleInputChange}
                      className="ml-2 px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm font-medium border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Target (g)"
                    />
                  ) : (
                    `${schedule.target}g`
                  )}
                </p>
                <p className="text-gray-700 flex items-center">
                  <FaRobot className="mr-2 text-orange-500" />
                  <span className="font-medium text-orange-600">Mode:</span>{" "}
                  {editingId === schedule.id ? (
                    <select
                      name="drying_mode"
                      value={editForm.drying_mode || ""}
                      onChange={handleInputChange}
                      className="ml-2 px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm font-medium border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="aktif">Aktif</option>
                      <option value="tidak aktif">Tidak Aktif</option>
                    </select>
                  ) : (
                    <span
                      className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                        schedule.drying_mode === "aktif" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {schedule.drying_mode === "aktif" ? "Aktif" : "Tidak Aktif"}
                    </span>
                  )}
                </p>
                <p className="text-gray-700 flex items-center">
                  <FaCheckCircle className="mr-2 text-orange-500" />
                  <span className="font-medium text-orange-600">Active:</span>{" "}
                  {editingId === schedule.id ? (
                    <select
                      name="active"
                      value={editForm.active || 0}
                      onChange={handleInputChange}
                      className="ml-2 px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm font-medium border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value={1}>Active</option>
                      <option value={0}>Inactive</option>
                    </select>
                  ) : (
                    <span
                      className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                        schedule.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {schedule.active ? "Active" : "Inactive"}
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedules;