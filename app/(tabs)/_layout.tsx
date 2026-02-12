import ActivityModal from '@/components/activity';
import { Icon } from '@/components/ui/icon';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import {
  ClipboardCheckIcon,
  HomeIcon,
  MessageCircleIcon,
  PlusCircleIcon,
  User2Icon,
} from 'lucide-react-native';
import React, { useCallback, useMemo, useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';

import AttendanceScreen from './attendance';
import StudentsScreen from './index';
import MessagesScreen from './messages';
import ProfileScreen from './profile';

const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View className="absolute bottom-5 left-6 right-6 h-[72px] flex-row items-center justify-around rounded-full bg-primary p-2 shadow-lg">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconMap: Record<string, any> = {
          Students: HomeIcon,
          Attendance: ClipboardCheckIcon,
          Activity: PlusCircleIcon,
          Messages: MessageCircleIcon,
          Profile: User2Icon,
        };

        const IconComponent = iconMap[label];

        return (
          <BlurView
            key={route.key}
            intensity={7}
            tint="light"
            className="overflow-hidden rounded-full">
            <TouchableOpacity
              onPress={onPress}
              className={`h-14 w-14 items-center justify-center rounded-full ${
                isFocused ? 'bg-white' : 'border border-white/30 bg-white/20'
              }`}>
              <Icon
                as={IconComponent}
                color={isFocused ? '#33a1c9' : 'white'}
                strokeWidth={3}
                size={24}
              />
            </TouchableOpacity>
          </BlurView>
        );
      })}
    </View>
  );
}

export default function TabsLayout() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['85%'], []);

  const openSheet = () => {
    bottomSheetModalRef.current?.present();
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.7}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    []
  );
  return (
    <BottomSheetModalProvider>
      <>
        <Tab.Navigator
          screenOptions={{ headerShown: false }}
          tabBar={(props) => <CustomTabBar {...props} />}>
          <Tab.Screen name="Students" component={StudentsScreen} />
          <Tab.Screen name="Attendance" component={AttendanceScreen} />

          {/* 🔥 Intercept Activity Tab */}
          <Tab.Screen
            name="Activity"
            component={View} // dummy
            listeners={{
              tabPress: (e) => {
                e.preventDefault(); // stop navigation
                openSheet(); // open bottom sheet
              },
            }}
          />

          <Tab.Screen name="Messages" component={MessagesScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>

        {/* 🔥 Bottom Sheet */}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}>
          <BottomSheetScrollView
            contentContainerStyle={{ paddingBottom: 40, paddingTop: 8, paddingHorizontal: 24 }}
            showsVerticalScrollIndicator={false}>
            <ActivityModal />
          </BottomSheetScrollView>
        </BottomSheetModal>
      </>
    </BottomSheetModalProvider>
  );
}
