import React from 'react';
import axios from 'axios';

class App extends React.Component {

  /**
   * Dynamically inject anchor tag into document to open output.pdf
   */
  downloadFile = (url) =>  {
    let a = document.createElement('a')
    a.href = url
    a.target = "_blank"
    a.download = url.split('/').pop();
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  /**
   * API call to server to convert the base64 into pdf 
   * and get the response url to set on the anchor tag
   */
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
    return (<div>
      <button onClick={this.handleClick}>
        Click me
      </button>
    </div>)
  }
}

export default App;
