import React, {Component} from 'react';
import Options from "../Options";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("Pop-up Mounted")
  }

  render() {
    return (
      <Options/>
    );
  }
}


export default App;
