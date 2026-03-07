//find the necessary elements
const allBtn = document.getElementById("all");
const openBtn = document.getElementById("open");
const closedBtn = document.getElementById("closed");

function showActive(id) {
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
}
