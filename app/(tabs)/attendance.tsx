import { RoomHeader } from '@/components/RoomHeader';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Check, CheckCircle2, X, XCircleIcon } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { Dimensions, FlatList, Image, TouchableOpacity, View } from 'react-native';

type Status = 'checked_in' | 'checked_out' | 'absent' | 'pending';

type Student = {
  id: number;
  name: string;
  status: Status;
};

const initialStudents: Student[] = [
  { id: 1, name: 'Lina Ahmad', status: 'checked_in' },
  { id: 2, name: 'Omar Khaled', status: 'absent' },
  { id: 3, name: 'Sara Youssef', status: 'pending' },
  { id: 4, name: 'Yousef Nasser', status: 'checked_out' },
  { id: 5, name: 'Maya Haddad', status: 'absent' },
  { id: 6, name: 'Ali Hassan', status: 'checked_in' },
  { id: 7, name: 'Noor Saleh', status: 'pending' },
  { id: 8, name: 'Rami Farah', status: 'checked_in' },
  { id: 9, name: 'Hala Zayed', status: 'pending' },
  { id: 10, name: 'Salma Farouk', status: 'pending' },
  { id: 11, name: 'Ahmad Samir', status: 'checked_in' },
  { id: 12, name: 'Adam Hussein', status: 'pending' },
  { id: 13, name: 'Zain Abed', status: 'pending' },
  { id: 14, name: 'Adam Hussein', status: 'pending' },
  { id: 15, name: 'Yara Saeed', status: 'pending' },
];

const MIN_ITEM_WIDTH = 100;
const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_MARGIN = 8;
const NUM_COLUMNS = Math.floor(SCREEN_WIDTH / (MIN_ITEM_WIDTH + ITEM_MARGIN * 2));

export default function AttendanceScreen() {
  const [studentsDraft, setStudentsDraft] = useState(initialStudents);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Summary counts
  const summary = useMemo(() => {
    const total = studentsDraft.length;
    const checkedIn = studentsDraft.filter((s) => s.status === 'checked_in').length;
    const checkedOut = studentsDraft.filter((s) => s.status === 'checked_out').length;
    const absent = studentsDraft.filter((s) => s.status === 'absent').length;
    const pending = studentsDraft.filter((s) => s.status === 'pending').length;
    return { total, checkedIn, checkedOut, absent, pending };
  }, [studentsDraft]);

  // Selected students
  const selectedStudents = studentsDraft.filter((s) => selectedIds.includes(s.id));
  const selectedStatuses = selectedStudents.map((s) => s.status);

  const allCheckedIn = selectedStatuses.every((s) => s === 'checked_in');
  const allCheckedOut = selectedStatuses.every((s) => s === 'checked_out');
  const allAbsent = selectedStatuses.every((s) => s === 'absent');
  const allPending = selectedStatuses.every((s) => s === 'pending');
  const mixed = !allCheckedIn && !allCheckedOut && !allAbsent && !allPending;

  // Toggle selection
  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  // Update status for selected students
  const updateSelectedStatus = (status: Status) => {
    setStudentsDraft((prev) =>
      prev.map((s) => (selectedIds.includes(s.id) ? { ...s, status } : s))
    );
    setSelectedIds([]);
  };

  // Save attendance
  const saveAttendance = () => {
    console.log('Saved attendance:', studentsDraft);
    alert('Attendance saved!');
    setSelectedIds([]);
  };

  // Render student card
  const renderItem = ({ item }: { item: Student }) => {
    const isSelected = selectedIds.includes(item.id);
    const statusColors: Record<Status, string> = {
      checked_in: 'bg-green-500',
      checked_out: 'bg-yellow-500',
      absent: 'bg-red-500',
      pending: 'bg-gray-400',
    };

    return (
      <TouchableOpacity
        onPress={() => toggleSelect(item.id)}
        className="m-2 min-w-[100px] flex-1 items-center">
        <View className="relative">
          <Image
            source={{ uri: `https://i.pravatar.cc/150?img=${item.id}` }}
            className="h-20 w-20 rounded-full"
          />

          {/* Status Badge */}
          <View
            className={`absolute -bottom-1 -left-1 rounded-full border-2 border-white px-2 py-0.5 ${
              statusColors[item.status]
            }`}>
            <Text className="text-[10px] font-semibold capitalize text-white">
              {item.status.replace('_', ' ')}
            </Text>
          </View>

          {/* Selection overlay */}
          {isSelected && (
            <View className="absolute inset-0 items-center justify-center rounded-full bg-black/40">
              <Check size={24} color="white" />
            </View>
          )}

          {/* Dim if absent or pending */}
          {(item.status === 'absent' || item.status === 'pending') && !isSelected && (
            <View className="absolute inset-0 rounded-full bg-white/30" />
          )}
        </View>

        <Text className="mt-2 text-center text-xs font-semibold">{item.name}</Text>
      </TouchableOpacity>
    );
  };

  // Render Bottom Action Bar
  const renderBottomActions = () => {
    if (selectedIds.length === 0) return null;

    return (
      <View className="absolute bottom-24 left-6 right-6 z-[100]">
        <View className="flex-row rounded-full bg-gray-900 p-3 shadow-2xl">
          {/* Pending or Absent → Check In + Mark Absent */}
          {selectedStudents.some(
            (s) => s.status === 'pending' || s.status === 'absent' || mixed
          ) && (
            <>
              <TouchableOpacity
                onPress={() => updateSelectedStatus('checked_in')}
                className="mr-2 flex-1 flex-row items-center justify-center rounded-full bg-green-500 py-3">
                <Icon as={CheckCircle2} size={18} className="mr-2 text-white" />
                <Text className="font-semibold text-white">Check In</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => updateSelectedStatus('absent')}
                className="mr-2 flex-1 flex-row items-center justify-center rounded-full bg-red-500 py-3">
                <Icon as={XCircleIcon} size={18} className="mr-2 text-white" />
                <Text className="font-semibold text-white">Mark Absent</Text>
              </TouchableOpacity>
            </>
          )}

          {/* Checked In → Check Out */}
          {allCheckedIn && (
            <TouchableOpacity
              onPress={() => updateSelectedStatus('checked_out')}
              className="flex-1 flex-row items-center justify-center rounded-full bg-yellow-500 py-3">
              <Icon as={X} size={18} className="mr-2 text-white" />
              <Text className="font-semibold text-white">Check Out</Text>
            </TouchableOpacity>
          )}

          {/* Checked Out → Check In */}
          {allCheckedOut && (
            <TouchableOpacity
              onPress={() => updateSelectedStatus('checked_in')}
              className="flex-1 flex-row items-center justify-center rounded-full bg-green-500 py-3">
              <Icon as={CheckCircle2} size={18} className="mr-2 text-white" />
              <Text className="font-semibold text-white">Check In</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-background">
      <RoomHeader screen="attendance" />

      {/* Header */}
      <View className="p-5">
        <Text className="text-xs">
          {summary.checkedIn} checked in • {summary.checkedOut} checked out • {summary.absent}{' '}
          absent • {summary.pending} pending
        </Text>
      </View>

      {/* Student Grid */}
      <FlatList
        data={studentsDraft}
        keyExtractor={(item) => item.id.toString()}
        numColumns={NUM_COLUMNS}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: ITEM_MARGIN,
          paddingBottom: 100,
        }}
        columnWrapperStyle={{ justifyContent: 'flex-start' }}
      />

      {/* Bottom Actions */}
      {renderBottomActions()}
    </View>
  );
}
