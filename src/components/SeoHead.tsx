import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGS, SupportedLang } from '../i18n';
import { BUSINESS_INFO } from '../data/servicesData';

interface SeoHeadProps {
  pageKey: 'home' | 'services' | 'apply' | 'documents' | 'about' | 'contact' | 'legal';
  subPath: string;
}

const OG_LOCALE_MAP: Record<SupportedLang, string> = {
  gu: 'gu_IN',
  en: 'en_IN',
  hi: 'hi_IN',
};

function upsertMeta(attrName: 'name' | 'property', attrValue: string, content: string) {
  let el = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    if (hreflang) el.hreflang = hreflang;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function SeoHead({ pageKey, subPath }: SeoHeadProps) {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language as SupportedLang) || 'gu';

  useEffect(() => {
    const title = t(`seo.${pageKey}.title`);
    const description = t(`seo.${pageKey}.description`);
    document.title = title;
    document.documentElement.lang = lang;

    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:locale', OG_LOCALE_MAP[lang] || 'gu_IN');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);

    const origin = window.location.origin;
    const cleanSub = subPath === '/' ? '' : subPath;
    const canonicalUrl = `${origin}/${lang}${cleanSub}`;

    upsertMeta('property', 'og:url', canonicalUrl);
    upsertLink('canonical', canonicalUrl);

    SUPPORTED_LANGS.forEach((l) => {
      upsertLink('alternate', `${origin}/${l}${cleanSub}`, l);
    });
    upsertLink('alternate', `${origin}/gu${cleanSub}`, 'x-default');

    // Sync localized FAQPage + LocalBusiness JSON-LD for search engines
    const faqs = t('faqs.items', { returnObjects: true }) as Array<{ q: string; a: string }>;
    const faqLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: lang,
      mainEntity: Array.isArray(faqs)
        ? faqs.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.a,
            },
          }))
        : [],
    };

    const businessLd = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: BUSINESS_INFO.brandName,
      url: canonicalUrl,
      telephone: `+${BUSINESS_INFO.phoneRaw}`,
      email: BUSINESS_INFO.email,
      hasMap: BUSINESS_INFO.address.mapsQuery,
      description,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1031, 10th Floor, Golden Crown, New 150 Feet Road, Mota Mava',
        addressLocality: 'Rajkot',
        addressRegion: 'Gujarat',
        postalCode: '360005',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: BUSINESS_INFO.coordinates.lat,
        longitude: BUSINESS_INFO.coordinates.lng,
      },
    };

    let ldEl = document.getElementById('dynamic-seo-jsonld') as HTMLScriptElement | null;
    if (!ldEl) {
      ldEl = document.createElement('script');
      ldEl.id = 'dynamic-seo-jsonld';
      ldEl.type = 'application/ld+json';
      document.head.appendChild(ldEl);
    }
    ldEl.textContent = JSON.stringify([businessLd, faqLd]);
  }, [lang, pageKey, subPath, t]);

  return null;
}
