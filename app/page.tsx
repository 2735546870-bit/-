'use client';

import { useTranslation } from 'react-i18next';
import '../lib/i18n';
import { useState, useEffect } from 'react';
// import LanguageSwitch from '../components/LanguageSwitch';

export default function Home() {
  const { i18n } = useTranslation('translation');
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Check which sections are visible
      const sections = ['about', 'services', 'knowledge', 'contact'];
      const visible = new Set<string>();

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.8) {
            visible.add(section);
          }
        }
      });

      setVisibleSections(visible);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200/50 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="#home" className="flex items-center space-x-3">
              {/* Company Logo */}
              <img
                src="/images/logo.png"
                alt="泽智合工贸有限公司 Logo"
                className="w-10 h-10 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 object-contain bg-white/10"
                onError={(e) => {
                  // Fallback to styled logo if image not found
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLDivElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
                onLoad={(e) => {
                  // Hide fallback when image loads successfully
                  const target = e.target as HTMLImageElement;
                  const fallback = target.nextElementSibling as HTMLDivElement;
                  if (fallback) fallback.style.display = 'none';
                }}
              />
              {/* Fallback Logo (colored square with text) */}
              <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-slate-800 rounded-lg shadow-md flex items-center justify-center" style={{display: 'none'}}>
                <span className="text-white font-bold text-sm">泽</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                {i18n.language === 'en' ? 'Zézhìhé Trading' : '泽智合工贸'}
              </span>
            </a>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-slate-600 font-medium transition-colors">
                {i18n.language === 'en' ? 'Home' : '首页'}
              </a>
              <a href="#about" className="text-gray-700 hover:text-slate-600 font-medium transition-colors">
                {i18n.language === 'en' ? 'About' : '关于'}
              </a>
              <a href="#services" className="text-gray-700 hover:text-slate-600 font-medium transition-colors">
                {i18n.language === 'en' ? 'Services' : '服务'}
              </a>
              <a href="#knowledge" className="text-gray-700 hover:text-slate-600 font-medium transition-colors">
                {i18n.language === 'en' ? 'Knowledge' : '知识中心'}
              </a>
              <a href="#contact" className="text-gray-700 hover:text-slate-600 font-medium transition-colors">
                {i18n.language === 'en' ? 'Contact' : '联系'}
              </a>

              {/* Language Toggle Button */}
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 px-3 py-2 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl hover:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span className="text-slate-700 font-medium">
                  {i18n.language === 'en' ? 'EN' : '中文'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated marble background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-gray-200">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-200/40 to-purple-200/40 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-gray-300/30 to-slate-400/30 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-stone-200/40 to-slate-300/40 rounded-full filter blur-3xl animate-pulse delay-500"></div>
          </div>
        </div>

        {/* Marble texture overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-gradient-to-tl from-transparent via-gray-100/20 to-white/40 transform rotate-12 scale-150"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-700 via-gray-800 to-slate-900 bg-clip-text text-transparent animate-fade-in">
            {i18n.language === 'en' ? 'Zézhìhé Trading Co., Ltd.' : '泽智合工贸有限公司'}
          </h1>
          <h2 className="text-2xl md:text-4xl font-light mb-4 text-gray-600 animate-fade-in delay-200">
            {i18n.language === 'en' ? 'Premium Kitchen & Bathroom Solutions' : '现代极简主义厨卫解决方案'}
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-gray-700 animate-fade-in delay-300 leading-relaxed">
            {i18n.language === 'en'
              ? 'Modern minimalist kitchen and bathroom solutions that perfectly blend exquisite craftsmanship with practical functionality'
              : '现代极简主义厨卫解决方案，将精湛工艺与实用功能完美融合'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-500">
            <a
              href="/products"
              className="bg-gradient-to-r from-slate-700 to-slate-900 text-white px-8 py-4 rounded-xl font-semibold hover:from-slate-800 hover:to-slate-950 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center"
            >
              {i18n.language === 'en' ? 'Explore Products' : '探索产品'}
            </a>
            <button
              onClick={scrollToContact}
              className="bg-white/60 backdrop-blur-sm text-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-white/80 transition-all duration-300 border border-gray-200/50"
            >
              {i18n.language === 'en' ? 'Contact Us' : '联系我们'}
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-24 transition-all duration-1000 ${visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-700 to-gray-900 bg-clip-text text-transparent">
                {i18n.language === 'en' ? 'About Zézhìhé Trading' : '关于泽智合工贸'}
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {i18n.language === 'en'
                  ? 'We are a leading provider of premium kitchen and bathroom solutions, specializing in modern minimalist designs that combine aesthetics with functionality.'
                  : '我们是高端厨卫解决方案的领先提供商，专注于将极简主义美学与实用功能完美结合的现代设计。'
                }
              </p>
              <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-8 rounded-2xl border border-gray-200/50">
                <h3 className="text-2xl font-semibold mb-4 text-slate-800">
                  {i18n.language === 'en' ? 'Professional Team' : '专业团队'}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {i18n.language === 'en'
                    ? 'With years of experience in kitchen and bathroom design, our professional team brings your vision to life with precision and care.'
                    : '凭借在厨卫设计领域的多年经验，我们的专业团队以精准的工艺和细致的关怀，将您的愿景变为现实。'
                  }
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-slate-200 to-gray-200 h-96 rounded-2xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 via-purple-400/20 to-pink-400/20 animate-pulse"></div>
                <div className="flex items-center justify-center h-full">
                  <span className="text-gray-600 text-lg font-medium">
                    {i18n.language === 'en' ? 'Modern Kitchen & Bath Design' : '现代厨卫设计'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={`py-24 bg-gradient-to-r from-slate-50 to-gray-50 transition-all duration-1000 ${visibleSections.has('services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-slate-700 to-gray-900 bg-clip-text text-transparent">
            {i18n.language === 'en' ? 'Our Services' : '我们的服务'}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                {i18n.language === 'en' ? 'Kitchen Design' : '厨房设计'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {i18n.language === 'en'
                  ? 'Custom kitchen solutions that maximize space and functionality while maintaining a clean, minimalist aesthetic.'
                  : '定制厨房解决方案，在保持干净、极简美学的同时，最大化空间利用和功能性，为您打造理想的烹饪空间。'
                }
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                {i18n.language === 'en' ? 'Bathroom Renovation' : '卫浴翻新'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {i18n.language === 'en'
                  ? 'Modern bathroom designs that create a spa-like atmosphere with efficient use of space.'
                  : '现代浴室设计，通过高效的空间利用营造水疗般的氛围，让您在繁忙的生活中享受放松时刻。'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Center Section */}
      <section id="knowledge" className={`py-24 transition-all duration-1000 ${visibleSections.has('knowledge') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-slate-700 to-gray-900 bg-clip-text text-transparent">
            {i18n.language === 'en' ? 'Knowledge Center' : '知识中心'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {i18n.language === 'en' ? 'Floor Drain Selection Guide' : '地漏选择指南'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {i18n.language === 'en'
                    ? 'Learn how to choose the right floor drain for your bathroom or kitchen space.'
                    : '学习如何为您的浴室或厨房空间选择合适的地漏产品。'
                  }
                </p>
                <a href="/knowledge" className="text-blue-600 hover:text-blue-700 font-medium">
                  {i18n.language === 'en' ? 'Explore Knowledge Center →' : '探索知识中心 →'}
                </a>
              </div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {i18n.language === 'en' ? 'Installation & Maintenance' : '安装与保养'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {i18n.language === 'en'
                    ? 'Step-by-step installation guides and maintenance tips for long-lasting performance.'
                    : '详细的安装步骤和保养技巧，确保产品长期稳定使用。'
                  }
                </p>
                <a href="/knowledge" className="text-purple-600 hover:text-purple-700 font-medium">
                  {i18n.language === 'en' ? 'View Installation Guides →' : '查看安装指南 →'}
                </a>
              </div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {i18n.language === 'en' ? 'Product Knowledge Base' : '产品知识库'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {i18n.language === 'en'
                    ? 'Comprehensive information about materials, features, and technical specifications.'
                    : '关于材质、功能特性和技术规格的全面信息介绍。'
                  }
                </p>
                <a href="/knowledge" className="text-green-600 hover:text-green-700 font-medium">
                  {i18n.language === 'en' ? 'Access Knowledge Base →' : '访问知识库 →'}
                </a>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href="/knowledge"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-slate-700 to-slate-900 text-white font-semibold rounded-xl hover:from-slate-800 hover:to-slate-950 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {i18n.language === 'en' ? 'Visit Knowledge Center' : '访问知识中心'}
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-24 bg-white transition-all duration-1000 ${visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-slate-700 to-gray-900 bg-clip-text text-transparent">
            {i18n.language === 'en' ? 'Contact Us' : '联系我们'}
          </h2>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {i18n.language === 'en' ? 'Name' : '姓名'}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all"
                    placeholder={i18n.language === 'en' ? 'Enter your name' : '请输入您的姓名'}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {i18n.language === 'en' ? 'Email' : '邮箱'}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all"
                    placeholder={i18n.language === 'en' ? 'Enter your email' : '请输入您的邮箱'}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {i18n.language === 'en' ? 'Message' : '留言'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all"
                    placeholder={i18n.language === 'en' ? 'Tell us about your needs' : '请告诉我们您的需求'}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-slate-700 to-slate-900 text-white py-3 rounded-xl font-semibold hover:from-slate-800 hover:to-slate-950 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {i18n.language === 'en' ? 'Send Message' : '发送消息'}
                </button>
              </form>
            </div>
            <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-8 rounded-2xl border border-gray-200/50">
              <h3 className="text-2xl font-semibold mb-6 text-slate-800">
                {i18n.language === 'en' ? 'Contact Information' : '联系信息'}
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{i18n.language === 'en' ? 'Address' : '地址'}</p>
                    <p className="text-gray-600">
                      {i18n.language === 'en' ? 'No.11, Chaoyang East Road, Wangnanshan Industrial Zone, Gushan Town, Yongkang, Zhejiang' : '浙江省永康市古山镇王南山工业区朝阳东路11号'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{i18n.language === 'en' ? 'Phone' : '电话'}</p>
                    <p className="text-gray-600">+86 183 5799 1657</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{i18n.language === 'en' ? 'Email' : '邮箱'}</p>
                    <p className="text-gray-600">zezhihe@yeah.net</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-gradient-to-r from-slate-900 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-8 text-white">
            {i18n.language === 'en' ? 'Follow Us' : '关注我们'}
          </h3>
          <div className="flex justify-center space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 01-2.14-2.74 4.958 4.958 0 00-4.84-.265 5.011 5.011 0 00-9.506 2.27A14.953 14.953 0 0112 2.56a4.958 4.958 0 00-4.574 3.048 9.896 9.896 0 01-1.894 5.834A4.958 4.958 0 0014.042 23.025a10.01 10.01 0 01-7.875-3.722 14.938 14.938 0 008.235 2.465 4.958 4.958 0 002.123-7.055 9.896 9.896 0 01-2.83 1.375 4.958 4.958 0 001.558 6.18A9.884 9.884 0 010 21.194a14.938 14.938 0 007.552 2.079 4.958 4.958 0 004.292-5.818 9.896 9.896 0 011.983-6.244 4.958 4.958 0 002.832 3.103z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.262 6.465 1.08 8.967 3.584 2.502 2.504 3.322 5.715 3.584 8.967.058 1.28.07 1.646.07 4.85v1.754c0 3.204-.012 3.584-.07 4.85-.262 3.252-1.08 6.465-3.584 8.967-2.504 2.502-5.715 3.322-8.967 3.584-1.266.058-1.646.07-4.85.07-3.204 0-3.584-.012-4.85-.07-3.252-.262-6.465-1.08-8.967-3.584-2.504-2.504-3.322-5.715-3.584-8.967-.058-1.26-.07-1.646-.07-4.85V8.325c0-3.204.012-3.584.07-4.85.262-3.252 1.08-6.465 3.584-8.967 2.504-2.502 5.715-3.322 8.967-3.584 1.26-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-2.858.233-5.731 1.037-7.868 3.033-2.137 1.996-2.8 4.862-3.033 7.868-.058 1.28-.072 1.689-.072 4.948v1.754c0 3.259.014 3.668.072 4.948.233 2.858 1.037 5.731 3.033 7.868 1.996 2.137 4.862 2.8 7.868 3.033 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 2.858-.233 5.731-1.037 7.868-3.033 2.137-1.996 2.8-4.862 3.033-7.868.058-1.28.072-1.689.072-4.948v-1.754c0-3.259-.014-3.667-.072-4.947-.233-2.858-1.037-5.731-3.033-7.868-1.996-2.137-4.862-2.8-7.868-3.033-1.28-.058-1.689-.072-4.948-.072zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-1.846 1.009-2.125 1.96-2.125 1.618 0 2.018 1.105 2.018 2.057v4.674h-3.554v-9.756h3.414v1.345h.048c.473-.895 1.635-1.845 3.363-1.845 3.6 0 4.262 2.37 4.262 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9.696h3.564v10.756z"/>
              </svg>
            </a>
            <a href="https://weibo.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10.098 20.323c-3.977.417-7.407-.739-7.658-3.25-.252-2.511 2.791-5.012 6.768-5.429 3.977-.417 7.407.739 7.658 3.25.252 2.511-2.791 5.012-6.768 5.429zm-3.279-3.398c.447-1.388 1.928-2.192 3.32-1.795 1.392.397 2.07 1.886 1.623 3.274-.447 1.388-1.928 2.192-3.32 1.795-1.392-.397-2.07-1.886-1.623-3.274.447-1.388 1.928-2.192 3.32-1.795 1.392.397 2.07 1.886 1.623 3.274zm4.861-5.48c-.218-.07-.37-.285-.303-.51.067-.225.307-.316.525-.247.218.07.37.285.303.51-.067.225-.307.316-.525.247zm6.834 1.488c-.669-.965-2.208-1.477-4.788-1.477-2.58 0-4.12.512-4.788 1.477-.669.965-.724 2.045-.165 3.207.559 1.162 1.526 1.823 2.933 1.823 1.406 0 2.373-.661 2.933-1.823.559-1.162.504-2.242-.165-3.207zm-7.816 2.463c-.485-.523-.516-1.391-.069-1.936.447-.545 1.233-.588 1.718-.065.485.523.516 1.391.069 1.936-.447.545-1.233.588-1.718.065z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Logo and Company Info */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                {/* Company Logo in Footer */}
                <img
                  src="/images/logo.png"
                  alt="泽智合工贸有限公司 Logo"
                  className="w-12 h-12 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 object-contain bg-white/10"
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
                {/* Fallback Logo in Footer */}
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-slate-700 rounded-lg shadow-lg flex items-center justify-center" style={{display: 'none'}}>
                  <span className="text-white font-bold">泽智</span>
                </div>
                <div>
                  <p className="text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {i18n.language === 'en' ? 'Zézhìhé Trading Co., Ltd.' : '泽智合工贸有限公司'}
                  </p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                {i18n.language === 'en'
                  ? '© 2024 Zézhìhé Trading Co., Ltd. All rights reserved.'
                  : '© 2024 泽智合工贸有限公司 保留所有权利'
                }
              </p>
            </div>

            {/* Contact Info */}
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-4">{i18n.language === 'en' ? 'Contact' : '联系方式'}</h4>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>📧 zezhihe@yeah.net</p>
                <p>📞 +86 183 5799 1657</p>
                <p>📍 {i18n.language === 'en' ? 'Yongkang, Zhejiang, China' : '中国·浙江永康'}</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-right">
              <h4 className="text-lg font-semibold mb-4">{i18n.language === 'en' ? 'Quick Links' : '快速链接'}</h4>
              <div className="space-y-2">
                <a href="#services" className="text-gray-400 hover:text-white text-sm transition-colors block">
                  {i18n.language === 'en' ? 'Our Services' : '我们的服务'}
                </a>
                <a href="#knowledge" className="text-gray-400 hover:text-white text-sm transition-colors block">
                  {i18n.language === 'en' ? 'Knowledge Center' : '知识中心'}
                </a>
                <button
                  onClick={scrollToContact}
                  className="text-gray-400 hover:text-white text-sm transition-colors block text-left"
                  style={{ background: 'none', border: 'none', padding: '0', textAlign: 'left' }}
                >
                  {i18n.language === 'en' ? 'Contact Us' : '联系我们'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}