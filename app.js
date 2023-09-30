// spaghetti code.

// ============================ Select elements ============================
const gridSection = document.querySelector("#gridSection");
const inputN = document.querySelector("#inputN");
const h1 = document.querySelector("#button");
const catalan = document.querySelector("#catalan");
let getPathBtn = null;

// ============================ Global variables ============================
let N = 0;
let index = 0;

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
    const diag_sqr = n - i;
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
      backtrack(path + "R", open + 1, close);
    }
    if (close < open) {
      backtrack(path + "U", open, close + 1);
    }
  }
  backtrack("", 0, 0);
  return dyckPaths;
}

function visualizePath(dyckPaths) {
  getPathBtn = document.querySelector("#getPath");
  getPathBtn.innerText = "Next";
  if (index >= dyckPaths.length) {
    index = 0;
  }

  const rows = document.querySelectorAll(".row");
  const path = dyckPaths[index];
  const singularPath = document.querySelector("#singularPath");
  if (index === 0) {
    singularPath.innerHTML = `${index + 1}st dyck path: <b>${path}</b>`;
  } else if (index === 1) {
    singularPath.innerHTML = `${index + 1}nd dyck path: <b>${path}</b>`;
  } else if (index === 2) {
    singularPath.innerHTML = `${index + 1}rd dyck path: <b>${path}</b>`;
  } else {
    singularPath.innerHTML = `${index + 1}th dyck path: <b>${path}</b>`;
  }
  console.log(path);
  const coords = [0, 0];

  // Delete previous path
  for (let row of rows) {
    const squares = row.querySelectorAll(".square");
    for (const sqr of squares) {
      sqr.classList.remove("up", "upRight", "right");
    }
  }
  // Draw path
  let forceLeft = false;
  let cheat = 0;
  for (let i = 0; i < path.length; i++) {
    const row = rows[rows.length - coords[1] - 1].children;
    const square = row[coords[0]];
    if (path[i] === "U") {
      if (
        coords[0] === path.length / 2 - 1 &&
        forceLeft === false &&
        row[cheat] === undefined
      ) {
        square.classList.add("upRight");
      } else {
        square.classList.add("up");
      }
      if (path[i + 1] === "R") {
        forceLeft = false;
      }
      coords[1] += 1;
    } else if (path[i] === "R") {
      square.classList.add("right");
      if (coords[0] < path.length / 2 - 1) {
        coords[0] += 1;
      }
      if (path[i + 1] === "U" && i < path.length / 2 - 1) {
        forceLeft = true;
      }
      cheat += 1;
      // else if (path[i + 1] === "U" && ) {
      //     forceLeft = true;
      // }
    }
    console.log(coords);
  }
  index += 1;
}

// ============================ Event listeners ============================
h1.addEventListener("click", (evt) => {
  // Read input for N
  evt.preventDefault();
  while (gridSection.firstChild) {
    gridSection.removeChild(gridSection.firstChild);
  }
  const n = Number(inputN.value);
  if (inputN.value === "") {
    catalan.innerText = "\\[\\LARGE C_n=\\frac{1}{n + 1}\\binom{2n}{n}\\]";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, catalan]);
    alert("INVALID: 'n' cannot be empty!");
  } else if (n === 0) {
    catalan.innerText = "\\[\\LARGE C_n=\\frac{1}{n + 1}\\binom{2n}{n}\\]";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, catalan]);
    alert("INVALID: 'n' has to be an integer greater than 0!");
  } else if (Number.isInteger(n) === false) {
    catalan.innerText = "\\[\\LARGE C_n=\\frac{1}{n + 1}\\binom{2n}{n}\\]";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, catalan]);
    alert("INVALID: 'n' has to be an integer!");
  } else {
    console.log(`n = ${inputN.value}`);
    createGrid(n);

    const dyckPaths = generateDyckPaths(n);

    catalan.innerText = `\\[\\LARGE C_n=\\frac{1}{(${n}) + 1}\\binom{2(${n})}{${n}}=${dyckPaths.length}\\]`;
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, catalan]);
    N = n;

    const singularPath = document.createElement("p");
    singularPath.id = "singularPath";
    gridSection.prepend(singularPath);

    const resetButton = document.createElement("button");
    resetButton.innerText = "Reset";
    resetButton.classList.add("btn", "btn-outline-secondary");
    resetButton.id = "resetButton";
    resetButton.style.marginLeft = "0.25em";

    const getPathButton = document.createElement("button");
    getPathButton.innerText = "Get Path";
    getPathButton.classList.add("btn", "btn-outline-primary");
    getPathButton.id = "getPath";
    resetButton.style.marginRight = "0.25em";
    gridSection.prepend(getPathButton);

    const result = document.createElement("p");
    result.innerText = `There are "${dyckPaths.length}" dyck paths in a ${n}x${n} grid`;
    gridSection.prepend(result);

    const getPathBtn = document.querySelector("#getPath");
    getPathBtn.addEventListener("click", (evt) => {
      evt.preventDefault();
      const dyckPaths = generateDyckPaths(N);
      visualizePath(dyckPaths);
      getPathBtn.insertAdjacentElement("afterend", resetButton);
    });
    resetButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      index = 0;
      const dyckPaths = generateDyckPaths(N);
      visualizePath(dyckPaths);
    });
  }
});
