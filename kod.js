var marker=[];
var coordsmark=[];
var namepopup=[];
var coordsmarks=JSON.parse(localStorage.getItem("coordsmark"));
var namepopups=JSON.parse(localStorage.getItem("namepopup"));
var nameway=[];
var sohrway=[];
//перенос данных
if(coordsmarks!=null){
    coordsmark=coordsmarks;
    namepopup=namepopups;
}
//
var map;
var polyline;
var unikline;
var coords=[];
var p=0;
var w=0;
DG.then(function () {
    map = DG.map('map', {
        center: [53.208763, 50.124508],
        zoom: 20,
        touchzoom: true,
        scrollwheelzoom: true,
    });
    //
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
for(i=0;i<=3;i++){
    if(namepopup[i]==''){
    break
    }
    else{
        var marker = DG.marker(coordsmark[i])
        .addTo(map).bindPopup(''+namepopup[i]+'');
    }
};
// Сохранение и удаление маркера
function sohrMarker(){
    coordsmark[p]=coords[0];
    namepopup[p]=prompt('Введите название Маркера!',''+p+'');
    marker[p] = DG.marker(coordsmark[p])
    .addTo(map).bindPopup(''+namepopup[p]+'');
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
function sohr_way(){       
w+=1; 
nameway[w]= prompt('Введите название маршрута!',''+w+'');
sohrway[w]=coords;
DG.then(function(){
    unikline=DG.polyline(sohrway[w],{color:'red'}).bindLabel(nameway[w]).addTo(map);
    console.log(sohrway[w],nameway[w]);
});
coords=[];
CreateWayButton(); 
};
// кнопка для пути
function CreateWayButton(){
var button = document.createElement("input");
button.type = "button";
button.value = ''+w+'';
button.onclick = function zoombutn(){
map.flyTo(sohrway[button.value][1], 18, {
animate: true,
duration: 1.5
                });
};
document.body.append(button);
};
//
function sohr(){
    //сохранение маркеров
    localStorage.setItem("coordsmark", JSON.stringify(coordsmark));
    localStorage.setItem("namepopup", JSON.stringify(namepopup));
    //сохранение путей
    localStorage.setItem("sohrway", JSON.stringify(sohrway));
    localStorage.setItem("nameway", JSON.stringify(nameway));
};