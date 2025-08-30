import React, {useEffect, useState} from 'react';
import { useTranslation } from "@/hooks/useTranslation";
import {
  View,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Pressable,
  SafeAreaView,
  ScrollView,
  Image,
  Linking,
  TextInput
} from 'react-native';
// import {color, styles, gifLoading, imgHomeWhatsappHotline} from '../../theme';
import { Colors, GlobalStyles, Spacing } from '@/assets/theme';
// import {useTranslation} from 'react-i18next';
// import {t} from 'i18next';
// import {ToolBar} from '../../components/toolbar';
// import {userService} from '@services/user-service';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import { useHttpClient } from '@/context/HttpClientContext';
import { useAuthStore } from '@/store/authStore';
import { imgHomeWhatsappHotline } from '@/assets/images/images';
import { useRouter } from 'expo-router';
import { useProfileStore } from '@/store/profileStore';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface IArticle{
  id: number;
  title: string;
}

interface ISection {
  name: string;
  articles: IArticle[];
}
export default function SrhrScreen() {
  // const {i18n} = useTranslation();
  const { t } = useTranslation();
  const [sections, setSections] = useState<ISection[]>([]);
  const [isEmptySections, setIsEmptySections] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filteredSections, setFilteredSections] = useState<ISection[]>([]);
  const {sendRequestFetch} = useHttpClient();
  const { session } = useAuthStore();
  const router = useRouter();
  const { userProfile } = useProfileStore();

  useEffect(() => {
    async function getSectionsOfConcept() {
      const result = await sendRequestFetch<ISection[]>({
        url: `/concepts/${1}/${userProfile?.language_code}/sections/`,
        method: 'GET',
        headers: {
          'Accept-Language': 'en',
          Authorization: 'Token ' + session,
        },
      });

      if(result.isTokenExpired){
        return router.replace('/auth/login');
      }
  
      if(result.data){
        setSections(result.data);
        setFilteredSections(result.data);
        setIsEmptySections(false);
      } else {
        setIsEmptySections(true);
      }
    }

    getSectionsOfConcept();
  }, []); //[i18n.language]

  useEffect(() => {
    if (searchInput !== '') {
      setFilteredSections(() => {
        const sectionsCopy = sections.map(s => ({
          name: s.name,
          articles: s.articles.map(a => ({id: a.id, title: a.title})),
        }));
        const filtered = sectionsCopy.filter(s => {
          // Search in the section's article titles.
          const articles = s.articles.filter(a => {
            return (
              a.title.toLowerCase().indexOf(searchInput.toLocaleLowerCase()) >=
              0
            );
          });

          // Search in the section's name.
          if (
            s.name.toLowerCase().indexOf(searchInput.toLocaleLowerCase()) === -1
          ) {
            s.articles = articles;
            return articles.length > 0;
          } else {
            return true;
          }
        });
        return filtered;
      });
    } else {
      setFilteredSections(sections);
    }
  }, [searchInput, sections]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      {!isEmptySections && (
        <View>
          <View style={localStyles.searchContainer}>
          <TextInput
            // textAlign={'left'} //i18n.language === 'ar' ? 'right' : 'left'
            style={[GlobalStyles.InputBoxStyle, {width: '80%'}]}
            // editable={true}
            value={searchInput}
            onChangeText={setSearchInput}
            placeholder={t('shrh_screen_search_hint')}
            placeholderTextColor={Colors.disabledtext}
            keyboardType="default"
          />
            
            {/*
            <Pressable
              style={localStyles.askAmtiContainer}
              onPress={() => Linking.openURL(`https://wa.me/13613147388`)}>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row' //i18n.language === 'ar' ? 'row-reverse' : 'row',
                }}>
                <Image
                  style={localStyles.askAmtiImage}
                  source={imgHomeWhatsappHotline}
                />
                  
                <Text style={localStyles.askAmti}>
                  {'Ask Amti!'} 
                </Text>
              </View>
            </Pressable>
            */}
          </View>
          <ScrollView>
            <View style={localStyles.sectionContainer}>
              {filteredSections.length > 0 &&
                filteredSections.map((s, index) => (
                  <Section
                    section={s}
                    key={s.name + index}
                  />
                ))}
            </View>
          </ScrollView>
        </View>
      )}
      {isEmptySections && (
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
          }}>
          <Text
            style={{
              color: Colors.disabledtext,
              textAlign: 'center',
            }}>
            No content
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

function Section({section}:{section: ISection}) {
  const [open, setopen] = useState(false);
  const router = useRouter();
  
  const onPress = (value: number, title: string) => {
    if (value === 0) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setopen(!open);
    } else {
      // Navigate to article details screen
      router.push(`./article-details?id=${value}&title=${encodeURIComponent(title)}`);
    }
  };
  return (
    <Pressable
      style={localStyles.section}
      onPress={() => onPress(0, section.name)}>
        {/* activeOpacity={1} */}
      <View style={localStyles.sectionHeaderContainer}>
        <Text numberOfLines={2} style={localStyles.sectionHeaderText}>{section.name}</Text>
        <View style={{flex: 5}} />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: Colors.background,
            borderRadius: 13,
            width: 26,
            height: 26,
          }}>
          <Text style={{textAlign: 'center', color: Colors.black}}>
            {section.articles.length}
          </Text>
        </View>
      </View>
      {open && section.articles.length > 0 && (
        <ScrollView style={{height: 300}}>
          {section.articles.map((s, index) => (
            <Pressable
              onPress={() => onPress(s.id, s.title)}
              key={s.title + index}>
              <View style={localStyles.itemContainer}>
                <Text style={localStyles.item}>📄</Text>
                <View style={{width: 8}} />
                <Text style={localStyles.item}>{s.title}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </Pressable>
  );
}

const localStyles = StyleSheet.create({
  searchContainer: {
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    gap: Spacing.medium,
  },
  askAmtiContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginVertical: 0,
    backgroundColor: Colors.whatsappgreen,
    borderRadius: 8,
    justifyContent: 'center',
  },
  askAmti: {
    color: Colors.green,
    fontSize: 16,
    marginHorizontal: 8,
  },
  askAmtiImage: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  },
  sectionContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  section: {
    width: '100%',
    borderWidth: 0,
    overflow: 'hidden',
    marginBottom: 5,
  },
  sectionHeaderText: {
    ...GlobalStyles.NormalText,
    fontSize: 16,
    color: Colors.white,
  },
  sectionHeaderContainer: {
    backgroundColor: Colors.primary,
    margin: 0,
    paddingVertical: Spacing.medium,
    paddingHorizontal: Spacing.standard,
    borderRadius: Spacing.medium,
    flexDirection: 'row',
    alignItems: 'center',
    // height: 60,
  },
  item: {
    ...GlobalStyles.NormalText,
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.disabled,
    paddingLeft: Spacing.medium,
    paddingRight: 32,
    paddingVertical: Spacing.standard,
  },
});
