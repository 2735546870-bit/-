'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const { i18n } = useTranslation();
  const [currentLocale, setCurrentLocale] = useState(i18n.language);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCurrentLocale(i18n.language);
  }, [i18n.language]);

  const handleLanguageChange = (locale: string) => {
    // 存储语言偏好到 localStorage
    localStorage.setItem('preferred-locale', locale);

    // 重新加载页面以应用新语言
    const currentPath = window.location.pathname;
    const currentQuery = window.location.search;
    const newUrl = `${currentPath}${currentQuery}`;

    // 使用 replace 来避免浏览器历史记录问题
    window.location.replace(newUrl);
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="hidden sm:inline">{currentLanguage.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute right-0 z-10 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
          {languages.map((language) => (
            <li key={language.code}>
              <button
                onClick={() => handleLanguageChange(language.code)}
                className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 ${
                  currentLocale === language.code
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700'
                }`}
                role="option"
                aria-selected={currentLocale === language.code}
              >
                <span className="mr-3 text-lg">{language.flag}</span>
                {language.name}
                {currentLocale === language.code && (
                  <svg
                    className="ml-auto w-4 h-4 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}