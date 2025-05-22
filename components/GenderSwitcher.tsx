import { useEffect, useState } from "react";
import { View, StyleSheet, ViewStyle, Image, StyleProp } from "react-native";
import MainTile from "./MainTile";
import { imgUserDetailsMale, imgUserDetailsFemale } from "@/assets/images/images";
import { color } from "@/assets/theme";
import { useTranslation } from "@/hooks/useTranslation";

type Props = {
  style?: StyleProp<ViewStyle>;
  initialGender: 'MALE' | 'FEMALE' | undefined;
  onGenderChanged: (newGender: 'MALE' | 'FEMALE') => void;
}

export default function GenderSwitcher({style, initialGender, onGenderChanged}: Props){
  const [selectedGender, setSelectedGender] = useState<'MALE' | 'FEMALE' | undefined>(undefined);
  const {t} = useTranslation();

  useEffect(() => {
    if(initialGender){
        setSelectedGender(initialGender);
    }
  }, [initialGender]);

  useEffect(() => {
    if(selectedGender){
      onGenderChanged(selectedGender);
    }
  },[selectedGender]);

  return (
    <View style={[styles.container , style]}>
      <MainTile
        image={imgUserDetailsFemale}
        requireSignedIn={false}
        textColor="#000"
        title={t('gender_dropdown_female_text')}
        tileKey="female"
        backgroundColor={selectedGender === 'FEMALE' ?  color.background : '#fff'}
        onPress={() => setSelectedGender('FEMALE')}/>
      <MainTile
        image={imgUserDetailsMale}
        requireSignedIn={false}
        textColor="#000"
        title={t('gender_dropdown_male_text')}
        tileKey="male"
        backgroundColor={selectedGender === 'MALE' ? color.background : '#fff'}
        onPress={() => setSelectedGender('MALE')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    // marginVertical: 8,
    gap: 9,
  },
});