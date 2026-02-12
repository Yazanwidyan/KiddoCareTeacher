import ActivityModal from '@/components/activity';
import { Icon } from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ChevronLeft,
  Coffee,
  Droplet,
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
      <SafeAreaView
        edges={['top']}
        className="rounded-b-[50px] bg-primary px-5 pb-3"
        style={{ overflow: 'hidden' }}>
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
        <View className="h-28">
          <View className="flex-row items-center justify-between">
            <BlurView intensity={7} tint="light" className="overflow-hidden rounded-full">
              <TouchableOpacity
                onPress={() => router.back()}
                className="h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/20">
                <Icon as={ChevronLeft} size={32} strokeWidth={3} className="mr-[3px] text-white" />
              </TouchableOpacity>
            </BlurView>
            <BlurView intensity={7} tint="light" className="overflow-hidden rounded-full">
              <View className="flex-row gap-2 rounded-full border border-white/30 bg-white/20 px-3">
                <TouchableOpacity
                  onPress={() => router.back()}
                  className="h-11 w-11 items-center justify-center">
                  <Icon as={Phone} size={24} strokeWidth={3} className="text-white" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => router.back()}
                  className="h-11 w-11 items-center justify-center">
                  <Icon as={MessageCircle} size={24} strokeWidth={3} className="text-white" />
                </TouchableOpacity>
              </View>
            </BlurView>
          </View>
        </View>
      </SafeAreaView>

      {/* Profile Info */}
      <View className="-mt-14 flex-1 px-5">
        <View className="flex-row items-center">
          <View className="h-32 w-32 overflow-hidden rounded-full border-4 border-white">
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
              className="h-32 w-32"
            />
          </View>
          <TouchableOpacity
            onPress={openSheet}
            className="ml-auto mt-16 flex-row items-center gap-2 rounded-full border border-white/30 bg-amber-500 px-5 py-3">
            <Icon as={PlusCircle} size={18} strokeWidth={2} className="text-white" />
            <Text className="font-semibold text-white">Add Activity</Text>
          </TouchableOpacity>
        </View>

        <Text className="mt-4 text-2xl font-bold text-gray-800">{name || 'Bessie Cooper'}</Text>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6 flex-1">
          <TabsList className="bg-gray-200">
            <TabsTrigger value="timeline">
              <Text>Timeline</Text>
            </TabsTrigger>
            <TabsTrigger value="info">
              <Text>Personal Information</Text>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="flex-1">
            <FlatList
              showsVerticalScrollIndicator={false}
              data={timelineData}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ paddingTop: 16, paddingHorizontal: 0 }}
              renderItem={({ item }) => (
                <View className="mb-4 rounded-2xl bg-white p-4">
                  <View className="mb-2 flex-row items-center justify-between">
                    <View className="flex-row items-center gap-2">
                      <View className="h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                        {item.activity === 'Food' && (
                          <Icon as={Coffee} size={20} strokeWidth={2} className="text-gray-500" />
                        )}
                        {item.activity === 'Milk' && (
                          <Icon as={Droplet} size={20} strokeWidth={2} className="text-gray-500" />
                        )}
                        {item.activity === 'Nap' && (
                          <Icon as={Moon} size={20} strokeWidth={2} className="text-gray-500" />
                        )}
                        {item.activity === 'Potty' && (
                          <Icon as={Toilet} size={20} strokeWidth={2} className="text-gray-500" />
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
          </TabsContent>

          <TabsContent value="info">
            <ScrollView className="px-0 pt-4">
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
          </TabsContent>
        </Tabs>
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
      </BottomSheetModalProvider>
    </View>
  );
}
