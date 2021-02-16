import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewInit {
  @ViewChild("mapContainer", { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  lat = 51.346985307505;
  lng = 12.378757067484615;
  
  markers = [
    {
      position: new google.maps.LatLng(51.356985307505, 12.368757067484615),
      map: this.map,
      title: "First Bike Location"
    },
    {
      position: new google.maps.LatLng(51.326985307505,12.358757067484615),
      map: this.map,
      title: "Second Bike Location"
    }
  ];

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };


  //Default Marker
  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
    title: "Leipzig HBF!"
  });

  ngAfterViewInit(): void {
    this.mapInitializer();
  }

  mapInitializer(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);

    this.marker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: this.marker.getTitle()
      });
      infoWindow.open(this.marker.getMap(), this.marker);
    });

    this.marker.setMap(this.map);

    this.loadAllMarkers();
    this.loadAllPolygons();
  }
  
  loadAllPolygons(): void {
    this.loadCentrumStation();
    this.loadMarktetStation();
  }

  loadCentrumStation(): void{
    const centrumStationCoords = [
      { lat: 51.346402, lng: 12.376193 },
      { lat: 51.346161, lng: 12.375914 },
      { lat: 51.346094, lng: 12.375603 },
      { lat: 51.346248, lng: 12.376032 },
    ];
  
      const centrumStation = new google.maps.Polygon({
      paths: centrumStationCoords,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    });

    centrumStation.setMap(this.map);
  }

  loadMarktetStation(): void{
    const marketStationCoords = [
      { lat: 51.345402, lng: 12.375193 },
      { lat: 51.344161, lng: 12.374914 },
      { lat: 51.343094, lng: 12.373603 },
      { lat: 51.342248, lng: 12.372032 },
    ];
  
      const marketStation = new google.maps.Polygon({
      paths: marketStationCoords,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    });

    marketStation.setMap(this.map);
  }

  loadAllMarkers(): void {
    this.markers.forEach(markerInfo => {
      const marker = new google.maps.Marker({
        ...markerInfo
      });

      const infoWindow = new google.maps.InfoWindow({
        content: marker.getTitle()
      });

      marker.addListener("click", () => {
        infoWindow.open(marker.getMap(), marker);
      });

      marker.setMap(this.map);
    });
  }
}
