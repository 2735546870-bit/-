'use client';

import { useTranslation } from 'react-i18next';
import '../../lib/i18n';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TermsOfService() {
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
            {i18n.language === 'en' ? 'Terms of Service' : '服务条款'}
          </h1>

          <div className="space-y-8 text-lg font-light leading-relaxed" style={{ color: '#374151' }}>
            <div>
              <h2 className="text-2xl font-medium mb-4" style={{ color: '#12110f' }}>
                {i18n.language === 'en' ? 'Acceptance of Terms' : '条款的接受'}
              </h2>
              <p>
                {i18n.language === 'en'
                  ? 'By accessing and using our website, you accept and agree to be bound by the terms and provision of this agreement.'
                  : '通过访问和使用我们的网站，您接受并同意受本协议条款和条件的约束。'
                }
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-4" style={{ color: '#12110f' }}>
                {i18n.language === 'en' ? 'Use License' : '使用许可'}
              </h2>
              <p className="mb-4">
                {i18n.language === 'en'
                  ? 'Permission is granted to temporarily download one copy of the materials on ZÉZHÌHÉ website for personal, non-commercial transitory viewing only.'
                  : '获准临时下载泽智合网站上的材料副本一份，仅用于个人、非商业性的临时查看。'
                }
              </p>
              <p>
                {i18n.language === 'en'
                  ? 'This is the grant of a license, not a transfer of title, and under this license you may not:'
                  : '这是许可的授予，而不是所有权的转让，在此许可下您不得：'
                }
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 ml-4">
                <li>{i18n.language === 'en' ? 'modify or copy the materials' : '修改或复制材料'}</li>
                <li>{i18n.language === 'en' ? 'use the materials for any commercial purpose' : '将材料用于任何商业目的'}</li>
                <li>{i18n.language === 'en' ? 'attempt to reverse engineer any software contained on the website' : '试图对网站上包含的任何软件进行逆向工程'}</li>
                <li>{i18n.language === 'en' ? 'remove any copyright or other proprietary notations from the materials' : '从材料中删除任何版权或其他专有标记'}</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-4" style={{ color: '#12110f' }}>
                {i18n.language === 'en' ? 'Disclaimer' : '免责声明'}
              </h2>
              <p>
                {i18n.language === 'en'
                  ? 'The materials on ZÉZHÌHÉ website are provided on an \'as is\' basis. ZÉZHÌHÉ makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.'
                  : '泽智合网站上的材料按"原样"提供。泽智合不作任何明示或暗示的保证，并在此免除和否定所有其他保证，包括但不限于适销性、特定用途适用性或不侵犯知识产权或其他侵权的暗示保证或条件。'
                }
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-4" style={{ color: '#12110f' }}>
                {i18n.language === 'en' ? 'Limitations' : '责任限制'}
              </h2>
              <p>
                {i18n.language === 'en'
                  ? 'In no event shall ZÉZHÌHÉ or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ZÉZHÌHÉ website.'
                  : '在任何情况下，泽智合或其供应商均不对因使用或无法使用泽智合网站上的材料而造成的任何损害（包括但不限于数据或利润损失或业务中断造成的损害）承担责任。'
                }
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-4" style={{ color: '#12110f' }}>
                {i18n.language === 'en' ? 'Product Information' : '产品信息'}
              </h2>
              <p className="mb-4">
                {i18n.language === 'en'
                  ? 'We strive to provide accurate product information on our website. However, we do not warrant that product descriptions, colors, information, or other content of the products are accurate, complete, reliable, current, or error-free.'
                  : '我们努力在网站上提供准确的产品信息。但是，我们不保证产品描述、颜色、信息或产品的其他内容是准确、完整、可靠、最新或无错误的。'
                }
              </p>
              <p>
                {i18n.language === 'en'
                  ? 'Please review the product carefully before making any purchase.'
                  : '在购买前请仔细查看产品。'
                }
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-4" style={{ color: '#12110f' }}>
                {i18n.language === 'en' ? 'Privacy Policy' : '隐私政策'}
              </h2>
              <p>
                {i18n.language === 'en'
                  ? 'Your Privacy Policy governs your use of our website and outlines how we collect, use, and protect your personal information.'
                  : '您的隐私政策管辖您对我们网站的使用，并概述了我们如何收集、使用和保护您的个人信息。'
                }
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-4" style={{ color: '#12110f' }}>
                {i18n.language === 'en' ? 'Modifications' : '修改'}
              </h2>
              <p>
                {i18n.language === 'en'
                  ? 'ZÉZHÌHÉ may revise these terms of service for its website at any time without notice. By using this web site, you are agreeing to be bound by the then current version of these terms of service.'
                  : '泽智合可随时随时修改其网站的服务条款，恕不另行通知。通过使用本网站，您同意受当时现行版本的服务条款的约束。'
                }
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-4" style={{ color: '#12110f' }}>
                {i18n.language === 'en' ? 'Governing Law' : '管辖法律'}
              </h2>
              <p>
                {i18n.language === 'en'
                  ? 'These terms and conditions are governed by and construed in accordance with the laws of China and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.'
                  : '这些条款和条件受中国法律管辖并按其解释，您不可撤销地接受该州或地点法院的专属管辖权。'
                }
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-4" style={{ color: '#12110f' }}>
                {i18n.language === 'en' ? 'Contact Information' : '联系信息'}
              </h2>
              <p className="mb-4">
                {i18n.language === 'en'
                  ? 'If you have any questions about these Terms of Service, please contact us:'
                  : '如果您对这些服务条款有任何疑问，请联系我们：'
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