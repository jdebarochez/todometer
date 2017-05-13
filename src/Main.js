import React, {Component} from 'react';
import Date from './components/Date';
import ItemList from './components/ItemList';

class Main extends Component {
  render() {
    return <div>
      <Date />
      <ItemList browser={this.props.browser}/>
    </div>;
  }
}

export default Main;