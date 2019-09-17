//
//черна/червена=0=r=-;       червена/=1=b=+                    бар=затвор,к-къща
//                    к  1                             б  б-п  к-п
//                       1 2 3  4 5 6 7 8 9 10 11     12  13 14 15
var apole = new Array(2,-3,1,-1,1,-1,1,-1,1,2, 4, -1, 2, 4, -3, 3),
len_apole= apole.length ,  //apole.lenght=10 го отрязва
atpole= apole,

// текущ зар и полуходове ходове
azar= [0,0],
azars= [0,0,0,0],
countHodove= 0,
flagTek= false,
aCelHod= [0,0,0,0,0,0,0,0],
/*poluHod1= [0,0],
poluHod2= [0,0],
poluHod3= [0,0],
poluHod4= [0,0],*/

kontrKub= 1,
mach= 25,
numPartija= 1,
//флагове
iflagZatvornici, //0,1,2 ...
flagVzimane,
iflagNemaHod,  //66-геле; 3,2,1-остават толкова
pipazh,
eZar01,eZar02,
aKapii= [len_apole],
a2elSh0= [[len_apole], [len_apole], [len_apole]],
a2elSh1= [[len_apole], [len_apole], [len_apole]],
a1vrah= [len_apole],
//:TODO:масив с най-горните шашки

//aSiteEl = new Array() //?многомерен с всички елементи
//elSh00_8, elSh00_9
//elSh0[kap, num]
//запетайки
countReplika=0
//предварително определяне на всички елементи (по id)
//инициализиране на дъската
//addEventListeners
function init1() {
  //alert(len_apole+'-'+apole.length+'-'+apole[1])

  for (var sh0=0;  sh0<3; sh0++) {
    for (var kap=0;  kap<len_apole; kap++) {
      a2elSh0[sh0][kap]= document.getElementById('sh0'+sh0+'-'+kap)
      a2elSh1[sh0][kap]= document.getElementById('sh1'+sh0+'-'+kap)
      a1vrah[kap]= document.getElementById('num'+kap)
    }
  }
//   for (var sh0=0;  sh0<3; sh0++) {
//     for (var kap=0;  kap<16; kap++) {
//       a2elSh1[sh0][kap]= document.getElementById('sh1'+sh0+'-'+kap)
//     }
//   }
  var num= 0  //бр шашки в кап
  for (var i=0;  i<len_apole; i++) {
    num=apole[i]
    //alert('init0 '+num)
    if (num>0) {
      if (num<=3) {
        //turi_cherni(num, i)
        for (var j=0; j<num; j++) {
          a2elSh0[j][i].style.visibility= 'visible'
        }
        document.getElementById('num'+i).innerHTML= num
        //document.getElementById('num'+i).style.display='none' //visible= 'hidden'
      }
      else {
        for (var j=0; j<3; j++) {
          a2elSh0[j][i].style.visibility= 'visible'
        }
        document.getElementById('num'+i).innerHTML= num
      }
    }
    if (num<0) {
      num= Math.abs(num)
      if (num<=3) {
        for (var j=0; j<num; j++) {
          a2elSh1[j][i].style.visibility= 'visible'
        }
        document.getElementById('num'+i).innerHTML= num
        //document.getElementById('num'+i).style.display='none' //visible= 'hidden'
      }
      else {
        for (var j=0; j<3; j++) {
          a2elSh1[j][i].style.visibility= 'visible'
        }
        document.getElementById('num'+i).innerHTML= num
      }
    }
  }

//раб елементи
//зарове за ръчно въвеждане
//eZar1= document.getElementById('rnd1')
//eZar2= document.getElementById('rnd2')
var elem= document.getElementById('but-probi')
elem.addEventListener('click',
function (){
  poluHod666(document.getElementById('hod1').value,document.getElementById('hod2').value)
}, false)

elem= document.getElementById('replika')
elem.addEventListener('keypress',
                      function (){

countReplika++
                      }, false)
//зарове- бутони
eZar01= document.getElementById('but-zar01')
eZar01.addEventListener('click', tarkal,false)
eZar02= document.getElementById('but-zar02')
eZar02.addEventListener('click', tarkal,false)

//събития
//следене за кликове на капиите
aKapii[15]= document.getElementById('kapia15')
aKapii[15].addEventListener('click', hod15,false)
aKapii[14]= document.getElementById('kapia14')
aKapii[14].addEventListener('click', hod14,false)
aKapii[13]= document.getElementById('kapia13')
aKapii[13].addEventListener('click', hod13,false)

aKapii[12]= document.getElementById('kapia12')
aKapii[12].addEventListener('click', hod12,false)
aKapii[11]= document.getElementById('kapia11')
aKapii[11].addEventListener('click', hod11,false)
aKapii[10]= document.getElementById('kapia10')
aKapii[10].addEventListener('click', hod10,false)

aKapii[9]= document.getElementById('kapia9')
aKapii[9].addEventListener('click', hod9,false)
aKapii[8]=document.getElementById('kapia8')
aKapii[8].addEventListener('click', hod8,false)
aKapii[7]=document.getElementById('kapia7')
aKapii[7].addEventListener('click', hod7,false)
aKapii[6]=document.getElementById('kapia6')
aKapii[6].addEventListener('click', hod6,false)
aKapii[5]=document.getElementById('kapia5')
aKapii[5].addEventListener('click', hod5,false)
aKapii[4]=document.getElementById('kapia4')
aKapii[4].addEventListener('click', hod4,false)
aKapii[3]=document.getElementById('kapia3')
aKapii[3].addEventListener('click', hod3,false)
aKapii[2]=document.getElementById('kapia2')
aKapii[2].addEventListener('click', hod2,false)
aKapii[1]=document.getElementById('kapia1')
aKapii[1].addEventListener('click', hod1,false)
aKapii[0]=document.getElementById('kapia0')
aKapii[0].addEventListener('click', hod0,false)


}//край-инит1

