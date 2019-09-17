//crossbrowser DOM
//

//вътрешни р-ри на джама
//@return [W,H]
function daiWinInnerWH() {
  var myWidth = 0, myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Добър уеб четец
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //Експлодър 6+ в режим 'standards compliant mode'
    myWidth = document.documentElement.clientWidth;
    myHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //Експлодър 4
    myWidth = document.body.clientWidth;
    myHeight = document.body.clientHeight;
  }
  return [myWidth,myHeight]
}
//колко е скролирано
//@return [x,y]
function getScrollXY() {
  var scrOfX = 0, scrOfY = 0;
  if( typeof( window.pageYOffset ) == 'number' ) {
    //Netscape compliant
    scrOfY = window.pageYOffset;
    scrOfX = window.pageXOffset;
  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
    //DOM compliant
    scrOfY = document.body.scrollTop;
    scrOfX = document.body.scrollLeft;
  } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
    //Експлодър 6 standards compliant mode
    scrOfY = document.documentElement.scrollTop;
    scrOfX = document.documentElement.scrollLeft;
  }
  return [ scrOfX, scrOfY ];
}

//връща размерите на джама
function daiWindowRazmeri() {
  var out = {};

  if (window.pageXOffset) {
    out.scrollX = window.pageXOffset;
    out.scrollY = window.pageYOffset;
    }
  else if (document.documentElement) {
    out.scrollX = document.body.scrollLeft +
          document.documentElement.scrollLeft;
    out.scrollY = document.body.scrollTop +
          document.documentElement.scrollTop;
    }
  else if (document.body.scrollLeft >= 0) {
    out.scrollX = document.body.scrollLeft;
    out.scrollY = document.body.scrollTop;
    }

  if (document.compatMode == "BackCompat") {
    out.width = document.body.clientWidth;
    out.height = document.body.clientHeight;
    }
  else {
    out.width = document.documentElement.clientWidth;
    out.height = document.documentElement.clientHeight;
    }
  return out;
}

//
function pageWidth() {return window.innerWidth != null? window.innerWidth : document.documentElement && document.documentElement.clientWidth ?       document.documentElement.clientWidth : document.body != null ? document.body.clientWidth : null;}
function pageHeight() {return  window.innerHeight != null? window.innerHeight : document.documentElement && document.documentElement.clientHeight ?  document.documentElement.clientHeight : document.body != null? document.body.clientHeight : null;}

function posLeft() {return typeof window.pageXOffset != 'undefined' ? window.pageXOffset :document.documentElement && document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft ? document.body.scrollLeft : 0;}
function posTop() {return typeof window.pageYOffset != 'undefined' ?  window.pageYOffset : document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ? document.body.scrollTop : 0;}

function posRight() {return posLeft()+pageWidth();}
function posBottom() {return posTop()+pageHeight();}


//

function f_clientWidth() {
	return f_filterResults (
		window.innerWidth ? window.innerWidth : 0,
		document.documentElement ? document.documentElement.clientWidth : 0,
		document.body ? document.body.clientWidth : 0
	);
}
function f_clientHeight() {
	return f_filterResults (
		window.innerHeight ? window.innerHeight : 0,
		document.documentElement ? document.documentElement.clientHeight : 0,
		document.body ? document.body.clientHeight : 0
	);
}
function f_scrollLeft() {
	return f_filterResults (
		window.pageXOffset ? window.pageXOffset : 0,
		document.documentElement ? document.documentElement.scrollLeft : 0,
		document.body ? document.body.scrollLeft : 0
	);
}
function f_scrollTop() {
	return f_filterResults (
		window.pageYOffset ? window.pageYOffset : 0,
		document.documentElement ? document.documentElement.scrollTop : 0,
		document.body ? document.body.scrollTop : 0
	);
}
function f_filterResults(n_win, n_docel, n_body) {
	var n_result = n_win ? n_win : 0;
	if (n_docel && (!n_result || (n_result > n_docel)))
		n_result = n_docel;
	return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
}

//GM
// getPosition
function getPosition(e) {
var top=left=0;
if(e.offsetParent) {
do {
top += e.offsetTop;
left += e.offsetLeft;
} while(e=e.offsetParent);
}
return [top,left];
}


var width = getWindowSize().width;

code

var getWindowSize = (function() {
  var docEl = document.documentElement,
      IS_BODY_ACTING_ROOT = docEl && docEl.clientHeight === 0;

  // Used to feature test Opera returning wrong values 
  // for documentElement.clientHeight. 
  function isDocumentElementHeightOff () { 
      var d = document,
          div = d.createElement('div');
      div.style.height = "2500px";
      d.body.insertBefore(div, d.body.firstChild);
      var r = d.documentElement.clientHeight > 2400;
      d.body.removeChild(div);
      return r;
  }

  if (typeof document.clientWidth == "number") {
     return function () {
       return { width: document.clientWidth, height: document.clientHeight };
     };
  } else if (IS_BODY_ACTING_ROOT || isDocumentElementHeightOff()) {
      var b = document.body;
      return function () {
        return { width: b.clientWidth, height: b.clientHeight };
      };
  } else {
      return function () {
        return { width: docEl.clientWidth, height: docEl.clientHeight };
      };
  }
})();



















