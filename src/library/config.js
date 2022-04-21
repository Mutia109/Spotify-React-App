const getBaseUrl =  ()  => {
  const protocol = window.location.protocol;
  const host = window.location.host;

  return `${protocol}//${host}`;
}

const config = {
  SPOTIFY_BASE_URL: 'https://api.spotify.com/v1',
  SPOTIFY_SCOPE: 'playlist-modify-private',
  BASE_URL: getBaseUrl(),
}

export default config;