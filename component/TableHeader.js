import React, {Component} from 'react';
import '../bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class TableHeader extends Component {

    render(){
      return(
              <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Code</th>
                  <th scope="col">Wahrung</th>
                  <th scope="col">Einkaufspreis</th>
                  <th scope="col">Verkaufspreis</th>
              </tr>
       );
   }
}


export default TableHeader