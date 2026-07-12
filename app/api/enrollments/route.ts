import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const requiredFields = ["phone", "schedule", "courseSlug"] as const;

export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (!requiredFields.every((field) => typeof data[field] === "string" && data[field].trim())) {
      return NextResponse.json({ error: "Thiếu thông tin bắt buộc." }, { status: 400 });
    }
    if (data.phone.trim().length < 6 || data.phone.trim().length > 30 || !["morning", "afternoon", "evening"].includes(data.schedule) || !/^[a-z0-9-]{3,80}$/.test(data.courseSlug) || (data.note !== undefined && (typeof data.note !== "string" || data.note.length > 1000))) {
      return NextResponse.json({ error: "Thông tin không hợp lệ." }, { status: 400 });
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceRoleKey) {
      return NextResponse.json({ error: "Hệ thống đăng ký chưa được cấu hình." }, { status: 503 });
    }

    const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
    if (!token) return NextResponse.json({ error: "Bạn cần đăng nhập trước khi đăng ký khóa học." }, { status: 401 });

    const supabase = createClient(url, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) return NextResponse.json({ error: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại." }, { status: 401 });

    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("id")
      .eq("slug", data.courseSlug)
      .eq("is_published", true)
      .maybeSingle();
    if (courseError || !course) return NextResponse.json({ error: "Khóa học này hiện không còn mở đăng ký." }, { status: 404 });

    const { error } = await supabase.from("course_enrollments").insert({
      user_id: user.id,
      course_id: course.id,
      phone: data.phone.trim(),
      preferred_schedule: data.schedule,
      note: typeof data.note === "string" && data.note.trim() ? data.note.trim() : null,
    });
    if (error) {
      if (error.code === "23505") return NextResponse.json({ error: "Khóa học này đã được lưu trong tài khoản của bạn." }, { status: 409 });
      console.error("Supabase enrollment insert failed", error.message);
      return NextResponse.json({ error: "Không thể lưu đăng ký." }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Yêu cầu không hợp lệ." }, { status: 400 });
  }
}
