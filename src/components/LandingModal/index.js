import React from "react"
import {Modal} from "react-bootstrap"
import KeywordInput from "./KeywordInput"

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

const LandingModal = ({processFlow, setProcessFlow, person, handleContinue, handleKeywordChange1, handleKeywordChange2, handleKeywordChange3, handleBudgetChange, modalShow, setModalShow}) => {

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
            {!processFlow.keywords && <KeywordInput 
              person={person}
              handleContinue={handleContinue}
              processFlow={processFlow}
              setProcessFlow={setProcessFlow}
            />}
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