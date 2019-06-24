"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("whatwg-fetch");
require("url-search-params-polyfill");
var React = require("react");
var ReactDOM = require("react-dom");
var App_1 = require("./components/App/App");
require("./index.scss");
var heartbeat = new Date().getTime();
var urlParams = new URLSearchParams(window.location.search);
ReactDOM.render((React.createElement(App_1.default, { displayOnly: urlParams.has('displayOnly') })), document.getElementById("root"));
document.body.addEventListener('touchmove', function (event) {
    event.preventDefault();
}, false);
setInterval(function () {
    var currentTime = new Date().getTime();
    if (currentTime - heartbeat >= 2 * 60 * 60 * 1000) {
        document.location.reload();
    }
    heartbeat = currentTime;
}, 1 * 60 * 1000);
//# sourceMappingURL=index.js.map