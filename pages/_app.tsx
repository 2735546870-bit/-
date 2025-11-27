import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // 检查 localStorage 中的语言偏好
    const savedLocale = localStorage.getItem('preferred-locale');
    if (savedLocale && savedLocale !== 'en') {
      // 如果有保存的语言偏好且不是默认英语，可以在这里处理
      // 通常会通过重新加载页面来应用新语言
    }
  }, []);

  // 在客户端渲染之前显示加载状态
  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);