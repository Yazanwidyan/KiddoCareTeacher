import FoodForm from '@/components/FoodForm';
import PottyForm from '@/components/PottyForm';
import SleepForm from '@/components/SleepForm';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { X } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ActivityFormsScreen() {
  const { type, students } = useLocalSearchParams();
  const router = useRouter();
  const selectedStudents = students ? JSON.parse(students as string) : [];

  const [notes, setNotes] = useState('');
  const [extraData, setExtraData] = useState('');

  const renderActivityFields = () => {
    switch (type) {
      case 'potty':
        return <PottyForm extraData={extraData} setExtraData={setExtraData} />;
      case 'sleep':
        return <SleepForm extraData={extraData} setExtraData={setExtraData} />;
      case 'food':
        return <FoodForm extraData={extraData} setExtraData={setExtraData} />;
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    const payload = {
      activityType: type,
      students: selectedStudents,
      details: extraData,
      notes,
    };

    console.log('Submitting:', payload);
    alert('Activity Logged Successfully ✅');
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <SafeAreaView edges={['top']} className="px-5 pb-3" style={{ overflow: 'hidden' }} />
      <ScrollView className="px-5">
        <View className="relative flex-row items-center justify-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute left-0 h-11 w-11 items-center justify-center rounded-full bg-white">
            <Icon as={X} size={24} strokeWidth={2.5} className="text-black" />
          </TouchableOpacity>

          <Text className="font-poppins-bold my-4 text-xl capitalize">{type} Activity</Text>
        </View>

        {/* Selected Students */}

        {/* Activity Fields */}
        {renderActivityFields()}

        {/* Notes */}
        <Text className="mb-2 font-semibold">Notes</Text>
        <TextInput
          placeholder="Additional notes..."
          value={notes}
          onChangeText={setNotes}
          multiline
          className="mb-6 rounded-xl bg-muted p-3"
        />

        {/* Submit */}
        <TouchableOpacity
          onPress={handleSubmit}
          className="mb-10 items-center rounded-xl bg-primary py-4">
          <Text className="font-semibold text-white">Save Activity</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
