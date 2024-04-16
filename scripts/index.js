let map = L.map('map').setView([35.96185510819866, 139.8782146155359], 18);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let circleMarkers = [];

function addCircleMarker(e) {
    let circleMarker = L.circleMarker(e.latlng, { radius: getRadius() }).addTo(map);
    circleMarker.on('click', function(e) {
        L.DomEvent.stopPropagation(e);
        // e.target.setStyle({color: 'orange'});
        map.removeLayer(circleMarker);
        circleMarkers = circleMarkers.filter(circleMarker => circleMarker.getLatLng().toString() !== e.latlng.toString());
    });
    circleMarkers.push(circleMarker);
}

function getRadius() {
    return Math.pow(2, map.getZoom() - 15)
}

function resizeCircleMarker() {
    circleMarkers.forEach(marker => {
        marker.setRadius(getRadius());
    });
}

map.on('click', addCircleMarker);
map.on('zoomend', resizeCircleMarker);

document.getElementById('btn').onclick = () => console.log(circleMarkers);
