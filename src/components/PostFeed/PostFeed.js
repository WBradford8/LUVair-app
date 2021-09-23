import React, { useEffect, useState } from "react"
import "./PostFeed.css"

export const PostFeed = () => {
    const [posts, setPosts] = useState([])
    
    useEffect(
        () => {
            fetch(`http://localhost:8088/posts?&_expand=flight&_expand=user`)
                .then(res => res.json())
                .then((postArray) => {
                  setPosts(postArray)  
                 })
        },
        []
    )

    return (
        <>
        <h1>LUVair Shared Flights</h1>
        <p><em>"I think flying is kind of an emotional experience." - Herb Kelleher</em></p>
        {
            posts.slice().reverse().map(
                (postObject) => {
                    const postDate = new Date(postObject.postTime);
                    const newDate = postDate.toDateString();
                    const newTime = postDate.toTimeString();

                    return <div className="postedFlight"><h2>{postObject.user.name} flew on Flight {postObject.flight?.flightNumber}</h2>
                    <h3>From {postObject.flight?.departureCity} to {postObject.flight?.arrivalCity}</h3>
                    <img src={postObject.user.userImg} />
                    <h4>On {postObject.flight?.flightDate}, for a total of {postObject.flight?.airHours} hours in the air.</h4> <p>Posted on {newDate} @ {newTime}</p>
                    </div>
                }
            )
        }
        </>
    )
}

