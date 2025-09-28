import { useState, useEffect, useCallback } from 'react';
import { CricketEvent, MatchState, UnknownEvent } from '@/types/cricket';
import { cricketStream } from '@/services/cricketStream';

const initialMatchState: MatchState = {
  totalRuns: 0,
  wickets: 0,
  overs: 0,
  balls: 0,
  currentBatsman: 'V. Kohli',
  nonStriker: 'R. Sharma',
  status: 'Live',
};

const batsmen = ['V. Kohli', 'R. Sharma', 'S. Dhawan', 'K. Rahul', 'H. Pandya', 'R. Pant'];

export function useCricketMatch() {
  const [events, setEvents] = useState<(CricketEvent | UnknownEvent)[]>([]);
  const [matchState, setMatchState] = useState<MatchState>(initialMatchState);
  const [isLive, setIsLive] = useState<boolean>(false);

  const updateMatchState = useCallback((event: CricketEvent | UnknownEvent) => {
    setMatchState(prevState => {
      const newState = { ...prevState };

      switch (event.type) {
        case 'BALL':
        case 'BOUNDARY':
        case 'SIX':
          if ('payload' in event && typeof event.payload === 'object' && event.payload !== null) {
            const payload = event.payload as any;
            if (typeof payload.runs === 'number') {
              newState.totalRuns += payload.runs;
            }
            
            // Update overs and balls
            if (typeof payload.ballNumber === 'number' && typeof payload.over === 'number') {
              newState.overs = payload.over - 1;
              newState.balls = payload.ballNumber;
              
              if (payload.ballNumber === 6) {
                newState.overs = payload.over;
                newState.balls = 0;
              }
            }
          }
          break;

        case 'WICKET':
          newState.wickets += 1;
          // Change batsman when wicket falls
          const availableBatsmen = batsmen.filter(
            b => b !== newState.currentBatsman && b !== newState.nonStriker
          );
          if (availableBatsmen.length > 0) {
            newState.currentBatsman = availableBatsmen[Math.floor(Math.random() * availableBatsmen.length)];
          }
          
          if ('payload' in event && typeof event.payload === 'object' && event.payload !== null) {
            const payload = event.payload as any;
            if (typeof payload.ballNumber === 'number' && typeof payload.over === 'number') {
              newState.overs = payload.over - 1;
              newState.balls = payload.ballNumber;
              
              if (payload.ballNumber === 6) {
                newState.overs = payload.over;
                newState.balls = 0;
              }
            }
          }
          break;

        case 'MATCH_STATUS':
          if ('payload' in event && typeof event.payload === 'object' && event.payload !== null) {
            const payload = event.payload as any;
            if (typeof payload.status === 'string') {
              newState.status = payload.status;
            }
          }
          break;

        case 'OVER_COMPLETE':
          if ('payload' in event && typeof event.payload === 'object' && event.payload !== null) {
            const payload = event.payload as any;
            if (typeof payload.over === 'number') {
              newState.overs = payload.over;
              newState.balls = 0;
            }
          }
          break;

        default:
          // Handle unknown events gracefully - don't update match state
          console.warn('Unknown event type received:', event.type);
          break;
      }

      return newState;
    });
  }, []);

  const handleNewEvent = useCallback((event: CricketEvent) => {
    console.log('New cricket event:', event);
    
    setEvents(prevEvents => [event, ...prevEvents]);
    updateMatchState(event);
  }, [updateMatchState]);

  const startMatch = useCallback(() => {
    setIsLive(true);
    cricketStream.start();
  }, []);

  const stopMatch = useCallback(() => {
    setIsLive(false);
    cricketStream.stop();
  }, []);

  const resetMatch = useCallback(() => {
    setIsLive(false);
    cricketStream.stop();
    cricketStream.reset();
    setEvents([]);
    setMatchState(initialMatchState);
  }, []);

  useEffect(() => {
    const unsubscribe = cricketStream.subscribe(handleNewEvent);

    return () => {
      unsubscribe();
      cricketStream.stop();
    };
  }, [handleNewEvent]);

  return {
    events,
    matchState,
    isLive,
    startMatch,
    stopMatch,
    resetMatch,
  };
}