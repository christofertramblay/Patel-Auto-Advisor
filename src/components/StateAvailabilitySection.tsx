import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { INDIA_STATES } from '../data/servicesData';

interface StateAvailabilitySectionProps {
  onSelectLocation: (stateCode: string, city: string) => void;
}

export function StateAvailabilitySection({ onSelectLocation }: StateAvailabilitySectionProps) {
  const { t } = useTranslation();
  const [selectedState, setSelectedState] = useState('GJ');
  const currentStateObj =
    INDIA_STATES.find((s) => s.code === selectedState) || INDIA_STATES[0];
  const [selectedCity, setSelectedCity] = useState(currentStateObj.cities[0]);

  const handleStateChange = (newCode: string) => {
    setSelectedState(newCode);
    const nextState = INDIA_STATES.find((s) => s.code === newCode);
    if (nextState && nextState.cities.length > 0) {
      setSelectedCity(nextState.cities[0]);
    } else {
      setSelectedCity('');
    }
  };

  return (
    <section className="py-12 sm:py-14 bg-[#0b2244] dark:bg-slate-900 text-white border-b border-transparent dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <p className="text-xs sm:text-sm font-semibold text-[#d4a64a] mb-2">
              {t('stateAvailability.kicker')}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-3 text-white">
              {t('stateAvailability.title')}
            </h2>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-5">
              {t('stateAvailability.subtitle')}
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-200">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#d4a64a] shrink-0" aria-hidden="true" />
                {t('stateAvailability.gujaratBadge')}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#d4a64a] shrink-0" aria-hidden="true" />
                {t('stateAvailability.panIndiaAvailable')}
              </span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-transparent dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="avail-state"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    {t('stateAvailability.selectState')}
                  </label>
                  <select
                    id="avail-state"
                    value={selectedState}
                    onChange={(e) => handleStateChange(e.target.value)}
                    className="w-full px-3 py-2.5 min-h-[44px] text-base sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0b2244] dark:focus:ring-[#d4a64a]"
                  >
                    {INDIA_STATES.map((st) => (
                      <option key={st.code} value={st.code}>
                        {t(`states.${st.code}`)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="avail-city"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    {t('stateAvailability.selectCity')}
                  </label>
                  <select
                    id="avail-city"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-3 py-2.5 min-h-[44px] text-base sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0b2244] dark:focus:ring-[#d4a64a]"
                  >
                    {currentStateObj.cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-start gap-2 text-xs sm:text-sm text-emerald-800 dark:text-emerald-400 font-medium">
                  <MapPin className="w-4 h-4 text-emerald-700 dark:text-emerald-400 mt-0.5 shrink-0" aria-hidden="true" />
                  <span>
                    {t(`states.${selectedState}`)} ({selectedCity}) — {t('stateAvailability.statusText')}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectLocation(selectedState, selectedCity)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[44px] text-xs sm:text-sm font-semibold text-white bg-[#0b2244] hover:bg-[#133262] dark:bg-[#d4a64a] dark:text-slate-950 dark:hover:bg-[#e2b85b] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>{t('stateAvailability.proceedWithLocation')}</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
