import React from "react"
import { Card, CardContent, CardActions, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { DateTime } from "luxon"

const SightingCard = ({ id, date, notes, location, createdAt, updatedAt, notCard=false }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/sighting/${id}`);
  };

  const navigateHome = () => {
    navigate(`/`);
  };

  return (
    <Card sx={{ maxWidth: notCard ? null : 300 }}>
      {!notCard ? (
        <CardActions>
          <Button size="small" onClick={handleClick}>
            Learn More about sighting {id}
          </Button>
        </CardActions>
      ) : (
        <Button size="small" onClick={navigateHome}>
          Go Back
        </Button>
      )}
      <CardContent>
        <h2>Date: {DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED)}</h2>
        <p>{notes}</p>
        <p>Location: {location}</p>
        <p>Created At: {DateTime.fromISO(createdAt).toLocaleString()}</p>
        <p>Updated At: {DateTime.fromISO(updatedAt).toLocaleString()}</p>
      </CardContent>
    </Card>
  );
};

export default SightingCard;
