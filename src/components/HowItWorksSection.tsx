import { useTranslation } from 'react-i18next';

export function HowItWorksSection() {
  const { t } = useTranslation();
  const steps = t('howItWorks.steps', { returnObjects: true }) as Array<{
    step: string;
    title: string;
    desc: string;
  }>;

  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8 sm:mb-10">
          <p className="text-xs sm:text-sm font-semibold text-[#9a6e1f] dark:text-[#d4a64a] mb-2">
            {t('howItWorks.kicker')}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0b2244] dark:text-white leading-tight mb-3">
            {t('howItWorks.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {Array.isArray(steps) &&
            steps.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col"
              >
                <span className="text-2xl font-bold text-[#b8862d] dark:text-[#d4a64a] tabular-nums mb-3">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-[#0b2244] dark:text-white mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
