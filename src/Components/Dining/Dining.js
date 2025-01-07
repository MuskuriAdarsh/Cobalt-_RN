import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Image,Linking ,ActivityIndicator } from 'react-native';
import React, { useState,useEffect } from 'react';
import Reservations from './Reservations';
import MenuAndHours from './MenuAndHours';
import Calendar from './Calendar';
import RecentNews from './RecentNews';
import { Button,ButtonText } from '../../../components/ui/button';
// Top section with two buttons
const TopSec = ({ navigation }) => {
  const handleReservation = () => {
    navigation.navigate('Reservations');
  };
  const handleMenuAndHours = () => {
    navigation.navigate('MenuAndHours');
  };

  return (
    <View style={styles.topSection}>
      {/* <TouchableOpacity style={styles.resButton} onPress={handleReservation}>
        <Text style={styles.resButtonTex}>Reservations</Text>
      </TouchableOpacity> */}
      <Button style={styles.resButton} onPress={handleReservation}>
        <ButtonText style={styles.resButtonTex}>Reservations</ButtonText>
      </Button>

      {/* <TouchableOpacity style={styles.resButton} onPress={handleMenuAndHours}>
        <Text style={styles.resButtonTex}>Menus & Hours</Text>
      </TouchableOpacity> */}
      <Button style={styles.resButton} onPress={handleMenuAndHours}>
        <ButtonText style={styles.resButtonTex}>Menus & Hours</ButtonText>
      </Button>
    </View>
  );
};

// Calendar section with one button
const CalSection = ({ navigation }) => {
  const handleCalendar = () => {
    navigation.navigate('Calendar', { initialActiveTab: 1 }); 
  };

  return (
    <View style={styles.midsection}>
      {/* <TouchableOpacity style={styles.calButton} onPress={handleCalendar}>
        <Text style={styles.resButtonTex}>Calendar</Text>
      </TouchableOpacity> */}
      <Button style={styles.calButton} onPress={handleCalendar} >
        <ButtonText style={styles.resButtonTex}>Calendar</ButtonText>
      </Button>
    </View>
  );
};

// Bottom section with news and event info
const BottomSection = ({ navigation }) => {
  const handleViewNews = () => {
    navigation.navigate('RecentNews');
  };

  // Modal state
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to close the modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  // Function to show the modal when "Call" button is pressed
  const handleCallButtonPress = () => {
    setIsModalVisible(true);
  };

  // Function to open the phone dialer with the number
  const handlePhoneNumberPress = (phoneNumber) => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch((err) => console.log('Error opening dialer', err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.newsSection}>
        <Text style={styles.newsText}>View news</Text>
        <View style={{ alignItems: 'center' }}>
          {/* <TouchableOpacity style={styles.newsButton} onPress={handleViewNews}>
            <Text style={styles.newsButtonText}>View News</Text>
          </TouchableOpacity> */}
          <Button style={styles.newsButton} onPress={handleViewNews} >
        <ButtonText style={styles.resButtonTex}>View News</ButtonText>
      </Button>
        </View>
      </View>

      <View style={styles.eventSection}>
        <Text style={styles.eventTitle}>Host An Event</Text>
        {/* Make the phone number clickable */}
        <TouchableOpacity onPress={() => handlePhoneNumberPress('123-749-8745')}>
          <Text style={styles.eventPhone}>123-749-8745</Text>
        </TouchableOpacity>
        <Text style={styles.eventEmail}>Test@gmail.com</Text>
      </View>
      {/* <TouchableOpacity style={styles.callButton} onPress={handleCallButtonPress}>
        <Text style={styles.callButtonText}>Call</Text>
      </TouchableOpacity> */}
      <Button style={styles.callButton} onPress={handleCallButtonPress}>
        <ButtonText style={styles.callButtonText}>Call</ButtonText>
      </Button>

      {/* Modal to display when the Call button is clicked */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={closeModal} style={styles.cross}>
              <Image source={require('../../images/cross.png')} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Dining component combining the above sections
// Dining Screen
const Dining = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0D92F4" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <TopSec navigation={navigation} />
      <CalSection navigation={navigation} />
      <BottomSection navigation={navigation} />
    </View>
  );
};



export default Dining;

// Styles
const styles = StyleSheet.create({
  topSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  resButton: {
    backgroundColor: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 20,
    marginHorizontal: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#5773A2',
    marginVertical: 8,
    width: '90%',
  },
  resButtonTex: {
    color: '#5773A2',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
  },
  midsection: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  calButton: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    marginHorizontal: 15,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: '#5773A2',
    marginTop: 30,
    marginBottom: 5,
    width: '40%',
  },
  newsSection: {
    paddingHorizontal: 5,
    width: "100%",
  },
  newsText: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 5,
    backgroundColor: '#f2f2f2',
    padding: 12,
    width: "100%",
  },
  newsButton: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    marginHorizontal: 15,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: '#5773A2',
    marginTop: 20,
    width: '40%',
  },
  newsButtonText: {
    color: '#5773A2',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  eventSection: {
    backgroundColor: '#9E9E9E',
    padding: 15,
    marginTop: 20,
    borderRadius: 1,
    alignItems: 'center',
    width: '100%',
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#fff',
  },
  eventPhone: {
    fontSize: 17,
    marginBottom: 5,
    color: '#fff',
    fontWeight: '600',
  },
  eventEmail: {
    fontSize: 17,
    marginBottom: 20,
    color: '#fff',
    fontWeight: '600',
  },
  callButton: {
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: '#5773A2',
    width: '40%',
    marginVertical: 15,
  },
  callButtonText: {
    fontSize: 18,
    color: '#5773A2',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '95%',
    height: '90%',  
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    top:40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
  },
  modalInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#5773A2',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cross: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 20,
    height: 20,
  },
  loadingContainer:{
    flex:1,
justifyContent:'center',
alignItems:'center'
  },
});
