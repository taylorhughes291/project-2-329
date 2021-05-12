const ranking = (arr, cost, keywords) => {

    let sortedArray = arr.map((item, index) => {
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
            Object.assign(item, {ranking: (item.price.value/cost) + (item.rating/5) + counter*0.7})
        )
    })

    // Please note that the below two-tiered sorting was achieved with help from https://stackoverflow.com/questions/4576714/sort-by-two-values-prioritizing-on-one-of-them

    sortedArray = sortedArray.sort((a, b) => {
        const n = b.ranking - a.ranking
        const p = b.ratings_total - a.ratings_total
        return (a.selected === b.selected) ? (n === 0 ? p : n) : a.selected ? -1 : 1

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