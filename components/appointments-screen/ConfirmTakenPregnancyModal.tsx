import { StyleSheet, View, Text, Pressable, Modal, StyleProp, ViewStyle, ScrollView, TouchableWithoutFeedback } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from "react";
import Appointment from "@/models/IAppointment";
import MarkAsDoneButton from "./MarkAsDoneButton";
import Button, { ButtonStyles } from "../Button";
import { Colors, GlobalStyles, Spacing } from "@/assets/theme";
import { useTranslation } from "@/hooks/useTranslation";

type Props = {
  appointment: Appointment;
  style?: StyleProp<ViewStyle>;
  onConfirm : ()=>Promise<void>;
  isTaken?: boolean;
}

export default function ConfirmTakenPregnancyModal({appointment, onConfirm, style, isTaken=false}: Props){
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [isTakenBefore, setIsTakenBefore] = useState(isTaken);
  const {t} = useTranslation();

  const handleOnConfirm = async () => {
    setIsTakenBefore(true);
    await onConfirm();
    setIsPickerVisible(false); //this line should be put after the async onSave function, otherwise the frontend will freeze.
  };
  return (
    <View style={style}>
      {!isTakenBefore && 
        <MarkAsDoneButton 
          style={{paddingHorizontal: Spacing.small}}
          label={t('my_appointments_screen_mark_as_done_btn')}
          onPress={() => setIsPickerVisible(!isPickerVisible)}
        />
      }
      {isTakenBefore && 
        <MarkAsDoneButton 
          style={{paddingHorizontal: Spacing.small, borderColor: Colors.white, borderWidth: 0}}
          label={'Confirmed'}
          onPress={() => {}}
        />
      }
      <Modal animationType="fade" transparent={true} visible={isPickerVisible}>
        <TouchableWithoutFeedback onPress={() => setIsPickerVisible(false)}>
          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.3)'}}>
            <View style={styles.modalContainer}>
              <View style={styles.modalTitleContainer}>
                <Pressable style={{backgroundColor: '#fff', borderRadius: 20, padding: 2}} onPress={() => setIsPickerVisible(false)}>
                  <MaterialIcons name="close" color="#464C55" size={25}/>
                </Pressable>
              </View>
              <View style={styles.modalBodyContainer}>
                <View style={{flex: 1, padding: Spacing.medium, marginTop: Spacing.large}}>
                  <Text style={GlobalStyles.SubHeadingText}>Did you go to the pregnancy check on {appointment.date}?</Text>
                </View>
                <View style={{paddingHorizontal: Spacing.medium}}>
                  <Button buttonType={ButtonStyles.FILLED} label={t('mark_as_done_modal_confirm_btn')} onPress={handleOnConfirm}/>
                  <Button buttonType={ButtonStyles.UNFILLED} label={t('mark_as_done_modal_cancel_btn')} onPress={() => setIsPickerVisible(!isPickerVisible)} />
                </View>
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
    paddingHorizontal: Spacing.small
  }
});