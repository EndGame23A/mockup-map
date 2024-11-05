var map = L.map('map').setView([16.651260919806443, 121.81452873925798], 12);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 11,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF'];

function getRandomColor() {
    var randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

L.geoJSON(myGeoJson, {
    style: function () {
        return {
            color: getRandomColor(),  // Call getRandomColor() for each feature
            weight: 5,
            opacity: 0.65
        };
    },
    onEachFeature: function (feature, layer) {
        var prevZoom = map.getZoom();
        map.on('zoomend',function(){
            var currZoom = map.getZoom();
            var diff = prevZoom - currZoom;
            if(diff > 0){
                if(currZoom == 12 || currZoom < 12){
                    layer.closeTooltip();
                }
            } else if(diff < 0) {
                layer.bindTooltip(feature.properties.ADM4_EN, {
                    permanent: true,
                    direction: "center",
                    className: "polygon-label"
                });
                console.log(currZoom);
            } else {
            alert('no change');
            }
            prevZoom = currZoom;
        });
        // map.on('zoomend', function() {
        //     layer.bindTooltip(feature.properties.ADM4_EN, {
        //         permanent: true,
        //         direction: "center",
        //         className: "polygon-label"
        //     });
        // });
    }
}).bindPopup(function (layer) {
    return layer.feature.properties.ADM4_EN + ', ' + layer.feature.properties.ADM3_EN;
}).addTo(map);
// var polygon = L.polygon([
//     [16.5348911, 122.0788873],
//     [16.5960986, 122.0514214],
//     [16.6000468, 122.0411217],
//     [16.6243923, 122.0170892],
//     [16.6263661, 121.9800103],
//     [16.6559711, 121.966964],
//     [16.6559711, 121.9607842],
//     [16.6618915, 121.9587243],
//     [16.6625493, 121.9504845],
//     [16.6513661, 121.9230187],
//     [16.6480769, 121.8715203],
//     [16.6638649, 121.8461144],
//     [16.6638649, 121.8365014],
//     [16.7059601, 121.7801965],
//     [16.7053024, 121.7506707],
//     [16.7112213, 121.7259515],
//     [16.7204281, 121.7238915],
//     [16.7348951, 121.7101586],
//     [16.7362102, 121.6895592],
//     [16.7684279, 121.674453],
//     [16.7572509, 121.6675866],
//     [16.7480459, 121.6668999],
//     [16.7467309, 121.6717065],
//     [16.7322648, 121.655227],
//     [16.7322648, 121.6483605],
//     [16.7191129, 121.6373742],
//     [16.709906, 121.6421807],
//     [16.7085907, 121.6346276],
//     [16.6954371, 121.631881],
//     [16.6868868, 121.6167748],
//     [16.6243923, 121.5906823],
//     [16.6178128, 121.5954888],
//     [16.603337, 121.598922],
//     [16.5947825, 121.6016686],
//     [16.5862278, 121.600982],
//     [16.5822793, 121.5961755],
//     [16.5770145, 121.6016686],
//     [16.5750402, 121.6332543],
//     [16.610575, 121.6923058],
//     [16.611233, 121.9202721],
//     [16.5289667, 121.947738],
//     [16.5348911, 122.0788873]
// ]).addTo(map);

polygon.bindPopup("<bold>According to the 2020 census, it has a population of 88,410 people.</bold>");
