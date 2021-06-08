import React from "react"
import {Modal} from "react-bootstrap"
import KeywordInput from "./KeywordInput"
import BudgetInput from "./BudgetInput"

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
              processFlow={processFlow}
              setProcessFlow={setProcessFlow}
            />}
            {(processFlow.keywords && !processFlow.budget) && <BudgetInput
              person={person}
              processFlow={processFlow}
              setProcessFlow={setProcessFlow}
            />}
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