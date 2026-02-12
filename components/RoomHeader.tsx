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
import { BlurView } from 'expo-blur';
import { Bell } from 'lucide-react-native';
import React, { useRef } from 'react';
import { Image, Platform, TouchableOpacity, View } from 'react-native';
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
    <SafeAreaView
      edges={['top']}
      className="rounded-b-[50px] bg-primary px-5 pb-3"
      style={{ overflow: 'hidden' }}>
      {/* Background image */}
      <Image
        source={require('../assets/images/bg.png')}
        resizeMode="cover"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '150%',
          height: '150%',
          opacity: 0.12,
          zIndex: 0,
        }}
      />

      {/* Content */}
      <View className="relative z-10">
        {/* TOP ROW */}
        <View className="mt-2 flex-row items-center justify-between">
          <View>
            <Text className="text-sm text-white/80">Hi, Courtney!</Text>
            <Text className="text-2xl font-semibold text-white">Welcome back!</Text>
          </View>
          <BlurView intensity={7} tint="light" className="overflow-hidden rounded-full">
            <View className="flex-row items-center gap-2 rounded-full border border-white/30 bg-white/20 px-3">
              <TouchableOpacity className="h-11 w-11 items-center justify-center">
                <Icon as={Bell} size={24} strokeWidth={3} className="text-white" />
              </TouchableOpacity>
              <ThemeToggle />
            </View>
          </BlurView>
        </View>

        {/* ROOM SELECT CARD */}
        <View className="mt-4">
          <Select value={selectedRoom} onValueChange={(room: string) => setSelectedRoom(room)}>
            <SelectTrigger
              ref={ref}
              onMagicTap={onTouchStart}
              className="h-16 w-full flex-row items-center justify-between rounded-full border border-white/30 bg-white/20 px-4">
              <BlurView
                intensity={7}
                tint="light"
                className="absolute inset-0 overflow-hidden rounded-full"
              />

              <View className="flex-row items-center gap-3">
                <View>
                  <SelectValue
                    placeholder="Choose room"
                    className="text-lg font-semibold text-white"
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
