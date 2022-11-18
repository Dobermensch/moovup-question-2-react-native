import MapView, { Marker } from 'react-native-maps';
import { Dimensions, Image, StyleSheet, SafeAreaView, Text, View } from "react-native";

import { boldText, image as imageStyle, infoContainer as infoContainerStyle } from "../styles/common";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const deviceHeightHalved = deviceHeight / 2;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: deviceWidth,
    height: deviceHeightHalved,
    marginTop: deviceHeightHalved
  },
  infoContainer: {
    marginTop: deviceHeightHalved + 10,
    ...infoContainerStyle
  },
  image: {
    ...imageStyle
  },
  info: {
    ...boldText
  }
});

export default function Friend({ route }) {
  const { item } = route.params;
  const location = {
    latitude: item?.location?.latitude,
    longitude: item?.location?.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView style={styles.map} initialRegion={location} >
          <Marker coordinate={location} />
        </MapView>
      </View>
      <View style={styles.infoContainer}>
        <Image style={styles.image} source={{ uri: item.picture }} />
        <Text style={styles.info}>{item?.name?.first} {item?.name?.last}</Text>
      </View>
    </SafeAreaView>
  )
};