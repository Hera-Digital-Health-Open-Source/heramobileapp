import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function WebViewScreen() {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  
  return (
    <WebView
      style={styles.container}
      source={{ uri: uri }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});