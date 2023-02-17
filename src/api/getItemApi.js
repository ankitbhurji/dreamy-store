import axios from "axios";

async function getItemApi(id) {
    const url = `https://dreamy-store-app-backend.onrender.com/api/storeproducts/product/${id}`
    let getItem = await axios.get(url)
    return getItem.data
}

export default getItemApi;