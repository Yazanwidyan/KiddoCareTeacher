import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import {
  AppleIcon,
  BedDoubleIcon,
  FileTextIcon,
  PhoneIcon,
  SmileIcon,
  ToiletIcon,
} from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

const actions = [
  { id: '1', title: 'Potty', type: 'potty', icon: ToiletIcon },
  { id: '2', title: 'Sleep', type: 'sleep', icon: BedDoubleIcon },
  { id: '3', title: 'Meal / Food', type: 'food', icon: AppleIcon },
  { id: '4', title: 'Behavior Note', type: 'behavior', icon: SmileIcon },
  { id: '5', title: 'General Note', type: 'note', icon: FileTextIcon },
  { id: '6', title: 'Call Parent', type: 'call', icon: PhoneIcon },
];

export default function StudentActionsListModal() {
  const router = useRouter();

  return (
    <View className="pb-6 pt-2">
      <Text className="mb-6 text-xl font-bold text-black">Student Actions</Text>

      <View className="gap-4">
        {actions.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => router.push(`/student-selection-screen?type=${item.type}`)}
            activeOpacity={0.85}
            className="flex-row items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-black/5">
              <Icon as={item.icon} size={22} className="text-black" />
            </View>

            <Text className="text-base font-semibold text-black">{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
