import { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const i18n = require('../next-i18next.config');

const languages = ['en', 'zh', 'es', 'fr'];

export default function DynamicPage() {
  const { t } = useTranslation('common');
  const router = useRouter();

  useEffect(() => {
    // 从 localStorage 获取语言偏好
    const savedLocale = localStorage.getItem('preferred-locale') || 'en';

    // 如果 URL 中没有语言参数，重定向到带语言参数的 URL
    if (!router.query.lang && router.pathname === '/') {
      router.replace(`/${savedLocale}`);
    }
  }, [router]);

  return null; // 这个页面主要处理语言重定向
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};