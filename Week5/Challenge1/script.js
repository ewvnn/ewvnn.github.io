const weather_type_images = {
    "Clear": "images/clear.jpg",
    "Clouds": "images/clouds.jpg",
    "Haze": "images/haze.jpg",
    "Mist": "images/mist.jpg",
    "Rain": "images/rain.jpg",
    "Smoke": "images/smoke.jpg",
    "Snow": "images/snow.jpg",
    "Thunderstorm": "images/thunderstorm.jpg"
};

const temp_images = {
    "Hot": "images/hot.jpg",   // Celsius > 25
    "Okay": "images/okay.jpg", // Celsius 5-25
    "Cold": "images/cold.jpg"  // Celsius < 5
};


// DO NOT CHANGE THE FUNCTION SIGNATURE
function check_weather() {

    console.log("=== [START] check_weather() ===");

    //============================================================================
    // Task 1
    // Key in your own OpenWeatherMap.org API key (DO NOT SHARE IT WITH OTHERS)
    //============================================================================
    const weather_api_key = '08c8f631b3aaa95f6628204508437904';


    //============================================================================
    // Task 2
    // Retrieve the user input (city name) from <input>
    //============================================================================
    // const city = 'Moscow'; // Default value, you need to replace this string with actual user input
    let city = document.getElementById('city').value;
    // console.log(city);


    // DO NOT MODIFY THIS
    let api_endpoint = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather_api_key}&units=metric`;


    axios.get(api_endpoint)
    .then(response => {
        // Inspect what's in the API response
        // console.log(response.data);

        //============================================================================
        // Task 3
        // Retrieve the weather info (e.g. Rain, Clouds, etc.)
        //============================================================================
        
        // YOUR CODE GOES HERE
        // Make use of const weather_type_images (at the top)
        let cur_weather_array = response.data.weather; // an array 
        // console.log(cur_weather_type);
        let cur_temp = response.data.main.temp;
        console.log(cur_temp);


        //======================================================================================
        // Task 4
        // Perform JavaScript DOM to reflect weather info and temperature info in the HTML page.
        //======================================================================================

        // YOUR CODE GOES HERE
        // Make use of const temp_images (at the top)
        let weather_imgs_src_array = []; // aray of src links

        for (let weather of cur_weather_array) {

            // console.log(weather.main);
            let cur_weather = weather.main;
            weather_imgs_src_array.push(weather_type_images[cur_weather]);
        }
        // console.log(weather_imgs_src_array);

        let cur_temp_img = '';
        if (cur_temp > 25) {
            cur_temp_img = "images/hot.jpg";
        }
        else if (cur_temp >= 5) {
            cur_temp_img = "images/okay.jpg";
        }
        else {
            cur_temp_img = "images/cold.jpg";
        }
        console.log(cur_temp_img);
        let weather_images = document.getElementById('weather_images');
        weather_images.innerHTML = '';
        for (img of weather_imgs_src_array) {
            let img_tag = document.createElement('img');
            img_tag.setAttribute('src', img);    
            weather_images.appendChild(img_tag);
        }
        
        


        let temparature_image = document.getElementById('temperature_image');
        // console.log(temparature_image);
        // temparature_image.innerHTML = '';
        temparature_image.setAttribute('src', cur_temp_img);



    })
    .catch(error => {
        console.log(error.message);
    })
    
    console.log("=== [END] check_weather() ===");
}
