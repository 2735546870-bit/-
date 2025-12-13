'use client';

import { useTranslation } from 'react-i18next';
import '../../lib/i18n';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Sitemap() {
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
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-thin mb-12" style={{ fontFamily: '"Georgia", serif', letterSpacing: '0.12em', color: '#12110f' }}>
            {i18n.language === 'en' ? 'Sitemap' : '网站地图'}
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Main Pages */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-medium mb-6" style={{ color: '#12110f' }}>
                {i18n.language === 'en' ? 'Main Pages' : '主要页面'}
              </h2>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/"
                    className="flex items-center space-x-2 text-lg font-light hover:text-black transition-colors"
                    style={{ color: '#374151' }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#12110f' }}></span>
                    <span>{i18n.language === 'en' ? 'Home' : '首页'}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/#about"
                    className="flex items-center space-x-2 text-lg font-light hover:text-black transition-colors"
                    style={{ color: '#374151' }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#12110f' }}></span>
                    <span>{i18n.language === 'en' ? 'About Us' : '关于我们'}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/#testimonials"
                    className="flex items-center space-x-2 text-lg font-light hover:text-black transition-colors"
                    style={{ color: '#374151' }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#12110f' }}></span>
                    <span>{i18n.language === 'en' ? 'Customer Testimonials' : '客户展示'}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/#certificates"
                    className="flex items-center space-x-2 text-lg font-light hover:text-black transition-colors"
                    style={{ color: '#374151' }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#12110f' }}></span>
                    <span>{i18n.language === 'en' ? 'Certifications' : '资质认证'}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/#knowledge"
                    className="flex items-center space-x-2 text-lg font-light hover:text-black transition-colors"
                    style={{ color: '#374151' }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#12110f' }}></span>
                    <span>{i18n.language === 'en' ? 'Knowledge Center' : '知识中心'}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/#projects"
                    className="flex items-center space-x-2 text-lg font-light hover:text-black transition-colors"
                    style={{ color: '#374151' }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#12110f' }}></span>
                    <span>{i18n.language === 'en' ? 'Customer Projects' : '客户项目'}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/#contact"
                    className="flex items-center space-x-2 text-lg font-light hover:text-black transition-colors"
                    style={{ color: '#374151' }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#12110f' }}></span>
                    <span>{i18n.language === 'en' ? 'Contact Us' : '联系我们'}</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Products */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-medium mb-6" style={{ color: '#12110f' }}>
                {i18n.language === 'en' ? 'Products' : '产品'}
              </h2>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/products"
                    className="flex items-center space-x-2 text-lg font-light hover:text-black transition-colors"
                    style={{ color: '#374151' }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#12110f' }}></span>
                    <span>{i18n.language === 'en' ? 'All Products' : '所有产品'}</span>
                  </a>
                </li>
                <li>
                  <span className="flex items-center space-x-2 text-lg font-light" style={{ color: '#6b7280' }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#d1d5db' }}></span>
                    <span>{i18n.language === 'en' ? 'Round Drains' : '圆形地漏'}</span>
                  </span>
                </li>
                <li>
                  <span className="flex items-center space-x-2 text-lg font-light" style={{ color: '#6b7280' }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#d1d5db' }}></span>
                    <span>{i18n.language === 'en' ? 'Square Drains' : '方形地漏'}</span>
                  </span>
                </li>
                <li>
                  <span className="flex items-center space-x-2 text-lg font-light" style={{ color: '#6b7280' }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#d1d5db' }}></span>
                    <span>{i18n.language === 'en' ? 'Linear Drains' : '线性地漏'}</span>
                  </span>
                </li>
              </ul>
            </div>

            {/* Legal & Company */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-medium mb-6" style={{ color: '#12110f' }}>
                {i18n.language === 'en' ? 'Legal & Company' : '法律与公司'}
              </h2>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/admin/products"
                    className="flex items-center space-x-2 text-lg font-light hover:text-black transition-colors"
                    style={{ color: '#374151' }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#12110f' }}></span>
                    <span>{i18n.language === 'en' ? 'Management Center' : '管理中心'}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="flex items-center space-x-2 text-lg font-light hover:text-black transition-colors"
                    style={{ color: '#374151' }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#12110f' }}></span>
                    <span>{i18n.language === 'en' ? 'Privacy Policy' : '隐私政策'}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="flex items-center space-x-2 text-lg font-light hover:text-black transition-colors"
                    style={{ color: '#374151' }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#12110f' }}></span>
                    <span>{i18n.language === 'en' ? 'Terms of Service' : '服务条款'}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/sitemap"
                    className="flex items-center space-x-2 text-lg font-light hover:text-black transition-colors"
                    style={{ color: '#374151' }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#12110f' }}></span>
                    <span>{i18n.language === 'en' ? 'Sitemap' : '网站地图'}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/cookies"
                    className="flex items-center space-x-2 text-lg font-light hover:text-black transition-colors"
                    style={{ color: '#374151' }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#12110f' }}></span>
                    <span>{i18n.language === 'en' ? 'Cookie Policy' : 'Cookie政策'}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Company Information */}
          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-medium mb-6" style={{ color: '#12110f' }}>
              {i18n.language === 'en' ? 'Company Information' : '公司信息'}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4" style={{ color: '#12110f' }}>
                  {i18n.language === 'en' ? 'Contact Details' : '联系方式'}
                </h3>
                <div className="space-y-2 text-lg font-light" style={{ color: '#374151' }}>
                  <p>Email: zezhihe@yeah.net</p>
                  <p>Phone: +86 183 5799 1657</p>
                  <p>{i18n.language === 'en' ? 'Address: Yongkang City, Zhejiang Province, China' : '地址：中国浙江省永康市'}</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4" style={{ color: '#12110f' }}>
                  {i18n.language === 'en' ? 'Business Hours' : '营业时间'}
                </h3>
                <div className="space-y-1 text-lg font-light" style={{ color: '#374151' }}>
                  <p>{i18n.language === 'en' ? 'Monday - Friday: 8:00 AM - 6:00 PM' : '周一至周五：上午8:00 - 下午6:00'}</p>
                  <p>{i18n.language === 'en' ? 'Saturday: 9:00 AM - 5:00 PM' : '周六：上午9:00 - 下午5:00'}</p>
                  <p>{i18n.language === 'en' ? 'Sunday: Closed' : '周日：休息'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="mt-12 text-center">
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
  );
}