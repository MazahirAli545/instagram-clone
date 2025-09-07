import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const authenticate = async () => {
    const url = "https://social-media-by-azam.onrender.com/google/authenticate";
    // const url = "http://localhost:3000";
    window.open(url, "_self");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const config = { Headers: { "Content-Type": "application/json" } };
    await axios
      .post("/api/v1/login", { username, password }, config)
      .then(res => {
        setLoading(false);
        window.location.reload();
      })
      .catch(error => {
        setError(error.response.data.message);
        setLoading(false);
      });
  };

  const googleSuccess = response => {
    setLoading(true);
    const data = jwt_decode(response.credential);
    console.log(data);
    axios.post("/api/v1/register/process/s1", { id: data.email, name: data.name, email: data.email, username: data.email }).then(res => {
      setLoading(false);
      if (res.data.flag == 0) window.location.reload();
      else navigate("/register", { replace: true });
    });
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_API_TOKEN,
        scope: "email"
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  return (
    <Container>
      {window.innerWidth > 769 && <OnboardImage src="/OnboardImage.png" />}

      <LoginCard>
        <InstaHeading src="InstagramHeading.png" />
        <LoginForm onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            className="form-control"
            placeholder="username"
            autoComplete="off"
            onChange={e => {
              setUsername(e.target.value);
            }}
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            className="form-control"
            placeholder="password"
            onChange={e => {
              setPassword(e.target.value);
            }}
            required
          />
          {error && (
            <div class="alert alert-danger" role="alert" style={{ width: "100%" }}>
              {error}
            </div>
          )}
          <button className="btn btn-primary" disabled={loading ? true : false}>
            Login
          </button>
        </LoginForm>

        <span style={{ margin: "1rem", fontSize: "1rem" }}>Or</span>

        <GoogleLogin onSuccess={googleSuccess} onFailure={error => console.log(error)} />
      </LoginCard>
    </Container>
  );
}
export default Login;

const Container = styled.div`
  width: 80%;
  margin: 5rem auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 769px) {
    width: 98%;
  }
`;
const OnboardImage = styled.img`
  width: 37rem;
  height: 37rem;
`;
const LoginCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 2rem;
  width: 30rem;
  @media (max-width: 769px) {
    width: 100%;
    padding: 0.5rem;
    border: none;
    input {
      margin: 2rem 0;
    }
  }
`;
const InstaHeading = styled.img`
  width: 14rem;
  margin-bottom: 2rem;
  @media (max-width: 769px) {
    width: 10rem;
  }
`;
const LoginForm = styled.form`
  width: 100%;
  input,
  button {
    margin: 0.5rem 0;
    width: 100%;
  }
`;
