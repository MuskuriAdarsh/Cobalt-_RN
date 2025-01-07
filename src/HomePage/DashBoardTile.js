
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ApiInterface } from '../apiInterface';




const ChunkedGrid = ({ items, onItemPress }) => {
  // Function to chunk the array into groups of 3
  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const chunkedItems = chunkArray(items, 3);

  return (
    <>
      {chunkedItems.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((item, index) => {


            const iconUrl = item?.Icon || '';
            const backgroundUrl = item?.BackgroundImage2x || '';


            return (
              <TouchableOpacity
                key={index}
                style={styles.cell}
                onPress={() => onItemPress(item?.DisplayName)} 
              >
                <View style={styles.cardView}>
                  {backgroundUrl ? (
                    <Image source={{ uri: backgroundUrl }} style={styles.thumbnail} />
                  ) : null}
                  <View style={styles.iconContainer}>
                    {iconUrl ? (
                      <Image source={{ uri: iconUrl }} style={styles.icon} />
                    ) : null}
                    <Text style={styles.memName}>{item?.DisplayName}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </>
  );
};


const DashboardTile = () => {
  const navigation = useNavigation();
  const [landingMenus, setLandingMenus] = useState([]);

  useEffect(() => {
    const fetchLandingMenus = async () => {
      const requestIconsData = {
        ID: 'EBC475B2-369A-496E-B8B2-AE7F4E846781',
        ParentID: '77209816-9A24-423A-AD28-86DAEFC468FD',
        DeviceInfo: ['deviceInfo'],
        MemberID: '00026 - 00',
      };

      try {
        const iconsData = await ApiInterface.getIcons(requestIconsData);
        setLandingMenus(iconsData?.MemberApp?.LandingMenus || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchLandingMenus();
  }, []);

  const navigationMap = {
    'Today at a Glance': 'Today At Glance',
    'Dining': 'Dining',
    'Calendar of Events': 'Events',
    'Statements': 'Statements',
    'Golf': 'GolfScreen',
    'Pickleball': 'PickleballScreen',
    'Photo Gallery': 'GalleryScreen',
    'Activities': 'ActivitiesScreen',
    'Fitness & Spa': 'FitnessScreen',
    'Gift Card': 'GiftCardScreen',
    'My Guest': 'MyGuestScreen',
    'Important Club Numbers': 'ClubNumbersScreen',
    'Member Directory': 'MemberDirectoryScreen',
    'Member ID': 'MemberIDScreen',
    'Grab My Bag': 'GrabBagScreen',
  };

  const onItemPress = (displayName) => {
    const destination = navigationMap[displayName];
    if (destination) {
     
        navigation.navigate(destination);
    
    } else {
      Alert.alert('No Screen Found', `No navigation mapped for ${displayName}`);
    }
  };

  return <ChunkedGrid items={landingMenus} onItemPress={onItemPress} />;
};

export default DashboardTile;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
 
  },
  cell: {
    width: '33%',
    margin: 2,
    padding: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cardView: {
    width: '100%',
    height: 125,
  },
  thumbnail: {
    width: '100%',
    height: 125,
    resizeMode: 'cover',
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 125,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 33,
    height: 33,
    marginTop: 20,
    resizeMode: 'contain',
  },
  memName: {
    marginTop: 10,
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal:10
  },
  bottomLine: {
    width: '100%',
    height: 0.5,
    backgroundColor: 'black',
    opacity: 0.2,
    position: 'absolute',
    bottom: 0,
  },
  rightLine: {
    width: 0.5,
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.2,
    position: 'absolute',
    right: 0,
  },
});

