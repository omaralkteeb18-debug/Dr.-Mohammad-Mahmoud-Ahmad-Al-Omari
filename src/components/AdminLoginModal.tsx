import React, { useState } from 'react';
import { X, Lock, Mail, Key, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';
import { useCv } from '../context/CvContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { login } = useCv();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('يرجى إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      onSuccess();
      onClose();
      setEmail('');
      setPassword('');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'بيانات الاعتماد غير صحيحة. الدخول مقتصر حصرياً على المالك.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full shadow-2xl relative text-slate-100 font-arabic"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Title */}
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800 text-right">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              بوابة المالك والمدير التنفيذي | Owner Portal
            </h3>
            <p className="text-xs text-slate-400 font-sans" dir="ltr">
              Restricted Exclusively to Dr. Mohammad Al-Omari
            </p>
          </div>
        </div>

        {/* Security Alert Badge */}
        <div className="mb-4 p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-2 text-xs text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            منطقة مشفرة ومحمية بـ <strong>Firebase Authentication</strong> وحوكمة أمنية (RBAC). الدخول مقصور حصرياً على المالك المصرح له فقط.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-2.5 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs text-right">
          <div>
            <label className="block text-slate-300 font-medium mb-1">
              البريد الإلكتروني المعتمد للمالك / Authorized Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute right-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pr-9 pl-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-left font-mono"
                dir="ltr"
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">
              كلمة المرور / Password
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-500 absolute right-3 top-2.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pr-9 pl-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-left font-mono"
                dir="ltr"
                autoComplete="current-password"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow transition-all cursor-pointer disabled:opacity-50"
            >
              <span>{isLoading ? 'جارٍ التحقق المشفر...' : 'تسجيل الدخول إلى لوحة التحكم'}</span>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
