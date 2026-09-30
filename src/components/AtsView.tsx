import React, { useState } from 'react';
import { Copy, Check, FileText } from 'lucide-react';
import { 
  personalInfo, 
  professionalSummary, 
  experienceData, 
  educationData, 
  refereesData, 
  coreCompetencies, 
  languages 
} from '../data/resumeData';
import { DisplayLang } from './A4Resume';

interface AtsViewProps {
  displayLang?: DisplayLang;
}

export const AtsView: React.FC<AtsViewProps> = ({
  displayLang = 'ar'
}) => {
  const [copied, setCopied] = useState(false);
  const isAr = displayLang === 'ar';
  const isEn = displayLang === 'en';

  const generateText = () => {
    if (isAr) {
      return `
============================================================
${personalInfo.fullName.ar}
============================================================
${personalInfo.titles[0].ar}
${personalInfo.titles[1].ar}
المقر المؤسسي: ${personalInfo.hospital.ar} - ${personalInfo.location.ar}
البريد الإلكتروني: ${personalInfo.email}
التواصل: عبر مكتب إدارة المستشفى (بوابة المراسلة الرسمية)
العنوان المؤسسي: ${personalInfo.address.ar}
الجنسية: ${personalInfo.nationality.ar} | الاعتماد: استشاري تخدير معتمد (المجلس الطبي الأردني)

============================================================
الملخص المهني والتنفيذي
============================================================
${professionalSummary.ar}

============================================================
الخبرات العملية والسريرية
============================================================
${experienceData.map(exp => `
* ${exp.title.ar}
  المؤسسة: ${exp.institution.ar} (${exp.location?.ar || 'الأردن'})
  الفترة: ${exp.periodAr || exp.period}
  التفاصيل: ${exp.highlight?.ar || ''}
`).join('\n')}

============================================================
المؤهلات العلمية والتراخيص الطبية
============================================================
${educationData.map(edu => `
* ${edu.degree.ar}
  الجهة المانحة: ${edu.institution.ar}
  السنة / الفترة: ${edu.period || edu.year}
  التفاصيل: ${edu.details?.ar || ''}
`).join('\n')}

============================================================
الكفاءات والمهارات القيادية والسريرية
============================================================
${coreCompetencies.map(cat => `
[${cat.title.ar}]
${cat.skills.map(s => `- ${s.ar}`).join('\n')}
`).join('\n')}

============================================================
اللغات
============================================================
${languages.map(l => `* ${l.name.ar}: ${l.level.ar}`).join('\n')}

============================================================
المراجع الأكاديمية والسريرية
============================================================
${refereesData.map(ref => `
* ${ref.name.ar}
  ${ref.academicTitle.ar} - ${ref.institution.ar}
  ${ref.clinicalTitle.ar} - ${ref.hospital.ar}
`).join('\n')}
      `.trim();
    }

    if (isEn) {
      return `
============================================================
${personalInfo.fullName.en.toUpperCase()}
============================================================
${personalInfo.titles[0].en}
${personalInfo.titles[1].en}
Hospital Facility: ${personalInfo.hospital.en} - ${personalInfo.location.en}
Email: ${personalInfo.email}
Contact: Institutional Inquiries via Office of the CEO & Sarah Specialty Hospital
Address: ${personalInfo.address.en}
Nationality: ${personalInfo.nationality.en} | Licensure: Board Certified Consultant (JMC)

============================================================
PROFESSIONAL SUMMARY
============================================================
${professionalSummary.en}

============================================================
PROFESSIONAL EXPERIENCE
============================================================
${experienceData.map(exp => `
* ${exp.title.en}
  Institution: ${exp.institution.en} (${exp.location?.en || 'Jordan'})
  Period: ${exp.period}
  Details: ${exp.highlight?.en || ''}
`).join('\n')}

============================================================
EDUCATION & BOARD CERTIFICATIONS
============================================================
${educationData.map(edu => `
* ${edu.degree.en}
  Institution: ${edu.institution.en}
  Period / Year: ${edu.period || edu.year}
  Details: ${edu.details?.en || ''}
`).join('\n')}

============================================================
CORE COMPETENCIES & LEADERSHIP
============================================================
${coreCompetencies.map(cat => `
[${cat.title.en}]
${cat.skills.map(s => `- ${s.en}`).join('\n')}
`).join('\n')}

============================================================
LANGUAGES
============================================================
${languages.map(l => `* ${l.name.en}: ${l.level.en}`).join('\n')}

============================================================
REFEREES
============================================================
${refereesData.map(ref => `
* ${ref.name.en}
  ${ref.academicTitle.en} - ${ref.institution.en}
  ${ref.clinicalTitle.en} - ${ref.hospital.en}
`).join('\n')}
      `.trim();
    }

    // Bilingual default
    return `
============================================================
${personalInfo.fullName.en.toUpperCase()}
${personalInfo.fullName.ar}
============================================================
${personalInfo.titles[0].en} | ${personalInfo.titles[0].ar}
${personalInfo.titles[1].en} | ${personalInfo.titles[1].ar}
${personalInfo.hospital.en} | ${personalInfo.hospital.ar}
Email | البريد: ${personalInfo.email}
Facility | المقر: ${personalInfo.address.en} | ${personalInfo.address.ar}
Inquiries | التواصل: Official Institutional Inquiries Gateway | بوابة المراسلة المؤسسية الرسمية

============================================================
PROFESSIONAL SUMMARY | الملخص المهني
============================================================
[English]
${professionalSummary.en}

[العربية]
${professionalSummary.ar}

============================================================
PROFESSIONAL EXPERIENCE | الخبرات العملية
============================================================
${experienceData.map(exp => `
* ${exp.title.en} | ${exp.title.ar}
  ${exp.institution.en} | ${exp.institution.ar} (${exp.period})
  ${exp.highlight?.en || ''} / ${exp.highlight?.ar || ''}
`).join('\n')}

============================================================
EDUCATION & CERTIFICATIONS | المؤهلات العلمية والبورد
============================================================
${educationData.map(edu => `
* ${edu.degree.en} | ${edu.degree.ar}
  ${edu.institution.en} | ${edu.institution.ar} (${edu.period || edu.year})
`).join('\n')}
    `.trim();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="bg-slate-800/90 rounded-xl border border-slate-700 p-6 shadow-xl text-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-700 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-arabic">
                {isAr ? 'سيرة ذاتية بصيغة نصية لنظم التوظيف (ATS)' : 'ATS Plain Text Resume'}
              </h2>
              <p className="text-xs text-slate-400">
                {isAr 
                  ? 'صيغة نصية واضحة ومباشرة مجهزة لنسخها في بوابات وأنظمة التوظيف والمستشفيات.' 
                  : 'Clean machine-readable format optimized for ATS parsers and HR portals.'}
              </p>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow transition-all cursor-pointer font-arabic"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>{isAr ? 'تم النسخ بنجاح!' : 'Copied!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>{isAr ? 'نسخ النص' : 'Copy Text'}</span>
              </>
            )}
          </button>
        </div>

        <div className="bg-slate-950 rounded-lg p-5 border border-slate-800 font-mono text-xs leading-relaxed text-slate-300 overflow-x-auto whitespace-pre-wrap max-h-[700px] select-all">
          {generateText()}
        </div>
      </div>
    </div>
  );
};
