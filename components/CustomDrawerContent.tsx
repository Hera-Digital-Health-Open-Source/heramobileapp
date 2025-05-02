import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Pressable, Text, View, Linking, Platform } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { Image } from "expo-image";
import { icoHeraIcon } from "@/assets/images/images";

export default function CustomDrawerContent(props: any) {
  const { bottom, top } = useSafeAreaInsets();
  const { signOut, profile } = useAuth();

  // const sample = require('@/assets/images/sample-person.png');

  const handleSignOut = async () => {
    signOut();
    router.replace('/auth/login');
  };

  const handleOpenFacebookGroup = async () => {
    let url = Platform.OS === 'ios' ? 'fb://group?id=327710368767013' : 'fb://group/327710368767013';

    try {
      await Linking.openURL(url);
    } catch {
      await Linking.openURL('https://www.facebook.com/groups/327710368767013');
    }
  };


  return(
    <View style={{flex: 1}}>
      <DrawerContentScrollView 
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{paddingTop: top, paddingBottom: bottom}}
      >
        <View style={{alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: "#dde3fe", gap: 8}}>
          <Image source={icoHeraIcon} style={{width: 100, height: 100, borderRadius: 35, marginHorizontal: 'auto'}} />
          <Text style={{fontSize: 18, fontWeight: 'semibold'}}>{profile?.name}</Text>
        </View>
        {/* <DrawerItem 
          icon={({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          )}
          label={"Profile"} onPress={() => alert("Logout Pressed!")} 
        /> */}
        <DrawerItem 
          icon={({ color, size }) => (
            <Ionicons name="globe-outline" size={size} color={color} />
          )}
          label={"Visit Hera Website"} onPress={() => router.push('/hera-website-secreen')} 
        />
        <DrawerItem 
          icon={({ color, size }) => (
            <Ionicons name="newspaper-outline" size={size} color={color} />
          )}
          label={"Health Tips / News"} onPress={() => router.push('/health-tips-news-screen')} 
        />
        <DrawerItem 
          icon={({ color, size }) => (
            <Ionicons name="logo-facebook" size={size} color={color} />
          )}
          label={"Facebook Group"} onPress={() => handleOpenFacebookGroup()} 
        />
        {/* <DrawerItem 
          icon={({ color, size }) => (
            <Ionicons name="language-outline" size={size} color={color} />
          )}
          label={"Change Language"} onPress={() => alert("Logout Pressed!")} 
        /> */}
        {/* <DrawerItem 
          icon={({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          )}
          label={"Settings"} onPress={() => alert("Logout Pressed!")} 
        /> */}
        <DrawerItem 
          icon={({ color, size }) => (
            <Ionicons name="help-circle-outline" size={size} color={color} />
          )}
          label={"FAQs"} onPress={() => router.push('/feedback-screen')}
        />
        <DrawerItem 
          icon={({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          )}
          label={"Protection of Personal Data (KVKK)"} onPress={() => router.push('/personal-data-protection-screen')}
        />
        <DrawerItem 
          icon={({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          )}
          label={"User Agreement"} onPress={() => router.push('/user-agreement-screen')}
        />
        <DrawerItem 
          icon={({ color, size }) => (
            <Ionicons name="chatbox-ellipses-outline" size={size} color={color} />
          )}
          label={"Feedback"} onPress={() => router.push('/feedback-screen')}
        />
        <DrawerItem 
          icon={({ color, size }) => (
            <Ionicons name="mail-outline" size={size} color={color} />
          )}
          label={"Contact Us"} onPress={() => router.push('/contactus-screen')}
        />
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: "#dde3fe", paddingBottom: 20 + bottom}}>
        <View style={{flexDirection: "row", alignItems: "center", gap: 8, marginLeft: 4}}>
          <Ionicons name="log-out-outline" size={32} color={'#f00'} />
          <Pressable onPress={handleSignOut}>
            <Text style={{color: '#f00'}}>Logout</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

}