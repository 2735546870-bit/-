import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import '../../lib/i18n';
import { useState, useEffect } from 'react';

export default function Custom404() {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f9f8f5' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#12110f' }}></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ backgroundColor: '#f9f8f5' }}>
      <div className="text-center max-w-md">
        {/* 404 数字 */}
        <div className="text-9xl font-thin mb-4" style={{ color: '#12110f', fontFamily: '"Georgia", serif', letterSpacing: '0.1em' }}>
          404
        </div>

        {/* 错误信息 */}
        <h1 className="text-2xl font-light mb-4" style={{ color: '#12110f' }}>
          {i18n.language === 'en' ? 'Page Not Found' : '页面未找到'}
        </h1>

        <p className="text-lg font-light mb-8" style={{ color: '#6b7280' }}>
          {i18n.language === 'en'
            ? 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'
            : '您访问的页面可能已被删除、更名或暂时不可用。'
          }
        </p>

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#12110f' }}
          >
            {i18n.language === 'en' ? 'Go Home' : '返回首页'}
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-lg border-2 hover:bg-gray-50 transition-colors"
            style={{ borderColor: '#aeadaa', color: '#12110f' }}
          >
            {i18n.language === 'en' ? 'Go Back' : '返回上页'}
          </button>
        </div>

        {/* 联系信息 */}
        <div className="mt-12 pt-8 border-t" style={{ borderColor: '#e5e7eb' }}>
          <p className="text-sm" style={{ color: '#6b7280' }}>
            {i18n.language === 'en' ? 'Need help? Contact us at ' : '需要帮助？请联系我们：'}
            <a href="mailto:zezhihe@yeah.net" className="font-medium" style={{ color: '#12110f' }}>
              zezhihe@yeah.net
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}