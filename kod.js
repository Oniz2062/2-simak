//эл. управления карты
var traffic;
chbox=document.getElementById('traffic');
var kolesiko;
chbox=document.getElementById('kolesiko');
var dvigKart;
chbox=document.getElementById('dvigKart');
//
var marker=[];
var coordsmark=[];
var namepopup=[];
var coordsmarks=JSON.parse(localStorage.getItem("coordsmark"));
var namepopups=JSON.parse(localStorage.getItem("namepopup"));
var nameway=[];
var sohrway=[];
var sohrways=JSON.parse(localStorage.getItem("sohrway"));
var nameways=JSON.parse(localStorage.getItem("nameway"));
//перенос данных
if(coordsmarks!=null){
    coordsmark=coordsmarks;
    namepopup=namepopups;
}
if(sohrways!=null){
    sohrway=sohrways;
    nameway=nameways;
}
console.log(sohrway); console.log(nameway); console.log(coordsmark); console.log(namepopup);
//
var coords=[];
var p=0;
var w=0;
var map;
var unikline;
var polyline;
DG.then(function(){
        map = DG.map('map', {
        center: [53.208763, 50.124508],
        dragging: false,
        zoom: 20,
        touchzoom: true,
        zoomControl: true,
        scrollWheelZoom: false,
        doubleClickZoom: false,
    });
        map.on('click', function(e) {
        coords.push([e.latlng.lat ,e.latlng.lng]);  
        if (!polyline){
        polyline = DG.polyline(coords, {
            color: 'blue'
        }).addTo(map);
    } else{
        polyline.setLatLngs(coords).redraw();
    }
        });

});
// Сохранение и удаление маркера
function sohrMarker(){
    coordsmark[p]=coords[0];
    namepopup[p]=prompt('Введите название Маркера!',''+p+'');
    marker[p] = DG.marker(coordsmark[p]).addTo(map).bindPopup(''+namepopup[p]+'');
    coords=[];
    p+=1;
};
var deletMark=()=>{
p-=1;
marker[p].remove(map);
coordsmark[p]=[];
namepopup[p]='';
};
// сохранение пути
var removelastcoord=()=>{
DG.then(function(){
coords.pop(),
polyline.setLatLngs(coords).redraw();
    });
};
var sohr_way=()=>{      
    w+=1; 
    nameway[w]= prompt('Введите название маршрута!',''+w+'');
    sohrway[w]=coords;
    unikline=DG.polyline(sohrway[w],{color:'red'}).bindLabel(nameway[w]).addTo(map);
    coords=[];
};
//
function save(){
    //сохранение маркеров
    localStorage.setItem("coordsmark", JSON.stringify(coordsmark));
    localStorage.setItem("namepopup", JSON.stringify(namepopup));
    //сохранение путей
    localStorage.setItem("sohrway", JSON.stringify(sohrway));
    localStorage.setItem("nameway", JSON.stringify(nameway));
    //сохранение
};
function clear(){
    localStorage.clear();
};
//загрузка
function load(map){
while(coordsmarks!=null){
    marker[p] = DG.marker(coordsmark[p])
    .addTo(map).bindPopup(''+namepopup[p]+'');
    p+=1;
}
while(nameways!=''){
    w+=1;
    unikline=DG.polyline(sohrway[w],{color:'red'}).bindLabel(nameway[w]).addTo(map);
}
};
//управелние значениями карты
function traffic() {
    var traffic;
    traffic=document.getElementById('traffic');
        if (traffic.checked) {
            alert('Выбран');
        }
        else {
            alert ('Не выбран');
        }
    }
function kolesiko() {
    var kolesiko;
    kolesiko=document.getElementById('kolesiko');
        if (kolesiko.checked) {
            map.scrollWheelZoom.enable();
        }
        else {
            map.scrollWheelZoom.disable();
        }
    }
function dvigKart() {
    var dvigKart;
    dvigKart=document.getElementById('dvigKart');
        if (dvigKart.checked) {
            map.dragging.enable();
        }
        else {
            map.dragging.disable();;
        }
}
//
