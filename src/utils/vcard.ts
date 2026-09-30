export function generateVCard(): string {
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'FN:Dr. Mohammad Mahmoud Ahmad Al-Omari',
    'N:Al-Omari;Mohammad;Mahmoud Ahmad;Dr.;',
    'TITLE:CEO & Head of Anesthesia Department | المدير التنفيذي لمستشفى سارة ورئيس قسم التخدير',
    'ORG:Sarah Specialty Hospital | مستشفى سارة التخصصي',
    'ADR;TYPE=WORK:;;Sarah Specialty Hospital, Irbid;Irbid;;;Jordan',
    'EMAIL;TYPE=PREF,INTERNET:Mohalomari35@yahoo.com',
    'NOTE:Consultant Anesthesiologist & Hospital CEO. Official Office Facility: Sarah Specialty Hospital, Irbid, Jordan.',
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
  link.setAttribute('download', 'Dr_Mohammad_Al_Omari_Hospital_Facility.vcf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
