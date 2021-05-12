const priceFilter = (arr, cost) => {
    const priceArr = arr.filter((item, index) => {
        return (
            item.price.value <= cost
        )
    })
    return priceArr
}

export default priceFilter