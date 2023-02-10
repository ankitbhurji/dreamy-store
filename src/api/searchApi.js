import axios from "axios";

async function searchApi(filters) {
    // const url = `http://localhost:3001/api/storeproducts/products/search/${filters.search}`
    const url = `https://dreamy-store-app-backend.onrender.com/api/storeproducts/products/search/${filters.search}`
    const searchData = await axios.get(url)
    // console.log(filters.search)
    return searchData
}

export default searchApi;