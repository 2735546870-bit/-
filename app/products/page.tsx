'use client';

import { useTranslation } from 'react-i18next';
import '../../lib/i18n';
import { useState, useEffect, useRef } from 'react';
import LanguageSwitch from '../../components/LanguageSwitch';

// 产品数据接口
interface Product {
  id: string;
  name: string;
  category: string;
  material: string;
  color: string;
  image: string;
  price: string;
  isNew?: boolean;
  isHot?: boolean;
}

// 默认产品数据
const defaultProducts: Product[] = [
  {
    id: 'fd-001',
    name: '304不锈钢防臭地漏',
    category: '圆形',
    material: '304不锈钢',
    color: '银色',
    image: '/images/products/stainless-odorless.jpg',
    price: '￥68',
    isHot: true
  },
  {
    id: 'fd-002',
    name: 'ABS隐形地漏',
    category: '方形',
    material: 'ABS工程塑料',
    color: '黑色',
    image: '/images/products/abs-invisible.jpg',
    price: '￥45'
  },
  {
    id: 'fd-003',
    name: '线性排水地漏',
    category: '方形',
    material: '304不锈钢',
    color: '银色',
    image: '/images/products/linear-drain.jpg',
    price: '￥158'
  },
  {
    id: 'fd-004',
    name: '镀金装饰地漏',
    category: '圆形',
    material: '铜质镀金',
    color: '金色',
    image: '/images/products/gold-plated.jpg',
    price: '￥288'
  },
  {
    id: 'fd-005',
    name: '简约方形地漏',
    category: '方形',
    material: '304不锈钢',
    color: '银色',
    image: '/images/products/stainless-odorless-5.jpg',
    price: '￥88'
  },
  {
    id: 'fd-006',
    name: '豪华圆形地漏',
    category: '圆形',
    material: '304不锈钢',
    color: '金色',
    image: '/images/products/stainless-odorless-6.jpg',
    price: '￥198'
  }
];

