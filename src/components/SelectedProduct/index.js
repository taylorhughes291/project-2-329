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
        return (
        <div
            key={index}
            className="selectedProduct"
        >
            <div className="img-cont">
                <img 
                    src={item.image}
                    className="selectedImage"
                />
                <button
                    type="button"
                    onClick={() => handleDelete(item.asin)}
                >Delete</button>
            </div>
            <div className="selected-info">
                <p>{item.title}</p>
                <h5>${parseFloat(Math.trunc(item.price*100)/100).toFixed(2)}</h5>
            </div>

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