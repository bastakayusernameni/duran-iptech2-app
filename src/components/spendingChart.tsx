import React, { useMemo, useState } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Expense } from '../types/expense';
import { styles } from './appstyle';

type SpendingChartProps = {
  expenses: Expense[];
};

const screenWidth = Dimensions.get('window').width;

export default function SpendingChart({ expenses }: SpendingChartProps) {
  const [chartMode, setChartMode] = useState<'weekly' | 'monthly'>('weekly');

  const weeklyData = useMemo(() => {
    const totals = [0, 0, 0, 0, 0, 0, 0];

    expenses.forEach((e) => {
      totals[e.date.getDay()] += e.amount;
    });

    return {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [{ data: totals }],
    };
  }, [expenses]);

  const monthlyData = useMemo(() => {
    const weeks = [0, 0, 0, 0];

    expenses.forEach((e) => {
      const week = Math.min(Math.floor((e.date.getDate() - 1) / 7), 3);
      weeks[week] += e.amount;
    });

    return {
      labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'],
      datasets: [{ data: weeks }],
    };
  }, [expenses]);

  const chartData = chartMode === 'weekly' ? weeklyData : monthlyData;

  return (
    <View style={styles.card}>
      <View style={styles.chartHeader}>
        <Text style={styles.sectionTitle}>Spending Trend</Text>

        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleBtn, chartMode === 'weekly' && styles.toggleBtnActive]}
            onPress={() => setChartMode('weekly')}
          >
            <Text
              style={[
                styles.toggleText,
                chartMode === 'weekly' && styles.toggleTextActive,
              ]}
            >
              Week
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleBtn, chartMode === 'monthly' && styles.toggleBtnActive]}
            onPress={() => setChartMode('monthly')}
          >
            <Text
              style={[
                styles.toggleText,
                chartMode === 'monthly' && styles.toggleTextActive,
              ]}
            >
              Month
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView horizontal>
        <LineChart
          data={chartData}
          width={screenWidth + 60}
          height={200}
          yAxisLabel="₱"
          chartConfig={{
            backgroundGradientFrom: '#0F1A2E',
            backgroundGradientTo: '#0F1A2E',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(200, 165, 90, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(160, 185, 220, ${opacity})`,
            propsForDots: {
              r: '5',
              strokeWidth: '2',
              stroke: '#C8A55A',
            },
            propsForBackgroundLines: {
              strokeDasharray: '',
              stroke: 'rgba(255,255,255,0.05)',
            },
          }}
          bezier
          style={{ borderRadius: 16 }}
        />
      </ScrollView>
    </View>
  );
}