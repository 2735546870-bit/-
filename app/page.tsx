'use client';

import { useTranslation } from 'react-i18next';
import '../lib/i18n';
import { useState, useEffect } from 'react';
// import LanguageSwitch from '../components/LanguageSwitch';

// 默认评论数据
const defaultTestimonials = [
  {
    id: 1,
    name: "张总",
    company: "华建装饰",
    content: "产品质量非常好，安装方便，客户反馈都很满意。售后服务也很到位，值得信赖的合作伙伴。",
    rating: 5,
    image: "/images/testimonials/client1.jpg"
  },
  {
    id: 2,
    name: "李经理",
    company: "精工装修",
    content: "与泽智合合作多年，产品品质稳定，交期准时，是我们在地漏产品的首选供应商。",
    rating: 5,
    image: "/images/testimonials/client2.jpg"
  },
  {
    id: 3,
    name: "王工",
    company: "设计工作室",
    content: "设计新颖，质感出众，为我们的高端项目增色不少。专业团队，服务周到。",
    rating: 5,
    image: "/images/testimonials/client3.jpg"
  }
];

// 默认公司图片数据
const defaultCompanyImages = [
  {
    id: 1,
    title: "现代化工厂车间",
    description: "先进的数控生产线，确保产品质量的稳定性和一致性",
    image: "/images/company/factory.jpg"
  },
  {
    id: 2,
    title: "研发实验室",
    description: "专业的研发团队，持续创新，为客户提供更优质的产品解决方案",
    image: "/images/company/lab.jpg"
  },
  {
    id: 3,
    title: "质检中心",
    description: "严格的质量控制流程，每一件产品都经过多重检测",
    image: "/images/company/quality.jpg"
  },
  {
    id: 4,
    title: "仓储物流",
    description: "智能仓储系统，快速响应，确保及时交付",
    image: "/images/company/warehouse.jpg"
  }
];

// 默认客户互动图片数据
const defaultInteractiveImages = [
  {
    id: 1,
    title: "Luxury Villa Project",
    description: "Custom stainless steel odorless floor drain series for high-end villa, perfectly integrating with modern decor style",
    image: "/images/interactive/project1.jpg"
  },
  {
    id: 2,
    title: "Commercial Complex",
    description: "Large-scale commercial plaza drainage system solution with strong processing capacity and low maintenance cost",
    image: "/images/interactive/project2.jpg"
  },
  {
    id: 3,
    title: "Star Hotel",
    description: "Five-star hotel bathroom renovation and upgrade, enhancing customer experience and hygiene standards",
    image: "/images/interactive/project3.jpg"
  }
];

// 默认证书数据
const defaultCertificates = [
  {
    id: 1,
    name: "ISO9001质量管理体系认证",
    image: "/images/certificates/iso9001.jpg",
    description: "国际标准化组织质量管理体系认证"
  },
  {
    id: 2,
    name: "CE认证",
    image: "/images/certificates/ce.jpg",
    description: "欧盟安全认证"
  },
  {
    id: 3,
    name: "国家专利证书",
    image: "/images/certificates/patent.jpg",
    description: "多项产品外观和实用新型专利"
  }
];

