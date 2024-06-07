import { useNavigate } from "react-router-dom";
import { DoctorUserIcon, HeroPhoto, PasswordIcon } from "../../../photos";
import "../Hero/Hero.scss";
import { useState } from "react";
import { loginAPI } from "../../../../redux/services/LoginApi";


const Hero = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  // const handleLogin = async () => {
  //   if (!username.trim() || !password.trim()) {
  //     alert("provide username and password");
  //   } else {
  //     try {
  //       await loginAPI.login(username, password);
  //       navigate('/Sectors');
  //     } catch (error: any) {
  //       alert("Login failed: " + error.message);
  //     }
  //   }
  // };

  const handleLogin = async () => {
    navigate('/Sectors');
  };

  return (
    <div className="hero-container">
      <div className="hero-container-part-one">
        <div className="hero-content">
          <img className="hero-img" src={HeroPhoto} alt="hero-photo" />
          <div className="hero-right">
            <div className="title">חפש את המטמון בבית חולים שיבא</div>
            <div className="inputs-button">
              <div className="admin-user-name">
                <input
                  className="admin-user-name-input"
                  placeholder="שם משתמש"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
                <img className="navbar-icon" src={DoctorUserIcon} alt="admin-icon" />
              </div>
              <div className="admin-code">
                <input
                  className="admin-code-input"
                  type="password"
                  placeholder=" קוד"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <img className="navbar-icon" src={PasswordIcon} alt="admin-icon" />
              </div>
              <button className="login-button" onClick={handleLogin}>התחבר</button>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-container-part-two">
        צור מסלולים מותאמים אישית, הגדר תחנות אינטראקטיביות והסב שמחה למטופלים
        צעירים באמצעות הרפתקאות מרתקות ותכליתיות.
      </div>
    </div>
  );
};

export default Hero;
