import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import moment from "moment";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { PostContext } from "../context/postContext";
import EditModal from "./editModal";
import { useNavigation } from "@react-navigation/native";

const PostCard = ({ posts, myPostScreen }) => {
  const { deletePost, updatePost } = useContext(PostContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const navigation=useNavigation();
  // handle delete prompt
  const handleDeletePrompt = (id) => {
    Alert.alert("Attention!", "Are you sure you want to delete this post?", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("Cancel press");
        },
      },
      {
        text: "Delete",
        onPress: () => handleDeletePost(id),
      },
    ]);
  };

  // delete post data
  const handleDeletePost = async (id) => {
    try {
      await deletePost(id);
      navigation.push("MyPosts");
    } catch (error) {
      console.log(error);
      alert(error.message || "Error deleting post");
    }
  };

  // handle update prompt
  const handleUpdatePrompt = (post) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  // update post data
  const handleUpdatePost = async (id, updatedData) => {
    try {
      await updatePost(id, updatedData);
    } catch (error) {
      console.log(error);
      alert(error.message || "Error updating post");
    }
  };

  return (
    <View>
      <Text style={styles.heading}>Total Posts {posts?.length}</Text>
      {myPostScreen && (
        <EditModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          post={selectedPost}
          onSave={handleUpdatePost}
        />
      )}
      {posts?.map((post, i) => (
        <View style={styles.card} key={i}>
          {myPostScreen && (
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Text style={{ marginHorizontal: 20 }}>
                <FontAwesome5
                  name="pen"
                  size={16}
                  color={"darkblue"}
                  onPress={() => handleUpdatePrompt(post)}
                />
              </Text>
              <Text>
                <FontAwesome5
                  name="trash"
                  size={16}
                  color={"red"}
                  onPress={() => handleDeletePrompt(post?._id)}
                />
              </Text>
            </View>
          )}
          <Text style={styles.title}>Title : {post?.title}</Text>
          <Text style={styles.desc}> {post?.description}</Text>
          <View style={styles.footer}>
            {post?.postedBy?.name && (
              <Text>
                <FontAwesome5 name="user" color={"orange"} /> {post?.postedBy?.name}
              </Text>
            )}
            <Text>
              <FontAwesome5 name="clock" color={"orange"} />{" "}
              {moment(post?.createdAt).format("DD:MM:YYYY")}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: "green",
    textAlign: "center",
  },
  card: {
    width: "97%",
    backgroundColor: "#ffffff",
    borderWidth: 0.2,
    borderColor: "gray",
    padding: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  title: {
    fontWeight: "bold",
    paddingBottom: 10,
    borderBottomWidth: 0.3,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  desc: {
    marginTop: 10,
  },
});

export default PostCard;
