var sohrway=[];
//
var marker=[];
var coordsmark=[];
var namepopup=[];
//
var map;
var polyline;
var unikline;
var nameway=[];
let coords=[];
var p=0;
var w = 0;
var click = false;
var func = false;
let way=[coords];
clickedElement = document.getElementById('clicked_element');
DG.then(function () {
    clickedElement = document.getElementById('clicked_element'),
    map = DG.map('map', {
        center: [53.208763, 50.124508],
        zoom: 20,
        touchzoom: true,
        scrollwheelzoom: true,
    });
    map.on('click', function(e) {
        coords.push([e.latlng.lat ,e.latlng.lng]);   
        clickedElement.innerHTML += [' [' + e.latlng.lat + ' ,' + e.latlng.lng+'], '];
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
var sohrMarker=()=>{
    coordsmark[p]=coords[0];
    namepopup[p]=prompt('Введите название Маркера!',''+p+'');
    marker[p] = DG.marker(coordsmark[p])
    .addTo(map).bindPopup(''+namepopup[p]+'');
    clickedElement.innerHTML = '';
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
var sohrwayplus=()=>{
DG.then(function(){
unikline=DG.polyline(sohrway[w],{color:'red'}).bindLabel(nameway[w]).addTo(map);
console.log(sohrway[w],nameway[w]);
});
};
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
sohrwayplus();
clickedElement.innerHTML = '';
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