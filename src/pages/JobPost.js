import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { noState } from './atom';
import Chart from 'chart.js/auto';
import Spinner from 'react-bootstrap/Spinner';
import styled from 'styled-components';

const Container = styled.div`
width: 100%;
`;

const CompanyInfoContainer = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;
`;

const ChartContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 200px;
  text-align: center;
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: space-between;
  > div {
    margin-right: 300px; 
  }
`;

const ChartTitle = styled.h2`
  font-size: 30px;
  margin-bottom: 10px;
  white-space: nowrap;
`;

const StyledSpinner = styled(Spinner)`
  color: #3498db;
  margin-right: 5px;
  margin-top: 20px;
`;

const Button = styled.button`
  margin-left: 8px;
`;

const Separator = styled.hr`
  margin: 20px 0;
  border: 0;
  border-top: 3px solid #ccc;
`;

const GptResult = styled.p`
  font-size: 17px;
  width: 1230px;
  margin-bottom: 50px;
  margin-top: 50px;
`;

const JobPost = () => {
  const recoilState = useRecoilValue(noState);
  const { selectedJob, cafe, hospital, health, park, mart, fastFood, wantedAuthNo } = recoilState;

  const [jobDetails, setJobDetails] = useState({});
  const [chartData, setChartData] = useState(null);
  const [radarData, setRadarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);
  const radarRef = useRef(null);
  const [gptText, setGptText] = useState(""); // React 상태 추가

  const fetchData = async () => {
    try {
      if (!wantedAuthNo) {
        console.error('Invalid wantedAuthNo:', wantedAuthNo);
        return;
      }
      const token = localStorage.getItem('accessToken');

      // Fetch Job Details
      const jobDetailsResponse = await axios.get(`http://localhost:8080/job-post/${wantedAuthNo}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Job Post Response:', jobDetailsResponse.data);

      const jobDetailsData = jobDetailsResponse.data?.data || {};
      setJobDetails(jobDetailsData);

      // Fetch Chart Data
      const chartRequestBody = {
        wantedAuthNo: wantedAuthNo,
        isRadar: false,
        isPie: true,
        job: selectedJob,
        cafe,
        hospital,
        health,
        park,
        mart,
        fastFood,
      };
      const chartResponse = await axios.post('http://localhost:8080/job-post/chart', chartRequestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Chart Data Response:', chartResponse.data);

      const chartData = chartResponse.data;
      setChartData(chartData);

      // Fetch Radar Data
      const radarRequestBody = {
        wantedAuthNo: wantedAuthNo,
        isRadar: true,
        isPie: false,
        job: selectedJob,
        cafe,
        hospital,
        health,
        park,
        mart,
        fastFood,
      };
      const radarResponse = await axios.post('http://localhost:8080/job-post/chart', radarRequestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Radar Data Response:', radarResponse.data);

      const radarChartData = radarResponse.data;
      setRadarData(radarChartData);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching job details or chart data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [wantedAuthNo]);

  useEffect(() => {
    const createCharts = async () => {
      try {
        // Chart 생성 코드
        if (chartData) {
          const ctx = document.getElementById('pieChart');
          // 이전 차트가 있으면 파괴
          if (chartRef.current) {
            chartRef.current.destroy();
          }
          chartRef.current = new Chart(ctx, {
            type: 'pie',
            data: {
              labels: chartData.data.names,
              datasets: [{
                data: chartData.data.pie,
                backgroundColor: ['red', 'blue', 'green', 'orange', 'purple', 'pink'],
              }],
            },
          });
        }

        // Radar 차트 생성 코드
        if (radarData) {
          const radarCtx = document.getElementById('radarChart');
          // 이전 차트가 있으면 파괴
          if (radarRef.current) {
            radarRef.current.destroy();
          }
          radarRef.current = new Chart(radarCtx, {
            type: 'radar',
            data: {
              labels: radarData.data.names,
              datasets: [{
                label: '가장 가까운 도보시간(분)',
                data: radarData.data.min, // 최소값
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
              }, {
                label: '가장 먼 도보시간(분)',
                data: radarData.data.max, // 최대값
                backgroundColor: 'rgba(255,99,132,0.4)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
              }],
            },
          });
          setGptText(radarData.data.gpt);
        }
      } catch (error) {
        console.error('Error creating charts:', error);
      }
    };

    if (wantedAuthNo && chartData && radarData) {
      createCharts();
    }
  }, [wantedAuthNo, chartData, radarData]);

  const showLocationDetails = async (location) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post('http://localhost:8080/kakao-api/roadview', { address: location }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const roadviewUrl = response.data.data;
      window.open(roadviewUrl, '_blank');
    } catch (error) {
      console.error('Error fetching roadview address:', error);
      alert('로드뷰 주소를 가져오는 데 실패했습니다.');
    }
  };
  
  return (
    <div>
      <Container>
      <CompanyInfoContainer>
        <h2>{jobDetails.corpInfo?.corpNm || 'N/A'} 기업 정보</h2>
        <p>채용공고 제목: {jobDetails.wantedInfo?.wantedTitle || 'N/A'}</p>
        <p>회사규모: {jobDetails.corpInfo?.busiSize || 'N/A'}</p>
        <p>매출액: {jobDetails.corpInfo?.yrSalesAmt || 'N/A'}</p>
        <p>인원: {jobDetails.corpInfo?.totPsncnt || 'N/A'}</p>
        <p>근무시간: {jobDetails.workInfo?.workdayWorkhrCont || 'N/A'}</p>
        <p>4대보험: {jobDetails.workInfo?.fourIns.join(', ') || 'N/A'}</p>
        <p>회사 위치: {jobDetails.selMthdInfo?.workRegion || 'N/A'}
        <Button onClick={() => showLocationDetails(jobDetails.selMthdInfo?.workRegion)}>
        로드뷰 보기</Button></p>
        <p>전화번호: {jobDetails.empChargerInfo?.contactTelno || 'N/A'}</p>
      </CompanyInfoContainer>
      <Separator />
      <ChartTitle>AI의 라이프 밸런스 평가</ChartTitle>
      <GptResult>{gptText}</GptResult>

      <ChartContainer>
        <div>
          <ChartTitle>라이프 밸런스 점수 비율 차트</ChartTitle>
          {loading && (
            <StyledSpinner animation="border" role="status" size="big" />
          )}
          {chartData && (
            <canvas id="pieChart"></canvas>
          )}
        </div>
        <div>
          <ChartTitle>도보 시간 레이더 차트</ChartTitle>
          {loading && (
            <StyledSpinner animation="border" role="status" size="big" />
          )}
          {radarData && (
            <canvas id="radarChart"></canvas>
          )}
        </div>
      </ChartContainer>
      </Container>
    </div>
  );
};

export default JobPost;