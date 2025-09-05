import { createContext, useContext, useState, ReactNode, useCallback, useRef } from "react";
import { baseURL } from "@/constants";
import { useLoading } from "./LoadingContext";
import { useAuthStore } from "@/store/authStore";
import { Alert } from "react-native";
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth0 } from "react-native-auth0";

export interface RequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: any; // Payload for POST/PUT requests
  headers?: Record<string, string>;
}

export interface ClientResponse<T> {
  data: T | null;
  error: any | null;
  isTokenExpired?: boolean;
}

interface HttpClientContextType {
  // The following line defines a generic function type,
  // where T is a generic type parameter. It acts as a placeholder for the type of the response data.
  // When calling the function, you can specify what T represents, making the function flexible and type-safe for different types of responses.
  // sendRequest: <T>(requestObj: RequestConfig) => Promise<ClientResponse<T>>;
  sendRequestFetch: <T>(requestObj: RequestConfig) => Promise<ClientResponse<T>>;
}

const HttpClientContext = createContext<HttpClientContextType | undefined>(undefined);

export default function HttpClientProvider({children}:{children: ReactNode}){
    const {setLoading} = useLoading();
    const {setSession} = useAuthStore();
    const isAlertShowing = useRef(false);
    const {t} = useTranslation();
    const { getCredentials } = useAuth0();
  
    // const axiosInstance = axios.create({
    //   baseURL: baseURL,
    //   timeout: 10000, // Optional: request timeout
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json',
    //   },
    // });

    const sendRequestFetch = async <T,> (requestObj: RequestConfig): Promise<ClientResponse<T>> => {
      setLoading(true);
        try{
          let isTokenExpired = false;
          const requestOptions = {
            method: requestObj.method || 'GET',
            headers: requestObj.headers || {},
            body: JSON.stringify(requestObj.data),
          };

          let response = await fetch(baseURL + requestObj.url, requestOptions);
          let responseStatus = response.status;

          if(responseStatus == 406){
            // This means the accessToken is expired
            // so try to refresh the accessToken
            console.warn('Token is exipred (from server) - try to refresh tokens')
            const credentials = await getCredentials();
            if(credentials && credentials.accessToken){
              let headers = requestObj.headers;
              headers = {
                ...headers,
                Authorization: 'Bearer ' + credentials.accessToken,
                'Id-Authorization': 'Bearer ' + credentials.idToken
              };
              const newRequestObj = {...requestObj, headers};
              const newRequestOptions = {...requestOptions, headers: newRequestObj.headers};
              console.warn(newRequestObj)
              response = await fetch(baseURL + newRequestObj.url, newRequestOptions);
              responseStatus = response.status;
            } else {
              responseStatus = 401;
            }
          } 
          
          if(responseStatus >= 401 && responseStatus <= 403){
            isTokenExpired = true;
            console.log('HttpClientContext.tsx: token is expired, respondStatus:', responseStatus)
            setSession('');
          }

          if (responseStatus >= 400 && !isTokenExpired && !isAlertShowing.current) {
            isAlertShowing.current = true;
            Alert.alert(t('connection_error_title'), t('connection_error_message'));
            // Reset the flag after 3 seconds to allow new alerts if connection issues persist
            setTimeout(() => {
              isAlertShowing.current = false;
            }, 3000);
          }

          if (responseStatus >= 400){
            return {
              data: null,
              isTokenExpired,
              error: responseStatus || "Request failed",
            };
          }
      
          try{
            const data = await response.json();
            return {data: data, error: null};
          } catch {
            return {
              data: null,
              error: null
            }
          }
        } catch(error: any){
          console.log(`Error when sending HTTP(s) request: ${error}`);
          
          // Handle network errors in catch block (no server response)
          if(!isAlertShowing.current){
            isAlertShowing.current = true;
            Alert.alert(t('connection_error_title'), t('connection_error_message'));
            // Reset the flag after 3 seconds to allow new alerts if connection issues persist
            setTimeout(() => {
              isAlertShowing.current = false;
            }, 3000);
          }
          
          return { data: null, error: error.message || error};
        } finally {
          setLoading(false);
        }
    };

    /*const sendRequest = async <T,> (requestObj: RequestConfig): Promise<ClientResponse<T>> => {
      setLoading(true);
      try{
        const response = await axiosInstance({
          url: requestObj.url,
          method: requestObj.method || 'GET',
          data: requestObj.data || null,
          headers: requestObj.headers || {},
        });
        return { data: response.data, error: null };
      } catch(error: any){
        console.log(JSON.parse(JSON.stringify(error)));
        
        // Check if it's a network/connection error
        const isNetworkError = error.code === 'NETWORK_ERROR' || 
                              error.code === 'ECONNABORTED' || 
                              !error.response;
        
        const isTokenExpired = error.response?.status >= 401 && error.response?.status <= 403;
        
        if(isTokenExpired){
          setSession('');
        }
        
        if(isNetworkError && !isTokenExpired && !isAlertShowing.current){
          isAlertShowing.current = true;
          Alert.alert("Connection Error", "Please make sure you are connecting to the internet, and you are not behind a firewall.");
          // Reset the flag after 3 seconds to allow new alerts if connection issues persist
          setTimeout(() => {
            isAlertShowing.current = false;
          }, 3000);
        }
        
        return { 
          data: null, 
          error,
          isTokenExpired
        };
      } finally {
        setLoading(false);
      }
    };*/

    return(
      <HttpClientContext.Provider value={{sendRequestFetch}}>
          {children}
      </HttpClientContext.Provider>
    );
}

export const useHttpClient = (): HttpClientContextType => {
  const context = useContext(HttpClientContext);
  if (!context) {
    throw new Error('useHttpClient must be used within a HttpClientContext');
  }
  return context;
};

// export const useHttpClient = () => useContext(HttpClientContext);
