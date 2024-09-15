const API_BASE_URL = 'https://api.mapbox.com/search/searchbox/v1';
const ACCESS_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_TOKEN;

export const getSuggestions = async (input: string, session_token: string) => {
  const response = await fetch(
    `${API_BASE_URL}/suggest?q=${input}+par&language=en&proximity=-73.990593,40.740121&session_token=${session_token}&access_token=${ACCESS_TOKEN}`
  );

  const json = await response.json();
  return json;
};

export const retrieveDetails = async (id: string, session_token: string) => {
  const response = await fetch(
    `${API_BASE_URL}/retrieve/${id}?session_token=${session_token}&access_token=${ACCESS_TOKEN}`
  );

  const json = await response.json();
  return json;
};
