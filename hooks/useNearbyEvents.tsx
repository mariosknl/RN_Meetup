import * as Location from 'expo-location';
import { useState, useEffect } from 'react';

import { NearbyEvent } from '~/types/db';
import { supabase } from '~/utils/supabase';

export const useNearbyEvents = () => {
  const [events, setEvents] = useState<NearbyEvent[]>([]);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  const [status, requestPermission] = Location.useForegroundPermissions();

  useEffect(() => {
    if (status && !status.granted && status.canAskAgain) {
      requestPermission();
    }
  }, [status]);

  useEffect(() => {
    (async () => {
      if (!status?.granted) {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, [status]);

  useEffect(() => {
    if (location) {
      fetchNearbyEvents();
    }
  }, [location]);

  const fetchNearbyEvents = async () => {
    if (!location) return;

    const { data, error } = await supabase.rpc('nearby_events', {
      lat: location.coords.latitude,
      long: location.coords.longitude,
    });

    if (data) {
      setEvents(data);
    }
  };

  return events;
};
