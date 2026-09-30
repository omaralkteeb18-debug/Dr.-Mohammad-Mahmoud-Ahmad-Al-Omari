import { 
  PersonalInfo, 
  ExperienceItem, 
  EducationItem, 
  RefereeItem, 
  CompetencyCategory,
  LanguageItem,
  BilingualText 
} from '../types/resume';

export const personalInfo: PersonalInfo = {
  fullName: {
    en: "Dr. Mohammad Mahmoud Ahmad Al-Omari",
    ar: "الدكتور محمد محمود أحمد العمري"
  },
  titles: [
    {
      en: "CEO of Sarah Specialty Hospital",
      ar: "المدير التنفيذي لمستشفى سارة التخصصي"
    },
    {
      en: "Head of Anesthesia Department",
      ar: "رئيس قسم التخدير"
    },
    {
      en: "Consultant Anesthesiologist",
      ar: "استشاري التخدير والعناية الحثيثة"
    }
  ],
  currentRole: {
    en: "CEO of Sarah Specialty Hospital & Head of Anesthesia Department",
    ar: "المدير التنفيذي لمستشفى سارة التخصصي ورئيس قسم التخدير"
  },
  hospital: {
    en: "Sarah Specialty Hospital",
    ar: "مستشفى سارة التخصصي"
  },
  department: {
    en: "Department of Anesthesia & Intensive Care",
    ar: "قسم التخدير والعناية الحثيثة"
  },
  location: {
    en: "Irbid, Jordan",
    ar: "إربد - الأردن"
  },
  address: {
    en: "Sarah Specialty Hospital, Irbid, Jordan",
    ar: "مستشفى سارة التخصصي، إربد، الأردن"
  },
  mobile: "+962 790930786",
  email: "Mohalomari35@yahoo.com",
  dateOfBirth: "1977",
  placeOfBirth: {
    en: "Irbid, Jordan",
    ar: "إربد - الأردن"
  },
  gender: {
    en: "Male",
    ar: "ذكر"
  },
  maritalStatus: {
    en: "Married",
    ar: "متزوج"
  },
  nationality: {
    en: "Jordanian",
    ar: "أردني"
  }
};

export const professionalSummary: BilingualText = {
  en: "Highly experienced Consultant Anesthesiologist and Healthcare Executive with more than 15 years of experience in anesthesia, cardiac anesthesia, hospital administration, and healthcare leadership across Jordan and Saudi Arabia.",
  ar: "طبيب تخدير واستشاري وإداري صحي يمتلك أكثر من 15 عاماً من الخبرة في التخدير وتخدير القلب وإدارة المستشفيات والقيادة الصحية في الأردن والمملكة العربية السعودية."
};

