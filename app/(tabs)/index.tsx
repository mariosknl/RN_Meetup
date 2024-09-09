import { Stack } from 'expo-router';
import { FlatList } from 'react-native';

import events from '~/assets/events.json';
import EventListItem from '~/components/EventListItem';

export default function Events() {
  return (
    <>
      <Stack.Screen options={{ title: 'Events' }} />

      <FlatList
        data={events}
        renderItem={({ item }) => <EventListItem event={item} />}
        keyExtractor={(item) => item.id}
        className="bg-white"
      />
    </>
  );
}
