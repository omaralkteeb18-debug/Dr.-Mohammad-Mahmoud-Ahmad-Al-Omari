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
  Globe2
} from 'lucide-react';
import { ResumeTheme, DisplayLang } from './A4Resume';
import { downloadVCard } from '../utils/vcard';
import { personalInfo } from '../data/resumeData';

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
  copied,
  onCopyDetails
}) => {
  const handlePrint = () => {
    window.print();
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

        {/* PRIMARY LANGUAGE SELECTOR (عربي / English / ثنائي) */}
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
            title="عرض وطباعة باللغة العربية فقط"
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
            title="View & Print in English Only"
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
            title="عرض باللغتين معاً (Arabic + English)"
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
            {/* Zoom Controls */}
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

            {/* Theme Selector */}
            <div className="flex items-center bg-slate-800/80 rounded-lg border border-slate-700/60 p-1 gap-1 text-xs">
              <Palette className="w-3.5 h-3.5 text-slate-400 ml-1" />
              <button
                onClick={() => onThemeChange('navy')}
                className={`w-4 h-4 rounded-full border cursor-pointer ${
                  theme === 'navy' ? 'ring-2 ring-blue-400 border-white' : 'border-slate-600'
                } bg-[#0a192f]`}
                title="Medical Navy & Sapphire | الكحلي الطبي"
              />
              <button
                onClick={() => onThemeChange('teal')}
                className={`w-4 h-4 rounded-full border cursor-pointer ${
                  theme === 'teal' ? 'ring-2 ring-emerald-400 border-white' : 'border-slate-600'
                } bg-[#0d9488]`}
                title="Clinical Teal | التيل السريري"
              />
              <button
                onClick={() => onThemeChange('slate')}
                className={`w-4 h-4 rounded-full border cursor-pointer ${
                  theme === 'slate' ? 'ring-2 ring-slate-300 border-white' : 'border-slate-600'
                } bg-[#334155]`}
                title="Steel Slate | الرمادي الأنيق"
              />
            </div>
          </div>
        )}

        {/* Action Buttons: Print, vCard, Copy, QR */}
        <div className="flex items-center gap-2">
          <button
            onClick={onShowQr}
            className="p-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
            title="Scan QR Code / رمز QR"
          >
            <QrCode className="w-4 h-4" />
          </button>

          <button
            onClick={downloadVCard}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 rounded-lg transition-colors cursor-pointer"
            title="Download vCard (.vcf) contact file"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>{displayLang === 'ar' ? 'حفظ الاتصال' : 'Save vCard'}</span>
          </button>

          <button
            onClick={onCopyDetails}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 rounded-lg transition-colors cursor-pointer"
            title="Copy Contact Information"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">{displayLang === 'ar' ? 'تم النسخ!' : 'Copied!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-300" />
                <span>{displayLang === 'ar' ? 'نسخ البيانات' : 'Copy Info'}</span>
              </>
            )}
          </button>

          {/* Primary Action: Print / PDF */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-lg shadow-md hover:shadow-blue-500/20 transition-all cursor-pointer"
            title="Print or Save as PDF | طباعة أو تصدير كملف PDF"
          >
            <Printer className="w-4 h-4" />
            <span className="font-bold">{displayLang === 'ar' ? 'طباعة / PDF' : 'Print / PDF'}</span>
          </button>
        </div>

      </div>
    </header>
  );
};
