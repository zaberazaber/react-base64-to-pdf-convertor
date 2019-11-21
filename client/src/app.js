import React from 'react';
import axios from 'axios';
import './app.css'

class App extends React.Component {

  downloadFile = (url) =>  {
    let a = document.createElement('a')
    a.href = url
    a.target = "_blank"
    a.download = url.split('/').pop();
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    axios.get(`http://localhost:5000/file`)
      .then(res => {
        let filePath = res.data.serverUrl + "/" + res.data.fileName;
        this.downloadFile (filePath);
      })
  }

  render() {
    return (<div className="position">
      <a  className = "button" onClick={this.handleClick} >
        Click me
      </a >
    </div>)
  }



}

export default App;
