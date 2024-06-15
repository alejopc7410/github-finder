import {Routes, Route} from 'react-router-dom'
import Search from './components/Search';
import { useState } from 'react';
import User from './components/User';

function App() {
  const [inputValue, setInputValue] = useState('')
  const [githubProfile, setGithubProfile] = useState(null)
  const [githubRepos, setGithubRepos] = useState(null)
  const getInputValue = (inputVal) => { setInputValue(inputVal) }
  const getGithubProfileFunc = (response) => {setGithubProfile(response)}
  const getGithubReposFunc = (response) => {setGithubRepos(response)}

  return (
    <main>
      <Routes>
        <Route exact path='/' element={
        <Search 
          getInputValue={getInputValue} 
          getGithubProfile={getGithubProfileFunc}
          getGithubRepos={getGithubReposFunc}
        />}/>
        <Route exact path='/user' element={
        <User 
          userName={inputValue} 
          githubProfile={githubProfile}
          githubRepos={githubRepos}
        />}/>
      </Routes> 
    </main>
  );
}

export default App;
