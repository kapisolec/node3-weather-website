const request = require(`request`);

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
    )}.json?access_token=pk.eyJ1Ijoia2FwaXNvbGVjIiwiYSI6ImNrams3c2FrbzFxdmoyeWxvNmVqY252OWMifQ.bOerpLRCiZ-N6E6U_mbsOg&limit=1`;

    request({ url: url, json: true }, (error, response) => {
        if (!error && response) {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitute: response.body.features[0].center[1],
                location: response.body.features[0].place_name,
            });
        } else callback('Problem with fetching an object', undefined);
    });
};

module.exports = geocode;
