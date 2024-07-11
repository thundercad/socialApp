import './ProfileCards.css';
import { useState, useEffect } from "react";
import ImageDisplay from "./ImageDisplay";

function ProfileCards() {
    const [isImageEnlarged, setImageEnlarged] = useState(false);
    const [enlargedImageLink, setEnlargedImageLink] = useState("");
    const [enlargedImagePostId, setEnlargedImagePostId] = useState(null);
    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        fetchUserArtworks();
    }, []);

    const enlargeImage = (link, postId) => {
        setEnlargedImageLink(link);
        setEnlargedImagePostId(postId);
        setImageEnlarged(true);
    };

    const unlargeImage = () => {
        setImageEnlarged(false);
    };

    async function fetchUserArtworks() {
        try {
            const response = await fetch(`http://127.0.0.1:5000/art?id=${localStorage.getItem("u_id")}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                console.log("Fetched artworks:", data);
                if (Array.isArray(data)) {
                    setArtworks(data); // Assuming data is an array of artworks
                } else {
                    console.error("Data received is not an array:", data);
                }
            } else {
                console.error("Error fetching user artworks:", data.message);
            }
        } catch (error) {
            console.error("Error fetching user artworks:", error);
        }
    }

    return (
        <div className="pin-cntr">
            {Array.isArray(artworks) && artworks.map((artwork, index) => (
                <button key={index} className="pin-img" onClick={() => enlargeImage(artwork.image_url, artwork.id)}>
                    <img height={300} src={artwork.image_url} alt={`Artwork ${index + 1}`} />
                </button>
            ))}
            {isImageEnlarged && <ImageDisplay imagesrc={enlargedImageLink} postId={enlargedImagePostId} undopage={unlargeImage} />}
        </div>
    );
}

export default ProfileCards;
