import React,{memo} from 'react';

function EditCurrency(props){
    let currencyList = [];
    props.AllCurrencies.forEach(val => {
        currencyList.push(<option key={'k'+val} value={val}>{val}</option>)
    })
    return (
        <div className="add-currency edit-currency">
        <select onChange={(e) => {props.CurrencyVal(e.target.value)}} >
        {currencyList}
        </select>
        <input type="button" value="Submit" onClick={() => {props.SubmitClicked()}}/>
       </div>
    )
   }
   
   export default memo(EditCurrency)