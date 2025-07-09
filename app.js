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


let desenhos = document.querySelectorAll(".hoverdesenho");
let containers = document.querySelectorAll(".container_transiçao");

// Posição atual do mouse
let mouseX = 0;
let mouseY = 0;

// Posição suavizada da máscara (inicializa zerado)
let targetPositions = [];

desenhos.forEach(() => {
  targetPositions.push({ x: 0, y: 0 });
});

// Atualiza a posição real do mouse
window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

// Lerp helper
function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

// Anima as posições suavemente
function animate() {
  desenhos.forEach((desenho, i) => {
    let rect = desenho.getBoundingClientRect();

    // Alvo: posição do mouse relativa ao elemento
    let desiredX = mouseX - rect.left - 250;
    let desiredY = mouseY - rect.top - 250;

    // Atualiza suavemente
    targetPositions[i].x = lerp(targetPositions[i].x, desiredX, 0.1);
    targetPositions[i].y = lerp(targetPositions[i].y, desiredY, 0.1);

    desenho.style.maskPosition = `${targetPositions[i].x}px ${targetPositions[i].y}px`;
  });

  requestAnimationFrame(animate);
}

animate(); // inicia a animação

const header = document.querySelector(".header_desenhos");

header.addEventListener("mouseenter", () => {
  desenhos.forEach((el) => {
    el.style.maskSize = "500px";
    el.style.opacity = "1"; // aparece suavemente
  });
});

header.addEventListener("mouseleave", () => {
  desenhos.forEach((el) => {
    el.style.maskSize = "0px";
    el.style.opacity = "0"; // desaparece suavemente
  });
});


