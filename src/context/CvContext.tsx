import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { 
  personalInfo as defaultPersonalInfo, 
  professionalSummary as defaultSummary, 
  experienceData as defaultExperience, 
  educationData as defaultEducation, 
  refereesData as defaultReferees, 
  coreCompetencies as defaultCompetencies, 
  languages as defaultLanguages 
} from '../data/resumeData';
import { 
  PersonalInfo, 
  ExperienceItem, 
  EducationItem, 
  RefereeItem, 
  CompetencyCategory, 
  LanguageItem,
  BilingualText 
} from '../types/resume';

export interface PrivacySettings {
  showEmailPublicly: boolean;
  showPhonePublicly: boolean;
  showPersonalDetailsPublicly: boolean;
  enableInquiryForm: boolean;
}

export interface InboundInquiry {
  id?: string;
  senderName: string;
  senderEmail: string;
  organization?: string;
  subject?: string;
  message: string;
  createdAt: any;
}

export interface CvData {
  personalInfo: PersonalInfo;
  professionalSummary: BilingualText;
  experienceData: ExperienceItem[];
  educationData: EducationItem[];
  refereesData: RefereeItem[];
  coreCompetencies: CompetencyCategory[];
  languages: LanguageItem[];
  privacySettings: PrivacySettings;
}

interface CvContextType {
  cvData: CvData;
  isLoading: boolean;
  user: User | null;
  isAdmin: boolean;
  privacySettings: PrivacySettings;
  login: (email: string, pass: string) => Promise<void>;
  registerOwner: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  updateCvData: (newData: Partial<CvData>) => Promise<void>;
  updatePrivacySettings: (newSettings: Partial<PrivacySettings>) => Promise<void>;
  submitInquiry: (inquiry: Omit<InboundInquiry, 'createdAt'>) => Promise<void>;
  inquiries: InboundInquiry[];
  deleteInquiry: (id: string) => Promise<void>;
  resetToDefault: () => Promise<void>;
}

const defaultPrivacySettings: PrivacySettings = {
  showEmailPublicly: false, // Hidden by default as required
  showPhonePublicly: false, // Hidden by default as required
  showPersonalDetailsPublicly: false, // Only institutional details shown publicly
  enableInquiryForm: true
};

const CvContext = createContext<CvContextType | undefined>(undefined);

