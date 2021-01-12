const mymap = L.map('checkinMap').setView([0, 0], 1);

        const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
        const id = 'mapbox/streets-v11';
        const accessToken = 'pk.eyJ1IjoicGlvdHJjaGFya290IiwiYSI6ImNramhxdWV2azByYnMydHFvYXQ3OXA5am4ifQ.GPuDeFtMye3caWgBGxTFmw';

        const tileUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
        const tiles = L.tileLayer(tileUrl, { attribution, id, accessToken });
        tiles.addTo(mymap);


getData();

async function getData() {
    const response = await fetch('/api');
    const data = await response.json();
    console.log(data);



for (item of data) {

    const marker = L.marker([item.lat, item.lng]).addTo(mymap);

    const text = `Concentration of ${item.json.aqWeather.results[0].measurements[2].parameter}
     is ${item.json.aqWeather.results[0].measurements[2].value} last updated on ${item.json.aqWeather.results[0].measurements[2].lastUpdated}.`

    marker.bindPopup(text);

    // const root = document.createElement('p');
    // const geo = document.createElement('div');
    // const date = document.createElement('div');
   

    // geo.textContent = `latitude: ${item.lat}°, longitude: ${item.lng}° `;
    // const dateString = Date(item.timestamp);
    // date.textContent = dateString;
    

    // root.append(geo, date);
    // document.body.append(root);

}
}
