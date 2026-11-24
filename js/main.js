function init() {
  var button = document.getElementById("questionsButton");

  if (button) {
    button.addEventListener("click", function () {
      alert("If you have questions, contact me at:\nayan3@cps.edu");
    });
  }

  initMap();
}

function initMap() {
  var center = { lat: 40.990974, lng: -87.930122 };

  var map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 7.4
  });

  //feature 1: box around urbana-champaign
  new google.maps.Rectangle({
    strokeColor: "#b91c1c",
    strokeOpacity: 1,
    strokeWeight: 3,
    fillColor: "#ef4444",
    fillOpacity: 0.25,
    map: map,
    bounds: {
      north: 40.16,
      south: 40.04,
      east: -88.15,
      west: -88.31
    }
  });

  //feature 2: school markers with logos and popup
  var schools = [
    {
      title: "Illinois Institute of Technology - Stuart School of Business",
      position: { lat: 41.83185523702051, lng: -87.62723076868025 },
      icon: "images/iit.svg"
    },
    {
      title: "University of Illinois Chicago - College of Business Administration",
      position: { lat: 41.873838932172376, lng: -87.65106629599421 },
      icon: "images/uic.svg"
    },
    {
      title: "Loyola University Chicago - Quinlan School of Business",
      position: { lat: 41.89781067513475, lng: -87.62811762046623 },
      icon: "images/loyola.jpeg"
    },
    {
      title: "DePaul University - Driehaus College of Business",
      position: { lat: 41.877602128011674, lng: -87.627219542176 },
      icon: "images/depaul.png"
    },
    {
      title: "University of Illinois Urbana-Champaign - Gies College of Business",
      position: { lat: 40.10384802075491, lng: -88.23042692420965 },
      icon: "images/uiuc.png"
    }
  ];

  var infoWindow = new google.maps.InfoWindow();

  for (var i = 0; i < schools.length; i++) {
    var logo = {
      url: schools[i].icon,
      scaledSize: new google.maps.Size(36, 36)
    };

    var marker = new google.maps.Marker({
      position: schools[i].position,
      map: map,
      title: schools[i].title,
      icon: logo
    });

    marker.addListener("click", function () {
      infoWindow.setContent("<p><strong>" + this.getTitle() + "</strong></p>");
      infoWindow.open(map, this);
    });
  }

  //feature 3: circle around chicago
  new google.maps.Circle({
    strokeColor: "#0a0908",
    strokeOpacity: 0.85,
    strokeWeight: 2,
    fillColor: "#3b82f6",
    fillOpacity: 0.2,
    map: map,
    center: { lat: 41.8781, lng: -87.6298 },
    radius: 9000
  });

  //feature 4: line from chicago to urbana-champaign
  new google.maps.Polyline({
    path: [
      { lat: 41.8781, lng: -87.6298 },
      { lat: 40.10384802075491, lng: -88.23042692420965 }
    ],
    strokeColor: "#16a34a",
    strokeOpacity: 0.9,
    strokeWeight: 3,
    map: map
  });
}

window.addEventListener("load", init);
