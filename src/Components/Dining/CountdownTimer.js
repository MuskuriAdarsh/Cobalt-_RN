// CountdownTimer.js
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from '../../../components/ui/button'; // Import your custom button
import { useFocusEffect } from '@react-navigation/native'; // Import from react-navigation

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds
  const [isActive, setIsActive] = useState(false);

  // This will start the timer when the component becomes visible
  useFocusEffect(
    React.useCallback(() => {
      // Start the countdown when the screen is focused
      setIsActive(true);

      // Cleanup when leaving the screen
      return () => setIsActive(false);
    }, [])
  );

  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      alert('Time is up!');
    }

    return () => clearInterval(interval); // Cleanup on component unmount or when isActive changes
  }, [isActive, timeLeft]);

  // Format time (hours:minutes:seconds)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setTimeLeft(60 * 60); // Reset to 60 minutes
    setIsActive(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 48, fontWeight: 'bold' }}>
        {formatTime(timeLeft)}
      </Text>
      <Button title={isActive ? 'Pause' : 'Start'} onPress={handleStartStop} />
      <Button title="Reset" onPress={handleReset} />
    </View>
  );
};

export default CountdownTimer;
