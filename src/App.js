import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/LoginPage';
import Header from './components/Header';
import OauthRedirectedPage from './pages/OauthRedirectedPage';
import JobPostings from './pages/JobPostings';
import SkillUpload from './pages/SkillUpload'; 
import ResumeCheck from './pages/ResumeCheck'; 
import ApplicationStatus from './pages/ApplicationStatus'; 
import NextCareerSearch from './pages/NextCareerSearch'; 
import CompanySearch from './pages/CompanySearch'; 
import SalaryByJob from './pages/SalaryByJob'; 

import MyPage from './pages/MyPage';
import ResumeUpload from './pages/ResumeUpload';
import LifeFacilities from './pages/LifeFacilities';
import Result from './pages/Result';
import JobPost from './pages/JobPost';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/auth" element={<OauthRedirectedPage />} />
        <Route path="/job-postings" element={<JobPostings />} />
        <Route path="/skill-upload" element={<SkillUpload />} /> 
        <Route path="/resume-check" element={<ResumeCheck />} /> 
        <Route path="/application-status" element={<ApplicationStatus />} /> 
        <Route path="/next-career-search" element={<NextCareerSearch />} /> 
        <Route path="/company-search" element={<CompanySearch />} /> 
        <Route path="/salary-by-job" element={<SalaryByJob />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/resume-upload" element={<ResumeUpload />} />
        <Route path="/life-facilities" element={<LifeFacilities />} />
        <Route path="/life-facilities/:selectedJob" element={<LifeFacilities />} />
        <Route path="/result" element={<Result />} />
        <Route path="/result/:selectedJob" element={<Result />} />
        {/*<Route path="/company-details/:corpNm" element={<CompanyDetails />} />*/}
        <Route path="/job-post" element={<JobPost />} />

      </Routes>
    </Router>
  );
}

export default App;
