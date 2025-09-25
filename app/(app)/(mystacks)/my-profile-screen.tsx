import ProfileView from "@/components/profile/ProfileView";
import { useEffect, useState } from "react";
import { Alert, View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useProfileStore } from "@/store/profileStore";
import { useTranslation } from "@/hooks/useTranslation";
import { useHttpClient } from "@/context/HttpClientContext";
import { useAuthStore } from "@/store/authStore";
import { UserProfile } from "@/interfaces/IUserProfile";
import { Colors } from "@/assets/theme";

export default function MyProfileScreen(){
  const { userProfile, setUserProfile } = useProfileStore();
  const { t } = useTranslation();
  const { sendRequestFetch } = useHttpClient();
  const router = useRouter();
  const [userProfileSynced, setUserProfileSynced] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { session, idToken } = useAuthStore();

  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates if component unmounts

    const fetchUserProfile = async () => {
      if (!session) {
        router.replace('/auth/login');
        return;
      }

      if (!isMounted) return;
      setIsLoading(true);
      
      try {
        const response = await sendRequestFetch<UserProfile[]>({
          url: '/user_profiles/',
          method: 'GET',
          headers: {
            'Accept-Language': 'en',
            Authorization: 'Bearer ' + session,
            'Id-Authorization': 'Bearer ' + idToken!
          },
        });

        if (!isMounted) return; // Check if component is still mounted

        if(response.isTokenExpired){
          return router.replace('/auth/login');
        }

        if(!response.error && response.data && response.data.length > 0){
          setUserProfile(response.data[0]);
          setUserProfileSynced(true);
        } else {
          Alert.alert(t('connection_error_title'), t('connection_error_message'));
        }
      } catch (error) {
        if (!isMounted) return;
        console.error('Error fetching user profile:', error);
        Alert.alert(t('connection_error_title'), t('connection_error_message'));
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // Only fetch if we don't already have a profile or if profile is not synced
    if (!userProfileSynced && !userProfile) {
      fetchUserProfile();
    } else if (userProfile && !userProfileSynced) {
      setUserProfileSynced(true);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [session]); // Only depend on session

  return(
    <View style={{flex:1, backgroundColor: '#fff'}}>
      {userProfileSynced && userProfile ? (
        <ProfileView profile={userProfile} />
      ) : isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : null}
    </View>
  )
}