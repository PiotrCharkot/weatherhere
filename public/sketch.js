
let lat, lng;
if ('geolocation' in navigator) {
    
                    
        navigator.geolocation.getCurrentPosition(async position => {
        
            try {
                lat = position.coords.latitude;
                lng = position.coords.longitude;
                            
                document.getElementById('lat').textContent = lat.toFixed(2);
                document.getElementById('lng').textContent = lng.toFixed(2);
                
                                
                const api_url = `/weather/lat/${lat}/lng/${lng}`
                const response = await fetch(api_url);
                const json = await response.json();
                console.log(json);

                const summary = json.openWeather.weather[0].description;
                const teperature = json.openWeather.main.temp;
                const airQuality = json.aqWeather.results[0].measurements[2].value;
                const lastUpdate = json.aqWeather.results[0].measurements[2].lastUpdated;
                const parameter = json.aqWeather.results[0].measurements[2].parameter;

                document.getElementById('summary').textContent = summary;
                document.getElementById('temperature').textContent = teperature;
                document.getElementById('parameter').textContent = parameter;
                document.getElementById('value').textContent = airQuality;
                document.getElementById('update').textContent = lastUpdate;


                const time = Date.now();
        const data = { lat, lng, time, json };
    
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                    },
                body: JSON.stringify(data)
                        };
    
        const response_res = await fetch('/api', options);
        const json_data = await response_res.json();
        console.log(json_data);

            } catch(error) {
                console.log(error);
                console.log('something went wrong');
                document.getElementById('value').textContent = 'NO READING';
            }
                    
    
        
                 })    
            
        } else {
            console.log('geo is not here');
            }