import { Redirect, Stack } from 'expo-router';
import Protected from '../protected';

// import { useSession } from '@/context/AuthContext';

export default function AppLayout() {
  // return (<Redirect href={'/registration/user-details'} />);
  return (
    <Protected>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="index" options={{headerShown: false}} />
      </Stack>
    </Protected>
  );
}
