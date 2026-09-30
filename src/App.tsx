/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { A4Resume, ResumeTheme, DisplayLang } from './components/A4Resume';
import { ResumeToolbar } from './components/ResumeToolbar';
import { InteractiveProfile } from './components/InteractiveProfile';
import { AtsView } from './components/AtsView';
import { QrModal } from './components/QrModal';
import { personalInfo } from './data/resumeData';

export default function App() {
  const [zoom, setZoom] = useState<number>(1.0);
  const [theme, setTheme] = useState<ResumeTheme>('navy');
  const [displayLang, setDisplayLang] = useState<DisplayLang>('bilingual');
  const [viewMode, setViewMode] = useState<'a4' | 'digital' | 'ats'>('a4');
  const [showQr, setShowQr] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Auto-fit zoom on smaller viewports on initial load
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) {
        setZoom(Number((screenWidth / 840).toFixed(2)));
      } else if (screenWidth < 1024) {
        setZoom(0.85);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCopyDetails = () => {
    const text = `${personalInfo.fullName.en} | ${personalInfo.fullName.ar}
${personalInfo.titles[0].en} | ${personalInfo.titles[0].ar}
${personalInfo.titles[1].en} | ${personalInfo.titles[1].ar}
${personalInfo.hospital.en} | ${personalInfo.hospital.ar}
Mobile | الهاتف: ${personalInfo.mobile}
Email | البريد: ${personalInfo.email}
Address | العنوان: ${personalInfo.address.en} | ${personalInfo.address.ar}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col antialiased text-slate-100 selection:bg-blue-600 selection:text-white">
      
      {/* Top Sticky Navigation Toolbar */}
      <ResumeToolbar
        zoom={zoom}
        onZoomChange={setZoom}
        theme={theme}
        onThemeChange={setTheme}
        displayLang={displayLang}
        onDisplayLangChange={setDisplayLang}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onShowQr={() => setShowQr(true)}
        copied={copied}
        onCopyDetails={handleCopyDetails}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full overflow-x-auto relative">
        
        {viewMode === 'a4' && (
          <div className="py-8 px-2 sm:px-6 flex flex-col items-center justify-start min-h-full">
            
            {/* Visual Paper Canvas Wrapper */}
            <div 
              className="transition-transform duration-200 ease-out origin-top shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-sm"
              style={{
                transform: `scale(${zoom})`,
                marginBottom: `${(zoom - 1) * 1150}px`
              }}
            >
              <A4Resume 
                theme={theme} 
                displayLang={displayLang} 
                id="executive-resume-a4" 
              />
            </div>

            {/* Quick helper tip below A4 document */}
            <div className="no-print mt-6 mb-4 text-center text-xs text-slate-400 max-w-md">
              <p className="font-arabic">
                <span className="font-semibold text-slate-300">ملاحظة التصدير والطباعة:</span> اضغط على زر{' '}
                <strong className="text-blue-400 font-bold">"طباعة / PDF"</strong> أو اختصار{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px] text-slate-300">
                  Ctrl+P
                </kbd>{' '}
                لحفظ أو طباعة السيرة الذاتية بحجم A4 قياسي على صفحة واحدة بدقة فائقة.
              </p>
            </div>
          </div>
        )}

        {viewMode === 'digital' && (
          <InteractiveProfile displayLang={displayLang} />
        )}

        {viewMode === 'ats' && (
          <AtsView displayLang={displayLang} />
        )}

      </main>

      {/* QR Code Modal */}
      <QrModal isOpen={showQr} onClose={() => setShowQr(false)} />

      {/* Copied Toast Notification */}
      {copied && (
        <div className="no-print fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-semibold flex items-center gap-2 animate-bounce font-arabic">
          <span>✓ تم نسخ بيانات الاتصال إلى الحافظة بنجاح!</span>
        </div>
      )}

    </div>
  );
}
