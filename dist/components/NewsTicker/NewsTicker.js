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
require("./NewsTicker.scss");
var defaultState = {
    news: [],
    currentIndex: 0,
    opacity: 0,
    displayUrl: null,
};
var UPDATE_NEWS_TIME = 60 * 1000 * 60;
var NewsTicker = /** @class */ (function (_super) {
    __extends(NewsTicker, _super);
    function NewsTicker(props) {
        var _this = _super.call(this, props) || this;
        _this.state = defaultState;
        _this.clearDisplay = _this.clearDisplay.bind(_this);
        _this.showDisplay = _this.showDisplay.bind(_this);
        return _this;
    }
    NewsTicker.prototype.componentDidMount = function () {
        this.updateNews();
        this.animate();
    };
    NewsTicker.prototype.animate = function () {
        var _this = this;
        this.setState({ opacity: 0 });
        setTimeout(function () {
            _this.setState({ currentIndex: (_this.state.currentIndex + 1) % _this.state.news.length, opacity: 1 });
            // this.setState({currentIndex: 2, opacity:1});
            setTimeout(function () { return _this.animate(); }, 12000);
        }, 380);
    };
    NewsTicker.prototype.updateNews = function () {
        var _this = this;
        fetch("/news")
            .then(function (response) {
            if (response.ok)
                return response.json();
        })
            .then(function (data) {
            var sanitize = [];
            for (var i in data.articles) {
                sanitize.push({
                    title: data.articles[i].title,
                    source: data.articles[i].source.name,
                    url: data.articles[i].url,
                });
            }
            _this.setState({
                news: sanitize,
                currentIndex: 0,
            });
            setTimeout(function () { _this.updateNews(); }, UPDATE_NEWS_TIME);
        });
    };
    NewsTicker.prototype.clearDisplay = function () {
        this.setState({
            displayUrl: null
        });
    };
    NewsTicker.prototype.showDisplay = function () {
        this.setState({
            displayUrl: this.state.news[this.state.currentIndex].url
        });
    };
    NewsTicker.prototype.render = function () {
        return this.state.news.length > 0 ? (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "news-ticker" },
                React.createElement("div", { className: "content", style: { opacity: this.state.opacity }, onTouchStart: this.showDisplay },
                    React.createElement("div", { className: "title" }, this.state.news[this.state.currentIndex].title),
                    React.createElement("div", { className: "source" },
                        "-",
                        this.state.news[this.state.currentIndex].source))),
            this.state.displayUrl != null ?
                (React.createElement("div", { className: "news-viewer-container-container", onTouchStart: this.clearDisplay },
                    React.createElement("div", { className: "news-viewer-container" },
                        React.createElement("div", { className: "iframe" },
                            React.createElement("iframe", { src: "https://cors.io/?" + this.state.displayUrl }))))) : (null))) : (React.createElement("div", { className: "news-ticker" }));
    };
    return NewsTicker;
}(React.Component));
;
exports.default = NewsTicker;
//# sourceMappingURL=NewsTicker.js.map