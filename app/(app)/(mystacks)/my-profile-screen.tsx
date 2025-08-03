import ProfileView from "@/components/profile/ProfileView";
import { useAuth, UserProfile } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
export default function MyProfileScreen(){
  const [profilObj, setProfileObj] = useState<UserProfile>();
  const { profile, profileIsRead } = useAuth();
  
  useEffect(() => {
    if(profileIsRead){
      const parsed = JSON.parse(profile!);
      if(parsed === null) return;
      setProfileObj({
        name: parsed.name as string,
        gender: parsed.gender as 'MALE' | 'FEMALE',
        date_of_birth: parsed.date_of_birth as string,
        language_code: parsed.language_code as 'ar' | 'en' | 'tr',
        time_zone: parsed.time_zone as string
      });
    }
  }, [profileIsRead]);

  return(
    <View style={{flex:1, backgroundColor: '#fff'}}>
        <ProfileView profile={profilObj} />
    </View>
  )
}