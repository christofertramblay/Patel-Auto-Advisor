import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Building2, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/servicesData';

export function AboutOfficeSection() {
  const { t } = useTranslation();
  const [imgError, setImgError] = useState(false);

  const whyPoints = t('about.whyPoints', { returnObjects: true }) as Array<{
    title: string;
    desc: string;
  }>;

  return (
    <section id="about" className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Authentic Office Photo & Full Original Logo */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            <div className="bg-white border border-slate-200 dark:border-slate-700 rounded-2xl p-4 sm:p-5 flex items-center justify-center">
              <img
                src={BUSINESS_INFO.logoFullPath}
                alt="Patel Auto Advisors — 28 Years of Trusted Service"
                className="max-h-32 sm:max-h-36 w-auto object-contain"
              />
            </div>

            <figure className="relative flex-1 min-h-[240px] sm:min-h-[260px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              {!imgError ? (
                <img
                  src={BUSINESS_INFO.officePhotoPath}
                  alt={t('about.officePhotoAlt')}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-center lg:h-full"
                />
              ) : (
                <div className="w-full h-full min-h-[260px] flex flex-col items-center justify-center p-8 text-center">
                  <Building2 className="w-10 h-10 text-[#b8862d] mb-2" />
                  <p className="font-bold text-[#0b2244] dark:text-white">{t('about.officePhotoAlt')}</p>
                </div>
              )}
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 py-3">
                <p className="text-xs font-medium text-white">
                  {t('about.officePhotoAlt')}
                </p>
              </figcaption>
            </figure>
          </div>

          {/* Story & Why Choose Us */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-xs sm:text-sm font-semibold text-[#9a6e1f] dark:text-[#d4a64a] mb-2">
              {t('about.kicker')}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0b2244] dark:text-white leading-tight mb-3">
              {t('about.title')}
            </h2>
            <p className="text-base font-medium text-slate-800 dark:text-slate-100 mb-4 leading-relaxed">
              {t('about.subtitle')}
            </p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {t('about.body1')}
            </p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
              {t('about.body2')}
            </p>

            <h3 className="text-lg font-bold text-[#0b2244] dark:text-white mb-4">
              {t('about.whyTitle')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.isArray(whyPoints) &&
                whyPoints.map((pt, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4"
                  >
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="w-4 h-4 text-[#b8862d] dark:text-[#d4a64a] mt-1 shrink-0"
                        aria-hidden="true"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-[#0b2244] dark:text-white leading-snug mb-1">
                          {pt.title}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {pt.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
