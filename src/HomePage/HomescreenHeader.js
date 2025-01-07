
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import DashboardTile from './DashboardTile';

const HomescreenHeader = ({ dashboardData, navigation }) => {

  return (
    <View style={styles.headerContainer} >
      <Image
        source={require('../images/icon_profile_bg.png')}
        style={styles.overlay} />
      <View style={styles.covidRulesContainer}>
        <Text style={styles.covidRulesText}>COVID Rules</Text>
      </View>

      <View style={styles.notificationContainer}>
        <Image
          style={styles.chatBotIcon}
          //   source={require('../images/icon_chatbot.png')}
          resizeMode="contain"
        />
        <Image
          style={styles.notificationIcon}
          //   source={require('../images/icon_notification.png')}
          resizeMode="contain"
        />
      </View>

      <View style={styles.logoContainer}>
        {/* <Image
          style={styles.logoImage}
          resizeMode="contain"
        /> */}
      </View>

      {/* <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <Image style={styles.profileImage}
            source={
              //  dashboardData.ProfilePic
              //    ? { uri: dashboardData.ProfilePic } :
                  require('../images/Lia.jpg')
              }
            resizeMode="cover" />
          <View style={styles.profileDetails}>
            <Text style={styles.memberName}>{dashboardData.MemberNameDisplay}</Text>
            <Text style={styles.profileText}>Profile</Text>
          </View>
        </View>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.timeText}>{dashboardData.DBoardTime}</Text>
          <Text style={styles.dateText}>{dashboardData.DBoardDate}</Text>
        </View>
        <View style={styles.weatherLocationContainer}>
          <View style={styles.weatherContainer}>
            <Image
              style={styles.weatherIcon}
              // source={require('../images/icon_weather.png')}
              resizeMode="contain"
            />
            <Text style={styles.temperatureText}>25°C</Text>
          </View>
          <Text style={styles.locationText}>Los Angeles</Text>
          <Text style={styles.detailsText}>Clear Sky</Text>
        </View>
      </View> */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={{ top: 100, left: 20 }}
      >
        <Image
          // key={file || "default"} 
          source={
            // file ? { uri: file } :
            require('../images/Lia.jpg')}
          style={styles.headerImage}
        />
      </TouchableOpacity>
      <View style={styles.infoSection}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <View style={styles.leftsection}>

          {/* <TouchableOpacity onPress={onProfilePress}> */}

          {/* <Text style={styles.memname}>{user.username}</Text> */}
          <Text style={styles.memname}>{dashboardData.MemberNameDisplay}</Text>
          {/* </TouchableOpacity> */}
          <Text style={styles.infoText}>Profile</Text>
        </View>
        </TouchableOpacity>
        <View style={styles.middlesection}>
          {/* <TouchableOpacity onPress={pickImage}> */}
          
            <Text style={styles.infoTime}>{dashboardData.DBoardTime}</Text>
            <Text style={styles.infoText}>{dashboardData.DBoardDate}</Text>
          
        </View>
        <View style={styles.rightsection}>
          <Text style={styles.weather}>50°</Text>
          <Text style={styles.infoText}>Los Angeles</Text>
          <Text style={styles.infoText}>Clear Sky</Text>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: '35%',
    position: 'relative',
    alignItems: 'flex-start',

  },
  covidRulesContainer: {
    marginTop: 30,
    marginEnd: 100,
    color: "#00000",
    borderRadius: 15,
    padding: 8,
    display: 'none',
  },
  covidRulesText: {
    fontFamily: 'sf_semibold',
    color: 'white',
    fontSize: 17,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  notificationContainer: {
    position: 'absolute',
    top: 20,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatBotIcon: {
    width: 30,
    height: 28,
  },
  notificationIcon: {
    width: 30,
    height: 28,
    marginLeft: 20,
  },
  logoContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  logoImage: {
    width: 60,
    height: 60,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 30, // For circular effect
  },
  headerImage: {
    width: 70,
    height: 70,
    borderRadius: 40,
    position: 'absolute',

    zIndex: 1,
    borderWidth: 1,
    borderColor: '#fff',
    padding: 20,
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  leftsection: {
    flex: 1,
  },
  middlesection: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',/
    // textAlign:'center',
    paddingHorizontal:10
  },
  rightsection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  memname: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  profiletext: {
    fontSize: 14,
    color: '#fff',
  },
  infoTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  infoDate: {
    fontSize: 10,
    color: '#fff',
  },
  weather: {
    fontSize: 18,
    color: '#fff',
  },
  weather2: {
    fontSize: 14,
    color: '#fff',
  },
  infoText: {
    color: '#fff',
    fontSize: 12,
  },
  // profileContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   width: '100%',
  //   padding: 10,
  //   marginTop: 100,
  // },
  // profileImageContainer: {
  //   flexDirection: 'column',  // Stack profileImage and profileDetails vertically
  // },
  // profileImage: {
  //   width: 70,
  //   height: 70,
  //   borderColor: 'white',
  //   borderWidth: 2,
  //   borderRadius: 55,
  // },
  // // profileDetails: {
  //   marginTop: 10,  // Add spacing between image and details
  // },

  // memberName: {
  //   fontFamily: 'sf_semibold',
  //   color: 'white',
  //   fontSize: 15,
  // },
  // profileText: {
  //   color: 'white',
  //   fontSize: 12,
  // },
  // dateTimeContainer: {
  //   // flex: 1, 
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginLeft: 10,
  //   marginHorizontal: 20,

  // },
  // timeText: {
  //   fontFamily: 'sf_semibold',
  //   color: 'white',
  //   fontSize: 18,
  // },
  // dateText: {
  //   fontFamily: 'sf_semibold',
  //   color: 'white',
  //   fontSize: 12,
  // },
  // weatherLocationContainer: {
  //   alignItems: 'flex-end',
  // },
  // weatherContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // weatherIcon: {
  //   width: 25,
  //   height: 25,
  // },
  // temperatureText: {
  //   fontFamily: 'sf_semibold',
  //   color: 'white',
  //   fontSize: 18,
  //   marginLeft: 5,
  // },
  // locationText: {
  //   fontFamily: 'sf_semibold',
  //   color: 'white',
  //   fontSize: 12,
  // },
  // detailsText: {
  //   fontFamily: 'sf_semibold',
  //   color: 'white',
  //   fontSize: 10,
  // },
});

export default HomescreenHeader;
