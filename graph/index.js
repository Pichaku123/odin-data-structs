class Knight{
    constructor(pos, path) {
        this.pos = pos;
        this.path = [...path];
    }
    
}

function knightMoves(start, end) {
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

    const [startX, startY] = start;
    const [endX, endY] = end;

    let q = [];
    let visited = new Set();
    q.push(new Knight([startX, startY], [[startX, startY]]));   //add first instance of knight here
    visited.add(`${startX},${startY}`);

    while (q.length > 0) {
        let [currX, currY] = q[0].pos;
        let currPath = [...q[0].path]; //copy current path, cuz we're removing it
        q.shift();
        if (currX === endX && currY === endY) {
            console.log(`done in ${currPath.length - 1} moves.`);
            console.log(currPath);
            return currPath;
        }
        for (let [dx, dy] of moves) {
            let x = currX + dx;
            let y = currY + dy;
            if (
                x >= 0 &&
                x <= 7 &&
                y >= 0 &&
                y <= 7 &&
                !visited.has(`${x},${y}`)
            ) {
                visited.add(`${x},${y}`);
                q.push(new Knight([x,y], [...currPath, [x,y]]));
            }
        }
    }
}

knightMoves([0, 0], [3,4]);