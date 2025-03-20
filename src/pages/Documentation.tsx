import { FaBook } from "react-icons/fa";

const Documentation: React.FC = () => {
  const baseUrl = "https://myapi.agungbot.my.id";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-orange-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-orange-600 mb-8 flex items-center justify-center sm:justify-start">
          <FaBook className="mr-3 text-lg sm:text-xl md:text-2xl" /> API Documentation
        </h1>

        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-orange-600 mb-4 text-center sm:text-left">Overview</h2>
          <p className="text-gray-700 text-sm sm:text-base text-center sm:text-left">
            Dokumentasi ini mencakup semua endpoint API untuk aplikasi Banana Dryer. Base URL untuk semua request adalah: <code className="bg-gray-100 p-1 rounded">{baseUrl}</code>. Semua request menggunakan format JSON dan membutuhkan header <code>Content-Type: application/json</code> untuk metode POST dan PUT.
          </p>
        </section>

        {/* Devices */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-orange-600 mb-4 text-center sm:text-left">Devices</h2>

          {/* GET /devices */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-orange-500 break-words">GET {baseUrl}/devices</h3>
            <p className="text-gray-700 mt-2 text-sm sm:text-base">Mengambil daftar semua perangkat yang terdaftar.</p>
            <div className="mt-4 text-sm sm:text-base">
              <strong>Request:</strong>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>Metode: GET</li>
                <li>Header: Tidak diperlukan</li>
                <li>Body: Tidak ada</li>
              </ul>
              <strong>Response (Sukses - 200 OK):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`[
  {
    "id": 1,
    "token": "abc123",
    "state": "idle",
    "temperature": 25,
    "humidity": 60,
    "ph": 6.5,
    "weight": 500,
    "target": 600,
    "feeder_level1": 80,
    "feeder_level2": 90,
    "created_at": "2025-03-20T10:00:00",
    "updated_at": "2025-03-20T10:00:00"
  }
]`}
              </pre>
              <strong>Response (Error - 500 Internal Server Error):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "error": "Failed to fetch devices",
  "details": "Database error message"
}`}
              </pre>
            </div>
          </div>

          {/* POST /devices */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-orange-500 break-words">POST {baseUrl}/devices</h3>
            <p className="text-gray-700 mt-2 text-sm sm:text-base">Menambahkan perangkat baru ke sistem.</p>
            <div className="mt-4 text-sm sm:text-base">
              <strong>Request:</strong>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>Metode: POST</li>
                <li>Header: <code>Content-Type: application/json</code></li>
                <li>Body:</li>
              </ul>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "token": "abc123",
  "state": "idle",
  "temperature": 25,
  "humidity": 60,
  "ph": 6.5,
  "weight": 500,
  "target": 600,
  "feeder_level1": 80,
  "feeder_level2": 90
}`}
              </pre>
              <p className="text-gray-600 text-xs sm:text-sm mt-2">
                Catatan: <code>token</code> wajib, field lain opsional (default: <code>state: "idle"</code>, lainnya: <code>0</code>). <code>state</code> hanya boleh: <code>"idle", "feed", "take_picture", "drying", "finished"</code>.
              </p>
              <strong>Response (Sukses - 200 OK):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "message": "Device added",
  "id": 1
}`}
              </pre>
              <strong>Response (Error - 400 Bad Request):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "error": "Token is required"
}`}
              </pre>
              <strong>Response (Error - 500 Internal Server Error):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "error": "Failed to add device",
  "details": "Database error message"
}`}
              </pre>
            </div>
          </div>

          {/* PUT /devices/:id */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-orange-500 break-words">PUT {baseUrl}/devices/:id</h3>
            <p className="text-gray-700 mt-2 text-sm sm:text-base">Memperbarui data perangkat berdasarkan ID.</p>
            <div className="mt-4 text-sm sm:text-base">
              <strong>Request:</strong>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>Metode: PUT</li>
                <li>Header: <code>Content-Type: application/json</code></li>
                <li>Body (opsional):</li>
              </ul>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "state": "drying",
  "temperature": 30,
  "humidity": 50
}`}
              </pre>
              <p className="text-gray-600 text-xs sm:text-sm mt-2">
                Catatan: Semua field opsional. Default: <code>state: "idle"</code>, lainnya: <code>0</code>.
              </p>
              <strong>Response (Sukses - 200 OK):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "message": "Device updated"
}`}
              </pre>
              <strong>Response (Error - 400 Bad Request):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "error": "Invalid state value"
}`}
              </pre>
              <strong>Response (Error - 404 Not Found):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "error": "Device not found"
}`}
              </pre>
            </div>
          </div>

          {/* DELETE /devices/:id */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
            <h3 className="text-lg sm:text-xl font-semibold text-orange-500 break-words">DELETE {baseUrl}/devices/:id</h3>
            <p className="text-gray-700 mt-2 text-sm sm:text-base">Menghapus perangkat berdasarkan ID.</p>
            <div className="mt-4 text-sm sm:text-base">
              <strong>Request:</strong>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>Metode: DELETE</li>
                <li>Header: Tidak diperlukan</li>
                <li>Body: Tidak ada</li>
              </ul>
              <strong>Response (Sukses - 200 OK):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "message": "Device deleted"
}`}
              </pre>
              <strong>Response (Error - 404 Not Found):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "error": "Device not found"
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Histories */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-orange-600 mb-4 text-center sm:text-left">Histories</h2>

          {/* GET /histories */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-orange-500 break-words">GET {baseUrl}/histories</h3>
            <p className="text-gray-700 mt-2 text-sm sm:text-base">Mengambil daftar semua riwayat perangkat.</p>
            <div className="mt-4 text-sm sm:text-base">
              <strong>Request:</strong>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>Metode: GET</li>
                <li>Header: Tidak diperlukan</li>
                <li>Body: Tidak ada</li>
              </ul>
              <strong>Response (Sukses - 200 OK):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`[
  {
    "id": 1,
    "device_id": 1,
    "temperature": 25,
    "humidity": 60,
    "target": 600,
    "weight": 500,
    "ph": 6.5,
    "feeder_level1": 80,
    "feeder_level2": 90,
    "created_at": "2025-03-20T10:00:00",
    "updated_at": "2025-03-20T10:00:00"
  }
]`}
              </pre>
              <strong>Response (Error - 500 Internal Server Error):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "error": "Failed to fetch histories",
  "details": "Database error message"
}`}
              </pre>
            </div>
          </div>

          {/* POST /histories */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-orange-500 break-words">POST {baseUrl}/histories</h3>
            <p className="text-gray-700 mt-2 text-sm sm:text-base">Menambahkan entri riwayat baru.</p>
            <div className="mt-4 text-sm sm:text-base">
              <strong>Request:</strong>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>Metode: POST</li>
                <li>Header: <code>Content-Type: application/json</code></li>
                <li>Body:</li>
              </ul>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "device_id": 1,
  "temperature": 25,
  "humidity": 60,
  "target": 600,
  "weight": 500,
  "ph": 6.5,
  "feeder_level1": 80,
  "feeder_level2": 90
}`}
              </pre>
              <p className="text-gray-600 text-xs sm:text-sm mt-2">
                Catatan: <code>device_id</code> wajib dan harus ada di tabel <code>devices</code>. Field lain opsional (default: <code>0</code>).
              </p>
              <strong>Response (Sukses - 200 OK):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "message": "History added",
  "id": 1
}`}
              </pre>
              <strong>Response (Error - 400 Bad Request):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "error": "device_id is required"
}`}
              </pre>
              <strong>Response (Error - 404 Not Found):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "error": "Device not found"
}`}
              </pre>
            </div>
          </div>

          {/* DELETE /histories/:id */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
            <h3 className="text-lg sm:text-xl font-semibold text-orange-500 break-words">DELETE {baseUrl}/histories/:id</h3>
            <p className="text-gray-700 mt-2 text-sm sm:text-base">Menghapus entri riwayat berdasarkan ID.</p>
            <div className="mt-4 text-sm sm:text-base">
              <strong>Request:</strong>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>Metode: DELETE</li>
                <li>Header: Tidak diperlukan</li>
                <li>Body: Tidak ada</li>
              </ul>
              <strong>Response (Sukses - 200 OK):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "message": "History deleted"
}`}
              </pre>
              <strong>Response (Error - 404 Not Found):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "error": "History not found"
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Schedules */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-orange-600 mb-4 text-center sm:text-left">Schedules</h2>

          {/* GET /schedules */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-orange-500 break-words">GET {baseUrl}/schedules</h3>
            <p className="text-gray-700 mt-2 text-sm sm:text-base">Mengambil daftar semua jadwal.</p>
            <div className="mt-4 text-sm sm:text-base">
              <strong>Request:</strong>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>Metode: GET</li>
                <li>Header: Tidak diperlukan</li>
                <li>Body: Tidak ada</li>
              </ul>
              <strong>Response (Sukses - 200 OK):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`[
  {
    "id": 1,
    "device_id": 1,
    "timer": "08:00:00",
    "target": 600,
    "drying_mode": "aktif",
    "active": 1,
    "created_at": "2025-03-20T10:00:00",
    "updated_at": "2025-03-20T10:00:00"
  }
]`}
              </pre>
              <strong>Response (Error - 500 Internal Server Error):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "error": "Failed to fetch schedules",
  "details": "Database error message"
}`}
              </pre>
            </div>
          </div>

          {/* POST /schedules */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-orange-500 break-words">POST {baseUrl}/schedules</h3>
            <p className="text-gray-700 mt-2 text-sm sm:text-base">Menambahkan jadwal baru.</p>
            <div className="mt-4 text-sm sm:text-base">
              <strong>Request:</strong>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>Metode: POST</li>
                <li>Header: <code>Content-Type: application/json</code></li>
                <li>Body:</li>
              </ul>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "device_id": 1,
  "timer": "08:00:00",
  "target": 600,
  "drying_mode": "aktif",
  "active": 1
}`}
              </pre>
              <p className="text-gray-600 text-xs sm:text-sm mt-2">
                Catatan: <code>device_id</code> dan <code>timer</code> wajib. <code>timer</code> harus dalam format <code>HH:MM:SS</code>. <code>drying_mode</code> hanya boleh: <code>"aktif", "tidak aktif"</code>. <code>active</code> hanya boleh: <code>0, 1</code>.
              </p>
              <strong>Response (Sukses - 200 OK):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "message": "Schedule added",
  "id": 1
}`}
              </pre>
              <strong>Response (Error - 400 Bad Request):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "error": "Timer must be in HH:MM:SS format"
}`}
              </pre>
              <strong>Response (Error - 404 Not Found):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "error": "Device not found"
}`}
              </pre>
            </div>
          </div>

          {/* PUT /schedules/:id */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-orange-500 break-words">PUT {baseUrl}/schedules/:id</h3>
            <p className="text-gray-700 mt-2 text-sm sm:text-base">Memperbarui jadwal berdasarkan ID.</p>
            <div className="mt-4 text-sm sm:text-base">
              <strong>Request:</strong>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>Metode: PUT</li>
                <li>Header: <code>Content-Type: application/json</code></li>
                <li>Body (opsional):</li>
              </ul>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "timer": "10:00:00",
  "target": 700,
  "drying_mode": "tidak aktif",
  "active": 0
}`}
              </pre>
              <p className="text-gray-600 text-xs sm:text-sm mt-2">
                Catatan: Semua field opsional. Jika tidak dikirim, nilai existing dipertahankan.
              </p>
              <strong>Response (Sukses - 200 OK):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "message": "Schedule updated"
}`}
              </pre>
              <strong>Response (Error - 400 Bad Request):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "error": "Invalid drying_mode value. Must be 'aktif' or 'tidak aktif'"
}`}
              </pre>
              <strong>Response (Error - 404 Not Found):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "error": "Schedule not found"
}`}
              </pre>
            </div>
          </div>

          {/* DELETE /schedules/:id */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
            <h3 className="text-lg sm:text-xl font-semibold text-orange-500 break-words">DELETE {baseUrl}/schedules/:id</h3>
            <p className="text-gray-700 mt-2 text-sm sm:text-base">Menghapus jadwal berdasarkan ID.</p>
            <div className="mt-4 text-sm sm:text-base">
              <strong>Request:</strong>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>Metode: DELETE</li>
                <li>Header: Tidak diperlukan</li>
                <li>Body: Tidak ada</li>
              </ul>
              <strong>Response (Sukses - 200 OK):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "message": "Schedule deleted"
}`}
              </pre>
              <strong>Response (Error - 404 Not Found):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "error": "Schedule not found"
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Drying Logs */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-orange-600 mb-4 text-center sm:text-left">Drying Logs</h2>

          {/* GET /drying_logs */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-orange-500 break-words">GET {baseUrl}/drying_logs</h3>
            <p className="text-gray-700 mt-2 text-sm sm:text-base">Mengambil daftar semua log pengeringan.</p>
            <div className="mt-4 text-sm sm:text-base">
              <strong>Request:</strong>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>Metode: GET</li>
                <li>Header: Tidak diperlukan</li>
                <li>Body: Tidak ada</li>
              </ul>
              <strong>Response (Sukses - 200 OK):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`[
  {
    "id": 1,
    "device_id": 1,
    "start_time": "2025-03-20T08:00:00",
    "end_time": "2025-03-20T10:00:00",
    "drying_mode": "aktif",
    "final_weight": 550,
    "status": "completed",
    "created_at": "2025-03-20T10:00:00",
    "updated_at": "2025-03-20T10:00:00"
  }
]`}
              </pre>
              <strong>Response (Error - 500 Internal Server Error):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "error": "Failed to fetch drying logs",
  "details": "Database error message"
}`}
              </pre>
            </div>
          </div>

          {/* POST /drying_logs */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-orange-500 break-words">POST {baseUrl}/drying_logs</h3>
            <p className="text-gray-700 mt-2 text-sm sm:text-base">Menambahkan log pengeringan baru.</p>
            <div className="mt-4 text-sm sm:text-base">
              <strong>Request:</strong>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>Metode: POST</li>
                <li>Header: <code>Content-Type: application/json</code></li>
                <li>Body:</li>
              </ul>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "device_id": 1,
  "start_time": "2025-03-20T08:00:00",
  "end_time": "2025-03-20T10:00:00",
  "drying_mode": "aktif",
  "final_weight": 550,
  "status": "completed"
}`}
              </pre>
              <p className="text-gray-600 text-xs sm:text-sm mt-2">
                Catatan: <code>device_id</code> wajib. <code>drying_mode</code> hanya boleh: <code>"aktif", "tidak aktif"</code>. <code>status</code> hanya boleh: <code>"in_progress", "completed", "failed"</code>.
              </p>
              <strong>Response (Sukses - 200 OK):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "message": "Drying log added",
  "id": 1
}`}
              </pre>
              <strong>Response (Error - 400 Bad Request):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "error": "Invalid status value"
}`}
              </pre>
              <strong>Response (Error - 404 Not Found):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "error": "Device not found"
}`}
              </pre>
            </div>
          </div>

          {/* PUT /drying_logs/:id */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-orange-500 break-words">PUT {baseUrl}/drying_logs/:id</h3>
            <p className="text-gray-700 mt-2 text-sm sm:text-base">Memperbarui log pengeringan berdasarkan ID.</p>
            <div className="mt-4 text-sm sm:text-base">
              <strong>Request:</strong>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>Metode: PUT</li>
                <li>Header: <code>Content-Type: application/json</code></li>
                <li>Body (opsional):</li>
              </ul>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "end_time": "2025-03-20T11:00:00",
  "drying_mode": "tidak aktif",
  "final_weight": 540,
  "status": "failed"
}`}
              </pre>
              <strong>Response (Sukses - 200 OK):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "message": "Drying log updated"
}`}
              </pre>
              <strong>Response (Error - 400 Bad Request):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "error": "Invalid drying_mode value. Must be 'aktif' or 'tidak aktif'"
}`}
              </pre>
              <strong>Response (Error - 404 Not Found):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "error": "Drying log not found"
}`}
              </pre>
            </div>
          </div>

          {/* DELETE /drying_logs/:id */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
            <h3 className="text-lg sm:text-xl font-semibold text-orange-500 break-words">DELETE {baseUrl}/drying_logs/:id</h3>
            <p className="text-gray-700 mt-2 text-sm sm:text-base">Menghapus log pengeringan berdasarkan ID.</p>
            <div className="mt-4 text-sm sm:text-base">
              <strong>Request:</strong>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>Metode: DELETE</li>
                <li>Header: Tidak diperlukan</li>
                <li>Body: Tidak ada</li>
              </ul>
              <strong>Response (Sukses - 200 OK):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "message": "Drying log deleted"
}`}
              </pre>
              <strong>Response (Error - 404 Not Found):</strong>
              <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-2 overflow-x-auto text-xs sm:text-sm">
                {`{
  "error": "Drying log not found"
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Contoh Penggunaan */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-orange-600 mb-4 text-center sm:text-left">Contoh Penggunaan (Fetch API)</h2>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
            <p className="text-gray-700 mt-2 text-sm sm:text-base">Contoh request menggunakan JavaScript Fetch API:</p>
            <pre className="bg-gray-100 p-2 sm:p-4 rounded mt-4 overflow-x-auto text-xs sm:text-sm">
              {`// GET /devices
fetch('${baseUrl}/devices')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// POST /schedules
fetch('${baseUrl}/schedules', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    device_id: 1,
    timer: '08:00:00',
    target: 600,
    drying_mode: 'aktif',
    active: 1
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// PUT /devices/1
fetch('${baseUrl}/devices/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    state: 'drying',
    temperature: 30
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// DELETE /histories/1
fetch('${baseUrl}/histories/1', {
  method: 'DELETE'
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
`}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Documentation;
