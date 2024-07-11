import './Cards.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ImageDisplay from './ImageDisplay';

function Cards() {
    const [isImageEnlarged, setImageEnlarged] = useState(false);
    const [enlargedImageLink, setEnlargedImageLink] = useState('');
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:5000/art', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setArtworks(response.data);
            } catch (error) {
                console.error('Error fetching artworks:', error);
            }
        };
        
        fetchArtworks();
    }, []);

    const enlargeImage = ({ id, url }) => {
        setEnlargedImageLink(url);
        setSelectedArtwork(id);
        setImageEnlarged(true);
    };
    
    const unlargeImage = () => {
        setImageEnlarged(false);
    };

    return (
        <div>
            <div className="pin-container">
                {artworks.map((artwork, index) => (
                    <div key={index} className="pin-image" onClick={() => enlargeImage({ id: artwork.art_workid, url: artwork.image_url })}>
                        <img height={300} src={artwork.image_url} alt={artwork.image_name} />
                    </div>
                ))}
            </div>
            {isImageEnlarged && (
                <ImageDisplay 
                    imagesrc={enlargedImageLink} 
                    undopage={unlargeImage} 
                    id={selectedArtwork} 
                    postId={selectedArtwork} 
                />
            )}
        </div>
    );
}

export default Cards;
