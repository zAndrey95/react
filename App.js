import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import './form.css';
import TableHeader from './component/TableHeader';
import Workbook from 'react-excel-workbook';


var products='{"product": [\
          {"name":"ADS 1m", "code": "CA-029.1","wahrung":  "CHF", "einkaufspreis":  16.70, "verkaufspreis": 25.90,"hight":100, "width":80, "weight":20},\
          {"name":"Anmeldung", "code": "RMA-001","wahrung":  "USD", "einkaufspreis":  0.00, "verkaufspreis": 0,"hight":120, "width":820, "weight":220},\
          {"name":"Blinky", "code": "CA-067","wahrung":  "EUR", "einkaufspreis":  67.80, "verkaufspreis": 88.00,"hight":120, "width":820, "weight":220},\
          {"name":"Cash", "code": "CA-037","wahrung":  "USD", "einkaufspreis":  334.00, "verkaufspreis": 367.90,"hight":120, "width":820, "weight":220},\
          {"name":"CashAssist", "code": "CAC-002","wahrung":  "UAH", "einkaufspreis":  67.80, "verkaufspreis": 88.00,"hight":120, "width":820, "weight":220}\
          ]\
        }';

var itemN=0;
products=JSON.parse(products, function(key, value) {
        return value;
      } );

class App extends Component {

  render(){ 
      return(
        <div><Router><div>
        <HeadLogo />
          

     

      <Route exact path="/" component={Home}/>
      <Route exact path="/table" component={Page}/>
      <Route path="/add" component={AddNew}/>
      <Route path="/product" component={Product} />
      <Route path="/import" component={Import} />
      
    </div>
  </Router>

        </div>);
  }
}

class Import extends Component{
  render(){
    return(
      <div className="row text-center" style={{marginTop: '100px'}}>
    <Workbook filename="example.xlsx" element={<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Import</button>}>
      <Workbook.Sheet data={products.product} name="Sheet A">
        <Workbook.Column label="Name" value="name"/>
        <Workbook.Column label="Code" value="code"/>
        <Workbook.Column label="Wahrung" value="wahrung"/>
        <Workbook.Column label="Einkaufspreis" value="einkaufspreis"/>
        <Workbook.Column label="Verkaufspreis" value="verkaufspreis"/>
        <Workbook.Column label="Hight" value="hight"/>
        <Workbook.Column label="Width" value="width"/>
        <Workbook.Column label="Weight" value="weight"/>
      </Workbook.Sheet>
    </Workbook>
  </div>
      );
  }
}

class HeadLogo extends Component {
  render(){
    return(
    <nav className="navbar navbar-expand-sm navbar-light bg-light navbar-dark bg-dark">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item">
            <Link to="/table" className="nav-link">Product<span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item">
            <Link to="/add" className="nav-link">New Product</Link>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
      );
  }
}

class HeadProduct extends Component {
  render(){
    return(
    <nav className="navbar navbar-expand-sm navbar-light">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <h5>Product</h5>
          </li>  
        </ul>
          <Link to="/add"><button className="btn btn-outline-success my-2 my-sm-0" type="submit">Add new</button></Link>
          <Link to="/import"><button className="btn btn-outline-success my-2 my-sm-0" type="submit">Import</button></Link>
      </div>
    </nav>
    );
  }
}

class FilterProduct extends Component {
  render(){
    return(

          <FilterFunct />

    );
  }
}

class Home extends Component {
  render() {
    return(
  <div> 
    <div className="text-center">
      <div className="logo">login</div>
      <div className="login-form-1">
        <form id="login-form" className="text-left">
          <div className="main-login-form">
            <div className="login-group">
              <div className="form-group">
                <label htmlFor="lg_username" className="sr-only">Username</label>
                <input type="text" className="form-control" id="lg_username" name="lg_username" placeholder="username"/>
              </div>
              <div className="form-group">
                <label htmlFor="lg_password" className="sr-only">Password</label>
                <input type="password" className="form-control" id="lg_password" name="lg_password" placeholder="password"/>
              </div>
              <div className="form-group login-group-checkbox">
                <input type="checkbox" id="lg_remember" name="lg_remember"/>
                <label htmlFor="lg_remember">remember</label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div> 
  </div>
    );
  }
}

