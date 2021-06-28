var url = "/mapa";
var st_url = "/mexican_states";
let clust_url = "/clustering_map";

let estado = 'republica';
let crop = 'all';
let ecent = [24, -100];
let ez  = 5;

//initializing the map to show a map before filers ar used
let myMap = L.map("map", {
  center: ecent,
  zoom: ez
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

//activating filters when clicking the button
d3.select("button").on("click",(d)=>{

  //removing the map and generating a new one
  map.remove();
  let mapdiv = d3.select(".mapbox").append("div").classed("row-fluid", true).attr("id", "map").attr("style", "height: 750px");
  
  let crop = d3.select("#crop").node().value;
  let cluster = d3.select("#cluster").node().value;
  if (cluster != 'all'){
    cluster = +cluster;
  }
  
  console.log(`cluster ${cluster}`);
  console.log(`crop ${crop}`);


  //Generating the map
  d3.json(clust_url).then(function(data) {
    

    // starting the map
    let myMap = L.map("map", {
      center: ecent,
      zoom: ez
    });
      

    //adding mapbox street lyer
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: API_KEY
    }).addTo(myMap);

    data.forEach(d=>{
      let lat= d.latitud;
      let lng = d.longitud;
      let location =[lat, lng];
      let rendimiento=d.rendimiento;
      let ccluster =  d.clusters;
      let ccrop= d.cultivo;
      let estado= d.estado;

    
  
      let clColor = "";

       if(ccluster === 0){
        clColor = "#feb236"
      }else if(ccluster === 1){
        clColor = "#6b5b95"
      } else if(ccluster === 2){
        clColor ="#d64161"
      } else if(ccluster === 3){
        clColor ="#82b74b"
      }else if(ccluster === 4){
        clColor ="#034f84"
      }else if(ccluster === 5){
        clColor ="#ff7b25"
      }else if(ccluster === 6){
        clColor ="#4040a1"
      }else{clColor= " #e06377"}
    
    if(cluster === ccluster){console.log('ok')}
     
    if (crop === "all" && cluster === "all"){
      L.circle(location, {
        fillOpacity: .5,
        color: clColor,
        fillColor: clColor,
        radius: rendimiento*200
      }).bindPopup("<h5>cluster: " + ccluster + 
      "</h5><hr><h6>Crop: " + ccrop +
        "</h6><h6>Rendimiento: "+ rendimiento + 
        "</h6><h6>Estado: "+estado+ "<h6>").addTo(myMap);
    } else if(crop === "all" && cluster === ccluster){
      
      L.circle(location, {
        fillOpacity: .5,
        color: clColor,
        fillColor: clColor,
        radius: rendimiento*200
      }).bindPopup("<h5>cluster: " + ccluster + 
      "</h5><hr><h6>Crop: " + ccrop +
        "</h6><h6>Rendimiento: "+ rendimiento + 
        "</h6><h6>Estado: "+estado+ "<h6>").addTo(myMap);

    } else if(crop === ccrop && cluster === "all"){
      L.circle(location, {
        fillOpacity: .5,
        color: clColor,
        fillColor: clColor,
        radius: rendimiento*200
      }).bindPopup("<h5>cluster: " + ccluster + 
      "</h5> <hr> <h6>Crop: " + ccrop +
        "</h6><h6>Rendimiento: "+ rendimiento + 
        "</h6><h6>Estado: "+estado).addTo(myMap);
    }else if(crop === ccrop && cluster === ccluster){
      L.circle(location, {
        fillOpacity: .5,
        color: clColor,
        fillColor: clColor,
        radius: rendimiento*200
      }).bindPopup("<h5>cluster: " + ccluster + 
      "</h5> <hr> <h6>Crop: " + ccrop +
        "</h6><h6>Rendimiento: "+ rendimiento + 
        "</h6><h6>Estado: "+estado).addTo(myMap);
    }

  
    });
   

  });
});



     
