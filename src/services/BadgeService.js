import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/badge/all';

class BadgeService {
  getAllBadges() {
    return axios.get(API_URL);
  }
}

export default new BadgeService;