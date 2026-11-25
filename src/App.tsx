import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { StateAvailabilitySection } from './components/StateAvailabilitySection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { AboutOfficeSection } from './components/AboutOfficeSection';
import { DocumentsAndFaqSection } from './components/DocumentsAndFaqSection';
import { ApplicationFormSection } from './components/ApplicationFormSection';
import { ContactSection, Footer } from './components/ContactAndFooter';
import { SeoHead } from './components/SeoHead';
import { LegalPage } from './pages/LegalPage';
import { ServiceCategoryKey } from './data/servicesData';
import { isSupportedLang, SupportedLang } from './i18n';
import { useTheme } from './hooks/useTheme';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

function LanguageRouteSync({ children }: { children: React.ReactNode }) {
  const { lang } = useParams<{ lang?: string }>();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang && isSupportedLang(lang) && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return <>{children}</>;
}

function HomePage() {
  const [preCategory, setPreCategory] = useState<ServiceCategoryKey | undefined>();
  const [preServiceId, setPreServiceId] = useState<string | undefined>();
  const [preState, setPreState] = useState<string | undefined>();
  const [preCity, setPreCity] = useState<string | undefined>();

  const scrollToForm = () => {
    const el = document.getElementById('apply-online');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectService = (cat: ServiceCategoryKey, serviceId: string) => {
    setPreCategory(cat);
    setPreServiceId(serviceId);
    scrollToForm();
  };

  const handleSelectLocation = (stateCode: string, city: string) => {
    setPreState(stateCode);
    setPreCity(city);
    scrollToForm();
  };

  return (
    <>
      <SeoHead pageKey="home" subPath="/" />
      <HeroSection onApplyClick={scrollToForm} />
      <ServicesSection onSelectService={handleSelectService} />
      <StateAvailabilitySection onSelectLocation={handleSelectLocation} />
      <HowItWorksSection />
      <AboutOfficeSection />
      <ApplicationFormSection
        preselectedCategory={preCategory}
        preselectedServiceId={preServiceId}
        preselectedStateCode={preState}
        preselectedCity={preCity}
      />
      <DocumentsAndFaqSection />
      <ContactSection />
    </>
  );
}

function ServicesPage() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const lang: SupportedLang = isSupportedLang(i18n.language) ? i18n.language : 'gu';

  return (
    <>
      <SeoHead pageKey="services" subPath="/services" />
      <ServicesSection
        onSelectService={(cat, serviceId) => {
          navigate(`/${lang}/apply?cat=${cat}&service=${serviceId}`);
        }}
      />
      <StateAvailabilitySection
        onSelectLocation={(stateCode, city) => {
          navigate(`/${lang}/apply?state=${stateCode}&city=${encodeURIComponent(city)}`);
        }}
      />
    </>
  );
}

function ApplyPage() {
  const [searchParams] = useSearchParams();
  const catParam = searchParams.get('cat') as ServiceCategoryKey | null;
  const serviceParam = searchParams.get('service') || undefined;
  const stateParam = searchParams.get('state') || undefined;
  const cityParam = searchParams.get('city') || undefined;

  const validCat =
    catParam === 'insurance' || catParam === 'rto' || catParam === 'forms'
      ? catParam
      : undefined;

  return (
    <>
      <SeoHead pageKey="apply" subPath="/apply" />
      <ApplicationFormSection
        preselectedCategory={validCat}
        preselectedServiceId={serviceParam}
        preselectedStateCode={stateParam}
        preselectedCity={cityParam}
      />
      <HowItWorksSection />
    </>
  );
}

function DocumentsPage() {
  return (
    <>
      <SeoHead pageKey="documents" subPath="/documents" />
      <DocumentsAndFaqSection />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <SeoHead pageKey="about" subPath="/about" />
      <AboutOfficeSection />
      <HowItWorksSection />
    </>
  );
}

function ContactPage() {
  return (
    <>
      <SeoHead pageKey="contact" subPath="/contact" />
      <ContactSection />
    </>
  );
}

function LegalRoutePage({ type }: { type: 'privacy' | 'terms' | 'disclaimer' }) {
  const sub =
    type === 'privacy'
      ? '/privacy-policy'
      : type === 'terms'
        ? '/terms'
        : '/disclaimer';
  return (
    <>
      <SeoHead pageKey="legal" subPath={sub} />
      <LegalPage type={type} />
    </>
  );
}

function AppShell() {
  const { theme, toggleTheme } = useTheme();
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  useEffect(() => {
    const handler = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handler);
    return () => window.removeEventListener('gmp-quota-exceeded', handler);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <ScrollToTop />
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/apply" element={<ApplyPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<LegalRoutePage type="privacy" />} />
          <Route path="/terms" element={<LegalRoutePage type="terms" />} />
          <Route path="/disclaimer" element={<LegalRoutePage type="disclaimer" />} />

          <Route
            path="/:lang"
            element={
              <LanguageRouteSync>
                <HomePage />
              </LanguageRouteSync>
            }
          />
          <Route
            path="/:lang/services"
            element={
              <LanguageRouteSync>
                <ServicesPage />
              </LanguageRouteSync>
            }
          />
          <Route
            path="/:lang/apply"
            element={
              <LanguageRouteSync>
                <ApplyPage />
              </LanguageRouteSync>
            }
          />
          <Route
            path="/:lang/documents"
            element={
              <LanguageRouteSync>
                <DocumentsPage />
              </LanguageRouteSync>
            }
          />
          <Route
            path="/:lang/about"
            element={
              <LanguageRouteSync>
                <AboutPage />
              </LanguageRouteSync>
            }
          />
          <Route
            path="/:lang/contact"
            element={
              <LanguageRouteSync>
                <ContactPage />
              </LanguageRouteSync>
            }
          />
          <Route
            path="/:lang/privacy-policy"
            element={
              <LanguageRouteSync>
                <LegalRoutePage type="privacy" />
              </LanguageRouteSync>
            }
          />
          <Route
            path="/:lang/terms"
            element={
              <LanguageRouteSync>
                <LegalRoutePage type="terms" />
              </LanguageRouteSync>
            }
          />
          <Route
            path="/:lang/disclaimer"
            element={
              <LanguageRouteSync>
                <LegalRoutePage type="disclaimer" />
              </LanguageRouteSync>
            }
          />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
