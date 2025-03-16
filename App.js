import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './components/LanguageSwitcher';
// ...existing code...

function App() {
  const { t, i18n } = useTranslation();
  // ...existing code...
  
  // Load saved language on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return (
    <div className="App">
      <header>
        <h1>{t('appTitle')}</h1>
        <LanguageSwitcher />
      </header>

      <div className="container">
        <div className="upload-section">
          <p>{t('uploadInstructions')}</p>
          <label htmlFor="file-upload" className="custom-file-upload">
            {t('uploadLabel')}
          </label>
          {/* ...existing code... */}
          <button onClick={analyzeImage} disabled={!selectedImage || loading}>
            {t('analyzeButton')}
          </button>
        </div>

        {loading && <div className="loading">{t('loading')}</div>}

        {result && (
          <div className="result-section">
            <h2>{t('resultHeader')}</h2>
            <p className={`result ${result.toLowerCase().replace(' ', '-')}`}>
              {result === "Healthy" ? t('healthyResult') :
               result === "Early Blight" ? t('earlyBlightResult') :
               result === "Late Blight" ? t('lateBlightResult') : result}
            </p>
            {/* ...existing code... */}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
