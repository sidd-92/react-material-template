import axios from "axios";

const DEMO_API_BASE_URL = "http://localhost:8080/users";

class ApiService {
  fetchUsers() {
    return axios.get(DEMO_API_BASE_URL);
  }
}

export default new ApiService();
