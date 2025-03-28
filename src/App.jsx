import React, { useState } from 'react';
import './index.css'
function App() {
    // Your original state and logic (unchanged)
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState(false);
    const [input, setinput] = useState("");
    const [userdata, setuserdata] = useState(null);

    function btn() {
        console.log(input);    
        fetchdata();
    }

    async function fetchdata() {
        try {
            const data = await fetch(`https://api.github.com/users/${input}`);
            const response = await data.json();
            console.log(response);    
            setuserdata(response);
            setloading(false);
        } catch (error) {
            console.log(error);
            seterror(true);
        } finally {
            console.log("finally chal raha hay");
        }
    }

    return (
        <div className="cyberpunk-container">
            {/* **Glowing Header** */}
            <div className="cyberpunk-header">
                <h1 className="cyberpunk-title">
                    <span className="cyberpunk-glitch">GITHUB</span>
                    <span className="cyberpunk-neon">_HACKER</span>
                </h1>
                <p className="cyberpunk-subtitle">// ENTER TARGET USERNAME</p>
            </div>

            {/* **Terminal-Style Search Bar** */}
            <div className="cyberpunk-search">
                <div className="cyberpunk-input-group">
                  <span className="cyberpunk-prompt">$~</span>
                  <input onChange={(e) => setinput(e.target.value)}type="text"
                        placeholder="github_username"
                        className="cyberpunk-input"
                    />
                    <button onClick={btn} className="cyberpunk-button">
                        EXECUTE
                    </button>
                </div>
            </div>

            {/* **Loading Animation (Matrix-Style)** */}
            {loading && (
                <div className="cyberpunk-loading">
                    <div className="cyberpunk-matrix"></div>
                    <p>SCANNING DATABASE...</p>
                </div>
            )}

            {/* **Error State (Hacker Red Alert)** */}
            {error && (
                <div className="cyberpunk-error">
                    <h3>⛔ ACCESS DENIED</h3>
                    <p>TARGET NOT FOUND</p>
                </div>
            )}

            {/* **User Profile (Cyberpunk Card)** */}
            {userdata && (
                <div className="cyberpunk-profile">
                    <div className="cyberpunk-avatar-container">
                        <img 
                            src={userdata.avatar_url} 
                            alt="User Avatar" 
                            className="cyberpunk-avatar"
                        />
                        <div className="cyberpunk-avatar-glow"></div>
                    </div>
                    
                    <div className="cyberpunk-profile-info">
                        <h2 className="cyberpunk-username">{userdata.name || userdata.login}</h2>
                        <p className="cyberpunk-bio">"{userdata.bio || "NO BIO DATA"}"</p>
                        
                        <div className="cyberpunk-stats">
                            <div className="cyberpunk-stat">
                                <span className="cyberpunk-stat-value">{userdata.public_repos}</span>
                                <span className="cyberpunk-stat-label">REPOS</span>
                            </div>
                            <div className="cyberpunk-stat">
                                <span className="cyberpunk-stat-value">{userdata.followers}</span>
                                <span className="cyberpunk-stat-label">FOLLOWERS</span>
                            </div>
                            <div className="cyberpunk-stat">
                                <span className="cyberpunk-stat-value">{userdata.following}</span>
                                <span className="cyberpunk-stat-label">FOLLOWING</span>
                            </div>
                        </div>
                        
                        <a 
                            href={userdata.html_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="cyberpunk-link"
                        >
                            ↗ ACCESS FULL PROFILE
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;