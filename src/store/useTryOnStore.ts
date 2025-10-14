import { create } from 'zustand';
import { Style } from '@/lib/types';

interface TryOnState {
  userImage: string | null;
  userImageFile: File | null;
  selectedStyle: Style | null;
  resultUrl: string | null;
  loading: boolean;
  hasConsented: boolean;
  setUserImage: (image: string | null, file: File | null) => void;
  setSelectedStyle: (style: Style | null) => void;
  setResultUrl: (url: string | null) => void;
  setLoading: (loading: boolean) => void;
  setConsent: (consented: boolean) => void;
  reset: () => void;
}

export const useTryOnStore = create<TryOnState>((set) => ({
  userImage: null,
  userImageFile: null,
  selectedStyle: null,
  resultUrl: null,
  loading: false,
  hasConsented: false,
  setUserImage: (image, file) => set({ userImage: image, userImageFile: file }),
  setSelectedStyle: (style) => set({ selectedStyle: style }),
  setResultUrl: (url) => set({ resultUrl: url }),
  setLoading: (loading) => set({ loading: loading }),
  setConsent: (consented) => set({ hasConsented: consented }),
  reset: () =>
    set({
      userImage: null,
      userImageFile: null,
      selectedStyle: null,
      resultUrl: null,
      loading: false,
    }),
}));
