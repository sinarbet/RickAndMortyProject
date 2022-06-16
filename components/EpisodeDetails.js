import React, { useState, useEffect } from "react";
import { FlatList, TouchableOpacity, Text, Image, ImageBackground } from "react-native";
import styles from "./styles";
import BackgroundImage from '../images/wallpaper.jpeg';

const DEFAULT_IMAGE = Image.resolveAssetSource(BackgroundImage).uri;

const EpisodeDetails = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async (id) => {
    const url = "https://rickandmortyapi.com/api/episode/"
    const result = url.concat(route.params.id);
    const resp = await fetch(result);
    const data = await resp.json();
    setData(data.characters);
    setLoading(false);
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    const charID = item.substr(42);
    return (
      <TouchableOpacity 
        style = {styles.cardsDetail}
        onPress = {() => 
            navigation.navigate('Character', { character:item })} >
        <Text style = {styles.textDetail}>
            {item}
        </Text>
        <Text style = {styles.textDetail}>
            CHARACTER - {charID}
        </Text>
      </TouchableOpacity>
    );
  };
   
  return (
    <ImageBackground source={{ uri: DEFAULT_IMAGE }} resizeMode="cover" style={styles.image}>
        {data && (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.toString()}
          />
        )}
    </ImageBackground>
  );
}
export default EpisodeDetails