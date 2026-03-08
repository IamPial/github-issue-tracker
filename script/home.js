//find the necessary elements
const allBtn = document.getElementById("all");
const openBtn = document.getElementById("open");
const closedBtn = document.getElementById("closed");
const issuesTitle = document.getElementById("issues-title");

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
