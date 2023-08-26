import React from 'react';
import * as XLSX from 'xlsx';

function Details(props) {

  const downloadBtn = ()=>{
    const attemptsWithFlattenedOptions = props.attempts.map((attempt) => {
      const Options = attempt.options.join(', '); // Convert options array to a comma-separated string
      return { ...attempt, Options};
    });
    
    
    let wb = XLSX.utils.book_new();
    console.log( wb)
    let ws =  XLSX.utils.json_to_sheet(attemptsWithFlattenedOptions);
    console.log(wb)
    
    
    XLSX.utils.book_append_sheet(wb,ws,"first Sheet ");
    XLSX.writeFile(wb , "General Knowledge.xlsx")
  }
  return (
    <>

    <table   className="details">
  
      <thead >
     <tr>
      <th>{`No.`}</th>
      {Object.keys(props.attempts[0]).map((key)=>{
        if(key==="options"){
        return props.attempts[0].options.map((option,i) => <th className='table-header' key={option}>{`OPTION - ${i + 1}`}</th>)
        }else{
          return <th key={key} className='table-header'>{key.toUpperCase()}</th>;
        }
      })}
     </tr>
       </thead>
     <tbody>

     {props.attempts.map((attempt,i) =>{
       return(
         
         <tr key={i}>
          <td>{i+1}</td>
        <td  className='question'>{attempt.Question}</td>
         {attempt.options.map(option=> <td className='option' key={option}>{option}</td>)}
        <td  className='option'>{attempt.userSelect}</td>
        <td  className='option'>{attempt.answer}</td>
        <td  className={`option ${attempt.result==="Fail" ? "red" : "green"}`}>{attempt.result}</td>
      </tr>
        )
      })}
      </tbody>
      </table>  
      <div className="detail-btn">
        <button onClick={downloadBtn} >Download File</button>
      </div>

     </>
  )
}

export default Details