export const experienceData: ExperienceItem[] = [
  {
    period: "2017 – Present",
    periodAr: "2017 - حتى الآن",
    title: {
      en: "CEO & Head of Anesthesia Department",
      ar: "المدير التنفيذي لمستشفى سارة التخصصي ورئيس قسم التخدير"
    },
    institution: {
      en: "Sarah Specialty Hospital",
      ar: "مستشفى سارة التخصصي"
    },
    location: {
      en: "Irbid, Jordan",
      ar: "إربد - الأردن"
    },
    highlight: {
      en: "Executive institutional leadership, healthcare quality governance, and clinical anesthesia oversight.",
      ar: "القيادة التنفيذية المؤسسية للمستشفى، حوكمة الجودة الصحية، وإدارة غرف العمليات والتخدير السريري."
    },
    isLeadership: true
  },
  {
    period: "2015 – 2017",
    periodAr: "2015 - 2017",
    title: {
      en: "Anesthesia Specialist",
      ar: "اختصاصي تخدير"
    },
    institution: {
      en: "King Abdullah University Hospital (KAUH)",
      ar: "مستشفى الملك عبدالله المؤسس الجامعي"
    },
    location: {
      en: "Irbid, Jordan",
      ar: "إربد - الأردن"
    },
    highlight: {
      en: "Tertiary clinical anesthesia management and academic clinical guidance for residents.",
      ar: "إدارة الحالات الجراحية التخصصية المتقدمة والإشراف السريري الأكاديمي على أطباء الإقامة."
    }
  },
  {
    period: "2013 – 2015",
    periodAr: "2013 - 2015",
    title: {
      en: "Anesthesia Consultant",
      ar: "استشاري تخدير"
    },
    institution: {
      en: "King Khalid Hospital",
      ar: "مستشفى الملك خالد"
    },
    location: {
      en: "Hail, Saudi Arabia",
      ar: "حائل - المملكة العربية السعودية"
    },
    highlight: {
      en: "Consultant perioperative care, surgical critical care, and trauma anesthesia leadership.",
      ar: "رعاية تخديرية استشارية متقدمة، حالات الطوارئ والإصابات الحرجة، والعناية الحثيثة الجراحية."
    }
  },
  {
    period: "Specialized Training",
    periodAr: "تدريب تخصصي متقدم",
    title: {
      en: "Cardiac Anesthesia Training",
      ar: "تدريب تخصصي في تخدير القلب"
    },
    institution: {
      en: "Queen Alia Heart Institute, Royal Medical Services",
      ar: "معهد الملكة علياء للقلب - الخدمات الطبية الملكية"
    },
    location: {
      en: "Amman, Jordan",
      ar: "عمّان - الأردن"
    },
    highlight: {
      en: "Adult and pediatric open-heart surgical anesthesia, cardiopulmonary bypass, and hemodynamic monitoring.",
      ar: "تخدير جراحات القلب المفتوح للبالغين والأطفال، مجازة القلب والرئة، والمراقبة الديناميكية الدموية."
    }
  },
  {
    period: "2012 – 2013",
    periodAr: "2012 - 2013",
    title: {
      en: "Head of Anesthesia Department",
      ar: "رئيس قسم التخدير"
    },
    institution: {
      en: "Princess Raya Hospital",
      ar: "مستشفى الأميرة راية"
    },
    location: {
      en: "Irbid, Jordan",
      ar: "إربد - الأردن"
    },
    highlight: {
      en: "Departmental administration, OR safety protocols, and emergency resuscitation management.",
      ar: "الإدارة الإكلينيكية للقسم، بروتوكولات سلامة المرضى، وإدارة الاستجابة لحالات الإنعاش الطارئة."
    },
    isLeadership: true
  },
  {
    period: "2010 – 2012",
    periodAr: "2010 - 2012",
    title: {
      en: "Fellow of Anesthesia",
      ar: "زميل تخدير"
    },
    institution: {
      en: "Jordan University of Science and Technology (JUST)",
      ar: "جامعة العلوم والتكنولوجيا الأردنية"
    },
    location: {
      en: "Irbid, Jordan",
      ar: "إربد - الأردن"
    },
    highlight: {
      en: "Subspecialty clinical fellowship and academic instruction in advanced anesthesia.",
      ar: "زمالة سريرية تخصصية وتدريس أكاديمي في تقنيات التخدير المتقدمة."
    }
  },
  {
    period: "2010",
    periodAr: "2010",
    title: {
      en: "Jordanian Board of Anesthesia",
      ar: "البورد الأردني في التخدير"
    },
    institution: {
      en: "Jordan Medical Council",
      ar: "المجلس الطبي الأردني"
    },
    location: {
      en: "Amman, Jordan",
      ar: "عمّان - الأردن"
    },
    highlight: {
      en: "Highest professional national qualification and medical specialist accreditation.",
      ar: "أعلى شهادة اختصاص مهنية وطنية وترخيص استشاري معتمد في التخدير."
    }
  },
  {
    period: "2006 – 2010",
    periodAr: "2006 - 2010",
    title: {
      en: "Anesthesia Resident",
      ar: "طبيب مقيم تخدير"
    },
    institution: {
      en: "King Abdullah University Hospital (KAUH)",
      ar: "مستشفى الملك عبدالله المؤسس الجامعي"
    },
    location: {
      en: "Irbid, Jordan",
      ar: "إربد - الأردن"
    },
    highlight: {
      en: "Comprehensive 4-year residency in general, pediatric, obstetric, and trauma anesthesia.",
      ar: "برنامج إقامة سريرية شامل لمدة 4 سنوات في التخدير العام والجراحي والعناية الحثيثة."
    }
  },
  {
    period: "2004 – 2005",
    periodAr: "2004 - 2005",
    title: {
      en: "Medical Internship",
      ar: "سنة الامتياز"
    },
    institution: {
      en: "Princess Basma Teaching Hospital",
      ar: "مستشفى الأميرة بسمة التعليمي"
    },
    location: {
      en: "Irbid, Jordan",
      ar: "إربد - الأردن"
    },
    highlight: {
      en: "Rotations across major medical, surgical, emergency, and pediatric disciplines.",
      ar: "تدريب سريري شامل عبر أقسام الجراحة العامة، الباطنية، الأطفال، وطب الطوارئ."
    }
  }
];

