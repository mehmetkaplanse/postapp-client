"use client";
import React, { useEffect, useState } from "react";
import Post from "../components/Post/Post";
import PostForm from "../components/Post/PostForm";

const Posts = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [postList, setPostList] = useState<any[]>([]);

  useEffect(() => {
    fethPosts();
  },[postList]);

  const fethPosts = () => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result,"resulttt");
          
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  if (error) {
    return <div>Error !!</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-8">
      <h2 className="text-3xl font-semibold mb-3 text-center">Posts</h2>
      <div className="flex flex-col items-center gap-4">
        <PostForm 
        key={1}
        title={"ada"}
        text={"sda"}
        userId={1}
        username={"dd"}
        fetchPosts={fethPosts}
        />
        {postList.map((post) => (
          <Post
            key={post?.id}
            postId={post?.id}
            title={post.title}
            text={post.text}
            userId={post.user.userId}
            username={post.user.username}
          />
        ))}
      </div>
    </div>
  );
};

export default Posts;
