import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import UserCard from '../components/UserCard';
import { fetchUserPosts } from '../services/postServices';
import { fetchUser, followUser } from '../services/userService';
import { useUserStore } from '../utils/userStore';

const UserScreen = ({ navigation, route }: any) => {
  const { userId } = route.params;
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPostsNumber, setCurrentPostsNumber] = useState(10);
  const [endReached, setEndReached] = useState(false);

  const loggedUser = useUserStore((state) => state.user);
  const fetchUserState = useUserStore((state) => state.fetch);

  const handleFollow = async () => {
    await followUser(userId);
    await fetchUserState();
    await getUser();
  };

  const getPosts = async () => {
    setLoading(true);
    setEndReached(false);
    const data = await fetchUserPosts(userId, 0);

    if (data.length > 0) {
      setPosts(data);
    } else {
      setEndReached(true);
    }
    setLoading(false);
  };

  const getMorePosts = async () => {
    const data = await fetchUserPosts(userId, currentPostsNumber);

    if (data.length === 0 || data[0] === null) {
      setEndReached(true);
    } else {
      setPosts(posts.concat(data));
      setCurrentPostsNumber((prev) => prev + 10);
    }
  };

  const getUser = async () => {
    setLoading(true);
    const data = await fetchUser(userId);
    setUser(data);

    if (loggedUser === undefined) {
      await fetchUserState();
    }

    setLoading(false);
  };

  useEffect(() => {
    getUser();
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
      <UserCard user={user}>
        <View style={styles.buttonContainer}>
          {loggedUser._id != userId ? (
            <CustomButton
              text={
                loggedUser.following.includes(user.id)
                  ? '❌ Unfollow'
                  : '✔️ Follow'
              }
              onPress={handleFollow}
            />
          ) : null}
        </View>
      </UserCard>
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
      <Navbar navigator={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonContainer: {
    alignSelf: 'center',
    paddingTop: 30,
  },
  postList: {
    flex: 1,
    width: '100%',
  },
  link: {
    color: 'blue',
  },
});

export default UserScreen;
