import React, { useState } from 'react';
import { 
  Building2, 
  Stethoscope, 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  ShieldCheck, 
  Award, 
  Globe2, 
  Users, 
  CheckCircle2, 
  Download,
  Hospital,
  Activity,
  Briefcase
} from 'lucide-react';
import { 
  personalInfo, 
  professionalSummary, 
  experienceData, 
  educationData, 
  refereesData, 
  coreCompetencies, 
  languages 
} from '../data/resumeData';
import { downloadVCard } from '../utils/vcard';
import { DisplayLang } from './A4Resume';

interface InteractiveProfileProps {
  displayLang?: DisplayLang;
  onOpenInquiry?: () => void;
}

export const InteractiveProfile: React.FC<InteractiveProfileProps> = ({
  displayLang = 'ar',
  onOpenInquiry
}) => {
  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'competencies' | 'referees'>('experience');
  const isAr = displayLang === 'ar';
  const isEn = displayLang === 'en';
  const isBilingual = displayLang === 'bilingual';

  return (
    <div 
      className={`max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-6 text-slate-100 ${
        isAr ? 'font-arabic' : ''
      }`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      
      {/* Executive Hero Card (No photos, pure executive medical styling) */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 rounded-2xl border border-slate-700/80 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
          
          {/* Executive Hospital Monogram Shield */}
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-tr from-slate-950 via-blue-950 to-slate-900 border-2 border-blue-400/40 shadow-2xl flex flex-col items-center justify-center p-4 text-center shrink-0">
            <Hospital className="w-10 h-10 text-cyan-300 mb-1" />
            <span className="text-[11px] font-extrabold tracking-wider uppercase text-white font-mono leading-none">
              SARAH
            </span>
            <span className="text-[9px] font-bold text-blue-300 font-arabic mt-0.5">
              مستشفى سارة
            </span>
            <div className="mt-2 flex items-center gap-1 text-[8.5px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              <ShieldCheck className="w-3 h-3" />
              <span>{isAr ? 'استشاري تخدير' : 'Consultant'}</span>
            </div>
          </div>

          {/* Core Executive Headings */}
          <div className={`flex-1 text-center ${isAr ? 'md:text-right' : 'md:text-left'} space-y-3`}>
            
            <div className={`flex flex-wrap items-center justify-center ${isAr ? 'md:justify-start' : 'md:justify-start'} gap-2`}>
              <span className="px-3 py-1 rounded-md bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold">
                {isAr ? `${personalInfo.hospital.ar} · ${personalInfo.location.ar}` : `${personalInfo.hospital.en} · ${personalInfo.location.en}`}
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {isAr ? personalInfo.fullName.ar : isEn ? personalInfo.fullName.en : (
                  <>
                    <span>{personalInfo.fullName.en}</span>
                    <span className="block text-xl text-blue-300 font-arabic mt-0.5">{personalInfo.fullName.ar}</span>
                  </>
                )}
              </h1>
            </div>

            <div className={`flex flex-wrap items-center justify-center ${isAr ? 'md:justify-start' : 'md:justify-start'} gap-2 text-xs sm:text-sm text-slate-300 font-medium`}>
              <span className="font-bold text-white">
                {isAr ? personalInfo.titles[0].ar : personalInfo.titles[0].en}
              </span>
              <span className="text-slate-600">|</span>
              <span className="font-bold text-blue-200">
                {isAr ? personalInfo.titles[1].ar : personalInfo.titles[1].en}
              </span>
            </div>

            {/* Summary */}
            <div className="pt-2 text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
              {isBilingual ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <p className="border-l-2 border-blue-500 pl-2 text-left" dir="ltr">
                    {professionalSummary.en}
                  </p>
                  <p className="border-r-2 border-blue-500 pr-2 font-arabic text-right" dir="rtl">
                    {professionalSummary.ar}
                  </p>
                </div>
              ) : (
                <p className={`${isAr ? 'border-r-2 pr-2' : 'border-l-2 pl-2'} border-blue-500`}>
                  {isAr ? professionalSummary.ar : professionalSummary.en}
                </p>
              )}
            </div>

            {/* Quick Actions */}
            <div className={`pt-2 flex flex-wrap items-center justify-center ${isAr ? 'md:justify-start' : 'md:justify-start'} gap-3 text-xs font-medium`}>
              <a 
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow transition-colors cursor-pointer font-bold"
              >
                <Mail className="w-3.5 h-3.5" />
                <span dir="ltr">{personalInfo.email}</span>
              </a>

              {onOpenInquiry && (
                <button 
                  onClick={onOpenInquiry}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 rounded-lg shadow transition-colors cursor-pointer"
                >
                  <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isAr ? 'تواصل مؤسسي (المستشفى)' : 'Hospital Office Gateway'}</span>
                </button>
              )}

              <button 
                onClick={downloadVCard}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 rounded-lg transition-colors cursor-pointer font-semibold"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isAr ? 'بطاقة الاتصال (.vcf)' : 'Contact Card (.vcf)'}</span>
              </button>
            </div>

          </div>

        </div>

        {/* Quick Executive Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-700/60">
          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 text-center">
            <span className="text-xl sm:text-2xl font-bold text-white block">15+</span>
            <span className="text-[11px] text-slate-400">
              {isAr ? 'عاماً من القيادة السريرية' : 'Years Clinical Experience'}
            </span>
          </div>
          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 text-center">
            <span className="text-xl sm:text-2xl font-bold text-blue-400 block">CEO</span>
            <span className="text-[11px] text-slate-400">
              {isAr ? 'المدير التنفيذي للمستشفى' : 'Hospital CEO'}
            </span>
          </div>
          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 text-center">
            <span className="text-xl sm:text-2xl font-bold text-white block">2010</span>
            <span className="text-[11px] text-slate-400">
              {isAr ? 'البورد الأردني للتخدير' : 'Jordanian Board'}
            </span>
          </div>
          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 text-center">
            <span className="text-xl sm:text-2xl font-bold text-emerald-400 block">
              {isAr ? 'الأردن والسعودية' : 'Jordan & KSA'}
            </span>
            <span className="text-[11px] text-slate-400">
              {isAr ? 'خبرة إقليمية ودولية' : 'Regional Practice'}
            </span>
          </div>
        </div>

      </div>

      {/* Main Tabbed Content */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 overflow-x-auto">
          <button
            onClick={() => setActiveTab('experience')}
            className={`flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'experience'
                ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span className="font-bold">
              {isAr ? `الخبرات العملية (${experienceData.length})` : `Experience (${experienceData.length})`}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('education')}
            className={`flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'education'
                ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span className="font-bold">
              {isAr ? `المؤهلات والبورد (${educationData.length})` : `Education & Board (${educationData.length})`}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('competencies')}
            className={`flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'competencies'
                ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span className="font-bold">
              {isAr ? 'الكفاءات واللغات' : 'Competencies & Languages'}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('referees')}
            className={`flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'referees'
                ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span className="font-bold">
              {isAr ? `المراجع الأكاديمية (${refereesData.length})` : `Referees (${refereesData.length})`}
            </span>
          </button>
        </div>

        {/* Tab Content Panes */}
        <div className="p-6">
          {activeTab === 'experience' && (
            <div className="space-y-4">
              <div className={`relative ${isAr ? 'pr-6 border-r-2 mr-1' : 'pl-6 border-l-2 ml-1'} space-y-5 border-slate-800`}>
                {experienceData.map((exp, idx) => (
                  <div key={idx} className="relative group">
                    <div 
                      className={`absolute ${
                        isAr ? '-right-[31px]' : '-left-[31px]'
                      } top-1.5 w-3.5 h-3.5 rounded-full border-2 border-slate-900 ${
                        exp.isLeadership ? 'bg-blue-500 shadow-md shadow-blue-500/50' : 'bg-slate-600'
                      }`} 
                    />
                    <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 hover:border-slate-600 transition-all">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                            {isAr ? exp.title.ar : isEn ? exp.title.en : exp.title.en}
                          </h4>
                          {isBilingual && (
                            <span className="text-base font-bold text-blue-300 font-arabic">
                              · {exp.title.ar}
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 text-blue-300 border border-slate-700">
                          {isAr ? exp.periodAr || exp.period : exp.period}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 mt-1 font-medium">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>{isAr ? exp.institution.ar : isEn ? exp.institution.en : exp.institution.en}</span>
                        {exp.location && (
                          <>
                            <span className="text-slate-600">·</span>
                            <span className="text-slate-400">{isAr ? exp.location.ar : exp.location.en}</span>
                          </>
                        )}
                      </div>
                      {exp.highlight && (
                        <div className="text-xs text-slate-400 mt-2.5 leading-relaxed bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/80">
                          <p>{isAr ? exp.highlight.ar : isEn ? exp.highlight.en : exp.highlight.en}</p>
                          {isBilingual && (
                            <p className="font-arabic text-slate-300 mt-1" dir="rtl">{exp.highlight.ar}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {educationData.map((edu, idx) => (
                <div key={idx} className="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono text-blue-300 px-2 py-0.5 rounded bg-slate-900 border border-slate-700">
                        {edu.period || edu.year}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white">
                      {isAr ? edu.degree.ar : isEn ? edu.degree.en : edu.degree.en}
                    </h4>
                    {isBilingual && (
                      <h5 className="text-xs font-bold text-blue-300 font-arabic">
                        {edu.degree.ar}
                      </h5>
                    )}
                    <p className="text-xs text-slate-300 font-medium">
                      {isAr ? edu.institution.ar : isEn ? edu.institution.en : edu.institution.en}
                    </p>
                    {edu.details && (
                      <p className="text-xs text-slate-400 leading-relaxed pt-1">
                        {isAr ? edu.details.ar : isEn ? edu.details.en : edu.details.en}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'competencies' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {coreCompetencies.map((cat, i) => (
                  <div key={i} className="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 space-y-3">
                    <div className="flex items-center justify-between text-blue-400 font-bold text-sm">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        <span>{isAr ? cat.title.ar : cat.title.en}</span>
                      </div>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {cat.skills.map((skill, si) => (
                        <li key={si} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="block font-semibold text-white">
                              {isAr ? skill.ar : skill.en}
                            </span>
                            {isBilingual && (
                              <span className="text-slate-400 font-arabic text-[11px] block">{skill.ar}</span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Languages */}
              <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-4">
                  <Globe2 className="w-4 h-4" />
                  <span className="font-bold">
                    {isAr ? 'اللغات المتقنة' : 'Languages Spoken'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {languages.map((lang, li) => (
                    <div key={li} className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-white">
                          {isAr ? lang.name.ar : lang.name.en}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 block mt-1">
                        {isAr ? lang.level.ar : lang.level.en}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'referees' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {refereesData.map((ref, idx) => (
                <div key={idx} className="bg-slate-800/60 p-6 rounded-xl border border-slate-700/60 relative overflow-hidden">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0">
                      <Users className="w-6 h-6" />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <h4 className="text-base font-bold text-white">
                        {isAr ? ref.name.ar : isEn ? ref.name.en : ref.name.en}
                      </h4>
                      <p className="text-xs font-semibold text-blue-200">
                        {isAr ? `${ref.academicTitle.ar} · ${ref.institution.ar}` : `${ref.academicTitle.en} · ${ref.institution.en}`}
                      </p>
                      <p className="text-xs text-slate-300">
                        {isAr ? `${ref.clinicalTitle.ar}، ${ref.hospital.ar}` : `${ref.clinicalTitle.en}, ${ref.hospital.en}`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
