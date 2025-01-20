import React from 'react';
import { View, Modal, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useHttpClient } from '@/context/HttpClientContext';

const LoadingModal = () => {
  const { isWaitForServerResponse } = useHttpClient();

  return (
    <Modal transparent={true} visible={isWaitForServerResponse} animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.activityContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
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
  },
});

export default LoadingModal;