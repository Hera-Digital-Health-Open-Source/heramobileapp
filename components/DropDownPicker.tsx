import { StyleSheet, View, Text, Pressable, Modal, StyleProp, ViewStyle } from "react-native";
import {AntDesign} from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { Colors, GlobalStyles, Spacing } from "@/assets/theme";

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
      const filtered = items?.filter(i => i.key === `${currentKeySelected}`);
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

  if(Platform.OS === 'android'){
    return (
      <View style={GlobalStyles.InputBoxStyle}>
        <Picker
          style={{ 
            marginVertical: -Spacing.standard,
            marginHorizontal: -Spacing.standard + 2,
            fontSize: 50
          }}
          selectedValue={`${currentKeySelected}`}
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
      </View>
    );
  } else {
    return (
      <View style={style}>
        <Pressable onPress={() => setIsPickerVisible(!isPickerVisible)}>
          <View style={GlobalStyles.InputBoxWithIconStyle}>
            <Text style={GlobalStyles.NormalText}>{label ? label : ""}</Text>
            <AntDesign name={isPickerVisible ? "caretup" : "caretdown"} />
          </View>
        </Pressable>
  
        <Modal animationType="slide" transparent={true} visible={isPickerVisible}>
          <Pressable 
            style={styles.modalBackdrop} 
            onPress={() => setIsPickerVisible(false)}
          >
            <Pressable 
              style={styles.modalContainer}
              onPress={(e) => e.stopPropagation()}
            >
              <View style={styles.modalTitleContainer}>
                {/* <Text style={styles.title}>Choose an option</Text> */}
                <Pressable 
                  onPress={() => setIsPickerVisible(false)}
                  style={styles.closeButton}
                >
                  <MaterialIcons name="close" color="#464C55" size={16}/>
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
                    itemStyle={Platform.OS === 'ios' ? { color: Colors.black } : undefined}
                    selectedValue={`${currentKeySelected}`}
                    onValueChange={(itemValue, itemIndex) => {
                      setCurrentKeySelected(itemValue);
                      setIsPickerVisible(false);
                      if(onItemSelectionChanged){
                        setTimeout(() => {
                          onItemSelectionChanged(itemValue!);
                        }, 500);
                      }
                    }}>
                      {items?.map((item, index) => (
                        <Picker.Item color={Colors.black} label={item.label} value={item.key} key={item.key} />
                      ))}
                  </Picker>
                )}
              </View>
            </Pressable>
          </Pressable>
        </Modal>
      </View>
  
      
    );
  }
}

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    height: '25%',
    width: '100%',
    backgroundColor: '#fff',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
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
  closeButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
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