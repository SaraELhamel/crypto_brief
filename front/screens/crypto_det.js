import React, { useEffect, useState } from 'react';
import { Text, View, Dimensions,StyleSheet, TouchableOpacity, Image,TextInput   } from 'react-native';
import {
  LineChart,
  
} from "react-native-chart-kit";



import axios from 'axios';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';


axios.defaults.headers.common['Accept-Encoding'] = 'gzip'



const CryptoDetails = ({ navigation, route }) => {

  const [time, setTime] = useState([0,0]);
  const [price, setPrice] = useState([0,0]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);

  const [cryptoAmount, setCryptoAmount] = useState('');
  

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };

  const buy = async() => {

    const email = await AsyncStorage.getItem('email');
    console.log(email);
    const res = await axios.post(`http://192.168.8.37:3000/wallet/add`, {email : email, currencyPrice: route.params.priceUsd, cryp_name : route.params.name , value : cryptoAmount});
    console.log(res.data);
    setModalVisible(!isModalVisible);

  };


   const sell = async() => {
    const email = await AsyncStorage.getItem('email');
    const res = await axios.post(`http://192.168.8.37:3000/wallet/sell`, {email : email, currencyPrice: route.params.priceUsd,currencyName : route.params.name,value : cryptoAmount});
    console.log(res.data);
    setModalVisible2(!isModalVisible2);
  };

  const convertTimeToDay =  (timestamp) => {
                      
    var a = new Date(timestamp);
    var days = ['Sund','Mon','Tues','Wednes','Thurs','Fri','Satur'];
    var dayOfWeek = days[a.getDay()]

    // console.log(dayOfWeek);
    return dayOfWeek
  };
  const getDataUsingAsyncAwaitGetCall = async () => {
    try {
      const response = await axios.get(
        `https://api.coincap.io/v2/assets/${route.params.id}/history?interval=d1`,
      );


      
      let resData = response.data.data;



      const priceArray = resData && resData.map(item => item.priceUsd);
      const dateArray  = resData && resData.map(item => convertTimeToDay(item.time));
      // const dateArray  = resData && resData.map(item => item.time);

      setTime(dateArray && dateArray.slice(-6));
      setPrice(priceArray && priceArray.slice(-6));



    } catch (error) {
      // handle error
      console.log(error.message);
    }
  };





  
  useEffect(() => {
     getDataUsingAsyncAwaitGetCall();
    //  convertTimeToDay();
  },[]);









  return (
    <View  style={styles.container}>


          <View style={styles.listItem }>
              <Image source={{uri: `https://assets.coincap.io/assets/icons/${route.params.symbol.toLowerCase()}@2x.png`}}  style={{width:40, height:40,borderRadius:30}} />
              <View style={{justifyContent:"center",alignItems:"flex-start",flex:1,marginHorizontal: "5%"}}>
                <Text style={{fontWeight:"bold",color:"#fff"}}>{route.params.name}</Text>
                <Text style={{color:"#6B7CD2"}} >{route.params.symbol}</Text>
              </View>
              <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
                <Text style={{fontWeight:"bold",color:"#fff"}}>${parseFloat(route.params.priceUsd).toFixed(2)}</Text>
              </View>
              <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
                <Text style={ 
                 route.params.changePercent24Hr > 0
                ? { fontWeight:"bold", color: "white" }
                : { fontWeight:"bold", color: "#F8397F" }
                }>{parseFloat(route.params.changePercent24Hr).toFixed(2)} %</Text>
              </View>
           
          </View>
      <LineChart
          data={{
            labels: time,
            datasets: [
              {
                data: price,
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={500}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "purple",
            backgroundGradientFrom: "pink",
            backgroundGradientTo: "#FFB6C1",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(107, 124, 210, 100)`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, 100)`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#FFF"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            
            borderRadius: 11
          }}
        />

<View  style={styles.ButtonContainer}>
            <TouchableOpacity onPress={toggleModal} style={styles.appButtonContainer}>
              <Text style={styles.appButtonText}>Buy</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={toggleModal2} style={styles.appButtonContainer}>
              <Text style={styles.appButtonText}>Sell</Text>
            </TouchableOpacity>
          </View>

          <Modal   isVisible={isModalVisible}>
              <View style={styles.modalContainer}>
            
                <Text style={styles.titleText}>Buy this crypto</Text>

                <TextInput
                style={styles.input}
                onChangeText={setCryptoAmount}
                value={cryptoAmount}
                placeholder="How Many Crypto"

                />

                <View  style={styles.ButtonContainer}>
                  <TouchableOpacity onPress={buy} style={styles.appButtonContainerNoBg2}>
                    <Text style={styles.appButtonTextNoBg2}>Buy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity  onPress={toggleModal} style={styles.appButtonContainerNoBg}>
                    <Text style={styles.appButtonTextNoBg}>Back</Text>
                  </TouchableOpacity>
                </View>

              </View>
          </Modal>

          <Modal   isVisible={isModalVisible2}>
              <View style={styles.modalContainer}>
            
                <Text style={styles.titleText}>Sell this crypto</Text>

                <TextInput
                style={styles.input}
                onChangeText={setCryptoAmount}
                value={cryptoAmount}
                placeholder="How Many Crypto"

                />

                <View  style={styles.ButtonContainer}>
                  <TouchableOpacity onPress={sell} style={styles.appButtonContainerNoBg2}>
                    <Text style={styles.appButtonTextNoBg2}>Sell</Text>
                  </TouchableOpacity>
                  <TouchableOpacity  onPress={toggleModal2} style={styles.appButtonContainerNoBg}>
                    <Text style={styles.appButtonTextNoBg}>Back</Text>
                  </TouchableOpacity>
                </View>

              </View>
          </Modal>
      </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop:0,
    justifyContent: "center", 
    alignItems: "center",
    
  },
  
  textHeder:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },
  itemTextHeder:{
    textAlign:'left'

  },
  baseText: {
  },

  titleText: {
    fontSize: 20,
    color:'pink',
    fontWeight: "bold"
  },
  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "black",
    borderRadius: 8,
    color:"black",
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: "1%",
    marginBottom: 1,
    marginTop: 6,
    minWidth: "40%",
  },
  appButtonText: {
    fontSize: 18,
    color: "pink",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },

  modalContainer:{
    flex: 0.5,
    backgroundColor:"white",
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius:15,
  },
  appButtonContainerNoBg: {
    
    backgroundColor: "pink",
    borderRadius: 30,
    // borderWidth :2,
    
    
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: "1%",
    marginBottom: 2,
    marginTop: 8,
    width: "30%",
  },
  appButtonTextNoBg: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  appButtonContainerNoBg2: {
    
    backgroundColor: "#1CBCA1",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: "1%",
    marginBottom: 2,
    marginTop: 8,
    width: "30%",
  },
  appButtonTextNoBg2: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  listItem:{
    margin:10,
    padding:10,
    backgroundColor:"#FFC0CB",
    width:"95%",
    alignSelf:"center",
    flexDirection:"row",
    borderRadius:5,
    elevation: 8,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "beige",
    color:"#fff",

    borderRadius: 60,
    width: "80%",
  },
});

export default CryptoDetails;
