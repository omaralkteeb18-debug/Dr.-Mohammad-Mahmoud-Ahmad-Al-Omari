import React, { useState } from 'react';
import { X, Send, Building2, User, Mail, MessageSquare, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useCv } from '../context/CvContext';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose }) => {
  const { submitInquiry } = useCv();
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !message) {
      setError('يرجى ملء جميع الحقول الإلزامية | Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await submitInquiry({
        senderName,
        senderEmail,
        organization,
        subject: subject || 'Professional Medical / Executive Inquiry',
        message
      });

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setSenderName('');
        setSenderEmail('');
        setOrganization('');
        setSubject('');
        setMessage('');
      }, 2500);
    } catch (err: any) {
      console.error(err);
      setError('تعذر إرسال الرسالة، يرجى المحاولة لاحقاً | Could not send inquiry');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-lg w-full shadow-2xl relative text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-arabic">
              التواصل المؤسسي والمهني | Official Contact Gateway
            </h3>
            <p className="text-xs text-slate-400">
              Sarah Specialty Hospital · Office of the CEO & Anesthesia Department
            </p>
          </div>
        </div>

        {/* Privacy Shield Notice */}
        <div className="mb-4 p-3 rounded-lg bg-blue-950/50 border border-blue-800/60 flex items-start gap-2 text-xs text-blue-200">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block font-arabic">حماية الخصوصية مفعلة:</span>
            <span className="text-[11px] text-slate-300">
              تصل رسالتك مباشرة وبأمان إلى لوحة الإدارة الخاصة بالدكتور محمد العمري مع حجب البيانات الشخصية العامة.
            </span>
          </div>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-lg font-bold text-white font-arabic">تم إرسال رسالتك بنجاح!</h4>
            <p className="text-xs text-slate-300 font-arabic">
              سيقوم مكتب الدكتور محمد العمري بالرد عليك عبر بريدك الإلكتروني في أقرب وقت.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {error && (
              <div className="p-2 rounded bg-rose-950/80 border border-rose-800 text-rose-300 text-xs">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  الاسم الكامل / Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="د. / أ. / اسمك الكريم"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  البريد الإلكتروني / Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="your.email@hospital.org"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  المؤسسة / Organization
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="المستشفى / الجامعة / المركز الطبي"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  الموضوع / Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="استشارة طبية / تعاون سريري / مؤتمر"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                نص الرسالة / Message *
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="اكتب تفاصيل طلبك أو استفسارك المهني هنا..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              >
                إلغاء / Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow transition-all cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'جارٍ الإرسال...' : 'إرسال الرسالة'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
