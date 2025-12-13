'use client';

import { useTranslation } from 'react-i18next';
import '../lib/i18n';
import { useState, useEffect } from 'react';

// 客户展示图片数据
const defaultTestimonials = [
  {
    id: 1,
    image: "/images/testimonials/client1.jpg"
  },
  {
    id: 2,
    image: "/images/testimonials/client2.jpg"
  },
  {
    id: 3,
    image: "/images/testimonials/client3.jpg"
  }
];

// 公司图片数据 - 长图和短图结合
const defaultCompanyImages = [
  {
    id: 1,
    type: 'tall', // 长图
    title: "现代化工厂车间",
    description: "先进的数控生产线，确保产品质量的稳定性和一致性",
    image: "/images/company/factory.jpg"
  },
  {
    id: 2,
    type: 'wide', // 短图
    title: "研发实验室",
    description: "专业的研发团队，持续创新，为客户提供更优质的产品解决方案",
    image: "/images/company/lab.jpg"
  },
  {
    id: 3,
    type: 'tall',
    title: "质检中心",
    description: "严格的质量控制流程，每一件产品都经过多重检测",
    image: "/images/company/quality.jpg"
  },
  {
    id: 4,
    type: 'wide',
    title: "仓储物流",
    description: "智能仓储系统，快速响应，确保及时交付",
    image: "/images/company/warehouse.jpg"
  },
  {
    id: 5,
    type: 'tall',
    title: "组装车间",
    description: "精密组装工艺，确保每一个细节都符合最高标准",
    image: "/images/company/assembly.jpg"
  },
  {
    id: 6,
    type: 'wide',
    title: "包装流水线",
    description: "自动化包装系统，提供环保安全的包装解决方案",
    image: "/images/company/packaging.jpg"
  }
];

// 证书数据 - 9:16比例
const defaultCertificates = [
  {
    id: 1,
    name: "ISO9001质量管理体系认证",
    image: "/images/certificates/iso9001.jpg",
    description: "国际标准化组织质量管理体系认证，确保产品和服务质量达到国际标准。"
  },
  {
    id: 2,
    name: "CE认证",
    image: "/images/certificates/ce.jpg",
    description: "欧盟安全认证，证明产品符合欧盟的安全、健康、环保标准。"
  },
  {
    id: 3,
    name: "国家专利证书",
    image: "/images/certificates/patent.jpg",
    description: "多项产品外观和实用新型专利，彰显技术创新实力。"
  }
];

// 客户合作项目轮播数据
const defaultProjects = [
  {
    id: 1,
    title: "Luxury Villa Project",
    description: "高端别墅定制排水解决方案",
    image: "/images/interactive/project1.jpg"
  },
  {
    id: 2,
    title: "Commercial Complex",
    description: "大型商业广场排水系统",
    image: "/images/interactive/project2.jpg"
  },
  {
    id: 3,
    title: "Star Hotel Renovation",
    description: "五星级酒店卫浴升级改造",
    image: "/images/interactive/project3.jpg"
  },
  {
    id: 4,
    title: "Hospital Project",
    description: "医疗设施专用排水系统",
    image: "/images/interactive/project4.jpg"
  }
];