class Page extends Component {
  render(){
    return(
    <div> <HeadProduct /> <FilterProduct /> </div>
    );
  }
}


class TableBody extends Component {

  Clickbt(index, event){
    itemN=index;
  }

 render(){
      return(
      <table className="table table-hover">
        <thead><TableHeader /></thead>
          <tbody>
            {products.product.map((item, index) => {
              return <tr key={index}>
                    <td><Link to="/product" onClick={this.Clickbt.bind(this, index)}>{item.name}</Link></td>
                    <td className="uptext">{item.code}</td>
                    <td className="uptext">{item.wahrung}</td>
                    <td>{item.einkaufspreis}</td>
                    <td>{item.verkaufspreis}</td>
              </tr>}) 
            }
          </tbody>
      </table>
      );
  }
}

class Product extends Component {
  constructor(){
    super();
    this.state={show: true, 
      newName: products.product[itemN].name, 
      newCode: products.product[itemN].code, 
      newCurrency: products.product[itemN].wahrung, 
      newPriceA: products.product[itemN].einkaufspreis, 
      newPriceB: products.product[itemN].verkaufspreis,
      newHight: products.product[itemN].hight,
      newWidth: products.product[itemN].width,
      newWeight: products.product[itemN].weight,
    }
  }

  EditItem(event){
    this.setState({show: !this.state.show});
    var addProduct = function (name, code, wahrung, einkaufspreis, verkaufspreis, hight, width, weight) {
        var newproduct = {name:name, code:code, wahrung:wahrung, einkaufspreis:einkaufspreis, verkaufspreis:verkaufspreis, hight:hight, width:width, weight:weight};
      
        products.product[itemN]=newproduct;
      }

      addProduct(this.state.newName, this.state.newCode, this.state.newCurrency, this.state.newPriceA, this.state.newPriceB, this.state.newHight, this.state.newWidth, this.state.newWeight)
      console.log(products)
  }

  DeleteItem(event){
    delete products.product[itemN];
    console.log(products.product)
  }

  CopyItem(event){
    var addProduct = function (name, code, wahrung, einkaufspreis, verkaufspreis, hight, width, weight) {
        var newproduct = {name:name, code:code, wahrung:wahrung, einkaufspreis:einkaufspreis, verkaufspreis:verkaufspreis, hight:hight, width:width, weight:weight};
      
        products.product.push(newproduct);
      }

      addProduct(this.state.newName, this.state.newCode, this.state.newCurrency, this.state.newPriceA, this.state.newPriceB, this.state.newHight, this.state.newWidth, this.state.newWeight)
      console.log(products)
  }

  handleNameChange(event){
            this.setState({newName: event.target.value});

      }
  handleCodeChange(event){
            this.setState({newCode: event.target.value});
      }
  handleCurrencyChange(event){
            this.setState({newCurrency: event.target.value});
      }
  handlePriceAChange(event){
            this.setState({newPriceA: event.target.value});
      }  
  handlePriceBChange(event){
            this.setState({newPriceB: event.target.value});
      }
  handleHightChange(event){
            this.setState({newHight: event.target.value});
      }
  handleWidthChange(event){
            this.setState({newWidth: event.target.value});
      }
  handleWeightChange(event){
            this.setState({newWeight: event.target.value});
      }

