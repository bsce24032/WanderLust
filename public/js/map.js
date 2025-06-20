mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map",
  center: listing.geometry.coordinates,
  zoom: 9,
});

console.log(listing.geometry.coordinates);

new mapboxgl.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25, className: "my-class" })
      .setHTML(`<h4>${listing.title}</h4><p>Exact location will be provided after booking</p>`)
  )
  .addTo(map);