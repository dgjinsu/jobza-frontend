import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #007bff;
  border-radius: 5px;
  padding: 50px;
  max-width: 430px;
  margin: 0 auto;
  margin-top: 100px;
`;

const Input = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  background-color: #e5eefa;
  color: #000000;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const FileName = styled.div`
  margin-top: 10px;
  margin-bottom: 40px;
`;

const FileNotSelected = styled.div`
  color: lightgray;
  margin-bottom: 40px;
`;

const UploadButton = styled.button`
  background-color: #35619d;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const ResumeUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  // 파일 선택
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // 파일 업로드 및 페이지 이동
  const handleFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('resume', selectedFile);
      console.log(selectedFile);
      const token = localStorage.getItem('accessToken');
      axios
        .post('http://localhost:8080/resume', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log('파일 업로드 성공');
          // 파일 업로드 성공 시 페이지 이동
          window.location.href = "/resume-check";
        })
        .catch((error) => {
          console.error('파일 업로드 실패', error);
        });
    }
  };

  return (
    <UploadContainer>
      <Input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        id="fileInput"
      />
      <FileLabel htmlFor="fileInput">파일 선택</FileLabel>
      {selectedFile ? (
        <FileName>{selectedFile.name}</FileName>
      ) : (
        <FileNotSelected>파일이 선택되지 않았습니다</FileNotSelected>
      )}
      
      <UploadButton onClick={handleFileUpload}>이력서 업로드</UploadButton>
      

    </UploadContainer>
  );
};

export default ResumeUpload;