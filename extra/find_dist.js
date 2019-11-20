var dist12 = getDistance([wareHouse1Lat, wareHouse1Long], [wareHouse2Lat, wareHouse2Long]);
var dist13 = getDistance([wareHouse1Lat, wareHouse1Long], [wareHouse3Lat, wareHouse3Long]);
var dist15 = getDistance([wareHouse1Lat, wareHouse1Long], [wareHouse5Lat, wareHouse5Long]);
var dist16 = getDistance([wareHouse1Lat, wareHouse1Long], [wareHouse6Lat, wareHouse6Long]);
var dist23 = getDistance([wareHouse2Lat, wareHouse2Long], [wareHouse3Lat, wareHouse3Long]);
var dist24 = getDistance([wareHouse2Lat, wareHouse2Long], [wareHouse4Lat, wareHouse4Long]);
var dist26 = getDistance([wareHouse2Lat, wareHouse2Long], [wareHouse6Lat, wareHouse6Long]);
var dist34 = getDistance([wareHouse3Lat, wareHouse3Long], [wareHouse4Lat, wareHouse4Long]);
var dist35 = getDistance([wareHouse3Lat, wareHouse3Long], [wareHouse5Lat, wareHouse5Long]);
var dist45 = getDistance([wareHouse4Lat, wareHouse4Long], [wareHouse5Lat, wareHouse5Long]);
var dist46 = getDistance([wareHouse4Lat, wareHouse4Long], [wareHouse6Lat, wareHouse6Long]);
var dist56 = getDistance([wareHouse5Lat, wareHouse5Long], [wareHouse6Lat, wareHouse6Long]);
var distsrccntr = [];
var distdestcntr = [];
var srccntr = 0;
var destcntr = 0;

function nrstcenter(){
    var x;
    distsrccntr[0] = getDistance([sourceLat, sourceLong], [wareHouse1Lat, wareHouse1Long]);
    distsrccntr[1] = getDistance([sourceLat, sourceLong], [wareHouse2Lat, wareHouse2Long]);
    distsrccntr[2]= getDistance([sourceLat, sourceLong], [wareHouse3Lat, wareHouse3Long]);
    distsrccntr[3] = getDistance([sourceLat, sourceLong], [wareHouse4Lat, wareHouse4Long]);
    distsrccntr[4] = getDistance([sourceLat, sourceLong], [wareHouse5Lat, wareHouse5Long]);
    distsrccntr[5] = getDistance([sourceLat, sourceLong], [wareHouse6Lat, wareHouse6Long]);
    x=distsrccntr[0];
    for (var i = 1; i<6;i++) {
        if(distsrccntr[i] < x)
        {
            x = distsrccntr[i];
            srccntr = i;
        }
    }
    distdestcntr[0] = getDistance([destinationLat, destinationLong], [wareHouse1Lat, wareHouse1Long]);
    distdestcntr[1] = getDistance([destinationLat, destinationLong], [wareHouse2Lat, wareHouse2Long]);
    distdestcntr[2] = getDistance([destinationLat, destinationLong], [wareHouse3Lat, wareHouse3Long]);
    distdestcntr[3] = getDistance([destinationLat, destinationLong], [wareHouse4Lat, wareHouse4Long]);
    distdestcntr[4] = getDistance([destinationLat, destinationLong], [wareHouse5Lat, wareHouse5Long]);
    distdestcntr[5] = getDistance([destinationLat, destinationLong], [wareHouse6Lat, wareHouse6Long]);

    x=distdestcntr[0];
    for (var i = 1; i<6;i++) {
        if(distdestcntr[i] < x)
        {
            x = distdestcntr[i];
            destcntr = i;
        }
    }
    console.log(srccntr+1);
    console.log(destcntr+1);
}
deliver.addEventListener('click',nrstcenter);