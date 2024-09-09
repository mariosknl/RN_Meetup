import { Stack } from 'expo-router';

import events from '~/assets/events.json';
import EventListItem from '~/components/EventListItem';

const event = events[0];

export default function Events() {
  return (
    <>
      <Stack.Screen options={{ title: 'Events' }} />

      <EventListItem event={event} />
    </>
  );
}
