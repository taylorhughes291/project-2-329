const ranking = (arr, cost, keywords) => {
    let newArr = arr.map((item, index) => {
        return (
            item.filter((item, index) => {
                return (
                    item.price && item.price.value <= cost
                )
            })
        )
    })

    newArr = newArr.map((item, index) => {
        return (
            item.map((item, index) => {
                let counter = 0
                for (const word of keywords) {
                    if (item.title.toLowerCase().includes(word.toLowerCase())) {
                        counter += 1
                    }
                }
                if (!item.rating) {
                    item.rating = 0
                }
                return (
                    Object.assign(item, {ranking: (item.price.value/cost) + (item.rating/5) + counter})
                )
            })
        )
    })
    let sortedArray = []
    for (let i = 0; i < newArr.length; i += 1) {
        sortedArray = sortedArray.concat(newArr[i])
    }

    // Please note that the below two-tiered sorting was achieved with help from https://stackoverflow.com/questions/4576714/sort-by-two-values-prioritizing-on-one-of-them

    sortedArray = sortedArray.sort((a, b) => {
        var n = b.ranking - a.ranking
        if (n !== 0) {
            return n
        }
        return b.ratings_total - a.ratings_total
    })


    // Now we need to eradicate duplicate values based off of ASIN.
    for (let i = 0; i < sortedArray.length - 1; i += 1) {
        for (let j = i + 1; j < sortedArray.length; j += 1) {
            if (sortedArray[i].asin === sortedArray[j].asin) {
                sortedArray[j].duplicate = true
            }
        }
        if (!sortedArray[i].duplicate) {
            sortedArray[i].duplicate = false
        }
    }

    sortedArray = sortedArray.filter((item, index) => {
        return (
            !item.duplicate
        )
    })

    for (const item of sortedArray) {
        Object.assign(item, {selected: false})
    }

    return sortedArray
}

export default ranking