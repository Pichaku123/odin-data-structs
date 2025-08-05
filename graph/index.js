function knightMoves(start, end) {
    const [startX, startY] = start;
    const [endX, endY] = end;
    let q = []; //ima try bfs cuz dfs might end up going on and on
    //basically i wanna take a parent node(and have access to path so far including current one)
    //and then i'll pop it, go to its child(check boundaries ofc), then add that child to child's path and so on.
    q.push({
        pos: [startX, startY],  //object used cuz each "parent" needs to have its own path, so like each vertice traveled has a "path so far"
        path: [[startX, startY]], //we'll add more vertices later ofc
    });
    //now we check possible directions, then we'll go to each one, IF WE HAVEN'T SEEN IT ALREADY, SO WE USE A SET
    let visited = new Set();
    visited.add(`${startX},${startY}`); //converted to string so that it doesn't store copy, so like [0,0] isn't same as [0,0], but string is.

    while (q.length > 0) {
        //pick 1 direction, check if possible, if yes then move there and search.
        let [currX, currY] = q[0].pos;
        let path = [...q[0].path]; //copy current path, cuz we're removing it
        q.shift();
        if (currX === endX && currY === endY) {
            console.log(`done in ${path.length - 1} moves.`);
            console.log(path);
            return path;
        }
        //go to other nodes
        for (let move of moves) {
            let x = currX + move[0];
            let y = currY + move[1];
            //check for boundary
            if (x >= 0 && x <= 7 && y >= 0 && y <= 7 && !visited.has(`${x},${y}`)) {
                visited.add(`${x},${y}`);
                q.push({
                    pos: [x, y],
                    path: [...path, [x, y]],
                });
            }
        }
    }
}

const moves = [
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
];

knightMoves([0, 0], [7, 7]);
