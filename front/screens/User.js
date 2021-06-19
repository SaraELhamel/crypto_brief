import React, { useEffect, useState } from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { color } from 'react-native-reanimated';

export default function User(navigation) {



  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhotoUrl, setUserPhotoUrl] = useState('');
  const [userSolde, setWallet] = useState('');

   // ----------------------------------------------save user to db -------------
         


const AddUser = async () => {

  try {
    const email = await AsyncStorage.getItem('email');
    const name = await AsyncStorage.getItem('name');
    
    const res = await axios.post(`http://192.168.8.37:3000/user/Add`, {email : email, name: name});
    console.log(email,name);
             console.log(res.data);
             setUserEmail(res.data.email)
             setUsername(res.data.name)
             setUserPhotoUrl(res.data.photoUrl)
             setWallet(res.data.solde)
        
  } catch(err) {
   console.log(err);
  }
}


const GetUser = async () => {

  try {   
     const name = await AsyncStorage.getItem('name');
    const email = await AsyncStorage.getItem('email');
    const photoUrl = await AsyncStorage.getItem('photoUrl');

    setUserEmail(email)
    setUsername(name)
    setUserPhotoUrl(photoUrl)
   
        
  } catch(err) {
   console.log(err);
  }
}



useEffect(() => {
  AddUser();
 

},[]);
useEffect(() => {
  GetUser();
  console.log("NAME "+ userSolde)

});














    return (
//       <View  style={styles.container}>

    
//                   {/* <Image source={userPhotoUrl}  style={{width:40, height:40,borderRadius:30}} /> */}
//                   <Image
//                     source={{ uri: userPhotoUrl }}
//                     style={{ width: 40, height: 40, borderRadius: 30 }}
//                    />
//                   <Text >{username}</Text>
          
//                   <Text style={{fontWeight:"bold"}}>{username} </Text>
//                   <Text > $ {userSolde} </Text>
           


       
// </View>
<View style={styles.container}>
<View style={styles.header}></View>
<Image style={styles.avatar} source={{uri: 'https://i.pinimg.com/originals/ab/a8/a6/aba8a681058590ece9892b1ff28d65c8.jpg'}}/>
<View style={styles.body}>
  <View style={styles.bodyContent}>
    <Text style={styles.name}> {username}</Text>
    <Text style={styles.info}>{userEmail}</Text>
    <Text style={styles.description}>welcome {username} to your profile </Text>
    
    <TouchableOpacity style={styles.buttonContainer}>
      <Text  style={{color:"#fff"}}> Go to Buy Or sell crypto</Text>  
    </TouchableOpacity>              
  </View>
</View>
</View>
    )
}

const styles = StyleSheet.create({
  //     container: {
  //   flex: 1,
  //   backgroundColor: '#990011FF',
  //   marginTop:0,
  //   justifyContent: "center", 
  //   alignItems: "center",
    
  // },        
  // appButtonContainer: {
  //   elevation: 8,
  //   backgroundColor: "#2ecc71",
  //   borderRadius: 20,
  //   paddingVertical: 10,
  //   paddingHorizontal: 12,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   flexDirection: 'row',
  //   width: '80%'
  // },
  // listItem:{
  //   margin:10,
  //   padding:10,
  //   backgroundColor:"#FFF",
  //   width:"90%",
  //   alignSelf:"center",
  //   flexDirection:"row",
  //   borderRadius:5,
  //   elevation: 3,
  //   shadowOffset: { width: 1 , height:1},
  //   shadowColor: "#333",
  //   shadowOpacity: 0.2,
  //   justifyContent: 'center',
  //   alignItems: 'center',
    

  // }
  header:{
    backgroundColor: "pink",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    // borderColor: "black",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"beige",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
    
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
    
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
    
  },
  info:{
    fontSize:16,
    color: "grey",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "black",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "pink",
    
    
  },
})