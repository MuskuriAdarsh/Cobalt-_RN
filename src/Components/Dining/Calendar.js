import { StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React, { useState, useRef } from 'react';

const tabs = [
  'My',
  'Events',
  'Past Resv',
  'My Buddies'
];

const CalendarTab = ({ tabs, setActiveTab, activeTab }) => {
  const flatListRef = useRef(null);

  const scrollLeft = () => {
      if (activeTab > 0) {
          const newActiveTab = activeTab - 1;
          setActiveTab(newActiveTab);
          scrollToTab(newActiveTab);
      }
  };

  const scrollRight = () => {
      if (activeTab < tabs.length - 1) {
          const newActiveTab = activeTab + 1;
          setActiveTab(newActiveTab);
          scrollToTab(newActiveTab);
      }
  };

  // Function to scroll to the active tab
  const scrollToTab = (index) => {
      flatListRef.current.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.5, // Centers the active tab
      });
  };

  return (
      <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.arrow} onPress={scrollLeft}>
              <Text style={styles.arrowText}>{"<"}</Text>
          </TouchableOpacity>
          <FlatList
              ref={flatListRef}
              horizontal
              data={tabs}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                  <TouchableOpacity
                      style={[styles.tabItem, activeTab === index && styles.activeTab]}
                      onPress={() => {
                          setActiveTab(index);
                          scrollToTab(index);
                      }}
                  >
                      <Text style={[styles.tabText, activeTab === index && styles.activeTabText]}>
                          {item}
                      </Text>
                  </TouchableOpacity>
              )}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={true} // Disable touch scrolling
          />
          <TouchableOpacity style={styles.arrow} onPress={scrollRight}>
              <Text style={styles.arrowText}>{">"}</Text>
          </TouchableOpacity>
      </View>
  );
};

const TabContent = ({ activeTab }) => {
  switch (activeTab) {
    case 0:
      return <Text style={styles.content}>This is "My" content.</Text>;
    case 1:
      return <Text style={styles.content}>This is "Events" content.</Text>;
    case 2:
      return <Text style={styles.content}>This is "Past Resv" content.</Text>;
    case 3:
      return <Text style={styles.content}>This is "My Buddies" content.</Text>;
    default:
      return null;
  }
};

// Calendar Component
const Calendar = ({ route }) => {
  // Extract the initial active tab index from the route parameters
  const { initialActiveTab } = route.params || {}; // Defaults to undefined if not passed

  // Set initial tab state to "Events" (index 1) if passed from the Dining screen
  const [activeTab, setActiveTab] = useState(initialActiveTab !== undefined ? initialActiveTab : 0); 

  const currentDate = new Date();
  const month = currentDate.toLocaleString('default', { month: 'long' }).slice(0, 3);
  const date = currentDate.getDate();
  const Year = currentDate.getFullYear();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor='black'
            keyboardType="default"
          />
          <View>
            <View style={styles.calender}>
              <Text style={{ backgroundColor: '#1E1DFE', width: '100%', borderTopLeftRadius: 8, borderTopRightRadius: 8, color: '#fff', textAlign: 'center' }}>
                {month}
              </Text>
              <Text style={{ backgroundColor: '#fff', width: '100%', textAlign: 'center', borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                {date}
              </Text>
            </View>
            <Text style={{ fontSize: 15, textAlign: 'center' }}>{Year}</Text>
          </View>
        </View>
      </View>

      <CalendarTab tabs={tabs} setActiveTab={setActiveTab} activeTab={activeTab} />
      
      <ScrollView style={styles.contentContainer}>
        <TabContent activeTab={activeTab} />
      </ScrollView>
    </View>
  );
};


export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff'
  },
  headerContainer: {
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: '#f5f5f5',
    marginBottom:3
  },
  input: {
    width: '60%',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#5773A2',
    borderRadius: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    height: 45,
    justifyContent: 'center',
    color:'#000'
  },
  calender: {
    alignItems: 'center',
    width: 40,
    borderRadius: 8,
    marginTop: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f5f5f5',
    marginBottom: 2,
    paddingBottom: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
    borderBottomWidth:1,
    borderBlockColor:'#e0e0e0'
},
tabItem: {
    marginRight: 15,
    padding: 10,
    // borderRadius: 8,
},
activeTab: {
    borderBottomWidth: 4,
    borderBottomColor: '#08c3f8',
},
tabText: {
    fontSize: 18,
    color: '#58729E',
    fontWeight:'500'
},
activeTabText: {
    color: '#58729E',
},
arrow: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginHorizontal: 10,
},
arrowText: {
    fontSize: 18,
    color: '#333',
},
  contentContainer: {
    flex: 1, 
    padding: 20,
  },
  content: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#333',
  }
});
