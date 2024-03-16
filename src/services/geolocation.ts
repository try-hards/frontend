type Coords = {
  lng: number;
  lat: number;
};

export async function getCurrentCoords(): Promise<Coords> {
  if (!navigator.geolocation) {
    throw new Error('Geolocation is not supported by your browser.');
  }

  const position = await new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        storeCoords(position);
        resolve(position);
      },
      () => {
        reject(new Error('Unable to retrieve your location.'));
      },
    );
  });

  return {
    lng: position.coords.longitude,
    lat: position.coords.latitude,
  };
}

export function getLastKnownCoords(): Coords | undefined {
  const coords = restoreCoords();
  return coords;
}

function storeCoords(location: GeolocationPosition) {
  const coords = {
    lng: location.coords.longitude,
    lat: location.coords.latitude,
  };
  localStorage.setItem('coords', JSON.stringify(coords));
}

function restoreCoords(): Coords | undefined {
  const coords = localStorage.getItem('coords');
  if (coords) {
    return JSON.parse(coords);
  }
  return undefined;
}
