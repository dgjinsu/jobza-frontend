import React, { useState } from 'react';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import '../Login.css';
import styled from 'styled-components';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LoginContainer = styled(Container)`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  overflow-y: 'auto';
  height: '110vh';
`;

const LoginForm = styled(Form)`
  input[type='text'],
  input[type='password'] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 30px;
  }
`;

const LoginButton = styled(Button)`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const SnsLoginButton = styled(Button)`
  width: 5rem;
  height: 3rem;
  padding: 10px;
  background-color: ${(props) => props.color};
  color: #ffffff;
  border-radius: 5px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #a5d8ff;
  }
`;

const LogoImage = styled.img`
  width: 15%;
  height: auto;
  margin-bottom: 2rem; 
  margin-top: 3rem; 
`;

const Login = () => {
  // 로그인 폼 필드의 상태
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 버튼을 클릭했을 때 실행되는 함수
  const handleLogin = () => {
    // 실제 로그인 로직을 이 부분에 구현
    if (username === 'user' && password === 'password') {
      alert('로그인 성공!');
    } else {
      alert('로그인 실패. 아이디와 비밀번호를 확인하세요.');
    }
  };

  const handleKakaoLogin = () => {
    window.location.href =
      'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=de47672601f1318713d6ebbfca037682&redirect_uri=http://localhost:3000/auth';
  };

  return (
    <LoginContainer>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <div className="text-center">
            <LogoImage
              src="/images/B-JOB.png"
              alt="로고">
            </LogoImage>
          </div>
          <div className="text-center">
            <h3 className="mb-3">부산잡자에 오신것을 환영합니다.</h3>
            <h6>
              부산잡자는 부산광역시 청년층의 취업을 위한 맞춤형 구직 상담
              서비스를 제공합니다.
            </h6>
          </div>
          <LoginForm>
            <hr style={{ margin: '6rem 0' }} />{' '}
            {/* 가로 선 추가 및 큰 마진 설정 */}
            <SnsLoginButton type="button" color="#4dabf7">
              <FaGoogle size="1.5rem" />
            </SnsLoginButton>
            <SnsLoginButton
              type="button"
              color="#FEE500"
              onClick={handleKakaoLogin}
            >
              <img
                src="/images/kakao-logo.png"
                alt="kakao"
                width={27}
                height={27}
              />
            </SnsLoginButton>
            <Form>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="아이디를 입력하세요"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <LoginButton
                variant="primary"
                type="button"
                onClick={handleLogin}
              >
                Log In
              </LoginButton>
            </Form>
          </LoginForm>
        </Col>
      </Row>
    </LoginContainer>
  );
};

export default Login;
