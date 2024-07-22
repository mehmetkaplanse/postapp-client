import {
  Avatar,
  CardContent,
  ListItem,
  ListItemAvatar,
  ListItemText,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

interface CommentProps {
  comment: any;
  username: string;
}

const Comment: React.FC<CommentProps> = ({ comment,username }) => {
  return (
    <ListItem alignItems="flex-start" className="border-b">
      <ListItemAvatar>
        <Avatar alt="Kemy Sharp" />
      </ListItemAvatar>
      <ListItemText
      className="flex items-center"
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {username}
            </Typography>
            <div>
              — {comment.text}
            </div>
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

export default Comment;
