import axios from "axios";

async function getProductApi(filters) {
    let shipping = filters.freeshipping.toString()
    // const url = 'http://localhost:3001/api/storeproducts/products'
    // const url = `http://localhost:3001/api/storeproducts/products/data?category=${filters.category}&company=${filters.company}&color=${filters.color}&price=${filters.price}`
    // const url = `http://localhost:3001/api/storeproducts/products/data?category=${filters.category}&company=${filters.company}&color=${filters.color}&price=${filters.price}&short=${filters.shortBy}`
    // const url = `http://localhost:3001/api/storeproducts/products/data?category=${filters.category}&company=${filters.company}&color=${filters.color}&price=${filters.price}&short=${filters.shortBy}&shipping=${shipping}`
    const url = `https://dreamy-store-app-backend.onrender.com/api/storeproducts/products/data?category=${filters.category}&company=${filters.company}&color=${filters.color}&price=${filters.price}&short=${filters.shortBy}&shipping=${shipping}`
    const getProducts = await axios.get(url)
    // console.log(typeof(filters.freeshipping.toString()))
    return getProducts;
}

export default getProductApi;