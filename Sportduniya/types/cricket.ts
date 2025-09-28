export type EventType = 'BALL' | 'BOUNDARY' | 'WICKET' | 'MATCH_STATUS' | 'OVER_COMPLETE' | 'SIX';

export interface BaseEvent {
  id: string;
  type: EventType;
  timestamp: number;
}

export interface BallEvent extends BaseEvent {
  type: 'BALL';
  payload: {
    runs: number;
    commentary: string;
    ballNumber: number;
    over: number;
  };
}

export interface BoundaryEvent extends BaseEvent {
  type: 'BOUNDARY';
  payload: {
    runs: 4;
    commentary: string;
    ballNumber: number;
    over: number;
  };
}

export interface SixEvent extends BaseEvent {
  type: 'SIX';
  payload: {
    runs: 6;
    commentary: string;
    ballNumber: number;
    over: number;
  };
}

export interface WicketEvent extends BaseEvent {
  type: 'WICKET';
  payload: {
    playerOut: string;
    dismissal: string;
    commentary: string;
    ballNumber: number;
    over: number;
  };
}

export interface MatchStatusEvent extends BaseEvent {
  type: 'MATCH_STATUS';
  payload: {
    status: string;
    summary: string;
  };
}

export interface OverCompleteEvent extends BaseEvent {
  type: 'OVER_COMPLETE';
  payload: {
    over: number;
    runs: number;
    commentary: string;
  };
}

export type CricketEvent = BallEvent | BoundaryEvent | SixEvent | WicketEvent | MatchStatusEvent | OverCompleteEvent;

export interface UnknownEvent extends BaseEvent {
  type: any;
  payload: any;
}

export interface MatchState {
  totalRuns: number;
  wickets: number;
  overs: number;
  balls: number;
  currentBatsman: string;
  nonStriker: string;
  status: string;
}