export const educationData: EducationItem[] = [
  {
    degree: {
      en: "Higher Specialty Degree of Anesthesia",
      ar: "البورد العالي في التخدير"
    },
    institution: {
      en: "Jordan University of Science and Technology (JUST)",
      ar: "جامعة العلوم والتكنولوجيا الأردنية"
    },
    period: "2006 – 2010",
    details: {
      en: "Postgraduate higher clinical specialty degree in anesthesia & intensive care.",
      ar: "شهادة الاختصاص العالي السريرية في التخدير والعناية الحثيثة."
    }
  },
  {
    degree: {
      en: "Jordanian Board of Anesthesia",
      ar: "البورد الأردني في التخدير"
    },
    institution: {
      en: "Jordan Medical Council",
      ar: "المجلس الطبي الأردني"
    },
    year: "2010",
    details: {
      en: "Official medical board certification in Anesthesiology.",
      ar: "شهادة البورد الرسمي للمجلس الطبي الأردني في اختصاص التخدير."
    }
  },
  {
    degree: {
      en: "Jordanian Medical Council Qualifying Exam",
      ar: "امتحان مزاولة المهنة - المجلس الطبي الأردني"
    },
    institution: {
      en: "Jordan Medical Council",
      ar: "المجلس الطبي الأردني"
    },
    year: "2005",
    details: {
      en: "National medical practice qualifying examination.",
      ar: "امتحان التأهيل الوطني لمزاولة مهنة الطب البشري."
    }
  },
  {
    degree: {
      en: "MBChB (Bachelor of Medicine & Surgery)",
      ar: "بكالوريوس الطب والجراحة العامة"
    },
    institution: {
      en: "State Medical & Pharmaceutical University Nicolae Testemitanu",
      ar: "جامعة نيكولاي تيستيميتانو الطبية"
    },
    period: "1999 – 2004",
    location: {
      en: "Moldova",
      ar: "مولدوفا"
    },
    details: {
      en: "Doctor of Medicine degree (General Medicine & Surgery).",
      ar: "درجة دكتور في الطب البشري والجراحة العامة."
    }
  },
  {
    degree: {
      en: "High School Diploma (Scientific Stream)",
      ar: "الثانوية العامة - الفرع العلمي"
    },
    institution: {
      en: "Al Amir Hasan High School",
      ar: "مدرسة الأمير الحسن"
    },
    year: "1997",
    location: {
      en: "Irbid, Jordan",
      ar: "إربد - الأردن"
    },
    details: {
      en: "General Secondary Education Certificate (Tawjihi) - Scientific Stream.",
      ar: "شهادة الدراسة الثانوية العامة (التوجيهي) - الفرع العلمي."
    }
  }
];

export const refereesData: RefereeItem[] = [
  {
    name: {
      en: "Dr. Khaled El-Radaideh",
      ar: "الدكتور خالد الردايدة"
    },
    academicTitle: {
      en: "Assistant Professor",
      ar: "أستاذ مساعد"
    },
    institution: {
      en: "Jordan University of Science and Technology",
      ar: "جامعة العلوم والتكنولوجيا الأردنية"
    },
    clinicalTitle: {
      en: "Consultant Anesthesiologist",
      ar: "استشاري تخدير"
    },
    hospital: {
      en: "King Abdullah University Hospital",
      ar: "مستشفى الملك عبدالله المؤسس الجامعي"
    }
  },
  {
    name: {
      en: "Dr. Wael Krais",
      ar: "الدكتور وائل خريسات"
    },
    academicTitle: {
      en: "Assistant Professor",
      ar: "أستاذ مساعد"
    },
    institution: {
      en: "Jordan University of Science and Technology",
      ar: "جامعة العلوم والتكنولوجيا الأردنية"
    },
    clinicalTitle: {
      en: "Consultant Anesthesiologist",
      ar: "استشاري تخدير"
    },
    hospital: {
      en: "King Abdullah University Hospital",
      ar: "مستشفى الملك عبدالله المؤسس الجامعي"
    }
  }
];

export const coreCompetencies: CompetencyCategory[] = [
  {
    title: {
      en: "Executive & Hospital Leadership",
      ar: "القيادة التنفيذية وإدارة المستشفيات"
    },
    skills: [
      {
        en: "C-Suite Healthcare Governance",
        ar: "الحوكمة والإدارة الصحية العليا"
      },
      {
        en: "Operating Rooms & Capacity Optimization",
        ar: "إدارة غرف العمليات ورفع الكفاءة التشغيلية"
      },
      {
        en: "Clinical Quality & Patient Safety Protocols",
        ar: "معايير الجودة السريرية وسلامة المرضى"
      },
      {
        en: "Strategic Healthcare Planning & Expansion",
        ar: "التخطيط الاستراتيجي والتطوير المؤسسي"
      }
    ]
  },
  {
    title: {
      en: "Clinical & Subspecialty Expertise",
      ar: "الخبرات الإكلينيكية والتخصصية الدقيقة"
    },
    skills: [
      {
        en: "Cardiac & Open-Heart Anesthesia",
        ar: "تخدير جراحات القلب المفتوح والأوعية الدموية"
      },
      {
        en: "Critical Care Resuscitation & ICU Care",
        ar: "الإنعاش الطبي ورعاية الحالات الحرجة"
      },
      {
        en: "Advanced Airway & Hemodynamic Management",
        ar: "إدارة مجرى التنفس الصعب والمراقبة المتقدمة"
      },
      {
        en: "Regional Anesthesia & Pain Medicine",
        ar: "التخدير الناحي وتسكين الألم بعد العمليات"
      }
    ]
  }
];

export const languages: LanguageItem[] = [
  {
    name: {
      en: "Arabic",
      ar: "العربية"
    },
    level: {
      en: "Native / Mother Tongue",
      ar: "اللغة الأم"
    }
  },
  {
    name: {
      en: "English",
      ar: "الإنجليزية"
    },
    level: {
      en: "Fluent (Clinical & Executive)",
      ar: "إتقان تام (مهني وسريري وتنفيذي)"
    }
  },
  {
    name: {
      en: "Romanian",
      ar: "الرومانية"
    },
    level: {
      en: "Professional Working Proficiency",
      ar: "إتقان مهني وعملي (دراسة الطب)"
    }
  }
];
