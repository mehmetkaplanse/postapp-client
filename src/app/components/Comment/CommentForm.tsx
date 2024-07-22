import { Button} from "@mui/material";
import axios from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface CommentFormProps {
  userId: number;
  postId: number;
  fetchComments: () => void;
}

interface IFormInput {
  userId: number;
  postId: number;
  text: string;
}

const CommentForm: React.FC<CommentFormProps> = ({
  userId,
  postId,
  fetchComments
}) => {

  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    data.userId = userId;
    data.postId = postId;
    
    try {
      const response = await axios.post("/api/comments", data);
      if (response.status === 200) {
        fetchComments();
      } else {
        toast.error('Failed to send post.');
      }
    } catch (error) {
      toast.error('An error occurred while sending the post.');
    }
  };

  return (
    <div className="flex items-center px-2 gap-2 mb-4">
      <input
        className="w-full h-10 border px-4 py-2 rounded-full outline-none text-sm"
        placeholder="Create a comment..."
        {...register("text")}
      />
      <Button variant="outlined" className="rounded-full" onClick={handleSubmit(onSubmit)}>
        Send
      </Button>
    </div>
  );
};

export default CommentForm;
