import React, { useState, useEffect } from 'react';
import AuthService from '../services/AuthService';
import SkillService from '../services/SkillService';
import BadgeService from '../services/BadgeService';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const [role, setRole] = useState('');
  const [skills, setSkills] = useState([]);
  const [badges, setBadges] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedBadges, setSelectedBadges] = useState([]);
  const [cv, setCv] = useState(null);
  const [theme, setTheme] = useState('bg-theme1');
  const navigate = useNavigate();

  useEffect(() => {
    SkillService.getAllSkills().then(response => setSkills(response.data));
    BadgeService.getAllBadges().then(response => setBadges(response.data));
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    if (file) formData.append('image', file);
    formData.append('badges', selectedBadges.join(','));
    formData.append('skills', selectedSkills.join(','));
    if (cv) formData.append('cv', cv);
  
    console.log('FormData:', Array.from(formData.entries()));
  
    AuthService.createEmployee(formData)
      .then(response => {
        console.log(response);
        navigate('/success');
      })
      .catch(error => {
        console.error('Error:', error.response?.data || error.message);
      });
  
  
};


  const handleIconClick = (e) => {
    e.preventDefault();
    console.log("Switcher icon clicked");

    document.querySelector(".right-sidebar").classList.toggle("right-toggled");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div className={`bg-theme ${theme}`}>
      <div id="wrapper">
        <div className="card card-authentication1 mx-auto my-4">
          <div className="card-body">
            <div className="card-content p-2">
              <div className="text-center">
                <img src="assets/images/logo-icon.png" alt="logo icon" />
              </div>
              <div className="card-title text-uppercase text-center py-3">Sign Up</div>
              <form onSubmit={handleRegister}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmailId" className="sr-only">Email ID</label>
                  <div className="position-relative has-icon-right">
                    <input
                      type="text"
                      id="exampleInputEmailId"
                      className="form-control input-shadow"
                      placeholder="Enter Your Email ID"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                    <div className="form-control-position">
                      <i className="icon-envelope-open"></i>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputName" className="sr-only">Name</label>
                  <div className="position-relative has-icon-right">
                    <input
                      type="text"
                      id="exampleInputName"
                      className="form-control input-shadow"
                      placeholder="Enter Your Name"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      required
                    />
                    <div className="form-control-position">
                      <i className="icon-user"></i>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword" className="sr-only">Password</label>
                  <div className="position-relative has-icon-right">
                    <input
                      type="password"
                      id="exampleInputPassword"
                      className="form-control input-shadow"
                      placeholder="Choose Password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                    <div className="form-control-position">
                      <i className="icon-lock"></i>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Image</label>
                  <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <select value={role} onChange={(e) => setRole(e.target.value)} className="form-control">
                    <option value="Recruteur">Recruteur</option>
                    <option value="EMP">Employee</option>
                  </select>
                </div>
                {role === 'EMP' && (
                  <>
                    <div className="form-group">
                      <label>Skills</label>
                      <select multiple value={selectedSkills} onChange={(e) => setSelectedSkills([...e.target.selectedOptions].map(o => o.value))} className="form-control">
                        {skills.map(skill => (
                          <option key={skill.id} value={skill.id}>{skill.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Badges</label>
                      <select multiple value={selectedBadges} onChange={(e) => setSelectedBadges([...e.target.selectedOptions].map(o => o.value))} className="form-control">
                        {badges.map(badge => (
                          <option key={badge.id} value={badge.id}>{badge.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>CV</label>
                      <input type="file" accept=".pdf" onChange={(e) => setCv(e.target.files[0])} />
                    </div>
                  </>
                )}
                <div className="form-group">
                  <div className="icheck-material-white">
                    <input type="checkbox" id="user-checkbox" required />
                    <label htmlFor="user-checkbox">I Agree With Terms & Conditions</label>
                  </div>
                </div>
                <button type="submit" className="btn btn-light btn-block waves-effect waves-light">Sign Up</button>
                <div className="text-center mt-3">Sign Up With</div>
                <div className="form-row mt-4">
                  <div className="form-group mb-0 col-6">
                    <button type="button" className="btn btn-light btn-block"><i className="fa fa-facebook-square"></i> Facebook</button>
                  </div>
                  <div className="form-group mb-0 col-6 text-right">
                    <button type="button" className="btn btn-light btn-block"><i className="fa fa-twitter-square"></i> Twitter</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="card-footer text-center py-3">
            <p className="text-warning mb-0">Already have an account? <a href="/login"> Sign In here</a></p>
          </div>
        </div>
      </div>
      <button onClick={scrollToTop} className="back-to-top" aria-label="Back to top">
        <i className="fa fa-angle-double-up"></i>
      </button>
      <div className="right-sidebar">
        <div className="switcher-icon" onClick={handleIconClick}>
          <i className="zmdi zmdi-settings zmdi-hc-spin"></i>
        </div>
        <div className="right-sidebar-content">
          <p className="mb-0">Gaussion Texture</p>
          <hr />
          <ul className="switcher">
            <li onClick={() => changeTheme('bg-theme1')} id="theme1"></li>
            <li onClick={() => changeTheme('bg-theme2')} id="theme2"></li>
            <li onClick={() => changeTheme('bg-theme3')} id="theme3"></li>
            <li onClick={() => changeTheme('bg-theme4')} id="theme4"></li>
            <li onClick={() => changeTheme('bg-theme5')} id="theme5"></li>
            <li onClick={() => changeTheme('bg-theme6')} id="theme6"></li>
          </ul>

          <p className="mb-0">Gradient Background</p>
          <hr />
          <ul className="switcher">
            <li onClick={() => changeTheme('bg-theme7')} id="theme7"></li>
            <li onClick={() => changeTheme('bg-theme8')} id="theme8"></li>
            <li onClick={() => changeTheme('bg-theme9')} id="theme9"></li>
            <li onClick={() => changeTheme('bg-theme10')} id="theme10"></li>
            <li onClick={() => changeTheme('bg-theme11')} id="theme11"></li>
            <li onClick={() => changeTheme('bg-theme12')} id="theme12"></li>
            <li onClick={() => changeTheme('bg-theme13')} id="theme13"></li>
            <li onClick={() => changeTheme('bg-theme14')} id="theme14"></li>
            <li onClick={() => changeTheme('bg-theme15')} id="theme15"></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Register;
