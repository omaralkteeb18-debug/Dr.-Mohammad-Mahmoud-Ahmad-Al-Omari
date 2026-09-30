/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CvProvider, useCv } from './context/CvContext';
import { A4Resume, ResumeTheme, DisplayLang } from './components/A4Resume';
import { ResumeToolbar } from './components/ResumeToolbar';
import { InteractiveProfile } from './components/InteractiveProfile';
import { AtsView } from './components/AtsView';
import { QrModal } from './components/QrModal';
import { InquiryModal } from './components/InquiryModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { ShieldCheck, Lock } from 'lucide-react';

function ResumeApp() {
  const [zoom, setZoom] = useState<number>(1.0);
  const [theme, setTheme] = useState<ResumeTheme>('navy');
  const [displayLang, setDisplayLang] = useState<DisplayLang>('ar');
  const [viewMode, setViewMode] = useState<'a4' | 'digital' | 'ats'>('a4');
  
  // Modals state
  const [showQr, setShowQr] = useState<boolean>(false);
  const [showInquiry, setShowInquiry] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showDashboard, setShowDashboard] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const { cvData, isAdmin, privacySettings } = useCv();

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
    // Copy only public professional details (shielding personal phone and personal email unless enabled)
    let text = `${cvData.personalInfo.fullName.en} | ${cvData.personalInfo.fullName.ar}
${cvData.personalInfo.titles[0]?.en || ''} | ${cvData.personalInfo.titles[0]?.ar || ''}
${cvData.personalInfo.hospital.en} | ${cvData.personalInfo.hospital.ar}
Location: ${cvData.personalInfo.location.en} | ${cvData.personalInfo.location.ar}
Institution Address: ${cvData.personalInfo.address.en}`;

    text += `\nEmail: ${cvData.personalInfo.email}`;
    text += `\nOffice & Facility: Sarah Specialty Hospital, Irbid, Jordan`;
    text += `\nOfficial Inquiries: Via Sarah Specialty Hospital Executive Office Gateway`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenAdminPortal = () => {
    if (isAdmin) {
      setShowDashboard(true);
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col antialiased text-slate-100 selection:bg-blue-600 selection:text-white font-montserrat">
      
      {/* Admin Logged-In Top Banner */}
      {isAdmin && (
        <div className="no-print bg-emerald-950 border-b border-emerald-800/80 px-4 py-1.5 flex items-center justify-between text-xs text-emerald-200">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-bold">أنت متصل كمالك للسيرة الذاتية (Owner Authenticated)</span>
            <span className="hidden sm:inline text-emerald-400 text-[11px]">· البيانات المحجوبة عن العامة ظاهرة لك فقط</span>
          </div>
          <button
            onClick={() => setShowDashboard(true)}
            className="px-3 py-0.5 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            فتح لوحة التحكم والتعديل
          </button>
        </div>
      )}

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
        onOpenInquiry={() => setShowInquiry(true)}
        onOpenAdmin={handleOpenAdminPortal}
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
                onOpenInquiry={() => setShowInquiry(true)}
                onOpenAdminLogin={() => handleOpenAdminPortal()}
              />
            </div>

            {/* Privacy notice banner below A4 document */}
            <div className="no-print mt-6 mb-4 text-center text-xs text-slate-400 max-w-lg space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-slate-300 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>حماية الخصوصية مفعلة (Privacy Protected)</span>
              </div>
              <p className="text-[11px] text-slate-400 font-arabic">
                يتم حجب بيانات الاتصال الشخصية عن الزوار ومحركات البحث. للتواصل الرسمي مع مكتب الدكتور محمد العمري، يرجى استخدام زر <strong className="text-cyan-300">"تواصل مؤسسي"</strong>.
              </p>
            </div>
          </div>
        )}

        {viewMode === 'digital' && (
          <InteractiveProfile 
            displayLang={displayLang} 
            onOpenInquiry={() => setShowInquiry(true)} 
          />
        )}

        {viewMode === 'ats' && (
          <AtsView displayLang={displayLang} />
        )}

      </main>

      {/* Modals & Dialogs */}
      <InquiryModal 
        isOpen={showInquiry} 
        onClose={() => setShowInquiry(false)} 
      />

      <AdminLoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
        onSuccess={() => setShowDashboard(true)} 
      />

      <AdminDashboard 
        isOpen={showDashboard} 
        onClose={() => setShowDashboard(false)} 
      />

      <QrModal 
        isOpen={showQr} 
        onClose={() => setShowQr(false)} 
      />

      {/* Copied Toast Notification */}
      {copied && (
        <div className="no-print fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-semibold flex items-center gap-2 animate-bounce font-arabic">
          <span>✓ تم نسخ البيانات المهنية بنجاح!</span>
        </div>
      )}

    </div>
  );
}

export default function App() {
  return (
    <CvProvider>
      <ResumeApp />
    </CvProvider>
  );
}
