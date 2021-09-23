import React from "react"
import { Route } from "react-router-dom"
import { UserProfile } from "./users/UserProfile"
import { PostFeed } from "./PostFeed/PostFeed"



export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
               <PostFeed /> 
            </Route>
            <Route exact path="/userProfile">
               <UserProfile />
            </Route>
            <Route path="/Posts">
               <PostFeed /> 
            </Route>
        </>
    )
}
