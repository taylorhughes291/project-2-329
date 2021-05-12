const processSearch = (arr) => {
    let processedArray = []
    for (let i = 0; i < arr.length; i += 1) {
        processedArray = processedArray.concat(arr[i])
    }

    processedArray = processedArray.filter((item,index) => {
        return (
            item.price
        )
    })

    // Now we need to eradicate duplicate values based off of ASIN.
    for (let i = 0; i < processedArray.length - 1; i += 1) {
        for (let j = i + 1; j < processedArray.length; j += 1) {
            if (processedArray[i].asin === processedArray[j].asin) {
                processedArray[j].duplicate = true
            }
        }
        if (!processedArray[i].duplicate) {
            processedArray[i].duplicate = false
        }
    }

    processedArray = processedArray.filter((item, index) => {
        return (
            !item.duplicate
        )
    })

    for (const item of processedArray) {
        Object.assign(item, {selected: false})
    }

    return processedArray
}

export default processSearch