import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Pressable, Text, View, Linking, Platform } from "react-native";
import { useAuthStore } from "@/store/authStore";
import { useProfileStore } from "@/store/profileStore";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { icoHeraIcon } from "@/assets/images/images";
import { useTranslation } from "@/hooks/useTranslation";
import { useI18n } from "@/context/I18nContext";
import { Colors } from "@/assets/theme";


export default function CustomDrawerContent(props: any) {
  const { bottom, top } = useSafeAreaInsets();
  const { signOut } = useAuthStore();
  const { userProfile, setUserProfile } = useProfileStore();
  const { t } = useTranslation();
  const { locale } = useI18n();
  const router = useRouter();

  const handleSignOut = async () => {
    setUserProfile(null);
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
          <Text style={{fontSize: 18, fontWeight: 'semibold'}}>{userProfile?.name}</Text>
        </View>
        {/* <DrawerItem 
          icon={({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          )}
          label={"Profile"} onPress={() => alert("Logout Pressed!")} 
        /> */}
        <DrawerItem
          style={{}}
          icon={({ color, size }: {color: any, size: any}) => (
            <Ionicons name="globe-outline" size={size} color={color} />
          )}
          label={({ focused, color }) => (
            <Text style={{ 
              color: focused ? Colors.primary : color,
              fontWeight: focused ? 'bold' : 'normal',
              fontSize: 15,
              textAlign: 'left'
            }}>
              {t('settings_screen_visit_hera_web_title')}
            </Text>
          )}
          onPress={() => router.push({
            pathname: '/web-view-screen',
            params: { uri: locale === 'en' ? `https://heradigitalhealth.org/` : `https://heradigitalhealth.org/${locale}` },
          })} 
        />
        <DrawerItem 
          style={{}}
          icon={({ color, size }: {color: any, size: any}) => (
            <Ionicons name="newspaper-outline" size={size} color={color} />
          )}
          label={({ focused, color }) => (
            <Text style={{ 
              color: focused ? Colors.primary : color,
              fontWeight: focused ? 'bold' : 'normal',
              fontSize: 15,
              textAlign: 'left'
            }}>
              {t('home_screen_health_tips_news_title')}
            </Text>
          )}
          onPress={() => router.push({
            pathname: '/web-view-screen',
            params: { uri: `https://heradigitalhealth.org/${locale}/blog/` },
          })} 
        />
        <DrawerItem 
          style={{}}
          icon={({ color, size }: {color: any, size: any}) => (
            <Ionicons name="logo-facebook" size={size} color={color} />
          )}
          label={({ focused, color }) => (
            <Text style={{ 
              color: focused ? Colors.primary : color,
              fontWeight: focused ? 'bold' : 'normal',
              fontSize: 15,
              textAlign: 'left'
            }}>
              {t('home_screen_facebook_group_title')}
            </Text>
          )}
          onPress={() => handleOpenFacebookGroup()} 
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
          style={{}}
          icon={({ color, size }: {color: any, size: any}) => (
            <Ionicons name="help-circle-outline" size={size} color={color} />
          )}
          label={({ focused, color }) => (
            <Text style={{ 
              color: focused ? Colors.primary : color,
              fontWeight: focused ? 'bold' : 'normal',
              fontSize: 15,
              textAlign: 'left'
            }}>
              {t('settings_screen_faq_title')}
            </Text>
          )}
          onPress={() => router.push({
            pathname: '/web-view-screen',
            params: { uri: `https://heradigitalhealth.org/${locale}/frequently-asked-questions/` },
          })}
        />
        <DrawerItem 
          style={{}}
          icon={({ color, size }: {color: any, size: any}) => (
            <Ionicons name="people-outline" size={size} color={color} />
          )}
          label={({ focused, color }) => (
            <Text style={{ 
              color: focused ? Colors.primary : color,
              fontWeight: focused ? 'bold' : 'normal',
              fontSize: 15,
              textAlign: 'left'
            }}>
              {t('settings_screen_kvkk_title')}
            </Text>
          )}
          onPress={() => router.push({
            pathname: '/web-view-screen',
            params: { uri: `https://heradigitalhealth.org/${locale}/data-protection-policy/` },
          })}
        />
        <DrawerItem 
          style={{}}
          icon={({ color, size }: {color: any, size: any}) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          )}
          label={({ focused, color }) => (
            <Text style={{ 
              color: focused ? Colors.primary : color,
              fontWeight: focused ? 'bold' : 'normal',
              fontSize: 15,
              textAlign: 'left'
            }}>
              {t('settings_screen_user_agreement_title')}
            </Text>
          )}
          onPress={() => router.push({
            pathname: '/web-view-screen',
            params: { uri: `https://heradigitalhealth.org/${locale}/terms-and-conditions/` },
          })}
        />
        <DrawerItem 
          style={{}}
          icon={({ color, size }: {color: any, size: any}) => (
            <Ionicons name="chatbox-ellipses-outline" size={size} color={color} />
          )}
          label={({ focused, color }) => (
            <Text style={{ 
              color: focused ? Colors.primary : color,
              fontWeight: focused ? 'bold' : 'normal',
              fontSize: 15,
              textAlign: 'left'
            }}>
              {t('faq_screen_toolbar_title')}
            </Text>
          )}
          onPress={() => router.push({
            pathname: '/web-view-screen',
            params: { uri: `https://heradigitalhealth.org/${locale}/frequently-asked-questions/` },
          })}
        />
        <DrawerItem 
          style={{}}
          icon={({ color, size }: {color: any, size: any}) => (
            <Ionicons name="mail-outline" size={size} color={color} />
          )}
          label={({ focused, color }) => (
            <Text style={{ 
              color: focused ? Colors.primary : color,
              fontWeight: focused ? 'bold' : 'normal',
              fontSize: 15,
              textAlign: 'left'
            }}>
              {t('settings_screen_contact_us_title')}
            </Text>
          )}
          onPress={() => router.push({
            pathname: '/web-view-screen',
            params: { uri: `https://heradigitalhealth.org/${locale}/contact/` },
          })}
        />
        <DrawerItem 
          style={{}}
          icon={({ color, size }: {color: any, size: any}) => (
            <Ionicons name="person-outline" size={size} color={color} />
          )}
          label={({ focused, color }) => (
            <Text style={{ 
              color: focused ? Colors.primary : color,
              fontWeight: focused ? 'bold' : 'normal',
              fontSize: 15,
              textAlign: 'left'
            }}>
              {t('my_profile_screen_toolbar_title')}
            </Text>
          )}
          onPress={() => router.push('/my-profile-screen')}
        />
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: "#dde3fe", paddingBottom: 20 + bottom}}>
        <View style={{flexDirection: "row", alignItems: "center", gap: 8, marginLeft: 4}}>
          <Ionicons name="log-out-outline" size={32} color={'#f00'} />
          <Pressable onPress={handleSignOut}>
            <Text style={{color: '#f00'}}>{t('settings_screen_logout_button')}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

}