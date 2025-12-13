'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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

// 知识内容接口

// 滑动展示图片接口
interface ShowcaseImage {
  name: string;
  url: string;
  uploading?: boolean;
}

export default function AdminProductsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPasswordSetup, setShowPasswordSetup] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
    const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [activeTab, setActiveTab] = useState<'products' | 'images' | 'content'>('content');
  const [showcaseImages, setShowcaseImages] = useState<ShowcaseImage[]>([
    { name: 'hero-background.png', url: '/images/hero-background.png' },
    { name: 'showcase-1.jpg', url: '/images/showcase-1.jpg' },
    { name: 'showcase-2.jpg', url: '/images/showcase-2.jpg' },
    { name: 'showcase-3.jpg', url: '/images/showcase-3.jpg' }
  ]);

  // 公司展示图片（关于我们部分）
  const [companyImages, setCompanyImages] = useState<ShowcaseImage[]>([
    { name: 'factory.jpg', url: '/images/company/factory.jpg' },
    { name: 'lab.jpg', url: '/images/company/lab.jpg' },
    { name: 'quality.jpg', url: '/images/company/quality.jpg' },
    { name: 'warehouse.jpg', url: '/images/company/warehouse.jpg' },
    { name: 'assembly.jpg', url: '/images/company/assembly.jpg' },
    { name: 'packaging.jpg', url: '/images/company/packaging.jpg' }
  ]);

  // 客户评价头像图片
  const [testimonialImages, setTestimonialImages] = useState<ShowcaseImage[]>([
    { name: 'client1.jpg', url: '/images/testimonials/client1.jpg' },
    { name: 'client2.jpg', url: '/images/testimonials/client2.jpg' },
    { name: 'client3.jpg', url: '/images/testimonials/client3.jpg' }
  ]);

  // 交互式项目图片
  const [interactiveImages, setInteractiveImages] = useState<ShowcaseImage[]>([
    { name: 'project1.jpg', url: '/images/interactive/project1.jpg' },
    { name: 'project2.jpg', url: '/images/interactive/project2.jpg' },
    { name: 'project3.jpg', url: '/images/interactive/project3.jpg' }
  ]);

  // 证书图片管理
  const [certificateImages, setCertificateImages] = useState<ShowcaseImage[]>([
    { name: 'iso9001.jpg', url: '/images/certificates/iso9001.jpg' },
    { name: 'ce.jpg', url: '/images/certificates/ce.jpg' },
    { name: 'patent.jpg', url: '/images/certificates/patent.jpg' }
  ]);
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);

  // 关于我们内容状态
  const [aboutContent, setAboutContent] = useState({
    title: '关于泽智合工贸',
    mainDescription: '我们是高端厨卫解决方案的领先提供商，专注于将极简主义美学与实用功能完美结合的现代设计。',
    teamTitle: '专业团队',
    teamDescription: '凭借在厨卫设计领域的多年经验，我们的专业团队以精准的工艺和细致的关怀，将您的愿景变为现实。'
  });

  // 网站主要文字内容状态
  const [mainTextContent, setMainTextContent] = useState({
    heroTitle: 'ZÉZHÌHÉ',
    companyFullName: '泽智合工贸有限公司',
    aboutTitle: '关于我们',
    aboutDescription: '我们是高端厨卫解决方案的领先提供商，专注于将极简主义美学与实用功能完美结合的现代设计。',
    testimonialsTitle: '客户展示',
    certificatesTitle: '资质认证',
    certificatesSubtitle: '专业资质认证与质量保证',
        projectsTitle: '客户项目',
    projectsSubtitle: '与我们尊贵客户的成功合作',
    contactTitle: '联系我们'
  });

