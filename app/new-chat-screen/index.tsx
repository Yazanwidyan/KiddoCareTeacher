import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

const parents = [
  { id: 1, name: 'Parent of Lina Ahmad' },
  { id: 2, name: 'Parent of Omar Khaled' },
  { id: 3, name: 'Parent of Sara Youssef' },
];

export default function NewChatScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background px-4 pt-6">
      <Text className="mb-4 text-lg font-semibold">Start New Chat</Text>

      <ScrollView>
        {parents.map((parent) => (
          <TouchableOpacity
            key={parent.id}
            onPress={() => router.push(`/chat-screen/${parent.id}?name=${parent.name}`)}
            className="mb-3 rounded-xl bg-card p-4">
            <Text>{parent.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
