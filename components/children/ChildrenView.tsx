import { GlobalStyles, Spacing } from "@/assets/theme";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import ChildPlaceHolder from "./ChildPlaceHolder";
import { useRouter, useFocusEffect } from "expo-router";
import Button, { ButtonStyles } from "@/components/Button";
import { useCallback, useEffect, useState } from "react";
import { useHttpClient } from "@/context/HttpClientContext";
import Child from "@/interfaces/IChild";
import { useAuthStore } from '@/store/authStore';
import { ScrollView } from "react-native-gesture-handler";
import { useTranslation } from "@/hooks/useTranslation";

export default function ChildrenView({showIamDone}: { showIamDone: boolean}) {
  const { sendRequestFetch } = useHttpClient();
  const [children, setChildren] = useState<Child[]>([]);
  const { session, idToken } = useAuthStore();
  const {t} = useTranslation();
  const router = useRouter();

  // I use useFocusEffect instead of useEffect, because I need to re-fetch 
  // children again when navigating back from a Child view.
  useFocusEffect(
    useCallback(() => {
      getChildren();
    }, [])
  );

  const getChildren = async () => {
    // setRefreshing(true);
    let result = await sendRequestFetch<Child[]>({
      url: '/children/',
      method: 'GET',
      headers: {
        'Accept-Language': 'en',
        Authorization: 'Bearer ' + session,
        'Id-Authorization': 'Bearer ' + idToken!
      },
    });

    if(result.isTokenExpired){
      return router.replace('/auth/login');
    }

    const data = result.data!;
    setChildren(data ? data : []);

    // setRefreshing(false);
  };

  return (
    <SafeAreaView style={{flex:1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <View style={{flex:1, gap: Spacing.large}}>
          <Text style={GlobalStyles.HeadingText}>{t('children_info_screen_toolbar_title')}</Text>
          <Text style={GlobalStyles.NormalText}>{t('children_info_screen_description')}</Text>
          <ScrollView style={{flex:1}}>
            {children.map((c, index) => (
              <ChildPlaceHolder
                key={index}
                child={c}
                style={{marginBottom: Spacing.large}}
                onPress={(childId) => router.push({
                  pathname: "/child-add",
                  params: { childId: String(childId) },
                })}
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.actionButtonsContainer}>
          {showIamDone && <Button
            style={{flex: 1}}
            buttonType={ButtonStyles.UNFILLED}
            label="I'm done"
            onPress={() => router.replace('/')}
          />}
          <Button
            style={{flex: 1}}
            buttonType={ButtonStyles.FILLED}
            label={t('add_a_child_screen_toolbar_title')}
            onPress={() => router.push('/child-add')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: Spacing.large,
    // marginTop: Spacing.xxlarge,
    gap: Spacing.xxlarge,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: Spacing.xlarge,
    marginBottom: Spacing.xlarge
  },
});