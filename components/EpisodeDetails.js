import React, { useState, useEffect } from "react";
import { FlatList,View, TouchableOpacity, Text } from "react-native";
import styles from "./styles";

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
    return (
      <TouchableOpacity 
        style = {styles.cardsDetail}
        onPress = {() => 
            navigation.navigate('Character', { character:item })} >
        <Text style = {styles.textDetail}>
            {item}
        </Text>
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
export default EpisodeDetails