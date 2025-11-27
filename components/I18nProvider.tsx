'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

interface I18nProviderProps {
  children: React.ReactNode;
  locale?: string;
}

export function I18nProvider({ children, locale = 'en' }: I18nProviderProps) {
  const { i18n } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    // 从 localStorage 获取用户首选语言
    const savedLocale = localStorage.getItem('preferred-locale');

    if (savedLocale && savedLocale !== i18n.language) {
      // 如果有保存的语言偏好且与当前语言不同，重新加载页面
      window.location.reload();
    }
  }, [i18n.language]);

  return <>{children}</>;
}