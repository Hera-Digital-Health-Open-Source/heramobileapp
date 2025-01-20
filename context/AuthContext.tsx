import { useContext, createContext, ReactNode, useState } from 'react';
import { useStorageState } from '@/hooks/useStorageState';
import { useHttpClient } from "@/context/HttpClientContext";


interface AuthContextType {
  requestOtp: (completeMobileNumber: string) => void;
  validateOtp: (inputOtp: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  showValidateOtp: boolean;
  completePhoneNumber: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// This hook can be used to access the user info.
// export function useSession() {
//   const value = useContext(AuthContext);
//   if (process.env.NODE_ENV !== 'production') {
//     if (!value) {
//       throw new Error('useSession must be wrapped in a <SessionProvider />');
//     }
//   }

//   return value;
// }

export function AuthProvider({ children }: {children: ReactNode}) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [showValidateOtp, setShowValidateOtp] = useState(false);
  const [completeMobileNumber, setCompleteMobileNumber] = useState('');
  const { sendRequest } = useHttpClient();

  const requestOtp = async (completeMobileNumber: string) => {
    console.log('I am in requestOtp');
    const response = await sendRequest<{phone_number: string, expires_at: string}>({
      url: '/otp_auth/request_challenge/',
      method: 'POST',
      data: {
        phone_number: completeMobileNumber, token: 'DO_BYPASSYuo1@3309u3#!21$'
      },
      headers: {'Accept-Language': 'en'},
    });
    console.log('Otp is requested from the server');
    console.log(response.error)
    if(response.data){
      console.log('set-show_otp')
      setShowValidateOtp(true);
      setCompleteMobileNumber(completeMobileNumber);
    }
  };

  const validateOtp = async (inputOtp: string) => {
    console.log('In the validateOtp function');
    const response = await sendRequest<{token: string, is_new_user: boolean, user_id: number, user_profile: string}>({
      url: '/otp_auth/attempt_challenge/',
      method: 'POST',
      data: {
        phone_number: completeMobileNumber, secret: inputOtp
      },
      headers: {'Accept-Language': 'en'},
    });

    console.log(response.data)
    if(response.error){
      console.log(response.error)
    }

    if(response.data){
      setSession(response.data.token);
      setShowValidateOtp(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        completePhoneNumber: completeMobileNumber,
        requestOtp: requestOtp,
        validateOtp: validateOtp,
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
        showValidateOtp,
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
