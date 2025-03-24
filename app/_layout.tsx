import LoadingModal from "@/components/LoadingModel";
import { AppProvider } from "@/context/AppProvider";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <AppProvider>
      <LoadingModal />
      <Slot />
    </AppProvider>
  );
}
