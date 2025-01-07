
import { StyleSheet, Text, View, TouchableOpacity, Modal, Image, Dimensions } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { ApiInterface } from '../../apiInterface';
import deviceInfo from '../../DeviceInfo';
import { Heading } from '../../../components/ui/heading';

const ITEM_HEIGHT = 50;

const DiningFooter = () => {
  return (
    <View style={styles.diningFooter}>
      <Text style={styles.footerText}>Dining Policy</Text>
    </View>
  );
};

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [partySize, setPartySize] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Start with current date
  const [selectedPartySize, setSelectedPartySize] = useState('');
  const [daysInAdvance, setDaysInAdvance] = useState('');
  const [maxDaysInAdvance, setMaxDaysInAdvance] = useState('');
  const [updatedDay, setUpdatedDay] = useState('');
  const [dayOfMonth, setdayOfMonth] = useState('');
  const [timeInterval, setTimeInterval] = useState('');
  const [defaultTime, setDefaultTime] = useState('');
  
  const formatDate = (date) => {
    const minDays = parseInt(daysInAdvance, 10) || 0;
    const adjustedDay = date.getDate() + minDays + 1;
    
   
    const adjustedDate = new Date(date);
    adjustedDate.setDate(adjustedDay);
    
    const day = String(adjustedDay).padStart(2, '0');
    setUpdatedDay(day);

    const options = { weekday: 'short' };
    setdayOfMonth(adjustedDate.toLocaleDateString('en-US', options));

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
};


  const handleDateChange = (direction) => {
    const newDate = new Date(selectedDate);

    if (direction === 'next') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (direction === 'previous') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const previousDate = new Date(newDate);
      previousDate.setDate(previousDate.getDate() - 1);

      if (previousDate >= today) {
        newDate.setDate(newDate.getDate() - 1);
      }
    }

    setSelectedDate(newDate);
  };

  useEffect(() => {
    const fetchReservationData = async () => {
      setLoading(true); // Show loading only during data fetch
      const requestIconsData = {
        RequestID: '',
        DeviceInfo: [deviceInfo],
        CompanyCode: '00',
        FilterDate: formatDate(selectedDate),
        FilterTime: '',
        PartySize: selectedPartySize,
      };

      try {
        const reservationData = await ApiInterface.getReservation(requestIconsData);

        if (reservationData?.Restaurants?.length) {
          setReservations(reservationData.Restaurants);

        } else {
          console.warn('No Restaurants found in the API response.');
          setReservations([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch reservation data.');
      } finally {
        setLoading(false);
      }
    };

    fetchReservationData();
  }, [selectedDate]); // Dependency on selectedDate


  useEffect(() => {
    const fetchDiningSetting = async () => {
      const requestSettingData = {
        RequestID: '',
        DeviceInfo: [deviceInfo],
        CompanyCode: '00',
        FilterDate: '',
        FilterTime: '',
        PartySize: 0,
      };

      try {
        const reservationData = await ApiInterface.getReservation(requestSettingData);

        if (reservationData?.Restaurants?.length) {
          setDaysInAdvance(reservationData.DiningSetting?.MinDaysInAdvance);
          setMaxDaysInAdvance(reservationData.DiningSetting?.MaxDaysInAdvance);
          setSelectedPartySize(reservationData.DiningSetting?.DefaultPartySize);
          setTimeInterval(reservationData.DiningSetting?.TimeInterval);
          setDefaultTime(reservationData.DiningSetting?.DefaultTime);
        } else {
          console.warn('No Dining Settings found in the API response.');
        }
      } catch (error) {
        console.error('Error fetching dining settings:', error);
        setError('Failed to fetch dining settings.');
      }
    };

    fetchDiningSetting();
  }, []); // Empty dependency array ensures it runs once on mount

  // useEffect(() => {

  //   console.log('Days in Advance:', daysInAdvance);
  // }, [daysInAdvance]); 





  const renderItem1 = ({ item }) => {
    return <Text style={styles.timeSlot}>{item.TimeSlot}</Text>;
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
          {item.RestaurantName || 'Unnamed Restaurant'}
        </Text>
        <Text style={styles.timings}>
          {item.Timings[0].StartTime || 'Null'} to {item.Timings[0].EndTime || 'Null'}
        </Text>
        <FlatList
          data={item.TimeSlots}
          keyExtractor={(slot, index) => slot.MenuID || `fallback-${index}`}
          renderItem={renderItem1}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };

  const handleDemoPress = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handlePartySize = (item) => {
    setSelectedPartySize(item);
  
    // console.log('Updated party size:', item); 
  };



  const handleDone = () => {
    setModalVisible(false)
    updateSelectedTime();
  }

  const date = new Date(`1970-01-01T${defaultTime}:00Z`); // You need a complete date format, even though the date doesn't matter
const initialHours = date.getHours();
const initialMinutes = date.getMinutes();

// console.log(initialHours);
  const [selectedHour, setSelectedHour] = useState(9);
  const [selectedMinute, setSelectedMinute] = useState(30);
  const [selectedPeriod, setSelectedPeriod] = useState('AM');
  const [selectedTime, setSelectedTime] = useState('');
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 4 }, (_, i) => i * timeInterval);

  const periods = ['AM', 'PM'];

  // Update selectedTime whenever hour, minute, or period changes
  const updateSelectedTime = () => {
    const time = `${selectedHour}:${selectedMinute.toString().padStart(2, '0')} ${selectedPeriod}`;
    setSelectedTime(time);
  };

  const handleScroll = (data, setSelected, valueUpdater) => (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT);
    const value = data[index % data.length];
    setSelected(value);
    valueUpdater(); // Trigger update of the selectedTime
  };



  const renderPicker = (data, selectedValue, setSelectedValue, valueUpdater) => (
    <FlatList
      data={data}
      keyExtractor={(item) => item.toString()}
      showsVerticalScrollIndicator={false}
      snapToInterval={ITEM_HEIGHT}
      decelerationRate="fast"
      contentContainerStyle={{
        paddingVertical: ITEM_HEIGHT,
      }}
      onScroll={handleScroll(data, setSelectedValue, valueUpdater)}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text
            style={[
              styles.timeItem,
              selectedValue === item && styles.selectedText,
            ]}
          >
            {item.toString().padStart(2, '0')}
          </Text>
        </View>
      )}
    />
  );
  // const partymems = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const partymems= Array.from({ length: 12 }, (_, i) => i +1);

