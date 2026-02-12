import { Text } from '@/components/ui/text';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, TextInput, TouchableOpacity, View } from 'react-native';

const studentsList = [
  { id: 1, name: 'Lina Ahmad' },
  { id: 2, name: 'Omar Khaled' },
  { id: 3, name: 'Sara Youssef' },
  // Add more students...
];

export default function StudentSelectionScreen() {
  const { type } = useLocalSearchParams();
  const router = useRouter();

  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleStudent = (id: number) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectAll = () => setSelectedStudents(studentsList.map((s) => s.id));
  const clearAll = () => setSelectedStudents([]);

  const filteredStudents = studentsList.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNext = () => {
    if (selectedStudents.length === 0) {
      alert('Please select at least one student');
      return;
    }
    router.push({
      pathname: '/activity-forms-screen',
      params: { type: type, students: JSON.stringify(selectedStudents) },
    });
  };

  return (
    <View className="flex-1 bg-background px-4 pt-6">
      <Text className="mb-4 text-xl font-bold">Select Students</Text>

      {/* Search */}
      <TextInput
        placeholder="Search students..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        className="mb-4 rounded-xl bg-muted p-3"
      />

      {/* Select All / Clear All */}
      <View className="mb-4 flex-row justify-between">
        <TouchableOpacity onPress={selectAll} className="rounded bg-primary px-4 py-2">
          <Text className="text-white">Select All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={clearAll} className="rounded bg-gray-300 px-4 py-2">
          <Text>Clear All</Text>
        </TouchableOpacity>
      </View>

      {/* Students List */}
      <FlatList
        data={filteredStudents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isSelected = selectedStudents.includes(item.id);
          return (
            <TouchableOpacity
              onPress={() => toggleStudent(item.id)}
              className={`mb-2 rounded-xl p-3 ${
                isSelected ? 'bg-primary' : 'border border-border bg-card'
              }`}>
              <Text className={isSelected ? 'text-white' : 'text-foreground'}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* Next Button */}
      <TouchableOpacity
        onPress={handleNext}
        className="mt-6 items-center rounded-xl bg-primary py-4">
        <Text className="font-semibold text-white">Next</Text>
      </TouchableOpacity>
    </View>
  );
}
