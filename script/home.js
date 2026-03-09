let openArr = [];
let closeArr = [];
//find the necessary elements
const allBtn = document.getElementById("all");
const openBtn = document.getElementById("open");
const closedBtn = document.getElementById("closed");
const issuesTitle = document.getElementById("issues-title");
const allCards = document.getElementById("all-cards");
const badgeStyle = document.getElementById("show-badge");
const spinnerLoad = document.getElementById("loading-spinner");

function loadSpinner(status) {
  if (status == true) {
    spinnerLoad.classList.remove("hidden");
    allCards.classList.add("hidden");
  } else {
    spinnerLoad.classList.add("hidden");
    allCards.classList.remove("hidden");
  }
}

async function showActive(id) {
  loadSpinner(true);
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  //added classes from the active btn
  allBtn.classList.add("btn-bg-base-200");
  openBtn.classList.add("btn-bg-base-200");
  closedBtn.classList.add("btn-bg-base-200");

  //remove classes from the active btn
  allBtn.classList.remove("btn-primary");
  openBtn.classList.remove("btn-primary");
  closedBtn.classList.remove("btn-primary");

  //selected correct btn active
  const activeBtn = document.getElementById(id);
  activeBtn.classList.remove("btn-bg-base-200");
  activeBtn.classList.add("btn-primary");

  if (activeBtn == allBtn) {
    issuesTitle.innerText = data.data.length + " " + "Issues";
    showAllIssues(data.data);
  }
  if (activeBtn == openBtn) {
    generateOpenCards(data.data);
    issuesTitle.innerText = openArr.length + " " + "Issues";
    loadSpinner(false);
  }
  if (activeBtn == closedBtn) {
    generateCloseCards(data.data);
    issuesTitle.innerText = closeArr.length + " " + "Issues";
    loadSpinner(false);
  }
}

// load  issues
const loadIssues = async () => {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  showAllIssues(data.data);
};

// generateBadgeStatus function
function generateBadgeStatus(arr) {
  const badgeStatus = arr.map((a) => {
    return a == "bug"
      ? `<div class="badge badge-outline bg-red-100 text-error rounded-full uppercase py-3.5">
                    <i class="fa-solid fa-bug"></i>
                    ${a}
                  </div>`
      : a == "help wanted"
        ? `<div class="badge badge-warning bg-yellow-100 text-yellow-600 rounded-full uppercase py-3.5"><i class="fa-regular fa-life-ring"></i>
                    ${a}
                  </div>`
        : a == "enhancement"
          ? `<div class="badge badge-outline bg-green-100 text-success rounded-full uppercase py-3.5">
      <i class="fa-solid fa-wand-magic-sparkles"></i>${a}</div>`
          : a == "documentation"
            ? `<div class="badge badge-outline badge-secondary bg-pink-100 text-pink-500 rounded-full uppercase py-3.5"><i class="fa-brands fa-readme"></i>${a}
       </div>`
            : `<div class="badge badge-outline badge-info bg-sky-100 text-info rounded-full uppercase py-3.5"><i class="fa-solid fa-star-of-life"></i>${a}</div>`;
  });
  return badgeStatus.join(" ");
}

