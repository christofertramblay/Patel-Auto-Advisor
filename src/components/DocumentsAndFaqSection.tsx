import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FileCheck,
  ChevronDown,
  Copy,
  Check,
  MessageCircle,
  Wallet,
} from 'lucide-react';
import { BUSINESS_INFO, SERVICES_CATALOG } from '../data/servicesData';
import { buildWhatsAppUrl } from '../utils/whatsapp';

export function DocumentsAndFaqSection() {
  const { t } = useTranslation();
  const [selectedDocService, setSelectedDocService] = useState(SERVICES_CATALOG[0].id);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [upiCopied, setUpiCopied] = useState(false);

  const activeService =
    SERVICES_CATALOG.find((s) => s.id === selectedDocService) || SERVICES_CATALOG[0];

  const faqs = t('faqs.items', { returnObjects: true }) as Array<{
    q: string;
    a: string;
  }>;

  const paymentRules = t('payment.rules', { returnObjects: true }) as string[];

  const handleCopyUpi = async () => {
    try {
      await navigator.clipboard.writeText(BUSINESS_INFO.upiId);
      setUpiCopied(true);
      setTimeout(() => setUpiCopied(false), 2500);
    } catch {
      // Ignore clipboard failures
    }
  };

  return (
    <>
      {/* Required Documents & Online Payment Instructions */}
      <section id="documents" className="py-12 sm:py-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Required Documents Selector */}
            <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-8">
              <p className="text-xs sm:text-sm font-semibold text-[#9a6e1f] dark:text-[#d4a64a] mb-2">
                {t('documents.kicker')}
              </p>
              <h2 className="text-2xl font-bold text-[#0b2244] dark:text-white mb-2">
                {t('documents.title')}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
                {t('documents.subtitle')}
              </p>

              <div className="mb-5">
                <label
                  htmlFor="doc-service-select"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  {t('applicationForm.fields.serviceName')}
                </label>
                <select
                  id="doc-service-select"
                  value={selectedDocService}
                  onChange={(e) => setSelectedDocService(e.target.value)}
                  className="w-full px-3.5 py-2.5 min-h-[44px] text-base sm:text-sm bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0b2244] dark:focus:ring-[#d4a64a]"
                >
                  {SERVICES_CATALOG.map((srv) => (
                    <option key={srv.id} value={srv.id}>
                      {t(`services.items.${srv.id}.name`)}
                    </option>
                  ))}
                </select>
              </div>

              <ul className="space-y-2.5">
                {activeService.docKeys.map((docKey) => (
                  <li
                    key={docKey}
                    className="flex items-start gap-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-200"
                  >
                    <FileCheck
                      className="w-4 h-4 text-[#b8862d] dark:text-[#d4a64a] mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{t(`documents.labels.${docKey}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Online Payment Instructions */}
            <div className="lg:col-span-5 bg-[#0b2244] dark:bg-slate-900 border border-transparent dark:border-slate-800 text-white rounded-2xl p-5 sm:p-8">
              <div className="flex items-center gap-2 text-[#d4a64a] text-xs sm:text-sm font-semibold mb-2">
                <Wallet className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{t('payment.kicker')}</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {t('payment.title')}
              </h2>
              <p className="text-sm text-slate-200 mb-6 leading-relaxed">
                {t('payment.subtitle')}
              </p>

              <div className="bg-white/10 border border-white/15 rounded-xl p-4 mb-5">
                <p className="text-xs text-slate-300 mb-1.5">{t('payment.upiLabel')}</p>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <code className="text-sm font-mono font-semibold text-white break-all min-w-0">
                    {BUSINESS_INFO.upiId}
                  </code>
                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 min-h-[38px] text-xs font-semibold bg-white text-[#0b2244] hover:bg-slate-100 rounded-lg transition-colors shrink-0 cursor-pointer"
                  >
                    {upiCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                        <span>{t('payment.upiCopied')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{t('payment.copyUpi')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200 mb-6">
                {Array.isArray(paymentRules) &&
                  paymentRules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-[#d4a64a] font-bold tabular-nums">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
              </ul>

              <a
                href={buildWhatsAppUrl(t('payment.paymentWhatsappText'))}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[46px] text-sm font-semibold text-white bg-[#15803d] hover:bg-[#166534] rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{t('payment.requestPaymentLink')}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-xs sm:text-sm font-semibold text-[#9a6e1f] dark:text-[#d4a64a] mb-2">
              {t('faqs.kicker')}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0b2244] dark:text-white">
              {t('faqs.title')}
            </h2>
          </div>

          <div className="space-y-3">
            {Array.isArray(faqs) &&
              faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="w-full px-5 py-4 min-h-[52px] text-left flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors cursor-pointer"
                    >
                      <span className="text-sm sm:text-base font-semibold text-[#0b2244] dark:text-white leading-snug">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-500 dark:text-slate-400 shrink-0 transition-transform duration-150 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 pt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}
