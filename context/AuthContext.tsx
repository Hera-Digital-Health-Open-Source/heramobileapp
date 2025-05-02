import { useContext, createContext, ReactNode, useState, useEffect } from 'react';
import { useStorageState } from '@/hooks/useStorageState';
import { useHttpClient } from "@/context/HttpClientContext";
import { useLoading } from './LoadingContext';


interface UserProfile {
  name: string;
  gender: 'MALE' | 'FEMALE';
  date_of_birth: string;
  language_code: 'en' | 'ar' | 'tr';
  time_zone: string;
}
interface AuthContextType {
  requestOtp: (completeMobileNumber: string, captchToken: string) => Promise<boolean>;
  validateOtp: (inputOtp: string, phoneNumber?: string) => Promise<boolean>;
  errorMessage: string | undefined;
  setErrorMessage: (errorMessage: string) => void;
  signOut: () => void;
  session?: string | null;
  setSession: (session: string | null) => void;
  preparingStorageData: boolean;
  completePhoneNumber: string;
  setCompletePhoneNumber: (completePhoneNumber: string) => void;
  // isProfileCreated: boolean | undefined;
  // setIsProfileCreated: (isProfileCreated: boolean) => void;
  profile: UserProfile | undefined;
  setProfile: (profile: UserProfile) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: {children: ReactNode}) {
  const [[preparingStorageData, session], setSession] = useStorageState('session');
  const [completeMobileNumber, setCompleteMobileNumber] = useState('');
  const { sendRequest } = useHttpClient();
  // const [isProfileCreated, setIsProfileCreated] = useState<boolean | undefined>(undefined);
  const {setLoading} = useLoading();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [[preparingRawProfile, rawProfile], setRawProfile] = useStorageState('profile');
  const [profile, setProfile] = useState<UserProfile | undefined>(undefined);

  const requestOtp = async (completeMobileNumber: string, captchToken: string) : Promise<boolean> => {
    const response = await sendRequest<{phone_number: string, expires_at: string}>({
      url: '/otp_auth/request_challenge/',
      method: 'POST',
      data: {
        phone_number: completeMobileNumber, token: captchToken
      },
      headers: {'Accept-Language': 'en'},
    });
    if(response.error){
      console.log(response.error)
      setErrorMessage(response.error);
      return false;
    }
    setCompleteMobileNumber(completeMobileNumber);
    return true;
  };

  const validateOtp = async (inputOtp: string, phoneNumber?: string): Promise<boolean> => {
    const response = await sendRequest<{token: string, is_new_user: boolean, user_id: number, user_profile: UserProfile}>({
      url: '/otp_auth/attempt_challenge/',
      method: 'POST',
      data: {
        phone_number: phoneNumber, secret: inputOtp
      },
      headers: {'Accept-Language': 'en'},
    });

    if(response.error){
      setErrorMessage(response.error);
      return false;
    }

    console.log(`==== ${JSON.stringify(response.data)}`);

    setSession(response.data!.token);
    // setIsProfileCreated(response.data!.user_profile ? true : false);
    if(response.data!.user_profile){
      setRawProfile(JSON.stringify(response.data!.user_profile))
      setProfile({
        name: response.data!.user_profile.name as string,
        gender: response.data!.user_profile.gender as 'MALE' | 'FEMALE',
        date_of_birth: response.data!.user_profile.date_of_birth as string,
        language_code: response.data!.user_profile.language_code as 'ar' | 'en' | 'tr',
        time_zone: response.data!.user_profile.time_zone as string
      })
    }
    return true;
  };

  useEffect(() => {
    setLoading(preparingStorageData || preparingRawProfile);
  }, [preparingStorageData, preparingRawProfile]);

  useEffect(() => {
    if(!preparingRawProfile){
      setProfile(JSON.parse(rawProfile!));
    }
  }, [preparingRawProfile]);

  return (
    <AuthContext.Provider
      value={{
        completePhoneNumber: completeMobileNumber,
        setCompletePhoneNumber: setCompleteMobileNumber,
        requestOtp: requestOtp,
        validateOtp: validateOtp,
        errorMessage,
        setErrorMessage,
        signOut: () => {
          setSession(null);
          setCompleteMobileNumber('');
          setErrorMessage(undefined);
          // setIsProfileCreated(undefined);
          setProfile(undefined);
          setRawProfile(null);
        },
        session,
        setSession,
        preparingStorageData,
        // isProfileCreated,
        // setIsProfileCreated,
        profile,
        setProfile: (profile: UserProfile) => {
          setProfile(profile);
          setRawProfile(JSON.stringify(profile));
        }
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
