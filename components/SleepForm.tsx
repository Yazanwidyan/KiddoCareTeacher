import { Text } from '@/components/ui/text';
import React from 'react';
import { TextInput, View } from 'react-native';

interface SleepFormProps {
  extraData: string;
  setExtraData: (value: string) => void;
}

export default function SleepForm({ extraData, setExtraData }: SleepFormProps) {
  return (
    <View className="mt-6">
      <Text className="mb-2 font-semibold">Sleep Duration</Text>
      <TextInput
        placeholder="e.g. 1h 30m"
        value={extraData}
        onChangeText={setExtraData}
        className="mb-4 rounded-xl bg-muted p-3"
      />
      {/* Add more sleep-specific inputs here */}
    </View>
  );
}