// 证书内容管理状态
const [certificates, setCertificates] = useState([
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
]);

  // 新产品表单状态
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: '圆形',
    material: '304不锈钢',
    color: '银色',
    price: '',
    description: '',
    features: [''],
    isNew: false,
    isHot: false
  });

  
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
      description: '采用优质304不锈钢材质，具有防臭、防虫、防返水等多种功能。',
      features: ['防臭设计', '防虫功能', '防返水', '304不锈钢材质']
    },
    {
      id: 'fd-002',
      name: 'ABS隐形地漏',
      category: '方形',
      material: 'ABS工程塑料',
      color: '黑色',
      image: '/images/products/abs-invisible.jpg',
      price: '￥45',
      description: '创新隐形设计，美观大方。采用高强度ABS工程塑料。',
      features: ['隐形设计', 'ABS工程塑料', '安装简便', '耐腐蚀']
    },
    {
      id: 'fd-003',
      name: '线性排水地漏',
      category: '方形',
      material: '304不锈钢',
      color: '银色',
      image: '/images/products/linear-drain.jpg',
      price: '￥158',
      description: '现代线性设计，排水效率高。适合大面积排水需求。',
      features: ['线性设计', '排水效率高', '304不锈钢', '现代美观']
    },
    {
      id: 'fd-004',
      name: '镀金装饰地漏',
      category: '圆形',
      material: '铜质镀金',
      color: '金色',
      image: '/images/products/gold-plated.jpg',
      price: '￥288',
      description: '豪华镀金装饰，彰显品质生活。铜质基材镀金工艺。',
      features: ['镀金装饰', '铜质基材', '防腐蚀', '豪华设计']
    },
    {
      id: 'fd-005',
      name: '简约方形地漏',
      category: '方形',
      material: '304不锈钢',
      color: '银色',
      image: '/images/products/stainless-odorless-5.jpg',
      price: '￥88',
      description: '简约方形设计，适合各种装修风格。304不锈钢材质。',
      features: ['简约设计', '方形外观', '304不锈钢', '通用性强']
    },
    {
      id: 'fd-006',
      name: '豪华圆形地漏',
      category: '圆形',
      material: '304不锈钢',
      color: '金色',
      image: '/images/products/stainless-odorless-6.jpg',
      price: '￥198',
      description: '豪华圆形设计，尊贵典雅。表面经过特殊处理。',
      features: ['豪华设计', '圆形外观', '特殊表面处理', '抗水渍']
    }
  ];

  // 保存产品数据到localStorage
  const saveProductsToStorage = (productsList: Product[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('products', JSON.stringify(productsList));
      // 触发storage事件通知其他页面更新
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'products',
        newValue: JSON.stringify(productsList),
        oldValue: null
      }));
    }
  };

  useEffect(() => {
    setMounted(true);
    // 检查密码验证
    if (typeof window !== 'undefined') {
      const storedPassword = localStorage.getItem('adminPassword');
      if (!storedPassword) {
        // 如果没有设置密码，显示设置界面
        setShowPasswordSetup(true);
      } else {
        // 检查是否已经验证过
        const isAuthenticated = sessionStorage.getItem('adminAuthenticated');
        if (!isAuthenticated) {
          // 需要输入密码
          setShowPasswordSetup(false);
        } else {
          setIsAuthenticated(true);
        }
      }
    }
  }, []);

  // 验证密码
  const handlePasswordSubmit = () => {
    if (typeof window !== 'undefined') {
      const storedPassword = localStorage.getItem('adminPassword');
      if (password === storedPassword) {
        setIsAuthenticated(true);
        sessionStorage.setItem('adminAuthenticated', 'true');
        setPassword('');
      } else {
        alert('Incorrect password');
      }
    }
  };

  // 设置新密码
  const handlePasswordSetup = () => {
    if (newPassword === confirmPassword && newPassword.length >= 4) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('adminPassword', newPassword);
        setShowPasswordSetup(false);
        setIsAuthenticated(true);
        sessionStorage.setItem('adminAuthenticated', 'true');
        alert('Password set successfully!');
      }
    } else {
      alert('Passwords do not match or password is too short (minimum 4 characters)');
    }
  };

  // 登出
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuthenticated');
    setPassword('');
  };

  // 修改密码
  const handleChangePassword = () => {
    const currentPassword = prompt('Enter current password:');
    if (currentPassword === localStorage.getItem('adminPassword')) {
      const newPass = prompt('Enter new password (minimum 4 characters):');
      if (newPass && newPass.length >= 4) {
        const confirmPass = prompt('Confirm new password:');
        if (newPass === confirmPass) {
          localStorage.setItem('adminPassword', newPass);
          alert('Password changed successfully!');
        } else {
          alert('Passwords do not match!');
        }
      } else {
        alert('Password must be at least 4 characters!');
      }
    } else {
      alert('Incorrect current password!');
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    setMounted(true);
    // 从localStorage加载产品数据
    if (typeof window !== 'undefined') {
      const savedProducts = localStorage.getItem('products');
      if (savedProducts) {
        try {
          setProducts(JSON.parse(savedProducts));
        } catch (error) {
          console.error('Failed to load products from localStorage:', error);
          localStorage.setItem('products', JSON.stringify(defaultProducts));
          setProducts(defaultProducts);
        }
      } else {
        // 初始化localStorage
        localStorage.setItem('products', JSON.stringify(defaultProducts));
        setProducts(defaultProducts);
      }

      
      // 加载关于我们内容
      const savedAboutContent = localStorage.getItem('aboutContent');
      if (savedAboutContent) {
        try {
          setAboutContent(JSON.parse(savedAboutContent));
        } catch (error) {
          console.error('Failed to load about content from localStorage:', error);
        }
      }
    } else {
      setProducts(defaultProducts);
    }
  }, []);

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price) {
      const product: Product = {
        id: `fd-${Date.now()}`,
        name: newProduct.name,
        category: newProduct.category || '圆形',
        material: newProduct.material || '304不锈钢',
        color: newProduct.color || '银色',
        image: newProduct.image || `/images/products/${newProduct.name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
        price: newProduct.price,
        description: newProduct.description,
        features: newProduct.features?.filter(f => f.trim() !== '') || [],
        isNew: newProduct.isNew,
        isHot: newProduct.isHot
      };

      const updatedProducts = [...products, product];
      setProducts(updatedProducts);
      saveProductsToStorage(updatedProducts);
      resetForm();
      setIsAddingProduct(false);
    }
  };

  const handleUpdateProduct = () => {
    if (editingProduct) {
      const updatedProducts = products.map(p => p.id === editingProduct.id ? editingProduct : p);
      setProducts(updatedProducts);
      saveProductsToStorage(updatedProducts);
      setEditingProduct(null);
      resetForm();
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('确定要删除这个产品吗？')) {
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      saveProductsToStorage(updatedProducts);
    }
  };

  
  // 通用图片上传处理函数
  const handleImageUpload = async (file: File, imageName: string, imageType: 'showcase' | 'company' | 'testimonial' | 'interactive' | 'certificate') => {
    setUploadingImage(imageName);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', imageName);
      formData.append('imageType', imageType);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();

        // 清除浏览器缓存，强制刷新图片
        const timestamp = new Date().getTime();
        const newUrl = `${result.url}?t=${timestamp}`;

        // 根据图片类型更新对应的图片列表
        switch (imageType) {
          case 'showcase':
            setShowcaseImages(prev =>
              prev.map(img =>
                img.name === imageName
                  ? { ...img, url: newUrl }
                  : img
              )
            );
            break;
          case 'company':
            setCompanyImages(prev =>
              prev.map(img =>
                img.name === imageName
                  ? { ...img, url: newUrl }
                  : img
              )
            );
            break;
          case 'testimonial':
            setTestimonialImages(prev =>
              prev.map(img =>
                img.name === imageName
                  ? { ...img, url: newUrl }
                  : img
              )
            );
            break;
          case 'interactive':
            setInteractiveImages(prev =>
              prev.map(img =>
                img.name === imageName
                  ? { ...img, url: newUrl }
                  : img
              )
            );
            break;
          case 'certificate':
            setCertificateImages(prev =>
              prev.map(img =>
                img.name === imageName
                  ? { ...img, url: newUrl }
                  : img
              )
            );
            break;
        }

        alert(`图片上传成功: ${imageName}`);
      } else {
        alert('图片上传失败');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('图片上传出错');
    } finally {
      setUploadingImage(null);
    }
  };

  const resetForm = () => {
    setNewProduct({
      name: '',
      category: '圆形',
      material: '304不锈钢',
      color: '银色',
      price: '',
      description: '',
      features: [''],
      isNew: false,
      isHot: false
    });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const features = [...(newProduct.features || [])];
    features[index] = value;
    setNewProduct({ ...newProduct, features });
  };

  const addFeatureField = () => {
    setNewProduct({ ...newProduct, features: [...(newProduct.features || []), ''] });
  };

  const removeFeatureField = (index: number) => {
    const features = [...(newProduct.features || [])];
    features.splice(index, 1);
    setNewProduct({ ...newProduct, features });
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f9f8f5' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#12110f' }}></div>
          <p style={{ color: '#aeadaa' }}>Loading...</p>
        </div>
      </div>
    );
  }

  // 如果未验证密码，显示密码输入界面
  if (!isAuthenticated || showPasswordSetup) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f9f8f5' }}>
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6" style={{ color: '#12110f' }}>
            {showPasswordSetup ? 'Set Admin Password' : 'Admin Login'}
          </h2>

          {showPasswordSetup ? (
            <div className="space-y-4">
              <p className="text-center mb-4" style={{ color: '#aeadaa' }}>
                Please set a password for the admin panel (minimum 4 characters)
              </p>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                style={{ borderColor: '#aeadaa' }}
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                style={{ borderColor: '#aeadaa' }}
              />
              <button
                onClick={handlePasswordSetup}
                className="w-full px-4 py-3 text-white rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#12110f' }}
              >
                Set Password
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-center mb-4" style={{ color: '#aeadaa' }}>
                Please enter the admin password to continue
              </p>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                style={{ borderColor: '#aeadaa' }}
              />
              <button
                onClick={handlePasswordSubmit}
                className="w-full px-4 py-3 text-white rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#12110f' }}
              >
                Login
              </button>
              <button
                onClick={() => setShowPasswordSetup(true)}
                className="w-full px-4 py-3 rounded-lg hover:opacity-90 transition-opacity border-2"
                style={{ borderColor: '#aeadaa', color: '#12110f' }}
              >
                Set New Password
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9f8f5' }}>
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题和标签切换 */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold" style={{ color: '#12110f' }}>
              内容管理中心
            </h1>
            <div className="flex gap-4 items-center">
              {/* <LanguageSwitch /> */}
              <button
                onClick={() => router.push('/products')}
                className="px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#aeadaa', color: '#12110f' }}
              >
                返回产品页面
              </button>
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#fbbf24', color: '#12110f' }}
              >
                修改密码
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#ef4444', color: '#ffffff' }}
              >
                登出
              </button>
              {activeTab === 'products' && (
                <button
                  onClick={() => setIsAddingProduct(true)}
                  className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#12110f' }}
                >
                  添加新产品
                </button>
              )}
              </div>
          </div>

          {/* 标签切换 */}
          <div className="flex gap-2 border-b" style={{ borderColor: '#aeadaa' }}>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-3 font-medium transition-all ${
                activeTab === 'products'
                  ? 'border-b-2'
                  : 'hover:opacity-70'
              }`}
              style={{
                borderColor: activeTab === 'products' ? '#12110f' : 'transparent',
                color: activeTab === 'products' ? '#12110f' : '#aeadaa'
              }}
            >
              产品管理
            </button>
              <button
              onClick={() => setActiveTab('images')}
              className={`px-6 py-3 font-medium transition-all ${
                activeTab === 'images'
                  ? 'border-b-2'
                  : 'hover:opacity-70'
              }`}
              style={{
                borderColor: activeTab === 'images' ? '#12110f' : 'transparent',
                color: activeTab === 'images' ? '#12110f' : '#aeadaa'
              }}
            >
              图片管理
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`px-6 py-3 font-medium transition-all ${
                activeTab === 'content'
                  ? 'border-b-2'
                  : 'hover:opacity-70'
              }`}
              style={{
                borderColor: activeTab === 'content' ? '#12110f' : 'transparent',
                color: activeTab === 'content' ? '#12110f' : '#aeadaa'
              }}
            >
              内容管理
            </button>
          </div>
        </div>

        {/* 根据选中的标签显示不同内容 */}
        {activeTab === 'products' && (
          <>
            {/* 滑动卡片图片管理 */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8" style={{ backgroundColor: '#ffffff' }}>
              <h2 className="text-xl font-semibold mb-4" style={{ color: '#12110f' }}>
                滑动展示图片管理
              </h2>
              <p className="text-sm mb-4" style={{ color: '#aeadaa' }}>
                这些图片将显示在产品列表页面的滑动展示区域。点击图片可以重新上传。
              </p>
              <div className="flex gap-4 flex-wrap">
                {showcaseImages.map((image, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div className="relative">
                      {uploadingImage === image.name ? (
                        <div className="w-24 h-24 rounded-lg border-2 border-dashed flex items-center justify-center" style={{ borderColor: '#aeadaa' }}>
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 mx-auto mb-2" style={{ borderColor: '#12110f' }}></div>
                            <p className="text-xs" style={{ color: '#aeadaa' }}>上传中...</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <img
                            src={image.url}
                            alt={image.name}
                            className="w-24 h-24 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/images/placeholder-product.svg';
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity rounded-lg flex items-center justify-center opacity-0 hover:opacity-100">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleImageUpload(file, image.name, 'showcase');
                              }
                            }}
                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </>
                      )}
                    </div>
                    <p className="text-xs text-center font-medium" style={{ color: '#12110f' }}>
                      {image.name}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: '#f9f8f5' }}>
                <p className="text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                  📤 上传说明：
                </p>
                <ul className="text-xs space-y-1" style={{ color: '#aeadaa' }}>
                  <li>• 支持格式：JPG、PNG、GIF、WebP</li>
                  <li>• 建议尺寸：至少 1024x1024 像素</li>
                  <li>• 点击任意图片即可重新上传</li>
                  <li>• 上传成功后会立即在网站上显示</li>
                </ul>
              </div>
            </div>

        {/* 添加产品表单 */}
        {(isAddingProduct || editingProduct) && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" style={{ backgroundColor: '#ffffff' }}>
            <h2 className="text-2xl font-semibold mb-6" style={{ color: '#12110f' }}>
              {isAddingProduct ? '添加新产品' : '编辑产品'}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* 基本信息 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                    产品名称 *
                  </label>
                  <input
                    type="text"
                    value={isAddingProduct ? (newProduct.name || '') : (editingProduct?.name || '')}
                    onChange={(e) => {
                      if (isAddingProduct) {
                        setNewProduct({ ...newProduct, name: e.target.value });
                      } else if (editingProduct) {
                        setEditingProduct({ ...editingProduct, name: e.target.value });
                      }
                    }}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: '#aeadaa', backgroundColor: '#f9f8f5', color: '#12110f' }}
                    placeholder="输入产品名称"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                    价格 *
                  </label>
                  <input
                    type="text"
                    value={isAddingProduct ? (newProduct.price || '') : (editingProduct?.price || '')}
                    onChange={(e) => {
                      if (isAddingProduct) {
                        setNewProduct({ ...newProduct, price: e.target.value });
                      } else if (editingProduct) {
                        setEditingProduct({ ...editingProduct, price: e.target.value });
                      }
                    }}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: '#aeadaa', backgroundColor: '#f9f8f5', color: '#12110f' }}
                    placeholder="例如：￥68"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                    产品图片
                  </label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={isAddingProduct ? (newProduct.image || '') : (editingProduct?.image || '')}
                      onChange={(e) => {
                        if (isAddingProduct) {
                          setNewProduct({ ...newProduct, image: e.target.value });
                        } else if (editingProduct) {
                          setEditingProduct({ ...editingProduct, image: e.target.value });
                        }
                      }}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                      style={{ borderColor: '#aeadaa', backgroundColor: '#f9f8f5', color: '#12110f' }}
                      placeholder="/images/products/product-name.jpg"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // 这里只是演示，实际项目中需要上传到服务器或CDN
                            const fileName = file.name;
                            const imagePath = `/images/products/${fileName}`;
                            if (isAddingProduct) {
                              setNewProduct({ ...newProduct, image: imagePath });
                            } else if (editingProduct) {
                              setEditingProduct({ ...editingProduct, image: imagePath });
                            }
                          }
                        }}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                        style={{ backgroundColor: '#aeadaa', color: '#12110f' }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        选择图片
                      </label>
                    </div>
                    <p className="text-sm" style={{ color: '#aeadaa' }}>
                      注意：请先将图片文件手动复制到 /public/images/products/ 目录中
                    </p>
                  </div>
                </div>
              </div>

              {/* 属性选择 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                    形状
                  </label>
                  <select
                    value={isAddingProduct ? (newProduct.category || '圆形') : (editingProduct?.category || '圆形')}
                    onChange={(e) => {
                      if (isAddingProduct) {
                        setNewProduct({ ...newProduct, category: e.target.value });
                      } else if (editingProduct) {
                        setEditingProduct({ ...editingProduct, category: e.target.value });
                      }
                    }}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: '#aeadaa', backgroundColor: '#f9f8f5', color: '#12110f' }}
                  >
                    <option value="圆形">圆形</option>
                    <option value="方形">方形</option>
                    <option value="线性">线性</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                    材质
                  </label>
                  <select
                    value={isAddingProduct ? (newProduct.material || '304不锈钢') : (editingProduct?.material || '304不锈钢')}
                    onChange={(e) => {
                      if (isAddingProduct) {
                        setNewProduct({ ...newProduct, material: e.target.value });
                      } else if (editingProduct) {
                        setEditingProduct({ ...editingProduct, material: e.target.value });
                      }
                    }}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: '#aeadaa', backgroundColor: '#f9f8f5', color: '#12110f' }}
                  >
                    <option value="304不锈钢">304不锈钢</option>
                    <option value="ABS工程塑料">ABS工程塑料</option>
                    <option value="铜质镀金">铜质镀金</option>
                    <option value="不锈钢">不锈钢</option>
                    <option value="黄铜">黄铜</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                    颜色
                  </label>
                  <select
                    value={isAddingProduct ? (newProduct.color || '银色') : (editingProduct?.color || '银色')}
                    onChange={(e) => {
                      if (isAddingProduct) {
                        setNewProduct({ ...newProduct, color: e.target.value });
                      } else if (editingProduct) {
                        setEditingProduct({ ...editingProduct, color: e.target.value });
                      }
                    }}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: '#aeadaa', backgroundColor: '#f9f8f5', color: '#12110f' }}
                  >
                    <option value="银色">银色</option>
                    <option value="黑色">黑色</option>
                    <option value="金色">金色</option>
                    <option value="青铜色">青铜色</option>
                  </select>
                </div>

                {/* 标签 */}
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isAddingProduct ? (newProduct.isNew || false) : (editingProduct?.isNew || false)}
                      onChange={(e) => {
                        if (isAddingProduct) {
                          setNewProduct({ ...newProduct, isNew: e.target.checked });
                        } else if (editingProduct) {
                          setEditingProduct({ ...editingProduct, isNew: e.target.checked });
                        }
                      }}
                      className="mr-2"
                    />
                    <span style={{ color: '#12110f' }}>新品</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isAddingProduct ? (newProduct.isHot || false) : (editingProduct?.isHot || false)}
                      onChange={(e) => {
                        if (isAddingProduct) {
                          setNewProduct({ ...newProduct, isHot: e.target.checked });
                        } else if (editingProduct) {
                          setEditingProduct({ ...editingProduct, isHot: e.target.checked });
                        }
                      }}
                      className="mr-2"
                    />
                    <span style={{ color: '#12110f' }}>热销</span>
                  </label>
                </div>
              </div>
            </div>

            {/* 描述 */}
            <div className="mt-6">
              <label className="block text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                产品描述
              </label>
              <textarea
                value={isAddingProduct ? (newProduct.description || '') : (editingProduct?.description || '')}
                onChange={(e) => {
                  if (isAddingProduct) {
                    setNewProduct({ ...newProduct, description: e.target.value });
                  } else if (editingProduct) {
                    setEditingProduct({ ...editingProduct, description: e.target.value });
                  }
                }}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style={{ borderColor: '#aeadaa', backgroundColor: '#f9f8f5', color: '#12110f' }}
                rows={4}
                placeholder="输入产品描述..."
              />
            </div>

            {/* 产品特点 */}
            <div className="mt-6">
              <label className="block text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                产品特点
              </label>
              <div className="space-y-2">
                {(isAddingProduct ? (newProduct.features || ['']) : (editingProduct?.features || [''])).map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => {
                        if (isAddingProduct) {
                          handleFeatureChange(index, e.target.value);
                        } else if (editingProduct) {
                          const features = [...(editingProduct.features || [])];
                          features[index] = e.target.value;
                          setEditingProduct({ ...editingProduct, features });
                        }
                      }}
                      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                      style={{ borderColor: '#aeadaa', backgroundColor: '#f9f8f5', color: '#12110f' }}
                      placeholder="输入产品特点"
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          if (isAddingProduct) {
                            removeFeatureField(index);
                          } else if (editingProduct) {
                            const features = [...(editingProduct.features || [])];
                            features.splice(index, 1);
                            setEditingProduct({ ...editingProduct, features });
                          }
                        }}
                        className="px-3 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: '#dc3545' }}
                      >
                        删除
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    if (isAddingProduct) {
                      addFeatureField();
                    } else if (editingProduct) {
                      setEditingProduct({ ...editingProduct, features: [...(editingProduct.features || []), ''] });
                    }
                  }}
                  className="px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#aeadaa', color: '#12110f' }}
                >
                  添加特点
                </button>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={isAddingProduct ? handleAddProduct : handleUpdateProduct}
                className="px-6 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#12110f' }}
              >
                {isAddingProduct ? '添加产品' : '更新产品'}
              </button>
              <button
                onClick={() => {
                  setIsAddingProduct(false);
                  setEditingProduct(null);
                  resetForm();
                }}
                className="px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#aeadaa', color: '#12110f' }}
              >
                取消
              </button>
            </div>
          </div>
        )}

        {/* 产品列表 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: '#f9f8f5' }}>
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: '#12110f' }}>产品图片</th>
                  <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: '#12110f' }}>产品名称</th>
                  <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: '#12110f' }}>分类</th>
                  <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: '#12110f' }}>材质</th>
                  <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: '#12110f' }}>颜色</th>
                  <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: '#12110f' }}>价格</th>
                  <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: '#12110f' }}>标签</th>
                  <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: '#12110f' }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t hover:bg-gray-50" style={{ borderColor: '#aeadaa' }}>
                    <td className="px-6 py-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
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
                    </td>
                    <td className="px-6 py-4 font-medium" style={{ color: '#12110f' }}>{product.name}</td>
                    <td className="px-6 py-4" style={{ color: '#aeadaa' }}>{product.category}</td>
                    <td className="px-6 py-4" style={{ color: '#aeadaa' }}>{product.material}</td>
                    <td className="px-6 py-4" style={{ color: '#aeadaa' }}>{product.color}</td>
                    <td className="px-6 py-4 font-medium" style={{ color: '#12110f' }}>{product.price}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {product.isHot && (
                          <span className="px-2 py-1 text-xs font-semibold rounded-full" style={{ backgroundColor: '#12110f', color: '#f9f8f5' }}>
                            热销
                          </span>
                        )}
                        {product.isNew && (
                          <span className="px-2 py-1 text-xs font-semibold rounded-full" style={{ backgroundColor: '#28a745', color: '#ffffff' }}>
                            新品
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingProduct(product);
                            setIsAddingProduct(false);
                          }}
                          className="px-3 py-1 text-white rounded hover:opacity-90 transition-opacity text-sm"
                          style={{ backgroundColor: '#007bff' }}
                        >
                          编辑
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="px-3 py-1 text-white rounded hover:opacity-90 transition-opacity text-sm"
                          style={{ backgroundColor: '#dc3545' }}
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <p style={{ color: '#aeadaa' }}>暂无产品，点击上方"添加新产品"按钮添加产品</p>
            </div>
          )}
        </div>
          </>
        )}

        {/* 图片管理内容 */}
        {activeTab === 'images' && (
          <div className="space-y-12">
            {/* 图片管理总览 */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light mb-4" style={{ color: '#12110f', fontFamily: 'serif' }}>
                图片管理中心
              </h2>
              <p className="text-lg" style={{ color: '#aeadaa' }}>
                管理网站各个模块的展示图片
              </p>
            </div>

            {/* 客户评价截图 - 4:3 比例 */}
            <div className="bg-white rounded-xl shadow-sm p-8" style={{ backgroundColor: '#ffffff' }}>
              <div className="mb-8">
                <h3 className="text-2xl font-light mb-2" style={{ color: '#12110f', fontFamily: 'serif' }}>
                  客户评价截图
                </h3>
                <p className="text-sm" style={{ color: '#aeadaa' }}>
                  展示在客户评价区域的图片，建议使用 4:3 比例的截图
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { id: 'testimonial1', name: '客户评价 1', url: '/images/testimonials/testimonial1.jpg' },
                  { id: 'testimonial2', name: '客户评价 2', url: '/images/testimonials/testimonial2.jpg' },
                  { id: 'testimonial3', name: '客户评价 3', url: '/images/testimonials/testimonial3.jpg' },
                  { id: 'testimonial4', name: '客户评价 4', url: '/images/testimonials/testimonial4.jpg' },
                ].map((image) => (
                  <div key={image.id} className="group">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-50 border-2 border-dashed transition-all duration-300 hover:border-blue-500" style={{ borderColor: '#e5e7eb' }}>
                      {uploadingImage === image.name ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-2 mx-auto mb-2" style={{ borderColor: '#12110f', borderTopColor: 'transparent' }}></div>
                            <p className="text-xs" style={{ color: '#aeadaa' }}>上传中...</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <img
                            src={image.url}
                            alt={image.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = `data:image/svg+xml,%3Csvg width='300' height='225' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='300' height='225' fill='%23f9f8f5'/%3E%3Ctext x='150' y='112' text-anchor='middle' dy='.3em' font-family='Arial' font-size='14' fill='%23aeadaa'%3E点击上传图片%3C/text%3E%3C/svg%3E`;
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="bg-white px-3 py-1 rounded-full text-xs font-medium shadow-lg" style={{ color: '#12110f' }}>
                                点击更换
                              </div>
                            </div>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleImageUpload(file, image.name, 'testimonial');
                              }
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </>
                      )}
                    </div>
                    <p className="text-sm text-center mt-3 font-medium" style={{ color: '#12110f' }}>
                      {image.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 公司设施图片 - 正方形 */}
            <div className="bg-white rounded-xl shadow-sm p-8" style={{ backgroundColor: '#ffffff' }}>
              <div className="mb-8">
                <h3 className="text-2xl font-light mb-2" style={{ color: '#12110f', fontFamily: 'serif' }}>
                  公司设施图片
                </h3>
                <p className="text-sm" style={{ color: '#aeadaa' }}>
                  展示公司环境和设施的图片，使用 1:1 正方形比例，整齐排列
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {companyImages.map((image, index) => (
                  <div key={index} className="group">
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-50 border-2 border-dashed transition-all duration-300 hover:border-blue-500" style={{ borderColor: '#e5e7eb' }}>
                      {uploadingImage === image.name ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-2 mx-auto mb-2" style={{ borderColor: '#12110f', borderTopColor: 'transparent' }}></div>
                            <p className="text-xs" style={{ color: '#aeadaa' }}>上传中...</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <img
                            src={image.url}
                            alt={image.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = `data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='300' height='300' fill='%23f9f8f5'/%3E%3Ctext x='150' y='150' text-anchor='middle' dy='.3em' font-family='Arial' font-size='14' fill='%23aeadaa'%3E点击上传图片%3C/text%3E%3C/svg%3E`;
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="bg-white px-3 py-1 rounded-full text-xs font-medium shadow-lg" style={{ color: '#12110f' }}>
                                点击更换
                              </div>
                            </div>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleImageUpload(file, image.name, 'company');
                              }
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </>
                      )}
                    </div>
                    <p className="text-sm text-center mt-3 font-medium" style={{ color: '#12110f' }}>
                      {image.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 资质证书图片 - 9:16 比例 */}
            <div className="bg-white rounded-xl shadow-sm p-8" style={{ backgroundColor: '#ffffff' }}>
              <div className="mb-8">
                <h3 className="text-2xl font-light mb-2" style={{ color: '#12110f', fontFamily: 'serif' }}>
                  资质证书图片
                </h3>
                <p className="text-sm" style={{ color: '#aeadaa' }}>
                  展示公司资质证书，使用 9:16 竖版比例，配合左侧标题文字
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {[
                  { id: 'certificate1', name: '资质证书 1', url: '/images/certificates/certificate1.jpg' },
                  { id: 'certificate2', name: '资质证书 2', url: '/images/certificates/certificate2.jpg' },
                  { id: 'certificate3', name: '资质证书 3', url: '/images/certificates/certificate3.jpg' },
                  { id: 'certificate4', name: '资质证书 4', url: '/images/certificates/certificate4.jpg' },
                  { id: 'certificate5', name: '资质证书 5', url: '/images/certificates/certificate5.jpg' },
                  { id: 'certificate6', name: '资质证书 6', url: '/images/certificates/certificate6.jpg' },
                  { id: 'certificate7', name: '资质证书 7', url: '/images/certificates/certificate7.jpg' },
                  { id: 'certificate8', name: '资质证书 8', url: '/images/certificates/certificate8.jpg' },
                ].map((image) => (
                  <div key={image.id} className="group">
                    <div className="relative aspect-[9/16] rounded-lg overflow-hidden bg-gray-50 border-2 border-dashed transition-all duration-300 hover:border-blue-500" style={{ borderColor: '#e5e7eb' }}>
                      {uploadingImage === image.name ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-2 mx-auto mb-2" style={{ borderColor: '#12110f', borderTopColor: 'transparent' }}></div>
                            <p className="text-xs" style={{ color: '#aeadaa' }}>上传中...</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <img
                            src={image.url}
                            alt={image.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = `data:image/svg+xml,%3Csvg width='180' height='320' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='180' height='320' fill='%23f9f8f5'/%3E%3Ctext x='90' y='160' text-anchor='middle' dy='.3em' font-family='Arial' font-size='12' fill='%23aeadaa'%3E点击上传证书%3C/text%3E%3C/svg%3E`;
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="bg-white px-3 py-1 rounded-full text-xs font-medium shadow-lg" style={{ color: '#12110f' }}>
                                点击更换
                              </div>
                            </div>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleImageUpload(file, image.name, 'certificate');
                              }
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </>
                      )}
                    </div>
                    <p className="text-sm text-center mt-3 font-medium" style={{ color: '#12110f' }}>
                      {image.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 客户项目图片 - 16:9 比例 */}
            <div className="bg-white rounded-xl shadow-sm p-8" style={{ backgroundColor: '#ffffff' }}>
              <div className="mb-8">
                <h3 className="text-2xl font-light mb-2" style={{ color: '#12110f', fontFamily: 'serif' }}>
                  客户项目图片
                </h3>
                <p className="text-sm" style={{ color: '#aeadaa' }}>
                  展示与客户合作的项目案例，使用 16:9 横版比例，支持自动轮播
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {interactiveImages.map((image, index) => (
                  <div key={index} className="group">
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-50 border-2 border-dashed transition-all duration-300 hover:border-blue-500" style={{ borderColor: '#e5e7eb' }}>
                      {uploadingImage === image.name ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-2 mx-auto mb-2" style={{ borderColor: '#12110f', borderTopColor: 'transparent' }}></div>
                            <p className="text-xs" style={{ color: '#aeadaa' }}>上传中...</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <img
                            src={image.url}
                            alt={image.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = `data:image/svg+xml,%3Csvg width='640' height='360' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='640' height='360' fill='%23f9f8f5'/%3E%3Ctext x='320' y='180' text-anchor='middle' dy='.3em' font-family='Arial' font-size='16' fill='%23aeadaa'%3E点击上传项目图片%3C/text%3E%3C/svg%3E`;
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="bg-white px-3 py-1 rounded-full text-xs font-medium shadow-lg" style={{ color: '#12110f' }}>
                                点击更换
                              </div>
                            </div>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleImageUpload(file, image.name, 'interactive');
                              }
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </>
                      )}
                    </div>
                    <p className="text-sm text-center mt-3 font-medium" style={{ color: '#12110f' }}>
                      {image.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 上传说明 */}
            <div className="bg-gray-50 rounded-xl p-8" style={{ backgroundColor: '#f9f8f5' }}>
              <h3 className="text-lg font-light mb-4" style={{ color: '#12110f', fontFamily: 'serif' }}>
                📤 上传说明
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                    支持格式
                  </h4>
                  <p className="text-xs" style={{ color: '#aeadaa' }}>
                    JPG、PNG、GIF、WebP 格式，建议文件大小不超过 5MB
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                    建议尺寸
                  </h4>
                  <p className="text-xs" style={{ color: '#aeadaa' }}>
                    客户评价：1024×768px | 设施图片：1024×1024px<br />
                    资质证书：720×1280px | 项目图片：1920×1080px
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                    操作方式
                  </h4>
                  <p className="text-xs" style={{ color: '#aeadaa' }}>
                    点击任意图片区域即可重新上传，上传成功后会立即在网站上显示
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                    注意事项
                  </h4>
                  <p className="text-xs" style={{ color: '#aeadaa' }}>
                    请确保图片内容清晰、版权合规，避免使用模糊或有水印的图片
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <>
            {/* 网站主要文字内容管理 */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8" style={{ backgroundColor: '#ffffff' }}>
              <h2 className="text-xl font-semibold mb-4" style={{ color: '#12110f' }}>
                网站主要文字内容编辑
              </h2>
              <p className="text-sm mb-4" style={{ color: '#aeadaa' }}>
                编辑网站各个部分的主要标题和副标题，修改后点击保存即可在官网实时显示。
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                    主页大标题
                  </label>
                  <input
                    type="text"
                    value={mainTextContent.heroTitle}
                    onChange={(e) => setMainTextContent(prev => ({ ...prev, heroTitle: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: '#aeadaa', backgroundColor: '#f9f8f5', color: '#12110f' }}
                    placeholder="输入主页大标题"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                    公司全称
                  </label>
                  <input
                    type="text"
                    value={mainTextContent.companyFullName}
                    onChange={(e) => setMainTextContent(prev => ({ ...prev, companyFullName: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: '#aeadaa', backgroundColor: '#f9f8f5', color: '#12110f' }}
                    placeholder="输入公司全称"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                    关于我们标题
                  </label>
                  <input
                    type="text"
                    value={mainTextContent.aboutTitle}
                    onChange={(e) => setMainTextContent(prev => ({ ...prev, aboutTitle: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: '#aeadaa', backgroundColor: '#f9f8f5', color: '#12110f' }}
                    placeholder="输入关于我们标题"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                    关于我们描述
                  </label>
                  <textarea
                    rows={3}
                    value={mainTextContent.aboutDescription}
                    onChange={(e) => setMainTextContent(prev => ({ ...prev, aboutDescription: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: '#aeadaa', backgroundColor: '#f9f8f5', color: '#12110f' }}
                    placeholder="输入关于我们描述"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                    客户展示标题
                  </label>
                  <input
                    type="text"
                    value={mainTextContent.testimonialsTitle}
                    onChange={(e) => setMainTextContent(prev => ({ ...prev, testimonialsTitle: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: '#aeadaa', backgroundColor: '#f9f8f5', color: '#12110f' }}
                    placeholder="输入客户展示标题"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                    资质认证标题
                  </label>
                  <input
                    type="text"
                    value={mainTextContent.certificatesTitle}
                    onChange={(e) => setMainTextContent(prev => ({ ...prev, certificatesTitle: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: '#aeadaa', backgroundColor: '#f9f8f5', color: '#12110f' }}
                    placeholder="输入资质认证标题"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                    资质认证副标题
                  </label>
                  <input
                    type="text"
                    value={mainTextContent.certificatesSubtitle}
                    onChange={(e) => setMainTextContent(prev => ({ ...prev, certificatesSubtitle: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: '#aeadaa', backgroundColor: '#f9f8f5', color: '#12110f' }}
                    placeholder="输入资质认证副标题"
                  />
                </div>

  
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                    客户项目标题
                  </label>
                  <input
                    type="text"
                    value={mainTextContent.projectsTitle}
                    onChange={(e) => setMainTextContent(prev => ({ ...prev, projectsTitle: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: '#aeadaa', backgroundColor: '#f9f8f5', color: '#12110f' }}
                    placeholder="输入客户项目标题"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                    客户项目副标题
                  </label>
                  <input
                    type="text"
                    value={mainTextContent.projectsSubtitle}
                    onChange={(e) => setMainTextContent(prev => ({ ...prev, projectsSubtitle: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: '#aeadaa', backgroundColor: '#f9f8f5', color: '#12110f' }}
                    placeholder="输入客户项目副标题"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                    联系我们标题
                  </label>
                  <input
                    type="text"
                    value={mainTextContent.contactTitle}
                    onChange={(e) => setMainTextContent(prev => ({ ...prev, contactTitle: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: '#aeadaa', backgroundColor: '#f9f8f5', color: '#12110f' }}
                    placeholder="输入联系我们标题"
                  />
                </div>

                <button
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      localStorage.setItem('mainTextContent', JSON.stringify(mainTextContent));
                      alert('主要文字内容已保存！');
                      // 通知其他页面更新
                      window.dispatchEvent(new StorageEvent('storage', {
                        key: 'mainTextContent',
                        newValue: JSON.stringify(mainTextContent),
                        oldValue: null
                      }));
                    }
                  }}
                  className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#12110f' }}
                >
                  保存主要文字内容
                </button>
              </div>
            </div>

            {/* 证书内容管理 */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8" style={{ backgroundColor: '#ffffff' }}>
              <h2 className="text-xl font-semibold mb-4" style={{ color: '#12110f' }}>
                证书内容管理
              </h2>
              <p className="text-sm mb-4" style={{ color: '#aeadaa' }}>
                管理公司资质证书信息，包括证书名称、图片和描述。
              </p>

              <div className="space-y-6">
                {certificates.map((certificate) => (
                  <div key={certificate.id} className="border rounded-lg p-4" style={{ borderColor: '#aeadaa' }}>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                            证书名称
                          </label>
                          <input
                            type="text"
                            value={certificate.name}
                            onChange={(e) => {
                              const updated = certificates.map(cert =>
                                cert.id === certificate.id
                                  ? { ...cert, name: e.target.value }
                                  : cert
                              );
                              setCertificates(updated);
                            }}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                            style={{ borderColor: '#aeadaa', backgroundColor: '#f9f8f5', color: '#12110f' }}
                          />
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                            证书描述
                          </label>
                          <textarea
                            rows={3}
                            value={certificate.description}
                            onChange={(e) => {
                              const updated = certificates.map(cert =>
                                cert.id === certificate.id
                                  ? { ...cert, description: e.target.value }
                                  : cert
                              );
                              setCertificates(updated);
                            }}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm resize-none"
                            style={{ borderColor: '#aeadaa', backgroundColor: '#f9f8f5', color: '#12110f' }}
                          />
                        </div>
                      </div>
                      <div className="w-32">
                        <div className="aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden border" style={{ borderColor: '#e5e7eb' }}>
                          <img
                            src={certificate.image}
                            alt={certificate.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = `data:image/svg+xml,%3Csvg width='225' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='225' height='400' fill='%23f9fafb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='Arial' font-size='12' fill='%236b7280'%3E证书图片%3C/text%3E%3C/svg%3E`;
                            }}
                          />
                        </div>
                        <button className="w-full mt-2 px-3 py-1 text-xs border rounded hover:bg-gray-50 transition-colors" style={{ borderColor: '#aeadaa', color: '#12110f' }}>
                          更换图片
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      localStorage.setItem('certificates', JSON.stringify(certificates));
                      alert('证书内容已保存！');
                      // 通知其他页面更新
                      window.dispatchEvent(new StorageEvent('storage', {
                        key: 'certificates',
                        newValue: JSON.stringify(certificates),
                        oldValue: null
                      }));
                    }
                  }}
                  className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#12110f' }}
                >
                  保存证书内容
                </button>
              </div>
            </div>
          </>
        )}

        {/* 使用说明 */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6" style={{ backgroundColor: '#ffffff' }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#12110f' }}>使用说明</h3>
          <div className="space-y-2 text-sm" style={{ color: '#aeadaa' }}>
            <p>1. 添加产品前，请先将产品图片放置在 <code className="px-2 py-1 rounded" style={{ backgroundColor: '#f9f8f5' }}>/public/images/products/</code> 目录中</p>
            <p>2. 图片格式建议使用 JPG 或 PNG，文件名建议使用英文或拼音</p>
            <p>3. 内容会保存在当前浏览器本地存储中，刷新页面数据不会丢失</p>
            <p>4. 访问管理页面的URL是： <code className="px-2 py-1 rounded" style={{ backgroundColor: '#f9f8f5' }}>http://localhost:3001/admin/products</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}