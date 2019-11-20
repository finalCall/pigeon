function shortestPath(edges, numVertices, startVertex) {
    var done = new Array(numVertices);
    done[startVertex] = true;
    var pathLengths = new Array(numVertices);
    var predecessors = new Array(numVertices);
    for (var i = 0; i < numVertices; i++) {
      pathLengths[i] = edges[startVertex][i];
      if (edges[startVertex][i] != Infinity) {
        predecessors[i] = startVertex;
      }
    }
    pathLengths[startVertex] = 0;
    for (var i = 0; i < numVertices - 1; i++) {
      var closest = -1;
      var closestDistance = Infinity;
      for (var j = 0; j < numVertices; j++) {
        if (!done[j] && pathLengths[j] < closestDistance) {
          closestDistance = pathLengths[j];
          closest = j;
        }
      }
      done[closest] = true;
      for (var j = 0; j < numVertices; j++) {
        if (!done[j]) {
          var possiblyCloserDistance = pathLengths[closest] + edges[closest][j];
          if (possiblyCloserDistance < pathLengths[j]) {
            pathLengths[j] = possiblyCloserDistance;
            predecessors[j] = closest;
          }
        }
      }
    }
    return { "startVertex": startVertex,
             "pathLengths": pathLengths,
             "predecessors": predecessors };
  }
  
  function constructPath(shortestPathInfo, endVertex) {
    var path = [];
    while (endVertex != shortestPathInfo.startVertex) {
      path.unshift(endVertex);
      endVertex = shortestPathInfo.predecessors[endVertex];
    }
    return path;
  }

  
var dist12 = getDistance([wareHouseLat[0], wareHouseLong[0]], [wareHouseLat[1], wareHouseLong[1]]);
var dist13 = getDistance([wareHouseLat[0], wareHouseLong[0]], [wareHouseLat[2], wareHouseLong[2]]);
var dist15 = getDistance([wareHouseLat[0], wareHouseLong[0]], [wareHouseLat[4], wareHouseLong[4]]);
var dist16 = getDistance([wareHouseLat[0], wareHouseLong[0]], [wareHouseLat[5], wareHouseLong[5]]);
var dist23 = getDistance([wareHouseLat[1], wareHouseLong[1]], [wareHouseLat[2], wareHouseLong[2]]);
var dist24 = getDistance([wareHouseLat[1], wareHouseLong[1]], [wareHouseLat[3], wareHouseLong[3]]);
var dist26 = getDistance([wareHouseLat[1], wareHouseLong[1]], [wareHouseLat[5], wareHouseLong[5]]);
var dist34 = getDistance([wareHouseLat[2], wareHouseLong[2]], [wareHouseLat[3], wareHouseLong[3]]);
var dist35 = getDistance([wareHouseLat[2], wareHouseLong[2]], [wareHouseLat[4], wareHouseLong[4]]);
var dist45 = getDistance([wareHouseLat[3], wareHouseLong[3]], [wareHouseLat[4], wareHouseLong[4]]);
var dist46 = getDistance([wareHouseLat[3], wareHouseLong[3]], [wareHouseLat[5], wareHouseLong[5]]);
var dist56 = getDistance([wareHouseLat[4], wareHouseLong[4]], [wareHouseLat[5], wareHouseLong[5]]);
var distsrccntr = [];
var distdestcntr = [];
var srccntr = 0;
var destcntr = 0;

var _ = Infinity;
var e = [
  [_ ,dist12 ,dist13 ,_ ,dist15 ,dist16],
  [dist12 ,_ ,dist23 ,dist24 ,_ ,dist26],
  [dist13 ,dist23 ,_ ,dist34 ,dist35 ,_],
  [_ ,dist24 ,dist34 ,_ ,dist45 ,dist46],
  [dist15 ,_ ,dist35 ,dist45 ,_ ,dist56],
  [dist16 ,dist26 ,_ ,dist46 ,dist56 ,_]
];


function nrstcenter(){
    var x;
    distsrccntr[0] = getDistance([sourceLat, sourceLong], [wareHouseLat[0], wareHouseLong[0]]);
    distsrccntr[1] = getDistance([sourceLat, sourceLong], [wareHouseLat[1], wareHouseLong[1]]);
    distsrccntr[2]= getDistance([sourceLat, sourceLong], [wareHouseLat[2], wareHouseLong[2]]);
    distsrccntr[3] = getDistance([sourceLat, sourceLong], [wareHouseLat[3], wareHouseLong[3]]);
    distsrccntr[4] = getDistance([sourceLat, sourceLong], [wareHouseLat[4], wareHouseLong[4]]);
    distsrccntr[5] = getDistance([sourceLat, sourceLong], [wareHouseLat[5], wareHouseLong[5]]);
    x=distsrccntr[0];
    for (var i = 1; i<6;i++) {
        if(distsrccntr[i] < x)
        {
            x = distsrccntr[i];
            srccntr = i;
        }
    }
    distdestcntr[0] = getDistance([destinationLat, destinationLong], [wareHouseLat[0], wareHouseLong[0]]);
    distdestcntr[1] = getDistance([destinationLat, destinationLong], [wareHouseLat[1], wareHouseLong[1]]);
    distdestcntr[2] = getDistance([destinationLat, destinationLong], [wareHouseLat[2], wareHouseLong[2]]);
    distdestcntr[3] = getDistance([destinationLat, destinationLong], [wareHouseLat[3], wareHouseLong[3]]);
    distdestcntr[4] = getDistance([destinationLat, destinationLong], [wareHouseLat[4], wareHouseLong[4]]);
    distdestcntr[5] = getDistance([destinationLat, destinationLong], [wareHouseLat[5], wareHouseLong[5]]);

    x=distdestcntr[0];
    for (var i = 1; i<6;i++) {
        if(distdestcntr[i] < x)
        {
            x = distdestcntr[i];
            destcntr = i;
        }
    }

    // Compute the shortest paths from vertex number srccntr to each other vertex
// in the graph.
var shortestPathInfo = shortestPath(e, 6, srccntr);

// Get the shortest path from vertex srccntr to vertex destcntr.
var path = constructPath(shortestPathInfo,destcntr);
console.log(path)

//Printing Path

var intervalId;
var runcount = 0;

function PrintPath(){
  if(runcount==(path.length-1)){
    clearInterval(intervalId)
  }
  if(runcount!=(path.length-1))
  {
    var myMovingMarker = L.Marker.movingMarker([[wareHouseLat[path[runcount]], wareHouseLong[path[runcount]]], [wareHouseLat[path[runcount+1]], wareHouseLong[path[runcount+1]]]],
    [4000],{icon: droneIcon}).addTo(map);

  myMovingMarker.start();}
  else{
    var myMovingMarker = L.Marker.movingMarker([[wareHouseLat[path[(path.length-1)]], wareHouseLong[path[(path.length-1)]]],[destinationLat,destinationLong]],
    [4000],{icon: droneIcon}).addTo(map);
    myMovingMarker.start();
  }
  runcount++;
}

var myMovingMarker = L.Marker.movingMarker([[sourceLat, sourceLong],[wareHouseLat[path[0]], wareHouseLong[path[0]]]],
  [4000],{icon: droneIcon}).addTo(map);
myMovingMarker.start();

intervalId = setInterval(PrintPath, 4000)

}
deliver.addEventListener('click',nrstcenter);
