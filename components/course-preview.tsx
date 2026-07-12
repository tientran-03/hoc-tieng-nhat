type CoursePreviewProps = { level: string; title: string; detail: string; lesson: string; color: "coral" | "gold" | "blue" };

export function CoursePreview({ level, title, detail, lesson, color }: CoursePreviewProps) {
  return <article className={`course-preview ${color}`}>
    <div className="preview-icon">{level}</div>
    <div><p>{detail}</p><h3>{title}</h3><span>{lesson} <b>→</b></span></div>
    <div className="preview-line" />
  </article>;
}
