import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import { AppleIcon, BedDoubleIcon, ToiletIcon } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

const activities = [
  { id: '1', title: 'Potty', type: 'potty', icon: ToiletIcon },
  { id: '2', title: 'Sleep', type: 'sleep', icon: BedDoubleIcon },
  { id: '3', title: 'Food', type: 'food', icon: AppleIcon },
  { id: '4', title: 'Snack', type: 'food', icon: AppleIcon },
  { id: '5', title: 'Breakfast', type: 'food', icon: AppleIcon },
  { id: '6', title: 'Lunch', type: 'food', icon: AppleIcon },
  { id: '7', title: 'Dinner', type: 'food', icon: AppleIcon },
  { id: '8', title: 'Milk', type: 'food', icon: AppleIcon },
  { id: '9', title: 'Fruit', type: 'food', icon: AppleIcon },
  { id: '10', title: 'Water', type: 'food', icon: AppleIcon },
];

export default function ActivityModal() {
  const router = useRouter();

  return (
    <View className="pt-2">
      <Text className="mb-6 text-xl font-bold">Log Activity</Text>

      <View className="gap-4">
        {activities.map((item) => (
          <TouchableOpacity
            key={item.id} // ✅ unique key
            onPress={() => router.push(`/student-selection-screen?type=${item.type}`)}
            className="flex-row items-center gap-4 rounded-xl border border-border bg-card p-4">
            <View className="h-12 w-12 items-center justify-center rounded-xl bg-muted">
              <Icon as={item.icon} size={24} className="text-primary" />
            </View>

            <Text className="text-lg font-semibold">{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
