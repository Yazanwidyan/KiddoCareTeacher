import { Text } from '@/components/ui/text';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

interface PottyFormProps {
  extraData: string;
  setExtraData: (value: string) => void;
}

const pottyTypes = ['Wet', 'Dirty', 'Both'];
const moods = ['😊 Happy', '😐 Calm', '😢 Upset'];

export default function PottyForm({ extraData, setExtraData }: PottyFormProps) {
  const [diaperChanged, setDiaperChanged] = useState<boolean | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleSelectType = (type: string) => {
    setExtraData(type);
  };

  return (
    <View className="mt-2">
      {/* Potty Type */}
      <Text className="mb-3 text-base font-semibold">Potty Type</Text>

      <View className="mb-6 flex-row flex-wrap gap-3">
        {pottyTypes.map((type) => {
          const selected = extraData === type;
          return (
            <TouchableOpacity
              key={type}
              onPress={() => handleSelectType(type)}
              activeOpacity={0.8}
              className={`rounded-full px-5 py-3 ${selected ? 'bg-blue-500' : 'bg-muted'}`}>
              <Text className={`font-medium ${selected ? 'text-white' : 'text-black'}`}>
                {type}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Diaper Changed */}
      <Text className="mb-3 text-base font-semibold">Diaper Changed?</Text>

      <View className="mb-6 flex-row gap-3">
        {['Yes', 'No'].map((option) => {
          const selected =
            (option === 'Yes' && diaperChanged === true) ||
            (option === 'No' && diaperChanged === false);

          return (
            <TouchableOpacity
              key={option}
              onPress={() => setDiaperChanged(option === 'Yes')}
              activeOpacity={0.8}
              className={`rounded-full px-5 py-3 ${selected ? 'bg-green-500' : 'bg-muted'}`}>
              <Text className={`font-medium ${selected ? 'text-white' : 'text-black'}`}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Mood */}
      <Text className="mb-3 text-base font-semibold">Mood</Text>

      <View className="flex-row flex-wrap gap-3">
        {moods.map((mood) => {
          const selected = selectedMood === mood;
          return (
            <TouchableOpacity
              key={mood}
              onPress={() => setSelectedMood(mood)}
              activeOpacity={0.8}
              className={`rounded-full px-5 py-3 ${selected ? 'bg-yellow-400' : 'bg-muted'}`}>
              <Text className={`font-medium ${selected ? 'text-white' : 'text-black'}`}>
                {mood}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
