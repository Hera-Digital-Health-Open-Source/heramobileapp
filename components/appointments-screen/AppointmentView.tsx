import { color, GlobalStyles, Spacing } from "@/assets/theme";
import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { StyleProp, View, ViewStyle, Text, Pressable } from "react-native";


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
  return (
    <AppointmentView style={style}>
      <Text style={[GlobalStyles.NormalText, {color: color.primary}]}>
        {'Pregnancy Check'}
      </Text>
      <Text>
        {''}
      </Text>
      <FindHealthCenterView label="You can get this checkup for free. Find out where." />
    </AppointmentView>
  );
}

export function VaccineAppointmentView({style, person_name, vaccine_names}: {person_name: string, vaccine_names: string[], style: StyleProp<ViewStyle>}){
  return (
    <AppointmentView style={style}>
      <Text style={[GlobalStyles.NormalText, {color: color.primary}]}>
        {person_name}
      </Text>
      <Text>
        {`Recommended vaccines: ${vaccine_names}`}
      </Text>
      <FindHealthCenterView label="Your child can get this vaccine for free. Find out where." />
    </AppointmentView>
  );
}

export function NoAppointmentView({style}: {style: StyleProp<ViewStyle>}){
  return (
    <AppointmentView style={[style, {alignItems: 'center', justifyContent: 'center', flex: 1}]}>
      <Text>No appointments are scheduled for today</Text>
    </AppointmentView>
  );
}

function FindHealthCenterView({label}: {label: string}) {
  return (
    <Pressable onPress={() => alert('helllo')}>
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