import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';
import { BUSINESS_INFO } from '../data/servicesData';
import { isSupportedLang, SupportedLang } from '../i18n';

const MAPS_API_KEY = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined) || '';

function GoldenCrownMarker() {
  const { t } = useTranslation();
  const [infoOpen, setInfoOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={BUSINESS_INFO.coordinates}
        onClick={() => setInfoOpen((prev) => !prev)}
        title={t('contact.mapMarkerTitle')}
      >
        <Pin
          background="#0b2244"
          borderColor="#b8862d"
          glyphColor="#ffffff"
          scale={1.2}
        />
      </AdvancedMarker>
      {infoOpen && marker && (
        <InfoWindow
          anchor={marker}
          maxWidth={260}
          onCloseClick={() => setInfoOpen(false)}
        >
          <div className="p-1 text-slate-900">
            <p className="font-bold text-sm text-[#0b2244]">
              {BUSINESS_INFO.brandName}
            </p>
            <p className="text-xs text-slate-600 mt-1 leading-snug">
              {t('contact.mapSubtitle')}
            </p>
            <a
              href={BUSINESS_INFO.address.mapsQuery}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#0b2244] underline mt-2"
            >
              <span>{t('contact.getDirections')}</span>
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

export function OfficeMapBox() {
  const { t, i18n } = useTranslation();
  const lang: SupportedLang = isSupportedLang(i18n.language) ? i18n.language : 'gu';

  const embedSrc = `https://maps.google.com/maps?q=Golden+Crown,+Mota+Mava,+Rajkot+360005/@${BUSINESS_INFO.coordinates.lat},${BUSINESS_INFO.coordinates.lng}&ll=${BUSINESS_INFO.coordinates.lat},${BUSINESS_INFO.coordinates.lng}&z=16&hl=${lang}&output=embed`;

  return (
    <div className="mt-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
      <div className="px-5 py-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#0b2244] dark:bg-[#d4a64a] text-white dark:text-slate-950 flex items-center justify-center shrink-0 mt-0.5">
            <MapPin className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#0b2244] dark:text-white leading-snug">
              {t('contact.mapTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
              {t('contact.mapSubtitle')}
            </p>
          </div>
        </div>

        <a
          href={BUSINESS_INFO.address.mapsQuery}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#0b2244] hover:bg-[#133262] dark:bg-[#d4a64a] dark:text-slate-950 dark:hover:bg-[#e2b85b] rounded-xl transition-colors whitespace-nowrap shrink-0 min-h-[44px]"
        >
          <Navigation className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{t('contact.getDirections')}</span>
        </a>
      </div>

      <div className="w-full h-[320px] sm:h-[380px] relative bg-slate-200 dark:bg-slate-800">
        {MAPS_API_KEY ? (
          <APIProvider apiKey={MAPS_API_KEY} libraries={['marker']} language={lang} region="IN">
            <Map
              mapId="DEMO_MAP_ID"
              defaultCenter={BUSINESS_INFO.coordinates}
              defaultZoom={16}
              gestureHandling="cooperative"
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              style={{ width: '100%', height: '100%' }}
            >
              <GoldenCrownMarker />
            </Map>
          </APIProvider>
        ) : (
          <iframe
            title={t('contact.mapTitle')}
            src={embedSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full border-0"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}
