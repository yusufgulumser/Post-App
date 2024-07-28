import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

// context
const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

  // get posts
  const getAllPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/post/get-all-post");
      setLoading(false);
      setPosts(data?.posts);
    } catch (error) {
      console.log("Error in getAllPosts:", error);
      setLoading(false);
    }
  };

  // delete post
  const deletePost = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/post/delete-post/${id}`);
      await getAllPosts(); // Refetch posts after deletion
      setLoading(false);
      navigation.push("MyPosts"); // Navigate to MyPosts screen
    } catch (error) {
      console.log("Error in deletePost:", error);
      setLoading(false);
    }
  };

  // update post
  const updatePost = async (id, updatedData) => {
    setLoading(true);
    try {
      await axios.put(`/post/update-post/${id}`, updatedData);
      await getAllPosts(); // Refetch posts after update
      setLoading(false);
      navigation.push("MyPosts"); // Navigate to MyPosts screen
    } catch (error) {
      console.log("Error in updatePost:", error);
      setLoading(false);
    }
  };

  // initial posts
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <PostContext.Provider value={{ posts,setPosts, getAllPosts, deletePost, updatePost }}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
