import { TFunction } from 'i18next';
import { BUSINESS_INFO } from '../data/servicesData';

export interface WhatsAppEnquiryPayload {
  fullName: string;
  mobile: string;
  stateName: string;
  city: string;
  categoryName: string;
  serviceName: string;
  vehicleNumber?: string;
  notes?: string;
}

export function buildLocalizedWhatsAppMessage(
  t: TFunction,
  payload: WhatsAppEnquiryPayload
): string {
  const notProvided = t('applicationForm.whatsappTemplate.notProvided');
  const lines = [
    t('applicationForm.whatsappTemplate.greeting'),
    t('applicationForm.whatsappTemplate.intro'),
    '',
    `• ${t('applicationForm.whatsappTemplate.nameLabel')}: ${payload.fullName.trim()}`,
    `• ${t('applicationForm.whatsappTemplate.mobileLabel')}: ${payload.mobile.trim()}`,
    `• ${t('applicationForm.whatsappTemplate.stateLabel')}: ${payload.stateName}`,
    `• ${t('applicationForm.whatsappTemplate.cityLabel')}: ${payload.city.trim()}`,
    `• ${t('applicationForm.whatsappTemplate.categoryLabel')}: ${payload.categoryName}`,
    `• ${t('applicationForm.whatsappTemplate.serviceLabel')}: ${payload.serviceName}`,
    `• ${t('applicationForm.whatsappTemplate.vehicleLabel')}: ${
      payload.vehicleNumber?.trim() ? payload.vehicleNumber.trim().toUpperCase() : notProvided
    }`,
    `• ${t('applicationForm.whatsappTemplate.notesLabel')}: ${
      payload.notes?.trim() ? payload.notes.trim() : notProvided
    }`,
    '',
    t('applicationForm.whatsappTemplate.closing'),
  ];

  return lines.join('\n');
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent(message)}`;
}
