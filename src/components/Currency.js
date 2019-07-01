import React,{memo} from 'react'

function Currency(props){
    const {TarCurr,SrcCurr,Diff,CurrVal} = props
    return(
        <div className="currency-main">          
           <div className="currency">
             <p>{SrcCurr} <span  className="floatRight">{(Diff*CurrVal).toFixed(4)}</span></p>
             <p>1 {TarCurr} = {SrcCurr} {Diff.toFixed(4)}</p>
               </div>
               <label className="labelBtn delBtn" onClick={() => {props.DelCurrency(SrcCurr)}} > (-) </label>
            </div>
    )
   
}

export default memo(Currency)