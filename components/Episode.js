import React, { useState, useEffect } from "react";
import { FlatList,View, TouchableOpacity, Text } from "react-native";
import Characters from "./Characters";

export default function Episode() {
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
    console.log(item)
    return (
      <TouchableOpacity style= {styles= {marginTop: 100,marginLeft: 50}}
      onPress = {() => {<Characters/>}}
      >
        <Text>{item.episode}</Text>
      </TouchableOpacity>
    );
  };

  const renderCharacters = () => {
    return(    
      <Characters/>
      );
  };
   
  return (
    <View>
        {data && (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
    </View>
  );
}