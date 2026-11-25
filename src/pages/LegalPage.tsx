import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { isSupportedLang, SupportedLang } from '../i18n';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'disclaimer';
}

export function LegalPage({ type }: LegalPageProps) {
  const { t, i18n } = useTranslation();
  const lang: SupportedLang = isSupportedLang(i18n.language) ? i18n.language : 'gu';

  const sections = t(`legal.${type}.sections`, { returnObjects: true }) as Array<{
    heading: string;
    body: string;
  }>;

  return (
    <section className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-950 min-h-[65vh] transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={`/${lang}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b2244] dark:text-[#d4a64a] hover:text-[#b8862d] transition-colors mb-6 min-h-[40px]"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>{t('legal.backHome')}</span>
        </Link>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
            {t(`legal.${type}.updated`)}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0b2244] dark:text-white mb-8">
            {t(`legal.${type}.title`)}
          </h1>

          <div className="space-y-6">
            {Array.isArray(sections) &&
              sections.map((sec, idx) => (
                <div key={idx} className="pt-5 border-t border-slate-100 dark:border-slate-800 first:pt-0 first:border-t-0">
                  <h2 className="text-lg font-bold text-[#0b2244] dark:text-white mb-2">
                    {sec.heading}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {sec.body}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
