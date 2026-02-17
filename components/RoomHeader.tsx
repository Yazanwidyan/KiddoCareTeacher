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

export function RoomHeader({ screen }: any) {
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
    <SafeAreaView
      edges={['top']}
      className="rounded-b-[35px] bg-white px-5 py-3"
      style={{ overflow: 'hidden' }}>
      {/* Content */}
      <View className="relative z-10">
        {/* TOP ROW */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2 rounded-full bg-black/5">
            <ThemeToggle />
          </View>
          <View>
            <Text className="font-semibold text-black/90">KiddoCare</Text>
          </View>
          <View className="flex-row items-center gap-2 rounded-full bg-black/5">
            <TouchableOpacity className="h-11 w-11 items-center justify-center">
              <Icon as={Bell} size={24} strokeWidth={2.5} className="text-black" />
            </TouchableOpacity>
          </View>
        </View>
        {/* TOP ROW */}
        <View className="mt-2 flex-row items-center justify-between">
          <View>
            <Text className="my-2 text-sm font-semibold capitalize text-black/90">
              <View className="h-2 w-2 rounded-full bg-black" /> {screen}
            </Text>
            <Text className="text-3xl font-semibold text-black">Hello Emma!</Text>
          </View>
        </View>

        {/* ROOM SELECT CARD */}
        <View className="mt-2">
          <Text className="mb-1.5 text-sm text-black/70">Select room</Text>

          <Select value={selectedRoom} onValueChange={(room: string) => setSelectedRoom(room)}>
            <SelectTrigger
              ref={ref}
              onMagicTap={onTouchStart}
              className="h-12 w-full flex-row items-center justify-between rounded-full bg-black/5 px-6">
              <View className="flex-row items-center gap-3">
                <View>
                  <SelectValue
                    placeholder="Choose room"
                    className="text-base font-medium text-black"
                  />
                </View>
              </View>
            </SelectTrigger>

            <SelectContent insets={contentInsets} className="mt-1 w-full px-2">
              <SelectGroup>
                <SelectLabel>Rooms</SelectLabel>
                {rooms.map((room) => (
                  <SelectItem
                    className="py-3"
                    key={room.value}
                    value={room.value}
                    label={room.label}>
                    {room.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </View>
      </View>
    </SafeAreaView>
  );
}
