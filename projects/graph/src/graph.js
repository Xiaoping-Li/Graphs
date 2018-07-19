/**
 * Edge
 */
export class Edge {
  // !!! IMPLEMENT ME
  // need to know start and end
  constructor(destination, weight) {
    this.destination = destination;
    this.weight = 1;
  }
}

/**
 * Vertex
 */
export class Vertex {
  // !!! IMPLEMENT ME
  constructor(value, pos = {x: -1, y: -1}) {
    this.value = value;
    this.edges = [];
    this.pos = pos;
  }
}

/**
 * Graph
 */
export class Graph {
  constructor() {
    this.vertexes = [];
  }

  /**
   * Create a random graph
   */
  randomize(width, height, pxBox, probability=0.6) {
    // Helper function to set up two-way edges
    function connectVerts(v0, v1) {
      v0.edges.push(new Edge(v1));
      v1.edges.push(new Edge(v0));
    }

    let count = 0;

    // Build a grid of verts
    let grid = [];
    for (let y = 0; y < height; y++) {
      let row = [];
      for (let x = 0; x < width; x++) {
        let v = new Vertex();
        //v.value = 'v' + x + ',' + y;
        v.value = 'v' + count++;
        row.push(v);
      }
      grid.push(row);
    }

    // Go through the grid randomly hooking up edges
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Connect down
        if (y < height - 1) {
          if (Math.random() < probability) {
            connectVerts(grid[y][x], grid[y+1][x]);
          }
        }

        // Connect right
        if (x < width - 1) {
          if (Math.random() < probability) {
            connectVerts(grid[y][x], grid[y][x+1]);
          }
        }
      }
    }

    // Last pass, set the x and y coordinates for drawing
    const boxBuffer = 0.8;
    const boxInner = pxBox * boxBuffer;
    const boxInnerOffset = (pxBox - boxInner) / 2;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        grid[y][x].pos = {
          'x': (x * pxBox + boxInnerOffset + Math.random() * boxInner) | 0,
          'y': (y * pxBox + boxInnerOffset + Math.random() * boxInner) | 0
        };
      }
    }

    // Finally, add everything in our grid to the vertexes in this Graph
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.vertexes.push(grid[y][x]);
      }
    }
  }

  /**
   * Dump graph data to the console
   */
  dump() {
    let s;

    for (let v of this.vertexes) {
      if (v.pos) {
        s = v.value + ' (' + v.pos.x + ',' + v.pos.y + '):';
      } else {
        s = v.value + ':';
      }

      for (let e of v.edges) {
        s += ` ${e.destination.value}`;
      }
      console.log(s);
    }
  }

  /**
   * BFS
   */
  bfs(start) {
    // !!! IMPLEMENT ME
    //  * Pick somewhere to start -> start at first vertex in the list and push it to the queue
    let queue = [];
    queue.push(start);

    // current group is o to start

    let currentGroup = 'red'; // Todo: start with a random color
    while(queue.length > 0) {
      //  * Our process
      //  * 1. go to first item in queue
      let current = queue[0];
      //  * 2. explore where it connects in this vertex
      for(edge in current.edges) {
        
        if(edge.destination.fillColor === 'white') {
          // a. check edges in this node
          queue.push(edge.destination);
          // b. adding the destination to the bottom of the queue
          edge.destination.fillColor = currentGroup;
        }
      }
      //  *  c. Add the destination to our visited list
    }

    
    //  * 3. remove the current node from queue
    //  * 4. call our process for the next node 
    //  *  A if the queue is empty, call for the next vertex in the list THAT IS UNVISTED if we dont have anywhere else to go (this means we start a new group)
    //  *  B But if we do have somewhere to go, to the next one in the queue
   
  }

  /**
   * Get the connected components
   */
  getConnectedComponents() {
    // !!! IMPLEMENT ME
  }
}


