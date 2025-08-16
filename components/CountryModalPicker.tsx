
import { StyleSheet, View, Text, Pressable, StyleProp, ViewStyle } from "react-native";
import {AntDesign} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import CountryPicker, { CountryCode } from 'react-native-country-picker-modal';
import { GlobalStyles } from "@/assets/theme";

type Props = {
  onCountrySelectionChanged?: (callingCode:string)=>void;
  preferredCountries: CountryCode[];
  defaultCallingCode: string;
  style?: StyleProp<ViewStyle>;
}

export default function CountryModalPicker({preferredCountries, defaultCallingCode, onCountrySelectionChanged, style}: Props){
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [countryCallingCode, setCountryCallingCode] = useState<string | null>(null);

  useEffect(() => {
    if(countryCallingCode && onCountrySelectionChanged){
      onCountrySelectionChanged(countryCallingCode);
    }
  }, [countryCallingCode]);

  return (
    <View style={style}>
      <Pressable onPress={() => setIsPickerVisible(!isPickerVisible)}>
        <View style={GlobalStyles.DropDownContainerStyle}>
          <Text style={GlobalStyles.NormalText}>{countryCallingCode ? countryCallingCode : defaultCallingCode}</Text>
          <AntDesign name={isPickerVisible ? "caretup" : "caretdown"} />
        </View>
      </Pressable>

      {isPickerVisible && (
        <CountryPicker
          withCallingCode={true}
          preferredCountries={preferredCountries}
          onSelect={country => setCountryCallingCode('+' + country.callingCode[0])}
          onClose={() => setIsPickerVisible(false)}
          withFilter={true}
          visible
          countryCode={'TR'}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    height: '25%',
    width: '100%',
    backgroundColor: '#fff',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  modalTitleContainer: {
    height: '16%',
    backgroundColor: '#464C55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  modalBodyContainer: {
    justifyContent: 'center',
    height: '84%',
  }
});