import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SightingCard from "./SightingCard";
import { get, BACKEND_URL, put, del, post } from "../utils";
import { DateTime } from "luxon";
import { Button } from "@mui/material";

const Sighting = () => {
  const [sighting, setSighting] = useState({});
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  const editComment = async (sightingId, commentId) => {
    await put(BACKEND_URL + `sightings/${sightingId}/comments/${commentId}`, {
      content: commentContent,
    });
    setIsEditing(false);
    setCommentContent("");
    await getComments();
  };

  const deleteComment = async (id) => {
    await del(BACKEND_URL + `sightings/${sighting.id}/comments/${id}`);
    await getComments();
  };

  const getComments = async () => {
    const data = await get(BACKEND_URL + `sightings/${id}/comments`);
    setComments(data);
  };

  useEffect(() => {
    const getSighting = async () => {
      const data = await get(BACKEND_URL + `sightings/${id}`);
      setSighting(data);
    };
    getSighting();
    getComments();
  }, [id]);

  return (
    <div>
      <div>
        <h2>Add Comment</h2>
        <input
          type="text"
          value={commentContent}
          onChange={(e) => {
            setCommentContent(e.target.value);
          }}
        />
        <Button
          onClick={async () => {
            await post(BACKEND_URL + `sightings/${id}/comments`, {
              content: commentContent,
            });
            setCommentContent("");
            await getComments();
          }}
        >
          Add Comment
        </Button>
      </div>
      <SightingCard
        id={sighting.id}
        date={sighting.date}
        notes={sighting.notes}
        location={sighting.location}
        createdAt={sighting.createdAt}
        updatedAt={sighting.updatedAt}
        notCard={true}
      />
      <h2>Comments</h2>
      {comments.length ? (
        comments.map((comment) => {
          return (
            <div key={comment.id}>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    value={comment.content}
                    onChange={(e) => {
                      const commentToUpdate = comments.findIndex((c) => c.id === comment.id);
                      comments[commentToUpdate].content = e.target.value;
                      setComments([...comments]);
                      setCommentContent(e.target.value);
                    }}
                  />
                  <Button
                    onClick={async () => {
                      await editComment(id, comment.id);
                    }}
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <p>{comment.content}</p>
              )}
              <Button onClick={() => setIsEditing(true)}>Edit</Button>
              <Button
                onClick={async () => {
                  await deleteComment(comment.id);
                }}
              >
                Delete
              </Button>
              <p>Created At: {DateTime.fromISO(comment.createdAt).toLocaleString()}</p>
              <p>Updated At: {DateTime.fromISO(comment.updatedAt).toLocaleString()}</p>
            </div>
          );
        })
      ) : (
        <p>No comments yet!</p>
      )}
    </div>
  );
};

export default Sighting;
