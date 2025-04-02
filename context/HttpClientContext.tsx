import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { baseURL } from "@/constants";
import { useLoading } from "./LoadingContext";

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
  sendRequest: <T>(requestObj: RequestConfig) => Promise<ClientResponse<T>>;
  sendRequestFetch: <T>(requestObj: RequestConfig) => Promise<ClientResponse<T>>;
}

const HttpClientContext = createContext<HttpClientContextType | undefined>(undefined);

export default function HttpClientProvider({children}:{children: ReactNode}){
    const {setLoading} = useLoading();

    const axiosInstance = axios.create({
      baseURL: baseURL,
      timeout: 10000, // Optional: request timeout
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const sendRequestFetch = async <T,> (requestObj: RequestConfig): Promise<ClientResponse<T>> => {
      setLoading(true);
      try{
        const requestOptions = {
          method: requestObj.method || 'GET',
          headers: requestObj.headers || {},
          body: JSON.stringify(requestObj.data),
        };
        const response = await fetch(baseURL + requestObj.url, requestOptions);
        const data = await response.json();
        if(response.status >= 400 && response.status < 500){
          return { data: null, isTokenExpired: true, error: null};
        }
        return {data: data, error: null};
      } catch(error){
        console.log(`Error: ${error}`);
        return { data: null, error};
      } finally {
        setLoading(false);
      }
    };

    const sendRequest = async <T,> (requestObj: RequestConfig): Promise<ClientResponse<T>> => {
      setLoading(true);
      try{
        const response = await axiosInstance({
          url: requestObj.url,
          method: requestObj.method || 'GET',
          data: requestObj.data || null,
          headers: requestObj.headers || {},
        });
        return { data: response.data, error: null };
      } catch(error){
        console.log(JSON.parse(JSON.stringify(error)))
        return { data: null, error};
      } finally {
        setLoading(false);
      }
    };

    return(
      <HttpClientContext.Provider value={{sendRequest, sendRequestFetch}}>
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
