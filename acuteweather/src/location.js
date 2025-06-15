export function getLocation() {
  return new Promise((resolve) => {
    // Fallback location is London
    const fallback = {
      latitude: 51.5074,
      longitude: -0.1278,
      accuracy: null,
      fallback: true,
    };

    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser. Showing weather information for London.");
      resolve(fallback);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve({
          latitude: coords.latitude,
          longitude: coords.longitude,
          accuracy: coords.accuracy,
          fallback: false,
        });
      },
      () => {
        alert("Unable to retrieve location. Showing weather information for London.");
        resolve(fallback);
      }
    );
  });
}