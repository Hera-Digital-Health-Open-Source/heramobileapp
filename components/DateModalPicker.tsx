import { StyleSheet, View, Text, Pressable, StyleProp, ViewStyle } from "react-native";
import {AntDesign} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";


type Props = {
  initialDate: Date | undefined;
  onDateSelected?: (date:Date)=>void;
  onCancel?: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function DateModalPicker({initialDate, onDateSelected, onCancel, style}: Props){
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if(initialDate){
      setDate(initialDate);
    }
  }, [initialDate]);

  const handleOnConfirm = (date: Date) => {
    setDate(date);
    setIsPickerVisible(false);

    if(onDateSelected){
      onDateSelected(date);
    }
  }

  const handleOnCancel= () => {
    setIsPickerVisible(false);
    if(onCancel){
      onCancel();
    }
  }

  return (
    <View style={style}>
      <Pressable onPress={() => setIsPickerVisible((prev) => !prev)}>
        <View style={styles.dropDownContainer}>
          <Text>{date?.toLocaleDateString()}</Text>
          <AntDesign name={"calendar"} size={22} />
        </View>
      </Pressable>

      {isPickerVisible && (
        <DateTimePickerModal
          isVisible={isPickerVisible}
          mode="date"
          onConfirm={handleOnConfirm}
          onCancel={handleOnCancel}
        />
      )}
    </View>

    
  );
}

const styles = StyleSheet.create({
  dropDownContainer: {
    width: '100%',
    height: 48,
    paddingHorizontal: 10,
    paddingVertical: 11,
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: '#eee',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#fa5'
  },
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