export default function Home() {
  const { i18n } = useTranslation('translation');
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  // 动画状态
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  // 状态管理
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [companyImages, setCompanyImages] = useState(defaultCompanyImages);
  const [certificates, setCertificates] = useState(defaultCertificates);

  // 网站主要文字内容状态 - 支持动态语言切换
  const getMainTextContent = () => ({
    heroTitle: 'ZÉZHÌHÉ',
    companyFullName: i18n.language === 'en' ? 'ZÉZHÌHÉ TRADING CO., LTD.' : '泽智合工贸有限公司',
    aboutTitle: i18n.language === 'en' ? 'About Us' : '关于我们',
    aboutDescription: i18n.language === 'en'
      ? 'We are a leading provider of premium kitchen and bathroom solutions, specializing in modern minimalist designs that combine aesthetics with functionality.'
      : '我们是高端厨卫解决方案的领先提供商，专注于将极简主义美学与实用功能完美结合的现代设计。',
    testimonialsTitle: i18n.language === 'en' ? 'Client Showcase' : '客户展示',
    certificatesTitle: i18n.language === 'en' ? 'Certifications' : '资质认证',
    certificatesSubtitle: i18n.language === 'en'
      ? 'Professional certifications and quality assurance'
      : '专业资质认证与质量保证',
    knowledgeTitle: i18n.language === 'en' ? 'Knowledge Center' : '知识中心',
    knowledgeSubtitle: i18n.language === 'en'
      ? 'Professional insights and industry expertise'
      : '专业见解与行业专业知识',
    projectsTitle: i18n.language === 'en' ? 'Client Projects' : '客户项目',
    projectsSubtitle: i18n.language === 'en'
      ? 'Successful collaborations with our valued clients'
      : '与我们尊贵客户的成功合作',
    contactTitle: i18n.language === 'en' ? 'Contact Us' : '联系我们'
  });

  const [mainTextContent, setMainTextContent] = useState(getMainTextContent());

  // 监听语言切换
  useEffect(() => {
    setMainTextContent(getMainTextContent());
  }, [i18n.language]);

  // 从localStorage加载内容
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 加载保存的主要文字内容
      const savedMainTextContent = localStorage.getItem('mainTextContent');
      if (savedMainTextContent) {
        try {
          setMainTextContent(JSON.parse(savedMainTextContent));
        } catch (error) {
          console.error('Failed to load main text content from localStorage:', error);
        }
      }

      // 加载保存的图片数据
      const savedTestimonials = localStorage.getItem('testimonials');
      if (savedTestimonials) {
        try {
          setTestimonials(JSON.parse(savedTestimonials));
        } catch (error) {
          console.error('Failed to load testimonials from localStorage:', error);
        }
      }

      const savedCompanyImages = localStorage.getItem('companyImages');
      if (savedCompanyImages) {
        try {
          const parsed = JSON.parse(savedCompanyImages);
          setCompanyImages(parsed.map((item: any) => ({
            id: item.id,
            type: item.type || 'tall',
            title: item.title,
            description: item.description,
            image: item.url
          })));
        } catch (error) {
          console.error('Failed to load company images from localStorage:', error);
        }
      }

      const savedCertificates = localStorage.getItem('certificates');
      if (savedCertificates) {
        try {
          const parsed = JSON.parse(savedCertificates);
          setCertificates(parsed.map((item: any) => ({
            id: item.id,
            name: item.name,
            image: item.image,
            description: item.description
          })));
        } catch (error) {
          console.error('Failed to load certificates from localStorage:', error);
        }
      }

      // 监听storage事件
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'mainTextContent' && e.newValue) {
          try {
            setMainTextContent(JSON.parse(e.newValue));
          } catch (error) {
            console.error('Failed to update main text content from storage event:', error);
          }
        }
        if (e.key === 'testimonials' && e.newValue) {
          try {
            setTestimonials(JSON.parse(e.newValue));
          } catch (error) {
            console.error('Failed to update testimonials from storage event:', error);
          }
        }
        if (e.key === 'companyImages' && e.newValue) {
          try {
            const parsed = JSON.parse(e.newValue);
            setCompanyImages(parsed.map((item: any) => ({
              id: item.id,
              type: item.type || 'tall',
              title: item.title,
              description: item.description,
              image: item.url
            })));
          } catch (error) {
            console.error('Failed to update company images from storage event:', error);
          }
        }
        if (e.key === 'certificates' && e.newValue) {
          try {
            const parsed = JSON.parse(e.newValue);
            setCertificates(parsed.map((item: any) => ({
              id: item.id,
              name: item.name,
              image: item.image,
              description: item.description
            })));
          } catch (error) {
            console.error('Failed to update certificates from storage event:', error);
          }
        }
      };

      window.addEventListener('storage', handleStorageChange);
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, []);

  // 滚动事件处理
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 项目轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProjectIndex((prevIndex) =>
        prevIndex === defaultProjects.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // 每4秒切换一次

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 滚动监听器
  useEffect(() => {
    const handleScroll = () => {
      // 检测各个section的可见性
      const sections = ['hero', 'about', 'testimonials', 'certificates', 'knowledge', 'company-images', 'projects', 'contact'];
      const visible = new Set<string>();

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
            visible.add(section);
          }
        }
      });

      setVisibleSections(visible);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始检查

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50">
      {/* 固定导航栏 */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-lg'
          : 'bg-white/80 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="/images/logo.png"
                  alt="泽智合工贸有限公司 Logo"
                  className="h-10 w-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 object-contain bg-white/10"
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
                {/* Logo Fallback */}
                <div className="h-10 w-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center shadow-lg" style={{ display: 'none' }}>
                  <span className="text-xs font-bold" style={{ fontFamily: '"Georgia", serif', letterSpacing: '0.1em' }}>
                    ZÉZH
                  </span>
                </div>
              </div>
              <h1 className="text-xl font-light tracking-wider" style={{ fontFamily: '"Georgia", serif', letterSpacing: '0.2em' }}>
                {mainTextContent.heroTitle}
              </h1>
            </div>

            {/* 桌面导航 */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-black transition-colors text-sm font-light tracking-wide"
              >
                {mainTextContent.aboutTitle}
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="text-gray-700 hover:text-black transition-colors text-sm font-light tracking-wide"
              >
                {mainTextContent.testimonialsTitle}
              </button>
              <button
                onClick={() => scrollToSection('certificates')}
                className="text-gray-700 hover:text-black transition-colors text-sm font-light tracking-wide"
              >
                {mainTextContent.certificatesTitle}
              </button>
              <button
                onClick={() => scrollToSection('knowledge')}
                className="text-gray-700 hover:text-black transition-colors text-sm font-light tracking-wide"
              >
                {mainTextContent.knowledgeTitle}
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="text-gray-700 hover:text-black transition-colors text-sm font-light tracking-wide"
              >
                {mainTextContent.projectsTitle}
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-black transition-colors text-sm font-light tracking-wide"
              >
                {mainTextContent.contactTitle}
              </button>
              <a
                href="/admin/products"
                className="p-2 text-gray-700 hover:text-black hover:bg-gray-50 rounded-full transition-colors group"
                title={i18n.language === 'en' ? 'Management Center' : '管理中心'}
              >
                <svg className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </a>
              <button
                onClick={toggleLanguage}
                className="px-3 py-1 border border-gray-300 rounded-full text-xs text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {i18n.language === 'en' ? 'EN' : '中文'}
              </button>
            </div>

            {/* 移动端菜单按钮 */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-black focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 移动端菜单 */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['about', 'testimonials', 'certificates', 'knowledge', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-black hover:bg-gray-50 text-sm font-light"
                >
                  {mainTextContent[`${section}Title` as keyof typeof mainTextContent] || section}
                </button>
              ))}
              <a
                href="/admin/products"
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-black hover:bg-gray-50 text-sm font-light"
              >
                {i18n.language === 'en' ? 'Management Center' : '管理中心'}
              </a>
              <button
                onClick={toggleLanguage}
                className="w-full text-left px-3 py-2 text-gray-700 hover:text-black hover:bg-gray-50 text-sm font-light"
              >
                {i18n.language === 'en' ? '中文' : 'EN'}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* 主页标题区域 - 左上角对齐 */}
      <section id="hero" className="min-h-screen flex items-start justify-start pt-32 px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-thin mb-6 text-left" style={{ fontFamily: '"Georgia", serif', letterSpacing: '0.15em' }}>
            {mainTextContent.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-600 mb-8 text-left" style={{ letterSpacing: '0.1em' }}>
            {mainTextContent.companyFullName}
          </p>
          <div className="flex space-x-6">
            <button
              onClick={() => scrollToSection('about')}
              className="px-8 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300 text-sm tracking-wide"
            >
              {i18n.language === 'en' ? 'Learn More' : '了解更多'}
            </button>
            <button
              onClick={() => window.location.href = '/admin/products'}
              className="px-8 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300 text-sm tracking-wide"
            >
              {i18n.language === 'en' ? 'Explore Products' : '探索产品'}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 bg-black text-white hover:bg-gray-800 transition-all duration-300 text-sm tracking-wide"
            >
              {i18n.language === 'en' ? 'Contact Us' : '联系我们'}
            </button>
          </div>
        </div>
      </section>

      {/* 关于我们 - 基本保持不变 */}
      <section id="about" className={`py-32 px-6 sm:px-8 lg:px-12 bg-white transition-all duration-1000 ${
        visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-thin mb-16 text-left" style={{ fontFamily: '"Georgia", serif', letterSpacing: '0.12em' }}>
            {mainTextContent.aboutTitle.split('').map((char, index) => (
              <span
                key={index}
                className={`inline-block transition-all duration-300 ${
                  visibleSections.has('about')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-4'
                }`}
                style={{
                  transitionDelay: visibleSections.has('about') ? `${index * 30}ms` : '0ms'
                }}
              >
                {char}
              </span>
            ))}
          </h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-lg md:text-xl font-light text-gray-700 leading-relaxed mb-12">
                {mainTextContent.aboutDescription}
              </p>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-light mb-2" style={{ fontFamily: '"Georgia", serif' }}>
                    {i18n.language === 'en' ? 'Quality First' : '品质第一'}
                  </h3>
                  <p className="text-gray-600 font-light">
                    {i18n.language === 'en'
                      ? 'Strict quality control ensures every product meets international standards.'
                      : '严格的质量控制确保每件产品都符合国际标准。'
                    }
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-light mb-2" style={{ fontFamily: '"Georgia", serif' }}>
                    {i18n.language === 'en' ? 'Innovation Driven' : '创新驱动'}
                  </h3>
                  <p className="text-gray-600 font-light">
                    {i18n.language === 'en'
                      ? 'Continuous research and development drives our competitive advantage.'
                      : '持续的研发创新驱动我们的竞争优势。'
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 客户评价截图 - 只展示图片 */}
      <section id="testimonials" className={`py-32 px-6 sm:px-8 lg:px-12 transition-all duration-1000 ${
        visibleSections.has('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-thin mb-16 text-left" style={{ fontFamily: '"Georgia", serif', letterSpacing: '0.12em' }}>
            {mainTextContent.testimonialsTitle.split('').map((char, index) => (
              <span
                key={index}
                className={`inline-block transition-all duration-300 ${
                  visibleSections.has('testimonials')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-4'
                }`}
                style={{
                  transitionDelay: visibleSections.has('testimonials') ? `${index * 30}ms` : '0ms'
                }}
              >
                {char}
              </span>
            ))}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="group">
                <div className={`aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 ${
                  visibleSections.has('testimonials')
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-95'
                }`}
                style={{
                  transitionDelay: visibleSections.has('testimonials') ? `${index * 100}ms` : '0ms'
                }}>
                  <img
                    src={testimonial.image}
                    alt={`Client ${testimonial.id}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = `data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='Arial' font-size='14' fill='%236b7280'%3EClient Image ${testimonial.id}%3C/text%3E%3C/svg%3E`;
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 证书展示 - 9:16比例，左侧标题和正文 */}
      <section id="certificates" className={`py-32 px-6 sm:px-8 lg:px-12 bg-white transition-all duration-1000 ${
        visibleSections.has('certificates') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-thin mb-8 text-left" style={{ fontFamily: '"Georgia", serif', letterSpacing: '0.12em' }}>
            {mainTextContent.certificatesTitle.split('').map((char, index) => (
              <span
                key={index}
                className={`inline-block transition-all duration-300 ${
                  visibleSections.has('certificates')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-4'
                }`}
                style={{
                  transitionDelay: visibleSections.has('certificates') ? `${index * 30}ms` : '0ms'
                }}
              >
                {char}
              </span>
            ))}
          </h2>
          <p className="text-lg font-light text-gray-600 mb-16 max-w-2xl">
            {mainTextContent.certificatesSubtitle}
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            {certificates.map((certificate, index) => (
              <div key={certificate.id} className={`flex flex-col transition-all duration-700 ${
                visibleSections.has('certificates')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: visibleSections.has('certificates') ? `${400 + index * 150}ms` : '0ms'
              }}>
                <div className="aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden shadow-lg mb-6">
                  <img
                    src={certificate.image}
                    alt={certificate.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = `data:image/svg+xml,%3Csvg width='450' height='800' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='450' height='800' fill='%23f9fafb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='Arial' font-size='16' fill='%236b7280'%3E${certificate.name}%3C/text%3E%3C/svg%3E`;
                    }}
                  />
                </div>
                <h3 className="text-xl font-light mb-2" style={{ fontFamily: '"Georgia", serif' }}>
                  {certificate.name}
                </h3>
                <p className="text-gray-600 font-light text-sm leading-relaxed">
                  {certificate.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 知识中心 - 基本不变 */}
      <section id="knowledge" className="py-32 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-thin mb-8 text-left" style={{ fontFamily: '"Georgia", serif', letterSpacing: '0.12em' }}>
            {mainTextContent.knowledgeTitle}
          </h2>
          <p className="text-lg font-light text-gray-600 mb-16 max-w-2xl">
            {mainTextContent.knowledgeSubtitle}
          </p>

          {/* SEO内容预留空间 */}
          <div className="prose prose-lg max-w-none mb-16">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-light mb-4">
                {i18n.language === 'en' ? 'Expert Insights & Resources' : '专业见解与资源'}
              </h3>
              <p className="text-gray-600 font-light leading-relaxed">
                {i18n.language === 'en'
                  ? 'Access our comprehensive collection of industry insights, installation guides, and technical specifications. Stay updated with the latest trends in kitchen and bathroom design, drainage solutions, and innovative materials that are transforming the industry.'
                  : '访问我们全面的行业见解、安装指南和技术规格库。及时了解厨卫设计、排水解决方案和创新材料的最新趋势，这些正在改变整个行业。'
                }
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-500">
              <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600 mb-6 rounded"></div>
              <h3 className="text-xl font-light mb-3">
                {i18n.language === 'en' ? 'Installation Guides' : '安装指南'}
              </h3>
              <p className="text-gray-600 font-light text-sm leading-relaxed">
                {i18n.language === 'en'
                  ? 'Step-by-step installation instructions for all our products.'
                  : '我们所有产品的分步安装说明。'
                }
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-500">
              <div className="h-2 bg-gradient-to-r from-green-400 to-green-600 mb-6 rounded"></div>
              <h3 className="text-xl font-light mb-3">
                {i18n.language === 'en' ? 'Technical Specs' : '技术规格'}
              </h3>
              <p className="text-gray-600 font-light text-sm leading-relaxed">
                {i18n.language === 'en'
                  ? 'Detailed technical specifications and performance data.'
                  : '详细的技术规格和性能数据。'
                }
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-500">
              <div className="h-2 bg-gradient-to-r from-purple-400 to-purple-600 mb-6 rounded"></div>
              <h3 className="text-xl font-light mb-3">
                {i18n.language === 'en' ? 'Design Trends' : '设计趋势'}
              </h3>
              <p className="text-gray-600 font-light text-sm leading-relaxed">
                {i18n.language === 'en'
                  ? 'Latest trends in kitchen and bathroom design.'
                  : '厨房和浴室设计的最新趋势。'
                }
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <button
              onClick={() => window.location.href = '/knowledge'}
              className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white hover:bg-gray-800 transition-all duration-300 text-sm tracking-wide"
            >
              {i18n.language === 'en' ? 'Explore Knowledge Center' : '探索知识中心'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* 公司图 - 长图和短图结合 */}
      <section id="company-images" className="py-32 px-6 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-thin mb-16 text-left" style={{ fontFamily: '"Georgia", serif', letterSpacing: '0.12em' }}>
            {i18n.language === 'en' ? 'Our Facilities' : '我们的设施'}
          </h2>

          {/* 使用3x2网格布局，更整齐 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyImages.map((image) => (
              <div key={image.id} className="group">
                <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 relative">
                  <img
                    src={image.image}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.src = `data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='Arial' font-size='14' fill='%236b7280'%3E${image.title}%3C/text%3E%3C/svg%3E`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-lg font-light mb-1">{image.title}</h3>
                      <p className="text-sm opacity-90 line-clamp-2">{image.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 客户项目轮播 */}
      <section id="projects" className="py-32 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-thin mb-8 text-left" style={{ fontFamily: '"Georgia", serif', letterSpacing: '0.12em' }}>
            {mainTextContent.projectsTitle}
          </h2>
          <p className="text-lg font-light text-gray-600 mb-16 max-w-2xl">
            {mainTextContent.projectsSubtitle}
          </p>

          <div className="relative">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-2xl">
              <img
                src={defaultProjects[currentProjectIndex].image}
                alt={defaultProjects[currentProjectIndex].title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `data:image/svg+xml,%3Csvg width='1200' height='675' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1200' height='675' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='Arial' font-size='18' fill='%236b7280'%3E${defaultProjects[currentProjectIndex].title}%3C/text%3E%3C/svg%3E`;
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                <h3 className="text-2xl font-light text-white mb-2">
                  {defaultProjects[currentProjectIndex].title}
                </h3>
                <p className="text-white/80 font-light">
                  {defaultProjects[currentProjectIndex].description}
                </p>
              </div>
            </div>

            {/* 轮播指示器 */}
            <div className="flex justify-center mt-6 space-x-2">
              {defaultProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProjectIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentProjectIndex
                      ? 'bg-black w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 联系我们 + 版权信息 */}
      <section id="contact" className="py-32 px-6 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-thin mb-16 text-left" style={{ fontFamily: '"Georgia", serif', letterSpacing: '0.12em' }}>
            {mainTextContent.contactTitle}
          </h2>

          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-light mb-2">
                    {i18n.language === 'en' ? 'Email' : '邮箱'}
                  </h3>
                  <p className="text-gray-600 font-light">zezhihe@yeah.net</p>
                </div>
                <div>
                  <h3 className="text-xl font-light mb-2">
                    {i18n.language === 'en' ? 'Phone' : '电话'}
                  </h3>
                  <p className="text-gray-600 font-light">+86 183 5799 1657</p>
                </div>
                <div>
                  <h3 className="text-xl font-light mb-2">
                    {i18n.language === 'en' ? 'Address' : '地址'}
                  </h3>
                  <p className="text-gray-600 font-light">
                    {i18n.language === 'en'
                      ? 'Yongkang City, Zhejiang Province, China'
                      : '中国浙江省永康市'
                    }
                  </p>
                </div>
              </div>
            </div>

            <div>
              <form className="space-y-6">
                <input
                  type="text"
                  placeholder={i18n.language === 'en' ? 'Your Name' : '您的姓名'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors bg-white"
                />
                <input
                  type="email"
                  placeholder={i18n.language === 'en' ? 'Your Email' : '您的邮箱'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors bg-white"
                />
                <textarea
                  placeholder={i18n.language === 'en' ? 'Your Message' : '您的留言'}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors bg-white resize-none"
                />
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors rounded-lg text-sm tracking-wide"
                >
                  {i18n.language === 'en' ? 'Send Message' : '发送消息'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Copyright, Privacy Policy, Sitemap */}
      <footer className="bg-black text-white py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <img
                    src="/images/logo.png"
                    alt="泽智合工贸有限公司 Logo"
                    className="h-12 w-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 object-contain bg-white/10"
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
                  {/* Logo Fallback */}
                  <div className="h-12 w-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center shadow-lg" style={{ display: 'none' }}>
                    <span className="text-sm font-bold" style={{ fontFamily: '"Georgia", serif', letterSpacing: '0.1em' }}>
                      ZÉZH
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-light" style={{ fontFamily: '"Georgia", serif', letterSpacing: '0.1em' }}>
                  {mainTextContent.heroTitle}
                </h3>
              </div>
              <p className="text-gray-400 font-light mb-6 max-w-md">
                {mainTextContent.companyFullName}
              </p>
              <p className="text-gray-500 text-sm font-light">
                {i18n.language === 'en'
                  ? 'Premium kitchen and bathroom solutions provider.'
                  : '专业高端厨卫解决方案提供商。'
                }
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-light mb-4">
                {i18n.language === 'en' ? 'Quick Links' : '快速链接'}
              </h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('about')} className="block text-gray-400 hover:text-white text-sm font-light transition-colors text-left">
                  {mainTextContent.aboutTitle}
                </button>
                <button onClick={() => scrollToSection('certificates')} className="block text-gray-400 hover:text-white text-sm font-light transition-colors text-left">
                  {mainTextContent.certificatesTitle}
                </button>
                <button onClick={() => scrollToSection('knowledge')} className="block text-gray-400 hover:text-white text-sm font-light transition-colors text-left">
                  {mainTextContent.knowledgeTitle}
                </button>
                <button onClick={() => scrollToSection('projects')} className="block text-gray-400 hover:text-white text-sm font-light transition-colors text-left">
                  {mainTextContent.projectsTitle}
                </button>
                <a href="/admin/products" className="block text-gray-400 hover:text-white text-sm font-light transition-colors text-left">
                  {i18n.language === 'en' ? 'Management Center' : '管理中心'}
                </a>
              </div>
            </div>

            {/* Legal & Other */}
            <div>
              <h4 className="text-lg font-light mb-4">
                {i18n.language === 'en' ? 'Legal' : '法律信息'}
              </h4>
              <div className="space-y-2">
                <a href="/privacy" className="block text-gray-400 hover:text-white text-sm font-light transition-colors text-left">
                  {i18n.language === 'en' ? 'Privacy Policy' : '隐私政策'}
                </a>
                <a href="/terms" className="block text-gray-400 hover:text-white text-sm font-light transition-colors text-left">
                  {i18n.language === 'en' ? 'Terms of Service' : '服务条款'}
                </a>
                <a href="/sitemap" className="block text-gray-400 hover:text-white text-sm font-light transition-colors text-left">
                  {i18n.language === 'en' ? 'Sitemap' : '网站地图'}
                </a>
                <a href="/cookies" className="block text-gray-400 hover:text-white text-sm font-light transition-colors text-left">
                  {i18n.language === 'en' ? 'Cookie Policy' : 'Cookie政策'}
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm font-light mb-4 md:mb-0">
                © {new Date().getFullYear()} {mainTextContent.companyFullName}.
                {i18n.language === 'en' ? ' All rights reserved.' : ' 版权所有。'}
              </p>
              <div className="flex space-x-6">
                <button className="text-gray-400 hover:text-white text-sm font-light transition-colors">
                  {i18n.language === 'en' ? 'Language' : '语言'}: {i18n.language === 'en' ? 'EN' : '中文'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}