function hod15() {
  poluHod1(15)
}
function hod14() {
  poluHod1(14)
}


function hod13() {
  poluHod1(13)
}
function hod12() {
  poluHod1(12)
}
function hod11() {
 poluHod1(11)
}
function hod10() {
  poluHod1(10)
}
function hod9() {
  poluHod1(9)
}
function hod8() {
  poluHod1(8)
}
function hod7() {
  poluHod1(7)
}
function hod6() {
  poluHod1(6)
}
function hod5() {
  poluHod1(5)
}
function hod4() {
  poluHod1(4)
}
function hod3() {
  poluHod1(3)
}
function hod2() {
  poluHod1(2)
}
function hod1() {
  poluHod1(1)
}
function hod0() {
  poluHod1(0)
}
//прави полуход
//@param 1-ва кап
function poluHod1(kap1) {
var kap2
if (countHodove==0) {
  alert('Играл си!')
  return false
}

if (flagTek) {
  if (countHodove==2) { //опит за макс полуход
    kap2= kap1-azars[0]
    poluHod666(kap1,kap2)
  }
  else {
    kap2= kap1-azars[1]
    poluHod666(kap1,kap2)
  }
}
else { //1/4 ход от чифт
  kap2= kap1-azars[0]
  poluHod666(kap1,kap2)
}
return true

}

//прави полуход
//варианти: кап,зар;
function poluHod666(kap1,kap2) {
var brSh1, brSh2, brZat
  brSh1= apole[kap1]
  if (brSh1>0) {  //има к'во да се мести
    brSh2= apole[kap2]
    if (brSh2>=-1) {  //има къде
      //
      apole[kap1]--                       //
      apole[kap2]++                       //
      a1vrah[kap1].innerHTML= brSh1-1     //
      a1vrah[kap2].innerHTML= brSh2+1     //
      if (brSh2==-1) {  //удар, бий по главата
        apole[kap2]= 1
        a2elSh1[0][kap2].style.visibility= 'hidden'
        a2elSh0[0][kap2].style.visibility= 'visible'
        brZat= Math.abs(apole[14])  //бар на прот
        apole[14]--
        a1vrah[14].innerHTML= brZat+1
        if (brZat<3) {
          a2elSh1[brZat][14].style.visibility= 'visible'
        }
        if (brSh1<=3) {
          a2elSh0[brSh1-1][kap1].style.visibility= 'hidden'
        }
      }
      else if (brSh2<3) {
        a2elSh0[brSh2][kap2].style.visibility= 'visible'

        if (brSh1<=3) {
          a2elSh0[brSh1-1][kap1].style.visibility= 'hidden'
        }
      }
      else {  //brSh2>3
        if (brSh1<=3) {
           a2elSh0[brSh1-1][kap1].style.visibility= 'hidden'
        }
      }
      countHodove--
      return true
    }
    else return false
  }
  else return false
}
//туря моя (0,зелена,черна)
function turi0(kap) {
  brSh= apole[kap]
  if (brSh>0) {
    apole[kap]++
    if (brSh<3) {
      a2elSh0[brSh++][kap].style.visibility= 'visible'
    }
    else {
      a1vrah[kap1].innerHTML= brSh+1
    }
  }


}
//
function turi1(kap) {

}

