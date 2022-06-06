import instance from "./instance";
import jwt_decode from "jwt-decode";
import { observer } from "mobx-react-lite";
import { makeAutoObservable } from "mobx";

class AuthStore {
  user = null;
  constructor() {
    makeAutoObservable(this);
    // this will turn our class into a mobx store and all components can observe the changes that happen in the store
  }
  signup = async (newUser) => {
    try {
      console.log(newUser);
      const response = await instance.post("/signup", newUser);
      instance.defaults.headers.common.Authorization = `Bearer${response.data.token}`;
      console.log(response.data.token);
      this.user = jwt_decode(response.data.token);
      this.setUser(response.data.token);
    } catch (error) {
      console.log(
        "🚀 ~ file: AuthStore.js ~ line 16 ~ AuthStore ~ createAuth= ~ error",
        error
      );
    }
  };

  signin = async (newUser) => {
    try {
      console.log(newUser);
      const response = await instance.post("/signin", newUser);
      instance.defaults.headers.common.Authorization = `Bearer${response.data.token}`;
      this.user = jwt_decode(response.data.token);
      console.log(response.data.token);
      console.log(this.user);
      this.setUser(response.data.token);
    } catch (error) {
      console.log(
        "🚀 ~ file: AuthStore.js ~ line 16 ~ AuthStore ~ createAuth= ~ error",
        error
      );
    }
  };

  signout = async (newUser) => {
    try {
      this.user = null;
      instance.defaults.headers.common.Authorization = null;
      localStorage.removeItem("token");
    } catch (error) {
      console.log(
        "🚀 ~ file: AuthStore.js ~ line 16 ~ AuthStore ~ createAuth= ~ error",
        error
      );
    }
  };
  setUser = (userToken) => {
    localStorage.setItem("token", userToken);
    instance.defaults.headers.common.Authorization = `Bearer ${userToken}`;
    this.user = jwt_decode(userToken);
  };

  checkForToken = () => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      const newUser = jwt_decode(userToken);
      if (newUser.exp > Date.now()) this.setUser(userToken);
      else this.signout();
    }
  };
}

const authStore = new AuthStore();
authStore.checkForToken();
// It will only call this function when the app first starts

export default authStore;

// axios.METHOD(URL, BODY)

// GET: Fetching Data
// axios.get("http://localhost:8000/api/Auths");
// Return array of Auths

// POST => It takes a BODY, and is used when we Send Data (Create)
// axios.post("http://localhost:8000/api/products", newObject);
// Returns a new object

// PUT =>  It takes a BODY, and is used to Update Data. We must pass an ID.
// axios.put(`http://localhost:8000/api/products/${ID}`, updatedObject);
// Returns updated object

// DELETE => Delete some data. We must pass an ID.
// axios.delete(`http://localhost:8000/api/products/${ID}`);
// Returns nothing
