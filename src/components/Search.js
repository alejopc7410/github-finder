import { IoLogoGithub } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { GoAlertFill } from "react-icons/go";
import { useState, useEffect } from "react";
import axios from 'axios'

function Search({getInputValue, getGithubProfile, getGithubRepos}) {
    const [inputValue, setInputValue] = useState('')
    const [isInfoLoaded, setIsInfoLoaded] = useState(null)
    const token = process.env.REACT_APP_GITHUB_TOKEN
    const navigate = useNavigate();
    const options = {headers: {'Authorization': `Bearer ${token}`}}
    const myUrl= `https://api.github.com/users/${inputValue}`


    const handleClick = () => {           
        getInputValue(inputValue)  
        searchProfile()
        searchRepos()
        console.log("API Key: ", token);
    };
    
    useEffect(() => {
        if (isInfoLoaded) { navigate('/user'); }
    }, [isInfoLoaded, navigate])

    const searchProfile = () => {        
        axios.get(myUrl, options)
        .then(response => { 
            getGithubProfile(response.data)
            localStorage.setItem("githubProfile", JSON.stringify(response.data))
            setIsInfoLoaded(true)
        }) 
        .catch(error => {
            setIsInfoLoaded(false)
            console.log("There was a problem")
        })
        
    }
    
    const searchRepos = () => {
        axios.get(`${myUrl}/repos`, options)
        .then(response => {
            getGithubRepos(response.data)
            localStorage.setItem("githubRepos", JSON.stringify(response.data))
        }) 
        .catch(error => {
            console.log("There was a problem")
        })
    }

    return (
        <section className="search-github-profile">
            <div className="frame">
                <div className="logo-frame">
                    <IoLogoGithub className="github-icon"/>
                </div>
            </div>
            <div className="user-input">
                <input
                    type="text"
                    placeholder="Github Username"
                    onChange={event => {setInputValue(event.target.value.trim())}}
                    style={{borderColor: isInfoLoaded !== null && !isInfoLoaded ? "#F85149" : "#FFF"}}
                />
                <button onClick={handleClick}>SEARCH</button>
            </div>            
            <div 
                className="error-alert" 
                style={{visibility: isInfoLoaded !== null && !isInfoLoaded ? "visible" : "hidden"}}
            > 
                <GoAlertFill className="alert-icon"/>
                <p>Github profile not found. Check and try again</p>                
            </div>            
        </section>
    )
}

export default Search