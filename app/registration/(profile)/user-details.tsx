import { StyleSheet, SafeAreaView} from "react-native";
import { Spacing } from "@/assets/theme";
import { useRegistration } from "@/context/RegistrationContext";
import ProfileView from "@/components/profile/ProfileView";

export default function UserDetails(){

  return (
    <SafeAreaView style={{flex:1, backgroundColor: '#fff'}}>
      <ProfileView profile={undefined}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: Spacing.large,
    gap: Spacing.large,
    marginTop: Spacing.xxlarge
  }
});