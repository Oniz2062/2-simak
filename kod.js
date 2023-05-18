//эл. управления карты
var traffic; var traff; var trafficOn = JSON.parse(localStorage.getItem("trafficOn"));
chbox=document.getElementById('traffic');
var kolesiko; var kolesikoOn = JSON.parse(localStorage.getItem("kolesikoOn"));
chbox=document.getElementById('kolesiko');
var dvigKart; var dvigKartOn = JSON.parse(localStorage.getItem("dvigKartOn"));
chbox=document.getElementById('dvigKart');
var fullscreen; var fulls; var fullsOn = JSON.parse(localStorage.getItem("fullsOn"));
chbox=document.getElementById('fullscreen');
var ZoomK; var ZoomKo; var ZoomKoOn = JSON.parse(localStorage.getItem("ZoomKoOn"));
chbox=document.getElementById('ZoomK');
var CenterK; var centerOn=JSON.parse(localStorage.getItem("centerOn"));
var laat=JSON.parse(localStorage.getItem("laat"));
var lnng=JSON.parse(localStorage.getItem("lnng"));
var zooom=JSON.parse(localStorage.getItem("zooom"));
console.log(laat);
console.log(lnng);
//////////////////////////////////////
var marker=[];
var coordsmark=[];
var namepopup=[];
var coordsmarks=JSON.parse(localStorage.getItem("coordsmark"));
var namepopups=JSON.parse(localStorage.getItem("namepopup"));
var nameway=[];
var sohrway=[];
var sohrways=JSON.parse(localStorage.getItem("sohrway"));
var nameways=JSON.parse(localStorage.getItem("nameway"));
//интерфейс

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
var polyline;
var lat;
var lng;
var unikline;
list = document.getElementById("coords");
DG.then(function(){
        list = document.getElementById("coords");
        map = DG.map('map', {
        center: [53.208763, 50.124508],
        dragging: false,
        zoom: 20,
        touchzoom: true,
        zoomControl: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        fullscreenControl: false,
    });
    //Проверка загружаемых условий для изменений на карте
    if(trafficOn){
        document.getElementById("traffic").checked = true;
        traff = DG.control.traffic().addTo(map);
    }
    if (kolesikoOn){
        document.getElementById("kolesiko").checked = true;
        map.scrollWheelZoom.enable();
    }
    if(fullsOn){
        document.getElementById("fullscreen").checked = true;
        fulls=DG.control.fullscreen().addTo(map);
    }
    if(dvigKartOn){
        document.getElementById("dvigKart").checked = true;
        map.dragging.enable();
    }
    if(ZoomKoOn){
        document.getElementById("ZoomK").checked = true;
        ZoomKo=DG.control.zoom().addTo(map);
    }
    if(centerOn){
        map.setView([laat,lnng], zooom);
    }
    /////////////////////////////////////////////////////////
    map.on('click', function(e) {
        list
        lat = e.latlng.lat;
        lng = e.latlng.lng;
        console.log(lat + ", " + lng);
        list.innerHTML = ""+lat+", "+lng+"";
    if (polylineOn){
        coords.push([lat, lng]);
        polyline = DG.polyline(coords, {color: 'blue'}).addTo(map);
    } else{
        polyline.setLatLngs(coords).redraw();
    }
        });

});
// Сохранение и удаление маркера
function sohrMarker(){
    coordsmark[p]=[lat,lng];
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

function polylineAdd(){
polylineOn=true
};

function sohr_way(){
    w+=1; 
    nameway[w]= prompt('Введите название маршрута!',''+w+'');
    sohrway[w]=coords;
    unikline=DG.polyline(sohrway[w],{color:'red'}).bindLabel(nameway[w]).addTo(map);
    coords=[];
    polylineOn=false;
};
//
function save(){
    //сохранение маркеров
    localStorage.setItem("coordsmark", JSON.stringify(coordsmark));
    localStorage.setItem("namepopup", JSON.stringify(namepopup));
    //сохранение путей
    localStorage.setItem("sohrway", JSON.stringify(sohrway));
    localStorage.setItem("nameway", JSON.stringify(nameway));
    //сохранение состояния карты
    localStorage.setItem("fullsOn", JSON.stringify(fullsOn));
    localStorage.setItem("trafficOn", JSON.stringify(trafficOn));
    localStorage.setItem("kolesikoOn", JSON.stringify(kolesikoOn));
    localStorage.setItem("dvigKartOn", JSON.stringify(dvigKartOn));
    localStorage.setItem("ZoomKoOn", JSON.stringify(ZoomKoOn));
    localStorage.setItem("centerOn", JSON.stringify(centerOn));
    localStorage.setItem("laat", JSON.stringify(laat));
    localStorage.setItem("lnng", JSON.stringify(lnng));
    localStorage.setItem("zooom", JSON.stringify(zooom));
};
function clear(){
    if(localStorage) { 
        localStorage.clear()
    } else {
        alert("Уже и так пусто!") 
    }
};
//загрузка
function load(){
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
function traffic(){
    var traffic;
    traffic=document.getElementById('traffic');
        if (traffic.checked) {
            traff = DG.control.traffic().addTo(map);
            trafficOn=true;
        }
        else {
            traff.remove();
            trafficOn=false;
        }
    }
function kolesiko() {
    var kolesiko;
    kolesiko=document.getElementById('kolesiko');
        if (kolesiko.checked) {
            map.scrollWheelZoom.enable();
            kolesikoOn=true;
        }
        else {
            map.scrollWheelZoom.disable();
            kolesikoOn=false;
        }
    }
function dvigKart() {
    var dvigKart;
    dvigKart=document.getElementById('dvigKart');
        if (dvigKart.checked) {
            map.dragging.enable();
            dvigKartOn=true;
        }
        else {
            map.dragging.disable();
            dvigKartOn=false;
        }
}
function fullscreen(){
    var fullscreen;
    fullscreen=document.getElementById('fullscreen');
        if (fullscreen.checked) {
            fulls=DG.control.fullscreen().addTo(map);
            fullsOn=true;
        }
        else {
            fulls.remove();
            fullsOn=false;
        }
}
function ZoomK(){
    var ZoomK;
    ZoomK=document.getElementById('ZoomK');
        if (ZoomK.checked) {
            ZoomKo=DG.control.zoom().addTo(map);
            ZoomKoOn=true;
        }
        else {
            ZoomKo.remove();
            ZoomKoOn=false;
        }
}
function CenterK(){
    CenterOn=true;
    var laat = lat;
    var lnng = lng;
    var zooom = prompt('Введите числ.значение zooma','20');
    map.setView( [laat,lnng], zooom)
}
//сохранение при перезагрузке
window.addEventListener('beforeunload', (event) => {
    save();
  });
