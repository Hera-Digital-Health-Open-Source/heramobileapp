import { Redirect, Stack } from 'expo-router';
import Protected from '../protected';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '@/components/CustomDrawerContent';

export default function AppLayout() {
  // return (<Redirect href={'/doctor-appointment'} />);
  return (
    // <Protected>
    //   <Stack screenOptions={{headerShown: false}}>
    //     <Stack.Screen name="index" options={{headerShown: false}} />
    //   </Stack>
    // </Protected>
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
          {/* <Drawer.Screen name='(mystacks)' />
        </Drawer> */}
    </GestureHandlerRootView>
    </Protected>
  );
}
