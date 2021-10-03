import React, { useState, useEffect } from "react"

export const TotalHoursForm = ({userHours}) => {
    
    
    const [flights, setFlights] = useState([])
    const [setFlight, updateFlight] = useState(null);
    const [summary, setSummary] = useState("")
    // const [currentState, updateState] = useState(defaultValue)
    const userId = parseInt(localStorage.getItem("luvair_user"))
    console.log(setFlight)
    const fetchFlights = () => {
        return fetch("http://localhost:8088/flights")
            .then(res => res.json())
            .then((flightArray) => {
                    setFlights(flightArray)
                 })
    }
    useEffect(() => {
       fetchFlights()
   
    }, [])

    
    const createPost = (event) => {
        const newPosts = {
            postTime: Date.now(),
            userId: userId,
            flightId: setFlight,
            summary: summary   
        }
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPosts)
        }
    
    
        return fetch(`http://localhost:8088/posts`, fetchOptions)
            .then(response => response.json())
            .then( 
                () => userHours() 
            )
    }

   
    

    return (
        
        <div>
            <select 
            
                onChange={
                        (evt) => {
                        
                      
                      updateFlight(parseInt(evt.target.value));
                            }}>
                
                 <option value = "0"> Please select a Flight Number</option>
                {flights?.map((flight) => {
                    return <option value={flight.id}> {flight.flightNumber} </option>
                })}
            </select>
            <form
               onChange={
                (evt) => {
                
              
              setSummary(evt.target.value);
                    }} 
                >
                <input type="text" id="summary" size="90" placeholder="Thoughts and comments on the flight... i.e. introspective thoughts or 'the first officer was a smoke show'"/> 
            </form>
            <button
                onClick={
                    (evt) => createPost(evt)
                }>
                SUBMIT
            </button>
        </div>
    )
}
