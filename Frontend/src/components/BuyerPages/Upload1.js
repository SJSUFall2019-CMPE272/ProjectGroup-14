import React, {Component} from "react";
import "../../styles/Upload.css"
import {HOSTNAME} from "../Constants/Constants";
import axios from 'axios';
import sample from '../../pdfs/full-report.pdf';
import {Document, Page} from 'react-pdf';
import Particles from 'react-particles-js'

axios.defaults.withCredentials = true;

const particleOpt = {
  particles: {
      "number": {
          value: 150
      },
      "color": {
          value: "#f9f3f4"
      },
      "shape": {
          type: "circle",
          stroke: {
              width: 1,
              color: "#dfc"
          }
      },
      "opacity": {
          value: 0.5,
          random: true
      },
      "size": {
          value: 2
      },
      "line_linked": {
          enable: true,
          distance: 110
      },
      "interactivity": {
          "detect_on": "window",
          "events": {
              "onhover": {
                  "enable": false,
                  "mode": "grab"
              }
          }
      }
  }
};

class ImageUpload extends React.Component {
    constructor(props) {
      super(props);
      this.state = {file: '',imagePreviewUrl: '', pageNumber: 2,sample:''};
    }
  
    _handleSubmit(e) {
      e.preventDefault();
      console.log('handle uploading-', this.state.file);
      let data = new FormData();
      console.log("selectedFile and index",this.state.file);
      data.append('file', this.state.file);
      data.append('name', this.state.file.name);
      data.append('image', this.state.file.name);
      data.append('description', "new file");
      data.append('section', "report");
      data.append('owner_id', "1");
      axios.post(`http://${HOSTNAME}:3001/orders/menu_item/add`, data)
      .then((response) => {
          console.log("addMenuItem");
          console.log(response);
          alert("Pdf uploaded Successfully!!");
          this.getPreview();
      })
      .catch((error) => {
          this.setState({addItemSuccess: false});
      });
      
        e.target.reset();
    }
  
    _handleImageChange(e) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
  
      reader.readAsDataURL(file)
    }

    getPreview(){
        const payload = {};
        payload.langCode = this.state.langCode;
        payload.owner_id = "1";
        axios.post(`http://${HOSTNAME}:3001/orders/pdf/view`, payload)
        .then((response) => {
            console.log(response);
        })
        if(this.state.sample!=undefined){
          return(<div>
            <Document
                file={this.state.sample}
                onLoadSuccess={this.onDocumentLoadSuccess}
            >
                <Page pageNumber={this.state.pageNumber}/>
            </Document>
            <p>Page {this.state.pageNumber} of {this.state.numPages}</p>
        </div>
          )
        }else{
            return(<div className="previewText">Please select an Image for Preview</div>);
        }
    }

    componentDidMount() {
        //this._handleSubmit();
    }

    render() {
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} />);
      } else {
        $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
      }
  
      return (
        <div class="body">
        <div>
            <Particles
                params={{
                    particleOpt
                }}/>
        </div>
        <div class="text-overlay">
                <div class="header">
                    <a href="/" class="logo">MEDIREPORT</a>
                    <div class="header-right">
                    </div>
                </div>
          <form onSubmit={(e)=>this._handleSubmit(e)}>
            <input className="fileInput" 
              type="file" 
              onChange={(e)=>this._handleImageChange(e)}  required/>
            <button className="submitButton" 
              type="submit">Upload Image</button>
          </form>


          </div>
          {/* <div className="imgPreview">
            {$imagePreview}
          </div> */}

                 {this.getPreview}   
        </div>
      )
    }
  }
    
export default ImageUpload;