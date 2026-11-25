import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Car,
  Bike,
  Truck,
  ArrowLeftRight,
  Receipt,
  ShieldCheck,
  BookOpenCheck,
  FileCheck2,
  Copy,
  BadgeCheck,
  CreditCard,
  MapPin,
  ClipboardCheck,
  FileText,
  Search,
  MessageCircle,
  ChevronRight,
} from 'lucide-react';
import { SERVICES_CATALOG, ServiceCategoryKey, ServiceItem } from '../data/servicesData';

interface ServicesSectionProps {
  onSelectService: (category: ServiceCategoryKey, serviceId: string) => void;
  compact?: boolean;
}

const ICON_MAP = {
  Car,
  Bike,
  Truck,
  ArrowLeftRight,
  Receipt,
  ShieldCheck,
  BookOpenCheck,
  FileCheck2,
  Copy,
  BadgeCheck,
  CreditCard,
  MapPin,
  ClipboardCheck,
  FileText,
};

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<'all' | ServiceCategoryKey>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { key: 'all' | ServiceCategoryKey; label: string }[] = [
    { key: 'all', label: t('services.filterAll') },
    { key: 'insurance', label: t('services.categories.insurance') },
    { key: 'rto', label: t('services.categories.rto') },
    { key: 'forms', label: t('services.categories.forms') },
  ];

  const filteredServices = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return SERVICES_CATALOG.filter((item) => {
      const matchesCat = activeCategory === 'all' || item.category === activeCategory;
      if (!matchesCat) return false;
      if (!q) return true;
      const name = t(`services.items.${item.id}.name`).toLowerCase();
      const desc = t(`services.items.${item.id}.shortDesc`).toLowerCase();
      const cat = t(`services.categories.${item.category}`).toLowerCase();
      return name.includes(q) || desc.includes(q) || cat.includes(q);
    });
  }, [activeCategory, searchQuery, t]);

  const renderCard = (item: ServiceItem, index: number) => {
    const IconComp = ICON_MAP[item.iconName];
    const docNames = item.docKeys
      .slice(0, 3)
      .map((k) => t(`documents.labels.${k}`))
      .join(' · ');

    return (
      <article
        key={item.id}
        className="flex flex-col justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 hover:border-[#b8862d]/70 dark:hover:border-[#d4a64a]/60 transition-colors duration-150"
      >
        <div>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#0b2244]/5 dark:bg-[#d4a64a]/15 border border-[#0b2244]/10 dark:border-[#d4a64a]/25 flex items-center justify-center text-[#0b2244] dark:text-[#d4a64a] shrink-0">
              <IconComp className="w-5 h-5" aria-hidden="true" />
            </div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 tabular-nums text-right">
              {String(index + 1).padStart(2, '0')} · {t(`services.categories.${item.category}`)}
            </span>
          </div>

          <h3 className="text-lg font-bold text-[#0b2244] dark:text-white leading-snug mb-2">
            {t(`services.items.${item.id}.name`)}
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            {t(`services.items.${item.id}.shortDesc`)}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            <span className="font-semibold text-slate-700 dark:text-slate-200">{t('services.docsNeededLabel')}: </span>
            <span>{docNames}</span>
          </div>

          <div className="flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span>
              {t(`services.items.${item.id}.turnaround`)} · {t('services.badgePanIndia')}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onSelectService(item.category, item.id)}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] text-sm font-semibold text-[#0b2244] dark:text-slate-100 bg-slate-50 dark:bg-slate-800 hover:bg-[#0b2244] hover:text-white dark:hover:bg-[#d4a64a] dark:hover:text-slate-950 border border-slate-200 dark:border-slate-700 hover:border-[#0b2244] dark:hover:border-[#d4a64a] rounded-lg transition-colors duration-150 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{t('services.applyThisService')}</span>
            <ChevronRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </button>
        </div>
      </article>
    );
  };

  return (
    <section id="services" className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <p className="text-xs sm:text-sm font-semibold text-[#9a6e1f] dark:text-[#d4a64a] mb-2">
            {t('services.sectionKicker')}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0b2244] dark:text-white leading-tight mb-3">
            {t('services.sectionTitle')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {t('services.sectionSubtitle')}
          </p>
        </div>

        {/* Category Filter Tabs + Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div
            className="flex flex-wrap items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 rounded-xl"
            role="tablist"
            aria-label={t('services.sectionKicker')}
          >
            {categories.map((cat) => {
              const active = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-3.5 py-2 min-h-[40px] text-xs sm:text-sm font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#0b2244] dark:bg-[#d4a64a] text-white dark:text-slate-950'
                      : 'text-slate-600 dark:text-slate-300 hover:text-[#0b2244] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-80">
            <Search
              className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('services.searchPlaceholder')}
              aria-label={t('services.searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2.5 min-h-[44px] text-base sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0b2244] dark:focus:ring-[#d4a64a]"
            />
          </div>
        </div>

        {/* Category Description Strip when filtered */}
        {activeCategory !== 'all' && (
          <div className="mb-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-4 text-sm text-slate-700 dark:text-slate-300">
            <span className="font-semibold text-[#0b2244] dark:text-[#d4a64a]">
              {t(`services.categories.${activeCategory}`)}:{' '}
            </span>
            <span>{t(`services.categoryDescriptions.${activeCategory}`)}</span>
          </div>
        )}

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredServices.map((item, idx) => renderCard(item, idx))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center">
            <p className="text-slate-600 dark:text-slate-300 mb-4">{t('services.noResults')}</p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2.5 min-h-[44px] text-sm font-semibold text-white bg-[#0b2244] dark:bg-[#d4a64a] dark:text-slate-950 rounded-lg hover:bg-[#133262] transition-colors cursor-pointer"
            >
              {t('services.viewAllServices')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
