import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Text } from '@/components/ui/text';
import { useRoom } from '@/context/RoomContext';
import type { TriggerRef } from '@rn-primitives/select';
import { Bell } from 'lucide-react-native';
import React, { useRef } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemeToggle } from './ThemeToggle';
import { Icon } from './ui/icon';

export function RoomHeader() {
  const { rooms, selectedRoom, setSelectedRoom } = useRoom();
  const ref = useRef<TriggerRef>(null);
  const insets = useSafeAreaInsets();

  const contentInsets = {
    top: insets.top,
    bottom: Platform.select({
      ios: insets.bottom,
      android: insets.bottom + 24,
    }),
    left: 16,
    right: 16,
  };

  function onTouchStart() {
    ref.current?.open();
  }

  return (
    <SafeAreaView edges={['top']} className="rounded-b-[35px] bg-white px-5 pb-5 pt-3">
      <View className="relative z-10">
        {/* TOP BAR */}
        <View className="flex-row items-center justify-between">
          <View className="h-11 w-11 items-center justify-center rounded-full bg-black/5">
            <ThemeToggle />
          </View>

          <Text className="text-lg font-semibold text-black/90">KiddoCare</Text>

          <TouchableOpacity className="h-11 w-11 items-center justify-center rounded-full bg-black/5">
            <Icon as={Bell} size={22} strokeWidth={2.5} className="text-black" />
          </TouchableOpacity>
        </View>

        {/* GREETING */}
        <View className="mt-4">
          <Text className="text-sm text-black/60">Good Morning</Text>
          <Text className="text-2xl font-bold text-black">Hello Emma 👋</Text>
        </View>

        {/* ROOM SELECT (Primary Focus) */}
        <View className="mt-4">
          <Select value={selectedRoom} onValueChange={(room: string) => setSelectedRoom(room)}>
            <SelectTrigger
              ref={ref}
              onMagicTap={onTouchStart}
              className="h-14 w-full flex-row items-center justify-between rounded-2xl bg-black/5 px-5">
              <SelectValue
                placeholder="Choose classroom"
                className="text-base font-semibold text-black"
              />
            </SelectTrigger>

            <SelectContent insets={contentInsets} className="mt-2 w-full px-2">
              <SelectGroup>
                <SelectLabel>Classrooms</SelectLabel>
                {rooms.map((room) => (
                  <SelectItem
                    key={room.value}
                    value={room.value}
                    label={room.label}
                    className="py-3">
                    {room.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </View>
        {/* ATTENDANCE SUMMARY */}
        <View className="mt-3 flex-row items-center justify-between rounded-2xl bg-black/5 px-5 py-4">
          <View>
            <Text className="text-lg font-bold text-black">8 / 10 Present</Text>
          </View>

          <TouchableOpacity className="rounded-xl bg-black px-5 py-2">
            <Text className="text-sm font-semibold text-white">Attendance</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
