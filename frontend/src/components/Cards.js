import "./Cards.css"
// import axios from "axios";
import { useState, react } from "react";
function Cards() {

    // var[Images, setImages] = useState([]);

    // useEffect(()=>{
    //     axios.get()
    // },[])


    return(
        <body>
            {/* <div className="row"> */}
            <div className="pin-container">
                <div className="pin-image"> <img style={{'border':'none'}} height={300} src="https://images.unsplash.com/photo-1417325384643-aac51acc9e5d"/></div>
                
                <div className="pin-image">
                <img height={300} src={require("../assets/images/9a4428c4df1b2255a304ba75b1f8f438.jpg")} alt="My Image" />
                </div>



                <div className="pin-image"><img height={300} src={require("../assets/images/simpson.jpg")} alt="Simpson" /></div>

                <div className="pin-image"> <img height={300} src={require("../assets/images/vangough.jpg")} alt="nangough"/></div>
                <div className="pin-image"> <img height={300} src={require("../assets/images/davinci.jpg")} alt="nangough"/></div>
                <div className="pin-image"> <img height={300} src="https://images.unsplash.com/photo-1417325384643-aac51acc9e5d"/></div>
                <div className="pin-image"> <img height={300} src="https://images.unsplash.com/photo-1578645635737-6a88e706e0f1"/></div>
                <div className="pin-image"> <img height={300} src="https://images.unsplash.com/photo-1530076886461-ce58ea8abe24"/></div>

                <div className="pin-image"> <img height={300} src="https://images.unsplash.com/photo-1417325384643-aac51acc9e5d"/></div>
                <div className="pin-image"> <img height={300} src="https://images.unsplash.com/photo-1530076886461-ce58ea8abe24"/></div>
                <div className="pin-image"> <img height={300} src="https://images.unsplash.com/photo-1578645635737-6a88e706e0f1"/></div>
                <div className="pin-image"> <img height={300} src="https://images.unsplash.com/photo-1593696954577-ab3d39317b97"/></div>
                
                {/* <img src="https://images.unsplash.com/photo-1417325384643-aac51acc9e5d"/>
                <img src="https://images.unsplash.com/photo-1578645635737-6a88e706e0f1"/>
                <img src="https://images.unsplash.com/photo-1593696954577-ab3d39317b97"/>
                <img src="https://images.unsplash.com/photo-1530076886461-ce58ea8abe24"/> */}

            </div>
            {/* </div> */}
        </body>
    );
}
export default Cards;