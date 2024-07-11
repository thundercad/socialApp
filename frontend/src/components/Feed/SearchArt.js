import './SearchArt.css';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import axios from 'axios';
import ImageDisplay from './ImageDisplay.js';

function SearchArt() {  
    const [isImageEnlarged, setImageEnlarged] = useState(false);
    const [enlargedImageLink, setLink] = useState("");
    const [enlargedImagePostId, setPostId] = useState(null);
    const [artworks, setArtworks] = useState([]);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loginState = localStorage.getItem("isLoggedIn");

        if(loginState === "false") {
            console.log("inside",loginState);
            navigate("/");
        }

        const storedSearchQuery = localStorage.getItem('searchQuery');
        console.log(storedSearchQuery)
        setQuery(storedSearchQuery);
        handleSearch();
    }, [navigate]);

    function fetchArtworks(token) {
        const url = 'http://127.0.0.1:5000/search';
        const searchQuery = localStorage.getItem('searchQuery');
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        return axios.get(url, {
            params: {
                key: searchQuery
            },
            headers: headers
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching artworks:', error);
            throw error;
        });
    }

    const handleSearch = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            const artworks = await fetchArtworks(token);
            console.log('Fetched artworks:', artworks);
            setArtworks(artworks); 
        } catch (error) {
            console.error('Error fetching artworks:', error);
        }
    };

    const enlargeImage = (link, postId) => {
        setLink(link);
        setPostId(postId);
        setImageEnlarged(true);
    }

    const unlargeImage = () => {
        setImageEnlarged(false);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user_id = localStorage.getItem("u_id");
        const topic = 'Sample Topic';
        const content = query;

        try {
            const requestBody = { user_id, topic, content };
            await axios.post('http://127.0.0.1:5000/forum', requestBody);
            await handleSearch();
            console.log('Message added successfully');
        } catch (error) {
            console.error('Error adding message:', error);
        }
    };

    return (
        <div className="App">
            <br></br>
            <div className='up-promt'>
                <h2>Searched results for {query}</h2>
            </div>
            <br></br>
            <div className="pc">
                {artworks.map((artwork, index) => (
                    <button key={index} className="pin-i" onClick={() => enlargeImage(artwork.image_url, artwork.id)}>
                        <img height={300} src={artwork.image_url} alt={`Artwork ${index + 1}`} />
                    </button>
                ))}
            </div>
            {isImageEnlarged && <ImageDisplay imagesrc={enlargedImageLink}  postId={enlargedImagePostId} undopage={unlargeImage}/>}
            <form className='msg-input' onSubmit={handleSubmit}>
                <button type='button' style={{ border: "none", background: "black", fontSize: "30px" }} onClick={handleSubmit}>
                    <i className="fa fa-paper-plane" style={{ fontSize: "100%", color: "white" }} aria-hidden="true"></i>
                </button>
            </form>
        </div>
    );
}

export default SearchArt;
