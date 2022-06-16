import React, { useState, useEffect } from "react";
import { FlatList,View, TouchableOpacity, Text,Image } from "react-native";
import styles from "./styles";

const Character = ({ navigation, route }) => {
  const [data, setData, name] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async (character) => { 
    const resp = await fetch(route.params.character);
    const data = await resp.json();
    setData(data);
    setLoading(false);
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style = {styles.cardsCharacters}>
        <Text style = {styles.text}>{item}</Text>
      </TouchableOpacity>
    );
  };
   
  return (
    <View>
        <TouchableOpacity style = {styles.cardsCharactersMain}>
        <Image
                style = {styles.viewImage}
                source={{uri:data.image}}/>
            <View style = {{backgroundColor:'#e91e63'}}>
              <Text style = {styles.textChapter}>{data.name} - {data.species}</Text>
              <Text style = {styles.textChapter}>{data.gender}</Text>
              <Text style = {styles.textChapter}>{data.status}</Text>
            </View>
           
      </TouchableOpacity>
    
        {data && (
          <FlatList
            data={data.episode}
            renderItem={renderItem}
            keyExtractor={(item) => item.toString()}
          />
        )}
    </View>
  );
}
export default Character