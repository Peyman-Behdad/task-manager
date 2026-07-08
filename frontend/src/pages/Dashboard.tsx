import { useTasks } from "../hooks/useTasks";

export default function Dashboard() {
  // استفاده از هوکی که قبلاً ساختیم برای گرفتن تسک‌ها
  const { data: tasks, isLoading } = useTasks();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">وظایف من</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          + تسک جدید
        </button>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-500">در حال بارگذاری...</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border p-6 text-center text-gray-500">
          {tasks?.length === 0
            ? "هنوز تسکی اضافه نکرده‌اید!"
            : `${tasks?.length} تسک دارید.`}
        </div>
      )}
    </div>
  );
}
