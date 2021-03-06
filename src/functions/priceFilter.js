const priceFilter = (arr, cost) => {
    const priceArr = arr.filter((item, index) => {
        return (
            item.price.value <= cost || item.selected
        )
    })
    return priceArr
}

export default priceFilter