import React from "react"
import { Route } from "react-router-dom"
import { UserProfile } from "./users/UserProfile"



export const ApplicationViews = () => {
    return (
        <>
            <Route path="/userProfile">
               <UserProfile /> 
            </Route>
            <Route path="/Posts">
                
            </Route>
        </>
    )
}
