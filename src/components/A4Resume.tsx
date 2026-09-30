import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  User, 
  Award, 
  Stethoscope, 
  Building2, 
  GraduationCap, 
  Globe2, 
  CheckCircle2, 
  ShieldCheck,
  Hospital,
  Activity,
  Briefcase,
  Lock,
  Send
} from 'lucide-react';
import { useCv } from '../context/CvContext';

export type ResumeTheme = 'navy' | 'teal' | 'slate';
export type DisplayLang = 'ar' | 'en' | 'bilingual';

interface A4ResumeProps {
  theme?: ResumeTheme;
  displayLang?: DisplayLang;
  id?: string;
  onOpenInquiry?: () => void;
  onOpenAdminLogin?: () => void;
}

export const A4Resume: React.FC<A4ResumeProps> = ({ 
  theme = 'navy',
  displayLang = 'ar',
  id = 'executive-resume-a4',
  onOpenInquiry,
  onOpenAdminLogin
}) => {
  const { cvData, privacySettings, isAdmin } = useCv();
  const { personalInfo, professionalSummary, experienceData, educationData, refereesData, coreCompetencies, languages } = cvData;

  const isAr = displayLang === 'ar';
  const isEn = displayLang === 'en';
  const isBilingual = displayLang === 'bilingual';

  // Theme styling definitions
  const themeStyles = {
    navy: {
      primary: 'text-[#0a192f]',
      primaryBg: 'bg-[#0a192f]',
      primaryBorder: 'border-[#0a192f]',
      accent: 'text-[#0284c7]',
      accentBg: 'bg-[#0284c7]',
      accentBorder: 'border-[#0284c7]',
      sidebarBg: 'bg-[#f8fafc]',
      headerBg: 'bg-gradient-to-r from-slate-50 via-white to-blue-50/40',
      subtleBorder: 'border-slate-200',
      divider: 'bg-[#0284c7]',
    },
    teal: {
      primary: 'text-[#042f2e]',
      primaryBg: 'bg-[#042f2e]',
      primaryBorder: 'border-[#042f2e]',
      accent: 'text-[#0d9488]',
      accentBg: 'bg-[#0d9488]',
      accentBorder: 'border-[#0d9488]',
      sidebarBg: 'bg-[#f4fbf9]',
      headerBg: 'bg-gradient-to-r from-slate-50 via-white to-emerald-50/40',
      subtleBorder: 'border-emerald-100',
      divider: 'bg-[#0d9488]',
    },
    slate: {
      primary: 'text-[#0f172a]',
      primaryBg: 'bg-[#0f172a]',
      primaryBorder: 'border-[#0f172a]',
      accent: 'text-[#2563eb]',
      accentBg: 'bg-[#2563eb]',
      accentBorder: 'border-[#2563eb]',
      sidebarBg: 'bg-[#f8fafc]',
      headerBg: 'bg-gradient-to-r from-slate-50 via-white to-slate-100/50',
      subtleBorder: 'border-slate-200',
      divider: 'bg-[#2563eb]',
    }
  }[theme];

  // Privacy evaluation: Only show phone/email if enabled by owner OR if authenticated owner is logged in
  const canShowPhone = privacySettings.showPhonePublicly || isAdmin;
  const canShowEmail = privacySettings.showEmailPublicly || isAdmin;
  const canShowPersonalDetails = privacySettings.showPersonalDetailsPublicly || isAdmin;

  return (
    <div 
      id={id}
      dir={isAr ? 'rtl' : 'ltr'}
      className={`a4-page-container relative bg-white text-slate-900 shadow-2xl mx-auto flex flex-col justify-between overflow-hidden font-montserrat ${
        isAr ? 'font-arabic' : ''
      }`}
      style={{
        width: '210mm',
        height: '297mm',
        minHeight: '297mm',
        maxHeight: '297mm',
        boxSizing: 'border-box'
      }}
    >
      {/* Top Luxury Accent Strip */}
      <div className="w-full flex h-1.5 shrink-0">
        <div className={`w-1/3 ${themeStyles.primaryBg}`} />
        <div className={`w-1/2 ${themeStyles.accentBg}`} />
        <div className="w-1/6 bg-amber-500" />
      </div>

      {/* ============================================================== */}
      {/* HEADER SECTION                                                 */}
      {/* ============================================================== */}
      <header className={`px-6 pt-4 pb-2.5 border-b ${themeStyles.subtleBorder} ${themeStyles.headerBg} shrink-0`}>
        
        {/* Bilingual Header */}
        {isBilingual && (
          <div className="flex items-start justify-between gap-4">
            <div className="text-left flex-1">
              <h1 className={`text-[19px] font-extrabold tracking-tight ${themeStyles.primary} leading-tight`}>
                {personalInfo.fullName.en}
              </h1>
              <div className="mt-0.5 flex flex-col gap-0.5">
                <span className={`text-[11px] font-bold ${themeStyles.accent}`}>
                  {personalInfo.titles[0]?.en || 'CEO of Sarah Specialty Hospital'}
                </span>
                <span className="text-[10px] font-semibold text-slate-700">
                  {personalInfo.titles[1]?.en || 'Head of Anesthesia Department'} · {personalInfo.location.en}
                </span>
              </div>
            </div>

            {/* Central Hospital Crest & Status */}
            <div className="shrink-0 flex flex-col items-center justify-center px-3 py-1 bg-white rounded-lg border border-slate-200 shadow-xs">
              <div className="flex items-center gap-1.5">
                <Hospital className={`w-4 h-4 ${themeStyles.accent}`} />
                <Activity className="w-3.5 h-3.5 text-amber-600" />
              </div>
              <span className="text-[8px] font-extrabold tracking-wider uppercase text-slate-800 font-mono mt-0.5">
                SARAH HOSPITAL
              </span>
              <span className="text-[7.5px] font-bold text-slate-500 font-arabic">
                مستشفى سارة التخصصي
              </span>
            </div>

            <div className="text-right flex-1" dir="rtl">
              <h1 className={`text-[19px] font-extrabold tracking-tight ${themeStyles.primary} font-arabic leading-tight`}>
                {personalInfo.fullName.ar}
              </h1>
              <div className="mt-0.5 flex flex-col gap-0.5">
                <span className={`text-[11px] font-bold ${themeStyles.accent} font-arabic`}>
                  {personalInfo.titles[0]?.ar || 'المدير التنفيذي لمستشفى سارة التخصصي'}
                </span>
                <span className="text-[10px] font-semibold text-slate-700 font-arabic">
                  {personalInfo.titles[1]?.ar || 'رئيس قسم التخدير'} · {personalInfo.location.ar}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Pure Arabic Header */}
        {isAr && (
          <div className="flex items-start justify-between gap-4">
            <div className="text-right flex-1">
              <h1 className={`text-[23px] font-extrabold tracking-tight ${themeStyles.primary} font-arabic leading-tight`}>
                {personalInfo.fullName.ar}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 text-[12px] font-bold">
                <span className={themeStyles.accent}>
                  {personalInfo.titles[0]?.ar || 'المدير التنفيذي لمستشفى سارة التخصصي'}
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-800">
                  {personalInfo.titles[1]?.ar || 'رئيس قسم التخدير'}
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-600 font-normal">
                  {personalInfo.location.ar}
                </span>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2.5 px-3.5 py-1.5 bg-white rounded-lg border border-slate-200 shadow-xs">
              <div className="flex flex-col items-center">
                <Hospital className={`w-5 h-5 ${themeStyles.accent}`} />
                <span className="text-[8.5px] font-bold text-slate-700 font-arabic mt-0.5">
                  مستشفى سارة
                </span>
              </div>
              <div className="border-r border-slate-200 h-7" />
              <div className="flex flex-col text-right">
                <span className="text-[9px] font-extrabold text-slate-900 font-arabic">اعتماد استشاري</span>
                <span className="text-[8px] text-emerald-700 font-semibold font-arabic">البورد الأردني</span>
              </div>
            </div>
          </div>
        )}

        {/* Pure English Header */}
        {isEn && (
          <div className="flex items-start justify-between gap-4">
            <div className="text-left flex-1">
              <h1 className={`text-[23px] font-extrabold tracking-tight ${themeStyles.primary} leading-tight`}>
                {personalInfo.fullName.en}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-x-2 text-[12px] font-bold">
                <span className={themeStyles.accent}>
                  {personalInfo.titles[0]?.en || 'CEO of Sarah Specialty Hospital'}
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-800">
                  {personalInfo.titles[1]?.en || 'Head of Anesthesia Department'}
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-500 font-normal">
                  {personalInfo.location.en}
                </span>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2.5 px-3.5 py-1.5 bg-white rounded-lg border border-slate-200 shadow-xs">
              <div className="flex flex-col items-center">
                <Hospital className={`w-5 h-5 ${themeStyles.accent}`} />
                <span className="text-[8.5px] font-extrabold text-slate-700 uppercase tracking-tight mt-0.5">
                  SARAH HOSPITAL
                </span>
              </div>
              <div className="border-l border-slate-200 h-7" />
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-bold text-slate-900">Consultant Board</span>
                <span className="text-[8px] text-emerald-700 font-semibold">Jordan Medical Council</span>
              </div>
            </div>
          </div>
        )}

        {/* PRIVACY PROTECTED CONTACT & CREDENTIALS RIBBON */}
        <div className="mt-2 pt-2 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-y-1 text-[8.8px] text-slate-700">
          
          {/* Institutional Hospital Address (Publicly safe, NO home address) */}
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-blue-600 shrink-0" />
            <span className="font-semibold text-slate-900">
              {isAr ? 'المقر المؤسسي:' : isEn ? 'Hospital Facility:' : 'Institution:'}
            </span>
            <span className="font-medium text-slate-800">
              {isAr ? personalInfo.address.ar : personalInfo.address.en}
            </span>
          </div>

          {/* Official Email */}
          <div className="flex items-center gap-1.5">
            <Mail className="w-3 h-3 text-blue-600 shrink-0" />
            <span className="font-semibold text-slate-900">
              {isAr ? 'البريد:' : 'Email:'}
            </span>
            <a 
              href={`mailto:${personalInfo.email}`}
              className="text-blue-700 hover:text-blue-900 hover:underline font-mono font-medium"
              dir="ltr"
            >
              {personalInfo.email}
            </a>
          </div>

          {/* Institutional Inquiries Gateway */}
          <div className="flex items-center gap-1.5">
            <Send className="w-3 h-3 text-cyan-600 shrink-0" />
            <button 
              onClick={onOpenInquiry}
              className="text-blue-700 hover:text-blue-900 underline font-medium cursor-pointer"
              title="إرسال استفسار مهني مباشر لمكتب الدكتور"
            >
              <span>{isAr ? 'تواصل مؤسسي (إدارة المستشفى)' : 'Institutional Office Gateway'}</span>
            </button>
          </div>

          {/* Medical Licensing Shield */}
          <div className="flex items-center gap-1 text-[8px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>
              {isAr ? 'استشاري تخدير معتمد (JMC)' : 'Board Certified Consultant (JMC)'}
            </span>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* PROFESSIONAL SUMMARY                                           */}
      {/* ============================================================== */}
      <section className="px-6 py-2 bg-slate-50/90 border-b border-slate-200 shrink-0">
        {isBilingual ? (
          <div className="grid grid-cols-2 gap-4 items-center">
            <div className="border-l-2 border-blue-600 pl-2.5">
              <span className="text-[9px] font-bold text-slate-900 uppercase tracking-wide block mb-0.5">
                Professional Summary
              </span>
              <p className="text-[8.6px] leading-relaxed text-slate-700">
                {professionalSummary.en}
              </p>
            </div>
            <div className="border-r-2 border-blue-600 pr-2.5 text-right font-arabic" dir="rtl">
              <span className="text-[9px] font-bold text-slate-900 uppercase tracking-wide block mb-0.5">
                الملخص المهني والتنفيذي
              </span>
              <p className="text-[8.6px] leading-relaxed text-slate-700">
                {professionalSummary.ar}
              </p>
            </div>
          </div>
        ) : (
          <div className={`${isAr ? 'border-r-2 pr-3' : 'border-l-2 pl-3'} border-blue-600`}>
            <span className="text-[9.2px] font-bold text-slate-900 uppercase tracking-wide block mb-0.5">
              {isAr ? 'الملخص المهني والتنفيذي' : 'Professional Executive Summary'}
            </span>
            <p className="text-[9px] leading-relaxed text-slate-700">
              {isAr ? professionalSummary.ar : professionalSummary.en}
            </p>
          </div>
        )}
      </section>

      {/* ============================================================== */}
      {/* MAIN TWO-COLUMN BODY                                           */}
      {/* ============================================================== */}
      <div className="flex flex-1 w-full overflow-hidden">
        
        {/* SIDEBAR: ~33% */}
        <aside 
          className={`w-[33%] shrink-0 ${themeStyles.sidebarBg} ${
            isAr ? 'border-l' : 'border-r'
          } ${themeStyles.subtleBorder} px-4 py-3 flex flex-col justify-between overflow-hidden`}
        >
          <div className="space-y-2.5">
            
            {/* Professional Governance & Identification (Privacy-Shielded) */}
            <div>
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-300">
                <div className="flex items-center gap-1.5">
                  <User className={`w-3.5 h-3.5 ${themeStyles.accent}`} />
                  <h3 className={`text-[9.8px] font-bold tracking-wider uppercase ${themeStyles.primary}`}>
                    {isAr ? 'البيانات المهنية والتراخيص' : isEn ? 'Professional Credentials' : 'Credentials & Info'}
                  </h3>
                </div>
                {isAdmin && (
                  <span className="text-[7.5px] px-1 bg-emerald-100 text-emerald-800 rounded font-bold font-sans">
                    Owner
                  </span>
                )}
              </div>

              <div className="space-y-1 text-[8.6px] leading-tight text-slate-700">
                <div className="flex justify-between items-baseline border-b border-slate-200/60 pb-0.5">
                  <span className="font-semibold text-slate-900">
                    {isAr ? 'المقر:' : isEn ? 'Affiliation:' : 'Hospital:'}
                  </span>
                  <span className="text-slate-700 text-right font-medium">
                    {isAr ? 'مستشفى سارة التخصصي' : 'Sarah Specialty Hospital'}
                  </span>
                </div>

                <div className="flex justify-between items-baseline border-b border-slate-200/60 pb-0.5">
                  <span className="font-semibold text-slate-900">
                    {isAr ? 'الترخيص:' : isEn ? 'Medical Board:' : 'Licensure:'}
                  </span>
                  <span className="text-slate-800 font-semibold">
                    {isAr ? 'المجلس الطبي الأردني' : 'Jordan Medical Council'}
                  </span>
                </div>

                <div className="flex justify-between items-baseline border-b border-slate-200/60 pb-0.5">
                  <span className="font-semibold text-slate-900">
                    {isAr ? 'الجنسية:' : isEn ? 'Nationality:' : 'Nationality:'}
                  </span>
                  <span className="text-slate-800">
                    {isAr ? personalInfo.nationality.ar : personalInfo.nationality.en}
                  </span>
                </div>

                {/* If owner enables private details or is admin */}
                {canShowPersonalDetails ? (
                  <>
                    <div className="flex justify-between items-baseline border-b border-slate-200/60 pb-0.5">
                      <span className="font-semibold text-slate-900">
                        {isAr ? 'الميلاد:' : 'Birth:'}
                      </span>
                      <span className="text-slate-600">
                        {personalInfo.dateOfBirth} ({isAr ? personalInfo.placeOfBirth.ar : personalInfo.placeOfBirth.en})
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="font-semibold text-slate-900">
                        {isAr ? 'الحالة:' : 'Status:'}
                      </span>
                      <span className="text-slate-700">
                        {isAr ? personalInfo.maritalStatus.ar : personalInfo.maritalStatus.en}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between items-baseline pt-0.5">
                    <span className="font-semibold text-slate-900">
                      {isAr ? 'الرتبة الطبية:' : isEn ? 'Clinical Rank:' : 'Rank:'}
                    </span>
                    <span className="text-emerald-800 font-semibold">
                      {isAr ? 'استشاري أول' : 'Senior Consultant'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Core Competencies */}
            <div>
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-300">
                <div className="flex items-center gap-1.5">
                  <Stethoscope className={`w-3.5 h-3.5 ${themeStyles.accent}`} />
                  <h3 className={`text-[9.8px] font-bold tracking-wider uppercase ${themeStyles.primary}`}>
                    {isAr ? 'الكفاءات التخصصية' : 'Core Competencies'}
                  </h3>
                </div>
              </div>

              <div className="space-y-1.5">
                {coreCompetencies.map((cat, idx) => (
                  <div key={idx} className="text-[8.5px]">
                    <div className="font-bold text-slate-900 mb-0.5">
                      {isAr ? cat.title.ar : isEn ? cat.title.en : `${cat.title.en} | ${cat.title.ar}`}
                    </div>
                    <ul className="space-y-0.5 text-slate-600">
                      {cat.skills.map((skill, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-1 leading-snug">
                          <span className={`w-1 h-1 rounded-full ${themeStyles.accentBg} shrink-0 mt-1`} />
                          <div className="flex-1">
                            {isAr ? (
                              <span className="font-medium text-slate-800">{skill.ar}</span>
                            ) : isEn ? (
                              <span className="font-medium text-slate-800">{skill.en}</span>
                            ) : (
                              <>
                                <span className="font-medium text-slate-800">{skill.en}</span>
                                <span className="text-slate-500 font-arabic text-[7.5px] block">{skill.ar}</span>
                              </>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Referees */}
            <div>
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className={`w-3.5 h-3.5 ${themeStyles.accent}`} />
                  <h3 className={`text-[9.8px] font-bold tracking-wider uppercase ${themeStyles.primary}`}>
                    {isAr ? 'المراجع الأكاديمية' : 'Referees'}
                  </h3>
                </div>
              </div>

              <div className="space-y-1.5 text-[8.4px] leading-tight text-slate-700">
                {refereesData.map((ref, idx) => (
                  <div key={idx} className="pb-1 border-b border-slate-200/80 last:border-none last:pb-0">
                    <span className="font-bold text-slate-900 text-[8.8px] block">
                      {isAr ? ref.name.ar : isEn ? ref.name.en : `${ref.name.en} | ${ref.name.ar}`}
                    </span>
                    <div className="text-slate-600 text-[7.8px] mt-0.5">
                      {isAr ? (
                        <>
                          <span>{ref.academicTitle.ar}، {ref.institution.ar}</span>
                          <span className="block text-slate-500">{ref.clinicalTitle.ar}، {ref.hospital.ar}</span>
                        </>
                      ) : isEn ? (
                        <>
                          <span>{ref.academicTitle.en}, {ref.institution.en}</span>
                          <span className="block text-slate-500">{ref.clinicalTitle.en}, {ref.hospital.en}</span>
                        </>
                      ) : (
                        <>
                          <span>{ref.academicTitle.en}, JUST · {ref.academicTitle.ar}</span>
                          <span className="block text-slate-500">{ref.clinicalTitle.en}, KAUH</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <div className="flex items-center justify-between pb-1 mb-0.5 border-b border-slate-300">
                <div className="flex items-center gap-1.5">
                  <Globe2 className={`w-3.5 h-3.5 ${themeStyles.accent}`} />
                  <h3 className={`text-[9.8px] font-bold tracking-wider uppercase ${themeStyles.primary}`}>
                    {isAr ? 'اللغات' : 'Languages'}
                  </h3>
                </div>
              </div>

              <div className="space-y-0.5 text-[8.4px]">
                {languages.map((lang, lIdx) => (
                  <div key={lIdx} className="flex justify-between items-center text-slate-700">
                    <span className="font-semibold text-slate-900">
                      {isAr ? lang.name.ar : isEn ? lang.name.en : `${lang.name.en} / ${lang.name.ar}`}
                    </span>
                    <span className="text-[7.8px] text-slate-500">
                      {isAr ? lang.level.ar : lang.level.en.split(' ')[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Hospital Authority Seal & Admin Gateway */}
          <div className="pt-1.5 border-t border-slate-200 flex items-center justify-between text-[7.5px] text-slate-500">
            <span className="font-semibold text-slate-700">
              {isAr ? 'مستشفى سارة التخصصي' : 'Sarah Specialty Hospital'}
            </span>
            <button 
              onClick={onOpenAdminLogin}
              className="text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-1 cursor-pointer"
              title="بوابة المالك والتحكم"
            >
              <Lock className="w-2.5 h-2.5" />
              <span>{isAdmin ? 'اللوحة نشطة' : 'المالك'}</span>
            </button>
          </div>
        </aside>

        {/* MAIN COLUMN: ~67% (Experience & Education) */}
        <main className="w-[67%] flex-1 px-4 py-3 flex flex-col justify-between overflow-hidden">
          
          <div className="space-y-2.5">
            
            {/* Professional Experience Section */}
            <div>
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-200">
                <div className="flex items-center gap-1.5">
                  <Briefcase className={`w-3.5 h-3.5 ${themeStyles.accent}`} />
                  <h2 className={`text-[10.5px] font-bold tracking-wider uppercase ${themeStyles.primary}`}>
                    {isAr ? 'الخبرات العملية والسريرية' : 'Professional Experience'}
                  </h2>
                </div>
                <span className="text-[8.5px] text-slate-500 font-medium">
                  {isAr ? '15+ عاماً من الممارسة والقيادة' : '15+ Years Clinical Practice'}
                </span>
              </div>

              {/* Timeline Container */}
              <div className={`relative ${isAr ? 'pr-3 border-r mr-1' : 'pl-3 border-l ml-1'} space-y-1.5 border-slate-200`}>
                {experienceData.map((exp, idx) => (
                  <div key={idx} className="relative group">
                    <div 
                      className={`absolute ${
                        isAr ? '-right-[16px]' : '-left-[16px]'
                      } top-1 w-2 h-2 rounded-full border-2 border-white ${
                        exp.isLeadership ? themeStyles.accentBg : 'bg-slate-400'
                      }`} 
                    />

                    <div className="flex items-baseline justify-between gap-1 leading-tight">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-baseline gap-x-2">
                          <span className="text-[9.5px] font-bold text-slate-900">
                            {isAr ? exp.title.ar : isEn ? exp.title.en : exp.title.en}
                          </span>
                          {isBilingual && (
                            <span className="text-[9px] font-bold text-blue-900 font-arabic" dir="rtl">
                              {exp.title.ar}
                            </span>
                          )}
                        </div>

                        <div className="text-[8.2px] text-slate-600 flex flex-wrap items-center gap-x-1 mt-0.2">
                          <span className="font-semibold text-slate-800">
                            {isAr ? exp.institution.ar : isEn ? exp.institution.en : exp.institution.en}
                          </span>
                          {isBilingual && (
                            <>
                              <span className="text-slate-300">·</span>
                              <span className="font-arabic text-slate-700">{exp.institution.ar}</span>
                            </>
                          )}
                          {exp.location && (
                            <>
                              <span className="text-slate-300">·</span>
                              <span className="text-slate-500 text-[7.8px]">
                                {isAr ? exp.location.ar : exp.location.en}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <span className="text-[7.8px] font-mono text-slate-500 font-medium shrink-0 bg-slate-50 px-1 py-0.5 rounded border border-slate-200">
                        {isAr ? exp.periodAr || exp.period : exp.period}
                      </span>
                    </div>

                    {exp.highlight && (
                      <p className="text-[7.6px] text-slate-500 leading-tight mt-0.5">
                        {isAr ? exp.highlight.ar : isEn ? exp.highlight.en : (
                          <>
                            <span>{exp.highlight.en}</span>
                            <span className="text-slate-400 mx-1">/</span>
                            <span className="font-arabic text-slate-600">{exp.highlight.ar}</span>
                          </>
                        )}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Qualifications Section */}
            <div>
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-200">
                <div className="flex items-center gap-1.5">
                  <GraduationCap className={`w-3.5 h-3.5 ${themeStyles.accent}`} />
                  <h2 className={`text-[10.5px] font-bold tracking-wider uppercase ${themeStyles.primary}`}>
                    {isAr ? 'المؤهلات العلمية والبورد' : 'Education & Board Certifications'}
                  </h2>
                </div>
                <span className="text-[8.5px] text-slate-500 font-medium">
                  {isAr ? 'التراخيص الوطنية' : 'Accredited'}
                </span>
              </div>

              <div className="space-y-1">
                {educationData.map((edu, idx) => (
                  <div key={idx} className="flex items-start justify-between gap-1 text-[8.5px] leading-tight pb-0.5 border-b border-slate-100 last:border-none last:pb-0">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-2">
                        <span className="font-bold text-slate-900 text-[9px]">
                          {isAr ? edu.degree.ar : isEn ? edu.degree.en : edu.degree.en}
                        </span>
                        {isBilingual && (
                          <span className="font-bold text-slate-800 text-[8.5px] font-arabic" dir="rtl">
                            {edu.degree.ar}
                          </span>
                        )}
                      </div>

                      <div className="text-[7.8px] text-slate-600 flex flex-wrap items-center gap-x-1 mt-0.2">
                        <span>
                          {isAr ? edu.institution.ar : isEn ? edu.institution.en : edu.institution.en}
                        </span>
                        {isBilingual && (
                          <>
                            <span className="text-slate-300">·</span>
                            <span className="font-arabic">{edu.institution.ar}</span>
                          </>
                        )}
                        {edu.location && (
                          <>
                            <span className="text-slate-300">·</span>
                            <span>{isAr ? edu.location.ar : edu.location.en}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <span className="text-[7.8px] font-mono text-slate-500 font-medium shrink-0 bg-slate-50 px-1 py-0.5 rounded border border-slate-200">
                      {edu.period || edu.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Document Certification & Verification */}
          <div className="pt-1.5 border-t border-slate-200 flex items-center justify-between text-[7.5px] text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-600">
                {isAr ? 'السيرة الذاتية المهنية والتنفيذية' : 'Executive Medical CV'}
              </span>
              <span className="text-slate-300">|</span>
              <span>
                {isAr ? 'د. محمد محمود العمري' : 'Dr. Mohammad Mahmoud Ahmad Al-Omari'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>{isAr ? 'مستشفى سارة التخصصي' : 'Sarah Specialty Hospital'}</span>
              <span className="text-slate-300">|</span>
              <span className="font-semibold text-slate-700">
                {isAr ? 'صفحة 1 من 1' : 'Page 1 of 1'}
              </span>
            </div>
          </div>

        </main>

      </div>

      {/* Bottom Accent Bar */}
      <div className="w-full h-1 bg-slate-900 shrink-0" />
    </div>
  );
};
