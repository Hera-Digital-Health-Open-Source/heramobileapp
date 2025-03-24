import { StyleSheet, View, Text, Pressable, Modal, StyleProp, ViewStyle, ScrollView } from "react-native";
import {AntDesign} from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useState } from "react";
import Appointment from "@/models/IAppointment";
import MarkAsDoneButton from "./MarkAsDoneButton";
import Checkbox from "../CheckBox";
import Button, { ButtonStyles } from "../Button";
import { Spacing } from "@/assets/theme";
import { FadeIn } from "react-native-reanimated";

type Props = {
  onItemSelectionChanged?: (key:string)=>void;
  appointment: Appointment;
  style?: StyleProp<ViewStyle>;
  onSubmit : (selectedDoesIds: number[])=>void;
  initTakenDoseIds: number[];
}

export default function MarkAsDoneModal({appointment, onSubmit, style, initTakenDoseIds}: Props){
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [takenDoseIds, setTakenDoseIds] = useState<number[]>(initTakenDoseIds);

  const duality : {vaccine_name: string, dose_id: number}[] = appointment.vaccine_names?.map(
    (e, index) => ({vaccine_name: e, dose_id: appointment.dose_ids[index]})
  )

  const handleCheckDose = (dose_id: number, is_taken: boolean) => {
    if(is_taken){
      setTakenDoseIds([...takenDoseIds, dose_id]);
    } else {
      setTakenDoseIds(takenDoseIds.filter(d => d !== dose_id));
    }
  }

  return (
    <View style={style}>
      <MarkAsDoneButton style={{paddingHorizontal: 4}} label={"Mark as Done"} onPress={() => setIsPickerVisible(!isPickerVisible)} />

      <Modal animationType="fade" transparent={true} visible={isPickerVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalTitleContainer}>
            {/* <Text style={styles.title}>Choose an option</Text> */}
            <Pressable onPress={() => setIsPickerVisible(false)}>
              <MaterialIcons name="close" color="#fff" size={22}/>
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
                  {duality?.map( (d, index) => (
                    <Checkbox
                      key={index}
                      initIsChecked={takenDoseIds.filter(t => t == d.dose_id).length === 1}
                      label={d.vaccine_name}
                      onChange={(val) => {handleCheckDose(d.dose_id, val)}}
                    />
                  ))}
                </ScrollView>
                <Button buttonType={ButtonStyles.FILLED} label="Submit" onPress={() => {onSubmit(takenDoseIds); setIsPickerVisible(false);}}/>
                <Button buttonType={ButtonStyles.UNFILLED} label="Cancel" onPress={() => setIsPickerVisible(!isPickerVisible)} />
              </View>
            )}
          </View>
        </View>
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