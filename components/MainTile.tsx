import {Image, type ImageSource } from "expo-image";
import { View, StyleSheet, Pressable, Text} from "react-native";
import { color, GlobalStyles, Spacing } from "@/assets/theme";

type Props = {
  title: string;
  tileKey: string;
  image: ImageSource;
  textColor: string;
  backgroundColor: string;
  requireSignedIn: boolean;
  onPress?: (key: string, requireSignIn: boolean) => void;
}

export default function MainTile(
  {
    title,
    tileKey ,
    image,
    textColor,
    backgroundColor,
    requireSignedIn,
    onPress
  }: Props){
    return (
      <Pressable style={[styles.tileOuterContainer, {backgroundColor: backgroundColor}]} onPress={() => onPress ? onPress(tileKey, requireSignedIn) : () => {}}>
        <View >
            <View style={styles.tileInnerContainer}>
              <Image source={image} style={styles.tileImage} contentFit="contain"/>
              <Text style={[styles.tileText, {color: textColor}]}>{title}</Text>
            </View>
        </View>
      </Pressable>
    );
}

const styles = StyleSheet.create({
  tileOuterContainer: {
    justifyContent: 'center',
    height: 125,
    // width: 90,
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 12,
    paddingTop:16,
    borderRadius: 8,
    shadowColor: Colors.black,
    shadowOpacity: 0.2,
    elevation: 6,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  tileInnerContainer: {
    alignItems: 'center',
    padding:0,
    margin:0,
  },
  tileImage: {
    height: 50,
    width: 50,
  },
  tileText: {
    // fontSize: 13,
    // fontFamily: 'Roboto-Medium',
    ...GlobalStyles.IconTitleText,
    textAlign: 'center',
    marginTop: Spacing.medium,
  }
});