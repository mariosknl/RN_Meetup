import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker';

import Avatar from '~/components/Avatar';
import { useAuth } from '~/contexts/AuthProvider';
import { supabase } from '~/utils/supabase';

export default function CreateEvent() {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [imageUrl, setImageUrl] = useState<string>('');

  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const createEvent = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('events')
      .insert([
        {
          title,
          description,
          date: date.toISOString(),
          user_id: user.id,
          image_uri: imageUrl,
          location_point: 'POINT(21.74879 -38.22775)',
        },
      ])
      .select()
      .single();

    if (error) {
      Alert.alert('Failed to create the event', error.message);
    } else {
      setTitle('');
      setDescription('');
      setDate(new Date());
      setLoading(false);
      router.push(`/event/${data.id}`);
    }
  };

  return (
    <View className="flex-1 gap-5 bg-white p-5">
      <View className="items-center">
        <Avatar
          size={200}
          url={imageUrl}
          onUpload={(url: string) => {
            setImageUrl(url);
          }}
        />
      </View>

      <TextInput
        value={title}
        // onChangeText={(text) => setTitle(text)}
        onChangeText={setTitle}
        placeholder="Title"
        className="rounded-md border border-gray-200 p-3"
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
        className="min-h-32 rounded-md border border-gray-200 p-3"
      />
      <Text className="rounded-md border border-gray-200 p-3" onPress={() => setOpen(true)}>
        {date.toLocaleString()}
      </Text>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        minimumDate={new Date()}
        minuteInterval={15}
      />

      <Pressable
        className="mt-auto items-center rounded-md bg-red-500 p-3 px-8"
        onPress={() => createEvent()}
        disabled={loading}>
        <Text className="text-lg font-bold text-white">Create event</Text>
      </Pressable>
    </View>
  );
}