  render(){
    if(this.state.show){
      var showTrue = <div>
      
      
      <h6 className="dop-title">Product</h6>
      <nav className="navbar navbar-expand-sm navbar-light nav-pad">

      <div className="collapse navbar-collapse" id="navbarSupportedContent">

        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <p className="title-prod">{products.product[itemN].name}</p>
          </li>  
          <li className="nav-item active">
            <button className="btn btn-secondary btn-sm bt-pad" onClick={this.EditItem.bind(this)}>Edit</button>
          </li>
          <li className="nav-item active">
            <Link to="/table"><button className="btn btn-secondary btn-sm bt-pad" onClick={this.DeleteItem.bind(this)}>Delete</button></Link>
          </li>
          <li className="nav-item active">
            <Link to="/table"><button className="btn btn-secondary btn-sm bt-pad" onClick={this.CopyItem.bind(this)}>Copy</button></Link>
          </li>
          
        </ul>
      </div>
    </nav>

    <div className="row">
      <div className="col-md-6">
        <p><b>Name: {products.product[itemN].name}</b></p>
        <p>Code: <span  className="uptext">{products.product[itemN].code}</span></p>
        <p>Wahrung: <span  className="uptext">{products.product[itemN].wahrung}</span></p>
        <p>Einkaufspreis: {products.product[itemN].einkaufspreis}</p>
        <p>Verkaufspreis: {products.product[itemN].verkaufspreis}</p></div>
      <div className="col-md-6">
        <p><b>Size</b></p>
        <p>Hight: {products.product[itemN].hight}</p>
        <p>Width: {products.product[itemN].width}</p>
        <p>Weight: {products.product[itemN].weight}</p></div>
    </div>



      
                      
                      </div>
    }
    else {
      var showEdit = <div>
      <form>
        <div className="row">
          <div className="col-md-6">
            <p>Name: <input value={this.state.newName} onChange={this.handleNameChange.bind(this)}/></p>
            <p>Code: <input value={this.state.newCode} onChange={this.handleCodeChange.bind(this)}/></p>
            <p>Wahrung: <input value={this.state.newCurrency} onChange={this.handleCurrencyChange.bind(this)}/></p>
            <p>Einkaufspreis: <input value={this.state.newPriceA} onChange={this.handlePriceAChange.bind(this)}/></p>
            <p>Verkaufspreis: <input value={this.state.newPriceB} onChange={this.handlePriceBChange.bind(this)}/></p>
          </div>
          <div className="col-md-6">
            <p>Size</p>
            <p>Hight: <input value={this.state.newHight} onChange={this.handleHightChange.bind(this)}/></p>
            <p>Width: <input value={this.state.newWidth} onChange={this.handleWidthChange.bind(this)}/></p>
            <p>Weight: <input value={this.state.newWeight} onChange={this.handleWeightChange.bind(this)}/></p>
          </div>
        </div>
      </form>
      <button className="btn btn-secondary btn-sm bt-pad" onClick={this.EditItem.bind(this)}>Save</button>
             </div>
      
    }
    return(
        <div>
                      <HeadProduct /> {showTrue} {showEdit}
        </div>
      );
  }
}


class AddNew extends Component {
  constructor (){
    super();
    this.state={newName:'', newCode:'', newCurrency: '', newPriceA:'', newPriceB:'', show: false}
  }
      
      handleNameChange(event){
            this.setState({newName: event.target.value});
      }
      handleCodeChange(event){
            this.setState({newCode: event.target.value});
            
      }
      handleCurrencyChange(event){
            this.setState({newCurrency: event.target.value});
      }
      handlePriceAChange(event){
            this.setState({newPriceA: event.target.value});
      }  
      handlePriceBChange(event){
            this.setState({newPriceB: event.target.value});
      }
      handleHightChange(event){
            this.setState({newHight: event.target.value});
      }
      handleWidthChange(event){
            this.setState({newWidth: event.target.value});
      }
      handleWeightAChange(event){
          this.setState({newWeight: event.target.value});
      }

