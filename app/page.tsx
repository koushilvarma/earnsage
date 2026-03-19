"use client";

import { useState, useEffect, useRef } from "react";
import {
  Cloud,
  CloudRain,
  AlertCircle,
  Home,
  FileText,
  User,
  CheckCircle,
  TrendingUp,
  Zap,
  Shield,
  Wind,
  Droplets,
  Thermometer,
  Bell,
  ChevronRight,
  Star,
  ArrowUpRight,
  Activity,
  MapPin,
  Clock,
  Wallet,
  RefreshCw,
  Info,
  X,
} from "lucide-react";

// ── types ─────────────────────────────────────────────────────────────────────
type Tab = "home" | "policy" | "claims" | "profile";

// ── helpers ───────────────────────────────────────────────────────────────────
function AnimatedNumber({ value, prefix = "" }: { value: number; prefix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    const steps = 40;
    const step = value / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += step;
      if (current >= value) {
        setDisplay(value);
        clearInterval(interval);
      } else {
        setDisplay(Math.floor(current));
      }
    }, 18);
    return () => clearInterval(interval);
  }, [value]);
  return <span>{prefix}{display.toLocaleString("en-IN")}</span>;
}

function RippleButton({
  children,
  className = "",
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
    onClick?.();
  };
  return (
    <button type={type} className={`relative overflow-hidden ${className}`} onClick={handleClick}>
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full bg-white/30 animate-ping"
          style={{
            left: r.x - 10,
            top: r.y - 10,
            width: 20,
            height: 20,
            animationDuration: "0.6s",
          }}
        />
      ))}
    </button>
  );
}

// ── mock data ─────────────────────────────────────────────────────────────────
const mockUser = {
  name: "Ravi Kumar",
  phone: "+91 98765 43210",
  platform: "Zomato",
  city: "Bangalore",
  zone: "Koramangala",
  rating: 4.8,
  deliveries: 1240,
  memberSince: "Jan 2024",
  protectedEarnings: 2500,
  weeklyPremium: 99,
  totalPayouts: 1230,
  coverageActive: true,
  nextRenewal: "Mar 22, 2026",
  zoneStatus: {
    weather: "Clear Skies",
    temp: "28°C",
    aqi: 145,
    aqiLabel: "Moderate",
    riskLevel: "Low" as "Low" | "Medium" | "High",
    alert: false,
  },
  recentPayouts: [
    { amount: 250, reason: "Heavy Rain Disruption", date: "Today, 2:30 PM", icon: "🌧️", status: "Paid" },
    { amount: 680, reason: "Severe Pollution (AQI > 400)", date: "Mar 12", icon: "🌫️", status: "Paid" },
    { amount: 300, reason: "Wind Storm Alert", date: "Mar 5", icon: "💨", status: "Paid" },
  ],
  coverage: [
    { label: "Heavy Rain & Floods", icon: "🌧️", active: true },
    { label: "Extreme Heat Wave", icon: "🔥", active: true },
    { label: "Severe Air Pollution", icon: "🌫️", active: true },
    { label: "Wind / Dust Storm", icon: "💨", active: true },
    { label: "Unplanned Curfew", icon: "🚧", active: true },
    { label: "Local Strike / Hartal", icon: "🔒", active: false },
  ],
};

const platforms = ["Zomato", "Swiggy", "Zepto", "Dunzo", "BlinkIt"];
const cities = ["Bangalore", "Delhi", "Mumbai", "Hyderabad", "Chennai", "Pune", "Kolkata"];

const riskColor = {
  Low: "text-emerald-400",
  Medium: "text-amber-400",
  High: "text-red-400",
};

const riskBg = {
  Low: "bg-emerald-400/15",
  Medium: "bg-amber-400/15",
  High: "bg-red-400/15",
};

