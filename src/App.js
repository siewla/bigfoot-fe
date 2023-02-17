import React, { useEffect, useState } from "react"
import SightingCard from "./components/SightingCard"
import { get, BACKEND_URL } from "./utils"
import styled from "@emotion/styled"


const StyledDiv = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-around;
`

const App = () => {
  const [sightings, setSightings] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const data = await get(BACKEND_URL + "sightings")
      setSightings(data)
    };
    fetchData()
  }, [])

  return (
    <div>
      <h1>Sightings</h1>
      <StyledDiv>
        {sightings.length ? (
          sightings.map((sighting) => {
            return (
              <SightingCard
                key={sighting.id}
                id={sighting.id}
                date={sighting.date}
                notes={sighting.notes}
                location={sighting.location}
                createdAt={sighting.createdAt}
                updatedAt={sighting.updatedAt}
              />
            )
          })
        ) : (
          <p>No sightings yet!</p>
        )}
      </StyledDiv>
    </div>
  );
};

export default App;
