function loadPollutionData() {
  let xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    "https://airapi.airly.eu/v2/installations/nearest?lat=50.062006&lng=19.940984&maxDistanceKM=3&maxResults=1",
    true
  );

  xhr.onload = function() {
    if (this.status == 200) {
      let JSONData = JSON.parse(this.responseText);
      console.log(JSONData);
    } else if (this.status == 400 || 404) {
      console.log("ERROR");
    }
  };

  xhr.setRequestHeader("Accept", "application/jason");
  xhr.setRequestHeader("apikey", "wrx2BgtI1X3VvDyxV3IpjFuL7FW0jBUk");

  xhr.send();
}

loadPollutionData();
