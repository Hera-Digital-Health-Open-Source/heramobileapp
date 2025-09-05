import { useHttpClient } from "@/context/HttpClientContext";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import IPregnancy from "@/interfaces/IPregnancy";
import PregnancyView from "@/components/pregnancy/PregnancyView";
import { useTranslation } from "@/hooks/useTranslation";
import { useRouter } from "expo-router";

export default function PregnancyInfoScreen() {
  const {sendRequestFetch} = useHttpClient();
  const { session, idToken } = useAuthStore();
  const [pregnancy, setPregnancy] = useState<IPregnancy | undefined>(undefined);
  const {t} = useTranslation();
  const router = useRouter();

  useEffect(() => {
    sendRequestFetch<IPregnancy[]>({
      url: '/pregnancies/',
      method: 'GET',
      headers: {
        'Accept-Language': 'en',
        Authorization: 'Bearer ' + session,
        'Id-Authorization': 'Bearer ' + idToken!
      },
    }).then(response => {
      if(response.isTokenExpired){
        return router.replace('/auth/login');
      }
      if(response.data && response.data.length > 0){
        setPregnancy(response.data[0]);
      } else {
        setPregnancy(undefined);
      }
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  return(
    pregnancy 
    ? <PregnancyView 
      introduceText={t('your_pregnancy_screen_description_5')}
      pregnancy={pregnancy}
      isInRegistrationProcess={false}
    />
    : <PregnancyView 
      introduceText={t('your_pregnancy_screen_description_5')}
      isInRegistrationProcess={false}
    />
  );
}