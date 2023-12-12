import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  margin-top: 70px;
  width: 60%;
`;

const MyPageHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  font-size: 24px;
`;

const MyPageBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #E5EEFA;
  color: #35619D;
  padding: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin :20px;
  font-weight: bold; 
`;

const EmailAddress = styled.h1`
  font-size: 16px;
  margin-left: 25px;
  margin-top: 10px;
  margin-bottom: 30px;
`;

const ActionButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const ActionButton = styled(Link)`
  text-decoration: none;
  background-color: #E5EEFA;
  color: #35619D;
  padding: 10px 74px;
  border: 1px solid #35619D;
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #98BBEB;
  }
  `;

const InterestsContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 20px;
  border: 1px solid #35619D;
  padding: 20px;
  width: 100%;
  background-color: #F4F9FF;
  `;

const RecentlyVisitedContainer = styled.div`
  border: 1px solid #35619D;
  padding: 20px;
  width: 100%; 
  background-color: #F4F9FF;
`;

const Empty = styled.p`
  color: #A0A0A0;
  margin-left:10px;
  margin-top:30px;
`;

const MyPage = () => {
  return (
    <MyPageContainer>
      <MyPageHeader>
        마이페이지
      </MyPageHeader>
      
      <MyPageBox>
        <Title>안녕하세요, ㅇㅇㅇ님!</Title>
        <EmailAddress>user123@gmail.com</EmailAddress>
      </MyPageBox>
      
      <ActionButtonContainer>
        <ActionButton to="/edit-profile">회원정보 수정</ActionButton>
        <ActionButton to="/resume-upload">이력서 업로드</ActionButton>
        <ActionButton to="/skill-upload">스킬 업로드</ActionButton>
      </ActionButtonContainer>

      <InterestsContainer>
        <h4>관심있는 회사</h4>
        <Empty>비어 있습니다</Empty>
      </InterestsContainer>

      <RecentlyVisitedContainer>
        <h4>최근 방문한 회사</h4>
        <Empty>비어 있습니다</Empty>
      </RecentlyVisitedContainer>
    </MyPageContainer>
  );
};

export default MyPage;