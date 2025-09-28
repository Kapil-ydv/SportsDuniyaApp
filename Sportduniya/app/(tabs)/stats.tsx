import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCricketMatch } from '@/hooks/useCricketMatch';

export default function StatsScreen() {
  const insets = useSafeAreaInsets();
  const { matchState, events } = useCricketMatch();

  const boundaries = events.filter(e => e.type === 'BOUNDARY' || e.type === 'SIX').length;
  const wickets = events.filter(e => e.type === 'WICKET').length;
  const totalBalls = events.filter(e => e.type === 'BALL' || e.type === 'BOUNDARY' || e.type === 'SIX' || e.type === 'WICKET').length;

  const runRate = totalBalls > 0 ? (matchState.totalRuns / (totalBalls / 6)).toFixed(2) : '0.00';

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Match Statistics</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{matchState.totalRuns}</Text>
            <Text style={styles.statLabel}>Total Runs</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{matchState.wickets}</Text>
            <Text style={styles.statLabel}>Wickets</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{matchState.overs}.{matchState.balls}</Text>
            <Text style={styles.statLabel}>Overs</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{runRate}</Text>
            <Text style={styles.statLabel}>Run Rate</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{boundaries}</Text>
            <Text style={styles.statLabel}>Boundaries</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{totalBalls}</Text>
            <Text style={styles.statLabel}>Balls Faced</Text>
          </View>
        </View>

        <View style={styles.batsmenSection}>
          <Text style={styles.sectionTitle}>Current Batsmen</Text>
          <View style={styles.batsmanCard}>
            <Text style={styles.batsmanName}>{matchState.currentBatsman}</Text>
            <Text style={styles.batsmanLabel}>On Strike</Text>
          </View>
          <View style={styles.batsmanCard}>
            <Text style={styles.batsmanName}>{matchState.nonStriker}</Text>
            <Text style={styles.batsmanLabel}>Non-Striker</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: '47%',
    borderWidth: 1,
    borderColor: '#333',
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#4ecdc4',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#a0a0a0',
    textAlign: 'center',
  },
  batsmenSection: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  batsmanCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  batsmanName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  batsmanLabel: {
    fontSize: 14,
    color: '#4ecdc4',
  },
});