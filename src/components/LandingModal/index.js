import React, {useRef} from "react"
import {Modal} from "react-bootstrap"

const InputBudget = ({budgetValue, handleBudgetChange}) => (
    <>
        <h4>How much can you afford to spend? You can select multiple products to fit within your budget.</h4>
        <form
            key="form-2"
        >
            <input 
                type="number"
                placeholder="$75"
                value={budgetValue}
                onChange={handleBudgetChange}
                key="5"
            ></input>
            <input
                type="submit"
                value="CONTINUE"
                key="6"
            ></input>
        </form>
    </>
)

const LandingModal = ({processFlow, handleContinue, person, handleKeywordChange1, handleKeywordChange2, handleKeywordChange3, handleBudgetChange, modalShow, setModalShow}) => {
    
    function MyVerticallyCenteredModal(props) {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            animation={false}
            key="modal-1"
          >
            <Modal.Body
                key="modal-body"
            >
              {!processFlow.keywords && <>
                <h4>Our search results are based on keywords. Just tell us three things your giftee likes!</h4>
                <form
                        onSubmit={handleContinue}
                        key="keyword-modal-text"
                    >
                        <input 
                            type="text" 
                            placeholder="Coffee"
                            value={person.keywordText1}
                            onChange={handleKeywordChange1}
                            key="1"
                            autofocus
                        ></input>
                        <input 
                            type="text" 
                            placeholder="Star Wars"
                            value={person.keywordText2}
                            onChange={handleKeywordChange2}
                            key="2"
                        ></input>
                        <input 
                            type="text" 
                            placeholder="Succulents"
                            value={person.keywordText3}
                            onChange={handleKeywordChange3}
                            key="3"
                        ></input>
                        <input 
                            type="submit" 
                            value="CONTINUE"
                            key="4"
                        ></input>
                    </form>
                </>}
                {(processFlow.keywords && !processFlow.budget) && <InputBudget budgetValue={person.budget} handleBudgetChange={handleBudgetChange} />}
            </Modal.Body>
          </Modal>
        );
      }

      return (
        <>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
      )
}

export default LandingModal