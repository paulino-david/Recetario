export const cargarDatos=async (buscar)=>{
    const bucarXnumeros="https://dummyjson.com/recipes/?limit=10"
    const response = await fetch(buscar?"https://dummyjson.com/recipes/"+buscar:"https://dummyjson.com/recipes/");
    const datos = await response.json();
    return datos;
}