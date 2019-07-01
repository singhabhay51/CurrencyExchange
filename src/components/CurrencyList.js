import React,{Component} from 'react';
import Currency from './Currency';
import Service from '../services/service';
import AddCurrency from './AddCurrency';
import EditCurrency from './EditCurrency';
import Constants from '../constants/Constants'

class CurrencyList extends Component{
    state = {
        allCurrencies:[],
        currencies: {},
        selectedCurrency: "USD",
        currentVal: 10,
        addCurrency: true,
        newCurrency: ""
    }

    componentDidMount() {
        const self = this;
        const {
            selectedCurrency
        } = self.state;
        Service.get(Constants.apiConstants.url + Constants.apiConstants.qBase + selectedCurrency, (status, data) => {
            if (typeof data !== 'undefined'){
                let currencies = {};
                let allCurrencies = [];
                let rates = data.rates;
                for(let key in rates){
                    allCurrencies.push(key);
                    if(Constants.apiConstants.symbols.includes(key))
                    currencies[key] = rates[key];
                }
                console.log(allCurrencies[0])
                self.setState({
                    newCurrency:allCurrencies[0], currencies,allCurrencies
                });
            }
            else
                alert(status.indexOf("400") ? "Please Input Valid Currencies" : "Something went wrong")
        });
    }    

    renderCurrency = () => {
        let arr = [];        
        const {selectedCurrency,currencies,currentVal} = this.state;
        for(let key in currencies){
            arr.push(<Currency key={key} TarCurr={selectedCurrency} SrcCurr={key} CurrVal={currentVal}  Diff={currencies[key]} DelCurrency={this.delCurrency}/>)
        }
        return arr;
    }

    txtChange = (e) => {
        const currentVal = e.target.value
        if(!isNaN(currentVal))
        this.setState({currentVal});
    }

    addClicked = () => {
        this.setState({addCurrency: false})
    }

    currencyVal = (newCurrency) => {
        this.setState({newCurrency})
    }

    delCurrency = (curr) => {
        let currencies = Object.assign({},this.state.currencies);
        delete currencies[curr]
        this.setState({currencies}) 
    }

    submitClicked = () => {
        const self = this;
        const {selectedCurrency,newCurrency} = self.state;
        if(newCurrency.trim() === '')
            alert("Please input currency")
        else if(self.state.currencies.hasOwnProperty(newCurrency)){
            alert(newCurrency + " already exist")
        }
        else{
        Service.get(Constants.apiConstants.url+Constants.apiConstants.qBase+selectedCurrency+Constants.apiConstants.qSymbols+newCurrency, (status, data) => {
            if(typeof data !== 'undefined')    
            self.setState({
            addCurrency:true,
            newCurrency:self.state.allCurrencies[0],
            currencies: {...self.state.currencies,...data.rates}
            });
            else
            alert(status.indexOf("400") ? "Please Input Valid Currency":"Something went wrong")
        });
        }
    }

    render(){
        const {selectedCurrency,currentVal,addCurrency,allCurrencies} = this.state;
        return(
            <div className="currencylist">
                <div className="currency-head">
                <h3>{selectedCurrency}<input type="text" defaultValue={currentVal} className="floatRight" onChange={this.txtChange} /></h3>
                </div>
                {this.renderCurrency()}
                {addCurrency ? <AddCurrency AddClicked={this.addClicked}/> : <EditCurrency AllCurrencies={allCurrencies} CurrencyVal={this.currencyVal} SubmitClicked={this.submitClicked}/>}
            </div>                
        )
    }
}


export default CurrencyList;