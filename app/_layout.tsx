import LoadingModal from "@/components/LoadingModel";
import { AppProvider } from "@/context/AppProvider";
import { Slot } from "expo-router";
import { useEffect } from 'react';
import { Heap } from '@heap/heap-react-native-bridge';
import { registerHeapAutocapture } from '@heap/heap-react-native-autocapture';


export default function RootLayout() {
  useEffect(() => {
    Heap.logToConsole();                 // optional
    Heap.startRecording("2800948075");  // required
    registerHeapAutocapture(true);       // required
  }, []);

  return (
    <AppProvider>
      <LoadingModal />
      <Slot />
    </AppProvider>
  );
}
