'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LanguageSwitch from '../../components/LanguageSwitch';

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

// 默认知识内容
const defaultKnowledgeContent: KnowledgeContent[] = [
  {
    id: 'kc-001',
    title: '地漏选择指南',
    category: '选购指南',
    image: '/images/knowledge/selection-guide.jpg',
    content: `# 地漏选择指南

## 1. 材质选择
- **304不锈钢**：防腐蚀、耐磨损、使用寿命长
- **ABS工程塑料**：轻便、耐腐蚀、经济实惠
- **铜质镀金**：美观大方、抗菌性能好

## 2. 形状选择
- **圆形**：适合大多数装修风格，安装简便
- **方形**：现代简约风格，排水面积更大

## 3. 颜色搭配
- **银色**：现代感强，适合各种装修风格
- **黑色**：高端大气，彰显品质
- **金色**：豪华典雅，提升空间档次

## 4. 安装位置
- **浴室**：选择防臭功能好的地漏
- **厨房**：选择排水速度快的地漏
- **阳台**：选择防堵性能好的地漏`,
    createdAt: '2024-01-01',
    isPublished: true
  },
  {
    id: 'kc-002',
    title: '地漏安装步骤',
    category: '安装指南',
    image: '/images/knowledge/installation-steps.jpg',
    content: `# 地漏安装步骤

## 准备工作
1. 确认地漏尺寸和排水管尺寸匹配
2. 准备必要的工具：密封胶、水平尺、螺丝刀
3. 清理排水管道，确保无堵塞

## 安装步骤
1. **定位标记**：在地面标出地漏安装位置
2. **切割开孔**：根据地漏尺寸切割地面
3. **安装排水管**：连接排水管和地漏主体
4. **固定地漏**：使用密封胶固定地漏
5. **调整水平**：确保地漏表面水平
6. **测试排水**：测试排水功能是否正常

## 注意事项
- 安装前确保地面干燥清洁
- 使用质量可靠的密封胶
- 安装后24小时内避免使用`,
    createdAt: '2024-01-02',
    isPublished: true
  },
  {
    id: 'kc-003',
    title: '地漏日常保养',
    category: '保养维护',
    image: '/images/knowledge/maintenance-tips.jpg',
    content: `# 地漏日常保养

## 日常清洁
1. **定期清理**：每周清理一次地漏表面的杂物
2. **深度清洁**：每月使用专业清洁剂进行深度清洁
3. **毛刷清洁**：使用软毛刷清理地漏内部的污垢

## 预防措施
- 避免将头发等杂物直接冲入地漏
- 定期检查地漏的防臭功能是否正常
- 及时清理地漏周围的水垢

## 常见问题处理
- **异味问题**：检查防臭芯是否需要更换
- **排水缓慢**：清理地漏内部的堵塞物
- **噪音问题**：检查地漏是否安装牢固

## 专业维护
建议每半年请专业人员进行一次全面检查和维护。`,
    createdAt: '2024-01-03',
    isPublished: true
  }
];

export default function KnowledgeCenterPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [knowledgeContent, setKnowledgeContent] = useState<KnowledgeContent[]>(defaultKnowledgeContent);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeContent | null>(null);

  // 从localStorage加载知识内容
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedContent = localStorage.getItem('knowledgeContent');
      if (savedContent) {
        try {
          setKnowledgeContent(JSON.parse(savedContent));
        } catch (error) {
          console.error('Failed to load knowledge content from localStorage:', error);
        }
      }
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 筛选内容
  const filteredContent = knowledgeContent.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch && article.isPublished;
  });

  const categories = ['all', ...Array.from(new Set(knowledgeContent.map(item => item.category)))];

  const handleArticleClick = (article: KnowledgeContent) => {
    setSelectedArticle(article);
  };

  const closeArticle = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9f8f5' }}>
      {/* 顶部导航栏 */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4" style={{ backgroundColor: 'rgba(249, 248, 245, 0.95)', backdropFilter: 'blur(10px)' }}>
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#12110f', color: '#f9f8f5' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          {mounted ? '返回主页' : ''}
        </button>

        <LanguageSwitch />
      </div>

      {/* 页面标题 */}
      <section className="relative py-20 overflow-hidden" style={{ marginTop: '60px' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: '#12110f' }}>
            知识中心
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl" style={{ color: '#aeadaa' }}>
            专业的地漏知识、选购指南和维护保养技巧
          </p>
        </div>
      </section>

      {/* 搜索和筛选 */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8" style={{ backgroundColor: '#ffffff' }}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  placeholder="搜索知识内容..."
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
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                  style={{
                    borderColor: '#aeadaa',
                    backgroundColor: '#f9f8f5',
                    color: '#12110f'
                  }}
                >
                  <option value="all">所有分类</option>
                  {categories.slice(1).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 内容列表 */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredContent.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                onClick={() => handleArticleClick(article)}
              >
                <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/placeholder-product.svg';
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="px-3 py-1 text-xs font-semibold rounded-full"
                      style={{ backgroundColor: '#f9f8f5', color: '#12110f' }}
                    >
                      {article.category}
                    </span>
                    <span className="text-sm" style={{ color: '#aeadaa' }}>
                      {article.createdAt}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: '#12110f' }}>
                    {article.title}
                  </h3>
                  <p className="text-sm line-clamp-3" style={{ color: '#aeadaa' }}>
                    {article.content.replace(/[#*]/g, '').substring(0, 150)}...
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filteredContent.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#12110f' }}>
                没有找到相关内容
              </h3>
              <p style={{ color: '#aeadaa' }}>
                请尝试调整筛选条件或搜索关键词
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 文章详情弹窗 */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center" style={{ borderColor: '#aeadaa' }}>
              <div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: '#12110f' }}>
                  {selectedArticle.title}
                </h2>
                <div className="flex items-center gap-4">
                  <span
                    className="px-3 py-1 text-sm font-semibold rounded-full"
                    style={{ backgroundColor: '#f9f8f5', color: '#12110f' }}
                  >
                    {selectedArticle.category}
                  </span>
                  <span className="text-sm" style={{ color: '#aeadaa' }}>
                    {selectedArticle.createdAt}
                  </span>
                </div>
              </div>
              <button
                onClick={closeArticle}
                className="p-2 rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#f9f8f5', color: '#12110f' }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-8">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-8">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/placeholder-product.svg';
                  }}
                />
              </div>

              <div className="prose prose-lg max-w-none" style={{ color: '#12110f' }}>
                {selectedArticle.content.split('\n').map((line, index) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={index} className="text-3xl font-bold mt-8 mb-4" style={{ color: '#12110f' }}>{line.substring(2)}</h1>;
                  } else if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-2xl font-semibold mt-6 mb-3" style={{ color: '#12110f' }}>{line.substring(3)}</h2>;
                  } else if (line.startsWith('- **')) {
                    return <li key={index} className="ml-4" style={{ color: '#aeadaa' }}>{line.replace(/[-*]/g, '').trim()}</li>;
                  } else if (line.startsWith('1. **')) {
                    return <li key={index} className="ml-4 mb-2" style={{ color: '#aeadaa' }}>{line.replace(/^\d+\.\s*/, '').trim()}</li>;
                  } else if (line.trim() !== '') {
                    return <p key={index} className="mb-4" style={{ color: '#aeadaa' }}>{line}</p>;
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}