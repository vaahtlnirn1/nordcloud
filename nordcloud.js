// Device coordinates
let deviceCoordinates = [
    [0, 0],
    [100, 100],
    [15, 10],
    [18, 18],
    [13, 13],
    [25, 99]
];

// Distance between coordinates
function coordinatesDistance(coordinateA, coordinateB) {
    return Math.sqrt(Math.pow(Math.abs(coordinateA[0] - coordinateB[0]), 2) + Math.pow(Math.abs(coordinateA[1] - coordinateB[1]), 2));
}

function findPossibleNearStation(coordinate) {
    let netStations = [
        {coordinates: [0, 0], reach: 9, speed: 0},
        {coordinates: [20, 20], reach: 6, speed: 0},
        {coordinates: [10, 0], reach: 12, speed: 0},
        {coordinates: [5, 5], reach: 13, speed: 0},
        {coordinates: [99, 25], reach: 2, speed: 0}
    ];

    let possibleStation = netStations.map(function (station) {
        station.speed = calculateSpeed(coordinatesDistance(coordinate, station.coordinates), station.reach);
        return station;
    }).filter(function (station) {
        return station.speed > 0;
    }).sort(function (stationA, stationB) {
        return stationA.speed > stationB.speed;
    }).pop();

    return {
        point: coordinate,
        station: possibleStation
    };
}

// Calculate speed
function calculateSpeed(distance, reach) {
    return (distance > reach) ? 0 : Math.pow((reach - distance), 2);
}

// Find stations
deviceCoordinates.map(findPossibleNearStation).map(function (value) {
    if (!value.station) {
        console.log("\nPoint [", value.point[0], ',', value.point[1], "]: No network station within reach")
    } else {
        console.log("\nPoint [", value.point[0], ',', value.point[1], "]: Best network station at [",
            value.station.coordinates[0], ',', value.station.coordinates[1], "] with speed: ", value.station.speed);
    }
});