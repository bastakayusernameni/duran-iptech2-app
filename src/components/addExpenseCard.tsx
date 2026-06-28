import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {
  Category,
  CATEGORIES,
  CATEGORY_ICONS,
} from '../types/expense';

import { useTheme } from '../context/themeContext';

type AddExpenseCardProps = {
  description: string;
  setDescription: (value: string) => void;
  amount: string;
  setAmount: (value: string) => void;
  selectedCategory: Category;
  setSelectedCategory: (value: Category) => void;
  addExpense: () => void;
  isAdding: boolean;
  addError: string;
  setAddError: (value: string) => void;
  addSuccess: boolean;
};

export default function AddExpenseCard({
  description,
  setDescription,
  amount,
  setAmount,
  selectedCategory,
  setSelectedCategory,
  addExpense,
  isAdding,
  addError,
  setAddError,
  addSuccess,
}: AddExpenseCardProps) {
  const { styles } = useTheme();

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Add Expense</Text>

      <TextInput
        placeholder="Description"
        placeholderTextColor="#6B7FA3"
        value={description}
        onChangeText={(text) => {
          setDescription(text);
          setAddError('');
        }}
        style={styles.input}
      />

      <TextInput
        placeholder="Amount (₱)"
        placeholderTextColor="#6B7FA3"
        keyboardType="decimal-pad"
        value={amount}
        onChangeText={(text) => {
          const cleaned = text.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
          setAmount(cleaned);
          setAddError('');
        }}
        style={styles.input}
      />

      <Text style={styles.pickerLabel}>Category</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 14 }}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryPill,
              selectedCategory === category && styles.categoryPillActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryPillText,
                selectedCategory === category && styles.categoryPillTextActive,
              ]}
            >
              {CATEGORY_ICONS[category]} {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {addError ? (
        <View style={styles.formErrorBox}>
          <Text style={styles.formErrorText}>⚠ {addError}</Text>
        </View>
      ) : null}

      {addSuccess ? (
        <View style={styles.formSuccessBox}>
          <Text style={styles.formSuccessText}>✓ Expense added successfully!</Text>
        </View>
      ) : null}

      <TouchableOpacity
        style={[styles.addButton, isAdding && styles.addButtonDisabled]}
        onPress={addExpense}
        disabled={isAdding}
      >
        <Text style={styles.addButtonText}>
          {isAdding ? 'Saving...' : '+ Add Expense'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}