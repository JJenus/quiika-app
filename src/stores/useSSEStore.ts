import { create } from 'zustand';
import { sseAPI } from '../lib/api';
import type { SSEMessage } from '../types/api';

interface SSEStore {
  isConnected: boolean;
  messages: SSEMessage[];
  eventSource: EventSource | null;
  
  // Actions
  connect: (sessionId: string) => void;
  disconnect: () => void;
  addMessage: (message: SSEMessage) => void;
  clearMessages: () => void;
}

export const useSSEStore = create<SSEStore>((set, get) => ({
  isConnected: false,
  messages: [],
  eventSource: null,

  connect: (sessionId) => {
    // Disconnect existing connection if any
    const { eventSource } = get();
    if (eventSource) {
      eventSource.close();
    }

    try {
      const newEventSource = sseAPI.connect(sessionId);
      
      newEventSource.onopen = () => {
        set({ isConnected: true, eventSource: newEventSource });
        console.log('SSE connection opened');
      };

      newEventSource.onmessage = (event) => {
        try {
          const message: SSEMessage = {
            type: 'message',
            data: JSON.parse(event.data),
            timestamp: new Date().toISOString(),
          };
          get().addMessage(message);
        } catch (error) {
          console.error('Error parsing SSE message:', error);
        }
      };

      newEventSource.onerror = (error) => {
        console.error('SSE error:', error);
        set({ isConnected: false });
      };

      newEventSource.onclose = () => {
        set({ isConnected: false });
        console.log('SSE connection closed');
      };

    } catch (error) {
      console.error('Failed to connect to SSE:', error);
      set({ isConnected: false });
    }
  },

  disconnect: () => {
    const { eventSource } = get();
    if (eventSource) {
      eventSource.close();
      set({ eventSource: null, isConnected: false });
    }
  },

  addMessage: (message) => {
    set((state) => ({ messages: [...state.messages, message] }));
  },

  clearMessages: () => set({ messages: [] }),
}));