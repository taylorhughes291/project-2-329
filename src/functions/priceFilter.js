const priceFilter = (arr, cost) => {
    let arr = arr.map((item, index) => {
        return (
            item.filter((item, index) => {
                return (
                    item.price && item.price.value <= cost
                )
            })
        )
    })
}