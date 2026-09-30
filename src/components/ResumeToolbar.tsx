import React from 'react';
import { 
  Printer, 
  Download, 
  Copy, 
  Check, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  FileText, 
  Palette, 
  Sparkles,
  QrCode,
  Layout,
  Globe2,
  Lock,
  ShieldCheck,
  Edit,
  Mail
} from 'lucide-react';
import { ResumeTheme, DisplayLang } from './A4Resume';
import { useCv } from '../context/CvContext';

interface ResumeToolbarProps {
  zoom: number;
  onZoomChange: (newZoom: number) => void;
  theme: ResumeTheme;
  onThemeChange: (theme: ResumeTheme) => void;
  displayLang: DisplayLang;
  onDisplayLangChange: (lang: DisplayLang) => void;
  viewMode: 'a4' | 'digital' | 'ats';
  onViewModeChange: (mode: 'a4' | 'digital' | 'ats') => void;
  onShowQr: () => void;
  onOpenInquiry: () => void;
  onOpenAdmin: () => void;
  copied: boolean;
  onCopyDetails: () => void;
}

export const ResumeToolbar: React.FC<ResumeToolbarProps> = ({
  zoom,
  onZoomChange,
  theme,
  onThemeChange,
  displayLang,
  onDisplayLangChange,
  viewMode,
  onViewModeChange,
  onShowQr,
  onOpenInquiry,
  onOpenAdmin,
  copied,
  onCopyDetails
}) => {
  const { isAdmin, privacySettings, cvData } = useCv();

  const handlePrint = () => {
    window.print();
  };

  // Safe vCard download that honors privacy settings
  const handleSafeVCardDownload = () => {
    const lines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${cvData.personalInfo.fullName.en}`,
      `N:Al-Omari;Mohammad;Mahmoud Ahmad;Dr.;`,
      `TITLE:${cvData.personalInfo.titles[0]?.en || 'CEO'}`,
      `ORG:Sarah Specialty Hospital`,
      `ADR;TYPE=WORK:;;Sarah Specialty Hospital, Irbid;Irbid;;;Jordan`
    ];

    if (privacySettings.showPhonePublicly || isAdmin) {
      lines.push(`TEL;TYPE=CELL,VOICE:${cvData.personalInfo.mobile}`);
    }

    lines.push(`EMAIL;TYPE=PREF,INTERNET:${cvData.personalInfo.email}`);

    lines.push('NOTE:Consultant Anesthesiologist & CEO of Sarah Specialty Hospital.');
    lines.push('END:VCARD');

    const blob = new Blob([lines.join('\r\n')], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Dr_Mohammad_Al_Omari_Executive_Contact.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <header className="no-print sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        
        {/* Brand / Doctor Profile Identifier */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center font-serif text-white font-bold text-xs shadow-md border border-blue-400/20 shrink-0">
            MD
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h1 className="font-bold text-sm text-white tracking-wide">
                {displayLang === 'ar' ? 'د. محمد محمود العمري' : 'Dr. Mohammad Al-Omari'}
              </h1>
              <span className="hidden sm:inline-block text-[11px] text-blue-300 font-medium">
                {displayLang === 'ar' ? 'المدير التنفيذي لمستشفى سارة' : 'CEO · Sarah Specialty Hospital'}
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              {displayLang === 'ar' ? 'سيرة ذاتية تنفيذية فاخرة (A4)' : 'Executive Medical CV (A4 Page)'}
            </p>
          </div>
        </div>

        {/* PRIMARY LANGUAGE SELECTOR */}
        <div className="flex items-center bg-slate-800/90 p-0.5 rounded-lg border border-slate-700/80 shadow-inner">
          <div className="px-2 py-1 text-slate-400 flex items-center gap-1 text-xs">
            <Globe2 className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden md:inline font-arabic text-[11px]">اللغة:</span>
          </div>

          <button
            onClick={() => onDisplayLangChange('ar')}
            className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer font-arabic ${
              displayLang === 'ar'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
            title="عرض وطباعة باللغة العربية"
          >
            العربية
          </button>

          <button
            onClick={() => onDisplayLangChange('en')}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              displayLang === 'en'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
            title="View & Print in English"
          >
            English
          </button>

          <button
            onClick={() => onDisplayLangChange('bilingual')}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              displayLang === 'bilingual'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
            title="عرض باللغتين معاً"
          >
            عربي + EN
          </button>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-slate-800/90 p-0.5 rounded-lg border border-slate-700/60 text-xs">
          <button
            onClick={() => onViewModeChange('a4')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
              viewMode === 'a4' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
            title="A4 Print Ready Preview"
          >
            <Layout className="w-3.5 h-3.5" />
            <span>{displayLang === 'ar' ? 'وثيقة A4' : 'A4 Document'}</span>
          </button>

          <button
            onClick={() => onViewModeChange('digital')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
              viewMode === 'digital' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
            title="Interactive Digital Profile"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{displayLang === 'ar' ? 'عرض تفاعلي' : 'Interactive'}</span>
          </button>

          <button
            onClick={() => onViewModeChange('ats')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
              viewMode === 'ats' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
            title="Plain text for ATS & recruitment systems"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>ATS</span>
          </button>
        </div>

        {/* Controls: Zoom & Theme (Active in A4 mode) */}
        {viewMode === 'a4' && (
          <div className="hidden lg:flex items-center gap-2">
            <div className="flex items-center bg-slate-800/80 rounded-lg border border-slate-700/60 p-0.5 text-xs text-slate-300">
              <button
                onClick={() => onZoomChange(Math.max(0.5, Number((zoom - 0.1).toFixed(1))))}
                disabled={zoom <= 0.5}
                className="p-1.5 hover:bg-slate-700 rounded transition-colors disabled:opacity-30 cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => onZoomChange(1)}
                className="px-2 font-mono text-[11px] text-slate-200 hover:text-white cursor-pointer"
                title="Reset to 100%"
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                onClick={() => onZoomChange(Math.min(1.5, Number((zoom + 0.1).toFixed(1))))}
                disabled={zoom >= 1.5}
                className="p-1.5 hover:bg-slate-700 rounded transition-colors disabled:opacity-30 cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onZoomChange(0.95)}
                className="p-1.5 hover:bg-slate-700 rounded transition-colors cursor-pointer"
                title="Fit to Page"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center bg-slate-800/80 rounded-lg border border-slate-700/60 p-1 gap-1 text-xs">
              <Palette className="w-3.5 h-3.5 text-slate-400 ml-1" />
              <button
                onClick={() => onThemeChange('navy')}
                className={`w-4 h-4 rounded-full border cursor-pointer ${
                  theme === 'navy' ? 'ring-2 ring-blue-400 border-white' : 'border-slate-600'
                } bg-[#0a192f]`}
                title="Medical Navy & Sapphire"
              />
              <button
                onClick={() => onThemeChange('teal')}
                className={`w-4 h-4 rounded-full border cursor-pointer ${
                  theme === 'teal' ? 'ring-2 ring-emerald-400 border-white' : 'border-slate-600'
                } bg-[#0d9488]`}
                title="Clinical Teal"
              />
              <button
                onClick={() => onThemeChange('slate')}
                className={`w-4 h-4 rounded-full border cursor-pointer ${
                  theme === 'slate' ? 'ring-2 ring-slate-300 border-white' : 'border-slate-600'
                } bg-[#334155]`}
                title="Steel Slate"
              />
            </div>
          </div>
        )}

        {/* Action Buttons: Inquiry, Owner Access, Print, vCard, Copy */}
        <div className="flex items-center gap-2">
          
          {/* Public Inquiry Button */}
          <button
            onClick={onOpenInquiry}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-cyan-300 bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-700/60 rounded-lg transition-colors cursor-pointer"
            title="إرسال استفسار مؤسسي رسمي"
          >
            <Mail className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-arabic">تواصل مؤسسي</span>
          </button>

          {/* Owner Dashboard Access Button */}
          <button
            onClick={onOpenAdmin}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
              isAdmin 
                ? 'bg-emerald-950 text-emerald-300 border-emerald-600 shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
            }`}
            title={isAdmin ? 'فتح لوحة التحكم الخاصة' : 'تسجيل دخول المالك والمدير التنفيذي'}
          >
            {isAdmin ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-arabic">لوحة التحكم</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline font-arabic">بوابة المالك</span>
              </>
            )}
          </button>

          {/* Safe vCard */}
          <button
            onClick={handleSafeVCardDownload}
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 rounded-lg transition-colors cursor-pointer"
            title="Download vCard contact file"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>vCard</span>
          </button>

          {/* Copy Info */}
          <button
            onClick={onCopyDetails}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 rounded-lg transition-colors cursor-pointer"
            title="Copy Public Information"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">{displayLang === 'ar' ? 'تم النسخ!' : 'Copied!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-300" />
                <span>{displayLang === 'ar' ? 'نسخ' : 'Copy'}</span>
              </>
            )}
          </button>

          {/* Print / Save as PDF */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-lg shadow-md hover:shadow-blue-500/20 transition-all cursor-pointer"
            title="Print or Save as PDF"
          >
            <Printer className="w-4 h-4" />
            <span>{displayLang === 'ar' ? 'طباعة / PDF' : 'Print / PDF'}</span>
          </button>
        </div>

      </div>
    </header>
  );
};
