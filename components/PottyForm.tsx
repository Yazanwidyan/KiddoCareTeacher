import { Text } from '@/components/ui/text';
import React from 'react';
import { TextInput, View } from 'react-native';

interface PottyFormProps {
  extraData: string;
  setExtraData: (value: string) => void;
}

export default function PottyForm({ extraData, setExtraData }: PottyFormProps) {
  return (
    <View className="mt-6">
      <Text className="mb-2 font-semibold">Potty Type</Text>
      <TextInput
        placeholder="Wet / Dry / Both"
        value={extraData}
        onChangeText={setExtraData}
        className="mb-4 rounded-xl bg-muted p-3"
      />
      {/* Add more potty-specific inputs here */}
    </View>
  );
}
