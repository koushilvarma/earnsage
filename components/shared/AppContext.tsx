"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'pure-white' | 'dark-pro' | 'vibrant-blue';
type Language = 'en' | 'kn' | 'hi';

interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: any;
}

const translations = {
  en: {
    dashboard: "Dashboard",
    welcome: "Welcome back, Adnan",
    protection_score: "Protection Score",
    community_impact: "Community Impact",
    logout: "Log Out",
    payouts: "My Payouts",
    triggers: "Live Triggers",
    profile: "My Profile",
  },
  kn: {
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    welcome: "ಸ್ವಾಗತ, ಅದ್ನಾನ್",
    protection_score: "ರಕ್ಷಣೆ ಸ್ಕೋರ್",
    community_impact: "ಸಮುದಾಯದ ಪರಿಣಾಮ",
    logout: "ಲೋಗ್ ಔಟ್",
    payouts: "ನನ್ನ ಪೇಔಟ್‌ಗಳು",
    triggers: "ಲೈವ್ ಟ್ರಿಗ್ಗರ್‌ಗಳು",
    profile: "ನನ್ನ ಪ್ರೊಫೈಲ್",
  },
  hi: {
    dashboard: "डैशबोर्ड",
    welcome: "स्वागत है, अदनान",
    protection_score: "सुरक्षा स्कोर",
    community_impact: "सामुदायिक प्रभाव",
    logout: "लॉग आउट",
    payouts: "मेरे पेआउट",
    triggers: "लाइव ट्रिगर",
    profile: "मेरी रूपरेखा",
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('pure-white');
  const [language, setLanguage] = useState<Language>('en');

  // Persist language to local storage or state
  const currentTranslations = translations[language];

  return (
    <AppContext.Provider value={{ theme, setTheme, language, setLanguage, translations: currentTranslations }}>
      <div className={`theme-${theme} font-body text-ink-primary`}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
