import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Dropdown from './components/Dropdown';
import Dropzone from './components/Dropzone';
import Input from './components/Input'
import './App.css';

const App = () => {
const [files, setFiles] = useState([]);
const [framework, setFramework] = useState('');
const [image, setImage] = useState({
name: '',
version: ''
});

const getPathName = (path) => {
let filePath = path.replaceAll("/", "|").replace("|", "");
filePath = filePath.substring(filePath.indexOf("|")).replace("|", "");
return filePath;
}

const handleChange = ({ target }) => {
const { name, value } = target;

setImage({
...image,
[name]: value
});
};

const handleDropdownChange = (selected) => {

setFramework(selected);
}

const handleSubmit = () => {
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

axios.post('http://localhost:5000/', formData)
.then()
.catch();
}

return (
<div className="App">
<div className="FrameWorkInput">
<Dropdown required name="framework" placeholder="Framework" options={['Html-CSS-JS', 'React', 'NodeJS']} onChange={handleDropdownChange} />
</div>
<div className="Inputs">
<Input name="name" placeholder="Image name" onChange={handleChange} value={image.name} required />
<Input name="version" placeholder="Version" onChange={handleChange} value={image.version} />
</div>
<div>
Please zip your project folder and upload only the zip file
</div>
<div>
Avoid including build files in your zip file eg node_modules 
</div>
<div className="Dropzone">
<Dropzone handleDrop={(files) => setFiles(files)} />
</div>
<button onClick={handleSubmit}>DEPLOY</button>
</div>
);
};

export default App;

