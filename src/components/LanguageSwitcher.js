import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const languages = [
    { value: "English", label: "English" },
    { value: "Hindi", label: "हिंदी (Hindi)" },
    { value: "Telugu", label: "తెలుగు (Telugu)" },
    { value: "Marathi", label: "मराठी (Marathi)" },
    { value: "Gujarati", label: "ગુજરાતી (Gujarati)" },
    { value: "Punjabi", label: "ਪੰਜਾਬੀ (Punjabi)" },
    { value: "Bengali", label: "বাংলা (Bengali)" },
    { value: "Tamil", label: "தமிழ் (Tamil)" },
  ];

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem('selectedLanguage', language);
  };

  return (
    <div className="language-switcher">
      <span>{t('languageSelector')}: </span>
      <select 
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language || 'English'}
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>{lang.label}</option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
