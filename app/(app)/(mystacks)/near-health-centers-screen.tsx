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
import { Colors, GlobalStyles, Spacing } from "@/assets/theme";
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from '@/hooks/useTranslation';
import { useRouter } from 'expo-router';

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

const CalloutContent = ({label, address, lat, lng}: {label: string, address: string, lat: string, lng: string}) => {
  const {t} = useTranslation();

  const openInMaps = () => {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    
    if (isNaN(latitude) || isNaN(longitude)) {
      console.warn('Invalid coordinates:', { lat, lng, latitude, longitude });
      return;
    }

    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${latitude},${longitude}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    
    if (url) {
      Linking.openURL(url).catch(err => console.error('Error opening maps:', err));
    }
  };

  return (
    <Pressable onPress={openInMaps} style={{padding: Spacing.medium, flex: 1, gap: Spacing.medium}}>
        <Text style={GlobalStyles.SubHeadingText}>
          {label}
        </Text>
        <Text style={GlobalStyles.NormalText}>
          {address}
        </Text>
        <View style={{flex: 1, padding: Spacing.small}}></View>
        <Text style={[GlobalStyles.NormalText, {color: Colors.primary, textAlign: 'center', marginBottom: Spacing.xlarge}]}>
          {t('nearby_health_centers_tap_to_open_in_maps')}
        </Text>
    </Pressable>
  );
}

export default function NearHealthCentersScreen() {
  const {sendRequestFetch} = useHttpClient();
  const [markers, setMarkers] = useState<HealthCenter[]>([]);
  const [region, setRegion] = useState<RegionGeolocation | undefined>(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();

  const INITIAL_REGION: RegionGeolocation = {
    latitude: 41.0082,
    longitude: 28.9784,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [tappedMarkerAndroid, setTappedMarkerAndroid] = useState<{name: string, address: string, lat: string, lng: string} | null>(null);

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
      
      if(result.isTokenExpired){
        return router.replace('/auth/login');
      }

      const data = result.data!
      setMarkers(data ? data : []);
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

  const handleOnHealthCenterIsTapped = (e: MarkerPressEvent, name:string, address: string, lat: string, lng: string) => {
    setTappedMarkerAndroid({name, address, lat, lng});
    setIsModalVisible(true);
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
          const geoComponents = marker.geolocation.split(',');
          const lat = parseFloat(geoComponents[0]?.trim() || '0');
          const lng = parseFloat(geoComponents[1]?.trim() || '0');
          
          if (isNaN(lat) || isNaN(lng)) {
            console.warn('Invalid marker coordinates:', { marker: marker.name, geolocation: marker.geolocation, lat, lng });
            return null;
          }
          
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: lat,
                longitude: lng,
              }}
              title={marker.name}
              onPress={(e) => {
                e.preventDefault();
                handleOnHealthCenterIsTapped(e, marker.name, marker.address, lat.toString(), lng.toString());
              }}>
            </Marker>
          );
        })}
      </MapView>

      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <Pressable 
          style={styles.modalBackdrop} 
          onPress={() => setIsModalVisible(false)}
        >
          <Pressable 
            style={styles.modalContainer}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalTitleContainer}>
              {/* <Text style={styles.title}>Choose an option</Text> */}
              <Pressable 
                onPress={() => setIsModalVisible(false)}
                style={styles.closeButton}
              >
                <MaterialIcons name="close" color="#464C55" size={16}/>
              </Pressable>
            </View>
            <View style={{flex:1}}>
              {tappedMarkerAndroid && (
                <CalloutContent 
                  label={tappedMarkerAndroid.name} 
                  address={tappedMarkerAndroid.address}
                  lat={tappedMarkerAndroid.lat}
                  lng={tappedMarkerAndroid.lng}
                />
              )}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    height: Dimensions.get('window').height-80,
  },
  mapMarkerTitle: {
    fontWeight: 'bold',
  },
  mapMarkerAddress: {
    fontWeight: '500',
    marginTop: 8,
    color: '#828282',
  },

  modalBackdrop: {
    flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    height: '40%',
    width: '100%',
    backgroundColor: '#fff',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
  },
  modalTitleContainer: {
    height: 35,
    backgroundColor: '#464C55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  modalBodyContainer: {
    justifyContent: 'center',
    height: '84%',
  }
});
