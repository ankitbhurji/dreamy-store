import axios from "axios";

async function getCompaniesApi() {
    const url = 'http://localhost:3001/api/storeproducts/companies'
    const getCompanies = await axios.get(url)
    return getCompanies;
}

export default getCompaniesApi;