export default function Home() {
  const { i18n } = useTranslation('translation');
  const [mounted, setMounted] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeCompanySlide, setActiveCompanySlide] = useState(0);
  const [activeInteractiveSlide, setActiveInteractiveSlide] = useState(0);

  // 动态数据状态
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [companyImages, setCompanyImages] = useState(defaultCompanyImages);
  const [interactiveImages, setInteractiveImages] = useState(defaultInteractiveImages);
  const [certificates, setCertificates] = useState(defaultCertificates);

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

  // 评论轮播控制
  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // 公司图片轮播控制
  const nextCompanySlide = () => {
    setActiveCompanySlide((prev) => (prev + 1) % companyImages.length);
  };

  const prevCompanySlide = () => {
    setActiveCompanySlide((prev) => (prev - 1 + companyImages.length) % companyImages.length);
  };

  // 客户互动轮播控制
  const nextInteractiveSlide = () => {
    setActiveInteractiveSlide((prev) => (prev + 1) % interactiveImages.length);
  };

  const prevInteractiveSlide = () => {
    setActiveInteractiveSlide((prev) => (prev - 1 + interactiveImages.length) % interactiveImages.length);
  };

  // 自动轮播
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
      nextCompanySlide();
      nextInteractiveSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 加载动态数据
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 加载客户评论
      const savedTestimonials = localStorage.getItem('testimonials');
      if (savedTestimonials) {
        try {
          setTestimonials(JSON.parse(savedTestimonials));
        } catch (error) {
          console.error('Failed to load testimonials:', error);
        }
      }

      // 加载公司图片
      const savedCompanyImages = localStorage.getItem('companyImages');
      if (savedCompanyImages) {
        try {
          const parsed = JSON.parse(savedCompanyImages);
          setCompanyImages(parsed.map((item: any) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            image: item.url
          })));
        } catch (error) {
          console.error('Failed to load company images:', error);
        }
      }

      // 加载互动内容
      const savedInteractiveContent = localStorage.getItem('interactiveContent');
      if (savedInteractiveContent) {
        try {
          const parsed = JSON.parse(savedInteractiveContent);
          setInteractiveImages(parsed.map((item: any) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            image: item.url
          })));
        } catch (error) {
          console.error('Failed to load interactive content:', error);
        }
      }

      // 加载证书
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
          console.error('Failed to load certificates:', error);
        }
      }

      // 监听localStorage变化
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'testimonials' && e.newValue) {
          try {
            setTestimonials(JSON.parse(e.newValue));
          } catch (error) {
            console.error('Failed to parse testimonials from storage event:', error);
          }
        }
        if (e.key === 'companyImages' && e.newValue) {
          try {
            const parsed = JSON.parse(e.newValue);
            setCompanyImages(parsed.map((item: any) => ({
              id: item.id,
              title: item.title,
              description: item.description,
              image: item.url
            })));
          } catch (error) {
            console.error('Failed to parse company images from storage event:', error);
          }
        }
        if (e.key === 'interactiveContent' && e.newValue) {
          try {
            const parsed = JSON.parse(e.newValue);
            setInteractiveImages(parsed.map((item: any) => ({
              id: item.id,
              title: item.title,
              description: item.description,
              image: item.url
            })));
          } catch (error) {
            console.error('Failed to parse interactive content from storage event:', error);
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
            console.error('Failed to parse certificates from storage event:', error);
          }
        }
      };

      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Check which sections are visible
      const sections = ['hero', 'testimonials', 'certificates', 'interactive', 'company', 'about', 'services', 'knowledge', 'contact'];
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
                Home
              </a>
              <a href="#about" className="text-gray-700 hover:text-slate-600 font-medium transition-colors">
                About
              </a>
              <a href="#services" className="text-gray-700 hover:text-slate-600 font-medium transition-colors">
                Services
              </a>
              <a href="#knowledge" className="text-gray-700 hover:text-slate-600 font-medium transition-colors">
                Knowledge Center
              </a>
              <a href="#contact" className="text-gray-700 hover:text-slate-600 font-medium transition-colors">
                Contact
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
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#f9f8f5' }}>
        {/* Animated background with gradient bubbles */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-100/20 to-purple-100/20 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-gray-100/20 to-amber-100/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-stone-100/20 to-slate-200/20 rounded-full filter blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ${visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Artistic Title with Character Animation */}
            <div className="mb-8">
              <h1
                className="relative inline-block"
                style={{
                  fontFamily: '"Times New Roman", serif',
                  color: '#12110f',
                  background: 'linear-gradient(135deg, #12110f 0%, #3d3c3a 50%, #12110f 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: '#12110f',
                  backgroundClip: 'text',
                  fontSize: 'clamp(3rem, 8vw, 6rem)',
                  fontWeight: '900',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  position: 'relative',
                  display: 'inline-block'
                }}
              >
                {/* 3D Shadow Effect */}
                <span className="absolute inset-0 blur-xl opacity-30" style={{ background: 'linear-gradient(135deg, #12110f 0%, #aeadaa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', transform: 'translateY(4px)', zIndex: -1 }}></span>
                {/* Main Title with Character Animation */}
                <span className="relative">
                  {'ZÉZHÌHÉ'.split('').map((char, index) => (
                    <span
                      key={index}
                      className={`inline-block transition-all duration-500 ${visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                      style={{
                        transitionDelay: `${index * 100}ms`
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              </h1>

              {/* Decorative Underline */}
              <div className="relative w-64 h-1 mx-auto mt-6 overflow-hidden rounded-full" style={{ backgroundColor: '#12110f' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
              </div>
            </div>

            {/* Subtitle with Staggered Animation */}
            <h2
              className={`text-4xl md:text-5xl font-light mb-6 transition-all duration-1000 delay-300 ${visibleSections.has('hero') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
              style={{
                color: '#12110f',
                fontFamily: '"Georgia", serif',
                fontStyle: 'italic'
              }}
            >
              {(i18n.language === 'en' ? 'TRADING CO., LTD.' : '泽智合工贸有限公司').split('').map((char, index) => (
                <span
                  key={index}
                  className={`inline-block transition-all duration-500 ${visibleSections.has('hero') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                  style={{
                    transitionDelay: `${300 + index * 50}ms`
                  }}
                >
                  {char}
                </span>
              ))}
            </h2>

            {/* Tagline with Typewriter Effect */}
            <p
              className={`text-xl md:text-2xl mb-16 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${visibleSections.has('hero') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
              style={{
                color: '#aeadaa',
                fontFamily: '"Helvetica Neue", sans-serif'
              }}
            >
              <span className="inline-block">
                {'Premium Floor Drain Solutions'.split('').map((char, index) => (
                  <span
                    key={index}
                    className={`inline-block transition-all duration-500 ${visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{
                      color: '#12110f',
                      fontWeight: '600',
                      transitionDelay: `${500 + index * 30}ms`
                    }}
                  >
                    {char}
                  </span>
                ))}
                <span className="block mt-2">
                  {'• Quality Manufacturing • Professional Service'.split('').map((char, index) => (
                    <span
                      key={index}
                      className={`inline-block transition-all duration-300 ${visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                      style={{
                        transitionDelay: `${700 + index * 20}ms`
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              </span>
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-700">
              <button
                onClick={() => window.location.href = '/products'}
                className="group relative px-8 py-4 text-lg font-semibold text-white rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105"
                style={{
                  backgroundColor: '#12110f',
                  boxShadow: '0 4px 20px rgba(18, 17, 15, 0.3)'
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Explore Products
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button
                onClick={scrollToContact}
                className="group relative px-8 py-4 text-lg font-semibold rounded-xl overflow-hidden border-2 transition-all duration-300 transform hover:scale-105"
                style={{
                  borderColor: '#12110f',
                  color: '#12110f'
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Us
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-amber-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section id="testimonials" className={`py-24 px-4 bg-white transition-all duration-1000 ${visibleSections.has('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-5xl md:text-6xl font-bold mb-4 animate-title"
              style={{
                fontFamily: '"Georgia", serif',
                color: '#12110f',
                background: 'linear-gradient(135deg, #12110f 0%, #3d3c3a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: '#12110f',
                backgroundClip: 'text'
              }}
            >
              {(i18n.language === 'en' ? 'Client Testimonials' : '客户评价').split('').map((char, index) => (
                <span
                  key={index}
                  className={`inline-block transition-all duration-500 ${visibleSections.has('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{
                    transitionDelay: visibleSections.has('testimonials') ? `${index * 50}ms` : '0ms'
                  }}
                >
                  {char}
                </span>
              ))}
            </h2>
            <div className="w-32 h-1 mx-auto rounded-full mb-8" style={{ backgroundColor: '#12110f' }}></div>
            <p className="text-xl" style={{ color: '#aeadaa' }}>
              {(i18n.language === 'en' ? 'What our clients say about us' : '听听客户的声音').split('').map((char, index) => (
                <span
                  key={index}
                  className={`inline-block transition-all duration-300 ${visibleSections.has('testimonials') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'}`}
                  style={{
                    transitionDelay: visibleSections.has('testimonials') ? `${800 + index * 30}ms` : '0ms'
                  }}
                >
                  {char}
                </span>
              ))}
            </p>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative max-w-6xl mx-auto">
            {/* Arrow Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              style={{
                backgroundColor: '#f9f8f5',
                border: '2px solid #12110f'
              }}
            >
              <svg className="w-6 h-6" style={{ color: '#12110f' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              style={{
                backgroundColor: '#f9f8f5',
                border: '2px solid #12110f'
              }}
            >
              <svg className="w-6 h-6" style={{ color: '#12110f' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Testimonial Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`p-8 rounded-xl shadow-lg transition-all duration-500 ${
                    index === activeTestimonial
                      ? 'ring-4 ring-opacity-30 scale-105 z-10'
                      : 'scale-95 opacity-60'
                  }`}
                  style={{
                    backgroundColor: '#f9f8f5',
                    ringColor: index === activeTestimonial ? '#12110f' : 'transparent'
                  }}
                >
                  {/* Quote Icon */}
                  <div className="text-4xl mb-4" style={{ color: '#aeadaa' }}>❝</div>

                  {/* Rating */}
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" style={{ color: '#fbbf24' }} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921.921 1.603.921 1.902 0l1.07-3.292a1 1 0 00.364-1.118L2.98 8.72c-.583-.57-.583-1.91.588-2.31l1.07-3.292a1 1 0 00-.95-.69H1.535c-.969 0-1.371 1.24-.588 1.81l2.8 2.034c.584.574.584 1.91 0 2.31z" />
                      </svg>
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-gray-700 mb-6 italic" style={{ color: '#aeadaa' }}>
                    "{testimonial.content}"
                  </p>

                  {/* Client Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLDivElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full flex items-center justify-center bg-gray-300" style={{ display: 'none' }}>
                        <svg className="w-8 h-8" style={{ color: '#9CA3AF' }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3a7 7 0 01-7 7z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg" style={{ color: '#12110f' }}>{testimonial.name}</p>
                      <p className="text-sm" style={{ color: '#aeadaa' }}>{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeTestimonial
                      ? 'w-8 opacity-100'
                      : 'opacity-30'
                  }`}
                  style={{
                    backgroundColor: index === activeTestimonial ? '#12110f' : '#aeadaa'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-24 transition-all duration-1000 ${visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#12110f', fontFamily: '"Georgia", serif' }}>
                {(i18n.language === 'en' ? 'About Zézhìhé Trading' : '关于泽智合工贸').split('').map((char, index) => (
                  <span
                    key={index}
                    className={`inline-block transition-all duration-500 ${visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{
                      transitionDelay: visibleSections.has('about') ? `${index * 30}ms` : '0ms'
                    }}
                  >
                    {char}
                  </span>
                ))}
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {(i18n.language === 'en'
                  ? 'We are a leading provider of premium kitchen and bathroom solutions, specializing in modern minimalist designs that combine aesthetics with functionality.'
                  : '我们是高端厨卫解决方案的领先提供商，专注于将极简主义美学与实用功能完美结合的现代设计。'
                ).split('').map((char, index) => (
                  <span
                    key={index}
                    className={`inline-block transition-all duration-300 ${visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                    style={{
                      transitionDelay: visibleSections.has('about') ? `${600 + index * 20}ms` : '0ms'
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </p>
              <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-8 rounded-2xl border border-gray-200/50">
                <h3 className="text-2xl font-semibold mb-4 text-slate-800">
                  {(i18n.language === 'en' ? 'Professional Team' : '专业团队').split('').map((char, index) => (
                    <span
                      key={index}
                      className={`inline-block transition-all duration-400 ${visibleSections.has('about') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'}`}
                      style={{
                        transitionDelay: visibleSections.has('about') ? `${1200 + index * 40}ms` : '0ms'
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {(i18n.language === 'en'
                    ? 'With years of experience in kitchen and bathroom design, our professional team brings your vision to life with precision and care.'
                    : '凭借在厨卫设计领域的多年经验，我们的专业团队以精准的工艺和细致的关怀，将您的愿景变为现实。'
                  ).split('').map((char, index) => (
                    <span
                      key={index}
                      className={`inline-block transition-all duration-300 ${visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                      style={{
                        transitionDelay: visibleSections.has('about') ? `${1400 + index * 15}ms` : '0ms'
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
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
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16" style={{ color: '#12110f', fontFamily: '"Georgia", serif' }}>
            {(i18n.language === 'en' ? 'Our Services' : '我们的服务').split('').map((char, index) => (
              <span
                key={index}
                className={`inline-block transition-all duration-500 ${visibleSections.has('services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{
                  transitionDelay: visibleSections.has('services') ? `${index * 40}ms` : '0ms'
                }}
              >
                {char}
              </span>
            ))}
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
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16" style={{ color: '#12110f', fontFamily: '"Georgia", serif' }}>
            {(i18n.language === 'en' ? 'Knowledge Center' : '知识中心').split('').map((char, index) => (
              <span
                key={index}
                className={`inline-block transition-all duration-500 ${visibleSections.has('knowledge') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{
                  transitionDelay: visibleSections.has('knowledge') ? `${index * 35}ms` : '0ms'
                }}
              >
                {char}
              </span>
            ))}
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

      {/* Company Showcase Section */}
      <section className="py-20 px-4" style={{ backgroundColor: '#f9f8f5' }}>
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-5xl font-bold text-center mb-16"
            style={{
              fontFamily: '"Times New Roman", serif',
              background: 'linear-gradient(135deg, #12110f 0%, #aeadaa 50%, #12110f 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}
          >
            {mounted ? (
              (i18n.language === 'en' ? 'Company Showcase' : '公司展示').split('').map((char, index) => (
                <span
                  key={index}
                  className={`inline-block transition-all duration-500 ${visibleSections.has('company') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{
                    transitionDelay: visibleSections.has('company') ? `${index * 30}ms` : '0ms'
                  }}
                >
                  {char}
                </span>
              ))
            ) : ''}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 opacity-0"
                style={{
                  animationDelay: `${index * 200}ms`,
                  animationFillMode: 'forwards'
                }}
                ref={(el) => {
                  if (el) {
                    setTimeout(() => {
                      el.style.opacity = '1';
                      el.style.transform = 'translateY(0)';
                    }, index * 200);
                  }
                }}
              >
                <div className="aspect-square bg-gray-100">
                  <img
                    src={image.image}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/hero-background.png';
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
                    <p className="text-sm opacity-90">{image.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-5xl font-bold text-center mb-16"
            style={{
              fontFamily: '"Times New Roman", serif',
              background: 'linear-gradient(135deg, #12110f 0%, #aeadaa 50%, #12110f 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}
          >
            {mounted ? (
              (i18n.language === 'en' ? 'Interactive Gallery' : '互动展示').split('').map((char, index) => (
                <span
                  key={index}
                  className={`inline-block transition-all duration-500 ${visibleSections.has('interactive') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{
                    transitionDelay: visibleSections.has('interactive') ? `${index * 35}ms` : '0ms'
                  }}
                >
                  {char}
                </span>
              ))
            ) : ''}
          </h2>

          <div className="relative">
            <div className="flex items-center justify-center mb-8">
              <button
                onClick={prevInteractiveSlide}
                className="p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
                style={{ backgroundColor: '#f9f8f5', color: '#12110f' }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="mx-8 text-center max-w-2xl">
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: '#12110f' }}
                >
                  {interactiveImages[activeInteractiveSlide].title}
                </h3>
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: '#aeadaa' }}
                >
                  {interactiveImages[activeInteractiveSlide].description}
                </p>
              </div>

              <button
                onClick={nextInteractiveSlide}
                className="p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
                style={{ backgroundColor: '#f9f8f5', color: '#12110f' }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              {interactiveImages.map((content, index) => (
                <div
                  key={content.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ${index === activeInteractiveSlide ? 'opacity-100' : 'opacity-0'}`}
                >
                  <img
                    src={content.image}
                    alt={content.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/hero-background.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="p-8 text-white">
                      <h4 className="text-2xl font-bold mb-2">{content.title}</h4>
                      <p className="text-lg opacity-90">{content.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-6 space-x-2">
              {interactiveImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveInteractiveSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeInteractiveSlide ? 'w-8' : ''}`}
                  style={{
                    backgroundColor: index === activeInteractiveSlide ? '#12110f' : '#aeadaa'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-24 bg-white transition-all duration-1000 ${visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16" style={{ color: '#12110f', fontFamily: '"Georgia", serif' }}>
            {'Contact Us'.split('').map((char, index) => (
              <span
                key={index}
                className={`inline-block transition-all duration-500 ${visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{
                  transitionDelay: visibleSections.has('contact') ? `${index * 40}ms` : '0ms'
                }}
              >
                {char}
              </span>
            ))}
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
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}