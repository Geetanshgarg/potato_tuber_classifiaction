"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, ChevronRight, Globe } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function LanguagePage({ setPage }) {
  const { language, setLanguage, t } = useLanguage();

  // Available language options
  const languages = [
    { code: "English", name: "English" },
    { code: "Hindi", name: "हिंदी (Hindi)" },
    { code: "Punjabi", name: "ਪੰਜਾਬੀ (Punjabi)" },
    { code: "Telugu", name: "తెలుగు (Telugu)" },
    { code: "Marathi", name: "मराठी (Marathi)" },
    { code: "Gujarati", name: "ગુજરાતી (Gujarati)" },
  ];

  // Handle language selection
  const selectLanguage = (langCode) => {
    setLanguage(langCode);
    // Go back to home page after language selection
    setTimeout(() => setPage("home"), 300);
  };

  return (
    <>
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg mb-4">
        <CardContent className="p-6">
          <div className="flex items-center justify-center mb-4">
            <Globe className="w-6 h-6 text-green-600 mr-2" />
            <h2 className="text-xl font-semibold text-green-800">{t('selectLanguage')}</h2>
          </div>
          <div className="space-y-2">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={language === lang.code ? "default" : "outline"}
                className={`w-full justify-between ${
                  language === lang.code ? "bg-green-600 hover:bg-green-700" : ""
                }`}
                onClick={() => selectLanguage(lang.code)}
              >
                <span>{lang.name}</span>
                {language === lang.code && <Check className="w-4 h-4" />}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <p className="text-center text-sm text-muted-foreground mt-4">
        {t('languageChangeInfo')}
      </p>
    </>
  );
}

