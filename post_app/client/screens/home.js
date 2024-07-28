import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import React, { useContext, useState, useEffect, useCallback } from 'react';
import FooterMenu from '../components/menus/footerMenu';
import { PostContext } from '../context/postContext';
import PostCard from '../components/postCard';

const HomeScreen = () => {
  const { posts, getAllPosts } = useContext(PostContext);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getAllPosts();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllPosts().finally(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <PostCard posts={posts} />
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
    justifyContent: 'center',
    marginTop: 40
  }
});

export default HomeScreen;
