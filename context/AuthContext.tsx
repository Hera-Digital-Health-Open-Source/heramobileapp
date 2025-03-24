import { useContext, createContext, ReactNode, useState, useEffect } from 'react';
import { useStorageState } from '@/hooks/useStorageState';
import { useHttpClient } from "@/context/HttpClientContext";
import { useLoading } from './LoadingContext';


interface AuthContextType {
  requestOtp: (completeMobileNumber: string, captchToken: string) => Promise<boolean>;
  validateOtp: (inputOtp: string) => Promise<boolean>;
  errorMessage: string | undefined;
  setErrorMessage: (errorMessage: string) => void;
  signOut: () => void;
  session?: string | null;
  preparingStorageData: boolean;
  completePhoneNumber: string;
  setCompletePhoneNumber: (completePhoneNumber: string) => void;
  isProfileCreated: boolean | undefined;
  setIsProfileCreated: (isProfileCreated: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: {children: ReactNode}) {
  const [[preparingStorageData, session], setSession] = useStorageState('session');
  const [completeMobileNumber, setCompleteMobileNumber] = useState('');
  const { sendRequest } = useHttpClient();
  const [isProfileCreated, setIsProfileCreated] = useState<boolean | undefined>(undefined);
  const {setLoading} = useLoading();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

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

  const validateOtp = async (inputOtp: string): Promise<boolean> => {
    const response = await sendRequest<{token: string, is_new_user: boolean, user_id: number, user_profile: string}>({
      url: '/otp_auth/attempt_challenge/',
      method: 'POST',
      data: {
        phone_number: completeMobileNumber, secret: inputOtp
      },
      headers: {'Accept-Language': 'en'},
    });

    if(response.error){
      setErrorMessage(response.error);
      return false;
    }

    console.log(`==== ${JSON.stringify(response.data)}`);

    setSession(response.data!.token);
    setIsProfileCreated(response.data!.user_profile ? true : false);
    return true;
  };

  useEffect(() => {
    setLoading(preparingStorageData);
  }, [preparingStorageData]);

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
          setIsProfileCreated(undefined);
        },
        session,
        preparingStorageData,
        isProfileCreated,
        setIsProfileCreated,
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
