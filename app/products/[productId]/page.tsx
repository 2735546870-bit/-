'use client';

import { useTranslation } from 'react-i18next';
import '../../../lib/i18n';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

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
  description?: string;
  features?: string[];
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
    isHot: true,
    description: '采用优质304不锈钢材质，具有防臭、防虫、防返水等多种功能，适用于卫生间、厨房等多种场景。',
    features: ['防臭设计', '防虫功能', '防返水', '304不锈钢材质', '易清洁']
  },
  {
    id: 'fd-002',
    name: 'ABS隐形地漏',
    category: '方形',
    material: 'ABS工程塑料',
    color: '黑色',
    image: '/images/products/abs-invisible.jpg',
    price: '￥45',
    description: '创新隐形设计，美观大方。采用高强度ABS工程塑料，耐用性强，安装简便。',
    features: ['隐形设计', 'ABS工程塑料', '安装简便', '耐腐蚀', '承重能力强']
  },
  {
    id: 'fd-003',
    name: '线性排水地漏',
    category: '方形',
    material: '304不锈钢',
    color: '银色',
    image: '/images/products/linear-drain.jpg',
    price: '￥158',
    description: '现代线性设计，排水效率高。适合大面积排水需求，如淋浴房、卫生间等。',
    features: ['线性设计', '排水效率高', '304不锈钢', '现代美观', '大面积适用']
  },
  {
    id: 'fd-004',
    name: '镀金装饰地漏',
    category: '圆形',
    material: '铜质镀金',
    color: '金色',
    image: '/images/products/gold-plated.jpg',
    price: '￥288',
    description: '豪华镀金装饰，彰显品质生活。铜质基材镀金工艺，防腐蚀，使用寿命长。',
    features: ['镀金装饰', '铜质基材', '防腐蚀', '豪华设计', '使用寿命长']
  },
  {
    id: 'fd-005',
    name: '简约方形地漏',
    category: '方形',
    material: '304不锈钢',
    color: '银色',
    image: '/images/products/stainless-odorless-5.jpg',
    price: '￥88',
    description: '简约方形设计，适合各种装修风格。304不锈钢材质，经久耐用。',
    features: ['简约设计', '方形外观', '304不锈钢', '通用性强', '经久耐用']
  },
  {
    id: 'fd-006',
    name: '豪华圆形地漏',
    category: '圆形',
    material: '304不锈钢',
    color: '金色',
    image: '/images/products/stainless-odorless-6.jpg',
    price: '￥198',
    description: '豪华圆形设计，尊贵典雅。表面经过特殊处理，不易留下水渍和指纹。',
    features: ['豪华设计', '圆形外观', '特殊表面处理', '抗水渍', '抗指纹']
  }
];

