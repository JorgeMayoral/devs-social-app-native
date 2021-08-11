import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { likePost } from '../services/postServices';
import { useUserStore } from '../utils/userStore';

const PostCard = ({ postData, callback }: any) => {
  const { authorName, authorUsername, body, createdAt, totalLikes, id } =
    postData;

  const loggedUser = useUserStore((state) => state.user);
  const fetchLoggedUser = useUserStore((state) => state.fetch);

  const date = new Date(createdAt);

  const handleLike = async () => {
    await likePost(id);
    await fetchLoggedUser();
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={callback}>
        <View style={styles.header}>
          <Text style={styles.name}>{authorName}</Text>
          <Text style={styles.username}>@{authorUsername}</Text>
        </View>
      </TouchableOpacity>
      <Text>{body}</Text>
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleLike}>
          {loggedUser.likedPosts.includes(id) ? (
            <Text>❤️ {totalLikes}</Text>
          ) : (
            <Text>🤍 {totalLikes}</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.date}>{date.toLocaleDateString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderColor: '#eaeaea',
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
  name: {
    fontWeight: 'bold',
  },
  username: {
    fontSize: 12,
    color: 'gray',
    paddingLeft: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingHorizontal: 5,
  },
  date: {
    fontSize: 10,
    color: 'gray',
  },
});

export default PostCard;
