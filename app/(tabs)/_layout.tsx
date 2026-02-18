import ActivitiesListModal from '@/components/ActivitiesListModal';
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

import StudentsScreen from './index';
import MessagesScreen from './messages';

const Tab = createBottomTabNavigator();

const iconMap: Record<string, any> = {
  Students: HomeIcon,
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
    <View className="absolute bottom-6 left-11 right-11 flex-row items-center gap-2 shadow-2xl">
      <View className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl bg-black py-2">
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
                  className={'rounded-xl p-2.5'}
                  style={{
                    width,
                    backgroundColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Animated.View
                    className="flex-row items-center gap-2"
                    style={{ transform: [{ scale }] }}>
                    <Icon
                      as={IconComponent}
                      size={26}
                      strokeWidth={2.5}
                      color={isFocused ? '#000' : '#000'}
                    />
                    {isFocused && (
                      <Text
                        style={{ width: dynamicWidth }}
                        className="text-[11px] font-semibold text-black">
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
        className="items-center justify-center rounded-2xl bg-black"
        style={{
          width: 62,
          height: 62,
          elevation: 10,
        }}>
        <View className="rounded-xl bg-white p-2.5">
          <Icon as={PlusCircleIcon} size={26} color="black" strokeWidth={2.5} />
        </View>
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
            <ActivitiesListModal />
          </BottomSheetScrollView>
        </BottomSheetModal>
      </>
    </BottomSheetModalProvider>
  );
}
