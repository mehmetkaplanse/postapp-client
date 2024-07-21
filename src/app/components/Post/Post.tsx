"use client";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  IconButtonProps,
  styled,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import React, { useEffect, useRef, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";

interface PostProps {
  title: string | null;
  text: string | null;
  userId: number;
  username: string;
  postId: number;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Post: React.FC<PostProps> = ({
  title,
  text,
  userId,
  username,
  postId,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [commentList, setCommentList] = useState<any[]>([]);
  const isInitialMount = useRef(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const fetchComments = () => {
    fetch("/api/comments?postId=" + postId)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result, "result");

          setCommentList(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else fetchComments();
  }, [expanded, commentList]);

  return (
    <Card sx={{ maxWidth: 600, minWidth: 600 }}>
      <CardHeader
        avatar={
          <Link href={{ pathname: "/users/" + userId }}>
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {username.charAt(0).toUpperCase()}
            </Avatar>
          </Link>
        }
        title={title}
        subheader="September 14, 2024"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" fontSize={15}>
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={handleLike}
          className={`${liked && "text-red-500"}`}
        >
          <FavoriteIcon />
        </IconButton>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <IconButton onClick={fetchComments}>
            <CommentIcon />
          </IconButton>
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
          {
            commentList.map((comment) => (
              //<Comment />
            ))
          }
      </Collapse>
    </Card>
  );
};

export default Post;
