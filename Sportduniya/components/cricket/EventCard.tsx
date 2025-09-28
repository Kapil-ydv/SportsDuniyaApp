import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CricketEvent, UnknownEvent } from '@/types/cricket';

interface EventCardProps {
  event: CricketEvent | UnknownEvent;
}

export function EventCard({ event }: EventCardProps) {
  const renderEventContent = () => {
    switch (event.type) {
      case 'BALL':
        return (
          <View style={[styles.card, styles.ballCard]}>
            <View style={styles.header}>
              <Text style={styles.eventType}>BALL</Text>
              <Text style={styles.runs}>{event.payload.runs} run{event.payload.runs !== 1 ? 's' : ''}</Text>
            </View>
            <Text style={styles.commentary}>{event.payload.commentary}</Text>
            <Text style={styles.overInfo}>Over {event.payload.over}.{event.payload.ballNumber}</Text>
          </View>
        );

      case 'BOUNDARY':
        return (
          <View style={[styles.card, styles.boundaryCard]}>
            <View style={styles.header}>
              <Text style={styles.eventTypeBoundary}>FOUR!</Text>
              <Text style={styles.runsBoundary}>4 runs</Text>
            </View>
            <Text style={styles.commentaryBoundary}>{event.payload.commentary}</Text>
            <Text style={styles.overInfo}>Over {event.payload.over}.{event.payload.ballNumber}</Text>
          </View>
        );

      case 'SIX':
        return (
          <View style={[styles.card, styles.sixCard]}>
            <View style={styles.header}>
              <Text style={styles.eventTypeSix}>SIX!</Text>
              <Text style={styles.runsSix}>6 runs</Text>
            </View>
            <Text style={styles.commentarySix}>{event.payload.commentary}</Text>
            <Text style={styles.overInfo}>Over {event.payload.over}.{event.payload.ballNumber}</Text>
          </View>
        );

      case 'WICKET':
        return (
          <View style={[styles.card, styles.wicketCard]}>
            <View style={styles.header}>
              <Text style={styles.eventTypeWicket}>WICKET!</Text>
              <Text style={styles.dismissal}>{event.payload.dismissal}</Text>
            </View>
            <Text style={styles.playerOut}>{event.payload.playerOut} is out</Text>
            <Text style={styles.commentaryWicket}>{event.payload.commentary}</Text>
            <Text style={styles.overInfo}>Over {event.payload.over}.{event.payload.ballNumber}</Text>
          </View>
        );

      case 'MATCH_STATUS':
        return (
          <View style={[styles.card, styles.statusCard]}>
            <Text style={styles.eventTypeStatus}>{event.payload.status}</Text>
            <Text style={styles.statusSummary}>{event.payload.summary}</Text>
          </View>
        );

      case 'OVER_COMPLETE':
        return (
          <View style={[styles.card, styles.overCard]}>
            <View style={styles.header}>
              <Text style={styles.eventTypeOver}>OVER COMPLETE</Text>
              <Text style={styles.overRuns}>{event.payload.runs} runs</Text>
            </View>
            <Text style={styles.commentary}>{event.payload.commentary}</Text>
          </View>
        );

      default:
        // Handle unknown event types gracefully
        return (
          <View style={[styles.card, styles.unknownCard]}>
            <View style={styles.header}>
              <Text style={styles.eventTypeUnknown}>UNKNOWN EVENT</Text>
              <Text style={styles.unknownType}>{event.type}</Text>
            </View>
            <Text style={styles.unknownPayload}>
              {JSON.stringify(event.payload, null, 2)}
            </Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {renderEventContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 6,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ballCard: {
    backgroundColor: '#f8f9fa',
    borderLeftWidth: 4,
    borderLeftColor: '#6c757d',
  },
  boundaryCard: {
    backgroundColor: '#e8f5e8',
    borderLeftWidth: 4,
    borderLeftColor: '#28a745',
  },
  sixCard: {
    backgroundColor: '#fff3cd',
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  wicketCard: {
    backgroundColor: '#f8d7da',
    borderLeftWidth: 4,
    borderLeftColor: '#dc3545',
  },
  statusCard: {
    backgroundColor: '#d1ecf1',
    borderLeftWidth: 4,
    borderLeftColor: '#17a2b8',
  },
  overCard: {
    backgroundColor: '#e2e3e5',
    borderLeftWidth: 4,
    borderLeftColor: '#6c757d',
  },
  unknownCard: {
    backgroundColor: '#f5f5f5',
    borderLeftWidth: 4,
    borderLeftColor: '#adb5bd',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventType: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6c757d',
    textTransform: 'uppercase',
  },
  eventTypeBoundary: {
    fontSize: 14,
    fontWeight: '700',
    color: '#28a745',
    textTransform: 'uppercase',
  },
  eventTypeSix: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffc107',
    textTransform: 'uppercase',
  },
  eventTypeWicket: {
    fontSize: 14,
    fontWeight: '700',
    color: '#dc3545',
    textTransform: 'uppercase',
  },
  eventTypeStatus: {
    fontSize: 16,
    fontWeight: '600',
    color: '#17a2b8',
    textAlign: 'center',
    marginBottom: 8,
  },
  eventTypeOver: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6c757d',
    textTransform: 'uppercase',
  },
  eventTypeUnknown: {
    fontSize: 12,
    fontWeight: '600',
    color: '#adb5bd',
    textTransform: 'uppercase',
  },
  runs: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
  },
  runsBoundary: {
    fontSize: 16,
    fontWeight: '700',
    color: '#28a745',
  },
  runsSix: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffc107',
  },
  overRuns: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
  },
  dismissal: {
    fontSize: 12,
    fontWeight: '600',
    color: '#dc3545',
    textTransform: 'uppercase',
  },
  unknownType: {
    fontSize: 12,
    fontWeight: '600',
    color: '#adb5bd',
  },
  commentary: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
  },
  commentaryBoundary: {
    fontSize: 14,
    color: '#155724',
    lineHeight: 20,
    fontWeight: '500',
  },
  commentarySix: {
    fontSize: 15,
    color: '#856404',
    lineHeight: 22,
    fontWeight: '600',
  },
  commentaryWicket: {
    fontSize: 14,
    color: '#721c24',
    lineHeight: 20,
    fontWeight: '500',
  },
  playerOut: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc3545',
    marginBottom: 4,
  },
  statusSummary: {
    fontSize: 14,
    color: '#0c5460',
    textAlign: 'center',
    lineHeight: 20,
  },
  overInfo: {
    fontSize: 11,
    color: '#6c757d',
    marginTop: 8,
    fontStyle: 'italic',
  },
  unknownPayload: {
    fontSize: 12,
    color: '#6c757d',
    fontFamily: 'monospace',
    marginTop: 4,
  },
});