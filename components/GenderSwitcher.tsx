import { useEffect, useState } from "react";
import { View, StyleSheet, ViewStyle, Image, StyleProp } from "react-native";
import MainTile from "./MainTile";
import { imgUserDetailsMale, imgUserDetailsFemale } from "@/assets/images/images";
import { color } from "@/assets/theme";

type Props = {
  style?: StyleProp<ViewStyle>;
  initialGender: 'male' | 'female' | undefined;
  onGenderChanged: (newGender: 'male' | 'female') => void;
}

export default function GenderSwitcher({style, initialGender, onGenderChanged}: Props){
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | undefined>(initialGender);

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
        title="Female"
        tileKey="female"
        backgroundColor={selectedGender === 'female' ?  color.background : '#fff'}
        onPress={() => setSelectedGender('female')}/>
      <MainTile
        image={imgUserDetailsMale}
        requireSignedIn={false}
        textColor="#000"
        title="Male"
        tileKey="male"
        backgroundColor={selectedGender === 'male' ? color.background : '#fff'}
        onPress={() => setSelectedGender('male')}/>
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