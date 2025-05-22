import React from 'react';
import { View, Modal, ActivityIndicator, StyleSheet, Text, Platform, Dimensions } from 'react-native';
import { useLoading } from '@/context/LoadingContext';
import { color } from '@/assets/theme';
import { useTranslation } from '@/hooks/useTranslation';

const LoadingModal = () => {
  const {isLoading} = useLoading();
  const {t} = useTranslation();

  return (
    <Modal style={{flex: 1}} transparent={true} visible={isLoading} animationType="fade" statusBarTranslucent={Platform.OS === 'android'}>
      <View style={styles1.modalWrapper}>
        <View style={styles1.modalBackground}>
          <View style={styles1.loaderContainer}>
            <ActivityIndicator size="large" color={color.primary} />
            <Text style={styles1.loadingText}>{t('general_loading_title')}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};


const { width, height } = Dimensions.get('window');

const styles1 = StyleSheet.create({
  modalWrapper: {
    width,
    height,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  modalBackground: {
    // flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderColor: 'red',
    borderWidth: 2,
  },
  activityContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: color.primary,
  },
});

export default LoadingModal;