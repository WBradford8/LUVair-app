import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../APImanager";
import "./PostFeed.css";

export const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [newComment, updateComment] = useState({comment:""});
  const [comments, setComments] = useState([]);
  const currentUser = parseInt(getCurrentUser());
  const deletePost = (id) => {
    fetch(`http://localhost:8088/posts/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetchPosts();
    });
  };
  const createComment = (event) => {
    const newComments = {
        userId: currentUser,
        postId: parseInt(event.target.id),
        comment: newComment.comment   
    }
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newComments)
    }


    return fetch(`http://localhost:8088/comments`, fetchOptions)
        .then(response => response.json())
        .then( 
            () => fetchComments() 
        )
}

  useEffect(() => {
    fetchPosts();
    fetchComments();
  }, []);
  const fetchPosts = () => {
    fetch(`http://localhost:8088/posts?&_expand=flight&_expand=user&_embed=comments`)
      .then((res) => res.json())
      .then((postArray) => {
        setPosts(postArray);
      })
  };
  const fetchComments = () => {
    fetch(`http://localhost:8088/comments?_expand=user&_sort=postId`)
    .then((res) => res.json())
    .then((commentArray) => {
      setComments(commentArray);
    })
  }

  return (
    <>
      <h1>LUVair Shared Flights</h1>
      <p>
        <em>
          "I think flying is kind of an emotional experience." - Herb Kelleher
        </em>
      </p>
      {posts
        .slice()
        .reverse()
        .map((postObject) => {
          const postDate = new Date(postObject.postTime);
          const newDate = postDate.toDateString();
          const newTime = postDate.toTimeString();

          return (
            <div className="postedFlight">
              <div className="postedFlightChildren">
              <h2>
                {postObject.user.name} flew on Flight{" "}
                {postObject.flight?.flightNumber}
              </h2>
              </div>
              <h3>
                From {postObject.flight?.departureCity} to{" "}
                {postObject.flight?.arrivalCity}
              </h3>
              <img src={postObject.user.userImg} />
              <h4>
                Flew on {postObject.flight?.flightDate}, for a total of{" "}
                {postObject.flight?.airHours} hours in the air.
              </h4>{" "}
              <p><b>Poster's thoughts:</b> {postObject.summary}</p>
              <p>
                Posted on {newDate} @ {newTime}
              </p>
              <div className="commentSection">
               {comments.map((commentObject) => {
                 if (commentObject.postId === postObject.id)
                 {return <p>{`Posted by ${commentObject.user.name} ${commentObject.comment}`}</p>}
               })}
              </div>
              <textarea
                onChange={(evt) => {
                  const copy = { ...newComment };
                  copy.comment = evt.target.value;
                  updateComment(copy);
                }}
                placeholder={`Comment on ${postObject.user.name}'s post`}
                value={newComment.comment}
              >
                
              </textarea>
              <button id={postObject.id}
                onClick={(event) => {
                  createComment(event)
                    .then(() => {fetchComments()})
                    .then(() => {updateComment({comment:""})})
                }}
                >Post Comment</button>
              {currentUser === postObject.userId ? (
                <div>
                <button
                  onClick={() => {
                    deletePost(postObject.id);
                  }}
                >
                  Delete
                </button>
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
    </>
  );
};
