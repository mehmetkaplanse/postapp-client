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
  InputAdornment,
  OutlinedInput,
  styled,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

interface PostFormProps {
  title: string | null;
  text: string | null;
  userId: number;
  username: string;
  fetchPosts: () => void;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface IFormInput {
  title: string;
  text: string;
  userId: number;
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

const PostForm: React.FC<PostFormProps> = ({
  userId,
  username,
  fetchPosts
}) => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    data.userId = userId;
    try {
      const response = await axios.post("/api/posts", data);
      if (response.status === 200) {
        toast.success('Post sent successfully.');
        fetchPosts();
      } else {
        toast.error('Failed to send post.');
      }
    } catch (error) {
      toast.error('An error occurred while sending the post.');
    }
  };

  return (
    <Card sx={{ minWidth: 600 }} className="border border-blue-500 shadow-xl">
      <div className="m-2 border-b px-2 font-semibold">Create a Post</div>
      <CardHeader
        avatar={
          <Link href={{ pathname: "/users/" + userId }}>
            <Avatar
              className="bg-gradient-to-r from-cyan-400 to-indigo-500"
              aria-label="recipe"
            >
              {username.charAt(0).toUpperCase()}
            </Avatar>
          </Link>
        }
        title={
          <OutlinedInput
            id="outlined-adornment-amount"
            multiline
            placeholder="Title"
            {...register("title")}
            inputProps={{ maxLength: 25 }}
            fullWidth
          ></OutlinedInput>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" fontSize={15}>
          <OutlinedInput
            id="outlined-adornment-amount"
            multiline
            placeholder="Text"
            {...register("text")}
            inputProps={{ maxLength: 250 }}
            fullWidth
          ></OutlinedInput>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          className="ms-auto m-2 bg-gradient-to-r from-cyan-400 to-indigo-500"
          variant="contained"
          startIcon={<SendIcon />}
          onClick={handleSubmit(onSubmit)}
        >
          Post
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostForm;
