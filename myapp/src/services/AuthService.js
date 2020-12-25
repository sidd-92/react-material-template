import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import BaseApiService from "./BaseApiService";

const DEFAULT_AUTH_PATH = "/auth/api";

class AuthService extends BaseApiService {
  constructor(props) {
    super(props);

    var _this = this;
    this.getAxios().interceptors.request.use(
      function (config) {
        console.log("Making API Request...");
        // Do something before request is sent
        return config;
      },
      function (error) {
        console.log("API Request ERROR...");
        // Do something with request error
        return Promise.reject(error);
      }
    );

    console.log("Creating interceptor...");
    // Add a response interceptor

    this.getAxios().interceptors.response.use(
      (response) => {
        console.log("API Response received...");
        // Do something with response data
        return response;
      },
      (error) => {
        const originalReq = error.config;
        if (typeof window === "undefined") {
        } else {
          let url = _this.getDefaultApiUrl();
          let authHeader = _this.getAuthHeader();
          console.log("API Response ERROR...");
          if (
            error.response.status === 401 &&
            error.config &&
            !error.config.___retry
          ) {
            originalReq.___retry = true;
            console.log("AA>> auth error...");
            return new Promise((resolve, reject) => {
              console.log("AA>> trying renew auth...");
              var userInfo = JSON.parse(localStorage.getItem("userInfo"));
              var username = userInfo.username;
              var refreshToken = userInfo.refreshToken;
              console.log("user:", username);
              console.log("refresh:", refreshToken);
              let res = fetch(url + "/refresh-token", {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  refreshToken: refreshToken,
                }),
              })
                .then((res) => res.json())
                .then((res) => {
                  var userinfo = JSON.parse(localStorage.getItem("userInfo"));
                  if (res.token) {
                    userinfo.token = res.token;
                    localStorage.setItem("userInfo", JSON.stringify(userinfo));
                  }
                  var newHeaders = {
                    Authorization: "Bearer " + userinfo.token,
                  };
                  originalReq.headers = newHeaders;
                  //
                  return _this.getAxios()(originalReq);
                });

              resolve(res);
            });
          } else if (
            //failed after refresh...
            error.config &&
            error.config.___retry
          ) {
            ReactDOM.render(
              <h1 className="flex flex-row w-full items-center justify-center bg-red-700 h-16 text-white">
                PLEASE LOG IN AGAIN...
              </h1>,
              document.getElementById("errorDiv12399")
            );
          }
        }
        return Promise.reject(error);
      }
    );
  }
  loginDummy(credentials) {
    if (
      credentials.username === "demo@viamagus.com" ||
      credentials.username === "demo@bitronics.com"
    ) {
      return new Promise(function (resolve, reject) {
        if (credentials.password === "demo") {
          let res = {
            data: {
              status: 200,
              result: "FAKE_AUTH_TOKEN",
            },
          };
          resolve(res);
        } else {
          let res = {
            data: {
              message: "Incorrect Credentials.",
            },
          };
          reject(res);
        }
      });
    }
  }
  login(credentials) {
    const headers = {
      "Content-Type": "application/json",
    };

    const body = {
      username: credentials.username,
      password: btoa(credentials.password),
    };

    var url = this.getDefaultApiUrl();

    return this.getAxios()
      .post(url + "/login", body)
      .then((res) => {
        if (res.status === 200) {
          let userInfo = res.data;
          userInfo.username = credentials.username;
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          Promise.resolve("Successfully logged in");
        } else {
          this.logOut();
          //Promise.reject("Unable to log in");
          throw new Error("Unable to log in");
        }
      })
      .catch((err) => {
        // this.logOut();
        if (err && err.data && err.data.message) {
          //Promise.reject(err.data.message);
          throw new Error(err.data.message);
        } else {
          //Promise.reject("Incorrect Username / Password");
          throw new Error("Incorrect Username / Password");
        }
      });
  }

  googleLogin(token) {
    var url = this.getDefaultApiUrl();
    return this.getAxios()
      .post(url + "/login-google", { token: token }, null)
      .then((res) => {
        console.log("Res", res);
        let userInfo = res.data;
        //  userInfo.username = credentials.username;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        Promise.resolve("Successfully logged in");
      })
      .catch((err) => {
        console.log("Error", err);
        this.logOut();
        //Promise.reject("Unable to log in");
        throw new Error("Unable to log in");
      });
  }

  facebookLogin(token) {
    var url = this.getDefaultApiUrl();
    return this.getAxios()
      .post(url + "/login-facebook", { token: token })
      .then((res) => {
        console.log("Res", res);
        let userInfo = res.data;
        //  userInfo.username = credentials.username;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        Promise.resolve("Successfully logged in");
      })
      .catch((err) => {
        console.log("Error", err);
        this.logOut();
        //Promise.reject("Unable to log in");
        throw new Error("Unable to log in");
      });
  }

  validateEmailLink(id) {
    var url = this.getDefaultApiUrl();

    return axios.get(url + `/validate-email?id=${id}`, null, null);
  }

  resendEmailLink(credentials) {
    var url = this.getDefaultApiUrl();

    return axios.post(
      url + `/resend-verify-email`,
      {
        emailId: credentials.email,
        uid: credentials.uid,
      },
      null
    );
  }

  loginPhoneStep1(credentials) {
    const headers = {
      "Content-Type": "application/json",
    };
    const body = {
      // username: credentials.username,
      phone: credentials.phonenumber,
    };
    var url = this.getDefaultApiUrl();
    return this.getAxios().post(url + "/login-phone", body);
  }

  loginPhoneStep2(credentials) {
    const headers = {
      "Content-Type": "application/json",
    };

    const body = {
      // phone: credentials.phone,
      otp: credentials.otp,
      uid: credentials.uid,
    };

    var url = this.getDefaultApiUrl();

    return this.getAxios()
      .post(url + "/validate-login-phone-otp", body)
      .then((res) => {
        if (res.status === 200) {
          let userInfo = res.data;
          userInfo.username = credentials.username;
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          Promise.resolve("Successfully logged in");
        } else {
          this.logOut();
          //Promise.reject("Unable to log in");
          throw new Error("Unable to log in");
        }
      })
      .catch((err) => {
        //this.logOut();
        if (err && err.data && err.data.message) {
          //Promise.reject(err.data.message);
          throw new Error(err.data.message);
        } else {
          //Promise.reject("Incorrect Username / Password");
          throw new Error("Incorrect Username / Password");
        }
      });
  }

  loginDummy(credentials) {
    return new Promise(function (resolve, reject) {
      if (credentials.password === "demo") {
        let res = {
          data: {
            status: 200,
            result: "FAKE_AUTH_TOKEN",
          },
        };
        resolve(res);
      } else {
        let res = {
          data: {
            message: "Incorrect Credentials.",
          },
        };
        reject(res);
      }
    });
  }

  signupEmail(credentials) {
    var url = this.getDefaultApiUrl();
    const body = {
      // username: credentials.username,
      emailId: credentials.email,
    };
    return axios.post(url + "/verify-email", body);
  }

  signupFinalEmail(credentials) {
    var url = this.getDefaultApiUrl();
    if (credentials.phone) {
      const body = {
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        password: btoa(credentials.password),
        time_zone: credentials.time_zone,
        phone: credentials.phone,
        uid: credentials.uid,
      };

      return axios.post(url + "/confirm-email-signup", body);
    } else {
      const body = {
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        password: btoa(credentials.password),
        time_zone: credentials.time_zone,
        uid: credentials.uid,
      };
      return axios.post(url + "/confirm-email-signup", body);
    }
  }

  signupFinalEmailWithPhoneStep1(credentials) {
    var url = this.getDefaultApiUrl();
    const body = {
      phone: credentials.phone,
      uid: credentials.uid,
    };
    return axios.post(url + "/attach-phone", body);
  }

  signupFinalEmailWithPhoneStep2(credentials) {
    var url = this.getDefaultApiUrl();
    const body = {
      otp: credentials.otp,
      uid: credentials.uid,
    };
    return axios.post(url + "/validate-attach-phone-otp", body);
  }

  signupPhoneStep1(credentials) {
    const headers = {
      "Content-Type": "application/json",
    };
    const body = {
      // username: credentials.username,
      phone: credentials.phonenumber,
    };
    var url = this.getDefaultApiUrl();
    return this.getAxios().post(url + "/verify-phone", body);
  }

  signupPhoneStep2(credentials) {
    const headers = {
      "Content-Type": "application/json",
    };
    const body = {
      // username: credentials.username,
      otp: credentials.otp,
      uid: credentials.uid,
    };
    var url = this.getDefaultApiUrl();
    return this.getAxios()
      .post(url + "/validate-phone-otp", body)
      .then((res) => {
        if (res.status === 200) {
          // let userInfo = res.data;
          // userInfo.username = credentials.username;
          // localStorage.setItem("userInfo", JSON.stringify(userInfo));
          // Promise.resolve("Successfully logged in");
        } else {
          this.logOut();
          //Promise.reject("Unable to log in");
          throw new Error("Unable to log in");
        }
      })
      .catch((err) => {
        this.logOut();
        if (err && err.data && err.data.message) {
          //Promise.reject(err.data.message);
          throw new Error(err.data.message);
        } else {
          //Promise.reject("Incorrect Username / Password");
          throw new Error("Incorrect Username / Password");
        }
      });
  }

  signupPhoneStep3(credentials) {
    const headers = {
      "Content-Type": "application/json",
    };
    const body = {
      // username: credentials.username,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      time_zone: credentials.time_zone,
      email: credentials.email,
      uid: credentials.uid,
    };
    var url = this.getDefaultApiUrl();
    return this.getAxios()
      .post(url + "/confirm-phone-signup", body)
      .then((res) => {
        if (res.status === 200) {
          let userInfo = res.data;
          userInfo.username = credentials.username;
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          // Promise.resolve("Successfully logged in");
        } else {
          // this.logOut();
          //Promise.reject("Unable to log in");
          throw new Error("Unable to log in");
        }
      })
      .catch((err) => {
        // this.logOut();
        if (err && err.data && err.data.message) {
          //Promise.reject(err.data.message);
          throw new Error(err.data.message);
        } else {
          //Promise.reject("Incorrect Username / Password");
          throw new Error("Incorrect Username / Password");
        }
      });
  }

  forgotPassword(credentials) {
    const body = {
      username: credentials.email,
    };
    var url = this.getDefaultApiUrl();
    return axios.post(url + "/forgot-password", body);
  }

  forgotPasswordReset(credentials) {
    var url = this.getDefaultApiUrl();
    const body = {
      uid: credentials.uid,
      new_password: btoa(credentials.password),
    };
    return axios.put(url + "/change-password", body);
  }

  resendOTP(credentials) {
    var url = this.getDefaultApiUrl();

    return axios.post(
      url +
        DEFAULT_AUTH_PATH +
        "/user/resend/otp?username=" +
        credentials.username
    );
  }

  resendOTPSignIn(credentials) {
    var url = this.getDefaultApiUrl();
    return axios.post(url + "/resend-phone-otp", {
      phone: credentials.phone,
      uid: credentials.uid,
    });
  }

  activateUser(credentials) {
    var url = this.getDefaultApiUrl();

    const body = {
      username: credentials.username,
      otp: credentials.otp,
    };
    return axios.post(url + DEFAULT_AUTH_PATH + "/user/activate", body);
  }

  getUserInfo() {
    if (localStorage.getItem("userInfo")) {
      return JSON.parse(localStorage.getItem("userInfo"));
    } else {
      return "";
    }
  }

  getAuthHeader() {
    return { headers: { Authorization: "Bearer " + this.getUserInfo().token } };
  }

  logOut() {
    var url = this.getDefaultApiUrl();
    this.getAxios()
      .post(url + "/logout", {
        refreshToken: this.getUserInfo().refreshToken,
      })
      .then((res) => {
        if (res) {
          localStorage.clear();
          window.location.pathname = "/console";
        }
      });
    return;
  }
}

export default new AuthService();
