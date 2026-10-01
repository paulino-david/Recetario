import pintarRecetas,{tags} from "./ui.js";

const divRecetas = document.getElementById("recetas")

const etiquetas=document.getElementById("etiquetas")
const buscar = document.getElementById("buscar")
const btn_buscar=document.getElementById("btn-etiqueta")


buscar.addEventListener("input",()=>{
    divRecetas.innerHTML=""
    pintarRecetas("search?q="+buscar.value)
})

btn_buscar.addEventListener("click",()=>{
    divRecetas.innerHTML=""
    etiquetas.value?pintarRecetas("tag/"+etiquetas.value):pintarRecetas()
        
})
pintarRecetas()
tags()


