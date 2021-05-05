import React from "react"

const SelectedProduct = (props) => {

    const handleDelete = (asin) => {
        // Need to first delete the product from the person useState at selectedProduct
        const newSelectedProducts = props.person.selectedProducts.filter((item, index) => {
            return (
                item.asin !== asin
            )
        })
        const person = {
            ...props.person,
            selectedProducts: newSelectedProducts
        }
        props.setPerson(
            person
        )

        // Now we must toggle the class of the data object selected to selected = false
        const productDisplay = props.productSearch.map((item, index) => {
            if (item.asin === asin) {
                return ({
                    ...item,
                    selected: false
                })
            } else {
                return (
                    item
                )
            }
        })
        props.setProductSearch(
            productDisplay
        )
    }

    const selections = props.person.selectedProducts.map((item, index) => {
        return (<div
            key={index}
        >
            <img src={item.image}/>
            <div>
                <p>{item.title}</p>
                <p>${item.price}</p>
            </div>
            <button
                type="button"
                onClick={() => handleDelete(item.asin)}
            >Delete from Cart</button>
        </div>
        )
    })
    return (
        <div>
            {selections}
        </div>
    )
}

export default SelectedProduct