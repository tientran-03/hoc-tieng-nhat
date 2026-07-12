"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

import { getSupabaseBrowserClient } from "../../lib/supabase/client";
import { SiteFooter } from "../../components/footer/site-footer";
import { SiteHeader } from "../../components/header/site-header";

type AuthMode = "login" | "signup";

const initialSignUp = { fullName: "", username: "", email: "", password: "" };

export default function AccountPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [user, setUser] = useState<User | null>(null);
  const [login, setLogin] = useState({ email: "", password: "" });
  const [signUp, setSignUp] = useState(initialSignUp);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isConfigured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    const syncUser = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);
    };

    void syncUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    setIsSubmitting(true);
    setError("");
    setMessage("");
    const { error: signInError } = await supabase.auth.signInWithPassword(login);
    setIsSubmitting(false);
    if (signInError) setError("Email hoặc mật khẩu chưa đúng.");
    else setMessage("Đăng nhập thành công. Bạn đã có thể đăng ký khóa học.");
  };

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    setIsSubmitting(true);
    setError("");
    setMessage("");
    const username = signUp.username.trim().toLowerCase();
    if (!/^[a-z0-9_]{3,30}$/.test(username)) {
      setIsSubmitting(false);
      setError("Tên tài khoản gồm 3–30 ký tự: chữ thường, số hoặc dấu gạch dưới.");
      return;
    }
    const { error: signUpError } = await supabase.auth.signUp({
      email: signUp.email.trim(),
      password: signUp.password,
      options: {
        data: { full_name: signUp.fullName.trim(), username },
        emailRedirectTo: `${window.location.origin}/tai-khoan`,
      },
    });
    setIsSubmitting(false);
    if (signUpError) {
      setError(signUpError.message.includes("already") ? "Email hoặc tên tài khoản này đã được sử dụng." : signUpError.message);
      return;
    }
    setSignUp(initialSignUp);
    setMessage("Tài khoản đã được tạo. Hãy kiểm tra email để xác nhận trước khi đăng nhập.");
  };

  const handleGoogleLogin = async () => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    setIsSubmitting(true);
    setError("");
    const { error: googleError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/tai-khoan` },
    });
    if (googleError) {
      setError("Chưa thể kết nối Google. Hãy kiểm tra Google provider trong Supabase.");
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    setMessage("Bạn đã đăng xuất.");
  };

  return (
    <main className="min-h-screen bg-[#fbf7f0] text-ink font-sans antialiased">
      <SiteHeader />
      
      <section className="w-11/12 max-w-[1160px] mx-auto min-h-[calc(100vh-236px)] py-12 md:py-20 flex items-center justify-center">
        {user ? (
          /* Signed In Card */
          <div className="w-full max-w-[640px] mx-auto text-center border-2 border-ink rounded-2xl bg-white p-6 md:p-10 shadow-[6px_6px_0px_#1a2f3a]">
            <p className="inline-block border-2 border-ink bg-[#fff0cd] px-3 py-1 rounded-md text-ink text-xs font-black uppercase tracking-widest shadow-[1px_1px_0px_#1a2f3a] mb-6">
              TÀI KHOẢN CỦA BẠN
            </p>
            <h1 className="mt-0 mb-4 text-3xl md:text-5xl font-black tracking-tight leading-none text-ink">
              Xin chào,<br />
              <span className="text-coral font-black">{user.user_metadata?.full_name || user.email?.split("@")[0]}!</span>
            </h1>
            <p className="max-w-[460px] mx-auto mt-4 text-[#5a7177] text-sm md:text-base font-bold leading-relaxed">
              Bạn đang đăng nhập bằng hòm thư <span className="text-ink underline decoration-2">{user.email}</span>. Hãy tiếp tục hành trình bứt phá tiếng Nhật ngay bây giờ.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Link 
                href="/dang-ky" 
                className="inline-flex items-center justify-center border-2 border-ink rounded-xl px-6 py-3.5 text-sm font-black bg-coral text-white shadow-[3px_3px_0px_#1a2f3a] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#1a2f3a]"
              >
                Đăng ký khóa học ngay
              </Link>
              <button 
                className="inline-flex items-center justify-center border-2 border-ink rounded-xl px-6 py-3.5 bg-white text-ink text-sm font-black shadow-[3px_3px_0px_#1a2f3a] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#1a2f3a]" 
                type="button" 
                onClick={handleSignOut}
              >
                Đăng xuất tài khoản
              </button>
            </div>
          </div>
        ) : (
          /* Auth Layout Split Grid */
          <div className="grid grid-cols-1 md:grid-cols-[0.95fr_0.85fr] max-w-[560px] md:max-w-[1000px] gap-12 md:gap-20 mx-auto items-center w-full">
            
            {/* Left Content Column */}
            <div className="w-full">
              <h1 className="mt-0 mb-6 text-4xl md:text-6xl font-black tracking-tight leading-none text-ink">
                Một tài khoản,<br />
                <span className="text-coral underline decoration-ink decoration-4 underline-offset-8">mọi khóa học.</span>
              </h1>
              <p className="max-w-[460px] text-[#5a7177] text-sm md:text-base font-bold leading-relaxed m-0">
                Tạo tài khoản cá nhân để lưu giữ tiến trình đăng ký lớp học, quản lý lịch khai giảng và nhận tài liệu độc quyền từ LearnHub.
              </p>
              <ul className="grid gap-4 mt-8 p-0 list-none text-ink text-sm font-black">
                <li className="flex items-center gap-3">
                  <span className="flex-shrink-0 grid w-5 h-5 place-items-center border-2 border-ink rounded bg-coral text-white text-xs shadow-[1px_1px_0px_#1a2f3a]">✓</span>
                  Khởi tạo thần tốc với Email và Username
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex-shrink-0 grid w-5 h-5 place-items-center border-2 border-ink rounded bg-[#fff0cd] text-ink text-xs shadow-[1px_1px_0px_#1a2f3a]">✓</span>
                  Liên kết xác thực an toàn thông qua Google
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex-shrink-0 grid w-5 h-5 place-items-center border-2 border-ink rounded bg-[#dcecf2] text-ink text-xs shadow-[1px_1px_0px_#1a2f3a]">✓</span>
                  Bảo mật thông tin và đồng bộ trạng thái thực tế
                </li>
              </ul>
            </div>

            {/* Right Card Column */}
            <div className="w-full border-2 border-ink rounded-2xl bg-white p-6 md:p-8 shadow-[5px_5px_0px_#1a2f3a]">
              {/* Tabs switcher */}
              <div className="grid grid-cols-2 rounded-xl border-2 border-ink bg-[#f4eee6] p-1 mb-6 shadow-[2px_2px_0px_#1a2f3a]" role="tablist" aria-label="Chọn hình thức tài khoản">
                <button 
                  type="button" 
                  className={`border-0 rounded-lg py-2.5 text-xs md:text-sm font-black uppercase tracking-wide transition-all ${mode === "login" ? "bg-ink text-white shadow-[2px_2px_0px_rgba(0,0,0,0.15)]" : "bg-transparent text-[#6e7d81]"}`} 
                  onClick={() => { setMode("login"); setError(""); setMessage(""); }}
                >
                  Đăng nhập
                </button>
                <button 
                  type="button" 
                  className={`border-0 rounded-lg py-2.5 text-xs md:text-sm font-black uppercase tracking-wide transition-all ${mode === "signup" ? "bg-ink text-white shadow-[2px_2px_0px_rgba(0,0,0,0.15)]" : "bg-transparent text-[#6e7d81]"}`} 
                  onClick={() => { setMode("signup"); setError(""); setMessage(""); }}
                >
                  Tạo tài khoản
                </button>
              </div>

              {!isConfigured && (
                <div className="mb-4 border-2 border-ink bg-[#fce8e6] p-3 rounded-xl text-[#c5221f] text-xs font-bold shadow-[2px_2px_0px_#1a2f3a]">
                  Chưa cấu hình Supabase. Thêm biến môi trường trước khi dùng đăng nhập.
                </div>
              )}

              {/* Login Form */}
              {mode === "login" ? (
                <form className="grid gap-4" onSubmit={handleLogin}>
                  <label className="block text-ink text-xs font-black uppercase tracking-wide">
                    Địa chỉ Email
                    <input 
                      required 
                      type="email" 
                      value={login.email} 
                      onChange={(event) => setLogin({ ...login, email: event.target.value })} 
                      placeholder="ban@email.com" 
                      className="block w-full mt-2 border-2 border-ink rounded-xl outline-none bg-[#fffdf9] p-3 text-ink text-sm font-bold shadow-[2px_2px_0px_#1a2f3a] focus:bg-white focus:shadow-[3px_3px_0px_#1a2f3a] transition-all"
                    />
                  </label>
                  
                  <label className="block text-ink text-xs font-black uppercase tracking-wide">
                    Mật khẩu
                    <input 
                      required 
                      type="password" 
                      minLength={6} 
                      value={login.password} 
                      onChange={(event) => setLogin({ ...login, password: event.target.value })} 
                      placeholder="Tối thiểu 6 ký tự" 
                      className="block w-full mt-2 border-2 border-ink rounded-xl outline-none bg-[#fffdf9] p-3 text-ink text-sm font-bold shadow-[2px_2px_0px_#1a2f3a] focus:bg-white focus:shadow-[3px_3px_0px_#1a2f3a] transition-all"
                    />
                  </label>
                  
                  <button 
                    className="w-full mt-2 inline-flex items-center justify-center border-2 border-ink rounded-xl py-3.5 text-sm font-black bg-coral text-white shadow-[3px_3px_0px_#1a2f3a] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#1a2f3a] disabled:cursor-wait disabled:opacity-50 disabled:transform-none" 
                    disabled={!isConfigured || isSubmitting}
                  >
                    {isSubmitting ? "Đang kết nối..." : "Đăng nhập hệ thống"}
                  </button>
                </form>
              ) : (
                /* Sign Up Form */
                <form className="grid gap-4" onSubmit={handleSignUp}>
                  <label className="block text-ink text-xs font-black uppercase tracking-wide">
                    Họ và tên
                    <input 
                      required 
                      value={signUp.fullName} 
                      onChange={(event) => setSignUp({ ...signUp, fullName: event.target.value })} 
                      placeholder="Nguyễn Minh Anh" 
                      className="block w-full mt-2 border-2 border-ink rounded-xl outline-none bg-[#fffdf9] p-3 text-ink text-sm font-bold shadow-[2px_2px_0px_#1a2f3a] focus:bg-white focus:shadow-[3px_3px_0px_#1a2f3a] transition-all"
                    />
                  </label>
                  
                  <label className="block text-ink text-xs font-black uppercase tracking-wide">
                    Tên tài khoản (Username)
                    <input 
                      required 
                      value={signUp.username} 
                      onChange={(event) => setSignUp({ ...signUp, username: event.target.value })} 
                      placeholder="minhanh" 
                      className="block w-full mt-2 border-2 border-ink rounded-xl outline-none bg-[#fffdf9] p-3 text-ink text-sm font-bold shadow-[2px_2px_0px_#1a2f3a] focus:bg-white focus:shadow-[3px_3px_0px_#1a2f3a] transition-all"
                    />
                  </label>
                  
                  <label className="block text-ink text-xs font-black uppercase tracking-wide">
                    Địa chỉ Email
                    <input 
                      required 
                      type="email" 
                      value={signUp.email} 
                      onChange={(event) => setSignUp({ ...signUp, email: event.target.value })} 
                      placeholder="ban@email.com" 
                      className="block w-full mt-2 border-2 border-ink rounded-xl outline-none bg-[#fffdf9] p-3 text-ink text-sm font-bold shadow-[2px_2px_0px_#1a2f3a] focus:bg-white focus:shadow-[3px_3px_0px_#1a2f3a] transition-all"
                    />
                  </label>
                  
                  <label className="block text-ink text-xs font-black uppercase tracking-wide">
                    Mật khẩu tài khoản
                    <input 
                      required 
                      type="password" 
                      minLength={6} 
                      value={signUp.password} 
                      onChange={(event) => setSignUp({ ...signUp, password: event.target.value })} 
                      placeholder="Tối thiểu 6 ký tự" 
                      className="block w-full mt-2 border-2 border-ink rounded-xl outline-none bg-[#fffdf9] p-3 text-ink text-sm font-bold shadow-[2px_2px_0px_#1a2f3a] focus:bg-white focus:shadow-[3px_3px_0px_#1a2f3a] transition-all"
                    />
                  </label>
                  
                  <button 
                    className="w-full mt-2 inline-flex items-center justify-center border-2 border-ink rounded-xl py-3.5 text-sm font-black bg-coral text-white shadow-[3px_3px_0px_#1a2f3a] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#1a2f3a] disabled:cursor-wait disabled:opacity-50 disabled:transform-none" 
                    disabled={!isConfigured || isSubmitting}
                  >
                    {isSubmitting ? "Đang khởi tạo..." : "Xác nhận tạo tài khoản"}
                  </button>
                </form>
              )}

              <div className="flex items-center gap-3 my-5 text-[#93a0a1] text-xs font-bold before:flex-1 before:h-[2px] before:bg-ink/10 after:flex-1 after:h-[2px] after:bg-ink/10">
                <span>HOẶC</span>
              </div>

              {/* Google Integration Button */}
              <button 
                className="flex w-full items-center justify-center gap-2 border-2 border-ink rounded-xl py-3 bg-white text-ink text-sm font-black shadow-[3px_3px_0px_#1a2f3a] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#1a2f3a] disabled:cursor-wait disabled:opacity-50" 
                type="button" 
                onClick={handleGoogleLogin} 
                disabled={!isConfigured || isSubmitting}
              >
                <span className="grid w-5 h-5 place-items-center border-2 border-ink rounded bg-white text-ink text-xs font-black shadow-[1px_1px_0px_#1a2f3a]" aria-hidden="true">G</span> 
                Tiếp tục bằng tài khoản Google
              </button>

              {/* Notification Messages */}
              {message && (
                <div className="mt-4 border-2 border-ink bg-[#e6f4ea] p-3 rounded-xl text-[#137333] text-xs font-bold shadow-[2px_2px_0px_#1a2f3a]">
                  {message}
                </div>
              )}
              {error && (
                <div className="mt-4 border-2 border-ink bg-[#fce8e6] p-3 rounded-xl text-[#c5221f] text-xs font-bold shadow-[2px_2px_0px_#1a2f3a]">
                  {error}
                </div>
              )}
            </div>
          </div>
        )}
      </section>
  
      <SiteFooter />
    </main>
  );
}