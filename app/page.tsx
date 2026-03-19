"use client";

import { useState } from "react";
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
} from "lucide-react";

export default function EarnSage() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  // Form state
  const [phone, setPhone] = useState("");
  const [platform, setPlatform] = useState("");
  const [city, setCity] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Mock data
  const userData = {
    name: "Ravi Kumar",
    platform: "Zomato",
    city: "Bangalore",
    protectedEarnings: 2500,
    weeklyPremium: 99,
    coverageActive: true,
    recentPayouts: [
      {
        amount: 250,
        reason: "Heavy Rain Disruption",
        date: "Today, 2:30 PM",
        icon: "🌧️",
      },
      {
        amount: 680,
        reason: "Severe Pollution (AQI > 400)",
        date: "Last Week",
        icon: "🌫️",
      },
      {
        amount: 300,
        reason: "Wind Storm Alert",
        date: "15 days ago",
        icon: "💨",
      },
    ],
    zoneStatus: {
      weather: "Clear Skies",
      aqi: "145 (Moderate)",
      alert: false,
      riskLevel: "Low",
    },
  };

  const handleOnboardingSubmit = (e: any) => {
    e.preventDefault();
    if (phone && platform && city) {
      setFormSubmitted(true);
      setTimeout(() => {
        setIsOnboarded(true);
      }, 1500);
    }
  };

  const platforms = ["Zomato", "Swiggy", "Zepto"];
  const cities = [
    "Bangalore",
    "Delhi",
    "Mumbai",
    "Hyderabad",
    "Chennai",
    "Pune",
  ];

  // ===== ONBOARDING VIEW =====
  if (!isOnboarded) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-8">
        {/* Hero Section */}
        <h1 className="text-center text-3xl font-bold">EarnSage</h1>
        <div className="text-center mb-12">
          <p className="text-slate-600 text-base leading-relaxed max-w-sm">
            Protect your daily wages from weather and pollution disruptions.
            Instant payouts, zero paperwork.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleOnboardingSubmit}
          className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-6 space-y-6"
        >
          {/* Phone Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Phone Number
            </label>
            <div className="flex items-center border-2 border-slate-200 rounded-lg px-4">
              <span className="text-slate-500 text-sm font-medium">+91</span>
              <input
                type="tel"
                placeholder="0123456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value.slice(0, 10))}
                className="flex-1 py-3 px-2 bg-transparent outline-none text-slate-900 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Platform Dropdown */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Gig Platform
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full py-3 px-4 border-2 border-slate-200 rounded-lg bg-white text-slate-900 outline-none focus:border-blue-600 transition"
            >
              <option value="">Select your platform</option>
              {platforms.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* City Dropdown */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Primary City / Zone
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full py-3 px-4 border-2 border-slate-200 rounded-lg bg-white text-slate-900 outline-none focus:border-blue-600 transition"
            >
              <option value="">Select your city</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* CTA Button */}
          <button
            type="submit"
            className={`w-full py-4 px-4 rounded-lg font-semibold text-white text-base transition-all ${
              formSubmitted
                ? "bg-emerald-500 hover:bg-emerald-600"
                : "bg-blue-600 hover:bg-blue-700 active:scale-95"
            }`}
          >
            {formSubmitted ? (
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Premium Calculated!</span>
              </div>
            ) : (
              "Calculate My Weekly Premium"
            )}
          </button>

          {/* Confidence Text */}
          <p className="text-center text-xs text-slate-500">
            Your data is encrypted. We never share your information.
          </p>
        </form>

        {/* Trust Badges */}
        <div className="mt-12 flex gap-4 text-center text-xs text-slate-600">
          <div>
            <div className="text-2xl mb-1">✓</div>
            <p>Instant Verification</p>
          </div>
          <div>
            <div className="text-2xl mb-1">💰</div>
            <p>Weekly Payout</p>
          </div>
          <div>
            <div className="text-2xl mb-1">🔒</div>
            <p>100% Secure</p>
          </div>
        </div>
      </div>
    );
  }

  // ===== DASHBOARD VIEW =====
  return (
    <div className="min-h-screen bg-slate-50 pb-24 max-w-lg mx-auto">
      {/* Header */}
      <header className="bg-white sticky top-0 z-10 border-b border-slate-200">
        <div className="px-4 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-600">Welcome back</p>
            <h1 className="text-xl font-bold text-slate-900">
              {userData.name}
            </h1>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-semibold text-emerald-700">
              Coverage Active
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 space-y-4">
        {/* Protected Earnings Card - Hero */}
        <div className="bg-linear-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
          <p className="text-sm opacity-90 mb-2">Protected Earnings Balance</p>
          <h2 className="text-5xl font-bold mb-6">
            ₹{userData.protectedEarnings.toLocaleString()}
          </h2>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">
              ₹{userData.weeklyPremium}
            </span>
            <span className="text-sm opacity-90">/week</span>
          </div>
          <p className="text-xs opacity-80 mt-4">
            Your premium for comprehensive coverage
          </p>
        </div>

        {/* Zone Status Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Zone Status</h3>
            {userData.zoneStatus.alert ? (
              <AlertCircle className="w-5 h-5 text-orange-500" />
            ) : (
              <Cloud className="w-5 h-5 text-blue-600" />
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Weather</span>
              <span className="text-sm font-semibold text-slate-900">
                {userData.zoneStatus.weather}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Air Quality (AQI)</span>
              <span className="text-sm font-semibold text-slate-900">
                {userData.zoneStatus.aqi}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm text-slate-600">Risk Level</span>
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                {userData.zoneStatus.riskLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Activity / Claims */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Recent Payouts
          </h3>

          <div className="space-y-3">
            {userData.recentPayouts.map((payout, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{payout.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {payout.reason}
                    </p>
                    <p className="text-xs text-slate-500">{payout.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-emerald-600">
                    +₹{payout.amount}
                  </p>
                  <p className="text-xs text-slate-500">Instant</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-xs text-blue-900 leading-relaxed">
            💡 <strong>Tip:</strong> Your coverage includes heavy rain, extreme
            heat, severe pollution, and wind storms. Claims are auto-processed
            within minutes.
          </p>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 max-w-lg mx-auto">
        <div className="flex items-center justify-around">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex-1 flex flex-col items-center justify-center py-4 gap-1 transition ${
              activeTab === "home"
                ? "text-blue-600 border-t-2 border-blue-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </button>

          <button
            onClick={() => setActiveTab("policy")}
            className={`flex-1 flex flex-col items-center justify-center py-4 gap-1 transition ${
              activeTab === "policy"
                ? "text-blue-600 border-t-2 border-blue-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <FileText className="w-6 h-6" />
            <span className="text-xs font-medium">Policy</span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`flex-1 flex flex-col items-center justify-center py-4 gap-1 transition ${
              activeTab === "profile"
                ? "text-blue-600 border-t-2 border-blue-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
