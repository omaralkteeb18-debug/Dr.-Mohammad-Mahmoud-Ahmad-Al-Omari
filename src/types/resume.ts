export interface BilingualText {
  en: string;
  ar: string;
}

export interface PersonalInfo {
  fullName: BilingualText;
  titles: BilingualText[];
  currentRole: BilingualText;
  hospital: BilingualText;
  department: BilingualText;
  location: BilingualText;
  address: BilingualText;
  mobile: string;
  email: string;
  dateOfBirth: string;
  placeOfBirth: BilingualText;
  gender: BilingualText;
  maritalStatus: BilingualText;
  nationality: BilingualText;
}

export interface ExperienceItem {
  period: string;
  periodAr?: string;
  title: BilingualText;
  institution: BilingualText;
  location?: BilingualText;
  highlight?: BilingualText;
  isLeadership?: boolean;
}

export interface EducationItem {
  degree: BilingualText;
  institution: BilingualText;
  period?: string;
  year?: string;
  location?: BilingualText;
  details?: BilingualText;
}

export interface RefereeItem {
  name: BilingualText;
  academicTitle: BilingualText;
  institution: BilingualText;
  clinicalTitle: BilingualText;
  hospital: BilingualText;
}

export interface CompetencyCategory {
  title: BilingualText;
  skills: BilingualText[];
}

export interface LanguageItem {
  name: BilingualText;
  level: BilingualText;
}