const time =() =>{
  if(selectedTime){
    return selectedTime
  }
  else{
    return defaultTime
  }
}
  const options = { weekday: 'short' };
  return (
    <View style={styles.container}>
      <View >
        {/* {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : reservations.length === 0 ? (
          <Text style={styles.noDataText}>No reservations available.</Text>
        ) : ( */}

        <FlatList
          contentContainerStyle={styles.content}
          data={[1, 1, 1, 1]}
          renderItem={({ item, index }) => {
            return (
              <View style={{ marginBottom: 15 }}>
                {index == 0 && <View style={styles.resTop}>
                  <TouchableOpacity onPress={handleDemoPress}>
                    {/* <Text style={styles.demoText}> {selectedPartySize} * {selectedTime} {''} {dayOfMonth}</Text> */}
                    <Text style={styles.demoText}> {selectedPartySize} * {time} {''} {dayOfMonth}</Text>
                  </TouchableOpacity>
                </View>}


                {index == 1 &&
                  <View>
                    <Text
                      style={{
                        color: '#555b59',
                        fontSize: 18,
                        fontWeight: '500',
                        // marginVertical: 10,
                      }}
                    >
                      Selected Date, {selectedDate.toLocaleString('default', { month: 'short' })}{' '}
                      {updatedDay} | PartySize {selectedPartySize} 
                    </Text>
                    <Text>To Reserve Restaurants & Times</Text>
                  </View>
                }
                {index == 2 &&
                  <View style={styles.dateContainer}>
                    <TouchableOpacity
                      style={styles.dateButton}
                      onPress={() => handleDateChange('previous')}
                    >
                      <Text style={styles.dateButtonText}>Previous</Text>
                    </TouchableOpacity>
                    <Text style={styles.selectedDateText}>
                      {formatDate(selectedDate)} {/* Display the selected date */}
                    </Text>
                    <TouchableOpacity
                      style={styles.dateButton}
                      onPress={() => handleDateChange('next')}
                    >
                      <Text style={styles.dateButtonText}>Next</Text>
                    </TouchableOpacity>
                  </View>
                }
                {index == 3 && <View>
                  <FlatList
                    data={reservations}
                    keyExtractor={(item, index) => item.MenuID || `fallback-${index}`}
                    renderItem={renderItem}
                    contentContainerStyle={styles.recyclerView}
                    showsVerticalScrollIndicator={false}
                  />
                </View>}
              </View>
            )
          }}
        />
        {/* )

} */}
      </View>
      <DiningFooter />

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={[styles.partycontainer, { marginBottom: 20 }]}>

              <Text style={styles.partyText}>Party Size</Text>
              <FlatList
                data={partymems}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handlePartySize(item)}>
                    <Text
                      style={[
                        styles.partySize,
                        {
                          backgroundColor:
                            selectedPartySize === item ? '#08c3f8' : '#fff', // Conditional styling
                        },
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
              />


            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.partyText}>Select Time</Text>


              <View style={{ flexDirection: 'row' }}>
                <View style={styles.picker}>{renderPicker(hours, selectedHour, setSelectedHour, updateSelectedTime)}</View>
                <Text style={styles.separator}>:</Text>
                <View style={styles.picker}>{renderPicker(minutes, selectedMinute, setSelectedMinute, updateSelectedTime)}</View>
                <View style={styles.picker}>{renderPicker(periods, selectedPeriod, setSelectedPeriod, updateSelectedTime)}</View>

              </View>
            </View>
            <View >
              <Text style={styles.partyText}>Select Date</Text>
              <View>
                <FlatList

                />


              </View>

            </View>
            <TouchableOpacity onPress={handleDone} style={styles.cross} >
              <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Reservations;

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  content: {
    padding: 10,
  },
  recyclerView: {
    justifyContent: 'space-between',
  },

  itemContainer: {
    flex: 1,
    paddingHorizontal: 5,
    marginBottom: 25,
  },
  timeItem: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    opacity: 0.3

  },
  itemText: {
    fontSize: 18,
    color: '#5773A2',
    fontWeight: 'bold',
    // opacity:0.3
  },
  timings: {
    color: '#000',
    fontSize: 12,
    marginVertical: 8
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#007bff',
  },
  flatListContent: {
    paddingVertical: height / 2 - 20, // Adjust padding for centering
    marginRight: 40
  },
  // itemText: {
  //   color: '#000',
  //   fontSize: 18,
  //   paddingVertical: 10,
  //   textAlign: 'center',
  // },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#dc3545',
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6c757d',
  },
  resTop: {
    borderWidth: 1,
    borderColor: '#f1f1f1',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  demoText: {
    fontSize: 18,
    color: '#555b59',
    fontWeight: 'bold',
    // textAlign: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    // justifyContent:'center',
    marginBottom: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 10,
  },
  dateButton: {
    paddingVertical: 5,
    paddingHorizontal: 0,
    backgroundColor: '#fff',
    borderRadius: 3,
    width: '30%',
    elevation: 2,
    shadowColor: '#000',
  },
  dateButtonText: {
    color: '#5773A2',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectedDateText: {
    fontSize: 18,
    marginHorizontal: 10,
    fontWeight: 'bold',
    width: '30%',
    paddingVertical: 10,
    paddingHorizontal: 2,
    color: '#5773A2',
    elevation: 2,
    shadowColor: '#000',
  },
  diningFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 15,
    alignItems: 'center',
    elevation: 5, // Add a shadow effect for visibility
  },
  footerText: {
    color: '#08c3f8',
    fontWeight: 'bold',
    fontSize: 18,
  },
  timeSlot: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 5,
    marginRight: 8,
    backgroundColor: '#5773A2',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    height: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#000',
    marginVertical: 10,
  },
  partycontainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  partyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center'
  },
  partySize: {
    fontSize: 18,
    marginRight: 15,
    borderWidth: 1,
    width: 30,
    height: 30,
    borderRadius: 30,
    textAlign: 'center'
  },
  cross: {
    position: 'absolute',
    top: '95%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: 0 }],
    backgroundColor: '#5773A2',
    width: '45%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },












  picker: {
    width: 60,
    height: ITEM_HEIGHT * 3, // Show only 3 items
    overflow: 'hidden',
  },
  separator: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // itemText: {
  //   fontSize: 18,
  //   color: '#aaa',
  // },
  selectedText: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    opacity: 1
  },
});