export default function ProductsPage() {
  const { i18n } = useTranslation('translation');
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [visibleProducts, setVisibleProducts] = useState<number>(3);

  // 从localStorage加载产品数据
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedProducts = localStorage.getItem('products');
      if (savedProducts) {
        try {
          setProducts(JSON.parse(savedProducts));
        } catch (error) {
          console.error('Failed to load products from localStorage:', error);
        }
      }
    }
  }, []);

  // 监听localStorage变化
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'products' && e.newValue) {
        try {
          setProducts(JSON.parse(e.newValue));
        } catch (error) {
          console.error('Failed to parse products from storage event:', error);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 点击卡片居中显示
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = 256 + 24; // 卡片宽度 + gap
      const containerWidth = container.clientWidth;
      const scrollPosition = index * cardWidth - (containerWidth / 2) + (cardWidth / 2);

      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  // 筛选产品
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesMaterial = selectedMaterial === 'all' || product.material === selectedMaterial;
    const matchesColor = selectedColor === 'all' || product.color === selectedColor;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesMaterial && matchesColor && matchesSearch;
  });

  // 逐渐显示效果
  useEffect(() => {
    const timer = setTimeout(() => {
      if (visibleProducts < filteredProducts.length) {
        setVisibleProducts(prev => prev + 1);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [visibleProducts, filteredProducts.length]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9f8f5' }}>
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4" style={{ backgroundColor: 'rgba(249, 248, 245, 0.95)', backdropFilter: 'blur(10px)' }}>
        <button
          onClick={() => window.location.href = '/'}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#12110f', color: '#f9f8f5' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          {mounted && (i18n.language === 'en' ? 'Home' : '主页')}
        </button>

        <LanguageSwitch />
      </div>

      {/* Hero Section with Background Image */}
      <section className="relative h-96 overflow-hidden" style={{ marginTop: '60px' }}>
        <div className="absolute inset-0">
          <img
            src="/images/hero-background.png"
            alt="场景展示"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: '#f9f8f5' }}>
              {mounted && (i18n.language === 'en' ? 'Premium Floor Drains' : '高品质地漏解决方案')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl" style={{ color: '#aeadaa' }}>
              {mounted && (i18n.language === 'en'
                ? 'Professional manufacturing for modern bathroom and kitchen spaces'
                : '专业制造商，为现代卫浴空间提供高品质地漏产品')}
            </p>
          </div>
        </div>
      </section>

      {/* Auto-scrolling Image Gallery */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#12110f' }}>
            {mounted && (i18n.language === 'en' ? 'Product Showcase' : '产品展示')}
          </h2>
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {products.map((product, index) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-64 h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
                style={{ backgroundColor: '#f9f8f5' }}
                onClick={() => handleCardClick(index)}
                title="点击居中显示"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/placeholder-product.svg';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6" style={{ backgroundColor: '#ffffff' }}>
            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                placeholder={mounted ? (i18n.language === 'en' ? 'Search products...' : '搜索产品...') : ''}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                style={{
                  borderColor: '#aeadaa',
                  backgroundColor: '#f9f8f5',
                  color: '#12110f'
                }}
              />
            </div>

            {/* Filters */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                  Shape:
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  style={{
                    borderColor: '#aeadaa',
                    backgroundColor: '#f9f8f5',
                    color: '#12110f'
                  }}
                >
                  <option value="all">All Shapes</option>
                  <option value="圆形">Round</option>
                  <option value="方形">Square</option>
                </select>
              </div>

              {/* Material Filter */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                  Material:
                </label>
                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  style={{
                    borderColor: '#aeadaa',
                    backgroundColor: '#f9f8f5',
                    color: '#12110f'
                  }}
                >
                  <option value="all">All Materials</option>
                  <option value="304不锈钢">304 Stainless Steel</option>
                  <option value="ABS工程塑料">ABS Plastic</option>
                  <option value="铜质镀金">Brass Plated</option>
                </select>
              </div>

              {/* Color Filter */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                  Color:
                </label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  style={{
                    borderColor: '#aeadaa',
                    backgroundColor: '#f9f8f5',
                    color: '#12110f'
                  }}
                >
                  <option value="all">All Colors</option>
                  <option value="银色">Silver</option>
                  <option value="黑色">Black</option>
                  <option value="金色">Gold</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.slice(0, visibleProducts).map((product, index) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-500 opacity-0 animate-fadeIn"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/placeholder-product.svg';
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3
                      className="text-lg font-semibold leading-tight"
                      style={{ color: '#12110f' }}
                    >
                      {mounted ? product.name : ''}
                    </h3>
                    {product.isHot && (
                      <span
                        className="px-2 py-1 text-xs font-semibold rounded-full"
                        style={{ backgroundColor: '#12110f', color: '#f9f8f5' }}
                      >
                        {mounted && (i18n.language === 'en' ? 'HOT' : '热销')}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 text-sm" style={{ color: '#aeadaa' }}>
                    <p>{mounted && (i18n.language === 'en' ? 'Material:' : '材质：')} {mounted ? product.material : ''}</p>
                    <p>{mounted && (i18n.language === 'en' ? 'Color:' : '颜色：')} {mounted ? product.color : ''}</p>
                    <p>{mounted && (i18n.language === 'en' ? 'Shape:' : '形状：')} {mounted ? product.category : ''}</p>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <span
                      className="text-2xl font-bold"
                      style={{ color: '#12110f' }}
                    >
                      {mounted ? product.price : ''}
                    </span>
                    <button
                      onClick={() => window.location.href = `/products/${product.id}`}
                      className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: '#12110f' }}
                    >
                      {mounted && (i18n.language === 'en' ? 'View Details' : '查看详情')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📦</div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: '#12110f' }}
              >
                {mounted && (i18n.language === 'en' ? 'No products found' : '未找到相关产品')}
              </h3>
              <p style={{ color: '#aeadaa' }}>
                {mounted && (i18n.language === 'en'
                  ? 'Try adjusting your filters or search terms'
                  : '请尝试调整筛选条件或搜索关键词'
                )}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedMaterial('all');
                  setSelectedColor('all');
                  setSearchTerm('');
                }}
                className="mt-4 px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
                style={{
                  backgroundColor: '#12110f',
                  color: '#f9f8f5'
                }}
              >
                {mounted && (i18n.language === 'en' ? 'Clear Filters' : '清除筛选')}
              </button>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}