import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledButton = styled.button`
  min-width: 130px;
  padding: 10px 20px;
  background-color: white;
  color: #black;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  &:hover {
    background-color: #ccc;
  }
`;

const SpacedButton = styled(StyledButton)`
  margin-right: 6px; /* 버튼 사이의 간격 설정 */
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Icon = styled.img`
  width: 30px; 
  height: 32px;
  margin-bottom: 10px;
`;

const Buttons = () => {
  return (
    <div className="box bg-1">
      <Link to="/job-postings">
        <SpacedButton data-text="채용공고">
          <ButtonContainer>
            <Icon src="/images/채용공고.png" alt="Button Image 1" />
            <span>채용공고</span>
          </ButtonContainer>
        </SpacedButton>
      </Link>
      <Link to="/skill-upload">
        <SpacedButton data-text="스킬업로드">
          <ButtonContainer>
            <Icon src="/images/스킬업로드.png" alt="Button Image 2" />
            <span>스킬 업로드</span>
          </ButtonContainer>
        </SpacedButton>
      </Link>
      <Link to="/resume-upload">
        <SpacedButton data-text="이력서 업로드">
          <ButtonContainer>
            <Icon src="/images/이력서업로드.png" alt="Button Image 3" />
            <span>이력서 업로드</span>
          </ButtonContainer>
        </SpacedButton>
      </Link>
      <Link to="/application-status">
        <SpacedButton data-text="지원 현황">
          <ButtonContainer>
            <Icon src="/images/지원현황.png" alt="Button Image 3" />
            <span>지원 현황</span>
          </ButtonContainer>
        </SpacedButton>
      </Link>
      <Link to="/next-career-search">
        <SpacedButton data-text="다음 커리어 찾기">
          <ButtonContainer>
            <Icon src="/images/다음커리어찾기.png" alt="Button Image 3" />
            <span>다음 커리어 찾기</span>
          </ButtonContainer>
        </SpacedButton>
      </Link>
      <Link to="/company-search">
        <SpacedButton data-text="나만의 회사 찾기">
          <ButtonContainer>
            <Icon src="/images/나만의회사찾기.png" alt="Button Image 3" />
            <span>나만의 회사 찾기</span>
          </ButtonContainer>
        </SpacedButton>
      </Link>
      <Link to="/salary-by-job">
        <SpacedButton data-text="직군별 연봉">
          <ButtonContainer>
            <Icon src="/images/직군별연봉.png" alt="Button Image 3" />
            <span>직군별 연봉</span>
          </ButtonContainer>
        </SpacedButton>
      </Link>
    </div>
  );
};

export default Buttons;
