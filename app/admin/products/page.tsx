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
interface KnowledgeContent {
  id: string;
  title: string;
  category: string;
  image: string;
  content: string;
  createdAt: string;
  isPublished: boolean;
}

export default function AdminProductsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [knowledgeContent, setKnowledgeContent] = useState<KnowledgeContent[]>([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingKnowledge, setIsAddingKnowledge] = useState(false);
  const [editingKnowledge, setEditingKnowledge] = useState<KnowledgeContent | null>(null);
  const [activeTab, setActiveTab] = useState<'products' | 'knowledge'>('products');

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

  // 新知识内容表单状态
  const [newKnowledge, setNewKnowledge] = useState<Partial<KnowledgeContent>>({
    title: '',
    category: '选购指南',
    image: '',
    content: '',
    isPublished: true
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

      // 加载知识内容
      const savedKnowledge = localStorage.getItem('knowledgeContent');
      if (savedKnowledge) {
        try {
          setKnowledgeContent(JSON.parse(savedKnowledge));
        } catch (error) {
          console.error('Failed to load knowledge content from localStorage:', error);
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

  // 知识内容管理功能
  const saveKnowledgeToStorage = (knowledgeList: KnowledgeContent[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('knowledgeContent', JSON.stringify(knowledgeList));
    }
  };

  const handleAddKnowledge = () => {
    if (newKnowledge.title && newKnowledge.content) {
      const knowledge: KnowledgeContent = {
        id: `kc-${Date.now()}`,
        title: newKnowledge.title,
        category: newKnowledge.category || '选购指南',
        image: newKnowledge.image || '/images/knowledge/default.jpg',
        content: newKnowledge.content,
        createdAt: new Date().toISOString().split('T')[0],
        isPublished: newKnowledge.isPublished || true
      };

      const updatedKnowledge = [...knowledgeContent, knowledge];
      setKnowledgeContent(updatedKnowledge);
      saveKnowledgeToStorage(updatedKnowledge);
      resetKnowledgeForm();
      setIsAddingKnowledge(false);
    }
  };

  const handleUpdateKnowledge = () => {
    if (editingKnowledge) {
      const updatedKnowledge = knowledgeContent.map(k => k.id === editingKnowledge.id ? editingKnowledge : k);
      setKnowledgeContent(updatedKnowledge);
      saveKnowledgeToStorage(updatedKnowledge);
      setEditingKnowledge(null);
      resetKnowledgeForm();
    }
  };

  const handleDeleteKnowledge = (id: string) => {
    if (confirm('确定要删除这篇知识内容吗？')) {
      const updatedKnowledge = knowledgeContent.filter(k => k.id !== id);
      setKnowledgeContent(updatedKnowledge);
      saveKnowledgeToStorage(updatedKnowledge);
    }
  };

  const resetKnowledgeForm = () => {
    setNewKnowledge({
      title: '',
      category: '选购指南',
      image: '',
      content: '',
      isPublished: true
    });
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
          <p style={{ color: '#aeadaa' }}>加载中...</p>
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
              {activeTab === 'products' && (
                <button
                  onClick={() => setIsAddingProduct(true)}
                  className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#12110f' }}
                >
                  添加新产品
                </button>
              )}
              {activeTab === 'knowledge' && (
                <button
                  onClick={() => setIsAddingKnowledge(true)}
                  className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#12110f' }}
                >
                  添加知识内容
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
              onClick={() => setActiveTab('knowledge')}
              className={`px-6 py-3 font-medium transition-all ${
                activeTab === 'knowledge'
                  ? 'border-b-2'
                  : 'hover:opacity-70'
              }`}
              style={{
                borderColor: activeTab === 'knowledge' ? '#12110f' : 'transparent',
                color: activeTab === 'knowledge' ? '#12110f' : '#aeadaa'
              }}
            >
              知识中心
            </button>
          </div>
        </div>

        {/* 根据选中的标签显示不同内容 */}
        {activeTab === 'products' ? (
          <>
            {/* 滑动卡片图片管理 */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8" style={{ backgroundColor: '#ffffff' }}>
              <h2 className="text-xl font-semibold mb-4" style={{ color: '#12110f' }}>
                滑动展示图片管理
              </h2>
              <p className="text-sm mb-4" style={{ color: '#aeadaa' }}>
                这些图片将显示在产品列表页面的滑动展示区域
              </p>
              <div className="flex gap-4 flex-wrap">
                {['hero-background.png', 'showcase-1.jpg', 'showcase-2.jpg', 'showcase-3.jpg'].map((imageName, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div className="relative">
                      <img
                        src={`/images/${imageName}`}
                        alt={imageName}
                        className="w-24 h-24 object-cover rounded-lg shadow-md"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/placeholder-product.svg';
                        }}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const fileName = `showcase-${index + 1}.${file.name.split('.').pop()}`;
                            // 在实际项目中，这里应该上传文件到服务器
                            // 现在只是演示，显示选择的文件名
                            alert(`已选择文件: ${fileName}\n请手动将文件复制到 /public/images/ 目录中并重命名为 ${fileName}`);
                          }
                        }}
                        className="absolute top-0 right-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                    <p className="text-xs text-center" style={{ color: '#aeadaa' }}>
                      {imageName}
                    </p>
                  </div>
                ))}
                <div className="flex flex-col items-center gap-2">
                  <button className="w-24 h-24 rounded-lg border-2 border-dashed flex items-center justify-center hover:opacity-90 transition-opacity" style={{ borderColor: '#aeadaa', color: '#12110f' }}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                  <p className="text-xs text-center" style={{ color: '#aeadaa' }}>
                    添加图片
                  </p>
                </div>
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
        ) : (
          <>
            {/* 知识内容管理 */}
            {/* 添加知识内容表单 */}
            {(isAddingKnowledge || editingKnowledge) && (
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8" style={{ backgroundColor: '#ffffff' }}>
                <h2 className="text-2xl font-semibold mb-6" style={{ color: '#12110f' }}>
                  {isAddingKnowledge ? '添加知识内容' : '编辑知识内容'}
                </h2>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                        标题 *
                      </label>
                      <input
                        type="text"
                        value={isAddingKnowledge ? (newKnowledge.title || '') : (editingKnowledge?.title || '')}
                        onChange={(e) => {
                          if (isAddingKnowledge) {
                            setNewKnowledge({ ...newKnowledge, title: e.target.value });
                          } else if (editingKnowledge) {
                            setEditingKnowledge({ ...editingKnowledge, title: e.target.value });
                          }
                        }}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                        style={{ borderColor: '#aeadaa', backgroundColor: '#f9f8f5', color: '#12110f' }}
                        placeholder="请输入标题"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                        分类
                      </label>
                      <select
                        value={isAddingKnowledge ? (newKnowledge.category || '选购指南') : (editingKnowledge?.category || '选购指南')}
                        onChange={(e) => {
                          if (isAddingKnowledge) {
                            setNewKnowledge({ ...newKnowledge, category: e.target.value });
                          } else if (editingKnowledge) {
                            setEditingKnowledge({ ...editingKnowledge, category: e.target.value });
                          }
                        }}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                        style={{ borderColor: '#aeadaa', backgroundColor: '#f9f8f5', color: '#12110f' }}
                      >
                        <option value="选购指南">选购指南</option>
                        <option value="安装指南">安装指南</option>
                        <option value="保养维护">保养维护</option>
                        <option value="产品介绍">产品介绍</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                      封面图片
                    </label>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={isAddingKnowledge ? (newKnowledge.image || '') : (editingKnowledge?.image || '')}
                        onChange={(e) => {
                          if (isAddingKnowledge) {
                            setNewKnowledge({ ...newKnowledge, image: e.target.value });
                          } else if (editingKnowledge) {
                            setEditingKnowledge({ ...editingKnowledge, image: e.target.value });
                          }
                        }}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                        style={{ borderColor: '#aeadaa', backgroundColor: '#f9f8f5', color: '#12110f' }}
                        placeholder="/images/knowledge/article-title.jpg"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const fileName = file.name;
                              const imagePath = `/images/knowledge/${fileName}`;
                              if (isAddingKnowledge) {
                                setNewKnowledge({ ...newKnowledge, image: imagePath });
                              } else if (editingKnowledge) {
                                setEditingKnowledge({ ...editingKnowledge, image: imagePath });
                              }
                            }
                          }}
                          className="hidden"
                          id="knowledge-image-upload"
                        />
                        <label
                          htmlFor="knowledge-image-upload"
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
                        注意：请先将图片文件手动复制到 /public/images/knowledge/ 目录中
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#12110f' }}>
                      内容 *
                    </label>
                    <textarea
                      rows={12}
                      value={isAddingKnowledge ? (newKnowledge.content || '') : (editingKnowledge?.content || '')}
                      onChange={(e) => {
                        if (isAddingKnowledge) {
                          setNewKnowledge({ ...newKnowledge, content: e.target.value });
                        } else if (editingKnowledge) {
                          setEditingKnowledge({ ...editingKnowledge, content: e.target.value });
                        }
                      }}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                      style={{ borderColor: '#aeadaa', backgroundColor: '#f9f8f5', color: '#12110f' }}
                      placeholder="请输入内容，支持Markdown格式&#10;&#10;例如：&#10;# 标题&#10;## 子标题&#10;内容描述&#10;- 列表项&#10;1. 有序列表项"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isAddingKnowledge ? (newKnowledge.isPublished || false) : (editingKnowledge?.isPublished || false)}
                        onChange={(e) => {
                          if (isAddingKnowledge) {
                            setNewKnowledge({ ...newKnowledge, isPublished: e.target.checked });
                          } else if (editingKnowledge) {
                            setEditingKnowledge({ ...editingKnowledge, isPublished: e.target.checked });
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-sm font-medium" style={{ color: '#12110f' }}>
                        发布到知识中心
                      </span>
                    </label>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={isAddingKnowledge ? handleAddKnowledge : handleUpdateKnowledge}
                      className="px-6 py-2 text-white rounded-lg hover:opacity-90 transition-opacity font-semibold"
                      style={{ backgroundColor: '#12110f' }}
                    >
                      {isAddingKnowledge ? '发布内容' : '更新内容'}
                    </button>
                    <button
                      onClick={() => {
                        setIsAddingKnowledge(false);
                        setEditingKnowledge(null);
                        resetKnowledgeForm();
                      }}
                      className="px-6 py-2 rounded-lg hover:opacity-90 transition-opacity font-semibold border-2"
                      style={{ borderColor: '#aeadaa', color: '#12110f', backgroundColor: 'transparent' }}
                    >
                      取消
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 知识内容列表 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
              <div className="p-6 border-b" style={{ borderColor: '#aeadaa' }}>
                <h2 className="text-xl font-semibold" style={{ color: '#12110f' }}>
                  知识内容列表
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead style={{ backgroundColor: '#f9f8f5' }}>
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: '#12110f' }}>标题</th>
                      <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: '#12110f' }}>分类</th>
                      <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: '#12110f' }}>创建时间</th>
                      <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: '#12110f' }}>状态</th>
                      <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: '#12110f' }}>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {knowledgeContent.map((knowledge) => (
                      <tr key={knowledge.id} className="border-t" style={{ borderColor: '#aeadaa' }}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                              <img
                                src={knowledge.image}
                                alt={knowledge.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = '/images/placeholder-product.svg';
                                }}
                              />
                            </div>
                            <div>
                              <div className="font-medium" style={{ color: '#12110f' }}>{knowledge.title}</div>
                              <div className="text-sm truncate max-w-xs" style={{ color: '#aeadaa' }}>
                                {knowledge.content.replace(/[#*]/g, '').substring(0, 50)}...
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className="px-2 py-1 text-xs font-medium rounded-full"
                            style={{ backgroundColor: '#f9f8f5', color: '#12110f' }}
                          >
                            {knowledge.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm" style={{ color: '#aeadaa' }}>{knowledge.createdAt}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              knowledge.isPublished ? '' : 'opacity-60'
                            }`}
                            style={{
                              backgroundColor: knowledge.isPublished ? '#d4edda' : '#f8d7da',
                              color: knowledge.isPublished ? '#155724' : '#721c24'
                            }}
                          >
                            {knowledge.isPublished ? '已发布' : '草稿'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditingKnowledge(knowledge);
                                setIsAddingKnowledge(false);
                              }}
                              className="px-3 py-1 text-white rounded hover:opacity-90 transition-opacity text-sm"
                              style={{ backgroundColor: '#007bff' }}
                            >
                              编辑
                            </button>
                            <button
                              onClick={() => handleDeleteKnowledge(knowledge.id)}
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

              {knowledgeContent.length === 0 && (
                <div className="text-center py-12">
                  <p style={{ color: '#aeadaa' }}>暂无知识内容，点击上方"添加知识内容"按钮添加内容</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* 使用说明 */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6" style={{ backgroundColor: '#ffffff' }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#12110f' }}>使用说明</h3>
          <div className="space-y-2 text-sm" style={{ color: '#aeadaa' }}>
            <p>1. 添加产品前，请先将产品图片放置在 <code className="px-2 py-1 rounded" style={{ backgroundColor: '#f9f8f5' }}>/public/images/products/</code> 目录中</p>
            <p>2. 添加知识内容前，请先将图片放置在 <code className="px-2 py-1 rounded" style={{ backgroundColor: '#f9f8f5' }}>/public/images/knowledge/</code> 目录中</p>
            <p>3. 图片格式建议使用 JPG 或 PNG，文件名建议使用英文或拼音</p>
            <p>4. 内容会保存在当前浏览器本地存储中，刷新页面数据不会丢失</p>
            <p>5. 访问管理页面的URL是： <code className="px-2 py-1 rounded" style={{ backgroundColor: '#f9f8f5' }}>http://localhost:3001/admin/products</code></p>
            <p>6. 访问知识中心的URL是： <code className="px-2 py-1 rounded" style={{ backgroundColor: '#f9f8f5' }}>http://localhost:3001/knowledge</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}