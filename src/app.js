const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars, engine, views locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static dir to serve
app.use(express.static(path.join(__dirname, `../public`)));

// HTML CALLS & RESPONSES
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: `Kacper Maj`,
        pageName: 'Weather app',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: `Kacper Maj`,
        pageName: 'About me',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help me!',
        name: `Kacper Maj`,
        pageName: 'Help',
    });
});

app.get('/help/*', (req, res) => {
    res.render('help', {
        title: 'Article not found',
        name: `Kacper Maj`,
        pageName: '404 error',
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address)
        return res.send('You neet to provide an address to search');

    geocode(req.query.address, (_, data) => {
        console.log(data);
        forecast(data.longitute, data.latitude, (_, dataForecast) => {
            console.log(dataForecast);
            res.send({
                address: req.query.address,
                location: data.location,
                forecast: dataForecast,
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.something) {
        return res.send({ error: 'something not provided' });
    }
    console.log(req.query);
    res.send({
        products: [],
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'page not found',
        name: `Kacper Maj`,
        pageName: '404 error',
    });
});

app.listen(port, 'localhost', () => {
    console.log(`server is up on port ${port}`);
});
