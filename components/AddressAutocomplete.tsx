import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, TextInput, View, Text, Pressable } from 'react-native';
import { useAuth } from '~/contexts/AuthProvider';

import { getSuggestions, retrieveDetails } from '~/utils/AddressAutocomplete';

export default function AddressAutocomplete({ onSelected }) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState();

  const { session } = useAuth();

  const search = async () => {
    const data = await getSuggestions(input, session.access_token);

    setSuggestions(data.suggestions);
  };

  const onSuggestionsClick = async (suggestion) => {
    setSelectedLocation(suggestion);
    setInput(suggestion.name);
    setSuggestions([]);

    const details = await retrieveDetails(suggestion.mapbox_id, session.access_token);

    onSelected(details);
  };

  return (
    <View>
      <View className="flex flex-row items-center gap-3">
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Location"
          className="flex-1 rounded-md border border-gray-200 p-3"
        />
        <FontAwesome onPress={search} name="search" size={24} color="black" />
      </View>

      <View className="gap-2">
        {suggestions.map((item) => (
          <Pressable
            onPress={() => onSuggestionsClick(item)}
            className="border border-gray-300 p-2"
            key={item.mapbox_id}>
            <Text className="font-bold">{item.name}</Text>
            <Text>{item.place_formatted}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
