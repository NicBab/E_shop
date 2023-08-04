import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  max-width: 400px;
  border-radius: 5px;
  ${mobile({ width: "75%" })}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Input = styled.input`
  flex: 1;
  min-width: 75%;
  margin: 10px 10px 0px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: teal;
  };

  &:disabled {
    color: grey;
    cursor: not-allowed
  };
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error =styled.span`
color: red;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {isFetching, error} = useSelector((state) => state.user)

  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, {username, password})
    navigate("/")
  }
  return (
    <Container>
      <Wrapper>
        <Form>
          <Title>Sign In</Title>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} disabled={isFetching}>Login</Button>
          { error && <Error>Something went Wrong</Error>}
          <Link>Forgot Password?</Link>
          <Link>Create New Account</Link>
          <Link onClick={() => navigate("/")}>Home</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
