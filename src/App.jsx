import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Dropdown from "./components/Dropdown";
import Dropzone from "./components/Dropzone";
import Spinner from "./components/Spinner";
import Input from "./components/Input";

import "./App.css";

const App = () => {
  const [files, setFiles] = useState([]);
  const [framework, setFramework] = useState("Html-CSS-JS");
  const [registry, setRegistry] = useState("Dockerhub");
  const [image, setImage] = useState({
    name: "myapp",
    version: "01",
  });
  const [token, setToken] = useState("aytdxuendndsdrewe*********");
  const [project, setProject] = useState("id-039-9384-cdssa");
  const [loading, setLoader] = useState(false);

  const getPathName = (path) => {
    let filePath = path.replaceAll("/", "|").replace("|", "");
    filePath = filePath.substring(filePath.indexOf("|")).replace("|", "");
    return filePath;
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setImage({
      ...image,
      [name]: value,
    });
  };
  const handleToken = ({ target }) => {
    const { value } = target;
    setToken(value);
  };
  const handleProject = ({ target }) => {
    const {value } = target;
    setProject(value);
  };

  const handleDropdownChange = (selected) => {
    setFramework(selected);
  };

  const handleRegistryDropdownChange = (selected) => {
    setRegistry(selected);
  };

  const handleSubmit = () => {
    setLoader(true);
    const formData = new FormData();
    const { name, version } = image;

    for (const file of files) {
      const { path } = file;
      console.log(getPathName(path));
      formData.append("files", file, getPathName(path));
    }

    formData.append("name", name);
    formData.append("tag", version);
    formData.append("framework", framework);
    formData.append("token", token);
    formData.append("project", project);
    formData.append("registry", registry);

    axios.post("http://localhost:5000/containerize", formData).

     then(function ({data}) {
       if(data){
        setLoader(false);
        alert("successfull, check crane cloud front end");
       }
     })
    .catch(function (error) {
      setLoader(false);
      alert(error);
     });
    
  };

  return (
    <div className="App">
      <div className="InputWithLebel">
      <label className="label">Framework</label>
      <div className="FrameWorkInput">
        <Dropdown
          required
          name="eg. React"
          placeholder="Framework"
          options={["Html-CSS-JS", "React", "NodeJS", "Flask", "Django", "Laravel", "Laravel-custom"]}
          onChange={handleDropdownChange}
        />
      </div>
      </div>
      { framework == "Django" &&
       <div>If deploying a Django app also see these additional pre-deployment
         <a href="https://docs.google.com/document/d/1-zqaLC4x4yZflRS-LMhycVbhpCEvyId0smaqAwC5TBE/edit?usp=sharing">
           instructions</a> </div>}
           { framework =="Laravel-custom"  &&
       <div>Please make sure your project has a custom dockerfile added in the root of your Laravel app<br></br>
         <a href="https://medium.com/cranecloud/dockerizing-a-laravel-application-36b5ccd23691">
           Take an example</a> <br></br> Be sure to use your current version of laravel in your dockerfile </div>  }
      <div className="InputWithLebel">
      <label className="label">Registry</label>
      <div className="RegistryInput">
        <Dropdown
          required
          name="registry"
          placeholder="DockerHub"
          options={["Dockerhub", "Harbor"]}
          onChange={handleRegistryDropdownChange}
        />
      </div>
      </div>
      <div className="Inputs">
      <div className="InputWithLebel">
      <label className="label">App/image Name</label>
        <Input
          name="name"
          placeholder="myapp"
          onChange={handleChange}
          value={image.name}
          required
        />
        </div>
      <div className="InputWithLebel">
      <label className="label">Version/tag</label>
        <Input
          name="version"
          placeholder="01"
          onChange={handleChange}
          value={image.version}
        />
      </div>
      </div>
      <div className="Inputs">
      <div className="InputWithLebel">
      <label className="label">Crane cloud user token</label>
        <Input
          name="token"
          placeholder="Paste your token here"
          onChange={handleToken}
          value={token}
        />
        </div>
       <div className="InputWithLebel">
      <label className="label">Crane cloud Project Id</label>
        <Input
          name="project"
          placeholder="crane cloud project"
          onChange={handleProject}
          value={project}
        />
      </div>
      </div>
      <div>Please zip your project folder and upload only the zip file</div>
      <div>Avoid including build files in your zip file eg node_modules</div>
      <div className="InputWithLebel">
      <label className="label">Zip of source code</label>
      <div className="Dropzone">
        <Dropzone handleDrop={(files) => setFiles(files)} />
      </div>
      </div>
      {
        loading == false ?
        <button onClick={handleSubmit}>
         DEPLOY
        </button>
        :
        <div className="Spinner">
          <Spinner />
        </div>
      }
    </div>
  );
};

export default App;
