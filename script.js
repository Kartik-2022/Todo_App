let tasks = JSON.parse(localStorage.getItem("tasks")) || []
let flt = 'all'

const input = document.getElementById("taskInput")
const list = document.getElementById("taskList")
const total = document.getElementById("total")
const done = document.getElementById("completed")
const pend = document.getElementById("pending")

document.getElementById("addBtn").addEventListener("click", makeTask)
input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") makeTask()
})

function sav() {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

function show() {
  list.innerHTML = ""
  let t = tasks.filter(t => {
    if (flt === "completed") return t.completed
    if (flt === "pending") return !t.completed
    return true
  })

  for (let i = 0; i < t.length; i++) {
    let el = document.createElement("li")
    if (t[i].completed) el.className = "completed"

    el.innerHTML = `
      <input type="checkbox" ${t[i].completed ? "checked" : ""} onchange="toggle(${i})" />
      <span>${t[i].text}</span>
      <span>
        <button onclick="edt(${i})">✏</button>
        <button onclick="del(${i})">❌</button>
      </span>
    `
    list.appendChild(el)
  }

  cnt()
}

function makeTask() {
  let val = input.value
  if (val.trim() === "") return
  tasks.push({ text: val.trim(), completed: false })
  input.value = ""
  sav()
  show()
}

function toggle(idx) {
  tasks[idx].completed = !tasks[idx].completed
  sav()
  show()
}

function edt(i) {
  let nt = prompt("Edit it:", tasks[i].text)
  if (nt && nt.trim()) {
    tasks[i].text = nt.trim()
    sav()
    show()
  }
}

function del(i) {
  if (confirm("delete this?")) {
    tasks.splice(i, 1)
    sav()
    show()
  }
}

function setFilter(f) {
  flt = f
  show()
}

function cnt() {
  total.textContent = tasks.length
  let c = 0
  for (let t of tasks) {
    if (t.completed) c++
  }
  done.textContent = c
  pend.textContent = tasks.length - c
}

show()
