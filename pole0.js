//




function test() {
alert('dsg')
}


function init() {
//alert('dfghf')
var ret=document.getElementById('pole')
ret.addEventListener("mousedown", mishDolu, false)
}

mishDolu = function(event) {

    window.event=event
			      
    element= window.event.target
    
    alert('eee'+element.id)
    
    event.stopPropagation()
    event.preventDefault()
}

/*function mishDolu(event) {
    //element= window.event.target
    alert('eee'+element.id)
}
window.mishDolu = function(event)
*/

function poluhod(a,b) {
    alert(a+"-"+b)
}
