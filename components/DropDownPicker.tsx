import { StyleSheet, View, Text, Pressable, Modal, StyleProp, ViewStyle } from "react-native";
import {AntDesign} from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';
import { useEffect, useState } from "react";

type DropDownItem = {
  label: string;
  key: string;
}

type Props = {
  onItemSelectionChanged?: (key:string)=>void;
  items?: DropDownItem[];
  initialKeySelection: string;
  style?: StyleProp<ViewStyle>;
}

export default function DropDownPicker({items, initialKeySelection, onItemSelectionChanged, style}: Props){
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [currentKeySelected, setCurrentKeySelected] = useState<string | null>(null);
  const [label, setLabel] = useState<string | undefined>(undefined);

  useEffect(() => {
    setCurrentKeySelected(initialKeySelection);
  }, [initialKeySelection]);

  useEffect(() => {
    if(currentKeySelected){
      const filtered = items?.filter(i => i.key === currentKeySelected);
      if(filtered){
        if(filtered.length > 0){
          setLabel(filtered[0].label);
        } else {
          setLabel(undefined);
        }
      } else {
        setLabel(undefined);
      }
    }
  }, [currentKeySelected]);

  return (
    <View style={style}>
      <Pressable onPress={() => setIsPickerVisible(!isPickerVisible)}>
        <View style={styles.dropDownContainer}>
          <Text>{label ? label : ""}</Text>
          <AntDesign name={isPickerVisible ? "caretup" : "caretdown"} />
        </View>
      </Pressable>

      <Modal animationType="slide" transparent={true} visible={isPickerVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalTitleContainer}>
            {/* <Text style={styles.title}>Choose an option</Text> */}
            <Pressable onPress={() => setIsPickerVisible(false)}>
              <MaterialIcons name="close" color="#fff" size={22}/>
            </Pressable>
          </View>
          <View style={styles.modalBodyContainer}>
            {!items && (
              <Text style={{textAlign: 'center'}}>
                No items are available
              </Text>
            )}
            {items && (
              <Picker
                selectedValue={currentKeySelected}
                onValueChange={(itemValue, itemIndex) => {
                  setCurrentKeySelected(itemValue);
                  if(onItemSelectionChanged){
                    onItemSelectionChanged(itemValue!);
                  }
                }}>
                  {items?.map((item, index) => (
                    <Picker.Item label={item.label} value={item.key} key={item.key} />
                  ))}
              </Picker>
            )}
          </View>
        </View>
      </Modal>
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