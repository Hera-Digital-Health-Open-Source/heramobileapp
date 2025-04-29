import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Pressable, Text, View } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";

export default function CustomDrawerContent(props: any) {
  const { bottom, top } = useSafeAreaInsets();
  const { signOut, profile } = useAuth();

  // const sample = require('@/assets/images/sample-person.png');

  const handleSignOut = async () => {
    signOut();
    router.replace('/auth/login');
  };

  return(
    <View style={{flex: 1}}>
      <DrawerContentScrollView 
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{paddingTop: top, paddingBottom: bottom}}
      >
        <View style={{alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: "#dde3fe", gap: 8}}>
          {/* <Image source={sample} style={{width: 100, height: 100, borderRadius: 35, marginHorizontal: 'auto'}} /> */}
          <View style={{height: 100, padding: 4}}></View>
          <Text style={{fontSize: 24, fontWeight: 'semibold'}}>{profile?.name}</Text>
        </View>
        {/* <DrawerItem 
          icon={({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          )}
          label={"Profile"} onPress={() => alert("Logout Pressed!")} 
        /> */}
        <DrawerItem 
          icon={({ color, size }) => (
            <Ionicons name="newspaper-outline" size={size} color={color} />
          )}
          label={"Health Tips / News"} onPress={() => alert("Logout Pressed!")} 
        />
        <DrawerItem 
          icon={({ color, size }) => (
            <Ionicons name="logo-facebook" size={size} color={color} />
          )}
          label={"Facebook Group"} onPress={() => alert("Logout Pressed!")} 
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
            <Ionicons name="chatbox-ellipses-outline" size={size} color={color} />
          )}
          label={"Feedback"} onPress={() => alert("Logout Pressed!")} 
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