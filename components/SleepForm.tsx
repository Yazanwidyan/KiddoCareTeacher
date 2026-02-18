import { Text } from '@/components/ui/text';
import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

interface SleepFormProps {
  extraData: {
    duration?: string;
    mood?: string;
  };
  setExtraData: (value: { duration?: string; mood?: string }) => void;
}

const sleepDurations = ['30m', '45m', '1h', '1h 30m', '2h', '2h 30m', '3h'];
const moods = ['😴 Peaceful', '😐 Restless', '😢 Upset'];

export default function SleepForm({ extraData, setExtraData }: SleepFormProps) {
  const [selectedDuration, setSelectedDuration] = useState(extraData.duration || '');
  const [selectedMood, setSelectedMood] = useState(extraData.mood || '');

  const handleDurationSelect = (duration: string) => {
    setSelectedDuration(duration);
    setExtraData({ ...extraData, duration });
  };

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setExtraData({ ...extraData, mood });
  };

  return (
    <View className="mt-2">
      {/* Sleep Duration */}
      <Text className="mb-3 text-base font-semibold">Sleep Duration</Text>
      <View className="mb-6 flex-row flex-wrap gap-3">
        {sleepDurations.map((duration) => {
          const selected = selectedDuration === duration;
          return (
            <TouchableOpacity
              key={duration}
              onPress={() => handleDurationSelect(duration)}
              activeOpacity={0.8}
              className={`rounded-full px-5 py-3 ${selected ? 'bg-blue-500' : 'bg-muted'}`}>
              <Text className={`font-medium ${selected ? 'text-white' : 'text-black'}`}>
                {duration}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Sleep Mood */}
      <Text className="mb-3 text-base font-semibold">Sleep Quality / Mood</Text>
      <View className="mb-6 flex-row flex-wrap gap-3">
        {moods.map((mood) => {
          const selected = selectedMood === mood;
          return (
            <TouchableOpacity
              key={mood}
              onPress={() => handleMoodSelect(mood)}
              activeOpacity={0.8}
              className={`rounded-full px-5 py-3 ${selected ? 'bg-yellow-400' : 'bg-muted'}`}>
              <Text className={`font-medium ${selected ? 'text-white' : 'text-black'}`}>
                {mood}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Optional Notes */}
      <Text className="mb-2 font-semibold">Notes</Text>
      <TextInput
        placeholder="Extra notes..."
        value={extraData?.notes || ''}
        onChangeText={(text) => setExtraData({ ...extraData, notes: text })}
        multiline
        className="mb-4 rounded-xl bg-muted p-3"
      />
    </View>
  );
}
