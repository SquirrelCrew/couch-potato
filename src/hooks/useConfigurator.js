import { useState, useCallback } from 'react';

const TOTAL_SCREENS = 8; // 0=apikey, 1=direction, 2=intro, 3=battery, 4=position, 5=time, 6=mood, 7=mystery

const DEFAULT_STATE = {
  direction: null,      // 'raus' | 'rein'
  socialBattery: null,  // 0-3
  position: null,       // string
  time: null,           // string
  mood: [
    { label: ['Faul', 'Abenteuerlustig'], value: 0.5 },
    { label: ['Kreativ', 'Berieselungsfreudig'], value: 0.5 },
    { label: ['Hungrig', 'Übersättigt'], value: 0.5 },
    { label: ['Ausbalanciert', 'Wirbelig'], value: 0.5 },
  ],
  mystery: null,        // boolean
};

export function useConfigurator() {
  const [screen, setScreen] = useState(0);
  const [config, setConfig] = useState(DEFAULT_STATE);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const canGoNext = useCallback(() => {
    switch (screen) {
      case 0: return !!localStorage.getItem('couch-potato-api-key');
      case 1: return config.direction !== null;
      case 2: return true; // intro screen, always can proceed
      case 3: return config.socialBattery !== null;
      case 4: return config.position !== null;
      case 5: return config.time !== null;
      case 6: return true; // mood sliders have defaults
      case 7: return config.mystery !== null;
      default: return false;
    }
  }, [screen, config]);

  const goNext = useCallback(() => {
    if (screen < TOTAL_SCREENS - 1 && canGoNext()) {
      setScreen(s => s + 1);
    }
  }, [screen, canGoNext]);

  const goBack = useCallback(() => {
    if (screen > 0) {
      setScreen(s => s - 1);
    }
  }, [screen]);

  const updateConfig = useCallback((key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  }, []);

  const updateMood = useCallback((index, value) => {
    setConfig(prev => ({
      ...prev,
      mood: prev.mood.map((m, i) => i === index ? { ...m, value } : m),
    }));
  }, []);

  const reset = useCallback(() => {
    setScreen(1); // skip API key screen on reset
    setConfig(DEFAULT_STATE);
    setResult(null);
    setShowResult(false);
  }, []);

  return {
    screen,
    setScreen,
    config,
    updateConfig,
    updateMood,
    canGoNext,
    goNext,
    goBack,
    result,
    setResult,
    showResult,
    setShowResult,
    reset,
    totalScreens: TOTAL_SCREENS,
  };
}
