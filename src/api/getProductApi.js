import axios from "axios";

function getProductApi(filters) {
    // const url = 'http://localhost:3001/api/storeproducts/products'
    // const url = `http://localhost:3001/api/storeproducts/products/data?category=${filters.category}&company=${filters.company}&color=${filters.color}&price=${filters.price}`
    const url = `http://localhost:3001/api/storeproducts/products/data?category=${filters.category}&company=${filters.company}&color=${filters.color}&price=${filters.price}&short=${filters.shortBy}`
    const getProducts = axios.get(url)
    console.log(filters)
    return getProducts;
}

export default getProductApi;