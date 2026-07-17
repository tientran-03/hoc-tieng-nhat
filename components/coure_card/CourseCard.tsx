import Link from "next/link";

interface CourseProps {
  level: string;
  title: string;
  desc: string;
  features: string[];
  color: string;
}

export const CourseCard = ({ level, title, desc, features, color }: CourseProps) => (
  <div className="border-4 border-ink rounded-3xl bg-white p-6 shadow-[8px_8px_0px_#1a2f3a] transition-transform hover:-translate-y-2">
    {/* Tag Trình độ */}
    <div className={`inline-block border-4 border-ink rounded-xl ${color} px-4 py-1 font-black text-ink mb-4 shadow-[3px_3px_0px_#1a2f3a]`}>
      {level}
    </div>
    
    <h3 className="text-2xl font-black text-ink mb-3">{title}</h3>
    <p className="text-sm font-bold text-[#5a7177] mb-6 leading-relaxed">{desc}</p>
    
    <ul className="space-y-3 mb-8">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-2 text-xs font-bold text-ink">
          <span className="mt-1">●</span> {feature}
        </li>
      ))}
    </ul>

    <Link 
      href="/khoa-hoc"
      className="block w-full border-4 border-ink bg-coral text-white font-black py-3 rounded-2xl shadow-[4px_4px_0px_#1a2f3a] hover:bg-ink transition-colors text-center"
    >
      Xem thêm
    </Link>
  </div>
);