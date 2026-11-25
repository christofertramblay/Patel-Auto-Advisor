export type ServiceCategoryKey = 'insurance' | 'rto' | 'forms';

export interface ServiceItem {
  id: string;
  category: ServiceCategoryKey;
  featuredOnSignboard?: boolean;
  iconName:
    | 'Car'
    | 'Bike'
    | 'Truck'
    | 'ArrowLeftRight'
    | 'Receipt'
    | 'ShieldCheck'
    | 'BookOpenCheck'
    | 'FileCheck2'
    | 'Copy'
    | 'BadgeCheck'
    | 'CreditCard'
    | 'MapPin'
    | 'ClipboardCheck'
    | 'FileText';
  panIndia: boolean;
  onlineProcess: boolean;
  docKeys: string[];
}

export const SERVICES_CATALOG: ServiceItem[] = [
  {
    id: 'carInsurance',
    category: 'insurance',
    featuredOnSignboard: true,
    iconName: 'Car',
    panIndia: true,
    onlineProcess: true,
    docKeys: ['rcBook', 'prevPolicy', 'aadhaarPan', 'mobileEmail'],
  },
  {
    id: 'bikeInsurance',
    category: 'insurance',
    featuredOnSignboard: true,
    iconName: 'Bike',
    panIndia: true,
    onlineProcess: true,
    docKeys: ['rcBook', 'prevPolicy', 'mobileEmail'],
  },
  {
    id: 'vehicleOwnerTransfer',
    category: 'insurance',
    featuredOnSignboard: true,
    iconName: 'ArrowLeftRight',
    panIndia: true,
    onlineProcess: true,
    docKeys: ['rcBook', 'prevPolicy', 'buyerSellerId', 'form29_30'],
  },
  {
    id: 'commercialInsurance',
    category: 'insurance',
    featuredOnSignboard: false,
    iconName: 'Truck',
    panIndia: true,
    onlineProcess: true,
    docKeys: ['rcBook', 'fitnessPermit', 'prevPolicy', 'aadhaarPan'],
  },
  {
    id: 'vehicleRtoTax',
    category: 'rto',
    featuredOnSignboard: true,
    iconName: 'Receipt',
    panIndia: true,
    onlineProcess: true,
    docKeys: ['rcBook', 'insuranceCopy', 'pucCertificate', 'ownerMobile'],
  },
  {
    id: 'vehicleRepassing',
    category: 'rto',
    featuredOnSignboard: true,
    iconName: 'ShieldCheck',
    panIndia: true,
    onlineProcess: true,
    docKeys: ['rcBook', 'insuranceCopy', 'pucCertificate', 'chassisPencilPrint'],
  },
  {
    id: 'rcLoanCancellation',
    category: 'rto',
    featuredOnSignboard: true,
    iconName: 'BookOpenCheck',
    panIndia: true,
    onlineProcess: true,
    docKeys: ['rcBook', 'bankNocForm35', 'insuranceCopy', 'aadhaarPan'],
  },
  {
    id: 'interstateNoc',
    category: 'rto',
    featuredOnSignboard: false,
    iconName: 'FileCheck2',
    panIndia: true,
    onlineProcess: true,
    docKeys: ['rcBook', 'form28', 'insuranceCopy', 'pucCertificate', 'chassisPencilPrint'],
  },
  {
    id: 'duplicateRc',
    category: 'rto',
    featuredOnSignboard: false,
    iconName: 'Copy',
    panIndia: true,
    onlineProcess: true,
    docKeys: ['firLostReport', 'form26', 'insuranceCopy', 'aadhaarPan'],
  },
  {
    id: 'drivingLicenceForms',
    category: 'forms',
    featuredOnSignboard: true,
    iconName: 'CreditCard',
    panIndia: true,
    onlineProcess: true,
    docKeys: ['aadhaarCard', 'birthProof', 'passportPhoto', 'medicalForm1A'],
  },
  {
    id: 'rcTransferForms',
    category: 'forms',
    featuredOnSignboard: true,
    iconName: 'FileText',
    panIndia: true,
    onlineProcess: true,
    docKeys: ['rcBook', 'form29_30', 'buyerSellerId', 'insuranceCopy', 'pucCertificate'],
  },
  {
    id: 'addressChangeForms',
    category: 'forms',
    featuredOnSignboard: true,
    iconName: 'MapPin',
    panIndia: true,
    onlineProcess: true,
    docKeys: ['rcBook', 'form33', 'newAddressProof', 'insuranceCopy'],
  },
  {
    id: 'fitnessCertificate',
    category: 'forms',
    featuredOnSignboard: true,
    iconName: 'ClipboardCheck',
    panIndia: true,
    onlineProcess: true,
    docKeys: ['rcBook', 'insuranceCopy', 'pucCertificate', 'taxReceipt'],
  },
  {
    id: 'otherRtoForms',
    category: 'forms',
    featuredOnSignboard: true,
    iconName: 'BadgeCheck',
    panIndia: true,
    onlineProcess: true,
    docKeys: ['rcBook', 'aadhaarCard', 'insuranceCopy'],
  },
];

