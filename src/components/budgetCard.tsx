import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { Expense } from '../types/expense';
import { styles } from './appstyle';

type BudgetCardProps = {
  expenses: Expense[];
};

export default function BudgetCard({ expenses }: BudgetCardProps) {
  const [budgetLimit, setBudgetLimit] = useState(5000);
  const [budgetInput, setBudgetInput] = useState('5000');
  const [showBudgetModal, setShowBudgetModal] = useState(false);

  const totalSpent = useMemo(() => {
    return expenses.reduce((t, e) => t + e.amount, 0);
  }, [expenses]);

  const budgetUsedPercent = Math.min((totalSpent / budgetLimit) * 100, 100);
  const budgetRemaining = Math.max(budgetLimit - totalSpent, 0);
  const isOverBudget = totalSpent > budgetLimit;

  return (
    <>
      <View style={[styles.budgetCard, isOverBudget && styles.budgetCardDanger]}>
        <View style={styles.budgetRow}>
          <View>
            <Text style={styles.budgetLabel}>Monthly Budget</Text>
            <Text style={styles.budgetAmount}>₱{budgetLimit.toLocaleString()}</Text>
          </View>

          <TouchableOpacity
            style={styles.editBudgetBtn}
            onPress={() => setShowBudgetModal(true)}
          >
            <Text style={styles.editBudgetText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${budgetUsedPercent}%` as any },
              isOverBudget && styles.progressDanger,
            ]}
          />
        </View>

        <View style={styles.budgetStats}>
          <View>
            <Text style={styles.statLabel}>Spent</Text>
            <Text style={[styles.statValue, isOverBudget && styles.dangerText]}>
              ₱{totalSpent.toFixed(2)}
            </Text>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.statLabel}>Remaining</Text>
            <Text style={[styles.statValue, isOverBudget && styles.dangerText]}>
              {isOverBudget
                ? `Over by ₱${(totalSpent - budgetLimit).toFixed(2)}`
                : `₱${budgetRemaining.toFixed(2)}`}
            </Text>
          </View>
        </View>
      </View>

      <Modal visible={showBudgetModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Set Budget Limit</Text>

            <TextInput
              value={budgetInput}
              onChangeText={(text) => setBudgetInput(text.replace(/[^0-9]/g, ''))}
              keyboardType="numeric"
              style={styles.modalInput}
              placeholder="e.g. 5000"
              placeholderTextColor="#6B7FA3"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancel}
                onPress={() => setShowBudgetModal(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalSave}
                onPress={() => {
                  const val = Number(budgetInput);

                  if (!budgetInput.trim() || isNaN(val) || val <= 0) {
                    Alert.alert('Invalid Budget', 'Please enter a valid budget.');
                    return;
                  }

                  setBudgetLimit(val);
                  setShowBudgetModal(false);
                }}
              >
                <Text style={styles.modalSaveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}