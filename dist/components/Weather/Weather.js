"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("./Weather.scss");
var defaultState = {
    current: null,
    forecast: [],
};
var UPDATE_WEATHER_TIME = 60 * 1000 * 60;
var Weather = /** @class */ (function (_super) {
    __extends(Weather, _super);
    function Weather(props, state) {
        var _this = _super.call(this, props) || this;
        _this.state = defaultState;
        return _this;
    }
    Weather.prototype.componentDidMount = function () {
        this.updateWeather();
    };
    Weather.prototype.updateWeather = function () {
        var _this = this;
        setTimeout(function () { return _this.updateWeather(); }, UPDATE_WEATHER_TIME);
        fetch("/weather")
            .then(function (response) {
            if (response.ok)
                return response.json();
        })
            .then(function (weatherData) {
            _this.setState({
                current: weatherData.currently,
                forecast: weatherData.hourly.data,
            });
        });
    };
    Weather.prototype.displayForecast = function () {
        return this.state.forecast.slice(1, 9).map(function (weather) {
            var hour = new Date((weather.time) * 1000).getHours();
            var timeString = hour + ":00";
            if (hour < 10) {
                timeString = "0" + timeString;
            }
            return (React.createElement("div", { className: "weather", key: weather.time },
                React.createElement("div", { className: "temperature" },
                    " ",
                    weather.temperature.toFixed(0),
                    " \u00B0C"),
                React.createElement("div", { className: "condition-icon" },
                    React.createElement("img", { src: "/static/DarkSky/" + weather.icon + ".svg", alt: "" })),
                React.createElement("div", { className: "time" }, timeString)));
        });
    };
    Weather.prototype.render = function () {
        if (this.state.current == null || this.state.forecast.length == 0) {
            return null;
        }
        return (React.createElement("div", { className: "weather-container-container" },
            React.createElement("div", { className: "weather-container" },
                React.createElement("div", { className: "now" },
                    React.createElement("div", { className: "weather" },
                        React.createElement("div", { className: "temperature" },
                            " ",
                            this.state.current.temperature.toFixed(0),
                            " \u00B0C"),
                        React.createElement("div", { className: "condition-icon" },
                            React.createElement("img", { src: "/static/DarkSky/" + this.state.current.icon + ".svg", alt: "" })),
                        React.createElement("div", { className: "time" }, this.state.current.summary))),
                React.createElement("div", { className: "forecast" }, this.displayForecast()))));
    };
    return Weather;
}(React.Component));
;
exports.default = Weather;
//# sourceMappingURL=Weather.js.map