export interface StateCoverage {
  code: string;
  isPrimary?: boolean;
  cities: string[];
}

export const INDIA_STATES: StateCoverage[] = [
  {
    code: 'GJ',
    isPrimary: true,
    cities: ['Rajkot (GJ-03)', 'Ahmedabad (GJ-01)', 'Surat (GJ-05)', 'Vadodara (GJ-06)', 'Jamnagar (GJ-10)', 'Bhavnagar (GJ-04)', 'Junagadh (GJ-11)', 'Morbi (GJ-36)', 'Gandhinagar (GJ-18)', 'Bhuj-Kutch (GJ-12)', 'Mehsana (GJ-02)', 'Anand (GJ-23)', 'Bharuch (GJ-16)', 'Navsari (GJ-21)', 'Valsad (GJ-15)', 'Porbandar (GJ-25)', 'Amreli (GJ-14)', 'Surendranagar (GJ-13)'],
  },
  { code: 'MH', cities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Thane', 'Surat-Border Vapi/Daman'] },
  { code: 'RJ', cities: ['Jaipur', 'Udaipur', 'Jodhpur', 'Kota', 'Mount Abu / Sirohi'] },
  { code: 'DL', cities: ['New Delhi', 'North Delhi', 'South Delhi', 'Dwarka'] },
  { code: 'KA', cities: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi'] },
  { code: 'MP', cities: ['Indore', 'Bhopal', 'Ujjain', 'Gwalior', 'Ratlam'] },
  { code: 'UP', cities: ['Lucknow', 'Noida', 'Ghaziabad', 'Kanpur', 'Varanasi', 'Agra'] },
  { code: 'TN', cities: ['Chennai', 'Coimbatore', 'Madurai', 'Salem'] },
  { code: 'TG', cities: ['Hyderabad', 'Warangal', 'Nizamabad'] },
  { code: 'AP', cities: ['Visakhapatnam', 'Vijayawada', 'Tirupati'] },
  { code: 'HR', cities: ['Gurugram', 'Faridabad', 'Panipat', 'Ambala'] },
  { code: 'PB', cities: ['Ludhiana', 'Chandigarh', 'Amritsar', 'Jalandhar'] },
  { code: 'WB', cities: ['Kolkata', 'Howrah', 'Siliguri', 'Durgapur'] },
  { code: 'KL', cities: ['Kochi', 'Thiruvananthapuram', 'Kozhikode'] },
  { code: 'CG', cities: ['Raipur', 'Bilaspur', 'Durg'] },
  { code: 'OR', cities: ['Bhubaneswar', 'Cuttack', 'Rourkela'] },
  { code: 'BR', cities: ['Patna', 'Gaya', 'Muzaffarpur'] },
  { code: 'JH', cities: ['Ranchi', 'Jamshedpur', 'Dhanbad'] },
  { code: 'UK', cities: ['Dehradun', 'Haridwar', 'Haldwani'] },
  { code: 'HP', cities: ['Shimla', 'Solan', 'Kangra'] },
  { code: 'GA', cities: ['Panaji', 'Margao', 'Vasco da Gama'] },
  { code: 'AS', cities: ['Guwahati', 'Silchar', 'Dibrugarh'] },
  { code: 'CH', cities: ['Chandigarh'] },
  { code: 'DN', cities: ['Daman', 'Diu', 'Silvassa'] },
  { code: 'JK', cities: ['Jammu', 'Srinagar'] },
  { code: 'PY', cities: ['Puducherry'] },
  { code: 'TR', cities: ['Agartala'] },
  { code: 'NL', cities: ['Kohima', 'Dimapur'] },
  { code: 'MN', cities: ['Imphal'] },
  { code: 'ML', cities: ['Shillong'] },
  { code: 'MZ', cities: ['Aizawl'] },
  { code: 'AR', cities: ['Itanagar'] },
  { code: 'SK', cities: ['Gangtok'] },
  { code: 'LA', cities: ['Leh', 'Kargil'] },
  { code: 'AN', cities: ['Port Blair'] },
  { code: 'LD', cities: ['Kavaratti'] },
];

export const BUSINESS_INFO = {
  brandName: 'PATEL AUTO ADVISORS',
  phoneDisplay: '+91 97732 02255',
  phoneRaw: '919773202255',
  phoneShort: '97732 02255',
  email: 'patelautosolutions@gmail.com',
  upiId: 'patelautoadvisors@okicici',
  yearsExperience: 28,
  coordinates: {
    lat: 22.2599154,
    lng: 70.7530878,
  },
  address: {
    line1: '1031, 10th Floor, Golden Crown,',
    line2: 'New 150 Feet Road, Mota Mava,',
    cityPin: 'Rajkot - 360005, Gujarat, India',
    mapsQuery: 'https://maps.app.goo.gl/qvcmL3D3VuAACzNL6',
  },
  officePhotoPath: '/assets/aistudio/WhatsApp_Image_2026-11-25_at_15.11.41_48165f44.jpeg',
  logoHeaderPath: '/assets/brand/patel-logo-header-clean.png',
  logoFullPath: '/assets/brand/patel-logo-full-clean.png',
};
