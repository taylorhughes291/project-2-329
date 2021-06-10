import React from "react"
import {Modal} from "react-bootstrap"
import KeywordInput from "./KeywordInput"
import BudgetInput from "./BudgetInput"
import ship from "../../assets/ship.png"

const LandingModal = ({processFlow, setProcessFlow, person, handleContinue, handleKeywordChange1, handleKeywordChange2, handleKeywordChange3, handleBudgetChange, modalShow, setModalShow}) => {

  function MyVerticallyCenteredModal(props) {
      return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          animation={false}
          key="modal-1"
          backdrop="static"
          keyboard={false}
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
            {!processFlow.budget && <div className="page-indicator-cont">
              <i className={processFlow.keywords ? "fas fa-circle discolor" : "fas fa-circle"}></i>
              <i className={processFlow.keywords ? "fas fa-circle " : "fas fa-circle discolor"}></i>
            </div>}
            {(processFlow.keywords && processFlow.budget) && <>
              <h2>SUCCESS!</h2>
              <img src={ship} alt="ship loading icon" />
              <p>One moment while we gather your search results...</p>
            </>}
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