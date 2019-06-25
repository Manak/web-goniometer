import Tocca from 'tocca';
require('./index.scss');


let logs = [];

let xRotation = 0;
let yRotation = 0;
let zRotation = 0;

let lastX = -361;
let lastY = -361;
let lastZ = -361;

let xZero = 0;
let yZero = 0;
let zZero = 0;

// 1 is unstarted
// 2 is started, zeroed
// 3 is viewing log

let state = 1;

window.onload = () => {

    let xDOM = document.getElementById('x');
    let yDOM = document.getElementById('y');
    let zDOM = document.getElementById('z');

    const touchRegion = document.getElementsByClassName('touch-sensitive')[0];
    touchRegion.addEventListener('tap', () => {
        if(state == 1){
            //start recording
            state = 2;
            xZero = xRotation+0;
            yZero = yRotation+0;
            zZero = zRotation+0;
            changeState(2);
        }
        if(state == 2){
            lastX = xRotation+0;
            lastY = yRotation+0;
            lastZ = zRotation+0;
            logs.push({
                x:xRotation,
                y:yRotation,
                z:zRotation,
                lastX: lastX,
                lastY:lastY,
                lastZ:lastZ,
                xZero: xZero,
                yZero: yZero,
                zZero: zZero,  
            });
        }
    });
    
    touchRegion.addEventListener('dbltap',() => {
        if(state == 1){
            state = 2;
            changeState(3);
        }
    });
    
    window.addEventListener('deviceorientation', function(event) {
        xRotation = event.beta;
        yRotation = event.alpha;
        zRotation = event.gamma;
        xDOM.innerText = `${(xRotation - xZero).toFixed(2)} ${lastX != -361 ? `(${(lastX-xRotation).toFixed(0)})`:``}`;
        yDOM.innerText = `${(yRotation - yZero).toFixed(2)} ${lastY != -361 ? `(${(lastY-yRotation).toFixed(0)})`:``}`;
        zDOM.innerText = `${(zRotation - zZero).toFixed(2)} ${lastZ != -361 ? `(${(lastZ-zRotation).toFixed(0)})`:``}`;
        console.log(xRotation, yRotation, zRotation);
    });

}

function changeState(s){
    console.log(s);
    if(s != 1){
        document.getElementById(`state-${s-1}`).style.display = "none";
    }
    document.getElementById(`state-${s}`).style.display = "flex";
}