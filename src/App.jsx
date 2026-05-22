import { useState, useRef, useCallback } from 'react';
import { useConfigurator } from './hooks/useConfigurator';
import ScreenWrapper from './components/ScreenWrapper';
import Navigation from './components/Navigation';
import ApiKeyScreen from './screens/ApiKeyScreen';
import DirectionScreen from './screens/DirectionScreen';
import IntroScreen from './screens/IntroScreen';
import BatteryScreen from './screens/BatteryScreen';
import PositionScreen from './screens/PositionScreen';
import TimeScreen from './screens/TimeScreen';
import MoodScreen from './screens/MoodScreen';
import MysteryScreen from './screens/MysteryScreen';
import LoadingScreen from './screens/LoadingScreen';
import ResultScreen from './screens/ResultScreen';
import { generateActivity } from './utils/activities';
import { BackgroundDoodles } from './components/Doodles';

export default function App() {
  const {
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
    totalScreens,
  } = useConfigurator();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const directionRef = useRef(1); // 1 = forward, -1 = backward

  const handleNext = useCallback(() => {
    directionRef.current = 1;
    goNext();
  }, [goNext]);

  const handleBack = useCallback(() => {
    directionRef.current = -1;
    goBack();
  }, [goBack]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = localStorage.getItem('couch-potato-api-key');
      if (!apiKey) {
        setScreen(0);
        return;
      }
      const activityResult = await generateActivity(apiKey, config);
      setResult(activityResult);
      setShowResult(true);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Unbekannter Fehler');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    handleSubmit();
  };

  const handleNewResult = (newResult) => {
    setResult(newResult);
  };

  // API key screen
  if (screen === 0) {
    return (
      <ApiKeyScreen onDone={() => {
        directionRef.current = 1;
        setScreen(1);
      }} />
    );
  }

  // Loading state
  if (loading) {
    return <LoadingScreen error={null} onRetry={handleRetry} />;
  }

  // Error state
  if (error) {
    return <LoadingScreen error={error} onRetry={handleRetry} />;
  }

  // Result screen
  if (showResult && result) {
    return (
      <ResultScreen
        result={result}
        config={config}
        onReset={reset}
        onNewResult={handleNewResult}
      />
    );
  }

  const isLastScreen = screen === totalScreens - 1;
  const isTimeScreen = screen === 5;

  const renderScreen = () => {
    switch (screen) {
      case 1:
        return (
          <DirectionScreen
            value={config.direction}
            onChange={(v) => updateConfig('direction', v)}
          />
        );
      case 2:
        return <IntroScreen direction={config.direction} />;
      case 3:
        return (
          <BatteryScreen
            value={config.socialBattery}
            onChange={(v) => updateConfig('socialBattery', v)}
          />
        );
      case 4:
        return (
          <PositionScreen
            value={config.position}
            onChange={(v) => updateConfig('position', v)}
          />
        );
      case 5:
        return (
          <TimeScreen
            value={config.time}
            onChange={(v) => updateConfig('time', v)}
          />
        );
      case 6:
        return (
          <MoodScreen
            mood={config.mood}
            onMoodChange={updateMood}
          />
        );
      case 7:
        return (
          <MysteryScreen
            value={config.mystery}
            onChange={(v) => updateConfig('mystery', v)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <BackgroundDoodles />
      <ScreenWrapper
        screenKey={screen}
        direction={directionRef.current}
        noPadding={isTimeScreen}
      >
        {renderScreen()}
      </ScreenWrapper>

      <Navigation
        screen={screen}
        totalScreens={totalScreens}
        canGoNext={canGoNext()}
        onBack={handleBack}
        onNext={handleNext}
        onSubmit={handleSubmit}
        isLastScreen={isLastScreen}
      />
    </>
  );
}
