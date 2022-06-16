import React, { useState, useEffect } from "react";
import { FlatList, View, TouchableOpacity, Text, ImageBackground, Image } from "react-native";
import styles from "./styles";
import BackgroundImage from '../images/wallpaper2.jpeg';

const DEFAULT_IMAGE = Image.resolveAssetSource(BackgroundImage).uri;

const Episode = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (url) => {
    const resp = await fetch(url);
    const data = await resp.json();
    setData(data.results);
    setLoading(false);
  };
  
  useEffect(() => {
    const url = "https://rickandmortyapi.com/api/episode"
    fetchData(url);
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity 
        style = {styles.cards}
        onPress = {() => navigation.navigate('EpisodeDetails', {id:item.id})}>
        <Text 
          style = {styles.text}>
          {item.episode} - {item.name}
        </Text>
        <Text style = {styles.text}>
          Character Count = {item.characters.length}
        </Text>
        <Text style = {styles.textDate}>
          {item.air_date}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground source={{ uri: DEFAULT_IMAGE }} resizeMode="cover" style={styles.image}>
      <Text style = {styles.title}>RICK AND MORTY APP</Text>
        {data && (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
    </ImageBackground>
  );
}

export default Episode