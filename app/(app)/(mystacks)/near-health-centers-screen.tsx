import {useCallback, useEffect, useState} from 'react';
// import {color, icons, styles} from '../../theme';
import { icoCurrentLocation } from '@/assets/images/images';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  View,
  Text,
  Linking,
  SafeAreaView,
  Modal,
  Pressable,
} from 'react-native';
import MapView, { MarkerPressEvent, PROVIDER_GOOGLE } from 'react-native-maps';
import {Marker, Callout} from 'react-native-maps';
import * as Location from 'expo-location';
import { useHttpClient } from '@/context/HttpClientContext';
import { GlobalStyles, Spacing } from "@/assets/theme";
// import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
// import Toast from 'react-native-toast-message';
// import {useTranslation} from 'react-i18next';
// import axios from 'axios';
// import {regionGeolocation} from '../../store/constants';

type RegionGeolocation = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

type HealthCenter = {
  activity_state: string;
  address: string;
  geolocation: string;
  last_updated: string;
  name: string;
  type: string;
}

const CalloutContent = ({name, address}: {name: string, address: string}) => {
  return (
    <View style={styles.mapMarkerPopup}>
      <Text style={styles.mapMarkerTitle} numberOfLines={1}>
        {name}
      </Text>
      <Text style={styles.mapMarkerAddress} numberOfLines={1}>
        {address}
      </Text>
    </View>
  );
}

export default function NearHealthCentersScreen() {
  // const {t} = useTranslation();

  const {sendRequestFetch} = useHttpClient();
  const [markers, setMarkers] = useState<HealthCenter[]>([]);
  const [region, setRegion] = useState<RegionGeolocation>();
  const INITIAL_REGION: RegionGeolocation = {
    latitude: 41.0082,
    longitude: 28.9784,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [tappedMarkerAndroid, setTappedMarkerAndroid] = useState<{name: string, address: string} | null>(null);

  const getHealthCenters = useCallback(async () => {
    try {
      if(!region) return;
      const url = `/health_centers?latitude=${region.latitude}&longitude=${region.longitude}&latitudeDelta=${region.latitudeDelta}&longitudeDelta=${region.longitudeDelta}`;
      let result = await sendRequestFetch<HealthCenter[]>({
        url: url,
        method: 'GET',
        headers: {
          'Accept-Language': 'en',
          'Content-Type': 'application/json',
        },
      });
      
      setMarkers(result.data!);
    } catch (err) {
      console.error(err);
    } finally {
    }
  }, [region]);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location: Location.LocationObject | null = null;
      try{

        location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });
      } catch(err){
        console.log(`Error: ${err}`);
      }
      if(!location){
        return;
      }

      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }

    getCurrentLocation();
  }, []);

  useEffect(() => {
    getHealthCenters();
  }, [getHealthCenters]);

  // const showToast = useCallback(() => {
  //   Toast.show({
  //     type: 'error',
  //     text2: t('location_error_message_text'),
  //   });
  // }, [t]);

  // useEffect(() => {
  //   getHealthCenters();
  // }, [getHealthCenters]);
  const dummy = (e: MarkerPressEvent, name:string, address: string) => {
    if(Platform.OS === 'android'){
      // console.log(e.nativeEvent.position);
      setTappedMarkerAndroid({name, address});
      setShowModal(true);
    }
  }
  return (
    <SafeAreaView style={{flex:1}}>
      <MapView 
        style={styles.map}
        initialRegion={INITIAL_REGION}
        region={region}
        showsUserLocation
        showsMyLocationButton
        // provider={PROVIDER_GOOGLE}
      >
        {markers.map((marker, index) => {
          const lat = +marker.geolocation.split(',')[0];
          const lng = +marker.geolocation.split(',')[1];
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: lat,
                longitude: lng,
              }}
              title={marker.name}
              onPress={(e) => dummy(e, marker.name, marker.address)}>
              {Platform.OS === 'ios' && <Callout
                tooltip={true}
                onPress={() => {
                  const scheme = Platform.select({
                    ios: 'maps:0,0?q=',
                    android: 'geo:0,0?q=',
                  });
                  const latLng = `${lat},${lng}`;
                  const label = `${marker.name}`;
                  const url = Platform.select({
                    ios: `${scheme}${label}@${latLng}`,
                    android: `${scheme}${latLng}(${label})`,
                  });
                  Linking.openURL(url!);
                }}>
                <CalloutContent name={marker.name} address={marker.address}/>
              </Callout>}
            </Marker>
          );
        })}
      </MapView>
      {/* <Toast position="bottom" text2NumberOfLines={2} /> */}
      {/* <Modal transparent={false} animationType={'fade'} visible={showModal} onRequestClose={() => setShowModal(false)}>
        <Pressable onPress={() => setShowModal(false)}>
          <CalloutContent name={tappedMarkerAndroid?.name!} address={tappedMarkerAndroid?.address!} />
        </Pressable>
      </Modal> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    height: Dimensions.get('window').height,
  },
  mapMarkerPopup: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    width: 200,
    height: 70,
  },
  mapMarkerTitle: {
    fontWeight: 'bold',
  },
  mapMarkerAddress: {
    fontWeight: '500',
    marginTop: 8,
    color: '#828282',
  },
});
