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

    const xDOM = document.getElementById('x');
    const yDOM = document.getElementById('y');
    const zDOM = document.getElementById('z');
    const tableHeader = document.getElementById('table-header');
    const table = tableHeader.parentNode;
    const touchRegion = document.getElementsByClassName('touch-sensitive')[0];
    touchRegion.addEventListener('tap', () => {
        if(state == 1){
            //start recording
            state = 2;
            xZero = xRotation+0;
            yZero = yRotation+0;
            zZero = zRotation+0;
            changeState(2);
            return;
        }
        if(state == 2){
            logs.push({
                xRotation:xRotation.toFixed(4),
                yRotation:yRotation.toFixed(4),
                zRotation:zRotation.toFixed(4),
                lastX: lastX.toFixed(4),
                lastY:lastY.toFixed(4),
                lastZ:lastZ.toFixed(4),
                xZero: xZero.toFixed(4),
                yZero: yZero.toFixed(4),
                zZero: zZero.toFixed(4),  
            });
            lastX = xRotation+0;
            lastY = yRotation+0;
            lastZ = zRotation+0;
            document.body.style.background = "#bfff8e";
            setTimeout(() => {
                document.body.style.background="#eee";
            },400);
            return;
        }
    });
    
    touchRegion.addEventListener('dbltap',() => {
        if(state == 2){
            state = 3;
            changeState(3);
            touchRegion.style.display = "none";
            for(var i =0; i< logs.length-2; i++){
                let row = document.createElement('tr');
                let curr = logs[i];
                row.innerHTML = `
                    <td>
                        ${i+1}
                    </td>
                    <td>
                        ${curr.xRotation - curr.xZero}
                    </td>
                    <td>
                        ${curr.yRotation - curr.yZero}
                    </td>
                    <td>
                        ${curr.zRotation - curr.zZero}
                    </td>
                    <td>
                        ${curr.lastX-curr.xRotation}
                    </td>
                    <td>
                        ${curr.lastY-curr.yRotation}
                    </td>
                    <td>
                        ${curr.lastZ-curr.zRotation}
                    </td>
                    <td>
                        ${curr.xRotation}
                    </td>
                    <td>
                        ${curr.yRotation}
                    </td>
                    <td>
                        ${curr.zRotation}
                    </td>
                    <td>
                        ${curr.xZero}
                    </td>
                    <td>
                        ${curr.yZero}
                    </td>
                    <td>
                        ${curr.zZero}
                    </td>
                `;
                table.appendChild(row);
            }
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