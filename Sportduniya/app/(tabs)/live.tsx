import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Play, Pause, RotateCcw } from 'lucide-react-native';
import { ScoreBoard } from '@/components/cricket/ScoreBoard';
import { EventCard } from '@/components/cricket/EventCard';
import { useCricketMatch } from '@/hooks/useCricketMatch';
import { CricketEvent, UnknownEvent } from '@/types/cricket';

export default function LiveCommentaryScreen() {
  const insets = useSafeAreaInsets();
  const { events, matchState, isLive, startMatch, stopMatch, resetMatch } = useCricketMatch();

  const renderEvent = ({ item }: { item: CricketEvent | UnknownEvent }) => (
    <EventCard event={item} />
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <ScoreBoard matchState={matchState} />
      
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[styles.controlButton, isLive ? styles.stopButton : styles.startButton]}
          onPress={isLive ? stopMatch : startMatch}
        >
          {isLive ? (
            <Pause size={20} color="#ffffff" />
          ) : (
            <Play size={20} color="#ffffff" />
          )}
          <Text style={styles.controlButtonText}>
            {isLive ? 'Pause' : 'Start'} Match
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, styles.resetButton]}
          onPress={resetMatch}
        >
          <RotateCcw size={20} color="#ffffff" />
          <Text style={styles.controlButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.feedHeader}>
        <Text style={styles.feedTitle}>Live Commentary</Text>
        {isLive && <View style={styles.liveIndicator} />}
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateText}>
        {isLive ? 'Waiting for match events...' : 'Press "Start Match" to begin live commentary'}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f23" />
      
      <FlatList
        data={events}
        renderItem={renderEvent}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={events.length === 0 ? styles.emptyContainer : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  headerContainer: {
    paddingBottom: 16,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
  },
  startButton: {
    backgroundColor: '#28a745',
  },
  stopButton: {
    backgroundColor: '#dc3545',
  },
  resetButton: {
    backgroundColor: '#6c757d',
  },
  controlButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  feedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
    gap: 12,
  },
  feedTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
  },
  liveIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ff4757',
    shadowColor: '#ff4757',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
  emptyContainer: {
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#a0a0a0',
    textAlign: 'center',
    lineHeight: 24,
  },
});