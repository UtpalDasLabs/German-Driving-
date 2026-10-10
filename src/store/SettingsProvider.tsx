import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { deviceLanguage } from '@/lib/languages';
import { loadJSON, saveJSON } from '@/lib/storage';
import type { Settings } from '@/lib/types';

const DEFAULTS: Settings = {
  language: 'en',
  showGerman: true,
  appearance: 'system',
  haptics: true,
  goal: 'regular',
  examDate: null,
  onboarded: false,
};

type Ctx = {
  settings: Settings;
  ready: boolean;
  update: (patch: Partial<Settings>) => void;
};

const SettingsContext = createContext<Ctx>({ settings: DEFAULTS, ready: false, update: () => {} });

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // A first visit starts in the device language if it is one of the test
    // languages; the intro asks anyway, this just pre-selects the likely one.
    loadJSON('settings', { ...DEFAULTS, language: deviceLanguage() }).then((s) => {
      setSettings(s);
      setReady(true);
    });
  }, []);

  const update = useCallback((patch: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      void saveJSON('settings', next);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ settings, ready, update }), [settings, ready, update]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  return useContext(SettingsContext);
}
