import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { baseURL } from "@/constants";

export interface RequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any; // Payload for POST/PUT requests
  headers?: Record<string, string>;
}

export interface ClientResponse<T> {
  data: T | null;
  error: any | null;
}

interface HttpClientContextType {
  isWaitForServerResponse: boolean;
  // The following line defines a generic function type,
  // where T is a generic type parameter. It acts as a placeholder for the type of the response data.
  // When calling the function, you can specify what T represents, making the function flexible and type-safe for different types of responses.
  sendRequest: <T>(requestObj: RequestConfig) => Promise<ClientResponse<T>>;
}

const HttpClientContext = createContext<HttpClientContextType | undefined>(undefined);

export default function HttpClientProvider({children}:{children: ReactNode}){
    const [isWaitForServerResponse, setIsWaitForServerResponse] = useState(false);

    const axiosInstance = axios.create({
      baseURL: baseURL,
      timeout: 10000, // Optional: request timeout
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const sendRequest = async <T,> (requestObj: RequestConfig): Promise<ClientResponse<T>> => {
      setIsWaitForServerResponse(true);
      try{
        const response = await axiosInstance({
          url: requestObj.url,
          method: requestObj.method || 'GET',
          data: requestObj.data || null,
          headers: requestObj.headers || {},
        });
        return { data: response.data, error: null };
      } catch(error){
        return { data: null, error};
      } finally {
        setIsWaitForServerResponse(false);
      }
    };

    return(
      <HttpClientContext.Provider value={{isWaitForServerResponse, sendRequest}}>
          {children}
      </HttpClientContext.Provider>
    );
}

export const useHttpClient = (): HttpClientContextType => {
  const context = useContext(HttpClientContext);
  if (!context) {
    throw new Error('useClient must be used within a ClientProvider');
  }
  return context;
};

// export const useHttpClient = () => useContext(HttpClientContext);
