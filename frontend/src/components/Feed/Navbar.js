import logo from './../../assets/images/logo.png';
import "./navbar.css"
import { Navigate, useNavigate } from "react-router";
import { useState, useEffect } from 'react';
import axios from "axios";

function FeedNavbar(props){
    const navigate = useNavigate();

    const authenticate = async () => {
        navigate("/profile");
    }

    const Authenticate2 = ()=>{
        // query==(searchQuery);
        localStorage.setItem('searchQuery', searchQuery);
        navigate('/search');
    }

    // function fetchArtworks(keyword) {
    //     return axios.get('http://127.0.0.1:5000/search', {
    //         params: {
    //             key: keyword // Pass the search query as a parameter
    //         }
    //     })
    //     .then(response => {
    //         return response.data; 
    //     })
    //     .catch(error => {
    //         console.error('Error fetching artworks:', error);
    //         throw error; 
    //     });
    // }

    const [searchQuery, setSearchQuery] = useState('');
    const [artworks, setArtworks] = useState([]);

    // const handleSearch = async () => {
    //     try {
    //         const fetchedArtworks = await fetchArtworks(searchQuery);
    //         console.log('Fetched artworks:', fetchedArtworks);
    //         setArtworks(fetchedArtworks);
    //     } catch (error) {
    //         console.error('Error fetching artworks:', error);
    //         // Handle error, if needed
    //     }
    // };

    useEffect(() => {
        // handleSearch();
    }, [searchQuery]); // Fetch artworks when the search query changes

    return(
        <header className="app-header">

            <div className='logo-container'>
                <img src={logo} className='navbar-logo'/>
                <span> Online Art Gallery </span>
            </div>
           
            <div className='topbar'>
                {/* <input 
                    type="text" 
                    placeholder="Search.." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSearch();
                        }
                    }} 
                /> */}

                    <form onSubmit={Authenticate2} style={{"border":"none"}}>
                        <input  type="text" placeholder="Search.."  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    </form>
            </div>
            <div className='topbar'  >
                <button className='username' onClick={authenticate}>
                    {localStorage.getItem("username")}
                </button>
            </div>

            <div className="artwork-container">
                {artworks && artworks.map((artwork, index) => (
                    <div key={index} className="artwork">
                     {/* <img src={artwork.image_url} alt={`Artwork ${index}`} /> */}
                    </div>
                ))}
            </div>

        </header>
    );
}

export default FeedNavbar;
