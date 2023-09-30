// ============================ Select elements ============================
const gridSection = document.querySelector("#gridSection");
const inputN = document.querySelector("#inputN");
const h1 = document.querySelector("#button");
let getPathBtn = null;

// ============================ Global variables ============================
let N = 0;

// ============================ Functions ============================
function createRow(n, diag_sqr) {
    const row = document.createElement("div");
    for (i = 0; i < n; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        if (diag_sqr === i + 1) {
            square.classList.add("diagonal");
        }
        row.appendChild(square);
    }
    row.classList.add("row", "justify-content-center");
    gridSection.appendChild(row);
}

function createGrid(n) {
    for (let i = 0; i < n; i++) {
        const diag_sqr = n - i
        createRow(n, diag_sqr);
    }
}

function generateDyckPaths(n) {
    const dyckPaths = [];
    function backtrack(path, open, close) {
        if (path.length === 2 * n) {
            dyckPaths.push(path);
            return;
        }
        if (open < n) {
            backtrack(path + 'R', open + 1, close);
        }
        if (close < open) {
            backtrack(path + 'U', open, close + 1);
        }
    }
    backtrack('', 0, 0);
    return dyckPaths;
}

function visualizePath(n, dyckPaths) {
    const rows = document.querySelectorAll(".row");
    const path = dyckPaths[0];
    const coords = [0, 0]
    for (let i = 0; i < path.length; i++) {
        if (path[i] === "R") {

        }
        else if (path[i] === "U") {

        }
    }
}

// ============================ Event listeners ============================
h1.addEventListener("click", (evt) => {
    // Read input for N
    evt.preventDefault();
    while (gridSection.firstChild) {
        gridSection.removeChild(gridSection.firstChild);
    }
    const n = parseInt(inputN.value);
    if (inputN.value === "" || n === 0) {
        console.log("INVALID! 'n' cannot be 0!");
    } else {
        console.log(`n = ${inputN.value}`);
        createGrid(n);
        N = n;

        const dyckPaths = generateDyckPaths(n);

        const getPathButton = document.createElement("button");
        getPathButton.innerText = "Get Path";
        getPathButton.classList.add("btn", "btn-warning")
        getPathButton.id = "getPath"
        gridSection.prepend(getPathButton);

        const result = document.createElement("p");
        result.innerText = `There are "${dyckPaths.length}" dyck paths in a ${n}x${n} grid`;
        gridSection.prepend(result);

        getPathBtn = document.querySelector("#getPath");
        getPathBtn.addEventListener("click", (evt) => {
            evt.preventDefault();
            const dyckPaths = generateDyckPaths(N);
            visualizePath(N, dyckPaths);
        })
    }
});