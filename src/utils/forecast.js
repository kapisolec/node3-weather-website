const request = require(`request`);

const forecast = (latitude, longitute, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=6e8c9380dc3218e683449dc56850cbcc&query=${latitude},${longitute}`;

    request({ url: url, json: true }, (error, response) => {
        response = response.body;
        if (!error && response) {
            callback(
                undefined,
                `Currently temperature is ${response.current.temperature}, weather is ${response.current.weather_descriptions[0]} and it feels like ${response.current.feelslike}`
            );
        } else callback('Problem with fetching an object', undefined);
    });
};

module.exports = forecast;
