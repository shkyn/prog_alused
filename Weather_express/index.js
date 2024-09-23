const express = require("express")
const app = express()
const path = require("path")
const fetch = require("node-fetch")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views")) // Fixed apps.et and __dirname typo

const key = "77f97b598769bf8861004c74e30ebbba"
let city = "Tartu"

app.get("/", function (req, res) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
        .then((response) => { // Fixed responce to response
            return response.json()
        })
        .then((data) => {
            console.log(data)
            res.render("index", { weatherData: data }) // Pass data to your template if needed
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error)
            res.render("index", { weatherData: null, error: "Error fetching data" })
        })
})

app.listen(3000)
