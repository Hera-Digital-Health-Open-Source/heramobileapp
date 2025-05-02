import { useHttpClient } from "@/context/HttpClientContext";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import IPregnancy from "@/models/IPregnancy";
import PregnancyView from "@/components/pregnancy/PregnancyView";

export default function PregnancyInfoScreen() {
  const {sendRequestFetch} = useHttpClient();
  const { session } = useAuth();
  const [pregnancy, setPregnancy] = useState<IPregnancy | undefined>(undefined);

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
    <PregnancyView introduceText={"Update your pregnancy info"} pregnancy={pregnancy} isInRegistrationProcess={false}/>
  );
}