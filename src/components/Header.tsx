import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, Menu, X, MessageCircle, Sun, Moon } from 'lucide-react';
import { BUSINESS_INFO } from '../data/servicesData';
import { SupportedLang, isSupportedLang } from '../i18n';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { ThemeMode } from '../hooks/useTheme';

const LANG_OPTIONS: { code: SupportedLang; label: string; short: string }[] = [
  { code: 'gu', label: 'ગુજરાતી', short: 'ગુજ' },
  { code: 'en', label: 'English', short: 'ENG' },
  { code: 'hi', label: 'हिंदी', short: 'हिं' },
];

interface HeaderProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const currentLang: SupportedLang = isSupportedLang(i18n.language) ? i18n.language : 'gu';

  const getCleanSubPath = () => {
    const parts = location.pathname.split('/').filter(Boolean);
    if (parts.length > 0 && isSupportedLang(parts[0])) {
      const rest = parts.slice(1).join('/');
      return rest ? `/${rest}` : '';
    }
    return location.pathname === '/' ? '' : location.pathname;
  };

  const buildLocalizedPath = (sub: string, targetLang: SupportedLang = currentLang) => {
    const normalizedSub = sub === '/' ? '' : sub;
    return `/${targetLang}${normalizedSub}`;
  };

  const handleLanguageChange = (newLang: SupportedLang) => {
    if (newLang === currentLang) return;
    i18n.changeLanguage(newLang);
    const subPath = getCleanSubPath();
    navigate(`/${newLang}${subPath}`, { replace: false });
  };

  const navItems = [
    { label: t('nav.home'), to: buildLocalizedPath('/') },
    { label: t('nav.services'), to: buildLocalizedPath('/services') },
    { label: t('nav.apply'), to: buildLocalizedPath('/apply') },
    { label: t('nav.documents'), to: buildLocalizedPath('/documents') },
    { label: t('nav.contact'), to: buildLocalizedPath('/contact') },
  ];

  const isActive = (to: string) => {
    const current = location.pathname === '/' ? `/${currentLang}` : location.pathname;
    return current === to;
  };

  const quickWhatsAppHref = buildWhatsAppUrl(
    `${t('applicationForm.whatsappTemplate.greeting')} ${t('applicationForm.whatsappTemplate.intro')}`
  );

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
        {/* Zone 1: Original Brand Logo */}
        <Link
          to={buildLocalizedPath('/')}
          className="flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2244] dark:focus-visible:ring-[#d4a64a] rounded-lg dark:bg-white dark:px-2 dark:py-0.5"
          aria-label="Patel Auto Advisors"
        >
          <img
            src={BUSINESS_INFO.logoHeaderPath}
            alt="Patel Auto Advisors"
            className="h-9 sm:h-12 w-auto object-contain"
          />
        </Link>

        {/* Zone 2: Concise Single-Line Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700 dark:text-slate-200" aria-label="Main Navigation">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`whitespace-nowrap shrink-0 py-1.5 border-b-2 transition-colors duration-150 ${
                isActive(item.to)
                  ? 'border-[#b8862d] dark:border-[#d4a64a] text-[#0b2244] dark:text-white font-semibold'
                  : 'border-transparent hover:text-[#0b2244] dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Zone 3: Language Switcher + Dark Mode Toggle + Primary Action */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Visible Language Switcher on Desktop & Mobile */}
          <div
            className="inline-flex items-center bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-0.5"
            role="group"
            aria-label={t('nav.languageLabel')}
          >
            <Globe className="w-3.5 h-3.5 text-[#0b2244] dark:text-[#d4a64a] ml-1.5 mr-1 hidden sm:block shrink-0" aria-hidden="true" />
            {LANG_OPTIONS.map((opt) => {
              const active = currentLang === opt.code;
              return (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => handleLanguageChange(opt.code)}
                  className={`px-1.5 sm:px-2.5 py-1 text-[11px] sm:text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#0b2244] dark:bg-[#d4a64a] text-white dark:text-slate-950 shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:text-[#0b2244] dark:hover:text-white hover:bg-white/70 dark:hover:bg-slate-800'
                  }`}
                  aria-pressed={active}
                >
                  <span className="hidden sm:inline">{opt.label}</span>
                  <span className="sm:hidden">{opt.short}</span>
                </button>
              );
            })}
          </div>

          {/* Dark Mode Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-[#d4a64a] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            aria-label={theme === 'dark' ? t('nav.lightMode') : t('nav.darkMode')}
            title={theme === 'dark' ? t('nav.lightMode') : t('nav.darkMode')}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Moon className="w-4 h-4" aria-hidden="true" />
            )}
          </button>

          <a
            href={quickWhatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#15803d] hover:bg-[#166534] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{t('nav.ctaWhatsApp')}</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            aria-label={mobileOpen ? t('nav.menuClose') : t('nav.menuOpen')}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 px-4 py-4 space-y-2 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" aria-hidden="true" />
              {t('nav.languageLabel')}
            </span>
            <div className="flex items-center gap-1.5">
              {LANG_OPTIONS.map((opt) => {
                const active = currentLang === opt.code;
                return (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => {
                      handleLanguageChange(opt.code);
                      setMobileOpen(false);
                    }}
                    className={`px-3 py-1.5 min-h-[36px] text-xs font-medium rounded-md border transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#0b2244] dark:bg-[#d4a64a] text-white dark:text-slate-950 border-[#0b2244] dark:border-[#d4a64a]'
                        : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {[
              ...navItems,
              { label: t('nav.about'), to: buildLocalizedPath('/about') },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-3 min-h-[44px] flex items-center rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.to)
                    ? 'bg-slate-100 dark:bg-slate-900 text-[#0b2244] dark:text-[#d4a64a] font-semibold'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900/60'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="pt-2 flex items-center gap-2">
            <a
              href={quickWhatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] text-sm font-semibold text-white bg-[#15803d] hover:bg-[#166534] rounded-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>{t('nav.ctaWhatsApp')}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
