import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledImage = styled.img`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 100px;
`;

const FacilityContainer = styled.div`
  width: 150px;
  height: 80px;
  border: 2px solid #3498db;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const FacilityName = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const RangeSliderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const RangeSlider = styled.input`
  width: calc(100% - 20px);
  margin: 0 10px;
`;

const RangeLabel = styled.span`
  font-size: 14px;
`;

const StyledSpinner = styled(Spinner)`
  color: #3498db; 
  margin-right: 5px;
  margin-top: 20px;
`;

const NextButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 100px;
  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

const InstructionText = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #666;
`;

const SelectedJobSection = styled.div`
  margin-top: 10px;
  padding: 10px 15px;
  border: 2px solid #ccc;
  border-radius: 5px;
`;

const SelectedJobText = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const LifeFacilities = () => {
  const navigate = useNavigate();
  const { selectedJob } = useParams();
  const [loading, setLoading] = useState(false);

  const [cafeRange, setCafeRange] = useState(0.5);
  const [hospitalRange, setHospitalRange] = useState(0.5);
  const [healthRange, setHealthRange] = useState(0.5);
  const [parkRange, setParkRange] = useState(0.5);
  const [martRange, setMartRange] = useState(0.5);
  const [fastFoodRange, setFastFoodRange] = useState(0.5);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        // 토큰이 없다면 로그인 페이지로 이동
        if (!token) {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, [navigate]);

  const handleNextClick = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem('accessToken');
      console.log('Token:', token); 
  
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
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      console.log('Server Response:', response.data);
      const corpNmArray = response.data?.data.map(item => item?.corpInfo?.corpNm);

    navigate(`/result/${selectedJob}?cafe=${cafeRange}&hospital=${hospitalRange}&health=${healthRange}&park=${parkRange}&mart=${martRange}&fastFood=${fastFoodRange}&corpNmArray=${encodeURIComponent(JSON.stringify(corpNmArray))}`);
  } catch (error) {
    console.error('Error sending data to server:', error);
  } finally {
    setLoading(false);
  }
};

  return (
    <Container>
      <StyledImage
        src="/images/라이프시설선호도step.png"
        alt="라이프시설선택step"
      />
      <SelectedJobSection>
        {selectedJob && (
          <SelectedJobText>선택된 직업: {selectedJob}</SelectedJobText>
        )}
      </SelectedJobSection>

      <InstructionText>
        아래의 6가지 라이프 시설을 개인 선호도에 맞춰 조절해주세요.
      </InstructionText>

      <FacilityContainer>
        <FacilityName>카페</FacilityName>
        <RangeSliderContainer>
          <RangeLabel>0</RangeLabel>
          <RangeSlider
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={cafeRange}
            onChange={(e) => setCafeRange(parseFloat(e.target.value))}
          />
          <RangeLabel>1</RangeLabel>
        </RangeSliderContainer>
        <p>선택된 값: {cafeRange}</p>
      </FacilityContainer>

      <FacilityContainer>
        <FacilityName>병원</FacilityName>
        <RangeSliderContainer>
          <RangeLabel>0</RangeLabel>
          <RangeSlider
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={hospitalRange}
            onChange={(e) => setHospitalRange(parseFloat(e.target.value))}
          />
          <RangeLabel>1</RangeLabel>
        </RangeSliderContainer>
        <p>선택된 값: {hospitalRange}</p>
      </FacilityContainer>

      <FacilityContainer>
        <FacilityName>헬스장</FacilityName>
        <RangeSliderContainer>
          <RangeLabel>0</RangeLabel>
          <RangeSlider
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={healthRange}
            onChange={(e) => setHealthRange(parseFloat(e.target.value))}
          />
          <RangeLabel>1</RangeLabel>
        </RangeSliderContainer>
        <p>선택된 값: {healthRange}</p>
      </FacilityContainer>

      <FacilityContainer>
        <FacilityName>공원</FacilityName>
        <RangeSliderContainer>
          <RangeLabel>0</RangeLabel>
          <RangeSlider
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={parkRange}
            onChange={(e) => setParkRange(parseFloat(e.target.value))}
          />
          <RangeLabel>1</RangeLabel>
        </RangeSliderContainer>
        <p>선택된 값: {parkRange}</p>
      </FacilityContainer>

      <FacilityContainer>
        <FacilityName>대형마트</FacilityName>
        <RangeSliderContainer>
          <RangeLabel>0</RangeLabel>
          <RangeSlider
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={martRange}
            onChange={(e) => setMartRange(parseFloat(e.target.value))}
          />
          <RangeLabel>1</RangeLabel>
        </RangeSliderContainer>
        <p>선택된 값: {martRange}</p>
      </FacilityContainer>
      
      <FacilityContainer>
        <FacilityName>페스트푸드점</FacilityName>
        <RangeSliderContainer>
          <RangeLabel>0</RangeLabel>
          <RangeSlider
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={fastFoodRange}
            onChange={(e) => setFastFoodRange(parseFloat(e.target.value))}
          />
          <RangeLabel>1</RangeLabel>
        </RangeSliderContainer>
        <p>선택된 값: {fastFoodRange}</p>
      </FacilityContainer>
      {loading && (
        <>
          <StyledSpinner animation="border" role="status" size="big" />
        </>
      )}
      <NextButton
        onClick={handleNextClick}
        disabled={loading}
      >
        <span>NEXT</span>
      </NextButton>
    </Container>
  );
};

export default LifeFacilities;