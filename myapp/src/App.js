import React from "react";
import Navbar from "./components/Navbar/Navbar";
import InputText from "./components/InputText/InputText";
class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="m-1">
          <div className="text-xl">List Of Components Needed</div>
          <div>Input Text</div>
          <InputText
            size="NORMAL"
            label="Username"
            placeholder="Enter Username"
            name="username"
            required={true}
            type="text"
          />
          <InputText
            size="NORMAL"
            label="Password"
            placeholder="Enter Password"
            name="pwd"
            hasError={false}
            required={true}
            type="password"
          />
          <div>Text Area</div>
          <div>Upload Box</div>
          <div>Button</div>
          <div>Password Text</div>
          <div>Dropdown</div>
          <div>Checkbox</div>
          <div>Radio</div>
          <div>Card</div>
          <div>Table</div>
        </div>
      </div>
    );
  }
}

export default App;
