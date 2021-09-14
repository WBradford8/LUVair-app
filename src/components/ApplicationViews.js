import React from "react"
import { Route } from "react-router-dom"
import { LUVair } from "./luvair"


export const ApplicationViews = () => {
    return (
        <>
            <Route path="/users">
                <LUVair />
            </Route>
        </>
    )
}
