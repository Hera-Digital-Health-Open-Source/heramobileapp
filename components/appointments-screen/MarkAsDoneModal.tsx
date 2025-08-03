import { StyleSheet, View, Text, Pressable, Modal, StyleProp, ViewStyle, ScrollView, TouchableWithoutFeedback } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from "react";
import Appointment from "@/models/IAppointment";
import MarkAsDoneButton from "./MarkAsDoneButton";
import Checkbox from "../CheckBox";
import Button, { ButtonStyles } from "../Button";
import { Spacing } from "@/assets/theme";
import { useTranslation } from "@/hooks/useTranslation";

type Props = {
  onItemSelectionChanged?: (key:string)=>void;
  appointment: Appointment;
  style?: StyleProp<ViewStyle>;
  onSave : (selectedVaccineNames: string[])=>Promise<void>;
  initTakenVaccines: string[];
}

export default function MarkAsDoneModal({appointment, onSave, style, initTakenVaccines}: Props){
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [takenVaccines, setTakenVaccines] = useState<string[]>(initTakenVaccines);
  const {t} = useTranslation();

  const handleTakeVaccine = (vaccine_name: string, is_taken: boolean) => {
    if(is_taken){
      setTakenVaccines([...takenVaccines, vaccine_name]);
    } else {
      setTakenVaccines(takenVaccines.filter(d => d !== vaccine_name));
    }
  }

  const handleOnSave = async () => {
    await onSave(takenVaccines);
    setIsPickerVisible(false); //this line should be put after the async onSave function, otherwise the frontend will freeze.
  };

  return (
    <View style={style}>
      <MarkAsDoneButton style={{paddingHorizontal: 4}} label={t('my_appointments_screen_mark_as_done_btn')} onPress={() => setIsPickerVisible(!isPickerVisible)} />

      <Modal animationType="fade" transparent={true} visible={isPickerVisible}>
        <TouchableWithoutFeedback onPress={() => setIsPickerVisible(false)}>
          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.3)'}}>
            <View style={styles.modalContainer}>
              <View style={styles.modalTitleContainer}>
                {/* <Text style={styles.title}>Choose an option</Text> */}
                <Pressable style={{backgroundColor: '#fff', borderRadius: 20, padding: 2}} onPress={() => setIsPickerVisible(false)}>
                  <MaterialIcons name="close" color="#464C55" size={25}/>
                </Pressable>
              </View>
              <View style={styles.modalBodyContainer}>
                {!appointment && (
                  <Text style={{textAlign: 'center'}}>
                    No appointments are available
                  </Text>
                )}
                {appointment && (
                  <View style={{flex: 1, paddingHorizontal: Spacing.medium}}>
                    <ScrollView>
                      {appointment.vaccine_names?.map( (vaccineName, index) => (
                        <Checkbox
                          key={index}
                          initIsChecked={takenVaccines.filter(t => t == vaccineName).length === 1}
                          label={vaccineName}
                          onChange={(val) => {handleTakeVaccine(vaccineName, val)}}
                        />
                      ))}
                    </ScrollView>
                    <Button buttonType={ButtonStyles.FILLED} label={t('child_info_screen_save_button')} onPress={handleOnSave}/>
                    <Button buttonType={ButtonStyles.UNFILLED} label={t('child_info_screen_remove_button')} onPress={() => setIsPickerVisible(!isPickerVisible)} />
                  </View>
                )}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>

    
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    height: '50%',
    width: '100%',
    backgroundColor: '#fff',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  modalTitleContainer: {
    height: '10%',
    backgroundColor: '#464C55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 10,
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
    paddingHorizontal: 4
  }
});