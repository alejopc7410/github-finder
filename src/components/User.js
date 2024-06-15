import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

function User({userName, githubProfile, githubRepos}) {
    const [searchParams, setSearchParams] = useSearchParams()
    const initialQuery = searchParams.get('query') || ''
    const [query, setQuery] = useState(initialQuery)
    
    useEffect(() => {
        if (query !== initialQuery && userName !== '') {
            setSearchParams({profile: query || ""}, {replace: true})
            if (userName !== '') {
                localStorage.setItem("userName", userName)
            }
        }
    }, [setSearchParams, query, initialQuery, userName])
    
    useEffect(() => { setQuery(userName) }, [userName])

    let userProfile = githubProfile
    let userRepos = githubRepos

    if (userProfile === null && userRepos === null) {
        userProfile = JSON.parse(localStorage.getItem("githubProfile"))
        userRepos = JSON.parse(localStorage.getItem("githubRepos"))
    }

    return (
        <div className='github-profile-info container'>            
            {userProfile && userRepos && (
                <>
                    <section className='personal-info'>
                        <img src={userProfile.avatar_url} alt="Avatar" />
                        <h2>{userProfile.name}</h2>
                        <h3>{userProfile.login}</h3>
                        <section className='subscriptions'>
                            <span className='card'>
                                <span>{userProfile.followers}</span>
                                <p>Followers</p>
                            </span>
                            <span className='card'>
                                <span>{userProfile.following}</span>
                                <p>Following</p>
                            </span>
                        </section>
                        <button onClick={() => {window.location.href=userProfile.html_url}}>VISIT PROFILE</button>
                    </section>
                    <section className='repos-info'>
                        <h2>Repositories</h2>
                        <div className='repos-list'>
                            {userRepos.map((repo, index) => {
                                let repoDate = new Date(repo.updated_at).toDateString()                                
                                return (
                                    <div key={index} className='repo'>
                                        <p className='repoName'>{repo.name}</p> 
                                        <span className='repo-description'>{repo.description}</span>
                                        <span className='last-update-date'>{repoDate}</span>
                                        <button onClick={() => {window.location.href=repo.html_url}}>GO TO REPO</button>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}

export default User