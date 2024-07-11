import './ImageDisplay.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function ImageDisplay(props) {
    const [likesCount, setLikesCount] = useState(0);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);
    const [isLiked, setLiked] = useState(false);
    const [onComment, setOnComment] = useState(false);

    useEffect(() => {
        fetchLikes();
        fetchComments();
    }, []);

    const fetchLikes = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/like?id=${props.id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.status === 200) {
                setLikesCount(response.data.size);
                setLiked(response.data.isLiked);
            }
        } catch (error) {
            console.error("Error fetching likes:", error);
        }
    };

    const likePost = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:5000/like?id=${props.id}&u_id=${localStorage.getItem("u_id")}`, {}, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.status === 200) {
                setLiked(true);
                setLikesCount(likesCount + 1);
            }
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    const unlikePost = async () => {
        try {
            const response = await axios.delete(`http://127.0.0.1:5000/like?id=${props.id}&u_id=${localStorage.getItem("u_id")}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.status === 200) {
                setLiked(false);
                setLikesCount(likesCount - 1);
            }
        } catch (error) {
            console.error("Error unliking post:", error);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/comments?id=${props.id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.status === 200) {
                // Ensure comments is an array
                setComments(Array.isArray(response.data.comments) ? response.data.comments : []);
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const addComment = async () => {
        try {
            // Log the commentText value before making the request
            console.log("Comment Text:", commentText);
    
            const response = await axios.post(`http://127.0.0.1:5000/comments?id=${props.id}&u_id=${localStorage.getItem("u_id")}`, {
                comment_text: commentText
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.status === 200) {
                fetchComments();
                setCommentText('');
            }
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };
    

    const toggleComment = () => {
        setOnComment(!onComment);
    };

    const toggleLike = () => {
        if (isLiked) {
            unlikePost();
        } else {
            likePost();
        }
    };

    const closeImageDisplay = () => {
        props.undopage(); // Call the undopage function to close the modal
    };

    return (
        <div className="imagebox">
            <span className="close" title="Close Modal" onClick={closeImageDisplay} >&times;</span>
            <img height={300} src={props.imagesrc} alt="Image" />
            <br />
            <div className="btn-menu">
                <button className="image-btn" onClick={toggleLike}>
                    <i className="fa fa-thumbs-up"></i> &nbsp;
                    <span>{isLiked ? "Liked" : "Like"}</span>
                </button>
                <span>{likesCount} Likes</span>
                <button className="image-btn" onClick={toggleComment}>
                    <i className="fa fa-comment"></i> &nbsp;
                    <span>Comment</span>
                </button>
                {/* <button className="image-btn">
                    <i className="fa fa-download"></i> &nbsp;
                    <span>Download</span>
                </button> */}
            </div>
            {onComment && (
                <div>
                    <input
                        id="comment"
                        className="comment-input"
                        type="text"
                        placeholder="Add a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button className="comment-btn" onClick={addComment}>Add</button>
                </div>
            )}
            <div className="comments-section">
                {comments.map((comment, index) => (
                    <div key={index} className="comment">
                        <p><strong>User ID:</strong> {comment.user_id}</p>
                        <p><strong>Comment Date:</strong> {comment.comment_date}</p>
                        <p><strong>Comment:</strong> {comment.comment_text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImageDisplay;
