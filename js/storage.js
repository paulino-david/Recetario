
export const cargarDatos=async (url)=>{
    const response = await fetch(url);
    const datos = await response.json();
    return datos;
}