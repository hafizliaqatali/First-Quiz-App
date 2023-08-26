import React from 'react'

function InstructionPage(props) {
  return (
    <>
      <div className="instructionPage">
        <div className="instruction">

        <h1>Rules of this quiz</h1>
        <hr />
        <ul>
            <li>You have to select an option before you can go to the next question.</li>
            <li className='green'>There is no going back after selecting an option.</li>
            <li>You can not select another once you select an option.</li>
            <li>You cannot exit the quiz while playing.</li>
        </ul>
        <div className="btn">
            <button onClick={props.continueHandle}>Start</button>
        </div>
        </div>
      </div>
    </>
  )
}

export default  InstructionPage;
