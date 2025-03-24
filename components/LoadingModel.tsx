import React from 'react';
import { View, Modal, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useLoading } from '@/context/LoadingContext';
import { color } from '@/assets/theme';


const LoadingModal = () => {
  const {isLoading} = useLoading();

  return (
    <Modal transparent={true} visible={isLoading} animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.activityContainer}>
          <ActivityIndicator size="large" color={color.primary} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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