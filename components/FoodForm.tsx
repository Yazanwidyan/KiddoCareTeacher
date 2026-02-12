import { Text } from '@/components/ui/text';
import React from 'react';
import { TextInput, View } from 'react-native';

interface FoodFormProps {
  extraData: string;
  setExtraData: (value: string) => void;
}

export default function FoodForm({ extraData, setExtraData }: FoodFormProps) {
  return (
    <View className="mt-6">
      <Text className="mb-2 font-semibold">Food Details</Text>
      <TextInput
        placeholder="What did they eat?"
        value={extraData}
        onChangeText={setExtraData}
        className="mb-4 rounded-xl bg-muted p-3"
      />
      {/* Add more food-specific inputs here */}
    </View>
  );
}
