import {Image, type ImageSource } from "expo-image";
import { View, StyleSheet, Pressable, Text} from "react-native";

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
              <Image source={image} style={styles.tileImage}/>
              <Text style={[styles.tileText, {color: textColor}]}>{title}</Text>
            </View>
        </View>
      </Pressable>
    );
}

const styles = StyleSheet.create({
  tileOuterContainer: {
    justifyContent: 'center',
    height: 120,
    // width: 90,
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 12,
    paddingTop:16,
    borderRadius: 8,
  },
  tileInnerContainer: {
    alignItems: 'center',
    padding:0,
    margin:0,
  },
  tileImage: {
    height: 36,
    width: 36,
  },
  tileText: {
    fontSize: 11,
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
  }
});