import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import { fetchTimeline } from '../services/postServices';

const HomeScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPostsNumber, setCurrentPostsNumber] = useState(10);
  const [endReached, setEndReached] = useState(false);

  const getPosts = async () => {
    setLoading(true);
    setEndReached(false);
    const data = await fetchTimeline(0);

    if (data.length > 0) {
      setPosts(data);
    } else {
      setEndReached(true);
    }
    setLoading(false);
  };

  const getMorePosts = async () => {
    const data = await fetchTimeline(currentPostsNumber);

    if (data.length === 0 || data[0] === null) {
      setEndReached(true);
    } else {
      setPosts(posts.concat(data));
      setCurrentPostsNumber((prev) => prev + 10);
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
      {posts.length > 0 ? (
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <PostCard
              postData={item}
              callback={() =>
                navigation.navigate('User', { userId: item.authorId })
              }
            />
          )}
          keyExtractor={(item) => item.id}
          onRefresh={getPosts}
          refreshing={loading}
          onEndReached={getMorePosts}
          onEndReachedThreshold={0.25}
          ListFooterComponent={MoreLoading}
          style={styles.postList}
        />
      ) : (
        <View>
          <Text>There are no posts, try following someone.</Text>
          <TouchableOpacity onPress={getPosts}>
            <Text style={styles.link}>Reload</Text>
          </TouchableOpacity>
        </View>
      )}
      <Navbar navigator={navigation} currentRoute="Home" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  postList: {
    flex: 1,
    width: '100%',
  },
  link: {
    color: 'blue',
  },
});

export default HomeScreen;
