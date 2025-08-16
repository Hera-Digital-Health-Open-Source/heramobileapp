import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert
} from "react-native";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Octicons from "@expo/vector-icons/Octicons";
import DropDownPicker from "@/components/DropDownPicker";
import { useHttpClient } from "@/context/HttpClientContext";
import { useAuthStore } from '@/store/authStore';
import { useTranslation } from "@/hooks/useTranslation";
import { GlobalStyles } from "@/assets/theme";

export default function TranslatorScreen() {
  const [recognizing, setRecognizing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [translating, setTranslating] = useState(false);
  const [translation, setTranslation] = useState("");
  const [fromLanguageCode, setFromLanguageCode] = useState("ar-SA");
  const [toLanguageCode, setToLanguageCode] = useState("tr-TR");
  const {sendRequestFetch} = useHttpClient();
  const { session } = useAuthStore();
  const {t} = useTranslation();
  const [hideRedButton, setHideRedButton] = useState(false);

  const supportedLanguages = [
    {"label": t('language_dropdown_arabic_text'), "key": "ar-SA"},
    {"label": t('language_dropdown_english_text'), "key": "en-US"},
    {"label": t('language_dropdown_turkish_text'), "key": "tr-TR"},
  ];

  useSpeechRecognitionEvent("start", () => setRecognizing(true));
  useSpeechRecognitionEvent("end", () => {setRecognizing(false); setHideRedButton(false)});
  useSpeechRecognitionEvent("result", (event) => {
    setDisplayText(transcript + " " + event.results[0]?.transcript);
    const usefullText = event.results
      .filter((r) => r.confidence > 0)
      .map((r) => r.transcript)
      .join(" ");
    if (usefullText !== "") {
      setTranscript((old) => old + " " + usefullText);
    }
  });
  useSpeechRecognitionEvent("error", (event) => {
    if(event.error === 'language-not-supported'){
      Alert.alert("Voice Recognition", `The following locale is not exist, the translator will not work properly:\n${fromLanguageCode}`);
    } else if(event.error !== 'no-speech'){
      Alert.alert("Voice Recognition", `Unhandeled error: ${event.error} = ${event.message}`);
    }
  });


  useEffect(() => {
    if(!recognizing && transcript !== ''){
      setTranslating(true);
      sendRequestFetch<{result: string}>({
        url: '/translation_glossary/translatev2/',
        method: 'POST',
        headers: {
          'Accept-Language': 'en',
          'Content-Type': 'application/json',
          Authorization: 'Token ' + session,
        },
        data: {
          source_text: transcript,
          dest_language: toLanguageCode
        }
      }).then(r => {
        setTranslation(r.data?.result!);
      }).catch(err => {
        Alert.alert(t('translator_screen_failed_alert_title'), t('translator_screen_failed_alert_message'))
        console.log(err);
      }).finally(() => {
        setTranslating(false);
      })
    }
  }, [recognizing, transcript]);

  const handleStart = async () => {
    const permission = await ExpoSpeechRecognitionModule.getPermissionsAsync();
    if (!permission.granted) {
      if (permission.canAskAgain) {
        const result =
          await ExpoSpeechRecognitionModule.requestPermissionsAsync();
        if (!result.granted) {
          Alert.alert(t('general_permissions_title'), t('general_permissions_not_granted_message'));
          // console.warn("Permissions not granted", result);
          return;
        }
      } else {
        Alert.alert(t('general_permissions_title'), t('translator_screen_microphone_permission_required'));
        // console.warn(
        //   "You have to allow accessing the microphone from settings"
        // );
        return;
      }
    }


    setTranscript("");
    setTranslation("");
    ExpoSpeechRecognitionModule.start({
      lang: fromLanguageCode,
      interimResults: true,
      maxAlternatives: 1,
      continuous: true,
      requiresOnDeviceRecognition: false,
      addsPunctuation: false,
      contextualStrings: [],
    });
  };

  let whenTranslationWillAppear = "";
  if(recognizing){
    whenTranslationWillAppear = t('translator_screen_translation_hint1');
  } else if(!recognizing && !translating){
    whenTranslationWillAppear = t('translator_screen_translation_hint2');
  } else if(translating){
    whenTranslationWillAppear = t('translator_screen_translation_hint3');
  } else {
    whenTranslationWillAppear = "";
  }

  const setLanguageCode = (source: 'from' | 'to', code: string) => {
    if(source === 'from' && code === toLanguageCode) {
      setToLanguageCode(fromLanguageCode);
      setFromLanguageCode(code);
      return;
    }

    if(source === 'to' && code === fromLanguageCode) {
      setFromLanguageCode(toLanguageCode);
      setToLanguageCode(code);
      return;
    }

    if(source === 'from'){
      setFromLanguageCode(code);
      return;
    }

    if(source === 'to'){
      setToLanguageCode(code);
      return;
    }
  };

  const flipLanguages = () => {
    const tmp = fromLanguageCode;
    setFromLanguageCode(toLanguageCode);
    setToLanguageCode(tmp);
  };

  return (
    <View style={{ alignItems: "center", padding: 16, gap: 16 }}>
      <View style={styles.languagesContainer}>
        <View style={styles.singleLanguageContainer}>
          <Text style={GlobalStyles.IconTitleText}>{t('translator_screen_translate_from_text')}</Text>
          {/* I put this view here because the Picker component inside DropDownPicker component doesn't support alignItems to be center in the parent container, so I isolate the Picker container in this way */}
          <View style={{width: '100%'}}>
            <DropDownPicker
              items={supportedLanguages}
              style={{marginTop: 8}}
              initialKeySelection={fromLanguageCode}
              onItemSelectionChanged={(key) => setLanguageCode('from', key)}
            />
          </View>
        </View>
        <Pressable style={{marginTop: 24}} onPress={() => flipLanguages()}>
          <Octicons name="arrow-switch" size={16} color="blue" />
        </Pressable>
        <View style={styles.singleLanguageContainer}>
          <Text style={GlobalStyles.IconTitleText}>{t('translator_screen_translate_to_text')}</Text>
          <View style={{width: '100%'}}>
            <DropDownPicker
              items={supportedLanguages}
              style={{marginTop: 8}}
              initialKeySelection={toLanguageCode}
              onItemSelectionChanged={(key) => setLanguageCode('to', key)}
            />
          </View>
        </View>
      </View>

      {recognizing && !hideRedButton && (
        <Pressable
          style={[styles.microphoneButton, { backgroundColor: "red" }]}
          onPress={() => {
            setHideRedButton(true);
            ExpoSpeechRecognitionModule.stop();
            setDisplayText(transcript);
          }}
        >
          <FontAwesome name="stop" size={32} color="white" />
        </Pressable>
      )}

      {(translating || hideRedButton) && (
        <View
          style={[styles.microphoneButton, { backgroundColor: "#fff" }]}
        >
          <ActivityIndicator size={32} color={"#00f"}></ActivityIndicator>
        </View>
      )}

      {!translating && !recognizing && (
        <Pressable
          style={[styles.microphoneButton, { backgroundColor: "green" }]}
          onPress={handleStart}
        >
          <FontAwesome name="microphone" size={40} color="white" />
        </Pressable>
      )}

      <View style={styles.textContainer}>
        <Text style={{ textAlign: "right", ...GlobalStyles.NormalText }}>{displayText}</Text>

        <Text
          style={{
            textAlign: "left",
            marginTop: 16,
            marginBottom: 8,
            // fontSize: 16,
            ...GlobalStyles.NormalText
          }}
        >
          {t('translator_screen_translation')}
        </Text>
        {
          translation === "" && whenTranslationWillAppear !== "" && 
          <Text
            style={{
              ...GlobalStyles.NormalText,
              textAlign: "left",
              // fontSize: 14,
              fontStyle: "italic",
              color: "grey",
            }}
          >
            { whenTranslationWillAppear }
          </Text>
        }
        {
          translation !== "" && 
          <Text
            style={{
              textAlign: "left",
              fontSize: 16,
              fontStyle: "normal",
              color: "blue",
            }}
          >
            {translation}
          </Text>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  microphoneButton: {
    width: 75,
    height: 75,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  languagesContainer: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    borderRadius: 8,
    backgroundColor: "white",
    width: "100%",
    paddingVertical: 8,
    gap: 8,
  },
  singleLanguageContainer: {
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex:1,
    gap: 4,
  },
  textContainer: {
    borderRadius: 8,
    backgroundColor: "white",
    width: "100%",
    padding: 12
  },
});
