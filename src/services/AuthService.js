// src/components/AuthService.js
import axios from 'axios';

const AUTH_API = 'http://localhost:8080/api/auth/';

class AuthService {
  login(username, password) {
    return axios
      .post(AUTH_API + 'signin', { username, password })
      .then(response => {
        if (response.data.id) {
          this.setUser(response.data.id);
        }
        return response.data;
      });
  }

  register(username, email, password, file, role) {
    const formData = new FormData();
    
    // Append all fields directly
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role.join(',')); // Convert set to a comma-separated string
    formData.append('image', file); // Ensure this matches the controller's parameter name
  
    return axios.post(AUTH_API + 'signup', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      if (response.data.id) {
        this.setUser(response.data.id);
      }
      return response.data;
    });
  }
  createEmployee(formData) {
    return axios.post(AUTH_API + 'employee', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      return response.data;
    });
  }
  
  
  captureAndSendImage(imageDataUrl) {
    const formData = new FormData();
    formData.append('image', this.dataURLtoFile(imageDataUrl, 'image.jpg'));

    return axios.post(AUTH_API + 'facial-recognition', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error("Error sending image:", error);
    });
  }

  // Convert data URL to file
  dataURLtoFile(dataUrl, filename) {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }




  logout() {
    return axios.post(AUTH_API + 'signout').then(response => {
      localStorage.removeItem('user_id');
      return response.data;
    });
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    return token !== null && token !== undefined;
  }

  setUser(id) {
    localStorage.setItem('user_id', id);
  }
  getUserById(userId) {
    return axios.get(`${AUTH_API}getUser/${userId}`);
  }
  getImageUrl(imageName) {
    return `http://localhost:8080/api/auth/images/${imageName}`;
  }


}

export default new AuthService();
