import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image,FlatList, ScrollView, Modal, Pressable,ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import App from '../../App';
import { Avatar, AvatarBadge, AvatarGroup, AvatarImage, AvatarFallbackText } from '../../components/ui/avatar';
import { Button, ButtonText } from '../../components/ui/button';
import { Heading } from '../../components/ui/heading';
import { Center } from '../../components/ui/center';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from "expo-image-picker";

import deviceInfo from '../DeviceInfo';
import DashBoardTile from './DashBoardTile';
import HomescreenHeader from './HomescreenHeader'



// import deviceInfo from '../DeviceInfo';
import { ApiInterface } from '../apiInterface';
import DashboardTile from './DashBoardTile';








// import Profile from '@/src/Components/Profile/Profile';
// const user = useContext(UserContext);
// import { useNavigation } from '@react-navigation/native';
// import UserContext from '../userContext';
// Custom hook for fetching the current time and date
const useDateTime = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const formattedTime = `${(hours % 12 || 12).toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
            const formattedDate = now.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            });

            setCurrentTime(formattedTime);
            setCurrentDate(formattedDate);
        };

        updateDateTime(); // Initial call
        const timer = setInterval(updateDateTime, 60000);

        return () => clearInterval(timer);
    }, []);

    return { currentTime, currentDate };
};





const ModalComponent = ({ visible, onRequestClose, onLogout }) => {
    return (
        <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onRequestClose}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>Are you sure you want to log out?</Text>
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity onPress={onLogout} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>Logout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onRequestClose} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const Footer = () => {
    return (
        <View style={styles.footer}>
            <Text style={{ color: '#fff', fontSize: 15 }}>Link to Member Website</Text>
        </View>
    );
};




// const HomeScreen = ({ route }) => {
//     const navigation = useNavigation();
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true); // To control the loading indicator
//     const { name } = route.params || {};
//     const [fname, setFName] = useState(name);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             const token = await AsyncStorage.getItem('authToken');
//             if (!token) {
//                 navigation.replace('Login');
//                 return;
//             }

//             // Simulate a 2-second delay before fetching user data
//             setTimeout(async () => {
//                 const fetchedUser = await getUserData(token, name);
//                 if (fetchedUser) {
//                     setUser(fetchedUser);
//                 } else {
//                     await AsyncStorage.removeItem('authToken');
//                     navigation.replace('Login');
//                 }
//                 setLoading(false); // Hide loading after data is fetched
//             }, 2000);
//         };

//         fetchUserData();
//     }, [navigation, name]);

//     const getUserData = async (token, name) => {
//         if (token === 'Token1') {
//             return { username: name };
//         }
//         return null;
//     };

//     const items = [
//         'Today at a Glance', 'Dining', 'Calendar of Events', 'Statements', 'Golf', 'Pickleball',
//         'Photo Gallery', 'Activities', 'Fitness & Spa', 'Gift Card', 'My Guest', 'Important Club Numbers',
//         'Member Directory', 'Member ID', 'Grab My Bag',
//     ];

//     const handleProfilePress = () => {
//         setIsModalVisible(true);
//     };

//     const handleLogout = async () => {
//         await AsyncStorage.removeItem('authToken'); // Clear the token
//         setIsModalVisible(false);
//         navigation.replace('Login'); // Use replace to prevent back navigation
//     };

//     const closeModal = () => {
//         setIsModalVisible(false);
//     };

//     const navigationMap = {
//         'Today at a Glance': 'GlanceMain',
//         'Dining': 'Dining',
//         'Calendar of Events': 'Events',
//         'Statements': 'Statements',
//         'Golf': 'GolfScreen',
//         'Pickleball': 'PickleballScreen',
//         'Photo Gallery': 'GalleryScreen',
//         'Activities': 'ActivitiesScreen',
//         'Fitness & Spa': 'FitnessScreen',
//         'Gift Card': 'GiftCardScreen',
//         'My Guest': 'MyGuestScreen',
//         'Important Club Numbers': 'ClubNumbersScreen',
//         'Member Directory': 'MemberDirectoryScreen',
//         'Member ID': 'MemberIDScreen',
//         'Grab My Bag': 'GrabBagScreen',
//     };

//     const onItemPress = (item) => {
//         const destination = navigationMap[item];
//         if (destination) {
//             navigation.navigate(destination);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             {loading ? (
//                         <ImageBackground source={require('../images/CobaltLoginImg.png')} style={styles.container} resizeMode="cover">
//                 <ActivityIndicator size="large" color="#0D92F4" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
//                 </ImageBackground>
//             ) : (
//                 <>
//                     {user && <DashBoardHeader onProfilePress={handleProfilePress} user={user} />}
//                     <ScrollView style={{ flex: 1, marginBottom: 20 }}>
//                         <View style={{ paddingBottom: 20, paddingRight: 10 }}>
//                             <TouchableOpacity style={styles.viewButton}>
//                                 <Text style={styles.viewText}>View News</Text>
//                             </TouchableOpacity>
//                         </View>
//                         <ChunkedGrid items={items} onItemPress={onItemPress} />
//                         <Footer />
//                     </ScrollView>
//                 </>
//             )}
//             <ModalComponent
//                 visible={isModalVisible}
//                 onRequestClose={closeModal}
//                 onLogout={handleLogout}
//             />
//         </View>
//     );
// };





const HomeScreen = ({ route }) => {
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // To control the loading indicator
    



    const [socialData, setSocialData] = useState([]);
    const [dashboardData, setDashboardData] = useState({});
  
    useEffect(() => {
      const fetchDashboardData = async () => {
        const requestData = {
          ID: "EBC475B2-369A-496E-B8B2-AE7F4E846781",
          ParentID: "77209816-9A24-423A-AD28-86DAEFC468FD",
          DeviceInfo: [deviceInfo],  
          IsAdmin: "0",
          MemberID: "00026 - 00",
          Role: "",
          UserId: "4431",
          UserName: "Wesselman, Bob",
        };
  
        try {
          // const response = await fetch('https://cobaltportal.mycobaltsoftware.com/cssi.cobalt.member.wrapper.EngDev/api/member/GetDashboard', {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify(requestData),
          // });
          
          const data = await ApiInterface.getDashboard(requestData);
          setSocialData(data.ConnectWithUs || []);
          setDashboardData(data)
        } catch (error) {
          console.error('Error fetching dashboard dataaa:', error);
        }
      };
  
      fetchDashboardData();
    }, []);







   

    const [landingMenus, setLandingMenus] = useState([]);
    useEffect(() => {
        const fetchLandingMenus = async () =>{
            const requestIconsData = {
                ID: "EBC475B2-369A-496E-B8B2-AE7F4E846781",
                ParentID: "77209816-9A24-423A-AD28-86DAEFC468FD",
                DeviceInfo: [deviceInfo],  
                MemberID: "00026 - 00",
              };
      
              try {
                // const response = await fetch('https://cobaltportal.mycobaltsoftware.com/cssi.cobalt.member.wrapper.EngDev/api/member/GetIcons', {
                //   method: 'POST',
                //   headers: {
                //     'Content-Type': 'application/json',
                //   },
                //   body: JSON.stringify(requestIconsData),
                // });
                const iconsData = await ApiInterface.getIcons(requestIconsData);
                setLandingMenus(iconsData.MemberApp.LandingMenus);
              } catch (error) {
                console.error('Error fetching data:', error);
              }
        };
        fetchLandingMenus();
    },[]);
    
    const renderItem = ({ item }) => <DashBoardTile item={item} />;
    









    // State to store the username
    // const [username, setUsername] = useState('');

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         const token = await AsyncStorage.getItem('authToken');
    //         if (!token) {
    //             navigation.replace('Login');
    //             return;
    //         }

    //         // Fetch the username from AsyncStorage
    //         setTimeout(async () => {

    //         const storedUsername = await AsyncStorage.getItem('userData');
    //         if (storedUsername) {
    //             setUsername(storedUsername);
    //             const fetchedUser = await getUserData(token, storedUsername);
    //             if (fetchedUser) {
    //                 setUser(fetchedUser);
    //             } else {
    //                 await AsyncStorage.removeItem('authToken');
    //                 navigation.replace('Login');
    //             }
    //         }

    //         setLoading(false); // Hide loading after data is fetched
    //     }, 2000);

    //     };

    //     fetchUserData();
    // }, [navigation]);

    // const getUserData = async (token, name) => {
    //     if (token === 'Token1') {
    //         return { username: name };
    //     }
    //     return null;
    // };

    const items = [
        'Today at a Glance', 'Dining', 'Calendar of Events', 'Statements', 'Golf', 'Pickleball',
        'Photo Gallery', 'Activities', 'Fitness & Spa', 'Gift Card', 'My Guest', 'Important Club Numbers',
        'Member Directory', 'Member ID', 'Grab My Bag',
    ];

    const handleProfilePress = () => {
        setIsModalVisible(true);
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem('authToken'); // Clear the token
        setIsModalVisible(false);
        navigation.replace('Login'); // Use replace to prevent back navigation
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

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

    const onItemPress = (item) => {
        const destination = navigationMap[item];
        if (destination) {
            navigation.navigate(destination);
        }
    };

    return (
        <View style={styles.container}>
            {/* {loading ? (
                <ImageBackground source={require('../images/CobaltLoginImg.png')} style={styles.container} resizeMode="cover">
                    <ActivityIndicator size="large" color="#0D92F4" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
                </ImageBackground>
            ) : ( */}
                <>
                    {/* Pass the username to the DashBoardHeader component */}
                    {/* {user && <DashBoardHeader onProfilePress={handleProfilePress} user={user} username={username} />} */}
                    {/* <DashBoardHeader onProfilePress={handleProfilePress} /> */}
                    <HomescreenHeader dashboardData = {dashboardData}/>
                    <ScrollView style={{ flex: 1}}>
                        <View style={{ paddingBottom: 20, paddingRight: 10 }}>
                            <TouchableOpacity style={styles.viewButton}>
                                <Text style={styles.viewText}>View Newss</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <ChunkedGrid items={landingMenus} onItemPress={onItemPress} /> */}
                        <DashboardTile/>
                        {/* <FlatList
                data={landingMenus}
                keyExtractor={(item) => item.MenuID.toString()} 
                renderItem={renderItem}
                numColumns={3}
                // contentContainerStyle={styles.recyclerView}
          /> */}
                        <Footer />
                    </ScrollView>
                </>
            {/* )} */}
            <ModalComponent
                visible={isModalVisible}
                onRequestClose={closeModal}
                onLogout={handleLogout}
            />
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        height:'100%'
    },
    background: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        justifyContent: 'flex-start',
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
    headerAvatar: {
        top: 100,
        left: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        // overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: '#fff'
    },
    // avatarImage: {
    //     bottom: 0,
    //     height: '100%',
    //     left: 0,
    //     opacity: 0,
    //     position: 'absolute',
    //     right: 0,
    //     top: 0,
    //     width: '100%',
    //     zIndex:-1, 
    //     display:'flex'


    // },

    infoSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        left: 20,
        right: 20,
    },
    leftsection: {
        flex: 1,
    },
    middlesection: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
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
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    infoDate: {
        fontSize: 14,
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
        fontSize: 14,
    },
    viewButton: {
        borderWidth: 1,
        borderColor: '#5773A2',
        paddingVertical: 5,
        borderRadius: 25,
        width: 150,
        marginVertical: 20,
        alignSelf: 'flex-end',
    },
    viewText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#5773A2',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    gridItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1080A0',
        borderWidth: 1,
        borderColor: 'white',
        height: 120,
        width:'33.3%'
    },
    gridText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        // paddingHorizontal: 10,
        textAlign: 'center',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: 300,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    modalButton: {
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
    },
    footer: {
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#08c3f8',
        marginBottom:10

    },
});

export default HomeScreen;
