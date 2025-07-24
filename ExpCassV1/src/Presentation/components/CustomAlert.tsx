import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

interface CustomAlertProps {
  isVisible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const CustomAlert: React.FC<CustomAlertProps> = ({ isVisible, message, onConfirm, onCancel }) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <Text>{message}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            <TouchableOpacity onPress={onCancel}>
              <Text style={{ color: 'blue', marginRight: 10 }}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm}>
              <Text style={{ color: 'blue' }}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};