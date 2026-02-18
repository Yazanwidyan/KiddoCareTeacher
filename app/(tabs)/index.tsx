import { RoomHeader } from '@/components/RoomHeader';
import { Text } from '@/components/ui/text';
import { useSheet } from '@/context/SheetContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
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
  const { sheetType, closeSheet, openSheet } = useSheet();

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
        activeOpacity={0.7}
        onPress={() => openSheet('studentActions')}
        // onPress={() => router.push(`/student-profile-screen/${item.id}?name=${item.name}`)}
        className="m-1 min-w-[100px] flex-1 items-center rounded-2xl bg-white p-2">
        <View className="relative">
          <Image
            // source={{ uri: `https://i.pravatar.cc/150?img=${item.id}` }}
            source={require('../../assets/images/avatar2.jpg')}
            className="h-20 w-20 rounded-full"
          />
          <Text className="mt-2 text-center text-xs font-semibold">{item.name}</Text>

          <View className="mt-1 flex-row items-center justify-center gap-1">
            <View className={`h-2 w-2 rounded-full ${isPresent ? 'bg-green-500' : 'bg-red-500'}`} />
            <Text
              className={`text-xs font-medium ${isPresent ? 'text-green-600' : 'text-red-600'}`}>
              {item.status}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-background">
      <RoomHeader />

      <FlatList
        data={sortedStudents} // ✅ use sorted array
        keyExtractor={(item) => item.id.toString()}
        numColumns={NUM_COLUMNS}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: ITEM_MARGIN,
          paddingTop: 12,
          paddingBottom: 100,
        }}
        columnWrapperStyle={{ justifyContent: 'flex-start' }}
      />
    </View>
  );
}
