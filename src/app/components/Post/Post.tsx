"use client";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  IconButton,
  IconButtonProps,
  List,
  ListItem,
  styled,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";

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

  const handleComment = () => {
    fetchComments()
    setExpanded(!expanded);
  }

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <Card sx={{ maxWidth: 600, minWidth: 600 }} className="rounded-3xl">
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
          <Badge badgeContent={2} color="secondary">
          <FavoriteIcon />
          </Badge>
        </IconButton>
        <IconButton onClick={handleComment}>
            {
              commentList.length > 0 ? (
              <Badge badgeContent={" "} color="primary" variant="dot">
                  <CommentIcon />
              </Badge>
              ) : 
              <CommentIcon />
            }
          </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List
          sx={{ width: "100%", bgcolor: "background.paper" }}
          className="p-0"
        >
          <CommentForm
            userId={userId}
            postId={postId}
            fetchComments={fetchComments}
          />
          {commentList.map((comment) => (
            <Comment username={username} key={comment?.id} comment={comment} />
          ))}
        </List>
      </Collapse>
    </Card>
  );
};

export default Post;
