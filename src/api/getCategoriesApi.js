import axios from "axios";

async function getCategoriesApi() {
   // const url = 'http://localhost:3001/api/storeproducts/categories'
   const url = 'https://dreamy-store-app-backend.onrender.com/api/storeproducts/categories'
   const categories = await axios.get(url)
   return categories
}

export default getCategoriesApi;