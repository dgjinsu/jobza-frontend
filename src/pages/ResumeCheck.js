import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RecommendationContainer = styled.div`
  border: 2px solid #3498db;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  max-width: 1000px;
  display: flex;
  justify-content: center;
`;

const RadioList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const RadioItem = styled.li`
  margin-right: 20px;
  margin-bottom: 20px;
`;

const SelectedJobContainer = styled.div`
  margin-top: 20px;
  border: 2px solid #3498db;
  padding: 10px;
  border-radius: 5px;
`;

const StyledImage = styled.img`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 100px;
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

const ResumeCheck = () => {
  const [jobRecommendations, setJobRecommendations] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();


  const handleNextClick = () => {
    // NEXT 버튼 클릭하면 life-facilities 페이지로 이동
    navigate(`/life-facilities/${selectedJob}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/recommend-job/resume', {
          headers: {
            Accept: '*/*',
            Authorization: `Bearer ${token}`,
          },
        });
  
        const sortedJobs = response.data.data.sort((a, b) => b.probability - a.probability);
        const top5Jobs = sortedJobs.slice(0, 5);
        setJobRecommendations(top5Jobs);
      } catch (error) {
        console.error('Error fetching job recommendations:', error);
      }
    };
  
    fetchData();
  }, [token]);
  
  const handleJobChange = job => {
    setSelectedJob(job);
  };

  return (
    <Container>
      <StyledImage
        src="/images/추천직업선택step.png"
        alt="추천직업선택step"
      />
      {jobRecommendations.length > 0 ? (
        <>
          <RecommendationContainer>
            <RadioList>
              {jobRecommendations.map((job, index) => (
                <RadioItem key={index}>
                  <input
                    type="radio"
                    id={`job-${index}`}
                    name="job"
                    value={job.job}
                    checked={selectedJob === job.job}
                    onChange={() => handleJobChange(job.job)}
                  />
                  <label htmlFor={`job-${index}`} style={{ fontWeight: index === 0 ? 'bold' : 'normal' }}>
                  {job.job}
                  </label>
                </RadioItem>
              ))}
            </RadioList>
          </RecommendationContainer>
        </>
      ) : (
        <Spinner animation="border" />
      )}
      {selectedJob && (
        <SelectedJobContainer>
          <p>선택된 직업: {selectedJob}</p>
        </SelectedJobContainer>
      )}
      <NextButton
        onClick={handleNextClick}>
        <span>NEXT</span>
      </NextButton>
    </Container>
  );
};

export default ResumeCheck;