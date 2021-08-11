import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import { fetchAllPosts } from '../services/postServices';

const ExploreScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPostsNumber, setCurrentPostsNumber] = useState(10);
  const [endReached, setEndReached] = useState(false);

  const getPosts = async () => {
    setLoading(true);
    const data = await fetchAllPosts(0);
    setPosts(data);
    setLoading(false);
  };

  const getMorePosts = async () => {
    const data = await fetchAllPosts(currentPostsNumber);
    setPosts(posts.concat(data));
    setCurrentPostsNumber((prev) => prev + 10);
    if (data.length === 0) {
      setEndReached(true);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const MoreLoading = () => {
    return endReached ? null : <ActivityIndicator color="blue" />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostCard postData={item} />}
        keyExtractor={(item) => item.id}
        onRefresh={getPosts}
        refreshing={loading}
        onEndReached={getMorePosts}
        onEndReachedThreshold={0.25}
        ListFooterComponent={MoreLoading}
      />
      <Navbar navigator={navigation} currentRoute="Explore" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default ExploreScreen;
