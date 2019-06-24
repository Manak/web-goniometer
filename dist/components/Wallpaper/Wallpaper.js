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
require("./Wallpaper.scss");
var WALLPAPER_REFRESH_TIME = 60 * 60 * 1000;
var Wallpaper = /** @class */ (function (_super) {
    __extends(Wallpaper, _super);
    function Wallpaper(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            wallpaperUrl: "",
        };
        return _this;
    }
    Wallpaper.prototype.componentDidMount = function () {
        console.log("mounted");
        this.refreshWallpaper();
    };
    Wallpaper.prototype.refreshWallpaper = function () {
        var _this = this;
        console.log('refreshing wallpaper...');
        var max = 0;
        var min = 24;
        var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        var date = new Date();
        var tod = "";
        if (date.getHours() <= 7) {
            tod = "black";
        }
        else if (date.getHours() <= 11) {
            tod = "morning";
        }
        else if (date.getHours() <= 18) {
            tod = "afternoon";
        }
        else if (date.getHours() <= 20) {
            tod = "evening";
        }
        else if (date.getHours() <= 23) {
            tod = "night";
        }
        else {
            tod = "black";
        }
        if (tod === "black") {
            this.setState({
                wallpaperUrl: "black",
            });
        }
        else {
            fetch("http://api.fruumo.com/wallpaper/" + tod + "?r=" + Math.random())
                .then(function (response) {
                if (response.ok)
                    return response.json();
            })
                .then(function (data) {
                //var sWidth = screen.width >= screen.height?screen.width:screen.height;
                //var sHeight = screen.height < screen.width?screen.height:screen.width;
                _this.setState({
                    wallpaperUrl: data.imageLink + "&w=" + screen.width + "&h=" + screen.height,
                });
            });
        }
        setTimeout(function () { return _this.refreshWallpaper(); }, WALLPAPER_REFRESH_TIME);
    };
    Wallpaper.prototype.render = function () {
        return (React.createElement("div", { className: "wallpaper", style: { backgroundImage: "url(\"" + this.state.wallpaperUrl + "\")" } }));
    };
    return Wallpaper;
}(React.Component));
;
exports.default = Wallpaper;
//# sourceMappingURL=Wallpaper.js.map