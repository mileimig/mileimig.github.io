let time = document.getElementById("current_time");

setInterval(() =>{
  let d = new Date();
  time.innerHTML = d.toLocaleTimeString();
},1000)

// mouse in = aplicar 'project_selected' em grid_project
// mouse out =aplicar 'project_unselected' em grid_project
let projects = document.getElementsByClassName("grid_project")
for (let esseElemento of projects) {
    esseElemento.onmouseenter = () => {
        // colocar notfocus nos outros projetos
        for (let p of projects) {
            if (p != esseElemento) {
                p.classList.add("project_notfocus")
            }
        }
    }
    esseElemento.onmouseleave = () => {
        for (let p of projects) {
            p.classList.remove("project_notfocus")
        }
    }
}
