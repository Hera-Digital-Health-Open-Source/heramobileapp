import { StyleSheet, TextInput, ScrollView } from "react-native";
import { Spacing } from "@/assets/theme";
import ChildView from "@/components/children/ChildView";

export default function ChildAdd(){
  return (<ChildView introduceText="Add a child"/>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.large,
    marginTop: Spacing.xxlarge,
    gap: Spacing.xlarge,
    backgroundColor: '#fff',
  },
  yesNoContainer: {
    flex:1,
    justifyContent: 'center',
  },
  yesNoButtonsContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: Spacing.xlarge
  }
});