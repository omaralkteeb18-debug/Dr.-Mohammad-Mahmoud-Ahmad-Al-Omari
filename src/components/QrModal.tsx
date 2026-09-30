import React from 'react';
import { X, QrCode, Phone, Mail, MapPin, Download } from 'lucide-react';
import { personalInfo } from '../data/resumeData';
import { downloadVCard } from '../utils/vcard';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QrModal: React.FC<QrModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl relative text-slate-200 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-3 text-blue-400">
          <QrCode className="w-6 h-6" />
        </div>

        <h3 className="text-base font-bold text-white">Digital Contact Card</h3>
        <p className="text-xs text-blue-300 font-arabic">بطاقة الاتصال المهنية الرقمية</p>
        <p className="text-xs text-slate-400 mt-1">
          امسح الرمز بكاميرا الهاتف لحفظ بيانات الدكتور محمد العمري مباشرة في جهات الاتصال.
        </p>

        {/* QR Code Graphic */}
        <div className="my-5 p-4 bg-white rounded-xl inline-block shadow-inner mx-auto">
          <svg
            className="w-44 h-44"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="200" height="200" fill="white" />
            
            {/* Top-Left Target */}
            <rect x="20" y="20" width="46" height="46" rx="6" fill="#0A192F" />
            <rect x="27" y="27" width="32" height="32" rx="3" fill="white" />
            <rect x="34" y="34" width="18" height="18" rx="2" fill="#0284C7" />

            {/* Top-Right Target */}
            <rect x="134" y="20" width="46" height="46" rx="6" fill="#0A192F" />
            <rect x="141" y="27" width="32" height="32" rx="3" fill="white" />
            <rect x="148" y="34" width="18" height="18" rx="2" fill="#0284C7" />

            {/* Bottom-Left Target */}
            <rect x="20" y="134" width="46" height="46" rx="6" fill="#0A192F" />
            <rect x="27" y="141" width="32" height="32" rx="3" fill="white" />
            <rect x="34" y="148" width="18" height="18" rx="2" fill="#0284C7" />

            {/* Data grid points */}
            <g fill="#0A192F">
              <rect x="76" y="22" width="8" height="8" rx="1.5" />
              <rect x="92" y="22" width="14" height="8" rx="1.5" />
              <rect x="114" y="22" width="8" height="8" rx="1.5" />

              <rect x="76" y="38" width="14" height="8" rx="1.5" />
              <rect x="100" y="38" width="8" height="8" rx="1.5" />
              <rect x="114" y="38" width="12" height="8" rx="1.5" />

              <rect x="76" y="54" width="8" height="8" rx="1.5" />
              <rect x="90" y="54" width="8" height="8" rx="1.5" />
              <rect x="106" y="54" width="16" height="8" rx="1.5" />

              <rect x="22" y="76" width="8" height="14" rx="1.5" />
              <rect x="38" y="76" width="12" height="8" rx="1.5" />
              <rect x="58" y="76" width="8" height="8" rx="1.5" />
              <rect x="76" y="76" width="18" height="8" rx="1.5" />
              <rect x="102" y="76" width="8" height="18" rx="1.5" />
              <rect x="118" y="76" width="16" height="8" rx="1.5" />
              <rect x="142" y="76" width="12" height="14" rx="1.5" />
              <rect x="162" y="76" width="16" height="8" rx="1.5" />

              <rect x="22" y="98" width="18" height="8" rx="1.5" />
              <rect x="48" y="98" width="8" height="14" rx="1.5" />
              <rect x="64" y="98" width="14" height="8" rx="1.5" />
              <rect x="86" y="98" width="8" height="8" rx="1.5" />
              <rect x="120" y="98" width="14" height="8" rx="1.5" />
              <rect x="142" y="98" width="8" height="14" rx="1.5" />
              <rect x="158" y="98" width="20" height="8" rx="1.5" />

              <rect x="22" y="114" width="8" height="8" rx="1.5" />
              <rect x="38" y="114" width="14" height="8" rx="1.5" />
              <rect x="60" y="114" width="12" height="8" rx="1.5" />
              <rect x="80" y="114" width="14" height="14" rx="1.5" />
              <rect x="102" y="114" width="8" height="8" rx="1.5" />
              <rect x="118" y="114" width="18" height="8" rx="1.5" />
              <rect x="144" y="114" width="14" height="8" rx="1.5" />
              <rect x="166" y="114" width="12" height="8" rx="1.5" />

              <rect x="76" y="136" width="12" height="8" rx="1.5" />
              <rect x="96" y="136" width="16" height="8" rx="1.5" />
              <rect x="120" y="136" width="8" height="16" rx="1.5" />
              <rect x="136" y="136" width="14" height="8" rx="1.5" />
              <rect x="158" y="136" width="20" height="8" rx="1.5" />

              <rect x="76" y="152" width="16" height="8" rx="1.5" />
              <rect x="100" y="152" width="8" height="16" rx="1.5" />
              <rect x="136" y="152" width="18" height="8" rx="1.5" />
              <rect x="162" y="152" width="16" height="8" rx="1.5" />

              <rect x="76" y="168" width="8" height="10" rx="1.5" />
              <rect x="92" y="168" width="18" height="10" rx="1.5" />
              <rect x="118" y="168" width="12" height="10" rx="1.5" />
              <rect x="138" y="168" width="8" height="10" rx="1.5" />
              <rect x="154" y="168" width="24" height="10" rx="1.5" />
            </g>

            {/* Medical Shield Center in QR */}
            <circle cx="100" cy="100" r="14" fill="#0A192F" stroke="white" strokeWidth="2" />
            <path
              d="M100 93 V107 M94 97 H106"
              stroke="#0284C7"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="text-xs text-slate-300 space-y-1 mb-4">
          <div className="font-semibold text-white">{personalInfo.fullName.en}</div>
          <div className="font-arabic text-blue-300 font-bold">{personalInfo.fullName.ar}</div>
          <div className="text-slate-400 text-[11px]">Sarah Specialty Hospital · Irbid, Jordan</div>
          <div className="text-slate-400 text-[11px] font-arabic">مستشفى سارة التخصصي · إربد - الأردن</div>
        </div>

        <button
          onClick={downloadVCard}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow transition-all cursor-pointer font-arabic"
        >
          <Download className="w-4 h-4" />
          <span>حفظ بطاقة المقر المؤسسي (.vcf) في الهاتف</span>
        </button>
      </div>
    </div>
  );
};
