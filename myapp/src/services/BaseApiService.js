import axios from "axios";
import AuthService from "./AuthService";

const prod = true;

const DEFAULT_API_PATH = process.env.REACT_APP_BASE_URL;

//axios.defaults.withCredentials = true;

class BaseApiService {
  constructor() {}

  getDefaultApiUrl() {
    /* if (process.env.NODE_ENV === "production") {
      if (!(typeof window === "undefined")) {
        return window.location.protocol + "//" + window.location.hostname;
      }
    } */
    return DEFAULT_API_PATH;
  }

  getAxios() {
    if (!prod) {
      return this.dummyAxios();
    }

    return axios;
  }

  getAuth() {
    return AuthService.getAuthHeader();
  }

  getDummyData() {
    let res = {
      status: 200,
      data: {
        message: "Dummy Data",
      },
    };
    return res;
  }

  isApiEnvDev() {
    return !prod;
  }

  dummyAxios() {
    console.log("Executing in DUMMY API MODE...");
    let obj = {
      get: (url = "", auth = "", obj = this) => {
        try {
          console.log("Call list-> Step 1");
          var stack = new Error().stack;
          console.log("Call list->" + stack);
          var caller = stack.split("\n")[2].trim();
          var fn = caller.split(" ");
          var methods = fn[1].split(".");
          var results = obj[methods[1] + "Dummy"]();
          if (results) {
            return new Promise(function (resolve, reject) {
              resolve(results);
            });
          }
        } catch (err) {
          console.log("ERROR...");
          console.log("ERROR: " + err);
          console.log("Error -> " + err.stack);
          console.log(
            "Function " +
              fn[1] +
              "Dummy() does not seem to exist. Executing default getDummyData() function. "
          );
        }
        return new Promise(function (resolve, reject) {
          resolve({
            status: 200,
            data: [{ id: 1, name: "DUMMY NAME", value: "DUMMY VALUE" }],
            message: "dummy get api success",
          });
        });
      },
      post: (url = "", auth = "", obj = this) => {
        try {
          var stack = new Error().stack;
          var caller = stack.split("\n")[2].trim();
          var fn = caller.split(" ");
          var methods = fn[1].split(".");
          var results = obj[methods[1] + "Dummy"]();
          if (results) {
            return new Promise(function (resolve, reject) {
              resolve(results);
            });
          }
        } catch (err) {
          console.log(
            "Function " +
              fn[1] +
              "Dummy() does not seem to exist. Executing default getDummyData() function. "
          );
        }
        return new Promise(function (resolve, reject) {
          resolve({
            status: 200,
            message: "dummy post api success",
          });
        });
      },
    };
    return obj;
  }
}

export default BaseApiService;
