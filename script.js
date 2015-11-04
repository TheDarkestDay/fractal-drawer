var btn = document.getElementById('run');
var clearBtn = document.getElementById('clear');
var axiom = document.getElementById('axiom');
var textarea = document.getElementById('productions');
var depth = document.getElementById('depth');
var productions = new Map();
var productionsArray = [];
var sequence = '';
var result = '';
var ignore = '[]+-';
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var originX = document.getElementById('originX');
var originY = document.getElementById('originY');
var step = document.getElementById('length');
var angleInput = document.getElementById('angle');
var stack = [];
var nextPoint = {};
var currentPoint = {};
var distance,angle;

axiom.value = 'F';
textarea.value = 'F=F[+F]F[-F]F\n'
originX.value = '375';
originY.value = '400';
step.value = '30';
depth.value = '2';
angleInput.value = '26';

btn.addEventListener('click', function(evt) {
    evt.preventDefault();
    productionsArray = textarea.value.split('\n');
    for (var i=0;i<productionsArray.length;i++) {
        productions.set(productionsArray[i][0],productionsArray[i].substring(2));
    };
    sequence = axiom.value;
    for (var i=0;i<parseInt(depth.value);i++) {
        result = '';
        for (var j=0;j<sequence.length;j++) {
            if (ignore.indexOf(sequence[j]) != -1) {
                result += sequence[j];
            } else {
                result += productions.get(sequence[j]);
            }
        }
        sequence = result;
    };
    stack = [];
    distance = parseInt(step.value);
    currentAngle = -90;
    currentPoint.x = parseInt(originX.value);
    currentPoint.y = parseInt(originY.value);
    nextPoint.x = currentPoint.x;
    nextPoint.y = currentPoint.y;
    angle = parseInt(angleInput.value);
    for(var i=0;i<sequence.length;i++) {
        switch(sequence[i]) {
            case '[':
                stack.push({
                    x: currentPoint.x,
                    y: currentPoint.y,
                    angle: currentAngle
                });
                break;
            case ']':
                currentPoint.x = stack[stack.length-1].x;
                currentPoint.y = stack[stack.length-1].y;
                currentAngle = stack[stack.length-1].angle;
                nextPoint.x = currentPoint.x;
                nextPoint.y = currentPoint.y;
                stack.pop();
                break;
            case '+':
                currentAngle += angle;
                nextPoint.x = Math.cos(currentAngle*Math.PI/180)*distance+currentPoint.x;
                nextPoint.y = Math.sin(currentAngle*Math.PI/180)*distance+currentPoint.y;
                break;
            case '-':
                currentAngle -= angle;
                nextPoint.x = Math.cos(currentAngle*Math.PI/180)*distance+currentPoint.x;
                nextPoint.y = Math.sin(currentAngle*Math.PI/180)*distance+currentPoint.y;
                break;
            default:
                if (currentPoint.x == nextPoint.x && currentPoint.y == nextPoint.y) {
                    nextPoint.x = Math.cos(currentAngle*Math.PI/180)*distance+currentPoint.x;
                    nextPoint.y = Math.sin(currentAngle*Math.PI/180)*distance+currentPoint.y;
                };
                ctx.beginPath();
                ctx.moveTo(currentPoint.x,currentPoint.y);
                ctx.lineTo(nextPoint.x,nextPoint.y);
                ctx.stroke();
                ctx.closePath();
                currentPoint.x = nextPoint.x;
                currentPoint.y = nextPoint.y;
                break;
        }
    }
});

clearBtn.addEventListener('click', function(evt) {
    evt.preventDefault();
    ctx.clearRect(0,0,canvas.width,canvas.height);
});