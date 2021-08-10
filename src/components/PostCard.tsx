import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PostCard = ({ postData }: any) => {
  const { authorName, authorUsername, body, createdAt, totalLikes } = postData;

  const date = new Date(createdAt);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{authorName}</Text>
        <Text style={styles.username}>@{authorUsername}</Text>
      </View>
      <Text>{body}</Text>
      <View style={styles.footer}>
        <Text>🤍 {totalLikes}</Text>
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
