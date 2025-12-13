'use client';

import { useTranslation } from 'react-i18next';
import '../../lib/i18n';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CookiePolicy() {
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
    <div className="min-h-screen" style={{ backgroundColor: '#f9f8f5' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b" style={{ borderColor: '#aeadaa' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src="/images/logo.png"
                  alt="泽智合工贸有限公司 Logo"
                  className="h-8 w-auto rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLDivElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                  onLoad={(e) => {
                    const target = e.target as HTMLImageElement;
                    const fallback = target.nextElementSibling as HTMLDivElement;
                    if (fallback) fallback.style.display = 'none';
                  }}
                />
                <div className="h-8 w-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center shadow-md" style={{ display: 'none' }}>
                  <span className="text-xs font-bold" style={{ fontFamily: '"Georgia", serif', letterSpacing: '0.1em' }}>ZÉZH</span>
                </div>
              </div>
              <h1 className="text-xl font-light" style={{ fontFamily: '"Georgia", serif', letterSpacing: '0.1em' }}>ZÉZHÌHÉ</h1>
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => window.location.href = '/'}
                className="text-sm font-light hover:text-black transition-colors"
                style={{ color: '#aeadaa' }}
              >
                {i18n.language === 'en' ? 'Back to Home' : '返回首页'}
              </button>
              <button
                onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en')}
                className="text-sm font-light px-3 py-1 rounded-lg border transition-colors"
                style={{ borderColor: '#aeadaa', color: '#12110f' }}
              >
                {i18n.language === 'en' ? 'EN' : '中文'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-thin mb-12" style={{ fontFamily: '"Georgia", serif', letterSpacing: '0.12em', color: '#12110f' }}>
            {i18n.language === 'en' ? 'Cookie Policy' : 'Cookie政策'}
          </h1>

          <div className="space-y-8 text-lg font-light leading-relaxed" style={{ color: '#374151' }}>
            <div>
              <h2 className="text-2xl font-medium mb-4" style={{ color: '#12110f' }}>
                {i18n.language === 'en' ? 'What Are Cookies' : '什么是Cookies'}
              </h2>
              <p>
                {i18n.language === 'en'
                  ? 'Cookies are small text files that are placed on your computer or mobile device when you visit our website. They allow the website to remember your actions and preferences (such as login, language, font size, and other display preferences) over a period of time.'
                  : 'Cookies是当您访问我们的网站时放置在您的计算机或移动设备上的小型文本文件。它们允许网站在一定时间内记住您的操作和偏好（如登录、语言、字体大小和其他显示偏好）。'
                }
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-4" style={{ color: '#12110f' }}>
                {i18n.language === 'en' ? 'How We Use Cookies' : '我们如何使用Cookies'}
              </h2>
              <p className="mb-4">
                {i18n.language === 'en'
                  ? 'We use cookies for various purposes, including:'
                  : '我们将cookies用于各种目的，包括：'
                }
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  {i18n.language === 'en'
                    ? 'Essential Cookies: Required for the website to function properly'
                    : '必要Cookies：网站正常运行所必需的'
                  }
                </li>
                <li>
                  {i18n.language === 'en'
                    ? 'Performance Cookies: Help us analyze how visitors use our website'
                    : '性能Cookies：帮助我们分析访问者如何使用我们的网站'
                  }
                </li>
                <li>
                  {i18n.language === 'en'
                    ? 'Functional Cookies: Enable enhanced functionality and personalization'
                    : '功能Cookies：启用增强的功能和个性化'
                  }
                </li>
                <li>
                  {i18n.language === 'en'
                    ? 'Marketing Cookies: Used to deliver advertisements relevant to your interests'
                    : '营销Cookies：用于投放与您兴趣相关的广告'
                  }
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-4" style={{ color: '#12110f' }}>
                {i18n.language === 'en' ? 'Types of Cookies We Use' : '我们使用的Cookie类型'}
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg">
                  <h3 className="font-medium mb-2" style={{ color: '#12110f' }}>
                    {i18n.language === 'en' ? 'Session Cookies' : '会话Cookies'}
                  </h3>
                  <p>
                    {i18n.language === 'en'
                      ? 'These are temporary cookies that expire when you close your browser. They help us track your movement through our website during a single session.'
                      : '这些是临时cookies，在您关闭浏览器时过期。它们帮助我们在单个会话期间跟踪您在网站上的移动。'
                    }
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <h3 className="font-medium mb-2" style={{ color: '#12110f' }}>
                    {i18n.language === 'en' ? 'Persistent Cookies' : '持久Cookies'}
                  </h3>
                  <p>
                    {i18n.language === 'en'
                      ? 'These remain on your device for a set period or until you delete them. They help us recognize you when you return to our website.'
                      : '这些在您的设备上保留设定的时间段或直到您删除它们。它们帮助我们在您返回网站时识别您。'
                    }
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <h3 className="font-medium mb-2" style={{ color: '#12110f' }}>
                    {i18n.language === 'en' ? 'Third-Party Cookies' : '第三方Cookies'}
                  </h3>
                  <p>
                    {i18n.language === 'en'
                      ? 'These are set by external services on our website, such as analytics tools or advertising networks.'
                      : '这些由我们网站上的外部服务设置，如分析工具或广告网络。'
                    }
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-4" style={{ color: '#12110f' }}>
                {i18n.language === 'en' ? 'Managing Your Cookie Preferences' : '管理您的Cookie偏好'}
              </h2>
              <p className="mb-4">
                {i18n.language === 'en'
                  ? 'You can control and/or delete cookies as you wish. You can:'
                  : '您可以根据需要控制和/或删除cookies。您可以：'
                }
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  {i18n.language === 'en'
                    ? 'Delete all cookies that are already on your computer'
                    : '删除您计算机上已有的所有cookies'
                  }
                </li>
                <li>
                  {i18n.language === 'en'
                    ? 'Set your browser to refuse all cookies or only accept certain types'
                    : '设置浏览器拒绝所有cookies或只接受某些类型'
                  }
                </li>
                <li>
                  {i18n.language === 'en'
                    ? 'Block cookies from specific websites'
                    : '阻止特定网站的cookies'
                  }
                </li>
              </ul>
              <p className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4" style={{ borderColor: '#3b82f6' }}>
                {i18n.language === 'en'
                  ? 'Please note that blocking or deleting cookies may affect your user experience and may prevent you from accessing certain features of our website.'
                  : '请注意，阻止或删除cookies可能会影响您的用户体验，并可能阻止您访问我们网站的某些功能。'
                }
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-4" style={{ color: '#12110f' }}>
                {i18n.language === 'en' ? 'Cookie Settings by Browser' : '按浏览器设置Cookie'}
              </h2>
              <div className="space-y-3">
                <p>
                  {i18n.language === 'en' ? 'To manage cookies through your browser:' : '通过浏览器管理cookies：'}
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-base">
                  <li><strong>Chrome:</strong> {i18n.language === 'en' ? 'Settings > Privacy and security > Cookies and other site data' : '设置 > 隐私和安全 > Cookies及其他网站数据'}</li>
                  <li><strong>Firefox:</strong> {i18n.language === 'en' ? 'Options > Privacy & Security > Cookies and Site Data' : '选项 > 隐私与安全 > Cookies和网站数据'}</li>
                  <li><strong>Safari:</strong> {i18n.language === 'en' ? 'Preferences > Privacy > Cookies and website data' : '偏好设置 > 隐私 > Cookies和网站数据'}</li>
                  <li><strong>Edge:</strong> {i18n.language === 'en' ? 'Settings > Privacy, search, and services > Cookies' : '设置 > 隐私、搜索和服务 > Cookies'}</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-4" style={{ color: '#12110f' }}>
                {i18n.language === 'en' ? 'Updates to This Policy' : '本政策的更新'}
              </h2>
              <p>
                {i18n.language === 'en'
                  ? 'We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Please review this page periodically for any changes.'
                  : '我们可能会不时更新此Cookie政策，以反映我们做法的变化或出于其他运营、法律或监管原因。请定期查看此页面以了解任何更改。'
                }
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-4" style={{ color: '#12110f' }}>
                {i18n.language === 'en' ? 'Contact Us' : '联系我们'}
              </h2>
              <p className="mb-4">
                {i18n.language === 'en'
                  ? 'If you have any questions about this Cookie Policy, please contact us:'
                  : '如果您对此Cookie政策有任何疑问，请联系我们：'
                }
              </p>
              <div className="space-y-2" style={{ color: '#6b7280' }}>
                <p>Email: zezhihe@yeah.net</p>
                <p>Phone: +86 183 5799 1657</p>
                <p>{i18n.language === 'en' ? 'Address: Yongkang City, Zhejiang Province, China' : '地址：中国浙江省永康市'}</p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t" style={{ borderColor: '#e5e7eb' }}>
              <p className="text-sm" style={{ color: '#6b7280' }}>
                {i18n.language === 'en'
                  ? `Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`
                  : `最后更新：${new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}`
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}