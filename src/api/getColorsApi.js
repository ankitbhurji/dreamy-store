import axios from "axios";

async function getColorsApi() {
    // const url = 'http://localhost:3001/api/storeproducts/colors'
    const url = 'https://dreamy-store-app-backend.onrender.com/api/storeproducts/colors'
    const getColors = await axios.get(url)
    return getColors
}

export default getColorsApi;