export default function ProductDetailPage() {
  const { i18n } = useTranslation('translation');
  const params = useParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [showContactModal, setShowContactModal] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);

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

  useEffect(() => {
    setMounted(true);
    const productId = params.productId as string;
    const foundProduct = products.find(p => p.id === productId);

    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(foundProduct.image);
    } else {
      // 如果产品不存在，重定向到产品列表
      router.push('/products');
    }
  }, [params.productId, router, products]);

  if (!mounted || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f9f8f5' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#12110f' }}></div>
          <p style={{ color: '#aeadaa' }}>加载中...</p>
        </div>
      </div>
    );
  }

  const relatedProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9f8f5' }}>
      {/* 顶部导航栏 */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4" style={{ backgroundColor: 'rgba(249, 248, 245, 0.95)', backdropFilter: 'blur(10px)' }}>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#12110f', color: '#f9f8f5' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {mounted && (i18n.language === 'en' ? 'Back to Products' : '返回产品列表')}
        </button>

        {/* <LanguageSwitch /> */}
      </div>

      {/* 产品详情 */}
      <div className="container mx-auto px-4 py-8" style={{ paddingTop: '100px' }}>
        <div className="grid md:grid-cols-2 gap-12">
          {/* 产品图片 */}
          <div>
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-lg mb-6">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/placeholder-product.svg';
                }}
              />
            </div>

            {/* 缩略图 */}
            <div className="grid grid-cols-4 gap-4">
              {[product.image].map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === img ? 'opacity-100 scale-105' : 'opacity-70 hover:opacity-90'
                  }`}
                  style={{ borderColor: selectedImage === img ? '#12110f' : 'transparent' }}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* 产品信息 */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8" style={{ backgroundColor: '#ffffff' }}>
              {/* 热销标签 */}
              <div className="flex items-center gap-3 mb-4">
                {product.isHot && (
                  <span
                    className="px-3 py-1 text-sm font-semibold rounded-full"
                    style={{ backgroundColor: '#12110f', color: '#f9f8f5' }}
                  >
                    {mounted && (i18n.language === 'en' ? 'HOT' : '热销')}
                  </span>
                )}
                <span
                  className="px-3 py-1 text-sm rounded-full"
                  style={{ backgroundColor: '#f9f8f5', color: '#12110f' }}
                >
                  {mounted ? product.category : ''}
                </span>
              </div>

              <h1 className="text-3xl font-bold mb-4" style={{ color: '#12110f' }}>
                {mounted ? product.name : ''}
              </h1>

              <div className="text-3xl font-bold mb-6" style={{ color: '#12110f' }}>
                {mounted ? product.price : ''}
              </div>

              {/* 产品基本信息 */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between py-2 border-b" style={{ borderColor: '#aeadaa' }}>
                  <span style={{ color: '#aeadaa' }}>{mounted && (i18n.language === 'en' ? 'Material:' : '材质：')}</span>
                  <span style={{ color: '#12110f' }}>{mounted ? product.material : ''}</span>
                </div>
                <div className="flex justify-between py-2 border-b" style={{ borderColor: '#aeadaa' }}>
                  <span style={{ color: '#aeadaa' }}>{mounted && (i18n.language === 'en' ? 'Color:' : '颜色：')}</span>
                  <span style={{ color: '#12110f' }}>{mounted ? product.color : ''}</span>
                </div>
                <div className="flex justify-between py-2 border-b" style={{ borderColor: '#aeadaa' }}>
                  <span style={{ color: '#aeadaa' }}>{mounted && (i18n.language === 'en' ? 'Shape:' : '形状：')}</span>
                  <span style={{ color: '#12110f' }}>{mounted ? product.category : ''}</span>
                </div>
              </div>

              {/* 产品描述 */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#12110f' }}>
                  {mounted && (i18n.language === 'en' ? 'Product Description' : '产品描述')}
                </h3>
                <p style={{ color: '#aeadaa', lineHeight: '1.6' }}>
                  {mounted ? product.description : ''}
                </p>
              </div>

              {/* 产品特点 */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#12110f' }}>
                  {mounted && (i18n.language === 'en' ? 'Product Features' : '产品特点')}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.features?.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <svg className="w-5 h-5 flex-shrink-0" style={{ color: '#12110f' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span style={{ color: '#aeadaa' }}>{mounted ? feature : ''}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-4">
                <button
                  onClick={() => setShowContactModal(true)}
                  className="flex-1 py-3 text-white rounded-lg hover:opacity-90 transition-opacity font-semibold"
                  style={{ backgroundColor: '#12110f' }}
                >
                  {mounted && (i18n.language === 'en' ? 'Contact Supplier' : '联系供应商')}
                </button>
                <button
                  onClick={() => setShowInquiryModal(true)}
                  className="flex-1 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold border-2"
                  style={{ borderColor: '#12110f', color: '#12110f', backgroundColor: 'transparent' }}
                >
                  {mounted && (i18n.language === 'en' ? 'Add to Inquiry' : '添加询价')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 相关产品 */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: '#12110f' }}>
              {mounted && (i18n.language === 'en' ? 'Related Products' : '相关产品')}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2" style={{ color: '#12110f' }}>
                      {mounted ? relatedProduct.name : ''}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold" style={{ color: '#12110f' }}>
                        {mounted ? relatedProduct.price : ''}
                      </span>
                      <button
                        onClick={() => router.push(`/products/${relatedProduct.id}`)}
                        className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity text-sm"
                        style={{ backgroundColor: '#12110f' }}
                      >
                        {mounted && (i18n.language === 'en' ? 'View' : '查看')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 联系供应商弹窗 */}
        {showContactModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold" style={{ color: '#12110f' }}>
                    {mounted && (i18n.language === 'en' ? 'Contact Supplier' : '联系供应商')}
                  </h2>
                  <button
                    onClick={() => setShowContactModal(false)}
                    className="p-2 rounded-lg hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#f9f8f5', color: '#12110f' }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4" style={{ color: '#12110f' }}>
                      {mounted && (i18n.language === 'en' ? 'Contact Information' : '联系方式')}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 mt-1" style={{ color: '#12110f' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <div>
                          <p className="font-medium" style={{ color: '#12110f' }}>Tel:</p>
                          <p style={{ color: '#aeadaa' }}>+86 183 5799 1657</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 mt-1" style={{ color: '#12110f' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <p className="font-medium" style={{ color: '#12110f' }}>Email:</p>
                          <p style={{ color: '#aeadaa' }}>zezhihe@yeah.net</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 mt-1" style={{ color: '#12110f' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div>
                          <p className="font-medium" style={{ color: '#12110f' }}>
                            {mounted && (i18n.language === 'en' ? 'Factory:' : '工厂地址：')}
                          </p>
                          <p style={{ color: '#aeadaa' }} className="text-sm leading-relaxed">
                            No.11, Chaoyang East Road, Wangnanshan Industrial Zone, Gushan Town, Yongkang, Zhejiang
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4" style={{ color: '#12110f' }}>
                      {mounted && (i18n.language === 'en' ? 'WeChat QR Code' : '微信二维码')}
                    </h3>
                    <div className="text-center">
                      <div className="inline-block p-4 bg-white rounded-lg shadow-md mb-4">
                        <img
                          src="/images/wechat-qr.png"
                          alt="微信二维码"
                          className="w-48 h-48 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const placeholder = target.nextElementSibling as HTMLDivElement;
                            if (placeholder) placeholder.style.display = 'block';
                          }}
                        />
                        <div className="w-48 h-48 flex items-center justify-center" style={{ display: 'none', backgroundColor: '#f9f8f5' }}>
                          <p className="text-center" style={{ color: '#aeadaa' }}>
                            微信二维码<br/>(WeChat QR Code)
                          </p>
                        </div>
                      </div>
                      <p className="text-sm" style={{ color: '#aeadaa' }}>
                        {mounted && (i18n.language === 'en' ? 'Scan to add WeChat' : '扫码添加微信')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setShowContactModal(false)}
                    className="px-6 py-2 rounded-lg hover:opacity-90 transition-opacity font-semibold"
                    style={{ backgroundColor: '#12110f', color: '#f9f8f5' }}
                  >
                    {mounted && (i18n.language === 'en' ? 'Close' : '关闭')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 询价弹窗 */}
        {showInquiryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold" style={{ color: '#12110f' }}>
                    {mounted && (i18n.language === 'en' ? 'Product Inquiry' : '产品询价')}
                  </h2>
                  <button
                    onClick={() => setShowInquiryModal(false)}
                    className="p-2 rounded-lg hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#f9f8f5', color: '#12110f' }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                      {mounted && (i18n.language === 'en' ? 'Product Name' : '产品名称')}
                    </label>
                    <input
                      type="text"
                      value={product?.name || ''}
                      readOnly
                      className="w-full px-4 py-2 border rounded-lg"
                      style={{ borderColor: '#aeadaa', backgroundColor: '#f9f8f5', color: '#12110f' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                      {mounted && (i18n.language === 'en' ? 'Your Name' : '您的姓名')} *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                      style={{ borderColor: '#aeadaa', backgroundColor: '#f9f8f5', color: '#12110f' }}
                      placeholder={mounted ? (i18n.language === 'en' ? 'Enter your name' : '请输入您的姓名') : ''}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                      {mounted && (i18n.language === 'en' ? 'Email Address' : '邮箱地址')} *
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                      style={{ borderColor: '#aeadaa', backgroundColor: '#f9f8f5', color: '#12110f' }}
                      placeholder={mounted ? (i18n.language === 'en' ? 'Enter your email' : '请输入您的邮箱') : ''}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                      {mounted && (i18n.language === 'en' ? 'Quantity' : '采购数量')}
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                      style={{ borderColor: '#aeadaa', backgroundColor: '#f9f8f5', color: '#12110f' }}
                      placeholder={mounted ? (i18n.language === 'en' ? 'Enter quantity' : '请输入采购数量') : ''}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                      {mounted && (i18n.language === 'en' ? 'Message' : '留言')}
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                      style={{ borderColor: '#aeadaa', backgroundColor: '#f9f8f5', color: '#12110f' }}
                      placeholder={mounted ? (i18n.language === 'en' ? 'Enter your message or special requirements' : '请输入您的留言或特殊要求') : ''}
                    ></textarea>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        alert(mounted ? (i18n.language === 'en' ? 'Inquiry submitted successfully! We will contact you within 24 hours.' : '询价提交成功！我们将在24小时内联系您。') : '');
                        setShowInquiryModal(false);
                      }}
                      className="flex-1 py-3 text-white rounded-lg hover:opacity-90 transition-opacity font-semibold"
                      style={{ backgroundColor: '#12110f' }}
                    >
                      {mounted && (i18n.language === 'en' ? 'Submit Inquiry' : '提交询价')}
                    </button>
                    <button
                      onClick={() => setShowInquiryModal(false)}
                      className="flex-1 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold border-2"
                      style={{ borderColor: '#12110f', color: '#12110f', backgroundColor: 'transparent' }}
                    >
                      {mounted && (i18n.language === 'en' ? 'Cancel' : '取消')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}