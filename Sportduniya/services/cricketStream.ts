import { CricketEvent } from '@/types/cricket';

const mockEvents: Omit<CricketEvent, 'id' | 'timestamp'>[] = [
  {
    type: 'BALL',
    payload: {
      runs: 1,
      commentary: "Pushed to mid-on for a quick single.",
      ballNumber: 1,
      over: 1
    }
  },
  {
    type: 'BALL',
    payload: {
      runs: 0,
      commentary: "Dot ball, well bowled by the spinner.",
      ballNumber: 2,
      over: 1
    }
  },
  {
    type: 'BOUNDARY',
    payload: {
      runs: 4,
      commentary: "Classic cover drive, races to the boundary!",
      ballNumber: 3,
      over: 1
    }
  },
  {
    type: 'BALL',
    payload: {
      runs: 2,
      commentary: "Worked away to deep square leg for a couple.",
      ballNumber: 4,
      over: 1
    }
  },
  {
    type: 'SIX',
    payload: {
      runs: 6,
      commentary: "MASSIVE! That's gone into the stands!",
      ballNumber: 5,
      over: 1
    }
  },
  {
    type: 'WICKET',
    payload: {
      playerOut: "R. Sharma",
      dismissal: "LBW",
      commentary: "Big appeal... and he's out! Plumb in front!",
      ballNumber: 6,
      over: 1
    }
  },
  {
    type: 'OVER_COMPLETE',
    payload: {
      over: 1,
      runs: 13,
      commentary: "End of over 1. 13 runs and 1 wicket from it."
    }
  },
  {
    type: 'BALL',
    payload: {
      runs: 1,
      commentary: "New batsman gets off the mark with a single.",
      ballNumber: 1,
      over: 2
    }
  },
  {
    type: 'BOUNDARY',
    payload: {
      runs: 4,
      commentary: "Edged but safe! Runs away to third man boundary.",
      ballNumber: 2,
      over: 2
    }
  },
  {
    type: 'BALL',
    payload: {
      runs: 0,
      commentary: "Beaten! Excellent delivery from the fast bowler.",
      ballNumber: 3,
      over: 2
    }
  },
  {
    type: 'SIX',
    payload: {
      runs: 6,
      commentary: "BOOM! Straight down the ground for six!",
      ballNumber: 4,
      over: 2
    }
  },
  {
    type: 'BALL',
    payload: {
      runs: 1,
      commentary: "Nudged to point for a quick single.",
      ballNumber: 5,
      over: 2
    }
  },
  {
    type: 'BALL',
    payload: {
      runs: 2,
      commentary: "Flicked off the pads to fine leg for two.",
      ballNumber: 6,
      over: 2
    }
  },
  {
    type: 'MATCH_STATUS',
    payload: {
      status: "Drinks Break",
      summary: "Team A: 27/1 after 2 overs. Good start despite losing Sharma early."
    }
  }
];

export class CricketStreamService {
  private eventIndex = 0;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private listeners: ((event: CricketEvent) => void)[] = [];

  subscribe(callback: (event: CricketEvent) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  start() {
    if (this.intervalId) return;

    this.intervalId = setInterval(() => {
      if (this.eventIndex >= mockEvents.length) {
        this.eventIndex = 0; // Loop back to start
      }

      const mockEvent = mockEvents[this.eventIndex];
      const event: CricketEvent = {
        ...mockEvent,
        id: `event_${Date.now()}_${this.eventIndex}`,
        timestamp: Date.now()
      } as CricketEvent;

      this.listeners.forEach(listener => listener(event));
      this.eventIndex++;
    }, 3000); // New event every 3 seconds
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  reset() {
    this.eventIndex = 0;
  }
}

export const cricketStream = new CricketStreamService();