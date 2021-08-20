import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useUserStore } from '../hooks/useUserStore';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import UserCard from '../components/UserCard';
import { fetchUserPosts } from '../services/postServices';
import { fetchProfile } from '../services/userService';

const ProfileScreen = ({ navigation }: any) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPostsNumber, setCurrentPostsNumber] = useState(10);
  const [endReached, setEndReached] = useState(false);

  const loggedUser = useUserStore((state) => state.user);
  const fetchLoggedUser = useUserStore((state) => state.fetch);

  const getPosts = async () => {
    setLoading(true);
    setEndReached(false);
    const data = await fetchUserPosts(loggedUser._id, 0);

    if (data.length > 0) {
      setPosts(data);
    } else {
      setEndReached(true);
    }
    setLoading(false);
  };

  const getMorePosts = async () => {
    const data = await fetchUserPosts(loggedUser._id, currentPostsNumber);

    if (data.length === 0 || data[0] === null) {
      setEndReached(true);
    } else {
      setPosts(posts.concat(data));
      setCurrentPostsNumber((prev) => prev + 10);
    }
  };

  const getUserProfile = async () => {
    setLoading(true);
    await fetchLoggedUser();
    const data = await fetchProfile();
    setUser(data);
    setLoading(false);
  };

  useEffect(() => {
    getUserProfile();
    getPosts();
  }, []);

  const MoreLoading = () => {
    return endReached ? null : <ActivityIndicator color="blue" />;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      {user !== null ? <UserCard user={user} /> : null}
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
          <Text>There are no posts yet.</Text>
          <TouchableOpacity onPress={getPosts}>
            <Text style={styles.link}>Reload</Text>
          </TouchableOpacity>
        </View>
      )}
      <Navbar navigator={navigation} currentRoute="Profile" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
  },
  postList: {
    flex: 1,
    width: '100%',
  },
  link: {
    color: 'blue',
  },
});

export default ProfileScreen;
