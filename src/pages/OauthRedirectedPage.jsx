import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OauthRedirectedPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleOauthKakao = async (code) => {
    try {
      const response = await axios.get(
        'http://localhost:8080/login/oauth2/code',
        {
          params: { code },
        }
      );

      console.log(response.data.data.accessToken);
      localStorage.setItem('accessToken', response.data.data.accessToken);
      alert('로그인 성공');
      // 커밋 테스트
      navigate('/');
    } catch (error) {
      alert('로그인 실패');
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    if (code) {
      alert('CODE = ' + code);
      handleOauthKakao(code);
      // 리다이렉트 후 중복 요청 방지를 위해 현재 URL에서 쿼리 파라미터 제거

      navigate('/auth', { replace: true });
    }
  }, []);

  return (
    <div>
      <div>Processing...</div>
    </div>
  );
};

export default OauthRedirectedPage;
