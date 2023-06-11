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

    var distance = document.getElementById("distance").value;
    calculateTime(distance)
}

function calculateWindCorrectionAngle(windSpeed, windDirRad, courseRad, airspeed) {
    var windCorrectionAngleRad = Math.asin(windSpeed * Math.sin(windDirRad - courseRad) / airspeed);
    var windCorrectionAngleDeg = (windCorrectionAngleRad * 180) / Math.PI;
    return windCorrectionAngleDeg
}

function calculateGroundSpeed(windSpeed, windDirRad, courseRad, airspeed) {  
    var groundSpeed = Math.round(airspeed * Math.sqrt(1 - Math.pow((windSpeed/airspeed) * Math.sin(windDirRad - courseRad), 2)) - (windSpeed * Math.cos(windDirRad - courseRad)));
    return groundSpeed;
}

function calculateTime(distance) {  
    var gsResult = document.getElementById("gsResult").textContent.split("k")[0];
    var time = Math.round(distance / gsResult * 60);

    var timeResult = document.getElementById("time");
    timeResult.textContent = time + " minutes";
}

function calculateFuel() {
    var f = document.getElementById("fuelAmount").value;
    var fBurn = document.getElementById("fuelBurn").value;
    var timeText = document.getElementById("fuelTime");

    var hours = Math.floor(f/fBurn);
    var minutes = Math.round(60 * (f/fBurn - hours));

    timeText.textContent = hours + " hours, " + minutes + " minutes"
}

function calculateTas() {
    var pa = Number(document.getElementById('pa').value);
    var oat = Number(document.getElementById('oat').value);
    var ias = Number(document.getElementById('tasIas').value);
    var tas = document.getElementById('tasCalc');
    tas.textContent = Math.round(ias * 1 / Math.pow(Math.pow((288.15 - (pa * 1 + (288.15 - pa * 0.0019812) / 0.0019812 * (1 - Math.pow((288.15 - pa * 0.0019812) / (oat * 1 + 273.15), 0.234969))) * 0.0019812) / 288.15, 1 / 0.234969), .5)) + "kts";
}