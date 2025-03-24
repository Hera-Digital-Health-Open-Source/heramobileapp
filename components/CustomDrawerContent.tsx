import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { useAuth } from "@/context/AuthContext";
import { useAuth0 } from "react-native-auth0";

export default function CustomDrawerContent(props: any) {
  const { bottom, top } = useSafeAreaInsets();
  const { signOut } = useAuth();
  const { clearSession } = useAuth0();

  const sample = require('@/assets/images/sample-person.png');

  const handleSignOut = async () => {
    await clearSession();
    signOut();
  };

  return(
    <View style={{flex: 1}}>
      <DrawerContentScrollView 
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{paddingTop: top, paddingBottom: bottom}}
      >
        <View style={{alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: "#dde3fe", gap: 8}}>
          <Image source={sample} style={{width: 100, height: 100, borderRadius: 35, marginHorizontal: 'auto'}} />
          <Text>Ahmet Yilmaz</Text>
        </View>
        {/* <DrawerItemList {...props} /> */}
        <DrawerItem 
          icon={({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          )}
          label={"Profile"} onPress={() => alert("Logout Pressed!")} 
        />
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
        <DrawerItem 
          icon={({ color, size }) => (
            <Ionicons name="language-outline" size={size} color={color} />
          )}
          label={"Change Language"} onPress={() => alert("Logout Pressed!")} 
        />
        <DrawerItem 
          icon={({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          )}
          label={"Settings"} onPress={() => alert("Logout Pressed!")} 
        />
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