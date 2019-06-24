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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_swipeable_1 = require("react-swipeable");
var rc_progress_1 = require("rc-progress");
require("./Spotify.scss");
var Volume_1 = require("./components/Volume/Volume");
var defaultState = {
    artistName: "",
    songName: "",
    playing: false,
    albumCover: "",
    songLength: 0,
    currentPos: 0,
    currentVolume: -1,
};
var DEFAULT_CHECK_TIMER = 20 * 1000;
var PROGRESS_UPDATE_TIME = 1000;
var checkTimer = DEFAULT_CHECK_TIMER + 0;
var timer = undefined;
var progressTimer = undefined;
var volumeTimer = undefined;
var Spotify = /** @class */ (function (_super) {
    __extends(Spotify, _super);
    function Spotify(props) {
        var _this = _super.call(this, props) || this;
        _this.state = defaultState;
        return _this;
    }
    Spotify.prototype.componentDidMount = function () {
        this.updateSpotify();
    };
    Spotify.prototype.updateSpotify = function () {
        var _this = this;
        if (timer)
            clearTimeout(timer);
        timer = setTimeout(function () { return _this.updateSpotify(); }, checkTimer);
        fetch("/spotify/now-playing?r=" + Math.random())
            .then(function (response) {
            if (response.ok)
                return response.json();
        })
            .then(function (data) {
            if (!data.is_playing) {
                checkTimer = DEFAULT_CHECK_TIMER;
                timer = setTimeout(function () { _this.updateSpotify(); }, checkTimer);
                _this.setState(defaultState);
                return;
            }
            //const remainingTime:number = data.item.duration_ms - data.progress_ms + 2000;
            checkTimer = 10000;
            _this.setState({
                songName: data.item.name,
                artistName: data.item.artists[0].name,
                playing: true,
                albumCover: data.item.album.images[0].url,
                songLength: data.item.duration_ms,
                currentPos: data.progress_ms,
            });
            clearTimeout(progressTimer);
            progressTimer = setTimeout(function () { return _this.updateProgress(); }, PROGRESS_UPDATE_TIME);
        });
    };
    Spotify.prototype.updateProgress = function () {
        var _this = this;
        if (this.state.songLength != 0) {
            progressTimer = setTimeout(function () { return _this.updateProgress(); }, PROGRESS_UPDATE_TIME);
        }
        if (this.state.currentPos >= this.state.songLength) {
            this.updateSpotify();
        }
        this.setState(__assign({}, this.state, { currentPos: this.state.currentPos + PROGRESS_UPDATE_TIME }));
    };
    Spotify.prototype.previousTrack = function () {
        fetch("/spotify/previous?r=" + Math.random())
            .then(function (response) {
            if (response.ok)
                return response.json();
        });
    };
    Spotify.prototype.nextTrack = function () {
        fetch("/spotify/next?r=" + Math.random())
            .then(function (response) {
            if (response.ok)
                return response.json();
        });
    };
    Spotify.prototype.ppTrack = function () {
        var _this = this;
        fetch("/spotify/pp?r=" + Math.random())
            .then(function (response) {
            _this.updateSpotify();
            if (response.ok)
                return response.json();
        });
    };
    Spotify.prototype.handleSwipe = function (event) {
        var _this = this;
        if (event.dir == "Right") {
            this.previousTrack();
        }
        else if (event.dir == "Left") {
            this.nextTrack();
        }
        else {
            this.ppTrack();
        }
        setTimeout(function () { return _this.updateSpotify(); }, 500);
    };
    Spotify.prototype.volumeChange = function (initial, steps) {
        var _this = this;
        this.setState({
            currentVolume: initial + steps,
        });
        clearTimeout(volumeTimer);
        volumeTimer = setTimeout(function () {
            _this.setState({ currentVolume: -1 });
        }, 2000);
    };
    Spotify.prototype.render = function () {
        return (this.state.playing ? (React.createElement("div", { className: "spotify-container-container-container " + (this.props.displayTop === true ? "top" : "") },
            React.createElement("div", { className: "spotify-container-container" },
                React.createElement(react_swipeable_1.Swipeable, { onSwiped: this.handleSwipe.bind(this), delta: 20, className: "touch-container" },
                    React.createElement("div", { className: "spotify-container" },
                        React.createElement("div", { className: "image-container" },
                            React.createElement(rc_progress_1.Circle, { percent: "" + (this.state.currentPos / this.state.songLength) * 100, strokeWidth: "8", strokeColor: "#1DB954", trailColor: "transparent" }),
                            React.createElement("img", { src: this.state.albumCover, alt: "" })),
                        React.createElement("div", { className: "info-container" },
                            React.createElement("div", { className: "title" }, this.state.currentVolume != -1 ?
                                "Volume: " + this.state.currentVolume + "%" : this.state.songName),
                            React.createElement("div", { className: "artist" }, this.state.artistName))))),
            React.createElement(Volume_1.default, { volumeChange: this.volumeChange.bind(this) }))) : (React.createElement("div", { className: "spotify-container-container-container" },
            React.createElement("div", { className: "spotify-container-container" },
                React.createElement(react_swipeable_1.Swipeable, { onSwiped: this.handleSwipe.bind(this), delta: 20, className: "touch-container" },
                    React.createElement("div", null))))));
    };
    return Spotify;
}(React.Component));
;
exports.default = Spotify;
//# sourceMappingURL=Spotify.js.map