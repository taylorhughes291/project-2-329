import React from "react"

const SelectedProduct = (props) => {

    const selections = props.person.selectedProducts.map((item, index) => {
        return (<div
            key={index}
        >
            <img src={item.image}/>
            <div>
                <p>{item.title}</p>
                <p>${item.price}</p>
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