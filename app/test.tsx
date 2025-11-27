'use client';

import { useState, useEffect } from 'react';

export default function TestPage() {
  const [translations, setTranslations] = useState<any>({});
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    // 简单的翻译加载，避免 i18n 复杂配置
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/locales/${currentLang}/common.json`);
        if (response.ok) {
          const data = await response.json();
          setTranslations(data);
        } else {
          // 如果找不到翻译文件，使用默认英文
          const defaultResponse = await fetch('/locales/en/common.json');
          if (defaultResponse.ok) {
            const data = await defaultResponse.json();
            setTranslations(data);
          }
        }
      } catch (error) {
        console.log('Loading default translations');
        // 设置默认翻译
        setTranslations({
          home: { title: 'Welcome to Our Website', hero: { description: 'Test page for i18n functionality' } },
          navigation: { home: 'Home', about: 'About' }
        });
      }
    };

    loadTranslations();
  }, [currentLang]);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Minimal Kitchen & Bath (Test)
              </h1>
            </div>
            <div className="flex gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setCurrentLang(lang.code)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    currentLang === lang.code
                      ? 'bg-blue-100 text-blue-700 border-blue-300 border'
                      : 'bg-white text-gray-700 border-gray-300 border hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-1">{lang.flag}</span>
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 rounded-lg mb-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {translations.home?.title || 'Loading...'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {translations.home?.hero?.description || 'Loading...'}
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {translations.home?.hero?.cta || 'Get Started'}
            </button>
          </div>
        </section>

        {/* Navigation Test */}
        <section className="py-8 bg-white rounded-lg shadow mb-8">
          <h2 className="text-2xl font-bold text-center mb-6">Navigation Test</h2>
          <nav className="flex justify-center space-x-8">
            <span className="text-gray-700 font-medium">
              {translations.navigation?.home || 'Home'}
            </span>
            <span className="text-gray-700 font-medium">
              {translations.navigation?.about || 'About'}
            </span>
            <span className="text-gray-700 font-medium">
              {translations.navigation?.services || 'Services'}
            </span>
            <span className="text-gray-700 font-medium">
              {translations.navigation?.contact || 'Contact'}
            </span>
          </nav>
        </section>

        {/* Language Status */}
        <section className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Current Language Status</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Current Language:</strong> {currentLang}
            </div>
            <div>
              <strong>Translation Status:</strong> {translations.home ? 'Loaded' : 'Loading...'}
            </div>
            <div>
              <strong>Total Translation Keys:</strong> {Object.keys(translations).length}
            </div>
            <div>
              <strong>Available Languages:</strong> {languages.map(l => l.code).join(', ')}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500">
            © 2024 Minimal Kitchen & Bath. Test page for i18n functionality.
          </p>
        </div>
      </footer>
    </div>
  );
}