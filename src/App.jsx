import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Dropdown from "./components/Dropdown";
import Dropzone from "./components/Dropzone";
import Spinner from "./components/Spinner";
import Input from "./components/Input";

import "./App.css";

const App = () => {
  const [files, setFiles] = useState([]);
  const [framework, setFramework] = useState("");
  const [registry, setRegistry] = useState("");
  const [image, setImage] = useState({
    name: "",
    version: "",
  });
  const [token, setToken] = useState("");
  const [project, setProject] = useState("");
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
      <div className="FrameWorkInput">
        <Dropdown
          required
          name="framework"
          placeholder="Framework"
          options={["Html-CSS-JS", "React", "NodeJS", "Flask", "Django", "Laravel", "Laravel-custom"]}
          onChange={handleDropdownChange}
        />
      </div>
      { framework == "Django" &&
       <div>If deploying a Django app also see these additional pre-deployment
         <a href="https://docs.google.com/document/d/1-zqaLC4x4yZflRS-LMhycVbhpCEvyId0smaqAwC5TBE/edit?usp=sharing">
           instructions</a> </div>}
           { framework =="Laravel-custom"  &&
       <div>Please make sure your project has a custom dockerfile added in the root of your Laravel app<br></br>
         <a href="https://medium.com/cranecloud/dockerizing-a-laravel-application-36b5ccd23691">
           Take an example</a> <br></br> Be sure to use your current version of laravel in your dockerfile </div>  }
      <div className="RegistryInput">
        <Dropdown
          required
          name="registry"
          placeholder="Registry"
          options={["Dockerhub", "Harbor"]}
          onChange={handleRegistryDropdownChange}
        />
      </div>
      <div className="Inputs">
        <Input
          name="name"
          placeholder="Image name"
          onChange={handleChange}
          value={image.name}
          required
        />
        <Input
          name="version"
          placeholder="Version"
          onChange={handleChange}
          value={image.version}
        />
      </div>
      <div className="Inputs">
        <Input
          name="token"
          placeholder="enter token please"
          onChange={handleToken}
          value={token}
        />
        <Input
          name="project"
          placeholder="crane cloud project"
          onChange={handleProject}
          value={project}
        />
      </div>
      <div>Please zip your project folder and upload only the zip file</div>
      <div>Avoid including build files in your zip file eg node_modules</div>
      <div className="Dropzone">
        <Dropzone handleDrop={(files) => setFiles(files)} />
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
