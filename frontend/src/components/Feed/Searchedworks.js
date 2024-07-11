import FeedNavbar from './Navbar.js';
import './Searchedworks.css';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import ImageDisplay from './ImageDisplay.js';
import axios from 'axios';

function FeaturedArt() {
  const [isImageEnlarged, setImageEnlarged] = useState(false);
  const [enlargedImageLink, setLink] = useState("");
  const [enlargedImagePostId, setPostId] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedArtworks(); // Fetch artworks when the component mounts
    const loginState = localStorage.getItem("isLoggedIn");

    if (loginState === "false") {
      console.log("inside", loginState);
      navigate("/");
    }
  }, []);

  const [activeTab, setActiveTab] = useState('featured');

  const toggleTab = (tab) => {
    setActiveTab(tab);
    if (tab === 'recommended') {
      navigate("/feed");
    }
  };

  // Function to fetch featured artworks
  const fetchFeaturedArtworks = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/featuredartworks');
      setArtworks(response.data); // Update state with fetched artworks
    } catch (error) {
      console.error('Error fetching featured artworks:', error);
      // Handle error
    }
  };

  const enlargeImage = (link, postId) => {
    setLink(link);
    setPostId(postId);
    setImageEnlarged(true);
  };

  const unlargeImage = () => {
    setImageEnlarged(false);
  };

  return (
    <div className="App">
      <FeedNavbar uname={localStorage.getItem("username")} />
      <br />
      <div className="gly-tabs">
        <button className={`gly-tab ${activeTab === 'recommended' ? 'active-tab' : ''}`} onClick={() => toggleTab('recommended')}>
          Recommended
        </button>
        <button className={`gly-tab ${activeTab === 'featured' ? 'active-tab' : ''}`} onClick={() => toggleTab('featured')}>
          FeaturedArts
        </button>
        <div className="pin-c">
          {artworks.map((artwork, index) => (
            <button key={index} className="pin-i" onClick={() => enlargeImage(artwork.url, artwork.id)}>
              <img height={300} src={artwork.url} alt={`Artwork ${index + 1}`} />
            </button>
          ))}
        </div>
        {isImageEnlarged && <ImageDisplay imagesrc={enlargedImageLink} postId={enlargedImagePostId} undopage={unlargeImage} />}
      </div>
    </div>
  );
}

export default FeaturedArt;
