import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'navigation': {
        'home': 'Home',
        'about': 'About',
        'services': 'Services',
        'contact': 'Contact'
      },
      'home': {
        'hero': {
          'title': 'Premium Kitchen & Bathroom Solutions',
          'description': 'Transform your space with our minimalist kitchen and bathroom designs. Quality craftsmanship meets modern functionality.',
          'cta': 'Get Started'
        }
      },
      'about': {
        'title': 'About Our Company',
        'description': 'We are a leading provider of premium kitchen and bathroom solutions, specializing in minimalist designs that combine aesthetics with functionality.',
        'team': {
          'title': 'Our Expert Team',
          'description': 'With years of experience in kitchen and bathroom design, our team brings your vision to life with precision and care.'
        }
      },
      'services': {
        'title': 'Our Services',
        'kitchen': {
          'title': 'Kitchen Design',
          'description': 'Custom kitchen solutions that maximize space and functionality while maintaining a clean, minimalist aesthetic.'
        },
        'bathroom': {
          'title': 'Bathroom Renovation',
          'description': 'Modern bathroom designs that create a spa-like atmosphere with efficient use of space.'
        }
      },
      'contact': {
        'title': 'Contact Us',
        'form': {
          'name': 'Name',
          'email': 'Email',
          'message': 'Message',
          'submit': 'Send Message'
        },
        'info': {
          'address': '123 Kitchen Street, Design District',
          'phone': '+1 (555) 123-4567',
          'email': 'contact@kitchenbath.com'
        }
      },
      'products': {
        'title': 'Products',
        'subtitle': 'Premium Floor Drain Solutions',
        'hero': {
          'title': 'Premium Floor Drain Solutions',
          'subtitle': 'Professional OEM/ODM Manufacturing',
          'description': '15+ years of expertise in stainless steel floor drain manufacturing. ISO9001 certified factory with monthly capacity of 100,000+ pieces.',
          'capabilities': [
            '15+ Years Manufacturing Experience',
            'ISO9001 Quality Certified',
            '100,000+ pcs/month Capacity',
            'Custom OEM/ODM Solutions'
          ]
        },
        'filters': {
          'category': 'Category',
          'material': 'Material',
          'scenario': 'Scenario',
          'size': 'Size',
          'surface': 'Surface Treatment',
          'search': 'Search products...',
          'reset': 'Reset Filters'
        },
        'categories': {
          'all': 'All',
          'anti-odor': 'Anti-Odor',
          'invisible': 'Invisible',
          'linear': 'Linear Drain',
          'decorative': 'Decorative'
        },
        'materials': {
          'all': 'All',
          'stainless': 'Stainless Steel',
          'brass': 'Brass',
          'abs': 'ABS Plastic'
        },
        'scenarios': {
          'all': 'All',
          'bathroom': 'Bathroom',
          'kitchen': 'Kitchen',
          'balcony': 'Balcony',
          'public': 'Public Space'
        },
        'sizes': {
          'all': 'All',
          'small': 'Small (≤100mm)',
          'medium': 'Medium (100-150mm)',
          'large': 'Large (≥150mm)'
        },
        'surfaces': {
          'all': 'All',
          'brushed': 'Brushed',
          'polished': 'Polished',
          'matte': 'Matte',
          'plated': 'Plated'
        },
        'product': {
          'features': 'Features',
          'specs': 'Specifications',
          'applications': 'Applications',
          'inStock': 'In Stock',
          'oemAvailable': 'OEM Available',
          'quickView': 'Quick View',
          'addToCart': 'Add to Cart',
          'getQuote': 'Get Quote'
        },
        'notFound': 'No products found matching your criteria.',
        'loading': 'Loading products...'
      }
    }
  },
  zh: {
    translation: {
      'navigation': {
        'home': '首页',
        'about': '关于',
        'services': '服务',
        'contact': '联系我们'
      },
      'home': {
        'hero': {
          'title': '优质厨卫解决方案',
          'description': '通过我们的极简主义厨房和浴室设计改造您的空间。精湛工艺与现代功能的完美结合。',
          'cta': '开始使用'
        }
      },
      'about': {
        'title': '关于我们',
        'description': '我们是优质厨房和浴室解决方案的领先提供商，专注于将美学与功能性相结合的极简主义设计。',
        'team': {
          'title': '我们的专业团队',
          'description': '凭借在厨房和浴室设计方面的多年经验，我们的团队以精准和专业将您的愿景变为现实。'
        }
      },
      'services': {
        'title': '我们的服务',
        'kitchen': {
          'title': '厨房设计',
          'description': '定制厨房解决方案，在保持干净、极简美学的同时最大化空间和功能性。'
        },
        'bathroom': {
          'title': '浴室翻新',
          'description': '现代浴室设计，通过高效利用空间营造水疗般的氛围。'
        }
      },
      'contact': {
        'title': '联系我们',
        'form': {
          'name': '姓名',
          'email': '邮箱',
          'message': '留言',
          'submit': '发送消息'
        },
        'info': {
          'address': '设计区厨房街123号',
          'phone': '+1 (555) 123-4567',
          'email': 'contact@kitchenbath.com'
        }
      },
      'products': {
        'title': '产品',
        'subtitle': '优质地漏解决方案',
        'hero': {
          'title': '优质地漏解决方案',
          'subtitle': '专业OEM/ODM制造',
          'description': '15多年不锈钢地漏制造专业经验。ISO9001认证工厂，月产能10万+件。',
          'capabilities': [
            '15年以上制造经验',
            'ISO9001质量认证',
            '月产能10万+件',
            '定制OEM/ODM解决方案'
          ]
        },
        'filters': {
          'category': '分类',
          'material': '材质',
          'scenario': '场景',
          'size': '尺寸',
          'surface': '表面处理',
          'search': '搜索产品...',
          'reset': '重置筛选'
        },
        'categories': {
          'all': '全部',
          'anti-odor': '防臭地漏',
          'invisible': '隐形地漏',
          'linear': '线性排水',
          'decorative': '装饰地漏'
        },
        'materials': {
          'all': '全部',
          'stainless': '不锈钢',
          'brass': '黄铜',
          'abs': 'ABS塑料'
        },
        'scenarios': {
          'all': '全部',
          'bathroom': '浴室',
          'kitchen': '厨房',
          'balcony': '阳台',
          'public': '公共场所'
        },
        'sizes': {
          'all': '全部',
          'small': '小型 (≤100mm)',
          'medium': '中型 (100-150mm)',
          'large': '大型 (≥150mm)'
        },
        'surfaces': {
          'all': '全部',
          'brushed': '拉丝',
          'polished': '抛光',
          'matte': '哑光',
          'plated': '镀层'
        },
        'product': {
          'features': '特点',
          'specs': '规格',
          'applications': '应用',
          'inStock': '现货供应',
          'oemAvailable': '可OEM',
          'quickView': '快速查看',
          'addToCart': '加入购物车',
          'getQuote': '获取报价'
        },
        'notFound': '未找到符合条件的产品。',
        'loading': '加载产品中...'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;