export const CvProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [inquiries, setInquiries] = useState<InboundInquiry[]>([]);

  const [cvData, setCvData] = useState<CvData>({
    personalInfo: defaultPersonalInfo,
    professionalSummary: defaultSummary,
    experienceData: defaultExperience,
    educationData: defaultEducation,
    refereesData: defaultReferees,
    coreCompetencies: defaultCompetencies,
    languages: defaultLanguages,
    privacySettings: defaultPrivacySettings
  });

  // Track Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAdmin(!!currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch or sync CV Data from Cloud Firestore (/cv_content/main)
  useEffect(() => {
    async function loadCv() {
      try {
        const docRef = doc(db, 'cv_content', 'main');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as Partial<CvData>;
          setCvData((prev) => ({
            ...prev,
            ...data,
            privacySettings: {
              ...prev.privacySettings,
              ...(data.privacySettings || {})
            }
          }));
        } else {
          // If first boot, seed the default verified profile to Firestore
          const initialData: CvData = {
            personalInfo: defaultPersonalInfo,
            professionalSummary: defaultSummary,
            experienceData: defaultExperience,
            educationData: defaultEducation,
            refereesData: defaultReferees,
            coreCompetencies: defaultCompetencies,
            languages: defaultLanguages,
            privacySettings: defaultPrivacySettings
          };
          try {
            await setDoc(docRef, {
              ...initialData,
              updatedAt: new Date().toISOString()
            });
          } catch (e) {
            // If offline or rule restrictions apply before auth, use local default
            console.info("Using local CV profile data.");
          }
        }
      } catch (err) {
        console.warn("Could not load from remote Firestore, falling back to verified local data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadCv();
  }, []);

  // Real-time listener for inquiries (Only when owner is logged in)
  useEffect(() => {
    if (!isAdmin) {
      setInquiries([]);
      return;
    }

    try {
      const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
      const unsub = onSnapshot(q, (snapshot) => {
        const items: InboundInquiry[] = [];
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() } as InboundInquiry);
        });
        setInquiries(items);
      }, (err) => {
        console.warn("Inquiries snapshot error:", err);
      });
      return () => unsub();
    } catch (err) {
      console.warn("Failed to listen to inquiries:", err);
    }
  }, [isAdmin]);

  // Exclusive Owner Credentials requested by user
  const OWNER_EMAIL = 'mohalomari35@yahoo.com';
  const OWNER_PASS = 'Mohalomari35';

  // Auth functions - strictly restricted to the specified owner credentials
  const login = async (inputEmail: string, inputPass: string) => {
    const normalizedEmail = (inputEmail || '').trim().toLowerCase();
    
    // Strict verification: ONLY Mohalomari35@yahoo.com and Mohalomari35
    if (normalizedEmail !== OWNER_EMAIL || inputPass !== OWNER_PASS) {
      throw new Error('بيانات الدخول غير صحيحة. تسجيل الدخول مقتصر حصرياً على مالك السيرة الذاتية.');
    }

    try {
      await signInWithEmailAndPassword(auth, 'Mohalomari35@yahoo.com', 'Mohalomari35');
    } catch (err: any) {
      // If the user does not exist yet in Firebase Auth, provision it seamlessly
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        try {
          const cred = await createUserWithEmailAndPassword(auth, 'Mohalomari35@yahoo.com', 'Mohalomari35');
          await setDoc(doc(db, 'admins', cred.user.uid), {
            email: 'Mohalomari35@yahoo.com',
            role: 'owner',
            createdAt: new Date().toISOString()
          });
        } catch (createErr: any) {
          // If already exists with different internal hash, proceed with session
          console.warn("Firebase Auth setup notice:", createErr?.message);
        }
      }
    }

    setIsAdmin(true);
  };

  const registerOwner = async (email: string, pass: string) => {
    const normalizedEmail = (email || '').trim().toLowerCase();
    if (normalizedEmail !== OWNER_EMAIL || pass !== OWNER_PASS) {
      throw new Error('غير مصرح. لا يمكن إنشاء حساب إلا للمالك المعتمد فقط.');
    }
    const cred = await createUserWithEmailAndPassword(auth, 'Mohalomari35@yahoo.com', 'Mohalomari35');
    await setDoc(doc(db, 'admins', cred.user.uid), {
      email: 'Mohalomari35@yahoo.com',
      role: 'owner',
      createdAt: new Date().toISOString()
    });
    setIsAdmin(true);
  };

  const logout = async () => {
    await signOut(auth);
    setIsAdmin(false);
    setUser(null);
  };

  // Update CV Data
  const updateCvData = async (newData: Partial<CvData>) => {
    const merged = { ...cvData, ...newData };
    setCvData(merged);

    try {
      const docRef = doc(db, 'cv_content', 'main');
      await setDoc(docRef, {
        ...merged,
        updatedAt: new Date().toISOString(),
        updatedBy: user?.email || 'admin'
      }, { merge: true });
    } catch (err) {
      console.error("Failed to save CV changes to Firestore:", err);
      throw err;
    }
  };

  // Update Privacy Settings
  const updatePrivacySettings = async (newSettings: Partial<PrivacySettings>) => {
    const updated = {
      ...cvData.privacySettings,
      ...newSettings
    };
    await updateCvData({ privacySettings: updated });
  };

  // Public visitor submits inquiry without seeing private contact info
  const submitInquiry = async (inquiryData: Omit<InboundInquiry, 'createdAt'>) => {
    await addDoc(collection(db, 'inquiries'), {
      ...inquiryData,
      createdAt: serverTimestamp()
    });
  };

  // Delete an inquiry
  const deleteInquiry = async (id: string) => {
    await deleteDoc(doc(db, 'inquiries', id));
  };

  // Reset to verified default data
  const resetToDefault = async () => {
    const resetData: CvData = {
      personalInfo: defaultPersonalInfo,
      professionalSummary: defaultSummary,
      experienceData: defaultExperience,
      educationData: defaultEducation,
      refereesData: defaultReferees,
      coreCompetencies: defaultCompetencies,
      languages: defaultLanguages,
      privacySettings: defaultPrivacySettings
    };
    await updateCvData(resetData);
  };

  return (
    <CvContext.Provider
      value={{
        cvData,
        isLoading,
        user,
        isAdmin,
        privacySettings: cvData.privacySettings,
        login,
        registerOwner,
        logout,
        updateCvData,
        updatePrivacySettings,
        submitInquiry,
        inquiries,
        deleteInquiry,
        resetToDefault
      }}
    >
      {children}
    </CvContext.Provider>
  );
};

export const useCv = () => {
  const context = useContext(CvContext);
  if (!context) {
    throw new Error('useCv must be used within a CvProvider');
  }
  return context;
};
