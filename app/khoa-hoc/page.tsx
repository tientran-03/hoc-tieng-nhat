import { createClient } from "../../utils/supabase/server";
import KhoaHocClient from "./KhoaHocClient";

export default async function KhoaHocPage() {
  const supabase = await createClient();

  // Truy vấn dữ liệu
  const { data: courses, error } = await supabase
    .from('courses')
    .select(`
      id, title, color, icon,
      course_classes (
        id, class_name, time_slot, start_date, status, schedule, session_count, location
      )
    `);

  // --- PHẦN DEBUG ---
  if (error) {
    return (
      <div className="p-10 bg-red-50 text-red-900 border border-red-200 rounded-lg m-10">
        <h1 className="text-2xl font-bold mb-4">Lỗi kết nối Supabase!</h1>
        <p className="font-semibold">Thông báo lỗi:</p>
        <code className="bg-red-100 p-2 block mt-2">{error.message}</code>
        <p className="mt-4 font-semibold">Chi tiết:</p>
        <pre className="bg-gray-800 text-white p-4 mt-2 overflow-x-auto rounded">
          {JSON.stringify(error, null, 2)}
        </pre>
        <p className="mt-4">
          Gợi ý: Kiểm tra xem tên bảng <strong>'courses'</strong> và <strong>'course_classes'</strong> 
          trong Database có khớp chính xác không (có dấu cách hay viết hoa không).
        </p>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-bold">Không tìm thấy dữ liệu khóa học.</h1>
        <p>Kiểm tra lại xem bảng 'courses' đã có dữ liệu chưa.</p>
      </div>
    );
  }
  // ------------------

  return <KhoaHocClient initialCourses={courses} />;
}