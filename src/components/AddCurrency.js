import React,{memo} from 'react';

function AddCurrency(props){
 return (
     <div className="add-currency">
     <label className="labelBtn addBtn" onClick={() => {props.AddClicked()}}> (+) </label>Add More Currencies
     </div>
 )
}

export default memo(AddCurrency)
