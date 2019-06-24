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
var Wallpaper_1 = require("../Wallpaper/Wallpaper");
require("./App.scss");
var Time_1 = require("../Time/Time");
var Spotify_1 = require("../Spotify/Spotify");
var Ticker_1 = require("../Ticker/Ticker");
var NewsTicker_1 = require("../NewsTicker/NewsTicker");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        return _super.call(this, props) || this;
    }
    App.prototype.render = function () {
        return (React.createElement("div", { className: "container" },
            React.createElement(Wallpaper_1.default, null),
            React.createElement(Time_1.default, null),
            React.createElement(Ticker_1.default, { largeText: this.props.displayOnly, temperature: !this.props.displayOnly }),
            React.createElement(Spotify_1.default, { displayTop: this.props.displayOnly }),
            !this.props.displayOnly ? React.createElement(NewsTicker_1.default, null) : null));
    };
    return App;
}(React.Component));
;
exports.default = App;
//# sourceMappingURL=App.js.map