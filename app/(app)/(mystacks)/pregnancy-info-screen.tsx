import { useHttpClient } from "@/context/HttpClientContext";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import IPregnancy from "@/models/IPregnancy";
import PregnancyView from "@/components/pregnancy/PregnancyView";
import { useTranslation } from "@/hooks/useTranslation";

export default function PregnancyInfoScreen() {
  const {sendRequestFetch} = useHttpClient();
  const { session } = useAuth();
  const [pregnancy, setPregnancy] = useState<IPregnancy | undefined>(undefined);
  const {t} = useTranslation();
  
  useEffect(() => {
    sendRequestFetch<IPregnancy[]>({
      url: '/pregnancies/',
      method: 'GET',
      headers: {
        'Accept-Language': 'en',
        Authorization: 'Token ' + session,
      },
    }).then(response => {
      if(response.data){
        setPregnancy(response.data[0]);
      }
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  return(
    <PregnancyView introduceText={t('your_pregnancy_screen_description_5')} pregnancy={pregnancy} isInRegistrationProcess={false}/>
  );
}