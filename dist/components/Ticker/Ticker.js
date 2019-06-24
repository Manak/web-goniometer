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
require("./Ticker.scss");
var defaultState = {
    //0 is date //1 is quote //3 is indoor temp //2 is weather
    strings: ["", "", "", ""],
    currentIndex: -1,
    opacity: 0,
};
var UPDATE_DATE_TIME = 60 * 1000;
var UPDATE_QUOTE_TIME = 60 * 1000 * 60;
var UPDATE_WEATHER_TIME = 60 * 1000 * 60;
var UPDATE_INDOOR_TIME = 10 * 1000 * 60;
var Ticker = /** @class */ (function (_super) {
    __extends(Ticker, _super);
    function Ticker(props) {
        var _this = _super.call(this, props) || this;
        _this.state = defaultState;
        return _this;
    }
    Ticker.prototype.componentDidMount = function () {
        this.updateDate();
        this.updateQuote();
        if (this.props.temperature !== false) {
            this.updateIndoorTemp();
            this.updateWeather();
        }
        else {
            var temp = this.state.strings.slice(0);
            temp.pop();
            temp.pop();
            this.setState({
                strings: temp
            });
        }
        this.animate();
    };
    Ticker.prototype.animate = function () {
        var _this = this;
        this.setState({ opacity: 0 });
        setTimeout(function () {
            if (_this.state.strings[(_this.state.currentIndex + 1) % _this.state.strings.length] != "")
                _this.setState({ currentIndex: (_this.state.currentIndex + 1) % _this.state.strings.length, opacity: 1 });
            else
                _this.setState({ currentIndex: (_this.state.currentIndex + 2) % _this.state.strings.length, opacity: 1 });
            // this.setState({currentIndex: 2, opacity:1});
            setTimeout(function () { return _this.animate(); }, 8000);
        }, 380);
    };
    Ticker.prototype.updateDate = function () {
        var _this = this;
        var oldState = this.state;
        var date = new Date();
        oldState.strings[0] = this.dateToString(date.getDay(), date.getDate(), date.getMonth(), date.getFullYear());
        this.setState(oldState);
        setTimeout(function () { return _this.updateDate(); }, UPDATE_DATE_TIME);
    };
    Ticker.prototype.updateQuote = function () {
        var _this = this;
        setTimeout(function () { return _this.updateQuote(); }, UPDATE_QUOTE_TIME);
        fetch("http://api.fruumo.com/quote/?r=" + Math.random())
            .then(function (response) {
            if (response.ok)
                return response.json();
        })
            .then(function (data) {
            var oldState = _this.state;
            oldState.strings[1] = data.quote.trim();
            _this.setState(oldState);
        });
    };
    Ticker.prototype.updateIndoorTemp = function () {
        var _this = this;
        setTimeout(function () { return _this.updateIndoorTemp(); }, UPDATE_INDOOR_TIME);
        fetch("/nest/current-temp")
            .then(function (response) {
            if (response.ok)
                return response.json();
        })
            .then(function (data) {
            var oldState = _this.state;
            oldState.strings[3] = "It's currently " + Math.round(data.temp * 10) / 10 + "&deg;C inside.";
            _this.setState(oldState);
        });
    };
    Ticker.prototype.updateWeather = function () {
        var _this = this;
        setTimeout(function () { return _this.updateWeather(); }, UPDATE_WEATHER_TIME);
        fetch("/weather")
            .then(function (response) {
            if (response.ok)
                return response.json();
        })
            .then(function (weatherData) {
            var oldState = _this.state;
            console.log(weatherData);
            oldState.strings[2] = "<img class=\"weather-icon\" src=\"/static/DarkSky/" + weatherData.currently.icon + ".svg\"/> " + Math.round(weatherData.currently.apparentTemperature * 10) / 10 + "&deg;C";
            _this.setState(oldState);
        });
    };
    Ticker.prototype.dateToString = function (day, d, m, y) {
        var monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var DayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var dateString = DayArray[day] + ", ";
        if (d === 3 || d === 23) {
            dateString += d + "rd of ";
        }
        else if (d === 1 || d === 21 || d === 31) {
            dateString += d + "st of ";
        }
        else if (d == 2 || d == 22) {
            dateString += d + "nd of ";
        }
        else if (d !== 1 || d !== 21 || d !== 31) {
            dateString += d + "th of ";
        }
        dateString += monthArray[m] + " " + y;
        return dateString;
    };
    Ticker.prototype.render = function () {
        return (React.createElement("div", { className: "ticker " + (this.props.largeText ? "large-text" : null) },
            React.createElement("div", { className: "content", style: { opacity: this.state.opacity }, dangerouslySetInnerHTML: { __html: this.state.currentIndex >= 0 ? this.state.strings[this.state.currentIndex] : "&nbsp;" } })));
    };
    return Ticker;
}(React.Component));
;
exports.default = Ticker;
//# sourceMappingURL=Ticker.js.map