import { RoomHeader } from '@/components/RoomHeader';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import { Check } from 'lucide-react-native';
import React from 'react';
import { Dimensions, FlatList, Image, TouchableOpacity, View } from 'react-native';

const students = [
  { id: 1, name: 'Lina Ahmad', status: 'Present' },
  { id: 2, name: 'Omar Khaled', status: 'Absent' },
  { id: 3, name: 'Sara Youssef', status: 'Present' },
  { id: 4, name: 'Yousef Nasser', status: 'Present' },
  { id: 5, name: 'Maya Haddad', status: 'Absent' },
  { id: 6, name: 'Kareem Salah', status: 'Present' },
  { id: 7, name: 'Rana Ali', status: 'Present' },
  { id: 8, name: 'Ahmad Samir', status: 'Absent' },
  { id: 9, name: 'Noor Ibrahim', status: 'Present' },
  { id: 10, name: 'Tariq Mahmoud', status: 'Absent' },
  { id: 11, name: 'Hala Zayed', status: 'Present' },
  { id: 12, name: 'Zain Abed', status: 'Present' },
  { id: 13, name: 'Salma Farouk', status: 'Absent' },
  { id: 14, name: 'Adam Hussein', status: 'Present' },
  { id: 15, name: 'Yara Saeed', status: 'Absent' },
];

const MIN_ITEM_WIDTH = 100;
const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_MARGIN = 8;
const NUM_COLUMNS = Math.floor(SCREEN_WIDTH / (MIN_ITEM_WIDTH + ITEM_MARGIN * 2));

export default function HomeScreen() {
  const router = useRouter();
  // 🔹 Sort students: Present first
  const sortedStudents = students.sort((a, b) => {
    if (a.status === 'Present' && b.status !== 'Present') return -1;
    if (a.status !== 'Present' && b.status === 'Present') return 1;
    return 0; // keep relative order if same
  });

  const renderItem = ({ item }: { item: (typeof students)[0] }) => {
    const isPresent = item.status === 'Present';

    return (
      <TouchableOpacity
        onPress={() => router.push(`/student-profile-screen/${item.id}?name=${item.name}`)}
        className="m-2 min-w-[100px] flex-1 items-center">
        <View className="relative">
          <Image
            // source={{ uri: `https://i.pravatar.cc/150?img=${item.id}` }}
            source={require('../../assets/images/avatar2.jpg')}
            className="h-20 w-20 rounded-full"
          />

          {isPresent && (
            <View className="absolute -bottom-1 -left-1 h-5 w-5 items-center justify-center rounded-full border-2 border-background bg-primary">
              <Icon as={Check} size={15} strokeWidth={2.5} className="text-white" />
            </View>
          )}
        </View>

        <Text className="mt-2 text-center text-xs font-semibold">{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-background">
      <RoomHeader screen="students" />

      <FlatList
        data={sortedStudents} // ✅ use sorted array
        keyExtractor={(item) => item.id.toString()}
        numColumns={NUM_COLUMNS}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: ITEM_MARGIN,
          paddingTop: 8,
          paddingBottom: 100,
        }}
        columnWrapperStyle={{ justifyContent: 'flex-start' }}
      />
    </View>
  );
}
