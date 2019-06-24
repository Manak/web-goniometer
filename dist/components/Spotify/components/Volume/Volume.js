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
require("./Volume.scss");
var defaultState = {
    volume: 0,
    steps: 0,
    touchStart: -1
};
var VOLUME_TICK_SIZE = 10;
var Volume = /** @class */ (function (_super) {
    __extends(Volume, _super);
    function Volume(props) {
        var _this = _super.call(this, props) || this;
        _this.state = defaultState;
        _this.touchStart = _this.touchStart.bind(_this);
        _this.touchMove = _this.touchMove.bind(_this);
        _this.touchEnd = _this.touchEnd.bind(_this);
        return _this;
    }
    Volume.prototype.componentDidMount = function () {
        this.getVolume();
    };
    Volume.prototype.getVolume = function () {
        var _this = this;
        fetch("/spotify/current-state?r=" + Math.random())
            .then(function (response) {
            if (response.ok)
                return response.json();
        })
            .then(function (data) {
            if (!data.device.volume_percent) {
                return;
            }
            _this.setState({
                volume: data.device.volume_percent
            });
        });
    };
    Volume.prototype.touchStart = function (e) {
        this.props.volumeChange(this.state.volume, 0);
        this.setState({ touchStart: e.touches[0].clientY });
    };
    Volume.prototype.touchMove = function (e) {
        var _this = this;
        e.preventDefault();
        e.stopPropagation();
        var step = Math.floor((this.state.touchStart - e.touches[0].clientY) / VOLUME_TICK_SIZE);
        if (step + this.state.volume > 100 || step + this.state.volume < 0) {
            return;
        }
        this.setState({
            steps: step
        }, function () {
            _this.props.volumeChange(_this.state.volume, _this.state.steps);
        });
    };
    Volume.prototype.touchEnd = function (e) {
        var _this = this;
        this.setState({
            volume: this.state.volume + this.state.steps,
            steps: 0,
            touchStart: -1,
        }, function () {
            fetch("/spotify/set-volume?volume=" + _this.state.volume)
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                this.getVolume();
            });
        });
    };
    Volume.prototype.render = function () {
        return (React.createElement("div", { className: "volume-touch-container-container" },
            React.createElement("div", { onTouchStart: this.touchStart, onTouchMove: this.touchMove, onTouchEnd: this.touchEnd, className: "volume-touch-container" })));
    };
    return Volume;
}(React.Component));
;
exports.default = Volume;
//# sourceMappingURL=Volume.js.map