  saveProd(event){
      var myObject={name: this.state.newName, code:this.state.newCode, wahrung:this.state.newCurrency, einkaufspreis: this.state.newPriceA, verkaufspreis:this.state.newPriceB}
      var myObjectJSON=JSON.stringify(myObject);
      localStorage.setItem("author", myObjectJSON)
      var newMyObjectJSON = localStorage.getItem("author")
      var newMyObject = JSON.parse(newMyObjectJSON);
      
      var addProduct = function (name, code, wahrung, einkaufspreis, verkaufspreis) {
        var newproduct = {name:name, code:code, wahrung:wahrung, einkaufspreis:einkaufspreis, verkaufspreis:verkaufspreis};
        products.product.push(newproduct);
      }

      addProduct(newMyObject.name, newMyObject.code, newMyObject.wahrung, newMyObject.einkaufspreis, newMyObject.verkaufspreis);
      
      this.setState({newName:'', newCode:'', newCurrency:'', newPriceA:'', newPriceB:'', show: !this.state.show});
  }
  addProd(){
      this.setState({show: !this.state.show});
    }

  render () { 
    if(!this.state.show) {
        var showList = <div><h4>Add new product</h4>
              
              
                <div className="row">
                <form>
                  <div className="col-md-6">
                    <p> Name: <input pattern="2-[0-9]{3}-[0-9]{3}" value={this.state.newName} onChange={this.handleNameChange.bind(this)}/></p>
                    <p>Code: <input maxLength="5"  value={this.state.newCode} onChange={this.handleCodeChange.bind(this)}/></p>
                    <p>Wahrung: <input maxLength="3" value={this.state.newCurrency} onChange={this.handleCurrencyChange.bind(this)}/></p>
                    <p>Einkaufspreis: <input type="number" step="0.01" value={this.state.newPriceA} onChange={this.handlePriceAChange.bind(this)}/></p>
                    <p>Verkaufspreis: <input type="number" step="0.01" value={this.state.newPriceB} onChange={this.handlePriceBChange.bind(this)}/></p>
                  </div>
                </form>
          <div className="col-md-6">
        <p>Size</p>
        <p>Hight: {products.product[itemN].hight}</p>
        <p>Width: {products.product[itemN].width}</p>
        <p>Weight: {products.product[itemN].weight}</p></div>
    </div>
              <Link to="/table"><button className="btn btn-secondary btn-sm bt-pad" onClick={this.saveProd.bind(this)}>Save</button></Link>
              </div>}
    else {var hideList = <button onClick={this.addProd.bind(this)}>Add new produkt</button>}
          
    return(
        <div>{showList}{hideList} </div>
               );

              
  }
}

class FilterFunct extends Component {
  constructor(){
    super();
    this.state={value: 'Filter'}
  }

  handleSelectChange(event){
    this.setState({value: event.target.value});
    var selectBox = document.getElementById("myselect");
    var selectedValue=selectBox.options[selectBox.selectedIndex].value;

  if (selectedValue === 'Name') {
    function compare(a,b){
      if (a['name'] > b['name']) return 1;
      if (a['name'] < b['name']) return -1;
      return 0;
    }
    let array = products.product.sort(compare);
    console.log(array)
  }

  if (selectedValue === 'Code') {
    function compare(a,b){
      if (a['code'] > b['code']) return 1;
      if (a['code'] < b['code']) return -1;
      return 0;
    }
    let array = products.product.sort(compare);
    console.log(array)
  }

  if (selectedValue === 'Einkaufspreis') {
    function compare(a,b){
      if (a['einkaufspreis'] > b['einkaufspreis']) return 1;
      if (a['einkaufspreis'] < b['einkaufspreis']) return -1;
      return 0;
    }
    let array = products.product.sort(compare);
    console.log(array)
  }

  if (selectedValue === 'Verkaufspreis') {
    function compare(a,b){
      if (a['verkaufspreis'] > b['verkaufspreis']) return 1;
      if (a['ver'] < b['ver']) return -1;
      return 0;
    }
    let array = products.product.sort(compare);
    console.log(array)
  }

  }

  render(){
    return(<div>
      <select id="myselect"  className="selectpicker" onChange={this.handleSelectChange.bind(this)}>
        <option>Filter</option>
        <option>Name</option>
        <option>Code</option>
        <option>Einkaufspreis</option>
        <option>Verkaufspreis</option>
      </select> <TableBody /> </div>
    );
  }
}
 
export default App






