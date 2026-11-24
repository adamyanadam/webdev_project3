document.addEventListener("DOMContentLoaded", function () {
  var questionsButton = document.getElementById("questions-btn");

  if (questionsButton) {
    questionsButton.addEventListener("click", function () {
      alert("If you have questions, contact me at:\nayan3@cps.edu");
    });
  }
});

function initMap() {
  var mapElement = document.getElementById("map");
  if (!mapElement || typeof google === "undefined" || !google.maps) {
    return;
  }

  //center coordinates between chicago and uiuc
  var center = { lat: 40.99, lng: -87.93 };

  var map = new google.maps.Map(mapElement, {
    center: center,
    zoom: 7.4
  });

  //feature 1: box around urbana
  new google.maps.Rectangle({
    strokeColor: "#b91c1c",
    strokeOpacity: 0.9,
    strokeWeight: 2,
    fillColor: "#ef4444",
    fillOpacity: 0.2,
    map: map,
    bounds: {
      north: 40.16,
      south: 40.04,
      east: -88.15,
      west: -88.31
    }
  });

  //feature 2: markers with infowindows of the school name for each
  var schools = [
    {
      title: "Illinois Institute of Technology - Stuart School of Business",
      position: { lat: 41.83185523702051, lng: -87.62723076868025 }
    },
    {
      title: "University of Illinois Chicago - College of Business Administration",
      position: { lat: 41.873838932172376, lng: -87.65106629599421 }
    },
    {
      title: "Loyola University Chicago - Quinlan School of Business",
      position: { lat: 41.89781067513475, lng: -87.62811762046623 }
    },
    {
      title: "DePaul University - Driehaus College of Business",
      position: { lat: 41.877602128011674, lng: -87.627219542176 }
    },
    {
      title: "University of Illinois Urbana-Champaign - Gies College of Business",
      position: { lat: 40.10384802075491, lng: -88.23042692420965 }
    }
  ];

  for (var i = 0; i < schools.length; i++) {
    var marker = new google.maps.Marker({
      position: schools[i].position,
      map: map,
      title: schools[i].title
    });

    (function (currentMarker, schoolTitle) {
      var infoWindow = new google.maps.InfoWindow({
        content: "<p><strong>" + schoolTitle + "</strong></p>"
      });

      currentMarker.addListener("click", function () {
        infoWindow.open(map, currentMarker);
      });
    })(marker, schools[i].title);
  }

  //feature 3: highlighted radius circle around chicago
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
}
