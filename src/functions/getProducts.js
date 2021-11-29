// This function handles the API call to Rainforest.
const getProducts = async (searchTerm) => {
    const apiKey = process.env.REACT_APP_RAINFOREST_API_KEY
    const associateId = process.env.REACT_APP_AMAZON_ASSOCIATES_ID
    const url = `https://api.rainforestapi.com/request?api_key=${apiKey}&type=search&amazon_domain=amazon.com&associate_id=${associateId}&search_term=${searchTerm}`
    
    const response = await fetch(url)
    const data = await response.json()
    return data.search_results
}

export default getProducts
    