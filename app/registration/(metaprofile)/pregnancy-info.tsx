import PregnancyView from "@/components/pregnancy/PregnancyView";

export default function PregnancyInfo(){
  const info = `Alright! Let’s fill in the details and we will assist you by adding important doctor visit dates into “My Appointments”!`;

  return (
    <PregnancyView introduceText={info} isInRegistrationProcess={true}/>
  );
}