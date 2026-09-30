import { cargarDatos } from './storage.js'

const divRecetas = document.getElementById("recetas")

const pintarRecetas = (recetas) => {
    
    const fetchRecipes = cargarDatos("https://dummyjson.com/recipes/?limit=10")
    .then((datos) => {
        console.log(datos.recipes)
        datos.recipes.forEach((receta) => {
                const recetaElement = document.createElement("receta")

                const imagen = document.createElement("img")
                imagen.src = receta.image
                imagen.alt = receta.title

                const titulo = document.createElement("h2")
                titulo.textContent = receta.name

                const pais = document.createElement("pais")
                pais.textContent = receta.cuisine

                const iconos = document.createElement("iconos")
                iconos.innerHTML = `
                <span > <i class="fa-regular fa-clock"></i> ${receta.cookTimeMinutes} min</span>
                <span ><i class="fa-solid fa-signal"></i> ${receta.difficulty}</span>
                <span ><i class="fa-solid fa-star"></i> ${receta.rating}</span>
                `
                recetaElement.appendChild(
                    imagen,
                    titulo,
                    pais,
                    iconos
                )

                divRecetas.appendChild(recetaElement)

                console.log(recetaElement)
            })
        })

}

export default pintarRecetas