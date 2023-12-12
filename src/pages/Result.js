import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Spinner from 'react-bootstrap/Spinner';
import { useRecoilState } from 'recoil';
import { noState } from './atom';

const StyledImage = styled.img`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 100px;
`;

const StyledSpinner = styled(Spinner)`
  color: #3498db;
  margin-right: 5px;
  margin-top: 20px;
`;
const CompanyListItem = styled.li`
  margin-bottom: 15px;
`;
const CompanyName = styled.span``;
const MoreButton = styled.button`
  margin-left: 15px;
`;

const Result = () => {
  const [corpList, setCorpList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedJob } = useParams();
  const cafeRange =
    parseFloat(new URLSearchParams(window.location.search).get('cafe')) || 0.5;
  const hospitalRange =
    parseFloat(new URLSearchParams(window.location.search).get('hospital')) ||
    0.5;
  const healthRange =
    parseFloat(new URLSearchParams(window.location.search).get('health')) ||
    0.5;
  const parkRange =
    parseFloat(new URLSearchParams(window.location.search).get('park')) || 0.5;
  const martRange =
    parseFloat(new URLSearchParams(window.location.search).get('mart')) || 0.5;
  const fastFoodRange =
    parseFloat(new URLSearchParams(window.location.search).get('fastFood')) ||
    0.5;

  const navigate = useNavigate();

  const [recoilSelectedJob, setRecoilSelectedJob] = useRecoilState(noState); // Recoil 상태와 업데이트 함수 가져오기

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');

        if (!token) {
          console.error(
            'Access token not available. Redirect to login page or handle error.'
          );
          return;
        }

        const response = await axios.post(
          'http://localhost:8080/job-post/prefer',
          {
            job: selectedJob,
            cafe: cafeRange,
            hospital: hospitalRange,
            health: healthRange,
            park: parkRange,
            mart: martRange,
            fastFood: fastFoodRange,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const parsedCorpList = response.data?.data.map((item) => ({
          wantedAuthNo: item?.wantedAuthNo,
          corpInfo: item?.corpInfo,
        }));
        console.log('Corp List:', parsedCorpList); // 화사이름, 회사번호 저장 리스트 제대로 됐는지 확인

        setCorpList(parsedCorpList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data from server:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMoreClick = async (wantedAuthNo) => {
    console.log('Clicked More Button. WantedAuthNo:', wantedAuthNo);
    // Recoil 상태 업데이트
    setRecoilSelectedJob((prev) => ({
      ...prev,
      selectedJob,
      cafe: cafeRange,
      hospital: hospitalRange,
      health: healthRange,
      park: parkRange,
      mart: martRange,
      fastFood: fastFoodRange,
      wantedAuthNo,
    }));
    // 현재 Recoil 상태 확인을 위한 콘솔 출력 부분
    console.log('Current Recoil State:', {
      selectedJob, cafe: cafeRange, hospital: hospitalRange, health: healthRange, park: parkRange, mart: martRange, fastFood: fastFoodRange, wantedAuthNo,
    });

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error(
          'Access token not available. Redirect to login page or handle error.'
        );
        return;
      }

      console.log('페이지 넘어가기');
    
      navigate('/job-post');
    } catch (error) {
      console.error('Error fetching chart data from server:', error);
    }
  };

  return (
    <div>
      <StyledImage
        src="/images/결과step.png"
        alt="라이프시설선택step"
      />
      <h2>추천 기업 목록</h2>
      {loading && (
        <>
          <StyledSpinner animation="border" role="status" size="big" />
        </>
      )}
      <ul>
        {corpList.map((corp, index) => (
          <CompanyListItem key={index}>
            <CompanyName>{corp.corpInfo.corpNm}</CompanyName>            
            <MoreButton onClick={() => handleMoreClick(corp.wantedAuthNo)}>
              More
            </MoreButton>
          </CompanyListItem>
        ))}
      </ul>
    </div>
  );
};

export default Result;