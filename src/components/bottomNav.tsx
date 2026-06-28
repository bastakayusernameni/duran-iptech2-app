import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../context/themeContext';

type Tab = 'home' | 'add' | 'transactions' | 'profile';

type BottomNavProps = {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
};

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const { isDarkMode } = useTheme();

  const colors = isDarkMode
    ? {
        nav: '#0F1A2E',
        border: '#1A2A45',
        active: '#C8A55A',
        inactive: '#A0B9DC',
        bg: '#070E1C',
      }
    : {
        nav: '#FFFFFF',
        border: '#D0D5DD',
        active: '#B78B2E',
        inactive: '#667085',
        bg: '#FFFFFF',
      };

  return (
    <View
      style={[
        localStyles.nav,
        {
          backgroundColor: colors.nav,
          borderColor: colors.border,
        },
      ]}
    >
      <TouchableOpacity onPress={() => setActiveTab('home')} style={localStyles.btn}>
        <Ionicons
          name="home-outline"
          size={31}
          color={activeTab === 'home' ? colors.active : colors.inactive}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setActiveTab('add')} style={localStyles.addBtn}>
        <Ionicons name="add-outline" size={38} color="#070E1C" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setActiveTab('transactions')}
        style={localStyles.btn}
      >
        <Ionicons
          name="receipt-outline"
          size={31}
          color={activeTab === 'transactions' ? colors.active : colors.inactive}
        />
      </TouchableOpacity>
    </View>
  );
}

const localStyles = StyleSheet.create({
  nav: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 18,
    height: 70,
    borderRadius: 28,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 10,
  },

  btn: {
    padding: 12,
  },

  addBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#C8A55A',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -28,
  },
});