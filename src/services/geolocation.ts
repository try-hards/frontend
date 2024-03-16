export async function getCurrentLocation() {
  if (!navigator.geolocation) {
    throw new Error('Geolocation is not supported by your browser.');
  }

  const position = await new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      () => {
        reject(new Error('Unable to retrieve your location.'));
      },
      // {
      //   enableHighAccuracy: false,
      // },
    );
  });

  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
}
