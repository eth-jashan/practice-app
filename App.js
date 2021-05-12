import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const {width, height} = Dimensions.get('window')

export default function App() {
  const [list, setList] = useState([])
  useEffect(()=>{
    fetchAction()
  },[])
  const [load, setLoad] = useState(false)

  const fetchAction = async() => {
    setLoad(true)
    const response = await fetch('https://randomuser.me/api/?results=100&inc=name')
    const resData = await response.json()
    setList(resData.results)  
    setLoad(false)
    
  } 
  
  if(load){
    return<SafeAreaView style={styles.container}>
      <ActivityIndicator
        size='large'
        color='#009efd'
      />
    </SafeAreaView>
  }
  console.log("Listsss", list)
  return (
    <View style={styles.container}>
    <StatusBar hidden={true} />
    <Text style={{fontSize:28, alignSelf:'center', marginVertical:12}}>List Of Users</Text>
    <FlatList
      showsVerticalScrollIndicator={false}
      data={list}
      keyExtractor={(_, i) => i.toString()}
      renderItem={({item, index}) => {
        return(
          <View style={{width:width, padding:8,  flexDirection:'row',borderWidth:0.2, borderColor:'#8c8c8c'}}>
            <Text style={{fontWeight:'normal', fontSize:20}}>{item.name.title}</Text>
            <Text style={{fontWeight:'normal', fontSize:20, marginHorizontal:6}}>{item.name.first}</Text>
            <Text style={{fontWeight:'normal', fontSize:20}}>{item.name.last}</Text>
          </View>
        )
      }}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