//разни
//@return rnd[1,n+1]
function intRandom(n) {
return Math.round(Math.random()*n+1)
}
function tarkal() {
azar[0]= intRandom(2)
eZar01.value= azar[0]
azar[1]= intRandom(2)
eZar02.value=azar[1]
initZars()
}
function initZars() {
  azars[0]= azar[0]
  azars[1]= azar[1]
  countHodove= 2
  flagTek= true
  if (azar[0]<azar[1]) {
    azars[0]= azar[1]
    azars[1]= azar[0]
  }
  else if (azar[0]==azar[1]) {
    azars[0]= azar[0]
    azars[1]= azar[0]
    azars[2]= azar[0]
    azars[3]= azar[0]
    countHodove= 4
    flagTek= false
  }
}







//слага шашките по масива apole, :NOTE:достъп s getElementById - бавно
//:NOTE: остава за тестове
function init0() {

   num= 0
  for (var i=0;  i<len_apole; i++) {
    num=apole[i]
    //alert('init0 '+num)
    if (num>0) {
      if (num<=3) {
        turi_cherni(num, i)
        document.getElementById('num'+i).style.display='none' //visible= 'hidden'
      }
      else {
        turi_cherni(3,i)
        //elem= document.createTextNode(num.toString(10))
        //document.getElementById( 'num'+ i ).appendChild(elem)
        //:TODO:
        document.getElementById('num'+i).innerHTML= num
      }
    }
    if (num<0) {
      num= Math.abs(num)
      if (num<=3) {
        turi_cherveni(num, i)
        document.getElementById('num'+i).style.display='none' //visible= 'hidden'
      }
      else {
        turi_cherveni(3,i)
        //elem= document.createTextNode(num)
        //elem1= document.getElementById('num'+num)
        //elem1.removeTextNode
        //elem1.appendChild(elem)
        document.getElementById('num'+i).innerHTML= num
      }
    }
   }
}

//туря нум черни ш на kap-та капия
//3
function turi_cherni(num, kap) {
  //alert('turi_cherni(num= '+num+',kap '+kap)
  //3-0,1,2
  for(var i=0; i<num; i++) {
    ids= 'sh0'+i+'-'+kap   //toString()
    document.getElementById(ids).style.visibility='visible'

  }
}
function turi_cherveni(num, kap) {
    for(var i=0; i<num; i++) {
     ids= 'sh1'+i+'-'+kap   //toString(10)
     document.getElementById(ids).style.visibility='visible'

    }
}

//туря една черна sh0 ном кап
function turi_cherna(kap) {
    var i= apole[kap]
    if (i>3) {
      document.getElementById('num'+kap).inerHTML= num
    }
    ids= 'sh0'+i+'-'+kap //.toString()
    document.getElementById(ids).style.visibility='visible'
}
//туря една червена  ...sh0 ном кап
function turi_chervena(kap) {
  var i= Math.abs(apole[kap])
  if (i>3) {
    document.getElementById('num'+kap).inerHTML= num
  }
  ids= 'sh1'+i+'-'+kap;
  document.getElementById(ids).style.visibility='visible'
}


if (3!=3) {
//по id-та
function oHodId(idSh1,idSh2) {
	document.getElementById(idSh1).style.visibility='hidden'
	document.getElementById(idSh2).style.visibility='visible'
}

//по елементи
function oHodElem(elemSh1,elemSh2) {
	elemSh1.style.visibility='hidden'
	elemSh2.style.visibility='visible'
}

//по клетки на капии
//window['myVar' + i] в стринг се превр
function oHodElem(kap0,kl0,kap1,kl1) {
	var elem1= window['eSh0' + kl0 + '-'+kap0]  //
	var elem1= window['eSh1' + kl1 + '-'+kap1]
	elem1.style.visibility='hidden'
	elem2.style.visibility='visible'
}
}


