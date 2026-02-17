import ActivityModal from '@/components/activity';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ChevronLeft,
  ClipboardClockIcon,
  Coffee,
  Droplet,
  InfoIcon,
  MessageCircle,
  Moon,
  Phone,
  PlusCircle,
  Toilet,
} from 'lucide-react-native';
import { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const timelineData = [
  { time: '8:00 AM', activity: 'Food' },
  { time: '9:00 AM', activity: 'Milk' },
  { time: '10:00 AM', activity: 'Nap' },
  { time: '11:00 AM', activity: 'Potty' },
  { time: '12:00 PM', activity: 'Food' },
  { time: '1:00 PM', activity: 'Milk' },
  { time: '2:00 PM', activity: 'Nap' },
  { time: '3:00 PM', activity: 'Potty' },
  { time: '12:00 PM', activity: 'Food' },
  { time: '3:00 PM', activity: 'Potty' },
  { time: '3:00 PM', activity: 'Potty' },
  { time: '12:00 PM', activity: 'Food' },
  { time: '3:00 PM', activity: 'Potty' },
  { time: '3:00 PM', activity: 'Potty' },
  { time: '3:00 PM', activity: 'Potty' },
  { time: '4:00 PM', activity: 'Food' },
  { time: '5:00 PM', activity: 'Milk' },
  { time: '6:00 PM', activity: 'Nap' },
  { time: '7:00 PM', activity: 'Potty' },
];

export default function StudentProfileScreen() {
  const { name } = useLocalSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('timeline');
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
  const handleMessage = () => alert(`Messaging ${name}...`);

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <SafeAreaView edges={['top']} className="bg-primary px-5 py-3" style={{ overflow: 'hidden' }}>
        <Image
          source={require('../../assets/images/bg.png')}
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
        <View className="h-24">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => router.back()}
              className="h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/20">
              <Icon as={ChevronLeft} size={32} strokeWidth={2.5} className="mr-[3px] text-white" />
            </TouchableOpacity>
            <View className="flex-row items-center gap-2">
              <View className="h-12 w-12 overflow-hidden rounded-full">
                <Image
                  source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
                  className="h-12 w-12"
                />
              </View>
              <Text className="text-xs font-bold text-white">{name || 'Bessie Cooper'}</Text>
            </View>

            <View className="flex-row gap-2 rounded-full border border-white/30 bg-white/20 px-3">
              <TouchableOpacity
                onPress={() => router.back()}
                className="h-11 w-11 items-center justify-center">
                <Icon as={Phone} size={24} strokeWidth={2.5} className="text-white" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.back()}
                className="h-11 w-11 items-center justify-center">
                <Icon as={MessageCircle} size={24} strokeWidth={2.5} className="text-white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>

      {/* Profile Info */}
      <View className="-mt-10 flex-1 rounded-t-[35px] bg-white px-5">
        {/* <View className="flex-row items-center">
          <TouchableOpacity
            onPress={openSheet}
            className="flex-row items-center gap-2 rounded-full border border-white/30 bg-amber-500 px-5 py-3">
            <Icon as={PlusCircle} size={18} strokeWidth={2.5} className="text-white" />
            <Text className="font-semibold text-white">Add Activity</Text>
          </TouchableOpacity>
        </View> */}

        {/* Tabs */}
        {/* Custom Tabs */}
        <View className="mt-6 flex-1">
          {/* Header Row */}
          <View className="flex-row items-center justify-between">
            <Text className="text-xl font-semibold">
              {activeTab === 'timeline' ? 'Timeline' : 'Info'}
            </Text>

            <View className="flex-row rounded-full bg-gray-100 p-1">
              {/* Timeline Tab */}
              <TouchableOpacity
                onPress={() => setActiveTab('timeline')}
                className={`rounded-full px-4 py-2 ${
                  activeTab === 'timeline' ? 'bg-primary' : ''
                }`}>
                <Icon
                  as={ClipboardClockIcon}
                  size={20}
                  strokeWidth={2}
                  className={activeTab === 'timeline' ? 'text-white' : 'text-black'}
                />
              </TouchableOpacity>

              {/* Info Tab */}
              <TouchableOpacity
                onPress={() => setActiveTab('info')}
                className={`rounded-full px-4 py-2 ${activeTab === 'info' ? 'bg-primary' : ''}`}>
                <Icon
                  as={InfoIcon}
                  size={20}
                  strokeWidth={2}
                  className={activeTab === 'info' ? 'text-white' : 'text-black'}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* CONTENT */}
          {activeTab === 'timeline' && (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={timelineData}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ paddingTop: 16 }}
              renderItem={({ item }) => (
                <View className="mb-4 rounded-[30px] bg-gray-100 p-4">
                  <View className="mb-2 flex-row items-center justify-between">
                    <View className="flex-row items-center gap-2">
                      <View className="h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                        {item.activity === 'Food' && (
                          <Icon as={Coffee} size={20} strokeWidth={2.5} className="text-gray-500" />
                        )}
                        {item.activity === 'Milk' && (
                          <Icon
                            as={Droplet}
                            size={20}
                            strokeWidth={2.5}
                            className="text-gray-500"
                          />
                        )}
                        {item.activity === 'Nap' && (
                          <Icon as={Moon} size={20} strokeWidth={2.5} className="text-gray-500" />
                        )}
                        {item.activity === 'Potty' && (
                          <Icon as={Toilet} size={20} strokeWidth={2.5} className="text-gray-500" />
                        )}
                      </View>
                      <Text className="font-semibold text-gray-800">{item.activity}</Text>
                    </View>
                    <Text className="text-sm text-gray-500">{item.time}</Text>
                  </View>
                  <Text className="text-gray-700">
                    Notes about {item.activity.toLowerCase()} can go here.
                  </Text>
                </View>
              )}
            />
          )}

          {activeTab === 'info' && (
            <ScrollView className="pt-4">
              <Text className="mb-2 text-base text-gray-700">
                <Text className="font-semibold">Name:</Text> {name || 'Bessie Cooper'}
              </Text>
              <Text className="mb-2 text-base text-gray-700">
                <Text className="font-semibold">Age:</Text> 5 years
              </Text>
              <Text className="mb-2 text-base text-gray-700">
                <Text className="font-semibold">Grade/Class:</Text> Kindergarten
              </Text>
              <Text className="mb-2 text-base text-gray-700">
                <Text className="font-semibold">Allergies:</Text> None
              </Text>
              <Text className="mb-2 text-base text-gray-700">
                <Text className="font-semibold">Parent Contact:</Text> (123) 456-7890
              </Text>
              <Text className="mb-2 text-base text-gray-700">
                <Text className="font-semibold">Notes:</Text> Loves drawing and storytelling.
              </Text>
            </ScrollView>
          )}
        </View>
      </View>
      <BottomSheetModalProvider>
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
        {/* FAB - Only for Timeline */}
        {activeTab === 'timeline' && (
          <TouchableOpacity
            onPress={openSheet}
            activeOpacity={0.8}
            className="absolute bottom-6 right-6 h-16 w-16 items-center justify-center rounded-full bg-orange-500 shadow-lg">
            <Icon as={PlusCircle} size={28} strokeWidth={2.5} className="text-white" />
          </TouchableOpacity>
        )}
      </BottomSheetModalProvider>
    </View>
  );
}
