import { personalInfo } from '../data/resumeData';

export function generateVCard(): string {
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'FN:Dr. Mohammad Mahmoud Ahmad Al-Omari',
    'N:Al-Omari;Mohammad;Mahmoud Ahmad;Dr.;',
    'TITLE:CEO & Head of Anesthesia Department | المدير التنفيذي لمستشفى سارة ورئيس قسم التخدير',
    'ORG:Sarah Specialty Hospital | مستشفى سارة التخصصي',
    `TEL;TYPE=CELL,VOICE:${personalInfo.mobile}`,
    `EMAIL;TYPE=PREF,INTERNET:${personalInfo.email}`,
    `ADR;TYPE=WORK:;;Sarah Specialty Hospital, Irbid;Irbid;;;Jordan`,
    'NOTE:Consultant Anesthesiologist & Hospital CEO. Over 15 years executive and clinical healthcare leadership in Jordan and Saudi Arabia.',
    'URL:https://sarahhospital.com',
    'END:VCARD'
  ].join('\r\n');
}

export function downloadVCard(): void {
  const vcardContent = generateVCard();
  const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Dr_Mohammad_Al_Omari_CV_Contact.vcf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
