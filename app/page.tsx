'use client';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('home.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {t('home.hero.description')}
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            {t('home.hero.cta')}
          </button>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium">
              {t('navigation.home')}
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium">
              {t('navigation.about')}
            </a>
            <a href="#services" className="text-gray-700 hover:text-blue-600 font-medium">
              {t('navigation.services')}
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">
              {t('navigation.contact')}
            </a>
          </nav>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            {t('about.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-600 mb-8">
                {t('about.description')}
              </p>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">
                  {t('about.team.title')}
                </h3>
                <p className="text-gray-700">
                  {t('about.team.description')}
                </p>
              </div>
            </div>
            <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-lg">Kitchen Image</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            {t('services.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                {t('services.kitchen.title')}
              </h3>
              <p className="text-gray-600">
                {t('services.kitchen.description')}
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                {t('services.bathroom.title')}
              </h3>
              <p className="text-gray-600">
                {t('services.bathroom.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            {t('contact.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  {t('contact.form.submit')}
                </button>
              </form>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-6 text-gray-900">Contact Information</h3>
              <div className="space-y-4">
                <p className="text-gray-600">
                  <strong>Address:</strong> {t('contact.info.address')}
                </p>
                <p className="text-gray-600">
                  <strong>Phone:</strong> {t('contact.info.phone')}
                </p>
                <p className="text-gray-600">
                  <strong>Email:</strong> {t('contact.info.email')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};