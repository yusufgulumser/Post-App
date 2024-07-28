import { View, ScrollView, StyleSheet, Text } from "react-native";
import React, { useState, useEffect } from "react";
import FooterMenu from "../components/menus/footerMenu";
import axios from "axios";
import PostCard from "../components/postCard";

const Myposts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUserPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/post/get-user-post");
      console.log("User Posts Data:", data.userPosts); // Debugging line
      setLoading(false);
      setPosts(data?.userPosts);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error.message || "Error fetching user posts");
    }
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          posts.length > 0 ? (
            <PostCard posts={posts} myPostScreen={true} />
          ) : (
            <Text>No posts found</Text>
          )
        )}
      </ScrollView>
      <View style={{ backgroundColor: "#ffffff" }}>
        <FooterMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "space-between",
  },
});

export default Myposts;
