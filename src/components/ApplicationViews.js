import React from "react"
import { Route } from "react-router-dom"
import { UserProfile } from "./users/UserProfile"
import { TotalHoursForm } from "./users/TotalHoursForm"



export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/userProfile">
               <UserProfile />
               <TotalHoursForm /> 
            </Route>
            <Route path="/Posts">
                
            </Route>
        </>
    )
}
