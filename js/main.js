import pintarRecetas,{tags,signal} from "./ui.js";

const divRecetas = document.getElementById("recetas")

const etiquetas=document.getElementById("etiquetas")
const buscar = document.getElementById("buscar")
const btn_buscar=document.getElementById("btn-etiqueta")


buscar.addEventListener("input",()=>{
    signal("cargar")
    setTimeout(pintarRecetas("search?q="+buscar.value)?pintarRecetas("search?q="+buscar.value):signal("not found"),2000)
    
})

btn_buscar.addEventListener("click",()=>{
    signal("cargar")
    etiquetas.value?pintarRecetas("tag/"+etiquetas.value):pintarRecetas()
        
})
signal("cargar")
setTimeout(()=>{
    pintarRecetas()
    tags()

},2000)


