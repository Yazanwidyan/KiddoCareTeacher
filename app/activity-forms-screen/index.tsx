import FoodForm from '@/components/FoodForm';
import PottyForm from '@/components/PottyForm';
import SleepForm from '@/components/SleepForm';
import { Text } from '@/components/ui/text';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';

export default function ActivityFormsScreen() {
  const { type, students } = useLocalSearchParams();
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
    <View className="flex-1 bg-background px-4 pt-6">
      <ScrollView>
        <Text className="mb-4 text-xl font-bold">{type?.toUpperCase()} Activity</Text>

        {/* Selected Students */}
        <Text className="mb-2 font-semibold">Students</Text>
        {selectedStudents.map((id: number) => (
          <Text key={id} className="mb-1 text-foreground">
            Student ID: {id} {/* You can replace with name if you pass names too */}
          </Text>
        ))}

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
