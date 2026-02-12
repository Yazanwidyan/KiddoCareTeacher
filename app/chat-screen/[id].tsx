import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Audio } from 'expo-av';
import { BlurView } from 'expo-blur';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams } from 'expo-router';
import { Check, Image as ImageIcon, Mic, Paperclip } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type MessageStatus = 'sent' | 'delivered' | 'seen';

type Message = {
  id: number;
  text?: string;
  image?: string;
  audio?: string;
  sender: 'teacher' | 'parent';
  status?: MessageStatus;
};

export default function ChatScreen() {
  const { name } = useLocalSearchParams();
  const flatListRef = useRef<FlatList>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello teacher!',
      sender: 'parent',
    },
    {
      id: 2,
      text: 'Hello 👋 how can I help?',
      sender: 'teacher',
      status: 'seen',
    },
  ]);

  const [input, setInput] = useState('');
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  // Auto scroll
  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  // ---------------- TEXT MESSAGE ----------------
  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'teacher',
      status: 'sent',
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    // simulate delivery + seen
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === newMessage.id ? { ...m, status: 'delivered' } : m))
      );
    }, 1000);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === newMessage.id ? { ...m, status: 'seen' } : m))
      );
    }, 2000);
  };

  // ---------------- IMAGE ----------------
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.7,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          image: result.assets[0].uri,
          sender: 'teacher',
          status: 'sent',
        },
      ]);
    }
  };

  // ---------------- DOCUMENT ----------------
  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync();

    if (result.assets) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: `📎 ${result.assets[0].name}`,
          sender: 'teacher',
          status: 'sent',
        },
      ]);
    }
  };

  // ---------------- VOICE ----------------
  const startRecording = async () => {
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({ allowsRecordingIOS: true });

    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );

    setRecording(recording);
  };

  const stopRecording = async () => {
    if (!recording) return;

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        audio: uri!,
        sender: 'teacher',
        status: 'sent',
      },
    ]);

    setRecording(null);
  };

  // ---------------- RENDER ----------------
  const renderStatus = (status?: MessageStatus) => {
    if (!status) return null;

    if (status === 'sent') return <Check size={14} color="#ccc" />;

    if (status === 'delivered')
      return (
        <>
          <Check size={14} color="#ccc" />
          <Check size={14} color="#ccc" style={{ marginLeft: -6 }} />
        </>
      );

    if (status === 'seen')
      return (
        <>
          <Check size={14} color="#3b82f6" />
          <Check size={14} color="#3b82f6" style={{ marginLeft: -6 }} />
        </>
      );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-background">
      {/* Header */}
      <SafeAreaView
        edges={['top']}
        className="border-b border-border px-5"
        style={{ overflow: 'hidden' }}>
        <View className="h-12">
          <View className="flex-row items-center justify-between">
            <Text className="text-xl font-bold">{name}</Text>
          </View>
        </View>
      </SafeAreaView>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View
            className={`mb-3 max-w-[75%] rounded-xl p-3 ${
              item.sender === 'teacher' ? 'self-end bg-primary' : 'self-start bg-muted'
            }`}>
            {item.text && (
              <Text className={item.sender === 'teacher' ? 'text-white' : 'text-foreground'}>
                {item.text}
              </Text>
            )}

            {item.image && <Image source={{ uri: item.image }} className="h-40 w-40 rounded-xl" />}

            {item.audio && (
              <TouchableOpacity
                onPress={async () => {
                  const { sound } = await Audio.Sound.createAsync({ uri: item.audio });
                  await sound.playAsync();
                }}
                className="rounded-xl bg-muted px-4 py-2">
                <Text>🎤 Voice Message</Text>
              </TouchableOpacity>
            )}

            {item.sender === 'teacher' && (
              <View className="mt-1 flex-row justify-end">{renderStatus(item.status)}</View>
            )}
          </View>
        )}
      />

      {/* Input Bar */}
      <View className="flex-row items-center gap-2 border-t border-border bg-card p-3">
        <TouchableOpacity onPress={pickDocument}>
          <Icon as={Paperclip} size={18} strokeWidth={2} className="text-foreground" />
        </TouchableOpacity>

        <TouchableOpacity onPress={pickImage}>
          <Icon as={ImageIcon} size={18} strokeWidth={2} className="text-foreground" />
        </TouchableOpacity>

        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          className="flex-1 rounded-full bg-muted px-4 py-2"
        />

        {recording ? (
          <TouchableOpacity onPress={stopRecording}>
            <Text className="font-semibold text-red-500">Stop</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={startRecording}>
            <Icon as={Mic} size={18} strokeWidth={2} className="text-foreground" />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={sendMessage} className="rounded-full bg-primary px-4 py-2">
          <Text className="font-semibold text-white">Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
