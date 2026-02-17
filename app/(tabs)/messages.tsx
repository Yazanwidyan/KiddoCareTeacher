import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { ChevronLeft, MessageCircle, Phone, Plus } from 'lucide-react-native';
import React from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const chats = [
  {
    id: 1,
    name: 'Parent of Lina Ahmad',
    last: 'Thank you teacher!',
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: 'Parent of Omar Khaled',
    last: 'Can we schedule a meeting?',
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: 'Parent of Sara Youssef',
    last: 'She will be absent tomorrow.',
    unread: 1,
    online: true,
  },
];

export default function MessagesScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <SafeAreaView edges={['top']} className="px-5 pb-3" style={{ overflow: 'hidden' }}>
        <View className="h-12">
          <View className="flex-row items-center justify-between">
            <Text className="text-xl font-bold">Messages</Text>

            <View className="flex-row gap-2">
              <BlurView intensity={7} tint="light" className="overflow-hidden rounded-full">
                <TouchableOpacity
                  onPress={() => router.push('/new-chat-screen')}
                  className="h-10 w-10 items-center justify-center rounded-full bg-primary">
                  <Icon as={Plus} size={18} strokeWidth={2.5} className="text-white" />
                </TouchableOpacity>
              </BlurView>
            </View>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView className="px-5">
        {chats.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            onPress={() => router.push(`/chat-screen/${chat.id}?name=${chat.name}`)}
            className="mb-3 flex-row items-center gap-4 rounded-xl bg-card p-3">
            {/* Avatar */}
            <View className="relative">
              <Image
                source={{
                  uri: `https://i.pravatar.cc/150?img=${chat.id + 20}`,
                }}
                className="h-14 w-14 rounded-full"
              />

              {/* Online indicator */}
              {chat.online && (
                <View className="absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
              )}
            </View>

            {/* Name + Last message */}
            <View className="flex-1">
              <Text className="font-semibold">{chat.name}</Text>
              <Text className="text-xs text-muted-foreground">{chat.last}</Text>
            </View>

            {/* Unread Badge */}
            {chat.unread > 0 && (
              <View className="min-w-[20px] items-center justify-center rounded-full bg-primary px-2 py-1">
                <Text className="text-xs text-white">{chat.unread}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
