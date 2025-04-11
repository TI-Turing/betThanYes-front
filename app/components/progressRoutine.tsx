import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';

type ProgressRoutineProps = {
  progress: number; // Progreso en formato decimal (0 a 1)
  size?: number; // Tamaño opcional de la barra (diámetro)
};

const ProgressRoutine: React.FC<ProgressRoutineProps> = ({
  progress,
  size = 100,
}) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <ProgressChart
        data={{ data: [progress] }}
        width={size}
        height={size}
        strokeWidth={8}
        radius={size / 2 - 8}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: () => `#4CAF50`,
          backgroundColor: '#E0E0E0',
        }}
        hideLegend={true}
      />
      <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  progressText: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});

export default ProgressRoutine;