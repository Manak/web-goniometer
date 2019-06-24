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
require("./Time.scss");
var TIME_UPDATE_TIME = 10000;
var ALARM_UPDATE_TIME = 1000 * 30;
var timeout = undefined;
var Time = /** @class */ (function (_super) {
    __extends(Time, _super);
    function Time(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            time: "00:00",
            alarm: "",
            alarmVisible: false
        };
        return _this;
    }
    Time.prototype.componentDidMount = function () {
        this.updateTime();
        //this.updateAlarms();
    };
    Time.prototype.updateTime = function () {
        var _this = this;
        clearTimeout(timeout);
        timeout = setTimeout(function () { return _this.updateTime(); }, TIME_UPDATE_TIME);
        var currentTime = new Date();
        var currentHours = currentTime.getHours();
        var currentMinutes = currentTime.getMinutes();
        var currentHoursString = "" + currentHours;
        var currentMinutesString = "" + currentMinutes;
        if (currentHours < 10) {
            currentHoursString = "0" + currentHoursString;
        }
        if (currentMinutes < 10) {
            currentMinutesString = "0" + currentMinutesString;
        }
        this.setState({
            time: currentHoursString + ":" + currentMinutesString
        });
    };
    Time.prototype.updateAlarms = function () {
        var _this = this;
        setTimeout(function () { return _this.updateAlarms(); }, ALARM_UPDATE_TIME);
        fetch("/google-home/alarms")
            .then(function (response) {
            if (response.ok)
                return response.json();
        })
            .then(function (data) {
            if (data.alarm.length == 0) {
                _this.setState({
                    alarm: "",
                });
                return;
            }
            var currentHours = data.alarm[0].time_pattern.hour;
            var currentMinutes = data.alarm[0].time_pattern.minute;
            var currentHoursString = "" + currentHours;
            var currentMinutesString = "" + currentMinutes;
            if (currentHours < 10) {
                currentHoursString = "0" + currentHoursString;
            }
            if (currentMinutes < 10) {
                currentMinutesString = "0" + currentMinutesString;
            }
            _this.setState({
                alarm: currentHoursString + ":" + currentMinutesString
            });
        });
    };
    Time.prototype.showAlarm = function () {
        this.setState({
            alarmVisible: true
        });
    };
    Time.prototype.unshowAlarm = function () {
        this.setState({
            alarmVisible: false
        });
    };
    Time.prototype.render = function () {
        return (React.createElement("div", { className: "time-container" },
            React.createElement("div", { className: "time", style: { opacity: this.state.alarmVisible ? 0.5 : 1 } }, this.state.alarmVisible ? this.state.alarm : this.state.time),
            React.createElement("span", { className: "oi oi-clock show-alarm", style: { display: this.state.alarm == "" ? "none" : "flex" }, "data-glyph": "clock", onTouchStart: this.showAlarm.bind(this), onTouchEnd: this.unshowAlarm.bind(this) })));
    };
    return Time;
}(React.Component));
;
exports.default = Time;
//# sourceMappingURL=Time.js.map