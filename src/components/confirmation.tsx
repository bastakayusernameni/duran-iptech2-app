import React, { useEffect } from 'react';
import {
  View,
  Text,
  Modal,
} from 'react-native';

type ConfirmationProps = {
  visible: boolean;
  username: string;
  onFinish: () => void;
};

const styles = {
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  } as const,

  popup: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingVertical: 26,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
  } as const,

  icon: {
    fontSize: 42,
    marginBottom: 12,
  } as const,

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#5C5470',
    marginBottom: 8,
  } as const,

  text: {
    fontSize: 15,
    color: '#8E7C93',
    textAlign: 'center',
    lineHeight: 22,
  } as const,
};

export default function Confirmation({
  visible,
  username,
  onFinish,
}: ConfirmationProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onFinish();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.icon}>✅</Text>

          <Text style={styles.title}>
            Login Successful
          </Text>

          <Text style={styles.text}>
            Welcome {username}!{"\n"}
            Redirecting to homepage...
          </Text>
        </View>
      </View>
    </Modal>
  );
}