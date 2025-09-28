import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MatchState } from '@/types/cricket';

interface ScoreBoardProps {
  matchState: MatchState;
}

export function ScoreBoard({ matchState }: ScoreBoardProps) {
  const formatOvers = () => {
    if (matchState.balls === 0) {
      return `${matchState.overs}`;
    }
    return `${matchState.overs}.${matchState.balls}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.scoreSection}>
        <Text style={styles.runs}>{matchState.totalRuns}</Text>
        <Text style={styles.separator}>/</Text>
        <Text style={styles.wickets}>{matchState.wickets}</Text>
      </View>
      
      <View style={styles.oversSection}>
        <Text style={styles.oversLabel}>Overs</Text>
        <Text style={styles.overs}>{formatOvers()}</Text>
      </View>

      <View style={styles.batsmenSection}>
        <View style={styles.batsmanRow}>
          <Text style={styles.batsmanLabel}>Batsman:</Text>
          <Text style={styles.batsmanName}>{matchState.currentBatsman}</Text>
        </View>
        <View style={styles.batsmanRow}>
          <Text style={styles.batsmanLabel}>Non-striker:</Text>
          <Text style={styles.batsmanName}>{matchState.nonStriker}</Text>
        </View>
      </View>

      {matchState.status && (
        <View style={styles.statusSection}>
          <Text style={styles.status}>{matchState.status}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a2e',
    padding: 20,
    margin: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  scoreSection: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 16,
  },
  runs: {
    fontSize: 48,
    fontWeight: '800',
    color: '#ffffff',
  },
  separator: {
    fontSize: 32,
    fontWeight: '600',
    color: '#ffffff',
    marginHorizontal: 8,
  },
  wickets: {
    fontSize: 32,
    fontWeight: '600',
    color: '#ff6b6b',
  },
  oversSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  oversLabel: {
    fontSize: 12,
    color: '#a0a0a0',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  overs: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4ecdc4',
    marginTop: 4,
  },
  batsmenSection: {
    marginBottom: 16,
  },
  batsmanRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  batsmanLabel: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  batsmanName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  statusSection: {
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4ecdc4',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});