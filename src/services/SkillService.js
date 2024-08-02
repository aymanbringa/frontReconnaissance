import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/skills/all';

class SkillService {
  getAllSkills() {
    return axios.get(API_URL);
  }
}

export default new SkillService;