// show all the issues
function showAllIssues(issues) {
  allCards.innerHTML = "";
  issues.forEach((issue) => {
    const div = document.createElement("div");
    div.className =
      "card bg-base-100 shadow-md rounded-xl border border-gray-200";

    div.innerHTML = `
     <div onclick="loadSingleIssues('${issue.id}')" class="card-body p-0 border-t-3 rounded-xl  ${issue.status == "open" ? "border-green-500" : "border-purple-500"} ">
              <div class="p-4 space-y-3 h-full">
                <div class="flex justify-between items-center">
                  <img src="${issue.status == "closed" ? "./assets/Closed-Status.png" : "./assets/Open-Status.png"}" />

                  ${
                    issue.priority == "high"
                      ? `<span
                    class="badge badge-error bg-red-100 text-error border-0 rounded-full uppercase px-6 py-3.5"
                    >${issue.priority}</span>`
                      : `${
                          issue.priority == "medium"
                            ? `<span
      class="badge badge-error bg-yellow-100 text-yellow-500 border-0 rounded-full uppercase px-6 py-3.5">${issue.priority}
    </span>`
                            : `<span class="badge badge-error bg-gray-200 text-gray-400 border-0 rounded-full uppercase px-6 py-3.5">${issue.priority}</span>`
                        }`
                  }
                </div>
                <div class="h-24">
                  <h2 class="card-title font-semibold text-[16px] ">
                    ${issue.title}
                  </h2>
                  <p class="line-clamp-2 text-sm text-gray-500">
                    ${issue.description}
                  </p>
                </div>
                <div id="show-badge" class="card-actions justify-start gap-1">
                  ${generateBadgeStatus(issue.labels)}
                </div>
              </div>
              <div class="bg-gray-300 w-full h-0.5"></div>
              <div class="p-4 space-y-2">
                <p class="text-sm text-gray-500">#1 by ${issue.author}</p>
                <p class="text-sm text-gray-500">${new Date(issue.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

    `;
    allCards.appendChild(div);
    loadSpinner(false);
  });
}

//generate cards for open status
const generateOpenCards = async (arr) => {
  allCards.innerHTML = "";
  //filtering the array of open status
  openArr = arr.filter((open) => open.status === "open");
  //render the open status
  openArr.forEach((open) => {
    const div = document.createElement("div");
    div.className =
      "card bg-base-100 shadow-md rounded-xl border border-gray-200";
    div.innerHTML = `
      <div onclick="loadSingleIssues('${open.id}')" class="card-body p-0 border-t-3 rounded-xl border-green-500 ">
              <div class="p-4 space-y-3 h-full">
                <div class="flex justify-between items-center">
                  <img src="./assets/Open-Status.png" />
                  ${
                    open.priority == "high"
                      ? `<span
                    class="badge badge-error bg-red-100 text-error border-0 rounded-full uppercase px-6 py-3.5"
                    >${open.priority}</span>`
                      : `${
                          open.priority == "medium"
                            ? `<span
      class="badge badge-error bg-yellow-100 text-yellow-500 border-0 rounded-full uppercase px-6 py-3.5">${open.priority}
    </span>`
                            : `<span class="badge badge-error bg-gray-200 text-gray-400 border-0 rounded-full uppercase px-6 py-3.5">${open.priority}</span>`
                        }`
                  }
                </div>
                <div class="h-24">
                  <h2 class="card-title font-semibold text-[16px] ">
                    ${open.title}
                  </h2>
                  <p class="line-clamp-2 text-sm text-gray-500">
                    ${open.description}
                  </p>
                </div>
                <div id="show-badge" class="card-actions justify-start gap-1">
                  ${generateBadgeStatus(open.labels)}
                </div>
              </div>
              <div class="bg-gray-300 w-full h-0.5"></div>
              <div class="p-4 space-y-2">
                <p class="text-sm text-gray-500">#1 by ${open.author}</p>
                <p class="text-sm text-gray-500">${new Date(open.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
    `;
    allCards.appendChild(div);
  });
};

