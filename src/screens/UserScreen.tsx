import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import UserCard from '../components/UserCard';
import { fetchUser, followUser } from '../services/userService';
import { useUserStore } from '../utils/userStore';

const UserScreen = ({ navigation, route }: any) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { userId } = route.params;

  const loggedUser = useUserStore((state) => state.user);
  const fetchUserState = useUserStore((state) => state.fetch);

  const handleFollow = async () => {
    await followUser(userId);
    await fetchUserState();
    await getUser();
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
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <View>
        <UserCard user={user} />
        <View style={styles.button}>
          {loggedUser._id != userId ? (
            <CustomButton
              text={
                loggedUser.following.includes(user.id) ? 'Unfollow' : 'Follow'
              }
              onPress={handleFollow}
            />
          ) : null}
        </View>
      </View>
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
  button: {
    alignSelf: 'center',
    paddingTop: 30,
  },
});

export default UserScreen;
