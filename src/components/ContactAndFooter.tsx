import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Clock, ExternalLink, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/servicesData';
import { isSupportedLang, SupportedLang } from '../i18n';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { OfficeMapBox } from './OfficeMapBox';

export function ContactSection() {
  const { t } = useTranslation();

  const quickWaUrl = buildWhatsAppUrl(
    `${t('applicationForm.whatsappTemplate.greeting')} ${t('applicationForm.whatsappTemplate.intro')}`
  );

  return (
    <section id="contact" className="py-12 sm:py-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8 sm:mb-10">
          <p className="text-xs sm:text-sm font-semibold text-[#9a6e1f] dark:text-[#d4a64a] mb-2">
            {t('contact.kicker')}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0b2244] dark:text-white mb-3">
            {t('contact.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {/* Office Address */}
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#0b2244] dark:bg-[#d4a64a] text-white dark:text-slate-950 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-[#0b2244] dark:text-white mb-2">
                {t('contact.addressTitle')}
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {t('contact.addressLine1')}
                <br />
                {t('contact.addressLine2')}
                <br />
                {t('contact.addressCity')}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800">
              <a
                href={BUSINESS_INFO.address.mapsQuery}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0b2244] dark:text-[#d4a64a] hover:text-[#b8862d] transition-colors min-h-[36px]"
              >
                <span>{t('contact.openMaps')}</span>
                <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Phone & WhatsApp */}
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#0b2244] dark:bg-[#d4a64a] text-white dark:text-slate-950 flex items-center justify-center mb-4">
                <Phone className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-[#0b2244] dark:text-white mb-2">
                {t('contact.phoneTitle')}
              </h3>
              <p className="text-lg sm:text-xl font-bold text-[#0b2244] dark:text-white tabular-nums mb-1">
                {BUSINESS_INFO.phoneDisplay}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('hero.kicker')}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2">
              <a
                href={`tel:+${BUSINESS_INFO.phoneRaw}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs sm:text-sm font-semibold text-[#0b2244] dark:text-slate-100 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Phone className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{t('contact.callNow')}</span>
              </a>
              <a
                href={quickWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs sm:text-sm font-semibold text-white bg-[#15803d] hover:bg-[#166534] rounded-lg transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{t('contact.chatWhatsApp')}</span>
              </a>
            </div>
          </div>

          {/* Official Email */}
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#0b2244] dark:bg-[#d4a64a] text-white dark:text-slate-950 flex items-center justify-center mb-4">
                <Mail className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-[#0b2244] dark:text-white mb-2">
                {t('contact.emailTitle')}
              </h3>
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="text-sm font-semibold text-[#0b2244] dark:text-slate-100 hover:text-[#b8862d] dark:hover:text-[#d4a64a] break-all transition-colors"
              >
                {BUSINESS_INFO.email}
              </a>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800">
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs sm:text-sm font-semibold text-[#0b2244] dark:text-slate-100 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{t('contact.sendEmail')}</span>
              </a>
            </div>
          </div>

          {/* Working Hours */}
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#0b2244] dark:bg-[#d4a64a] text-white dark:text-slate-950 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-[#0b2244] dark:text-white mb-2">
                {t('contact.hoursTitle')}
              </h3>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed mb-2">
                {t('contact.hoursValue')}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {t('contact.hoursSub')}
              </p>
            </div>
          </div>
        </div>

        {/* Golden Crown Rajkot Google Map Box */}
        <OfficeMapBox />
      </div>
    </section>
  );
}

export function Footer() {
  const { t, i18n } = useTranslation();
  const lang: SupportedLang = isSupportedLang(i18n.language) ? i18n.language : 'gu';

  const to = (sub: string) => (sub === '/' ? `/${lang}` : `/${lang}${sub}`);

  return (
    <footer className="bg-[#071731] dark:bg-slate-950 text-slate-200 border-t border-transparent dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          {/* Original Brand Card */}
          <div className="lg:col-span-4 space-y-3.5">
            <Link
              to={to('/')}
              className="inline-block bg-white rounded-xl p-3 border border-slate-200"
              aria-label="Patel Auto Advisors"
            >
              <img
                src={BUSINESS_INFO.logoHeaderPath}
                alt="Patel Auto Advisors"
                className="h-11 sm:h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              {t('footer.tagline')}
            </p>
            <div className="space-y-1 text-sm">
              <p className="font-semibold text-[#d4a64a] tabular-nums">
                <a href={`tel:+${BUSINESS_INFO.phoneRaw}`} className="hover:underline">
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </p>
              <p className="text-slate-300 break-all">
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white hover:underline">
                  {BUSINESS_INFO.email}
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-white mb-4">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to={to('/')} className="hover:text-white transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to={to('/services')} className="hover:text-white transition-colors">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link to={to('/apply')} className="hover:text-white transition-colors">
                  {t('nav.apply')}
                </Link>
              </li>
              <li>
                <Link to={to('/documents')} className="hover:text-white transition-colors">
                  {t('nav.documents')}
                </Link>
              </li>
              <li>
                <Link to={to('/about')} className="hover:text-white transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to={to('/contact')} className="hover:text-white transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Categories */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-white mb-4">
              {t('footer.serviceCategories')}
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to={to('/services')} className="hover:text-white transition-colors">
                  {t('services.categories.insurance')}
                </Link>
              </li>
              <li>
                <Link to={to('/services')} className="hover:text-white transition-colors">
                  {t('services.categories.rto')}
                </Link>
              </li>
              <li>
                <Link to={to('/services')} className="hover:text-white transition-colors">
                  {t('services.categories.forms')}
                </Link>
              </li>
              <li className="pt-2 text-xs text-slate-400 leading-relaxed">
                <a
                  href={BUSINESS_INFO.address.mapsQuery}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {t('contact.addressLine1')} {t('contact.addressLine2')} {t('contact.addressCity')}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-white mb-4">
              {t('footer.legalLinks')}
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to={to('/privacy-policy')} className="hover:text-white transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to={to('/terms')} className="hover:text-white transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link to={to('/disclaimer')} className="hover:text-white transition-colors">
                  {t('footer.disclaimer')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-center sm:text-left">{t('footer.copyright')}</p>
          <div className="flex items-center gap-4">
            <Link to="/gu" onClick={() => i18n.changeLanguage('gu')} className="hover:text-white">
              ગુજરાતી
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/en" onClick={() => i18n.changeLanguage('en')} className="hover:text-white">
              English
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/hi" onClick={() => i18n.changeLanguage('hi')} className="hover:text-white">
              हिंदी
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
