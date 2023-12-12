import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const StepsContainer = styled.div`
   display: flex;
   width: 100%;
   align-items: center;
   justify-content: space-between;
   position: relative;
   margin-left: 110px;
   margin-top: 70px;
   margin-bottom: 15px;

   .circle {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      width: 50px;
      color: #fff;
      font-size: 22px;
      font-weight: 500;
      border-radius: 50%;
      background-color: #eee6c6;
      border: 4px solid #fff;
      transition: all 200ms ease;
      transition-delay: 0s;
   }

   .circle.active {
      transition-delay: 100ms;
      border-color: #8fa9f1;
      color: #8fa9f1;
   }

   .progress-bar .indicator {
      position: absolute;
      left: 0;
      height: 4px;
      width: 0%;
      background: #8fa9f1;
      transition: all 300ms ease;
      z-index: -1;
   }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);

   button {
      padding: 8px 25px;
      background: #8fa9f1;
      border: none;
      border-radius: 8px;
      color: #fff;
      font-size: 16px;
      font-weight: 400;
      cursor: pointer;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
      transition: all 200ms linear;
   }

   button:active {
      transform: scale(0.97);
   }

   button:disabled {
      background: #87a5f8;
      cursor: not-allowed;
   }
`;

const MultiStepProgress = () => {
   let [currentProgress, setCurrentProgress] = useState(1);
   const circle = useRef();
   const progressBar = useRef();
   const progressArr = [2, 3];

   const minusSteps = () => {
      let progressCount = Number(circle.current.childNodes[currentProgress - 2].textContent);
      progressBar.current.style = `width: ${(progressCount - 1) * 35}%`;
      setCurrentProgress((prev) => prev - 1);
      if (currentProgress === progressCount) {
         circle.current.childNodes[progressCount].classList.remove('active');
      }
   };

   const addSteps = () => {
      let progressCount = Number(circle.current.childNodes[currentProgress - 1].textContent);
      setCurrentProgress((prev) => prev + 1);
      progressBar.current.style = `width: ${progressCount * 35}%`;
      if (currentProgress === progressCount) {
         circle.current.childNodes[progressCount].classList.add('active');
      }
   };

   return (
      <div className="container">
         <StepsContainer ref={circle}>
            <span className="circle active">1</span>
            {progressArr.map((i) => (
               <span className="circle" key={i}>
                  {i}
               </span>
            ))}
            <div className="progress-bar">
               <span ref={progressBar} className="indicator"></span>
            </div>
         </StepsContainer>
         <h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 추천 직업 선택&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;라이프 시설 선호도&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;결과</h5>
         <ButtonsContainer>
            <button id="prev" disabled={currentProgress === 1} onClick={minusSteps}>
               Prev
            </button>
            <button id="next" disabled={currentProgress === 3} onClick={addSteps}>
               Next
            </button>
         </ButtonsContainer>
      </div>
   );
};

export default MultiStepProgress;