// ── Onboarding Screen ─────────────────────────────────────────────────────────
function OnboardingScreen({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [platform, setPlatform] = useState("");
  const [city, setCity] = useState("");
  const [calculating, setCalculating] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = (idx: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);
    if (val && idx < 3) otpRefs.current[idx + 1]?.focus();
  };

  const handleOtpKey = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  const handlePhoneNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 10) setStep(2);
  };

  const handleOtpNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.join("").length === 4) setStep(3);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (platform && city) {
      setCalculating(true);
      setTimeout(onComplete, 2200);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0f1e] text-white">
      {/* Logo Header */}
      <div className="pt-safe px-6 pt-10 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">EarnSage</span>
        </div>
        <p className="text-xs text-slate-400">AI-powered income protection</p>
      </div>

      {/* Progress bar */}
      <div className="px-6 mb-8">
        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                step >= s ? "bg-violet-500" : "bg-white/10"
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-2">Step {step} of 3</p>
      </div>

      <div className="flex-1 px-6 overflow-hidden">
        {/* STEP 1 — Phone */}
        {step === 1 && (
          <form onSubmit={handlePhoneNext} className="animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-1">Enter your number</h2>
            <p className="text-slate-400 text-sm mb-8">
              We'll send you a one-time passcode to verify
            </p>
            <div className="flex gap-3 items-stretch mb-8">
              <div className="flex items-center justify-center px-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-semibold text-slate-300">
                🇮🇳 +91
              </div>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="00000 00000"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-lg tracking-widest outline-none focus:border-violet-500/60 focus:bg-violet-500/5 transition placeholder-slate-600"
              />
            </div>
            <RippleButton
              type="submit"
              className={`w-full py-4 rounded-2xl font-semibold text-base transition-all duration-300 ${
                phone.length === 10
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/30 active:scale-95"
                  : "bg-white/5 text-slate-500 cursor-not-allowed"
              }`}
            >
              Send OTP →
            </RippleButton>

            {/* Trust row */}
            <div className="mt-8 flex items-center gap-2 justify-center">
              <Shield className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-xs text-slate-500">256-bit encrypted · never shared</span>
            </div>
          </form>
        )}

        {/* STEP 2 — OTP */}
        {step === 2 && (
          <form onSubmit={handleOtpNext} className="animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-1">Verify OTP</h2>
            <p className="text-slate-400 text-sm mb-8">
              Sent to +91 {phone.slice(0, 5)} {phone.slice(5)}
            </p>
            <div className="flex gap-4 mb-8 justify-center">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { otpRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKey(i, e)}
                  className="w-16 h-16 text-center text-2xl font-bold bg-white/5 border-2 border-white/10 rounded-2xl outline-none focus:border-violet-500 transition text-violet-300"
                />
              ))}
            </div>
            <RippleButton
              type="submit"
              className={`w-full py-4 rounded-2xl font-semibold text-base transition-all duration-300 ${
                otp.join("").length === 4
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/30 active:scale-95"
                  : "bg-white/5 text-slate-500 cursor-not-allowed"
              }`}
            >
              Verify & Continue →
            </RippleButton>
            <button
              type="button"
              className="w-full mt-4 py-3 text-sm text-slate-400 hover:text-white transition"
              onClick={() => setStep(1)}
            >
              ← Change number
            </button>
          </form>
        )}

        {/* STEP 3 — Profile */}
        {step === 3 && !calculating && (
          <form onSubmit={handleProfileSubmit} className="animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-1">Your work profile</h2>
            <p className="text-slate-400 text-sm mb-6">
              We'll tailor your coverage and premium based on your zone
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                  Gig Platform
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {platforms.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPlatform(p)}
                      className={`py-3 px-2 rounded-xl text-sm font-medium border transition-all ${
                        platform === p
                          ? "border-violet-500 bg-violet-500/20 text-violet-300"
                          : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                  Primary City
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {cities.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCity(c)}
                      className={`py-3 px-4 rounded-xl text-sm font-medium border transition-all text-left ${
                        city === c
                          ? "border-violet-500 bg-violet-500/20 text-violet-300"
                          : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <RippleButton
              type="submit"
              className={`w-full py-4 rounded-2xl font-semibold text-base transition-all duration-300 ${
                platform && city
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/30 active:scale-95"
                  : "bg-white/5 text-slate-500 cursor-not-allowed"
              }`}
            >
              Calculate My Premium →
            </RippleButton>
          </form>
        )}

        {/* Calculating state */}
        {calculating && (
          <div className="flex flex-col items-center justify-center py-16 animate-fade-in-up">
            <div className="w-20 h-20 rounded-full bg-violet-500/15 flex items-center justify-center mb-6 relative">
              <div className="absolute inset-0 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
              <Shield className="w-9 h-9 text-violet-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Calculating your premium…</h3>
            <p className="text-slate-400 text-sm text-center leading-relaxed">
              Our AI is analyzing your zone's risk data,
              <br />weather patterns, and delivery history
            </p>
          </div>
        )}
      </div>

      {/* Bottom safe area */}
      <div className="h-safe pb-8" />
    </div>
  );
}

