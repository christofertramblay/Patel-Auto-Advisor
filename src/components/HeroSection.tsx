import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Phone, Mail, Building2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/servicesData';
import { isSupportedLang, SupportedLang } from '../i18n';

interface HeroSectionProps {
  onApplyClick?: () => void;
}

export function HeroSection({ onApplyClick }: HeroSectionProps) {
  const { t, i18n } = useTranslation();
  const [imgError, setImgError] = useState(false);
  const lang: SupportedLang = isSupportedLang(i18n.language) ? i18n.language : 'gu';

  const highlights = t('hero.highlights', { returnObjects: true }) as Array<{
    value: string;
    label: string;
  }>;

  return (
    <section className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Narrative Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#9a6e1f] dark:text-[#d4a64a] mb-3">
              {t('hero.kicker')}
            </p>
            <h1 className="text-[clamp(1.75rem,3.6vw,3.1rem)] font-bold text-[#0b2244] dark:text-white leading-[1.22] tracking-tight mb-4 sm:mb-5">
              {t('hero.title')}
            </h1>
            <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mb-6 sm:mb-8">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
              {onApplyClick ? (
                <button
                  type="button"
                  onClick={onApplyClick}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[46px] text-sm sm:text-base font-semibold text-white bg-[#0b2244] hover:bg-[#133262] dark:bg-[#d4a64a] dark:text-slate-950 dark:hover:bg-[#e2b85b] rounded-xl transition-colors duration-150 cursor-pointer whitespace-nowrap"
                >
                  <span>{t('hero.primaryCta')}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>
              ) : (
                <Link
                  to={`/${lang}/apply`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[46px] text-sm sm:text-base font-semibold text-white bg-[#0b2244] hover:bg-[#133262] dark:bg-[#d4a64a] dark:text-slate-950 dark:hover:bg-[#e2b85b] rounded-xl transition-colors duration-150 whitespace-nowrap"
                >
                  <span>{t('hero.primaryCta')}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </Link>
              )}

              <Link
                to={`/${lang}/services`}
                className="inline-flex items-center justify-center px-5 py-3.5 min-h-[46px] text-sm sm:text-base font-semibold text-[#0b2244] dark:text-slate-100 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl transition-colors duration-150 whitespace-nowrap"
              >
                {t('hero.secondaryCta')}
              </Link>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-sm text-slate-600 dark:text-slate-300">
              <a
                href={`tel:+${BUSINESS_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 font-semibold text-[#0b2244] dark:text-slate-100 hover:text-[#b8862d] dark:hover:text-[#d4a64a] transition-colors tabular-nums min-h-[36px]"
              >
                <Phone className="w-4 h-4 text-[#b8862d] dark:text-[#d4a64a] shrink-0" aria-hidden="true" />
                <span>{t('hero.callDirect')}</span>
              </a>
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="inline-flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300 hover:text-[#0b2244] dark:hover:text-[#d4a64a] transition-colors break-all min-h-[36px]"
              >
                <Mail className="w-4 h-4 text-[#b8862d] dark:text-[#d4a64a] shrink-0" aria-hidden="true" />
                <span>{BUSINESS_INFO.email}</span>
              </a>
            </div>
          </div>

          {/* Right Authentic Office Photograph */}
          <div className="lg:col-span-6 flex flex-col">
            <figure className="relative flex-1 min-h-[240px] sm:min-h-[360px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 shadow-sm">
              {!imgError ? (
                <img
                  src={BUSINESS_INFO.officePhotoPath}
                  alt={t('about.officePhotoAlt')}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-center lg:h-full"
                />
              ) : (
                <div className="w-full h-full min-h-[260px] flex flex-col items-center justify-center p-8 text-center bg-slate-100 dark:bg-slate-900 text-[#0b2244] dark:text-slate-100">
                  <Building2 className="w-12 h-12 text-[#b8862d] mb-3" />
                  <p className="font-bold text-lg">{BUSINESS_INFO.brandName}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{t('hero.officeCaption')}</p>
                </div>
              )}
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-4 sm:px-5 py-3.5 sm:py-4">
                <p className="text-xs sm:text-sm font-medium text-white">
                  {t('hero.officeCaption')}
                </p>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Full-Width 4-Column Trust Highlights Row */}
        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {Array.isArray(highlights) &&
            highlights.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-4 sm:p-5"
              >
                <p className="text-lg sm:text-2xl font-bold text-[#0b2244] dark:text-[#d4a64a] tabular-nums">
                  {item.value}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-snug">
                  {item.label}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
