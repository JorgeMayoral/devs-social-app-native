import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const UserCard = ({ user, children }: any) => {
  return (
    <View style={styles.profile}>
      <View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>@{user.username}</Text>
      </View>
      <View style={styles.statistics}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{user.posts.length}</Text>
          <Text>posts</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{user.likedPosts.length}</Text>
          <Text>likes</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{user.followers.length}</Text>
          <Text>followers</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{user.following.length}</Text>
          <Text>following</Text>
        </View>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    elevation: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  username: {
    color: 'gray',
  },
  statistics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    textAlign: 'center',
  },
  stat: {
    flexDirection: 'column',
  },
  statNumber: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default UserCard;
