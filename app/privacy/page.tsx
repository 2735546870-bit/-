'use client';

import { useTranslation } from 'react-i18next';
import '../../lib/i18n';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PrivacyPolicy() {
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
            {i18n.language === 'en' ? 'Privacy Policy' : '隐私政策'}
          </h1>

          <div className="space-y-8 text-lg font-light leading-relaxed" style={{ color: '#374151' }}>
            <div>
              <h2 className="text-2xl font-medium mb-4" style={{ color: '#12110f' }}>
                {i18n.language === 'en' ? 'Information We Collect' : '我们收集的信息'}
              </h2>
              <p className="mb-4">
                {i18n.language === 'en'
                  ? 'We collect information you provide directly to us, such as when you contact us through our website, complete a form, or communicate with us.'
                  : '我们收集您直接提供给我们的信息，例如当您通过网站联系我们、填写表单或与我们沟通时。'
                }
              </p>
              <p>
                {i18n.language === 'en'
                  ? 'This information may include: your name, email address, phone number, and any other information you choose to provide.'
                  : '这些信息可能包括：您的姓名、电子邮件地址、电话号码以及您选择提供的任何其他信息。'
                }
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-4" style={{ color: '#12110f' }}>
                {i18n.language === 'en' ? 'How We Use Your Information' : '我们如何使用您的信息'}
              </h2>
              <p className="mb-4">
                {i18n.language === 'en'
                  ? 'We use the information we collect to: respond to your inquiries, provide our services, improve our website, and communicate with you about our products and services.'
                  : '我们使用收集的信息来：回复您的咨询、提供我们的服务、改进我们的网站，以及与您就我们的产品和服务进行沟通。'
                }
              </p>
              <p>
                {i18n.language === 'en'
                  ? 'We may also use your information to send you promotional communications if you have opted in to receive them.'
                  : '如果您选择接收推广信息，我们也可能使用您的信息向您发送推广通讯。'
                }
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-4" style={{ color: '#12110f' }}>
                {i18n.language === 'en' ? 'Information Sharing' : '信息共享'}
              </h2>
              <p>
                {i18n.language === 'en'
                  ? 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this privacy policy or as required by law.'
                  : '除本隐私政策所述或法律要求外，未经您的同意，我们不会出售、交易或以其他方式向第三方转移您的个人信息。'
                }
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-4" style={{ color: '#12110f' }}>
                {i18n.language === 'en' ? 'Data Security' : '数据安全'}
              </h2>
              <p>
                {i18n.language === 'en'
                  ? 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'
                  : '我们实施适当的技术和组织措施来保护您的个人信息免受未经授权的访问、更改、披露或销毁。'
                }
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-4" style={{ color: '#12110f' }}>
                {i18n.language === 'en' ? 'Cookies' : 'Cookies'}
              </h2>
              <p className="mb-4">
                {i18n.language === 'en'
                  ? 'Our website may use cookies to enhance your experience. Cookies are small text files stored on your device that help us analyze website traffic and improve our services.'
                  : '我们的网站可能使用cookies来增强您的体验。Cookies是存储在您设备上的小型文本文件，帮助我们分析网站流量并改进我们的服务。'
                }
              </p>
              <p>
                {i18n.language === 'en'
                  ? 'You can choose to accept or decline cookies through your browser settings.'
                  : '您可以通过浏览器设置选择接受或拒绝cookies。'
                }
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-4" style={{ color: '#12110f' }}>
                {i18n.language === 'en' ? 'Your Rights' : '您的权利'}
              </h2>
              <p>
                {i18n.language === 'en'
                  ? 'You have the right to access, update, or delete your personal information. You may also opt out of receiving promotional communications from us at any time.'
                  : '您有权访问、更新或删除您的个人信息。您也可以随时选择停止接收我们的推广通讯。'
                }
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-4" style={{ color: '#12110f' }}>
                {i18n.language === 'en' ? 'Contact Us' : '联系我们'}
              </h2>
              <p className="mb-4">
                {i18n.language === 'en'
                  ? 'If you have any questions about this Privacy Policy or our data practices, please contact us:'
                  : '如果您对本隐私政策或我们的数据处理做法有任何疑问，请联系我们：'
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