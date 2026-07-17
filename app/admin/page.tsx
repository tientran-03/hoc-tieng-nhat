"use client";

import { useState, useEffect } from "react";
import { getSupabaseBrowserClient } from "../../lib/supabase/client";
import { parseFacebookVideoInput } from "../../utils/facebook-video";

/* ──────────── TYPES ──────────── */
interface ClassInfo {
  id?: string;
  tenLop: string;
  time: string;
  khaiGiang: string;
  status: string;
  thu: string;
  soBuoi: number;
  coSo: string;
}

interface CourseData {
  id?: string;
  id_code: string;
  title: string;
  desc: string;
  color: string;
  icon: string;
  classes: ClassInfo[];
}

interface HomeSection {
  id?: string;
  section_type: "pronunciation" | "video" | "custom";
  title: string;
  sort_order: number;
  is_visible: boolean;
}

interface PronunciationItem {
  id?: string;
  section_id: string;
  japanese_text: string;
  romaji: string;
  meaning: string;
  sort_order: number;
}

interface VideoItem {
  id?: string;
  section_id: string;
  video_url: string;
  video_title: string;
  sort_order: number;
}

/* ──────────── MAIN COMPONENT ──────────── */
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"courses" | "sections">("courses");

  // ──── COURSE STATE ────
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showClassForm, setShowClassForm] = useState(false);

  const [newCourse, setNewCourse] = useState({
    id_code: "", title: "", desc: "", color: "bg-coral", icon: "📚"
  });
  const [newClass, setNewClass] = useState<ClassInfo>({
    tenLop: "", time: "", khaiGiang: "", status: "Còn chỗ", thu: "", soBuoi: 48, coSo: ""
  });

  // ──── SECTIONS STATE ────
  const [sections, setSections] = useState<HomeSection[]>([]);
  const [selectedSection, setSelectedSection] = useState<HomeSection | null>(null);
  const [showSectionForm, setShowSectionForm] = useState(false);
  const [newSection, setNewSection] = useState<{ section_type: "pronunciation" | "video"; title: string }>({
    section_type: "pronunciation", title: ""
  });

  // Pronunciation items
  const [pronItems, setPronItems] = useState<PronunciationItem[]>([]);
  const [showPronForm, setShowPronForm] = useState(false);
  const [newPron, setNewPron] = useState({ japanese_text: "", romaji: "", meaning: "" });

  // Video items
  const [videoItems, setVideoItems] = useState<VideoItem[]>([]);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [newVideo, setNewVideo] = useState({ video_url: "", video_title: "" });

  /* ═══════════════════════════════════════════
     LOAD DATA
     ═══════════════════════════════════════════ */
  useEffect(() => {
    loadCourses();
    loadSections();
  }, []);

  const loadCourses = async () => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) { setLoading(false); return; }
    try {
      const { data: coursesData } = await supabase.from("courses").select("*").order("level", { ascending: true });
      const coursesWithClasses = await Promise.all(
        (coursesData || []).map(async (course) => {
          const { data: classesData } = await supabase
            .from("course_classes").select("*").eq("course_id", course.id).order("created_at", { ascending: true });
          return {
            id: course.id, id_code: course.level, title: course.title, desc: course.description,
            color: course.color || "bg-coral", icon: course.icon || "📚",
            classes: (classesData || []).map((cls) => ({
              id: cls.id, tenLop: cls.class_name, time: cls.time_slot, khaiGiang: cls.start_date,
              status: cls.status, thu: cls.schedule, soBuoi: cls.session_count, coSo: cls.location
            }))
          };
        })
      );
      setCourses(coursesWithClasses);
      if (coursesWithClasses.length > 0) setSelectedCourse(coursesWithClasses[0]);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const loadSections = async () => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    try {
      const { data } = await supabase.from("home_sections").select("*").order("sort_order", { ascending: true });
      setSections(data || []);
    } catch (e) { console.error(e); }
  };

  const loadSectionItems = async (section: HomeSection) => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase || !section.id) return;
    if (section.section_type === "pronunciation") {
      const { data } = await supabase.from("pronunciation_items").select("*").eq("section_id", section.id).order("sort_order");
      setPronItems(data || []);
    } else if (section.section_type === "video") {
      const { data } = await supabase.from("video_items").select("*").eq("section_id", section.id).order("sort_order");
      setVideoItems(data || []);
    }
  };

  /* ═══════════════════════════════════════════
     COURSE HANDLERS
     ═══════════════════════════════════════════ */
  const handleAddCourse = async () => {
    if (!newCourse.id_code || !newCourse.title) return;
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    try {
      const { data, error } = await supabase.from("courses").insert({
        slug: newCourse.id_code.toLowerCase().replace(/\s+/g, "-"),
        level: newCourse.id_code, title: newCourse.title, description: newCourse.desc,
        tuition_fee: 0, session_count: 1, class_schedule: "", seats_available: 0,
        is_published: true, color: newCourse.color, icon: newCourse.icon
      }).select().single();
      if (error) throw error;
      const c: CourseData = { id: data.id, ...newCourse, classes: [] };
      setCourses([...courses, c]);
      setNewCourse({ id_code: "", title: "", desc: "", color: "bg-coral", icon: "📚" });
      setShowCourseForm(false);
    } catch (e) { console.error(e); alert("Lỗi khi thêm khóa học"); }
  };

  const handleDeleteCourse = async (id: string) => {
    if (!confirm("Xóa khóa học này?")) return;
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    try {
      await supabase.from("courses").delete().eq("id", id);
      setCourses(courses.filter(c => c.id !== id));
      if (selectedCourse?.id === id) setSelectedCourse(null);
    } catch (e) { console.error(e); alert("Lỗi khi xóa"); }
  };

  const handleAddClass = async () => {
    if (!selectedCourse?.id || !newClass.tenLop) return;
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    try {
      const { data, error } = await supabase.from("course_classes").insert({
        course_id: selectedCourse.id, class_name: newClass.tenLop, time_slot: newClass.time,
        start_date: newClass.khaiGiang, status: newClass.status, schedule: newClass.thu,
        session_count: newClass.soBuoi, location: newClass.coSo
      }).select().single();
      if (error) throw error;
      const cls: ClassInfo = { id: data.id, ...newClass };
      const updated = courses.map(c => c.id === selectedCourse.id ? { ...c, classes: [...c.classes, cls] } : c);
      setCourses(updated);
      setSelectedCourse(updated.find(c => c.id === selectedCourse.id) || null);
      setNewClass({ tenLop: "", time: "", khaiGiang: "", status: "Còn chỗ", thu: "", soBuoi: 48, coSo: "" });
      setShowClassForm(false);
    } catch (e) { console.error(e); alert("Lỗi khi thêm lớp"); }
  };

  const handleDeleteClass = async (classId: string) => {
    if (!confirm("Xóa lớp học này?")) return;
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    try {
      await supabase.from("course_classes").delete().eq("id", classId);
      if (selectedCourse) {
        const updated = courses.map(c => c.id === selectedCourse.id ? { ...c, classes: c.classes.filter(cl => cl.id !== classId) } : c);
        setCourses(updated);
        setSelectedCourse(updated.find(c => c.id === selectedCourse.id) || null);
      }
    } catch (e) { console.error(e); alert("Lỗi khi xóa lớp"); }
  };

  /* ═══════════════════════════════════════════
     SECTION HANDLERS
     ═══════════════════════════════════════════ */
  const handleAddSection = async () => {
    if (!newSection.title) return;
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    try {
      const { data, error } = await supabase.from("home_sections").insert({
        section_type: newSection.section_type, title: newSection.title,
        sort_order: sections.length, is_visible: true
      }).select().single();
      if (error) throw error;
      setSections([...sections, data]);
      setNewSection({ section_type: "pronunciation", title: "" });
      setShowSectionForm(false);
    } catch (e) { console.error(e); alert("Lỗi khi thêm section"); }
  };

  const handleDeleteSection = async (id: string) => {
    if (!confirm("Xóa section này?")) return;
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    try {
      await supabase.from("home_sections").delete().eq("id", id);
      setSections(sections.filter(s => s.id !== id));
      if (selectedSection?.id === id) { setSelectedSection(null); setPronItems([]); setVideoItems([]); }
    } catch (e) { console.error(e); alert("Lỗi khi xóa section"); }
  };

  const handleToggleVisibility = async (section: HomeSection) => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase || !section.id) return;
    try {
      await supabase.from("home_sections").update({ is_visible: !section.is_visible }).eq("id", section.id);
      setSections(sections.map(s => s.id === section.id ? { ...s, is_visible: !s.is_visible } : s));
    } catch (e) { console.error(e); }
  };

  const handleAddPron = async () => {
    if (!selectedSection?.id || !newPron.japanese_text) return;
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    try {
      const { data, error } = await supabase.from("pronunciation_items").insert({
        section_id: selectedSection.id, japanese_text: newPron.japanese_text,
        romaji: newPron.romaji, meaning: newPron.meaning, sort_order: pronItems.length
      }).select().single();
      if (error) throw error;
      setPronItems([...pronItems, data]);
      setNewPron({ japanese_text: "", romaji: "", meaning: "" });
      setShowPronForm(false);
    } catch (e) { console.error(e); alert("Lỗi khi thêm phát âm"); }
  };

  const handleDeletePron = async (id: string) => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    try {
      await supabase.from("pronunciation_items").delete().eq("id", id);
      setPronItems(pronItems.filter(p => p.id !== id));
    } catch (e) { console.error(e); }
  };

  const handleAddVideo = async () => {
    if (!selectedSection?.id || !newVideo.video_url) return;

    const parsed = parseFacebookVideoInput(newVideo.video_url);
    if (!parsed) {
      alert(
        "Link không hợp lệ.\n\nDán một trong các dạng sau:\n• https://www.facebook.com/reel/4605365359740076/\n• https://www.facebook.com/watch?v=...\n• Hoặc cả mã iframe embed từ Facebook"
      );
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    try {
      const { data, error } = await supabase.from("video_items").insert({
        section_id: selectedSection.id,
        video_url: parsed.canonicalUrl,
        video_title: newVideo.video_title,
        sort_order: videoItems.length,
      }).select().single();
      if (error) throw error;
      setVideoItems([...videoItems, data]);
      setNewVideo({ video_url: "", video_title: "" });
      setShowVideoForm(false);
    } catch (e) { console.error(e); alert("Lỗi khi thêm video"); }
  };

  const handleDeleteVideo = async (id: string) => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    try {
      await supabase.from("video_items").delete().eq("id", id);
      setVideoItems(videoItems.filter(v => v.id !== id));
    } catch (e) { console.error(e); }
  };

  /* ═══════════════════════════════════════════
     STYLES - Simple admin
     ═══════════════════════════════════════════ */
  const s = {
    page: { minHeight: "100vh", background: "#f5f5f5", fontFamily: "system-ui, sans-serif", color: "#333" } as React.CSSProperties,
    header: { background: "#fff", borderBottom: "1px solid #ddd", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" } as React.CSSProperties,
    headerTitle: { fontSize: 20, fontWeight: 700, margin: 0 } as React.CSSProperties,
    tabs: { display: "flex", gap: 0, background: "#fff", borderBottom: "1px solid #ddd" } as React.CSSProperties,
    tab: (active: boolean) => ({
      padding: "12px 24px", cursor: "pointer", fontWeight: 600, fontSize: 14, border: "none",
      background: active ? "#fff" : "#f5f5f5", borderBottom: active ? "2px solid #dd4b37" : "2px solid transparent",
      color: active ? "#dd4b37" : "#666"
    }) as React.CSSProperties,
    container: { maxWidth: 1200, margin: "0 auto", padding: "24px" } as React.CSSProperties,
    card: { background: "#fff", border: "1px solid #e0e0e0", borderRadius: 8, padding: 20, marginBottom: 16 } as React.CSSProperties,
    table: { width: "100%", borderCollapse: "collapse" as const, fontSize: 14 },
    th: { textAlign: "left" as const, padding: "10px 12px", background: "#f9f9f9", borderBottom: "2px solid #e0e0e0", fontWeight: 600, fontSize: 12, textTransform: "uppercase" as const, color: "#666" },
    td: { padding: "10px 12px", borderBottom: "1px solid #f0f0f0", verticalAlign: "middle" as const },
    btnPrimary: { background: "#dd4b37", color: "#fff", border: "none", borderRadius: 6, padding: "8px 16px", cursor: "pointer", fontWeight: 600, fontSize: 13 } as React.CSSProperties,
    btnSuccess: { background: "#2d8a56", color: "#fff", border: "none", borderRadius: 6, padding: "8px 16px", cursor: "pointer", fontWeight: 600, fontSize: 13 } as React.CSSProperties,
    btnDanger: { background: "#dc3545", color: "#fff", border: "none", borderRadius: 4, padding: "4px 10px", cursor: "pointer", fontWeight: 600, fontSize: 12 } as React.CSSProperties,
    btnSecondary: { background: "#6c757d", color: "#fff", border: "none", borderRadius: 6, padding: "8px 16px", cursor: "pointer", fontWeight: 600, fontSize: 13 } as React.CSSProperties,
    btnOutline: { background: "#fff", color: "#333", border: "1px solid #ccc", borderRadius: 6, padding: "8px 16px", cursor: "pointer", fontWeight: 600, fontSize: 13 } as React.CSSProperties,
    input: { width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6, fontSize: 14, outline: "none", boxSizing: "border-box" as const },
    select: { padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6, fontSize: 14, outline: "none" },
    label: { display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4 },
    badge: (color: string) => ({
      display: "inline-block", padding: "2px 8px", borderRadius: 4, fontSize: 11,
      fontWeight: 700, color: "#fff", background: color
    }) as React.CSSProperties,
    sectionTitle: { fontSize: 18, fontWeight: 700, margin: "0 0 16px 0" } as React.CSSProperties,
    grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } as React.CSSProperties,
    grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 } as React.CSSProperties,
    sidebar: { display: "grid", gridTemplateColumns: "300px 1fr", gap: 24 } as React.CSSProperties,
    listItem: (active: boolean) => ({
      padding: "12px 16px", borderRadius: 6, cursor: "pointer", marginBottom: 4,
      background: active ? "#dd4b37" : "#fff", color: active ? "#fff" : "#333",
      border: active ? "1px solid #dd4b37" : "1px solid #e0e0e0",
      display: "flex", justifyContent: "space-between", alignItems: "center"
    }) as React.CSSProperties,
  };

  if (loading) {
    return (
      <div style={s.page}>
        <div style={{ ...s.header }}><h1 style={s.headerTitle}> Quản trị</h1></div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
          <p style={{ fontSize: 16, color: "#666" }}>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      {/* HEADER */}
      <div style={s.header}>
        <h1 style={s.headerTitle}> Quản trị hệ thống</h1>
        <a href="/" style={{ fontSize: 13, color: "#dd4b37", textDecoration: "none", fontWeight: 600 }}>← Về trang chủ</a>
      </div>

      {/* TABS */}
      <div style={s.tabs}>
        <button style={s.tab(activeTab === "courses")} onClick={() => setActiveTab("courses")}>
           Quản lý Khóa học
        </button>
        <button style={s.tab(activeTab === "sections")} onClick={() => setActiveTab("sections")}>
           Quản lý Section trang chủ
        </button>
      </div>

      <div style={s.container}>

        {/* ════════════════════════════════════
            TAB 1: KHÓA HỌC
            ════════════════════════════════════ */}
        {activeTab === "courses" && (
          <div>
            {/* Course list & add */}
            <div style={{ ...s.card }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h2 style={s.sectionTitle}>Danh sách khóa học</h2>
                <button style={s.btnPrimary} onClick={() => setShowCourseForm(!showCourseForm)}>
                  + Thêm khóa học
                </button>
              </div>

              {showCourseForm && (
                <div style={{ background: "#f9f9f9", borderRadius: 8, padding: 16, marginBottom: 16, border: "1px solid #e0e0e0" }}>
                  <div style={s.grid3}>
                    <div>
                      <label style={s.label}>Mã khóa (VD: N2)</label>
                      <input style={s.input} value={newCourse.id_code} onChange={e => setNewCourse({ ...newCourse, id_code: e.target.value })} />
                    </div>
                    <div>
                      <label style={s.label}>Tên khóa học</label>
                      <input style={s.input} value={newCourse.title} onChange={e => setNewCourse({ ...newCourse, title: e.target.value })} />
                    </div>
                    <div>
                      <label style={s.label}>Icon</label>
                      <input style={s.input} value={newCourse.icon} onChange={e => setNewCourse({ ...newCourse, icon: e.target.value })} />
                    </div>
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <label style={s.label}>Mô tả</label>
                    <input style={s.input} value={newCourse.desc} onChange={e => setNewCourse({ ...newCourse, desc: e.target.value })} />
                  </div>
                  <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                    <button style={s.btnSuccess} onClick={handleAddCourse}>Lưu</button>
                    <button style={s.btnOutline} onClick={() => setShowCourseForm(false)}>Hủy</button>
                  </div>
                </div>
              )}

              <table style={s.table}>
                <thead>
                  <tr>
                    <th style={s.th}>Icon</th>
                    <th style={s.th}>Mã</th>
                    <th style={s.th}>Tên khóa học</th>
                    <th style={s.th}>Mô tả</th>
                    <th style={s.th}>Số lớp</th>
                    <th style={s.th}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map(c => (
                    <tr
                      key={c.id}
                      onClick={() => setSelectedCourse(c)}
                      style={{ cursor: "pointer", background: selectedCourse?.id === c.id ? "#fff5f4" : "transparent" }}
                    >
                      <td style={s.td}>{c.icon}</td>
                      <td style={s.td}><strong>{c.id_code}</strong></td>
                      <td style={s.td}>{c.title}</td>
                      <td style={{ ...s.td, maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.desc}</td>
                      <td style={s.td}><span style={s.badge("#2d8a56")}>{c.classes.length}</span></td>
                      <td style={s.td}>
                        <button style={s.btnDanger} onClick={e => { e.stopPropagation(); c.id && handleDeleteCourse(c.id); }}>Xóa</button>
                      </td>
                    </tr>
                  ))}
                  {courses.length === 0 && (
                    <tr><td colSpan={6} style={{ ...s.td, textAlign: "center", color: "#999", padding: 40 }}>Chưa có khóa học nào</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Class details for selected course */}
            {selectedCourse && (
              <div style={s.card}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div>
                    <h2 style={{ ...s.sectionTitle, marginBottom: 4 }}>Lớp học: {selectedCourse.title}</h2>
                    <p style={{ margin: 0, fontSize: 13, color: "#888" }}>{selectedCourse.desc}</p>
                  </div>
                  <button style={s.btnPrimary} onClick={() => setShowClassForm(!showClassForm)}>
                    + Thêm lớp
                  </button>
                </div>

                {showClassForm && (
                  <div style={{ background: "#f9f9f9", borderRadius: 8, padding: 16, marginBottom: 16, border: "1px solid #e0e0e0" }}>
                    <div style={s.grid3}>
                      <div><label style={s.label}>Tên lớp</label><input style={s.input} value={newClass.tenLop} onChange={e => setNewClass({ ...newClass, tenLop: e.target.value })} /></div>
                      <div><label style={s.label}>Thời gian</label><input style={s.input} placeholder="18:30-21:00" value={newClass.time} onChange={e => setNewClass({ ...newClass, time: e.target.value })} /></div>
                      <div><label style={s.label}>Khai giảng</label><input style={s.input} placeholder="24/07/2026" value={newClass.khaiGiang} onChange={e => setNewClass({ ...newClass, khaiGiang: e.target.value })} /></div>
                      <div>
                        <label style={s.label}>Trạng thái</label>
                        <select style={{ ...s.select, width: "100%" }} value={newClass.status} onChange={e => setNewClass({ ...newClass, status: e.target.value })}>
                          <option value="Còn chỗ">Còn chỗ</option>
                          <option value="Gần hết">Gần hết</option>
                          <option value="Hết chỗ">Hết chỗ</option>
                        </select>
                      </div>
                      <div><label style={s.label}>Thứ</label><input style={s.input} placeholder="2-4-6" value={newClass.thu} onChange={e => setNewClass({ ...newClass, thu: e.target.value })} /></div>
                      <div><label style={s.label}>Số buổi</label><input style={s.input} type="number" value={newClass.soBuoi} onChange={e => setNewClass({ ...newClass, soBuoi: parseInt(e.target.value) || 48 })} /></div>
                    </div>
                    <div style={{ marginTop: 12 }}>
                      <label style={s.label}>Cơ sở</label>
                      <input style={s.input} value={newClass.coSo} onChange={e => setNewClass({ ...newClass, coSo: e.target.value })} />
                    </div>
                    <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                      <button style={s.btnSuccess} onClick={handleAddClass}>Lưu</button>
                      <button style={s.btnOutline} onClick={() => setShowClassForm(false)}>Hủy</button>
                    </div>
                  </div>
                )}

                <table style={s.table}>
                  <thead>
                    <tr>
                      <th style={s.th}>Tên lớp</th>
                      <th style={s.th}>Thời gian</th>
                      <th style={s.th}>Khai giảng</th>
                      <th style={s.th}>Thứ</th>
                      <th style={s.th}>Số buổi</th>
                      <th style={s.th}>Cơ sở</th>
                      <th style={s.th}>Trạng thái</th>
                      <th style={s.th}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCourse.classes.map((cls, i) => (
                      <tr key={cls.id || i}>
                        <td style={s.td}><strong>{cls.tenLop}</strong></td>
                        <td style={s.td}>{cls.time}</td>
                        <td style={s.td}>{cls.khaiGiang}</td>
                        <td style={s.td}>{cls.thu}</td>
                        <td style={s.td}>{cls.soBuoi}</td>
                        <td style={s.td}>{cls.coSo}</td>
                        <td style={s.td}>
                          <span style={s.badge(
                            cls.status === "Còn chỗ" ? "#2d8a56" : cls.status === "Gần hết" ? "#e6a817" : "#dc3545"
                          )}>{cls.status}</span>
                        </td>
                        <td style={s.td}>
                          <button style={s.btnDanger} onClick={() => cls.id && handleDeleteClass(cls.id)}>Xóa</button>
                        </td>
                      </tr>
                    ))}
                    {selectedCourse.classes.length === 0 && (
                      <tr><td colSpan={8} style={{ ...s.td, textAlign: "center", color: "#999", padding: 40 }}>Chưa có lớp nào</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ════════════════════════════════════
            TAB 2: SECTIONS TRANG CHỦ
            ════════════════════════════════════ */}
        {activeTab === "sections" && (
          <div style={s.sidebar}>
            {/* Left: Section list */}
            <div>
              <div style={{ ...s.card }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Sections</h2>
                  <button style={s.btnPrimary} onClick={() => setShowSectionForm(!showSectionForm)}>+ Thêm</button>
                </div>

                {showSectionForm && (
                  <div style={{ background: "#f9f9f9", borderRadius: 6, padding: 12, marginBottom: 12, border: "1px solid #e0e0e0" }}>
                    <div style={{ marginBottom: 8 }}>
                      <label style={s.label}>Loại section</label>
                      <select style={{ ...s.select, width: "100%" }} value={newSection.section_type} onChange={e => setNewSection({ ...newSection, section_type: e.target.value as "pronunciation" | "video" })}>
                        <option value="pronunciation">🎤 Phát âm tiếng Nhật</option>
                        <option value="video">🎬 Video Facebook</option>
                      </select>
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <label style={s.label}>Tiêu đề section</label>
                      <input style={s.input} placeholder="VD: Phát âm cơ bản" value={newSection.title} onChange={e => setNewSection({ ...newSection, title: e.target.value })} />
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button style={s.btnSuccess} onClick={handleAddSection}>Lưu</button>
                      <button style={s.btnOutline} onClick={() => setShowSectionForm(false)}>Hủy</button>
                    </div>
                  </div>
                )}

                {sections.map(sec => (
                  <div
                    key={sec.id}
                    style={s.listItem(selectedSection?.id === sec.id)}
                    onClick={() => { setSelectedSection(sec); loadSectionItems(sec); }}
                  >
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>
                        {sec.section_type === "pronunciation" ? "🎤" : "🎬"} {sec.title}
                      </div>
                      <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>
                        {sec.section_type === "pronunciation" ? "Phát âm" : "Video"} • {sec.is_visible ? "Hiển thị" : "Ẩn"}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button
                        style={{ ...s.btnOutline, padding: "2px 8px", fontSize: 11, background: selectedSection?.id === sec.id ? "rgba(255,255,255,0.2)" : "#fff", color: selectedSection?.id === sec.id ? "#fff" : "#333", borderColor: selectedSection?.id === sec.id ? "rgba(255,255,255,0.3)" : "#ccc" }}
                        onClick={e => { e.stopPropagation(); handleToggleVisibility(sec); }}
                      >
                        {sec.is_visible ? "👁" : "🙈"}
                      </button>
                      <button
                        style={{ ...s.btnDanger, padding: "2px 8px" }}
                        onClick={e => { e.stopPropagation(); sec.id && handleDeleteSection(sec.id); }}
                      >✕</button>
                    </div>
                  </div>
                ))}

                {sections.length === 0 && (
                  <p style={{ textAlign: "center", color: "#999", fontSize: 13, padding: 20 }}>Chưa có section nào</p>
                )}
              </div>
            </div>

            {/* Right: Section detail */}
            <div>
              {selectedSection ? (
                <div style={s.card}>
                  <h2 style={s.sectionTitle}>
                    {selectedSection.section_type === "pronunciation" ? "🎤" : "🎬"} {selectedSection.title}
                  </h2>

                  {/* PRONUNCIATION ITEMS */}
                  {selectedSection.section_type === "pronunciation" && (
                    <>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <p style={{ margin: 0, fontSize: 13, color: "#666" }}>Người dùng ấn vào sẽ nghe phát âm (Web Speech API)</p>
                        <button style={s.btnPrimary} onClick={() => setShowPronForm(!showPronForm)}>+ Thêm từ</button>
                      </div>

                      {showPronForm && (
                        <div style={{ background: "#f9f9f9", borderRadius: 6, padding: 12, marginBottom: 12, border: "1px solid #e0e0e0" }}>
                          <div style={s.grid3}>
                            <div><label style={s.label}>Tiếng Nhật</label><input style={s.input} placeholder="こんにちは" value={newPron.japanese_text} onChange={e => setNewPron({ ...newPron, japanese_text: e.target.value })} /></div>
                            <div><label style={s.label}>Romaji</label><input style={s.input} placeholder="Konnichiwa" value={newPron.romaji} onChange={e => setNewPron({ ...newPron, romaji: e.target.value })} /></div>
                            <div><label style={s.label}>Nghĩa</label><input style={s.input} placeholder="Xin chào" value={newPron.meaning} onChange={e => setNewPron({ ...newPron, meaning: e.target.value })} /></div>
                          </div>
                          <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                            <button style={s.btnSuccess} onClick={handleAddPron}>Lưu</button>
                            <button style={s.btnOutline} onClick={() => setShowPronForm(false)}>Hủy</button>
                          </div>
                        </div>
                      )}

                      <table style={s.table}>
                        <thead>
                          <tr>
                            <th style={s.th}>#</th>
                            <th style={s.th}>Tiếng Nhật</th>
                            <th style={s.th}>Romaji</th>
                            <th style={s.th}>Nghĩa</th>
                            <th style={s.th}>Thao tác</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pronItems.map((p, i) => (
                            <tr key={p.id}>
                              <td style={s.td}>{i + 1}</td>
                              <td style={{ ...s.td, fontSize: 18, fontWeight: 700 }}>{p.japanese_text}</td>
                              <td style={s.td}>{p.romaji}</td>
                              <td style={s.td}>{p.meaning}</td>
                              <td style={s.td}>
                                <button style={s.btnDanger} onClick={() => p.id && handleDeletePron(p.id)}>Xóa</button>
                              </td>
                            </tr>
                          ))}
                          {pronItems.length === 0 && (
                            <tr><td colSpan={5} style={{ ...s.td, textAlign: "center", color: "#999", padding: 30 }}>Chưa có từ nào</td></tr>
                          )}
                        </tbody>
                      </table>
                    </>
                  )}

                  {/* VIDEO ITEMS */}
                  {selectedSection.section_type === "video" && (
                    <>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <p style={{ margin: 0, fontSize: 13, color: "#666", maxWidth: 480 }}>
                          Dán <strong>link Facebook</strong> hoặc <strong>cả mã iframe</strong> — hỗ trợ Reel, Watch, Video thường.
                        </p>
                        <button style={s.btnPrimary} onClick={() => setShowVideoForm(!showVideoForm)}>+ Thêm video</button>
                      </div>

                      {showVideoForm && (
                        <div style={{ background: "#f9f9f9", borderRadius: 6, padding: 12, marginBottom: 12, border: "1px solid #e0e0e0" }}>
                          <div style={s.grid2}>
                            <div>
                              <label style={s.label}>Link hoặc iframe Facebook</label>
                              <input
                                style={s.input}
                                placeholder="https://www.facebook.com/reel/4605365359740076/"
                                value={newVideo.video_url}
                                onChange={e => setNewVideo({ ...newVideo, video_url: e.target.value })}
                              />
                              <p style={{ margin: "6px 0 0", fontSize: 11, color: "#888" }}>
                                VD Reel: facebook.com/reel/123.../ · Có thể dán luôn thẻ &lt;iframe&gt;
                              </p>
                            </div>
                            <div><label style={s.label}>Tiêu đề video</label><input style={s.input} placeholder="Bài học N5 - Chào hỏi" value={newVideo.video_title} onChange={e => setNewVideo({ ...newVideo, video_title: e.target.value })} /></div>
                          </div>
                          <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                            <button style={s.btnSuccess} onClick={handleAddVideo}>Lưu</button>
                            <button style={s.btnOutline} onClick={() => setShowVideoForm(false)}>Hủy</button>
                          </div>
                        </div>
                      )}

                      <table style={s.table}>
                        <thead>
                          <tr>
                            <th style={s.th}>#</th>
                            <th style={s.th}>Tiêu đề</th>
                            <th style={s.th}>Link video</th>
                            <th style={s.th}>Thao tác</th>
                          </tr>
                        </thead>
                        <tbody>
                          {videoItems.map((v, i) => (
                            <tr key={v.id}>
                              <td style={s.td}>{i + 1}</td>
                              <td style={s.td}><strong>{v.video_title}</strong></td>
                              <td style={{ ...s.td, maxWidth: 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                <a href={v.video_url} target="_blank" rel="noopener noreferrer" style={{ color: "#dd4b37", textDecoration: "none" }}>{v.video_url}</a>
                              </td>
                              <td style={s.td}>
                                <button style={s.btnDanger} onClick={() => v.id && handleDeleteVideo(v.id)}>Xóa</button>
                              </td>
                            </tr>
                          ))}
                          {videoItems.length === 0 && (
                            <tr><td colSpan={4} style={{ ...s.td, textAlign: "center", color: "#999", padding: 30 }}>Chưa có video nào</td></tr>
                          )}
                        </tbody>
                      </table>
                    </>
                  )}
                </div>
              ) : (
                <div style={{ ...s.card, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 300 }}>
                  <div style={{ textAlign: "center", color: "#999" }}>
                    <p style={{ fontSize: 40, margin: "0 0 8px" }}>👈</p>
                    <p style={{ fontSize: 14, fontWeight: 600 }}>Chọn một section để quản lý</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
