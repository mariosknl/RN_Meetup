import Mapbox, { MapView, Camera, LocationPuck, ShapeSource, CircleLayer } from '@rnmapbox/maps';
import { point, featureCollection } from '@turf/helpers';
import { router } from 'expo-router';
import { View } from 'react-native';

import { useNearbyEvents } from '~/hooks/useNearbyEvents';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_TOKEN as string);

export default function EventsMapView() {
  const events = useNearbyEvents();

  const points = events
    .filter((event) => event.long && event.lat)
    .map((event) => point([event.long, event.lat], { event }));

  return (
    <View className="flex-1">
      <MapView className="h-full w-full flex-1" style={{ height: '100%' }}>
        <Camera followZoomLevel={14} followUserLocation />
        <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={{ isEnabled: true }} />

        <ShapeSource
          id="events"
          shape={featureCollection(points)}
          onPress={(event) => router.push(`/event/${event.features[0].properties.event.id}`)}>
          <CircleLayer
            id="events"
            style={{
              circlePitchAlignment: 'map',
              circleColor: '#42E100',
              circleRadius: 10,
              circleOpacity: 1,
              circleStrokeWidth: 2,
              circleStrokeColor: 'white',
            }}
          />
        </ShapeSource>
      </MapView>
    </View>
  );
}
