import PregnancyView from "@/components/pregnancy/PregnancyView";
import { useTranslation } from "@/hooks/useTranslation";

export default function PregnancyInfo(){
  const { t } = useTranslation();

  const info = t('your_pregnancy_screen_description_1');

  return (
    <PregnancyView introduceText={info} isInRegistrationProcess={true}/>
  );
}