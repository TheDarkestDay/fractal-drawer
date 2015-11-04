var btn = document.getElementById('run');
var axiom = document.getElementById('axiom');
var textarea = document.getElementById('productions');
var depth = document.getElementById('depth');
var productions = new Map();
var productionsArray = [];
var sequence = '';
var result = '';
var ignore = '[]+-';
var ctx = document.getElementById('canvas').getContext('2d');

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
    
    for(var i=0;i<sequence.length;i++) {
        
    }
});