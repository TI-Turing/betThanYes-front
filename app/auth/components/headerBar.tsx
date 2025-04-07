// app/auth/register/ProgressHeader.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
  step: number;
  totalSteps: number;
}

export default function ProgressHeader({ step, totalSteps }: Props) {
  const progress = (step / totalSteps) * 100;

  return (
    <View style={styles.container}>
      <View style={[styles.progressBar, { width: `${progress}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 6,
    backgroundColor: '#eee',
    width: '100%',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
});
