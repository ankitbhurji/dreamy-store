import axios from "axios";

function getColorsApi() {
    const url = 'http://localhost:3001/api/storeproducts/colors'
    const getColors = axios.get(url)
    return getColors
}

export default getColorsApi;