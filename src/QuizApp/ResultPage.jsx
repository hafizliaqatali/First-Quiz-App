import React, { useState } from "react";
import Details from "./Details";
function ResultPage(props) {

  const [detailShow , setDetailShow] = useState(false);

  return (
    <>
    {
    detailShow ? (
      <Details attempts={props.attempts} setAttempts={props.setAttempts}></Details>
      
        ):(

          <> 
          <div className="resultPage">
            {props.correctAns === props.totalScore && (
              <>
                <div className="congratulations">
                  <p>Congratulation's</p>
                </div>
              </>
            )}
            <div className="result">
              <p>Total Score: {props.totalScore}</p>
              {/* <input type="range" value={props.totalScore} max={props.totalScore} /> */}
              <p className="green">Correct Answer: {( parseInt(props.correctAns) / parseInt(props.totalScore)) * 100} %</p>
              <input type="range" onChange={()=> {}}  style={{  accentColor: "green"}} value={props.correctAns}  max={props.totalScore}/>
              <p className="red">Wrong Answer:  {( parseInt(props.wrongAns) / parseInt(props.totalScore)) * 100} %</p>
              <input type="range" onChange={()=> {}} style={{  accentColor: "red"}} value={props.wrongAns}  max={props.totalScore}/>
            </div>
            <div className="detail-btn">
              <button onClick={()=> setDetailShow(true)}>See Details</button>
            </div>
          </div>
              </>
        )

}
    </>
  );
}

export default ResultPage;
