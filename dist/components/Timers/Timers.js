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
require("./Timers.scss");
var defaultState = {
    endTime: 0,
    id: "",
    display: "",
};
var Timers = /** @class */ (function (_super) {
    __extends(Timers, _super);
    function Timers(props) {
        var _this = _super.call(this, props) || this;
        _this.state = defaultState;
        return _this;
    }
    Timers.prototype.componentDidMount = function () {
        //this.updateDisplay();
        //this.updateTimers();
    };
    Timers.prototype.updateTimers = function () {
        var _this = this;
        setTimeout(function () { return _this.updateTimers(); }, 30000);
        fetch("/google-home/alarms")
            .then(function (response) {
            if (response.ok)
                return response.json();
        })
            .then(function (data) {
            if (data.timer.length == 0) {
                _this.setState(defaultState);
                return;
            }
            if (_this.state.id == "") {
                _this.setState({
                    id: data.timer[0].id,
                    endTime: data.timer[0].fire_time
                });
            }
            else {
                if (!data.timer.find(function (element) { return element.id == _this.state.id; })) {
                    _this.setState({
                        id: data.timer[0].id,
                        endTime: data.timer[0].fire_time
                    });
                }
            }
        });
    };
    Timers.prototype.updateDisplay = function () {
        var _this = this;
        setTimeout(function () { return _this.updateDisplay(); }, 1000);
        if (this.state.id == "") {
            this.setState({
                display: ""
            });
            return;
        }
        if (this.state.display == "0:00") {
            return;
        }
        this.setState({
            display: this.millisToMinutesAndSeconds(this.state.endTime - new Date().getTime())
        });
    };
    Timers.prototype.millisToMinutesAndSeconds = function (millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = Math.floor((millis % 60000) / 1000);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    };
    Timers.prototype.render = function () {
        return this.state.display != "" ? (React.createElement("div", { className: "timer-container" },
            React.createElement("span", { className: "oi oi-timer" }),
            " ",
            this.state.display)) : (React.createElement("div", { className: "timer-container" }));
    };
    return Timers;
}(React.Component));
;
exports.default = Timers;
//# sourceMappingURL=Timers.js.map