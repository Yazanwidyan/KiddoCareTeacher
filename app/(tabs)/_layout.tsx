import ActivityModal from '@/components/activity';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  ClipboardCheckIcon,
  HomeIcon,
  MessageCircleIcon,
  PlusCircleIcon,
} from 'lucide-react-native';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';

import AttendanceScreen from './attendance';
import StudentsScreen from './index';
import MessagesScreen from './messages';

const Tab = createBottomTabNavigator();

const iconMap: Record<string, any> = {
  Students: HomeIcon,
  Attendance: ClipboardCheckIcon,
  Activity: PlusCircleIcon,
  Messages: MessageCircleIcon,
};

function CustomTabBar({
  state,
  descriptors,
  navigation,
  openSheet,
}: BottomTabBarProps & { openSheet: () => void }) {
  // Create an Animated value for each tab
  const animationValues = useRef(state.routes.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Animate the currently active tab
    state.routes.forEach((route, index) => {
      const isFocused = state.index === index;
      Animated.timing(animationValues[index], {
        toValue: isFocused ? 1 : 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });
  }, [state.index]);

  return (
    <View className="absolute bottom-6 left-4 right-4 flex-row items-center gap-2">
      <View className="flex-1 flex-row items-center justify-center gap-2 rounded-full bg-primary py-2 shadow-xl">
        {state.routes
          .filter((route) => route.name !== 'Activity')
          .map((route, index) => {
            const { options } = descriptors[route.key];
            const label = options.title ?? route.name;
            const isFocused = state.index === state.routes.findIndex((r) => r.name === route.name);
            const IconComponent = iconMap[route.name];

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

            const scale = animationValues[index].interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.1],
            });

            const backgroundColor = animationValues[index].interpolate({
              inputRange: [0, 1],
              outputRange: ['white', 'white'], // give all tabs a base bg and white for active
            });

            const width = animationValues[index].interpolate({
              inputRange: [0, 1],
              outputRange: [50, 140], // inactive narrower, active wider
            });
            const dynamicWidth = Math.max(label.length * 7, 60);

            return (
              <TouchableOpacity key={route.key} onPress={onPress} activeOpacity={0.7}>
                <Animated.View
                  style={{
                    width,
                    backgroundColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 999,
                    paddingVertical: 11,
                    paddingHorizontal: 10,
                  }}>
                  <Animated.View
                    className="flex-row items-center gap-2"
                    style={{ transform: [{ scale }] }}>
                    <Icon
                      as={IconComponent}
                      size={28}
                      strokeWidth={2.5}
                      color={isFocused ? '#3FBDC8' : '#3FBDC8'}
                    />
                    {isFocused && (
                      <Text
                        style={{ width: dynamicWidth }}
                        className="text-[11px] font-semibold text-primary">
                        {label}
                      </Text>
                    )}
                  </Animated.View>
                </Animated.View>
              </TouchableOpacity>
            );
          })}
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => openSheet()}
        className="items-center justify-center rounded-full bg-orange-500 shadow-xl"
        style={{
          width: 65,
          height: 65,
          elevation: 10,
        }}>
        <Icon as={PlusCircleIcon} size={32} color="white" strokeWidth={2.5} />
      </TouchableOpacity>
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
          tabBar={(props) => <CustomTabBar {...props} openSheet={openSheet} />}>
          <Tab.Screen name="Students" component={StudentsScreen} />
          <Tab.Screen name="Attendance" component={AttendanceScreen} />

          <Tab.Screen name="Messages" component={MessagesScreen} />
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
