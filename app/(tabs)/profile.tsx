import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import { Bell, LogOut, Settings, User } from 'lucide-react-native';
import React from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TeacherProfileScreen() {
  const router = useRouter();

  const teacher = {
    name: 'Ms. Lina Ahmad',
    email: 'lina.ahmad@school.edu',
    room: 'Grade 5 - Room 12',
    students: 25,
    attendanceToday: '22 present • 3 absent',
    avatar: 'https://i.pravatar.cc/150?img=10',
  };

  const settingsOptions = [
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      action: () => router.push('/notifications'),
    },
    {
      id: 'account',
      label: 'Account Settings',
      icon: Settings,
      action: () => router.push('/account-settings'),
    },
    { id: 'logout', label: 'Logout', icon: LogOut, action: () => alert('Logged out!') },
  ];

  return (
    <View className="flex-1 bg-background">
      <SafeAreaView edges={['top']} className="px-5 pb-3" style={{ overflow: 'hidden' }}>
        <View className="h-12">
          <View className="flex-row items-center justify-between">
            <Text className="text-xl font-bold">Profile</Text>
          </View>
        </View>
      </SafeAreaView>
      <ScrollView className="flex-1 bg-background px-4 pt-0">
        {/* Profile Header */}
        <View className="mb-6 items-center">
          <Image source={{ uri: teacher.avatar }} className="mb-4 h-24 w-24 rounded-full" />
          <Text className="text-xl font-bold">{teacher.name}</Text>
          <Text className="text-sm text-muted-foreground">{teacher.email}</Text>
          <Text className="mt-1 text-sm text-muted-foreground">{teacher.room}</Text>
        </View>

        {/* Quick Stats */}
        <View className="mb-6 flex-row justify-between rounded-xl bg-card p-4">
          <View className="flex-1 items-center">
            <Text className="text-xl font-bold">{teacher.students}</Text>
            <Text className="mt-1 text-xs text-muted-foreground">Students</Text>
          </View>
          <View className="flex-1 items-center border-l border-r border-muted-foreground">
            <Text className="text-xl font-bold">{teacher.attendanceToday.split(' ')[0]}</Text>
            <Text className="mt-1 text-xs text-muted-foreground">Present Today</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-xl font-bold">
              {teacher.attendanceToday.split('•')[1].trim()}
            </Text>
            <Text className="mt-1 text-xs text-muted-foreground">Absent Today</Text>
          </View>
        </View>

        {/* Settings Section */}
        <View className="mb-6">
          <Text className="mb-3 text-sm font-semibold text-muted-foreground">Settings</Text>
          {settingsOptions.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={item.action}
              className="mb-2 flex-row items-center rounded-xl bg-card p-4">
              <Icon as={item.icon} size={20} className="mr-3 text-primary" />
              <Text className="text-base font-medium">{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Optional About */}
        <View className="mb-6">
          <Text className="mb-2 text-sm font-semibold text-muted-foreground">About Me</Text>
          <Text className="text-sm text-muted-foreground">
            Experienced teacher with a passion for fostering a positive learning environment.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
