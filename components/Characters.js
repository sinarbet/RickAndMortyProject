import React, { useState, useEffect } from "react";
import { FlatList,View, TouchableOpacity, Text,Image } from "react-native";
import styles from "./styles";

const Characters = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async (character) => { 
    const resp = await fetch(route.params.character);
    const data = await resp.json();
    setData(data.episode);
    setLoading(false);
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    console.log(item)
    return (
      <TouchableOpacity style = {styles.cardsCharacters}>
        <Text style = {styles.text}>{item}</Text>
        <Image source={{
          uri: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        }}/>
      </TouchableOpacity>
    );
  };
   
  return (
    <View>
        {data && (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.toString()}
          />
        )}
    </View>
  );
}
export default Characters