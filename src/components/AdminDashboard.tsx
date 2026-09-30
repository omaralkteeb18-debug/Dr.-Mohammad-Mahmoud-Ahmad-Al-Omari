import React, { useState } from 'react';
import { 
  X, 
  Save, 
  Shield, 
  Eye, 
  EyeOff, 
  Lock, 
  Plus, 
  Trash2, 
  Edit3, 
  Mail, 
  Phone, 
  Briefcase, 
  GraduationCap, 
  Inbox, 
  LogOut, 
  Check, 
  AlertCircle,
  Building2,
  FileText,
  User,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { useCv } from '../context/CvContext';
import { ExperienceItem, EducationItem } from '../types/resume';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const { 
    cvData, 
    updateCvData, 
    updatePrivacySettings, 
    logout, 
    user, 
    inquiries, 
    deleteInquiry,
    resetToDefault
  } = useCv();

  const [activeTab, setActiveTab] = useState<'privacy' | 'content' | 'inbox'>('privacy');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Local state for editing CV Content
  const [formData, setFormData] = useState(cvData);

  // Sync with context if cvData updates
  React.useEffect(() => {
    setFormData(cvData);
  }, [cvData]);

  if (!isOpen) return null;

  const handleSaveAll = async () => {
    setIsSaving(true);
    setErrorMsg('');
    try {
      await updateCvData(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'حدث خطأ أثناء حفظ التعديلات.');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrivacyToggle = async (key: keyof typeof cvData.privacySettings) => {
    const updated = !formData.privacySettings[key];
    const newSettings = {
      ...formData.privacySettings,
      [key]: updated
    };
    setFormData(prev => ({
      ...prev,
      privacySettings: newSettings
    }));
    await updatePrivacySettings({ [key]: updated });
  };

  // Add new Experience position
  const handleAddExperience = () => {
    const newExp: ExperienceItem = {
      period: '2026 – Present',
      periodAr: '2026 - حتى الآن',
      title: {
        en: 'New Executive Clinical Appointment',
        ar: 'مسمى وظيفي أو سريري جديد'
      },
      institution: {
        en: 'Sarah Specialty Hospital',
        ar: 'مستشفى سارة التخصصي'
      },
      location: {
        en: 'Irbid, Jordan',
        ar: 'إربد - الأردن'
      },
      highlight: {
        en: 'Leadership and clinical scope.',
        ar: 'نطاق المسؤوليات السريرية والتنفيذية.'
      },
      isLeadership: true
    };

    setFormData(prev => ({
      ...prev,
      experienceData: [newExp, ...prev.experienceData]
    }));
  };

  const handleDeleteExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      experienceData: prev.experienceData.filter((_, i) => i !== index)
    }));
  };

  // Add new Education item
  const handleAddEducation = () => {
    const newEdu: EducationItem = {
      degree: {
        en: 'Fellowship / Board Degree',
        ar: 'شهادة زمالة / بورد تخصصي'
      },
      institution: {
        en: 'Medical Council / University',
        ar: 'المجلس الطبي / الجامعة'
      },
      period: '2026',
      details: {
        en: 'Advanced specialization credentials',
        ar: 'بيانات التخصص والاعتماد'
      }
    };

    setFormData(prev => ({
      ...prev,
      educationData: [newEdu, ...prev.educationData]
    }));
  };

  const handleDeleteEducation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      educationData: prev.educationData.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-5xl h-[92vh] shadow-2xl flex flex-col overflow-hidden text-slate-100 font-arabic"
        dir="rtl"
      >
        {/* Top Header Bar */}
        <header className="px-6 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">لوحة تحكم المالك الخاصة</h2>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/50 font-mono">
                  Owner Active (RBAC)
                </span>
              </div>
              <p className="text-xs text-slate-400">
                مكتب الدكتور محمد العمري · التحكم بالمحتوى وإعدادات الخصوصية
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Save Button */}
            <button
              onClick={handleSaveAll}
              disabled={isSaving}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow transition-all cursor-pointer disabled:opacity-50"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>تم الحفظ في السحابة!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'جارٍ الحفظ...' : 'حفظ التعديلات'}</span>
                </>
              )}
            </button>

            {/* Logout Button */}
            <button
              onClick={async () => {
                await logout();
                onClose();
              }}
              className="p-2 text-slate-400 hover:text-rose-300 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="تسجيل الخروج"
            >
              <LogOut className="w-4 h-4" />
            </button>

            {/* Close Modal */}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="إغلاق لوحة التحكم"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-900 px-6 shrink-0">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'privacy'
                ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>إعدادات الخصوصية والحماية (Privacy Settings)</span>
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'content'
                ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>تعديل محتوى السيرة الذاتية (CV Content)</span>
          </button>

          <button
            onClick={() => setActiveTab('inbox')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer relative ${
              activeTab === 'inbox'
                ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>صندوق الرسائل والاستفسارات (Inquiries)</span>
            {inquiries.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-mono">
                {inquiries.length}
              </span>
            )}
          </button>
        </div>

        {/* Main Tab Content Panes */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {errorMsg && (
            <div className="p-3 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* TAB 1: PRIVACY & VISIBILITY CONTROLS */}
          {activeTab === 'privacy' && (
            <div className="space-y-6 max-w-3xl">
              
              <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-800/60">
                <div className="flex items-center gap-2 text-blue-300 font-bold text-sm mb-1">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <span>نظام حماية الخصوصية ومكافحة التطفل الإلكتروني</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  بشكل افتراضي ومطابق لأعلى معايير الأمن السيبراني وحماية البيانات، يتم إخفاء أرقام الهواتف الشخصية والبريد الإلكتروني والعناوين السكنية عن الزوار ومحركات البحث. يمكنك تمكين ظهور أي منها متى شئت.
                </p>
              </div>

              <div className="bg-slate-950 rounded-xl border border-slate-800 p-5 space-y-4">
                <h3 className="text-sm font-bold text-white mb-2">أذونات الظهور للجمهور والزوار (Public Visibility)</h3>
                
                {/* Phone Toggle */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-400" />
                      <span className="font-bold text-xs text-white">إظهار رقم الهاتف الشخصي للزوار</span>
                      <span className="text-[10px] text-slate-400 font-mono" dir="ltr">(+962 790930786)</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {formData.privacySettings.showPhonePublicly
                        ? 'مفعل: يظهر رقم الهاتف المباشر للجميع في السيرة الذاتية.'
                        : 'محمي ومحجوب: لا يظهر رقم الهاتف الشخصي، ويتم التوجيه للتواصل المؤسسي فقط.'}
                    </p>
                  </div>
                  <button
                    onClick={() => handlePrivacyToggle('showPhonePublicly')}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      formData.privacySettings.showPhonePublicly
                        ? 'bg-amber-600 text-white'
                        : 'bg-emerald-700 text-white'
                    }`}
                  >
                    {formData.privacySettings.showPhonePublicly ? 'ظاهر للعامة (اضغط للحجب)' : 'محجوب وآمن (موصى به)'}
                  </button>
                </div>

                {/* Email Toggle */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-400" />
                      <span className="font-bold text-xs text-white">إظهار البريد الإلكتروني في السيرة الذاتية</span>
                      <span className="text-[10px] text-slate-400 font-mono" dir="ltr">(M•••••@yahoo.com)</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {formData.privacySettings.showEmailPublicly
                        ? 'مفعل: يظهر البريد للعامة وتستطيع برامج الزحف قراءته.'
                        : 'محمي ومحجوب: يتم إخفاء البريد لمنع الرسائل المزعجة (Spam) والتصيد.'}
                    </p>
                  </div>
                  <button
                    onClick={() => handlePrivacyToggle('showEmailPublicly')}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      formData.privacySettings.showEmailPublicly
                        ? 'bg-amber-600 text-white'
                        : 'bg-emerald-700 text-white'
                    }`}
                  >
                    {formData.privacySettings.showEmailPublicly ? 'ظاهر للعامة (اضغط للحجب)' : 'محجوب وآمن (موصى به)'}
                  </button>
                </div>

                {/* Personal Details (DOB, Marital Status) Toggle */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-400" />
                      <span className="font-bold text-xs text-white">إظهار البيانات الشخصية الخاصة (تاريخ الميلاد، الحالة الاجتماعية)</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {formData.privacySettings.showPersonalDetailsPublicly
                        ? 'مفعل: يظهر تاريخ الميلاد ومكان الولادة والحالة الاجتماعية.'
                        : 'محمي: يظهر فقط الصفة المهنية والجنسية والترخيص السريري.'}
                    </p>
                  </div>
                  <button
                    onClick={() => handlePrivacyToggle('showPersonalDetailsPublicly')}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      formData.privacySettings.showPersonalDetailsPublicly
                        ? 'bg-amber-600 text-white'
                        : 'bg-emerald-700 text-white'
                    }`}
                  >
                    {formData.privacySettings.showPersonalDetailsPublicly ? 'ظاهر للعامة (اضغط للحجب)' : 'محجوب وآمن (موصى به)'}
                  </button>
                </div>

                {/* Inquiry Form Gateway Toggle */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Inbox className="w-4 h-4 text-cyan-400" />
                      <span className="font-bold text-xs text-white">تفعيل بوابة المراسلة والاستفسارات المؤسسية للزوار</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      تتيح للجهات الطبية والمستشفيات إرسال رسائل تصل مباشرة إلى صندوق الوارد بلوحتك الخاصة بدون كشف بريدك الشخصي.
                    </p>
                  </div>
                  <button
                    onClick={() => handlePrivacyToggle('enableInquiryForm')}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      formData.privacySettings.enableInquiryForm
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {formData.privacySettings.enableInquiryForm ? 'مفعلة (شغالة)' : 'معطلة'}
                  </button>
                </div>

              </div>

              {/* Reset to Default Button */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={async () => {
                    if (window.confirm('هل أنت متأكد من إعادة تعيين البيانات إلى السيرة الذاتية الرسمية المعتمدة؟')) {
                      await resetToDefault();
                    }
                  }}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>إعادة تعيين السيرة الذاتية للنسخة الرسمية الأولية</span>
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: CV CONTENT EDITOR */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              
              {/* Header Titles Section */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-400" />
                  <span>الاسم والمناصب التنفيذية (Header & Roles)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 text-xs font-medium mb-1">الاسم بالعربية</label>
                    <input
                      type="text"
                      value={formData.personalInfo.fullName.ar}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        personalInfo: {
                          ...prev.personalInfo,
                          fullName: { ...prev.personalInfo.fullName, ar: e.target.value }
                        }
                      }))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 text-xs font-medium mb-1">Full Name (English)</label>
                    <input
                      type="text"
                      value={formData.personalInfo.fullName.en}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        personalInfo: {
                          ...prev.personalInfo,
                          fullName: { ...prev.personalInfo.fullName, en: e.target.value }
                        }
                      }))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white text-left font-mono"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 text-xs font-medium mb-1">المسمى التنفيذي الرئيسي (عربي)</label>
                    <input
                      type="text"
                      value={formData.personalInfo.titles[0]?.ar || ''}
                      onChange={(e) => {
                        const newTitles = [...formData.personalInfo.titles];
                        newTitles[0] = { ...newTitles[0], ar: e.target.value };
                        setFormData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, titles: newTitles }
                        }));
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 text-xs font-medium mb-1">Primary Role (English)</label>
                    <input
                      type="text"
                      value={formData.personalInfo.titles[0]?.en || ''}
                      onChange={(e) => {
                        const newTitles = [...formData.personalInfo.titles];
                        newTitles[0] = { ...newTitles[0], en: e.target.value };
                        setFormData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, titles: newTitles }
                        }));
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white text-left"
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Summary Section */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span>الملخص المهني والتنفيذي (Professional Summary)</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-300 text-xs font-medium mb-1">الملخص بالعربية</label>
                    <textarea
                      rows={3}
                      value={formData.professionalSummary.ar}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        professionalSummary: { ...prev.professionalSummary, ar: e.target.value }
                      }))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 text-xs font-medium mb-1">Summary in English</label>
                    <textarea
                      rows={3}
                      value={formData.professionalSummary.en}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        professionalSummary: { ...prev.professionalSummary, en: e.target.value }
                      }))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-white resize-none text-left"
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>

              {/* Experience Management */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-blue-400" />
                    <span>الخبرات العملية والسريرية ({formData.experienceData.length})</span>
                  </h3>
                  <button
                    onClick={handleAddExperience}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>إضافة خبرة جديدة</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.experienceData.map((exp, idx) => (
                    <div key={idx} className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-blue-400 font-mono">#{idx + 1}</span>
                        <button
                          onClick={() => handleDeleteExperience(idx)}
                          className="p-1 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                          title="حذف هذا البند"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[10px] text-slate-400 mb-0.5">المسمى (عربي)</label>
                          <input
                            type="text"
                            value={exp.title.ar}
                            onChange={(e) => {
                              const updated = [...formData.experienceData];
                              updated[idx].title.ar = e.target.value;
                              setFormData(prev => ({ ...prev, experienceData: updated }));
                            }}
                            className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-slate-400 mb-0.5">Title (English)</label>
                          <input
                            type="text"
                            value={exp.title.en}
                            onChange={(e) => {
                              const updated = [...formData.experienceData];
                              updated[idx].title.en = e.target.value;
                              setFormData(prev => ({ ...prev, experienceData: updated }));
                            }}
                            className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-xs text-white text-left"
                            dir="ltr"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-slate-400 mb-0.5">الفترة / Period</label>
                          <input
                            type="text"
                            value={exp.period}
                            onChange={(e) => {
                              const updated = [...formData.experienceData];
                              updated[idx].period = e.target.value;
                              setFormData(prev => ({ ...prev, experienceData: updated }));
                            }}
                            className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-xs text-white text-left font-mono"
                            dir="ltr"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] text-slate-400 mb-0.5">المستشفى / الجهة (عربي)</label>
                          <input
                            type="text"
                            value={exp.institution.ar}
                            onChange={(e) => {
                              const updated = [...formData.experienceData];
                              updated[idx].institution.ar = e.target.value;
                              setFormData(prev => ({ ...prev, experienceData: updated }));
                            }}
                            className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-slate-400 mb-0.5">Institution (English)</label>
                          <input
                            type="text"
                            value={exp.institution.en}
                            onChange={(e) => {
                              const updated = [...formData.experienceData];
                              updated[idx].institution.en = e.target.value;
                              setFormData(prev => ({ ...prev, experienceData: updated }));
                            }}
                            className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-xs text-white text-left"
                            dir="ltr"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education Management */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-blue-400" />
                    <span>المؤهلات العلمية والبورد ({formData.educationData.length})</span>
                  </h3>
                  <button
                    onClick={handleAddEducation}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>إضافة مؤهل جديد</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.educationData.map((edu, idx) => (
                    <div key={idx} className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-blue-400 font-mono">#{idx + 1}</span>
                        <button
                          onClick={() => handleDeleteEducation(idx)}
                          className="p-1 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                          title="حذف هذا البند"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[10px] text-slate-400 mb-0.5">الشهادة / البورد (عربي)</label>
                          <input
                            type="text"
                            value={edu.degree.ar}
                            onChange={(e) => {
                              const updated = [...formData.educationData];
                              updated[idx].degree.ar = e.target.value;
                              setFormData(prev => ({ ...prev, educationData: updated }));
                            }}
                            className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-slate-400 mb-0.5">Degree (English)</label>
                          <input
                            type="text"
                            value={edu.degree.en}
                            onChange={(e) => {
                              const updated = [...formData.educationData];
                              updated[idx].degree.en = e.target.value;
                              setFormData(prev => ({ ...prev, educationData: updated }));
                            }}
                            className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-xs text-white text-left"
                            dir="ltr"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-slate-400 mb-0.5">السنة / Year</label>
                          <input
                            type="text"
                            value={edu.period || edu.year || ''}
                            onChange={(e) => {
                              const updated = [...formData.educationData];
                              updated[idx].period = e.target.value;
                              setFormData(prev => ({ ...prev, educationData: updated }));
                            }}
                            className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-xs text-white text-left font-mono"
                            dir="ltr"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: INBOUND INQUIRIES INBOX */}
          {activeTab === 'inbox' && (
            <div className="space-y-4 max-w-4xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">صندوق الرسائل والاستفسارات الواردة</h3>
                  <p className="text-xs text-slate-400">
                    الرسائل المرسلة من زوار الموقع والمؤسسات الطبية عبر بوابة الاستفسارات الآمنة.
                  </p>
                </div>
                <span className="text-xs text-slate-400">إجمالي الرسائل: {inquiries.length}</span>
              </div>

              {inquiries.length === 0 ? (
                <div className="p-12 text-center bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <Inbox className="w-10 h-10 text-slate-600 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-300">لا توجد رسائل واردة حالياً</h4>
                  <p className="text-xs text-slate-500">
                    عندما يقوم أي زائر بإرسال استفسار عبر بوابة التواصل، ستظهر رسالته هنا بشكل فوري ومشفر.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((inq) => (
                    <div key={inq.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 hover:border-slate-700 transition-all">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{inq.senderName}</span>
                            {inq.organization && (
                              <span className="text-xs px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                                {inq.organization}
                              </span>
                            )}
                          </div>
                          <a href={`mailto:${inq.senderEmail}`} className="text-xs text-blue-400 hover:underline font-mono" dir="ltr">
                            {inq.senderEmail}
                          </a>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={`mailto:${inq.senderEmail}?subject=رد على: ${inq.subject || 'استفساركم'}`}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold transition-colors"
                          >
                            رد بالبريد
                          </a>
                          <button
                            onClick={() => inq.id && deleteInquiry(inq.id)}
                            className="p-1 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                            title="حذف الرسالة"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {inq.subject && (
                        <h5 className="text-xs font-semibold text-slate-200">
                          الموضوع: {inq.subject}
                        </h5>
                      )}

                      <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/80 whitespace-pre-wrap">
                        {inq.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
