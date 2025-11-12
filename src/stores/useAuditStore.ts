import { create } from "zustand";
import { admin, AuditLogDto, createPageable } from "../lib/api";


interface AuditState {
  logs: AuditLogDto[];
  loading: boolean;
  error: string | null;
  filters: {
    actionType?: string;
    startDate?: string;
    endDate?: string;
    targetEntityId?: string;
  };
  pagination: {
    page: number;
    size: number;
    total: number;
  };
}

interface AuditActions {
  fetchLogs: (page?: number) => Promise<void>;
  setFilters: (filters: Partial<AuditState['filters']>) => void;
  clearFilters: () => void;
  downloadLogs: () => Promise<void>;
}

export const useAuditStore = create<AuditState & AuditActions>((set, get) => ({
  logs: [],
  loading: false,
  error: null,
  filters: {},
  pagination: {
    page: 0,
    size: 20,
    total: 0,
  },

  fetchLogs: async (page = 0) => {
    set({ loading: true, error: null });
    
    try {
      const { filters, pagination } = get();
      const pageable = createPageable({page, size:pagination.size, sort: ['timestamp,desc']});

      const { data, error } = await admin.logging.getAuditLogs(
        pageable,
        undefined, // adminUserId
        filters.actionType,
        filters.startDate,
        filters.endDate,
        filters.targetEntityId
      );

      if (error) {
        throw new Error(error);
      }

      if (data) {
        set({
          logs: data.content || [],
          pagination: {
            page: data.number || 0,
            size: data.size || 20,
            total: data.totalElements || 0,
          },
          loading: false,
        });
      }
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch audit logs",
        loading: false,
      });
    }
  },

  setFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
      pagination: { ...state.pagination, page: 0 },
    }));
    get().fetchLogs(0);
  },

  clearFilters: () => {
    set({ filters: {} });
    get().fetchLogs(0);
  },

  downloadLogs: async () => {
    try {
      const { data, error } = await admin.logging.downloadApplicationLog();
      
      if (error) {
        throw new Error(error);
      }

      if (data) {
        // Handle file download
        const blob = new Blob([data], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `audit-logs-${new Date().toISOString().split('T')[0]}.log`;
        link.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error: any) {
      set({ error: error.message || "Failed to download logs" });
    }
  },
}));