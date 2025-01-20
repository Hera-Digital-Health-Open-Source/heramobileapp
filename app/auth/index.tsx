import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";


export default function Index(){
  const {session, showValidateOtp} = useAuth();

  console.log(`showValidateOtp: ${showValidateOtp}, session: ${session}`);
  if(showValidateOtp){
    return (
      <Redirect href={'/auth/otp-screen'} />
    )
  }

  if(!session){
    return (
      <Redirect href={'/auth/login'} />
    )
  }

  return (
    <Redirect href={'/'} />
  )
}