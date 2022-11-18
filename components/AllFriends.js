import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, SafeAreaView, Text, TouchableOpacity } from "react-native";

import { REACT_APP_FRIENDS_ENDPOINT_URL, REACT_APP_FRIENDS_ENDPOINT_AUTHORIZATION_TOKEN } from "@env"
import { boldText, image as imageStyle, infoContainer as infoContainerStyle } from "../styles/common";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    ...infoContainerStyle,
    marginTop: 10,
    backgroundColor: "white",
  },
  image: {
    ...imageStyle
  },
  name: {
    ...boldText
  }
});

const onPress = (navigation, item) => {
  navigation.push("Friend", { item });
}

const Item = ({ item, navigation }) => (
  <TouchableOpacity onPress={() => onPress(navigation, item)} style={styles.button}>
    <Image style={styles.image} source={{ uri: item.picture }} />
    <Text style={styles.name}>{item.name.first} {item.name.last}</Text>
  </TouchableOpacity>
);


export default function AllFriends({ navigation }) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(REACT_APP_FRIENDS_ENDPOINT_URL, {
          headers: {
            Authorization: REACT_APP_FRIENDS_ENDPOINT_AUTHORIZATION_TOKEN
          }
        });

        if (response.status === 200) {
          setFriends(response.data);
        }
      } catch (e) {
        console.error(e);
      }
    }

    getData();
  }, []);

  const renderItem = ({ item }) => (
    <Item item={item} navigation={navigation} />
  );

  return (
    <SafeAreaView style={styles.container} >
      <FlatList
        data={friends}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </SafeAreaView>
  )
};
