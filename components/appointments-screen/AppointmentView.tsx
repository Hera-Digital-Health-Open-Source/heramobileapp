import { color, GlobalStyles, Spacing } from "@/assets/theme";
import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { StyleProp, View, ViewStyle, Text, Pressable } from "react-native";
import { useTranslation } from "@/hooks/useTranslation";
import { router } from "expo-router";

export function AppointmentView({style, children} : {children: ReactNode, style: StyleProp<ViewStyle>}){
  return (
    <View style={[
        style,
        {borderColor: '#ddd', borderWidth: 1, borderRadius: Spacing.xlarge, padding: Spacing.large, gap: Spacing.medium}
      ]}
    >
      {children}
    </View>
  );
}

export function PregnancyAppointmentView({style}: {style: StyleProp<ViewStyle>}){
  const {t} = useTranslation();
  return (
    <AppointmentView style={style}>
      <Text style={[GlobalStyles.NormalText, {color: color.primary}]}>
        {t('my_appointments_pregnancy_check')}
      </Text>
      <Text>
        {''}
      </Text>
      <FindHealthCenterView label={t('my_appointments_screen_description_3')} />
    </AppointmentView>
  );
}

export function VaccineAppointmentView({style, person_name, vaccine_names}: {person_name: string, vaccine_names: string[], style: StyleProp<ViewStyle>}){
  const {t} = useTranslation();
  return (
    <AppointmentView style={style}>
      <Text style={[GlobalStyles.NormalText, {color: color.primary}]}>
        {person_name}
      </Text>
      <Text>
        {`Recommended vaccines: ${vaccine_names}`}
      </Text>
      <FindHealthCenterView label={t('my_appointments_screen_description_4')} />
    </AppointmentView>
  );
}

export function NoAppointmentView({style}: {style: StyleProp<ViewStyle>}){
  const {t} = useTranslation();
  return (
    <AppointmentView style={[style, {alignItems: 'center', justifyContent: 'center', flex: 1}]}>
      <Text>{t('my_appointments_screen_description_1')}</Text>
    </AppointmentView>
  );
}

function FindHealthCenterView({label}: {label: string}) {
  return (
    <Pressable onPress={() => router.push('/near-health-centers-screen')}>
      <View style={{
        gap: Spacing.large,
        borderRadius: Spacing.medium,
        borderColor: color.green,
        flexDirection: 'row',
        borderWidth: 1, padding:
        Spacing.medium
      }}>
        <Ionicons name="medkit-outline" size={32} color={color.green} />
        <Text style={{flex: 1}}>{label}</Text>
        <Ionicons name="chevron-forward-outline" size={32} color={color.green} />
      </View>
    </Pressable>
  );
}