//generate cards for close status
const generateCloseCards = async (arr) => {
  allCards.innerHTML = "";
  //filtering the array of close status
  closeArr = arr.filter((close) => close.status === "closed");
  //rendering the close status
  closeArr.forEach((close) => {
    const div = document.createElement("div");
    div.className =
      "card bg-base-100 shadow-md rounded-xl border border-gray-200";
    div.innerHTML = `
        <div onclick="loadSingleIssues('${close.id}')" class="card-body p-0 border-t-3 rounded-xl border-purple-500"} ">
              <div class="p-4 space-y-3 h-full">
                <div class="flex justify-between items-center">
                  <img src="./assets/Closed-Status.png"/>

                  ${
                    close.priority == "high"
                      ? `<span
                    class="badge badge-error bg-red-100 text-error border-0 rounded-full uppercase px-6 py-3.5"
                    >${close.priority}</span>`
                      : `${
                          close.priority == "medium"
                            ? `<span
      class="badge badge-error bg-yellow-100 text-yellow-500 border-0 rounded-full uppercase px-6 py-3.5">${close.priority}
    </span>`
                            : `<span class="badge badge-error bg-gray-200 text-gray-400 border-0 rounded-full uppercase px-6 py-3.5">${close.priority}</span>`
                        }`
                  }
                </div>
                <div class="h-24">
                  <h2 class="card-title font-semibold text-[16px] ">
                    ${close.title}
                  </h2>
                  <p class="line-clamp-2 text-sm text-gray-500">
                    ${close.description}
                  </p>
                </div>
                <div id="show-badge" class="card-actions justify-start gap-1">
                  ${generateBadgeStatus(close.labels)}
                </div>
              </div>
              <div class="bg-gray-300 w-full h-0.5"></div>
              <div class="p-4 space-y-2">
                <p class="text-sm text-gray-500">#1 by ${close.author}</p>
                <p class="text-sm text-gray-500">${new Date(close.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
      `;
    allCards.appendChild(div);
  });
};

// loading single function for creating modal
async function loadSingleIssues(id) {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  const data = await res.json();
  displayModal(data.data);
}

// display modal info
function displayModal(obj) {
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
   <div class="modal-box">
            <h3 class="text-lg font-bold">${obj.title}</h3>
            <div class="flex gap-3 items-center">
            ${
              obj.status == "open"
                ? `<span class="badge badge-success text-white rounded-full px-4"
                >${obj.status}</span
              >`
                : `<span class="badge bg-purple-600 text-white rounded-full px-4">${obj.status}</span>`
            }
              
              <span class="text-xs text-gray-600"
                ><i class="fa-solid fa-circle-dot"></i> Opened by ${obj.assignee}</span
              >
              <span class="text-xs text-gray-600"
                ><i class="fa-solid fa-circle-dot"></i> ${new Date(obj.updatedAt).toLocaleDateString()}</span
              >
            </div>
            <div class="py-5">
              ${generateBadgeStatus(obj.labels)}
            </div>
            <p class="text-sm text-gray-600">
              ${obj.description}
            </p>

            <div class="py-5 grid grid-cols-2">
              <div class="flex gap-1 flex-col">
                <p class="text-sm text-gray-600">Assignee:</p>
                <h3 class="text-[16px] text-neutral font-semibold uppercase">
                  ${obj.assignee ? `${obj.assignee}` : "Did Not Found"}
                </h3>
              </div>
              <div class="flex gap-1 flex-col">
                <p class="text-sm text-gray-600">Priority:</p>
                ${
                  obj.priority == "high"
                    ? `<span
                    class="badge badge-error text-white border-0 rounded-full uppercase px-6 py-3.5"
                    >${obj.priority}</span>`
                    : `${
                        obj.priority == "medium"
                          ? `<span class="badge badge-warning text-white border-0 rounded-full uppercase px-6 py-3.5">${obj.priority}</span>`
                          : `<span class="badge bg-gray-700 text-white border-0 rounded-full uppercase px-6 py-3.5">${obj.priority}</span>`
                      }`
                }
              </div>
            </div>
            <div class="modal-action">
              <form method="dialog">
                <button class="btn btn-primary border-0">Close</button>
              </form>
            </div>
          </div>
   `;
  document.getElementById("issue_modal").showModal();
}

//generate searchIssue func for searching data
const searchIssues = async (searchText) => {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`,
  );
  const data = await res.json();
  console.log(data.data);
  const searchWord = data.data;
  const filterIssues = searchWord.filter((d) =>
    d.title.toLowerCase().includes(searchText),
  );
  showAllIssues(filterIssues);
  issuesTitle.innerText = filterIssues.length + " " + "Issues";
};

//added event listener to the search btn to finding search data
document.getElementById("search-btn").addEventListener("click", () => {
  const input = document.getElementById("search-input");
  const searchValue = input.value.trim().toLowerCase();
  searchIssues(searchValue);
});

loadIssues();
