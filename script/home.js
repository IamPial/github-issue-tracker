//find the necessary elements
const allBtn = document.getElementById("all");
const openBtn = document.getElementById("open");
const closedBtn = document.getElementById("closed");
const issuesTitle = document.getElementById("issues-title");
const allCards = document.getElementById("all-cards");

async function showActive(id) {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  // console.log(data.data.length);

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
  }
  if (activeBtn == openBtn) {
    const openIssues = data.data.filter((open) => open.status == "open");
    issuesTitle.innerText = openIssues.length + " " + "Issues";
  }
  if (activeBtn == closedBtn) {
    const closedIssues = data.data.filter(
      (closed) => closed.status == "closed",
    );
    issuesTitle.innerText = closedIssues.length + " " + "Issues";
  }
}

// load single  issues
const loadIssues = async () => {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  ShowAllIssues(data.data);
};

function ShowAllIssues(issues) {
  allCards.innerHTML = "";
  issues.forEach((issue) => {
    const div = document.createElement("div");
    div.className =
      "card bg-base-100 shadow-md rounded-xl border border-gray-200";
    div.innerHTML = `
     <div class="card-body p-0 border-t-3 rounded-xl  ${issue.status == "open" ? "border-green-500" : "border-purple-500"} ">
              <div class="p-4 space-y-3 h-full">
                <div class="flex justify-between items-center">
                  <img src="${issue.status == "closed" ? "./assets/Closed-Status.png" : "./assets/Open-Status.png"}" />

                  ${
                    issue.priority == "high"
                      ? `<span
                    class="badge badge-error bg-red-100 text-error border-0 rounded-full uppercase px-6"
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
                <div class="card-actions justify-start ">
                  <div
                    class="badge badge-outline bg-red-100 text-error rounded-full uppercase px-4 py-3.5"
                  >
                    <i class="fa-solid fa-bug"></i>
                    Bug
                  </div>
                  <div
                    class="badge badge-warning bg-yellow-100 text-yellow-600 rounded-full uppercase px-4 py-3.5"
                  >
                    <i class="fa-regular fa-life-ring"></i>
                    help wanted
                  </div>
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
  });
}
loadIssues();
