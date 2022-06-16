import React, { useState, useEffect } from "react";
import { FlatList,View, TouchableOpacity, Text } from "react-native";

const EpisodeDetails = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async (id) => {
    const url = "https://rickandmortyapi.com/api/episode/"
    const result = url.concat(route.params.id);
    console.log("RESULTTT",result)
    const resp = await fetch(result);
    const data = await resp.json();
    setData(data.characters);
    setLoading(false);
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    console.log(item)
    return (
      <TouchableOpacity style= {styles= {marginTop: 100,marginLeft: 50}}
        onPress = {() => navigation.navigate('Characters', {character:item})} >
        <Text>{item}</Text>
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