import React, { useState, useEffect } from "react";
import { FlatList,View, TouchableOpacity, Text } from "react-native";

export default function Characters() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const resp = await fetch("https://rickandmortyapi.com/api/episode/1");
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
        >
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