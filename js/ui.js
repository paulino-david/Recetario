import { cargarDatos } from './funciones.js'

const divRecetas = document.getElementById("recetas")

const fondoInfoReceta = document.getElementById("fondoInfoReceta")
const infoReceta = document.getElementById('infoReceta')

const cantidad = document.getElementById("cantidad")


const pintarInfoReceta = (receta) => {

    infoReceta.innerHTML = `
    <div class="imagenReceta" id="imagenReceta">
                <button class="cancelar" id="cancelarInfoRecetea">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <img src="${receta.image}"></img>
                
            </div>

            <div class="infoReceta-info">
                
                <div class="up-info" id="up-info">

                    <h2>${receta.name}</h2>

                    <iconos class="iconos">
                        <span > <i class="fa-regular fa-clock"></i> ${receta.cookTimeMinutes} min</span>
                        <span ><i class="fa-solid fa-users"></i> ${receta.servings}</span>
                        <span ><i class="fa-solid fa-fire"></i> ${receta.caloriesPerServing} kcal</span>
                        <span ><i class="fa-solid fa-star"></i> ${receta.rating}</span>
                    </iconos>
                    
                </div>
                    
                <div class="down-info">
                    <div class="down-left">
                        <h3>
                            <i class="fa-solid fa-basket-shopping"></i> Ingredientes
                        </h3>
                        <ul id="listaNoNum">

                        
                        </ul>
                    </div>

                    <div class="down-right">
                        <h3>
                            <i class="fa-solid fa-list-ol"></i> Pasos
                        </h3>

                        <ol id="listaNum">
                        
                        </ol>
                    
                    </div>

                </div>

            </div>
    `
    const cancelarInfoRecetea = document.getElementById("cancelarInfoRecetea")
    const listaNum = document.getElementById("listaNum")
    const listaNoNum = document.getElementById("listaNoNum")

    receta.ingredients.forEach(ingredient => {
        const li = document.createElement("li")
        li.textContent = ingredient
        listaNoNum.append(li)
    })

    receta.instructions.forEach(instruction => {
        const li = document.createElement("li")
        li.textContent = instruction
        listaNum.append(li)
    })


    cancelarInfoRecetea.addEventListener("click", () => {
        fondoInfoReceta.style.display = "none"
    })

}

export const signal = (estado) => {

    if (estado == "cargar") {
        cantidad.style.display = "none"
        divRecetas.innerHTML = `
            <div class="signals">
          <i class="fa-solid fa-spinner"></i>
          <p>
          
          Cargando recetas ...
          </p>
        </div>
    `
    }

    else if (estado == "not found") {
        cantidad.style.display = "flex"


        divRecetas.innerHTML = `
        <div class="signals">
            <i class="fa-solid fa-bowl-food"></i>
            <p>
            
            No hay receta que coincida con tu búsqueda.
            </p>
        </div>
    `
        console.log("not found")
    }
    else if (estado == "server error") {
        cantidad.style.display = "none"

        divRecetas.innerHTML = `
        <div class="signals">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <p>
            
            No se han podido cargar las recetas. El servidor respondió 500
            </p>

            <button class="boton" id="recargar">
                <i class="fa-solid fa-rotate-right"></i> Recargar
            </button>
        </div>
    `
    }

}

const pintarRecetas = async (buscar) => {
    divRecetas.innerHTML = ""
    try {

        const fetchRecipes = await cargarDatos(buscar)
        console.log(fetchRecipes.recipes)
        cantidad.textContent = fetchRecipes.recipes.length<=1?`${fetchRecipes.recipes.length} recetas`: `${fetchRecipes.recipes.length} receta`
        cantidad.style.display = "flex"
        fetchRecipes.recipes.forEach((receta) => {
            const recetaElement = document.createElement("receta")

            const imagen = document.createElement("img")
            imagen.src = receta.image
            imagen.alt = receta.title

            const titulo = document.createElement("h3")
            titulo.textContent = receta.name


            const pais = document.createElement("pais")
            pais.textContent = receta.cuisine

            const info = document.createElement("info")

            const iconos = document.createElement("iconos")
            iconos.innerHTML = `
                        <span > <i class="fa-regular fa-clock"></i> ${receta.cookTimeMinutes} min</span>
                        <span ><i class="fa-solid fa-signal"></i> ${receta.difficulty}</span>
                        <span ><i class="fa-solid fa-star"></i> ${receta.rating}</span>
    
                        `
            info.append(
                pais,
                titulo,
                iconos
            )

            recetaElement.append(
                imagen,
                info
            )

            divRecetas.append(recetaElement)

            recetaElement.addEventListener("click", () => {
                console.log(receta.name)
                fondoInfoReceta.style.display = "flex"
                pintarInfoReceta(receta)

            })

        })

        return fetchRecipes.recipes.length
    }

    catch {
        signal("server error")
        const btn_recargar = document.getElementById("recargar")

        btn_recargar.addEventListener("click", () => {
            window.location.reload()
        })
    }

}

const etiquetas = document.getElementById("etiquetas")

export const tags = async () => {
    const respuesta = await fetch("https://dummyjson.com/recipes/tags")
    const datos = respuesta.json()
        .then(tags => {
            tags.forEach(tag => {
                const option = document.createElement("option")
                option.textContent = tag
                etiquetas.append(option)
            })
        })
}

export default pintarRecetas