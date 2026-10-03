import { signal } from "./ui.js";

export const cargarDatos = async (buscar) => {
    const bucarXnumeros = "https://dummyjson.com/recipes/?limit=10"
    try {
        const response = await fetch(buscar ? "https://dummyjson.com/recipes/" + buscar : "https://dummyjson.com/recipes/");
        const datos = await response.json();
        return datos;
    }
    catch (error) {

        signal("server error")
        const btn_recargar = document.getElementById("recargar")

        btn_recargar.addEventListener("click", () => {
            window.location.reload()
        })

        return null
    }
}

