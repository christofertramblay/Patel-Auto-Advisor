import { useState, useEffect, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MessageCircle,
  CheckCircle2,
  Copy,
  RotateCcw,
  ShieldAlert,
  AlertCircle,
} from 'lucide-react';
import {
  INDIA_STATES,
  SERVICES_CATALOG,
  ServiceCategoryKey,
} from '../data/servicesData';
import { buildLocalizedWhatsAppMessage, buildWhatsAppUrl } from '../utils/whatsapp';

interface ApplicationFormSectionProps {
  preselectedCategory?: ServiceCategoryKey;
  preselectedServiceId?: string;
  preselectedStateCode?: string;
  preselectedCity?: string;
}

interface FormErrors {
  fullName?: string;
  mobile?: string;
  stateCode?: string;
  city?: string;
  serviceId?: string;
}

export function ApplicationFormSection({
  preselectedCategory,
  preselectedServiceId,
  preselectedStateCode,
  preselectedCity,
}: ApplicationFormSectionProps) {
  const { t, i18n } = useTranslation();

  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [stateCode, setStateCode] = useState(preselectedStateCode || 'GJ');
  const [city, setCity] = useState(preselectedCity || 'Rajkot (GJ-03)');
  const [category, setCategory] = useState<ServiceCategoryKey>(
    preselectedCategory || 'insurance'
  );
  const [serviceId, setServiceId] = useState(preselectedServiceId || 'carInsurance');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const [submittedPayload, setSubmittedPayload] = useState<{
    fullName: string;
    mobile: string;
    stateCode: string;
    city: string;
    category: ServiceCategoryKey;
    serviceId: string;
    vehicleNumber: string;
    notes: string;
  } | null>(null);
  const [copiedMsg, setCopiedMsg] = useState(false);

  useEffect(() => {
    if (preselectedCategory) setCategory(preselectedCategory);
  }, [preselectedCategory]);

  useEffect(() => {
    if (preselectedServiceId) setServiceId(preselectedServiceId);
  }, [preselectedServiceId]);

  useEffect(() => {
    if (preselectedStateCode) setStateCode(preselectedStateCode);
  }, [preselectedStateCode]);

  useEffect(() => {
    if (preselectedCity) setCity(preselectedCity);
  }, [preselectedCity]);

  const currentStateObj =
    INDIA_STATES.find((s) => s.code === stateCode) || INDIA_STATES[0];

  const categoryServices = SERVICES_CATALOG.filter((s) => s.category === category);

  const handleCategoryChange = (newCat: ServiceCategoryKey) => {
    setCategory(newCat);
    const first = SERVICES_CATALOG.find((s) => s.category === newCat);
    if (first) setServiceId(first.id);
  };

  const handleStateChange = (newState: string) => {
    setStateCode(newState);
    const found = INDIA_STATES.find((s) => s.code === newState);
    if (found && found.cities.length > 0) {
      setCity(found.cities[0]);
    } else {
      setCity('');
    }
  };

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      nextErrors.fullName = t('applicationForm.validation.nameRequired');
    }
    const cleanDigits = mobile.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanDigits)) {
      nextErrors.mobile = t('applicationForm.validation.mobileInvalid');
    }
    if (!stateCode) {
      nextErrors.stateCode = t('applicationForm.validation.stateRequired');
    }
    if (!city.trim()) {
      nextErrors.city = t('applicationForm.validation.cityRequired');
    }
    if (!serviceId) {
      nextErrors.serviceId = t('applicationForm.validation.serviceRequired');
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmittedPayload({
      fullName: fullName.trim(),
      mobile: mobile.replace(/\D/g, ''),
      stateCode,
      city: city.trim(),
      category,
      serviceId,
      vehicleNumber: vehicleNumber.trim(),
      notes: notes.trim(),
    });
    setCopiedMsg(false);
  };

  const generatedMessage = submittedPayload
    ? buildLocalizedWhatsAppMessage(t, {
        fullName: submittedPayload.fullName,
        mobile: submittedPayload.mobile,
        stateName: t(`states.${submittedPayload.stateCode}`),
        city: submittedPayload.city,
        categoryName: t(`services.categories.${submittedPayload.category}`),
        serviceName: t(`services.items.${submittedPayload.serviceId}.name`),
        vehicleNumber: submittedPayload.vehicleNumber,
        notes: submittedPayload.notes,
      })
    : '';

  const generatedWhatsAppUrl = generatedMessage ? buildWhatsAppUrl(generatedMessage) : '#';

  const handleCopyMessage = async () => {
    if (!generatedMessage) return;
    try {
      await navigator.clipboard.writeText(generatedMessage);
      setCopiedMsg(true);
      setTimeout(() => setCopiedMsg(false), 2500);
    } catch {
      // Fallback ignored
    }
  };

  const handleReset = () => {
    setSubmittedPayload(null);
    setErrors({});
    setCopiedMsg(false);
  };

  const inputClass = (hasError?: string) =>
    `w-full px-3.5 py-2.5 min-h-[44px] text-base sm:text-sm bg-white dark:bg-slate-950 border rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0b2244] dark:focus:ring-[#d4a64a] ${
      hasError ? 'border-red-500 dark:border-red-400' : 'border-slate-300 dark:border-slate-700'
    }`;

  return (
    <section id="apply-online" className="py-12 sm:py-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="text-xs sm:text-sm font-semibold text-[#9a6e1f] dark:text-[#d4a64a] mb-2">
            {t('applicationForm.kicker')}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0b2244] dark:text-white leading-tight mb-3">
            {t('applicationForm.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {t('applicationForm.subtitle')}
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-8">
          {submittedPayload ? (
            <div className="space-y-5" data-lang={i18n.language}>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-700 dark:text-emerald-400 mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="text-xl font-bold text-[#0b2244] dark:text-white">
                    {t('applicationForm.confirmation.title')}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                    {t('applicationForm.confirmation.subtitle')}
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 overflow-hidden">
                <pre className="whitespace-pre-wrap break-words font-sans text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                  {generatedMessage}
                </pre>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={generatedWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[46px] text-sm sm:text-base font-semibold text-white bg-[#15803d] hover:bg-[#166534] rounded-xl transition-colors"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>{t('applicationForm.confirmation.openWhatsAppAgain')}</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-[46px] text-sm font-semibold text-[#0b2244] dark:text-slate-100 bg-white dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl transition-colors cursor-pointer"
                >
                  <Copy className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>
                    {copiedMsg
                      ? t('applicationForm.confirmation.copied')
                      : t('applicationForm.confirmation.copyMessage')}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 min-h-[46px] text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-[#0b2244] dark:hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{t('applicationForm.resetButton')}</span>
                </button>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2 pt-2">
                <ShieldAlert className="w-4 h-4 text-[#b8862d] dark:text-[#d4a64a] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{t('applicationForm.manualSendNotice')}</span>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* Full Name */}
                <div>
                  <label htmlFor="app-name" className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                    {t('applicationForm.fields.fullName')} *
                  </label>
                  <input
                    id="app-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                    }}
                    placeholder={t('applicationForm.fields.fullNamePlaceholder')}
                    className={inputClass(errors.fullName)}
                  />
                  {errors.fullName && (
                    <p className="mt-1.5 text-xs text-red-700 dark:text-red-400 flex items-center gap-1" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Mobile */}
                <div>
                  <label htmlFor="app-mobile" className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                    {t('applicationForm.fields.mobile')} *
                  </label>
                  <input
                    id="app-mobile"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value.replace(/\D/g, '').slice(0, 10));
                      if (errors.mobile) setErrors({ ...errors, mobile: undefined });
                    }}
                    placeholder={t('applicationForm.fields.mobilePlaceholder')}
                    className={`${inputClass(errors.mobile)} tabular-nums`}
                  />
                  {errors.mobile && (
                    <p className="mt-1.5 text-xs text-red-700 dark:text-red-400 flex items-center gap-1" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.mobile}</span>
                    </p>
                  )}
                </div>

                {/* State */}
                <div>
                  <label htmlFor="app-state" className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                    {t('applicationForm.fields.state')} *
                  </label>
                  <select
                    id="app-state"
                    value={stateCode}
                    onChange={(e) => handleStateChange(e.target.value)}
                    className={inputClass()}
                  >
                    {INDIA_STATES.map((st) => (
                      <option key={st.code} value={st.code}>
                        {t(`states.${st.code}`)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City / RTO */}
                <div>
                  <label htmlFor="app-city" className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                    {t('applicationForm.fields.city')} *
                  </label>
                  <input
                    id="app-city"
                    list="city-suggestions"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      if (errors.city) setErrors({ ...errors, city: undefined });
                    }}
                    placeholder={t('applicationForm.fields.cityPlaceholder')}
                    className={inputClass(errors.city)}
                  />
                  <datalist id="city-suggestions">
                    {currentStateObj.cities.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                  {errors.city && (
                    <p className="mt-1.5 text-xs text-red-700 dark:text-red-400 flex items-center gap-1" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.city}</span>
                    </p>
                  )}
                </div>

                {/* Service Category */}
                <div>
                  <label htmlFor="app-category" className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                    {t('applicationForm.fields.serviceCategory')} *
                  </label>
                  <select
                    id="app-category"
                    value={category}
                    onChange={(e) => handleCategoryChange(e.target.value as ServiceCategoryKey)}
                    className={inputClass()}
                  >
                    <option value="insurance">{t('services.categories.insurance')}</option>
                    <option value="rto">{t('services.categories.rto')}</option>
                    <option value="forms">{t('services.categories.forms')}</option>
                  </select>
                </div>

                {/* Specific Service */}
                <div>
                  <label htmlFor="app-service" className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                    {t('applicationForm.fields.serviceName')} *
                  </label>
                  <select
                    id="app-service"
                    value={serviceId}
                    onChange={(e) => {
                      setServiceId(e.target.value);
                      if (errors.serviceId) setErrors({ ...errors, serviceId: undefined });
                    }}
                    className={inputClass(errors.serviceId)}
                  >
                    {categoryServices.map((srv) => (
                      <option key={srv.id} value={srv.id}>
                        {t(`services.items.${srv.id}.name`)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Vehicle Number */}
              <div>
                <label htmlFor="app-vehicle" className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                  {t('applicationForm.fields.vehicleNumber')}
                </label>
                <input
                  id="app-vehicle"
                  type="text"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                  placeholder={t('applicationForm.fields.vehiclePlaceholder')}
                  className={`${inputClass()} uppercase placeholder:normal-case`}
                />
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="app-notes" className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                  {t('applicationForm.fields.notes')}
                </label>
                <textarea
                  id="app-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t('applicationForm.fields.notesPlaceholder')}
                  className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0b2244] dark:focus:ring-[#d4a64a]"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[46px] text-sm sm:text-base font-semibold text-white bg-[#15803d] hover:bg-[#166534] rounded-xl transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>{t('applicationForm.submitButton')}</span>
                </button>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
                  {t('applicationForm.privacyNotice')}
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