// ── Home Tab ──────────────────────────────────────────────────────────────────
function HomeTab({ user }: { user: typeof mockUser }) {
  const rl = user.zoneStatus.riskLevel;
  return (
    <div className="space-y-4">
      {/* Hero Card */}
      <div className="relative rounded-3xl overflow-hidden p-6 bg-gradient-to-br from-violet-700 via-indigo-700 to-indigo-900 shadow-xl">
        {/* subtle glow orbs */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <p className="text-xs font-semibold text-violet-200/80 uppercase tracking-widest mb-1">
            Protected Earnings
          </p>
          <h2 className="text-5xl font-extrabold mb-1 tracking-tight">
            ₹<AnimatedNumber value={user.protectedEarnings} />
          </h2>
          <p className="text-violet-200/70 text-sm mb-6">this week</p>

          <div className="flex items-end justify-between">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3">
              <p className="text-[11px] text-violet-200/70 mb-0.5">Weekly Premium</p>
              <p className="text-2xl font-bold">₹{user.weeklyPremium}</p>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-400/20 border border-emerald-400/30 rounded-full px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-300">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Zone Status */}
      <div className="bg-white/5 border border-white/8 rounded-3xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-violet-400" />
            <h3 className="font-semibold text-sm">{user.zone} · Live Zone</h3>
          </div>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${riskBg[rl]} ${riskColor[rl]}`}
          >
            {rl} Risk
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/5 rounded-2xl p-3 text-center">
            <CloudRain className="w-5 h-5 text-blue-400 mx-auto mb-1" />
            <p className="text-[10px] text-slate-400 mb-0.5">Weather</p>
            <p className="text-xs font-semibold text-slate-200">Clear</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 text-center">
            <Thermometer className="w-5 h-5 text-orange-400 mx-auto mb-1" />
            <p className="text-[10px] text-slate-400 mb-0.5">Temp</p>
            <p className="text-xs font-semibold text-slate-200">{user.zoneStatus.temp}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 text-center">
            <Wind className="w-5 h-5 text-slate-400 mx-auto mb-1" />
            <p className="text-[10px] text-slate-400 mb-0.5">AQI</p>
            <p className="text-xs font-semibold text-amber-400">{user.zoneStatus.aqi}</p>
          </div>
        </div>
      </div>

      {/* Recent Payouts */}
      <div className="bg-white/5 border border-white/8 rounded-3xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <h3 className="font-semibold text-sm">Recent Payouts</h3>
          </div>
          <span className="text-xs text-slate-500">Total: ₹{user.totalPayouts}</span>
        </div>

        <div className="space-y-2">
          {user.recentPayouts.map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-white/3 hover:bg-white/7 rounded-2xl p-3 transition group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl shrink-0">
                {p.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-200 truncate">{p.reason}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <p className="text-xs text-slate-500">{p.date}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-emerald-400">+₹{p.amount}</p>
                <p className="text-[10px] text-emerald-600 font-medium">{p.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tip Banner */}
      <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-4 flex items-start gap-3">
        <Zap className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
        <p className="text-xs text-violet-200/80 leading-relaxed">
          <span className="font-semibold text-violet-300">Auto-protected:</span> If AQI exceeds 300
          in your zone, your claim is triggered instantly—no action needed from you.
        </p>
      </div>
    </div>
  );
}

// ── Policy Tab ────────────────────────────────────────────────────────────────
function PolicyTab({ user }: { user: typeof mockUser }) {
  return (
    <div className="space-y-4">
      {/* Summary card */}
      <div className="bg-white/5 border border-white/8 rounded-3xl p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs text-slate-400 mb-1">Policy Status</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-base font-bold text-emerald-400">Active & Protected</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-violet-500/20 flex items-center justify-center">
            <Shield className="w-6 h-6 text-violet-400" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 rounded-2xl p-3">
            <p className="text-[10px] text-slate-400 mb-1 uppercase tracking-wider">Platform</p>
            <p className="text-sm font-semibold text-slate-200">{user.platform}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-3">
            <p className="text-[10px] text-slate-400 mb-1 uppercase tracking-wider">City</p>
            <p className="text-sm font-semibold text-slate-200">{user.city}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-3">
            <p className="text-[10px] text-slate-400 mb-1 uppercase tracking-wider">Weekly Premium</p>
            <p className="text-sm font-semibold text-violet-300">₹{user.weeklyPremium}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-3">
            <p className="text-[10px] text-slate-400 mb-1 uppercase tracking-wider">Next Renewal</p>
            <p className="text-sm font-semibold text-slate-200">{user.nextRenewal}</p>
          </div>
        </div>
      </div>

      {/* Coverage grid */}
      <div className="bg-white/5 border border-white/8 rounded-3xl p-5">
        <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
          <Shield className="w-4 h-4 text-violet-400" />
          What&apos;s Covered
        </h3>
        <div className="space-y-2">
          {user.coverage.map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 p-3 rounded-2xl transition ${
                item.active
                  ? "bg-emerald-400/8 border border-emerald-400/15"
                  : "bg-white/3 border border-white/5 opacity-50"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm text-slate-200 flex-1">{item.label}</span>
              {item.active ? (
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <X className="w-4 h-4 text-slate-600 shrink-0" />
              )}
            </div>
          ))}
        </div>
        <p className="text-[10px] text-slate-500 mt-3 text-center">
          * Strike/Hartal coverage available in Pro plan
        </p>
      </div>

      {/* How it works */}
      <div className="bg-white/5 border border-white/8 rounded-3xl p-5">
        <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-violet-400" />
          How Claims Work
        </h3>
        <div className="space-y-4">
          {[
            { step: "1", title: "Disruption Detected", detail: "APIs monitor your zone 24/7 for weather, AQI & alerts", icon: "📡" },
            { step: "2", title: "Threshold Crossed", detail: "When disruption hits our trigger threshold, your claim auto-fires", icon: "⚡" },
            { step: "3", title: "Instant Payout", detail: "Money lands in your linked UPI within 2 minutes", icon: "💸" },
          ].map((s) => (
            <div key={s.step} className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-sm font-bold text-violet-400 shrink-0">
                {s.step}
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span>{s.icon}</span>
                  <p className="text-sm font-semibold text-slate-200">{s.title}</p>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Claims Tab ────────────────────────────────────────────────────────────────
function ClaimsTab({ user }: { user: typeof mockUser }) {
  return (
    <div className="space-y-4">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Received", value: `₹${user.totalPayouts}`, color: "text-emerald-400" },
          { label: "Claims Filed", value: "3", color: "text-violet-400" },
          { label: "Avg. Time", value: "< 2 min", color: "text-blue-400" },
        ].map((s) => (
          <div key={s.label} className="bg-white/5 border border-white/8 rounded-2xl p-3 text-center">
            <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{s.label}</p>
          </div>
        ))}
      </div>

      {/* All claims */}
      <div className="bg-white/5 border border-white/8 rounded-3xl p-5">
        <h3 className="font-semibold text-sm mb-4">All Claims</h3>
        <div className="space-y-3">
          {user.recentPayouts.map((p, i) => (
            <div key={i} className="bg-white/3 rounded-2xl overflow-hidden">
              <div className="flex items-center gap-3 p-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl shrink-0">
                  {p.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-200">{p.reason}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{p.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-base font-bold text-emerald-400">+₹{p.amount}</p>
                  <span className="text-[10px] bg-emerald-400/15 text-emerald-400 px-2 py-0.5 rounded-full font-medium">
                    {p.status}
                  </span>
                </div>
              </div>
              <div className="h-px bg-white/5 mx-4" />
              <div className="px-4 py-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-violet-400" />
                  Auto-triggered · Instant payout
                </span>
                <span className="text-[11px] text-violet-400 flex items-center gap-1">
                  Details <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 flex items-start gap-3">
        <Info className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
        <p className="text-xs text-blue-200/80 leading-relaxed">
          All your claims are processed automatically. No paperwork or manual filing needed.
        </p>
      </div>
    </div>
  );
}

// ── Profile Tab ───────────────────────────────────────────────────────────────
function ProfileTab({ user, onLogout }: { user: typeof mockUser; onLogout: () => void }) {
  return (
    <div className="space-y-4">
      {/* Avatar card */}
      <div className="bg-gradient-to-br from-violet-900/60 to-indigo-900/60 border border-violet-500/20 rounded-3xl p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mx-auto mb-3 text-3xl font-bold shadow-lg shadow-violet-500/30">
          {user.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-slate-400 text-sm">{user.phone}</p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="text-center">
            <Star className="w-4 h-4 text-amber-400 mx-auto mb-0.5" />
            <p className="text-xs font-semibold text-amber-400">{user.rating}</p>
            <p className="text-[10px] text-slate-500">Rating</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <Activity className="w-4 h-4 text-violet-400 mx-auto mb-0.5" />
            <p className="text-xs font-semibold text-slate-200">{user.deliveries.toLocaleString()}</p>
            <p className="text-[10px] text-slate-500">Deliveries</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <Clock className="w-4 h-4 text-slate-400 mx-auto mb-0.5" />
            <p className="text-xs font-semibold text-slate-200">{user.memberSince}</p>
            <p className="text-[10px] text-slate-500">Member</p>
          </div>
        </div>
      </div>

      {/* Info rows */}
      <div className="bg-white/5 border border-white/8 rounded-3xl divide-y divide-white/5 overflow-hidden">
        {[
          { label: "Platform", value: user.platform, icon: <Wallet className="w-4 h-4 text-slate-400" /> },
          { label: "City", value: user.city, icon: <MapPin className="w-4 h-4 text-slate-400" /> },
          { label: "Member Since", value: user.memberSince, icon: <Clock className="w-4 h-4 text-slate-400" /> },
          { label: "Notifications", value: "Enabled", icon: <Bell className="w-4 h-4 text-slate-400" /> },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-4 px-5 py-4">
            {item.icon}
            <span className="text-sm text-slate-400 flex-1">{item.label}</span>
            <span className="text-sm font-semibold text-slate-200">{item.value}</span>
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </div>
        ))}
      </div>

      {/* UPI section */}
      <div className="bg-white/5 border border-white/8 rounded-3xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 mb-1">UPI / Payout Account</p>
            <p className="text-sm font-semibold text-slate-200">ravi.kumar@upi</p>
          </div>
          <button className="text-xs text-violet-400 border border-violet-500/30 px-3 py-1.5 rounded-full hover:bg-violet-500/10 transition">
            Change
          </button>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="w-full py-4 rounded-2xl border border-red-500/30 text-red-400 text-sm font-semibold hover:bg-red-500/10 active:scale-95 transition"
      >
        Log Out
      </button>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function EarnSage() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    if (!isOnboarded) return;
    const t = setTimeout(() => setShowNotif(true), 1500);
    return () => clearTimeout(t);
  }, [isOnboarded]);

  if (!isOnboarded) {
    return <OnboardingScreen onComplete={() => setIsOnboarded(true)} />;
  }

  const tabLabels: { id: Tab; label: string; icon: React.ReactNode; activeIcon: React.ReactNode }[] = [
    {
      id: "home",
      label: "Home",
      icon: <Home className="w-5 h-5" />,
      activeIcon: <Home className="w-5 h-5" strokeWidth={2.5} />,
    },
    {
      id: "policy",
      label: "Policy",
      icon: <Shield className="w-5 h-5" />,
      activeIcon: <Shield className="w-5 h-5" strokeWidth={2.5} />,
    },
    {
      id: "claims",
      label: "Claims",
      icon: <Wallet className="w-5 h-5" />,
      activeIcon: <Wallet className="w-5 h-5" strokeWidth={2.5} />,
    },
    {
      id: "profile",
      label: "Profile",
      icon: <User className="w-5 h-5" />,
      activeIcon: <User className="w-5 h-5" strokeWidth={2.5} />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white flex flex-col max-w-lg mx-auto relative">
      {/* Notification Toast */}
      {showNotif && (
        <div
          className="absolute top-4 left-4 right-4 z-50 bg-emerald-500/15 border border-emerald-500/30 backdrop-blur-xl rounded-2xl p-4 flex items-start gap-3 animate-fade-in-up"
          onClick={() => setShowNotif(false)}
        >
          <span className="text-2xl">🌧️</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-emerald-300">Auto-Payout Triggered!</p>
            <p className="text-xs text-slate-400 mt-0.5">
              Heavy rain detected in Koramangala · ₹250 sent to your UPI
            </p>
          </div>
          <X className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0a0f1e]/80 backdrop-blur-xl border-b border-white/5 px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">
              {activeTab === "home" && `Welcome back 👋`}
              {activeTab === "policy" && "Your Policy"}
              {activeTab === "claims" && "Claim History"}
              {activeTab === "profile" && "Your Profile"}
            </p>
            <h1 className="text-base font-bold">
              {activeTab === "home" ? mockUser.name.split(" ")[0] : tabLabels.find(t => t.id === activeTab)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {activeTab === "home" && (
              <button
                onClick={() => setShowNotif(!showNotif)}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative"
              >
                <Bell className="w-4 h-4 text-slate-400" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-500 border border-[#0a0f1e]" />
              </button>
            )}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-bold shadow-lg">
              {mockUser.name.split(" ").map((n) => n[0]).join("")}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto px-4 py-4 pb-28">
        {activeTab === "home" && <HomeTab user={mockUser} />}
        {activeTab === "policy" && <PolicyTab user={mockUser} />}
        {activeTab === "claims" && <ClaimsTab user={mockUser} />}
        {activeTab === "profile" && (
          <ProfileTab user={mockUser} onLogout={() => setIsOnboarded(false)} />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-[#0d1326]/90 backdrop-blur-xl border-t border-white/8 z-30 safe-bottom">
        <div className="flex">
          {tabLabels.map((t) => {
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-all duration-200 relative ${
                  active ? "text-violet-400" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {active && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-violet-500" />
                )}
                <span className={`transition-transform ${active ? "scale-110" : ""}`}>
                  {active ? t.activeIcon : t.icon}
                </span>
                <span className="text-[10px] font-medium">{t.label}</span>
              </button>
            );
          })}
        </div>
        {/* Safe area spacer */}
        <div className="h-safe" style={{ height: "env(safe-area-inset-bottom, 0px)" }} />
      </nav>
    </div>
  );
}
