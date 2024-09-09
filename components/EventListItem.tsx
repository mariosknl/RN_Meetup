import { Feather } from '@expo/vector-icons';
import { View, Text, Image } from 'react-native';

const EventListItem = ({ event }) => (
  <View className="gap-3 p-3">
    <View className="flex-row">
      <View className="flex-1 gap-2">
        <Text className="text-lg font-semibold uppercase text-amber-800">
          {event.datetime} · 19:30 CET
        </Text>
        <Text className="text-xl font-bold" numberOfLines={2}>
          {event.title}
        </Text>
        <Text className="text-gray-700">{event.location}</Text>
      </View>

      {/* Event Image */}
      <Image source={{ uri: event.image }} className="aspect-video w-2/5 rounded-xl" />
    </View>

    {/* footer */}
    <View className="flex-row gap-3">
      <Text className="mr-auto text-gray-700">16 going</Text>

      <Feather name="share" size={20} color="gray" />
      <Feather name="bookmark" size={20} color="gray" />
    </View>
  </View>
);

export default EventListItem;