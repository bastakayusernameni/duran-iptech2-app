import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Alert,
  Switch,
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { supabase } from './supabase';
import { useTheme } from '../context/themeContext';

type ProfileScreenProps = {
  username: string;
  onAccountDeleted: () => void;
};

export default function ProfileScreen({
  username,
  onAccountDeleted,
}: ProfileScreenProps) {
  const { isDarkMode, toggleTheme, styles } = useTheme();

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showWrongPasswordPopup, setShowWrongPasswordPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteSuccessPopup, setShowDeleteSuccessPopup] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

  const [deletePassword, setDeletePassword] = useState('');
  const [deletingAccount, setDeletingAccount] = useState(false);

  const changePassword = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordChange = async () => {
    if (!currentPassword.trim()) {
      Alert.alert('Missing Password', 'Please enter your current password.');
      return;
    }

    if (!newPassword.trim()) {
      Alert.alert('Missing Password', 'Please enter a new password.');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert(
        'Passwords Do Not Match',
        'Please confirm your new password correctly.'
      );
      return;
    }

    try {
      setChangingPassword(true);

      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: username,
        password: currentPassword,
      });

      if (loginError) {
        setChangingPassword(false);
        setCurrentPassword('');
        setShowWrongPasswordPopup(true);
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      setChangingPassword(false);

      if (updateError) {
        Alert.alert('Update Failed', updateError.message);
        return;
      }

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordModal(false);
      setShowSuccessPopup(true);
    } catch (error) {
      console.log('CHANGE PASSWORD ERROR:', error);
      setChangingPassword(false);
      Alert.alert('Error', 'Something went wrong while changing password.');
    }
  };

  const deleteAccount = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword.trim()) {
      Alert.alert('Missing Password', 'Please enter your password.');
      return;
    }

    try {
      setDeletingAccount(true);

      console.log('STARTING DELETE PROCESS');

      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: username,
        password: deletePassword,
      });

      if (loginError) {
        setDeletingAccount(false);
        setDeletePassword('');

        Alert.alert(
          'Incorrect Password',
          'The password you entered is incorrect.'
        );

        return;
      }

      console.log('PASSWORD VERIFIED');

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        setDeletingAccount(false);
        Alert.alert('Delete Failed', 'No active session found.');
        return;
      }

      console.log('CALLING DELETE FUNCTION NOW');

      const response = await fetch(
        'https://uzxymzfyzowtzyxzfoeb.supabase.co/functions/v1/delete-user',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      console.log('FUNCTION STATUS:', response.status);
      console.log('DELETE RESPONSE:', data);

      setDeletingAccount(false);

      if (!response.ok) {
        Alert.alert('Delete Failed', data.error || 'Function failed.');
        return;
      }

      setShowDeleteModal(false);
      setDeletePassword('');
      setShowDeleteSuccessPopup(true);
    } catch (err) {
      console.log('DELETE ACCOUNT ERROR:', err);
      setDeletingAccount(false);
      Alert.alert('Error', 'Something went wrong while deleting account.');
    }
  };

  const resetSettings = () => {
    if (!isDarkMode) {
      toggleTheme();
    }

    Alert.alert('Reset Complete', 'Your app settings were reset.');
  };

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Profile</Text>

      <View style={{ marginBottom: 18 }}>
        <Text style={styles.expenseDate}>Logged in as</Text>
        <Text style={styles.expenseDescription}>{username}</Text>
      </View>

      <TouchableOpacity style={styles.filterTab} onPress={changePassword}>
        <Text style={styles.filterTabText}>
          <Ionicons name="key-outline" size={16} /> Change Password
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.filterTab} onPress={deleteAccount}>
        <Text style={styles.filterTabText}>
          <Ionicons name="trash-outline" size={16} /> Delete Account
        </Text>
      </TouchableOpacity>

      <Text style={[styles.pickerLabel, { marginTop: 20 }]}>Theme</Text>

      <View
        style={[
          styles.filterTab,
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        ]}
      >
        <Text style={styles.filterTabText}>
          <Ionicons
            name={isDarkMode ? 'moon-outline' : 'sunny-outline'}
            size={16}
          />{' '}
          {isDarkMode ? 'Dark Mode' : 'Light Mode'}
        </Text>

        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>

      <Text style={[styles.pickerLabel, { marginTop: 20 }]}>Settings</Text>

      <TouchableOpacity style={styles.filterTab} onPress={resetSettings}>
        <Text style={styles.filterTabText}>
          <Ionicons name="refresh-outline" size={16} /> Reset App Settings
        </Text>
      </TouchableOpacity>

      {/* CHANGE PASSWORD MODAL */}
      <Modal visible={showPasswordModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Change Password</Text>

            <TextInput
              placeholder="Current Password"
              placeholderTextColor="#6B7FA3"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
              style={styles.input}
            />

            <TextInput
              placeholder="New Password"
              placeholderTextColor="#6B7FA3"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
              style={styles.input}
            />

            <TextInput
              placeholder="Confirm New Password"
              placeholderTextColor="#6B7FA3"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancel}
                onPress={() => {
                  setShowPasswordModal(false);
                  setCurrentPassword('');
                  setNewPassword('');
                  setConfirmPassword('');
                }}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalSave}
                onPress={handlePasswordChange}
                disabled={changingPassword}
              >
                <Text style={styles.modalSaveText}>
                  {changingPassword ? 'Saving...' : 'Update'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* DELETE ACCOUNT MODAL */}
      <Modal visible={showDeleteModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Delete Account</Text>

            <Text style={[styles.expenseDate, { marginBottom: 12 }]}>
              Enter your password to continue deleting your account.
            </Text>

            <TextInput
              placeholder="Password"
              placeholderTextColor="#6B7FA3"
              secureTextEntry
              value={deletePassword}
              onChangeText={setDeletePassword}
              style={styles.input}
            />

            <Text style={[styles.expenseDate, { marginBottom: 12 }]}>
              This action is permanent and cannot be undone.
            </Text>

            <View style={styles.modalButtons}>
              <Pressable
                style={styles.modalCancel}
                onPress={() => {
                  setShowDeleteModal(false);
                  setDeletePassword('');
                }}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </Pressable>

              <Pressable
                style={styles.modalSave}
                onPress={handleDeleteAccount}
                disabled={deletingAccount}
              >
                <Text style={styles.modalSaveText}>
                  {deletingAccount ? 'Deleting...' : 'Delete'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* WRONG PASSWORD POPUP */}
      <Modal visible={showWrongPasswordPopup} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>⚠ Incorrect Password</Text>

            <Text style={styles.expenseDate}>
              The current password you entered is incorrect. Please try again.
            </Text>

            <TouchableOpacity
              style={[styles.modalSave, { marginTop: 20, alignItems: 'center' }]}
              onPress={() => setShowWrongPasswordPopup(false)}
            >
              <Text style={styles.modalSaveText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* PASSWORD SUCCESS POPUP */}
      <Modal visible={showSuccessPopup} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>✅ Password Changed</Text>

            <Text style={styles.expenseDate}>
              Your password has been updated successfully.
            </Text>

            <TouchableOpacity
              style={[styles.modalSave, { marginTop: 20, alignItems: 'center' }]}
              onPress={() => setShowSuccessPopup(false)}
            >
              <Text style={styles.modalSaveText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* DELETE SUCCESS POPUP */}
      <Modal visible={showDeleteSuccessPopup} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>✅ Account Deleted</Text>

            <Text style={styles.expenseDate}>
              Your account has been successfully deleted.
            </Text>

            <TouchableOpacity
              style={[styles.modalSave, { marginTop: 20, alignItems: 'center' }]}
              onPress={async () => {
                setShowDeleteSuccessPopup(false);
                await supabase.auth.signOut();
                onAccountDeleted();
              }}
            >
              <Text style={styles.modalSaveText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}