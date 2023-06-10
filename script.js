function rotateHeading(angle) {
    var arrowHead = document.getElementById("headingHead");
    var arrowTail = document.getElementById("headingTail");
    var image = document.getElementById("planeImage");
    var textElement = document.getElementById("headingText");
    arrowHead.setAttribute("transform", "rotate(" + angle + ")");
    arrowTail.setAttribute("transform", "rotate(" + angle + ")");
    image.setAttribute("transform", "rotate(" + angle + ")");
    textElement.textContent = angle + "°";
  }

function rotateWind(angle) {
    var arrowHead = document.getElementById("windHead");
    var arrowTail = document.getElementById("windTail");
    var textElement = document.getElementById("windText");
    arrowHead.setAttribute("transform", "rotate(" + angle + ")");
    arrowTail.setAttribute("transform", "rotate(" + angle + ")");
    textElement.textContent = angle + "°";
  }

function rotateTrack(angle) {
    var arrowHead = document.getElementById("trackHead");
    var arrowTail = document.getElementById("trackTail");
    var textElement = document.getElementById("trackText");
    arrowHead.setAttribute("transform", "rotate(" + angle + ")");
    arrowTail.setAttribute("transform", "rotate(" + angle + ")");
    textElement.textContent = angle + "°";
  }

function results(wca, heading, gs) {
    var wcaResult = document.getElementById("wcaResult");
    var headingResult = document.getElementById("headingResult");
    var gsResult = document.getElementById("gsResult");
    wcaResult.textContent = wca + "°";
    headingResult.textContent = heading + "°";
    gsResult.textContent = gs + "kts";

}

function updateInputs() {
    var track = document.getElementById("track").value;
    var tas = document.getElementById("tas").value;
    var windSpeed = document.getElementById("windSpeed").value;
    var windDir = document.getElementById("windDir").value;
    
    rotateTrack(track)
    rotateWind(windDir)

    var windDirRad = (windDir * Math.PI) / 180;
    var trackRad = (track * Math.PI) / 180;

    var wca = Math.round(calculateWindCorrectionAngle(windSpeed, windDirRad, trackRad, tas));
    var gs = Math.round(calculateGroundSpeed(windSpeed, windDirRad, trackRad, tas));
    var heading = Math.round(+track + +wca);

    rotateHeading(heading)
    results(wca, heading, gs)
}

function calculateWindCorrectionAngle(windSpeed, windDirRad, courseRad, airspeed) {
    var windCorrectionAngleRad = Math.asin(windSpeed * Math.sin(windDirRad - courseRad) / airspeed);
    var windCorrectionAngleDeg = (windCorrectionAngleRad * 180) / Math.PI;
    return windCorrectionAngleDeg
}

function calculateGroundSpeed(windSpeed, windDirRad, courseRad, airspeed) {  
    var groundSpeed = Math.sqrt(Math.pow(airspeed, 2) + Math.pow(windSpeed, 2) - 2 * airspeed * windSpeed * Math.cos(windDirRad - courseRad)); 
    return groundSpeed;
}
  
  