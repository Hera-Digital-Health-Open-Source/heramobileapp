import { Redirect, Stack } from 'expo-router';
import Protected from '../protected';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '@/components/CustomDrawerContent';

export default function AppLayout() {
  return (
    <Protected>
      <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer 
            drawerContent={() => <CustomDrawerContent />}
            screenOptions={{
              headerShown: false,
              drawerHideStatusBarOnOpen: true,
              drawerActiveBackgroundColor: '#f00',
              drawerActiveTintColor: '#000',
              drawerLabelStyle: {marginLeft: -16},
            }}
          />
      </GestureHandlerRootView>
    </Protected>
  );
}
