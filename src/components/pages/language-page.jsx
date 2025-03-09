"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function LanguagePage({ setLanguage, setPage }) {
  const languages = [
    { name: "English", native: "English" },
    { name: "Hindi", native: "हिन्दी" },
    { name: "Telugu", native: "తెలుగు" },
    { name: "Marathi", native: "मराठी" },
    { name: "Gujarati", native: "ગુજરાતી" },
    { name: "Punjabi", native: "ਪੰਜਾਬੀ" },
    { name: "Bengali", native: "বাংলা" },
    { name: "Tamil", native: "தமிழ்" },
  ]

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-center text-green-800">Select Language</h2>
        <div className="grid grid-cols-2 gap-2">
          {languages.map((lang) => (
            <Button
              key={lang.name}
              variant="outline"
              className="flex flex-col py-4 h-auto hover:bg-green-50"
              onClick={() => {
                setLanguage(lang.name)
                setPage("home")
              }}>
              <span className="text-lg">{lang.native}</span>
              <span className="text-xs text-muted-foreground">{lang.name}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

