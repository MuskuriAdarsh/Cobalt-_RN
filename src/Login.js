import React, { useState, useRef, useEffect } from 'react';
import { Animated, Image, StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Modal, Alert, ActivityIndicator,Platform } from 'react-native';
// import { Icon } from '@gluestack-ui/icon';

import { useNavigation } from '@react-navigation/native';
import Home from './HomePage/Home';
// import deviceInfo from './DeviceInfo';
import * as Device from 'expo-device';
// import DeviceInfo from 'react-native-device-info';

import * as Network from 'expo-network';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { Icon } from '@/components/ui/icon';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    Button,
    ButtonText,
    ButtonSpinner,
    ButtonIcon,
    ButtonGroup,
} from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';

const Login = ({ navigation }) => {

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [resetpassusername, setResetPassUsername] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLogoAnimationComplete, setIsLogoAnimationComplete] = useState(false);
    const [isInputAnimationComplete, setIsInputAnimationComplete] = useState(false);
    const [isRememberMe, setIsRememberMe] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    // Animated values for sliding inputs
    const slideAnimLeft = useRef(new Animated.Value(-500)).current;  // Start from left
    const slideAnimRight = useRef(new Animated.Value(500)).current;  // Start from right
    const slideAnimTop = useRef(new Animated.Value(100)).current;    // For logo animation

    useEffect(() => {
        // Animate logo to top
        Animated.timing(slideAnimTop, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => {
          setIsLogoAnimationComplete(true); // Set logo animation complete
        });
    
        // Slide the inputs in after the logo animation completes
        setTimeout(() => {
          Animated.timing(slideAnimLeft, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }).start();
    
          Animated.timing(slideAnimRight, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }).start(() => {
            setIsInputAnimationComplete(true);  // Mark the input animation as complete
          });
        }, 1000);  // Wait for 1 second before starting input animations
      }, []);
    
    




    // useEffect(() => {
    //     // Animate logo to top
    //     Animated.timing(slideAnimTop, {
    //         toValue: 0,
    //         duration: 1000,
    //         useNativeDriver: true,
    //     }).start(() => {
    //         setIsLogoAnimationComplete(true); // Set logo animation complete
    //     });

    //     // Slide the inputs in after the logo animation completes
    //     setTimeout(() => {
    //         Animated.timing(slideAnimLeft, {
    //             toValue: 0,
    //             duration: 1000,
    //             useNativeDriver: true,
    //         }).start();

    //         Animated.timing(slideAnimRight, {
    //             toValue: 0,
    //             duration: 1000,
    //             useNativeDriver: true,
    //         }).start(() => {
    //             setIsInputAnimationComplete(true);  
    //         });
    //     }, 1000);  
    //     checkToken();
    // }, []);

        
   
    


 
    //   const handleLogin = async () => {
    //     if (username === '' || password === '') {
    //       Alert.alert('Validation Error', 'Username and Password are required.');
    //       return;
    //     }
    
    //     setIsLoading(true);
    
    //     // Simulate API call for token generation
    //     try {
    //       const response = await fakeApi(username, password);
    //       if (response.success) {
    //         await AsyncStorage.setItem('authToken', response.token);
    //         // console.log(username);
            
    //         navigation.replace('Home',{ name: username });
    //       } else {
    //         Alert.alert('Login Failed', response.message);
    //       }
    //     } catch (error) {
    //       Alert.alert('Error', 'An error occurred during login.');
    //       console.error(error);
    //     } finally {
    //       setIsLoading(false);
    //     }
    //   };
    
    
    //   const fakeApi = async (username, password) => {
    //     return new Promise((resolve) => {
    //       setTimeout(async () => {
    //         if ((username === 'Lia' && password === 'Lia') || (username === 'Lio' && password === 'Lio')) {
    //           // Store the username in AsyncStorage
    //           await AsyncStorage.setItem('userData', username);
      
    //           resolve({
    //             success: true,
    //             token: 'Token1',
    //           });
    //         } else {
    //           resolve({
    //             success: false,
    //             message: 'Invalid credentials',
    //           });
    //         }
    //       }, 1000);
    //     });
    //   };
      


  
    // const handleLogin = async () => {
    //     if (!username || !password) {
    //         Alert.alert('Validation Error', 'Username and Password are required.');
    //         return;
    //     }
    
    //     setIsLoading(true);
    
    //     try {
    //         const deviceId = Device.osBuildId || 'Unknown';
    //         const deviceName = Device.deviceName || 'Unknown';
    //         const systemVersion = Device.osVersion || 'Unknown';
    //         const appVersion = '1.0.0'; 
    //         const deviceModel = Device.modelName || 'Unknown';
    
    //         let originatingIP = 'Unknown';
    //         try {
    //             originatingIP = await Network.getIpAddressAsync();
    //         } catch (err) {
    //             console.error('Failed to fetch IP address:', err);
    //         }
    
    //         const browser = Platform.OS === 'web' ? 'Web' : Platform.OS === 'ios' ? 'Safari' : 'Android';
    //         const deviceType = Platform.OS === 'ios' ? 'iOS' : 'Android';
    
    //         const loginData = {
    //             DeviceID: deviceId,
    //             DeviceInfo: [{
    //                 AppVersion: appVersion,
    //                 Browser: browser,
    //                 DeviceModel: deviceModel,
    //                 DeviceType: deviceType,
    //                 OSVersion: systemVersion,
    //                 OriginatingIP: originatingIP,
    //                 SessionID: 'd208b4fd3a6a27c4',
    //                 SourcePortNo: '0',
    //             }],
    //             MemberID: username,
    //             Password: password,
    //         };
    
    //         const response = await fetch(
    //             'https://cobaltportal.mycobaltsoftware.com/cssi.cobalt.member.wrapper.EngDev/api/Account/AuthenticateUser',
    //             {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify(loginData),
    //             }
    //         );
    
    //         const result = await response.json();
    //         console.log(result); // Debugging response
    
    //         if (result.ResponseCode === 'Success') {
    //             // if (result.Token) {
    //                 // await AsyncStorage.setItem('authToken', result.Token);
    //                 // await AsyncStorage.setItem('userData', username);
    //                 // navigation.replace('Home', { name: username });
    //                 navigation.navigate('Home');
    //             }
                
    //             // else {
    //             //     Alert.alert('Login Error', 'Token is missing in the response.');
    //             // }

    //         else if (result.ResponseCode === 'Fail') {
    //             Alert.alert('Login Failed', result.BrokenRules.Fields.join('\n'));
    //         } else {
    //             Alert.alert('Server Error', 'An unexpected response occurred.');
    //         }
    //     } catch (error) {
    //         Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    //         console.error(error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };


    
    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Validation Error', 'Username and Password are required.');
            return;
        }
    
        setIsLoading(true);
    
        try {
            console.log('Starting login process...');
    
            // Device information with fallbacks
            const deviceId = Device.osBuildId || 'Unknown';
            const deviceName = Device.deviceName || 'Unknown';
            const systemVersion = Device.osVersion || 'Unknown';
            const appVersion = '1.0.0'; // Hardcoded app version
            const deviceModel = Device.modelName || 'Unknown';
    
            // Fetching IP Address
            let originatingIP = 'Unknown';
            try {
                originatingIP = await Network.getIpAddressAsync();
            } catch (err) {
                console.error('Failed to fetch IP address:', err);
            }
    
            const browser = Platform.OS === 'web' ? 'Web' : Platform.OS === 'ios' ? 'Safari' : 'Android';
            const deviceType = Platform.OS === 'ios' ? 'iOS' : 'Android';
    
            // Prepare login data
            const loginData = {
                DeviceID: deviceId,
                DeviceInfo: [
                    {
                        AppVersion: appVersion,
                        Browser: browser,
                        DeviceModel: deviceModel,
                        DeviceType: deviceType,
                        OSVersion: systemVersion,
                        OriginatingIP: originatingIP,
                        SessionID: 'd208b4fd3a6a27c4',
                        SourcePortNo: '0',
                    },
                ],
                MemberID: username,
                Password: password,
            };
    
            // console.log('Login data prepared:', loginData);
    
            // Fetch request
            const response = await fetch(
                'https://cobaltportal.mycobaltsoftware.com/cssi.cobalt.member.wrapper.EngDev/api/Account/AuthenticateUser',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(loginData),
                }
            );
    
            // console.log('API response received:', response.status);
    
            // Handle non-2xx responses
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
            }
    
            const result = await response.json();
            // console.log('API response data:', result);
    
            // Handle response codes
            if (result.ResponseCode === 'Success') {
                // console.log('Login successful, navigating to Home screen.');
                navigation.navigate('Home'); // Change this to 'HomeScreen'
                // console.log(ApiInterface.getIcons)
            } else if (result.ResponseCode === 'Fail') {
                Alert.alert('Login Failed', result.BrokenRules?.Fields?.join('\n') || 'Unknown error.');
            } else {
                Alert.alert('Server Error', 'An unexpected response occurred.');
            }
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Error', `An unexpected error occurred: ${error.message}`);
        } finally {
            setIsLoading(false);
            console.log('Login process completed.');
        }
    };
    
    
      
    

    


    const handleIconPress = () => {
        setShowTooltip(!showTooltip);
    };

    // Handle Modal
    const openModal = () => {
        setIsModalVisible(true); // Show the modal
    };

    const closeModal = () => {
        setIsModalVisible(false); // Close the modal
    };

    // Handle Forgot Password submission
    const forgetPassSubmit = () => {
        if (resetpassusername.trim() === '') {
            alert('Please fill in the username');
            return;
        }

        if (!Array.isArray(users)) {
            console.error('Users array is not defined');
            alert('An error occurred. Please try again later.');
            return;
        }

        // Find the user in the users array
        const user = users.find(u => u.username === resetpassusername);

        if (user) {
            // Simulate sending password reset instructions (you might call an API here)
            alert('Password reset instructions have been sent to your email.');
            closeModal();  // Ensure this function is defined in your component
        } else {
            alert('Username not found');
        }
    };



    return (
        <ImageBackground source={require('./images/CobaltLoginImg.png')} style={styles.container} resizeMode="cover">
            {/* Logo Animation */}
            <Animated.View style={[styles.club_logo, { transform: [{ translateY: slideAnimTop }] }]}>
                <Image source={require('./images/Logo.png')} style={styles.club_logo} resizeMode="cover" />
            </Animated.View>

            {isLogoAnimationComplete && (
                <>
                    <View style={styles.devDiv}>
                        <Text style={styles.devText}>This is a Dev App</Text>
                    </View>

                    {/* Inputs Animation */}
                    <Animated.View style={[styles.inputRow, { transform: [{ translateX: slideAnimLeft }] }]}>
                        <Input
                            variant="underlined"
                            size="md"
                            isDisabled={false}
                            isInvalid={false}
                            isReadOnly={false}
                            style={styles.input}
                        >
                            <InputField placeholder='Username / Member ID' style={{ color: '#fff',paddingBottom:5 }} placeholderTextColor="#fff" 
                               value={username}
                               onChangeText={(text) => setUsername(text.trim())} />
                        </Input>

                        <TouchableOpacity onPress={handleIconPress} style={styles.iconborder}>
                            <Image
                                source={require('./images/tooltip_icon.png')}
                                resizeMode="contain"
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                        {showTooltip && (
                            <View style={styles.tooltip}>
                                <Text style={styles.tooltipText}>If using Member ID, use it in the format: 0####-##</Text>
                            </View>
                        )}
                    </Animated.View>

                    <Animated.View style={[styles.inputRow, { transform: [{ translateX: slideAnimRight }] }]}>
                        <Input
                            variant="underlined"
                            size="md"
                            isDisabled={false}
                            isInvalid={false}
                            isReadOnly={false}
                            style={styles.input}
                          
                        >
                            <InputField placeholder='Password' style={{ color: '#fff',paddingBottom:5 }} placeholderTextColor="#fff"   secureTextEntry={!isPasswordVisible}
                            value={password}
                            onChangeText={(text) => setPassword(text.trim())} />
                        </Input>
                        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.iconborder}>
                            <Image
                                source={isPasswordVisible ? require('./images/Show_pass.png') : require('./images/Hide_pass.png')}
                                style={styles.icon}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </Animated.View>

                    {/* Only show these elements after the input animation is complete */}
                    {isInputAnimationComplete && (
                        <>
                            <View style={styles.fullsection}>
                                <View style={styles.remember}>
                                    <TouchableOpacity onPress={() => setIsRememberMe(!isRememberMe)}>
                                        <Image source={isRememberMe ? require("./images/Check.png") : require("./images/Uncheck.png")} style={styles.checkicon} />
                                    </TouchableOpacity>
                                    <Text style={styles.remText}>Remember Me</Text>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={openModal}>
                                        <Text style={styles.forgot_passText}>Forgot Password?</Text>
                                    </TouchableOpacity>

                                    {/* <Button size="lg" variant="link" action="primary" onPress={openModal}>
                                        <ButtonText  style={styles.forgot_passText}>Forgot Password?</ButtonText>
                                    </Button> */}

                                </View>
                            </View>
                            {/* <TouchableOpacity onPress={handleLogin}>
                                <Text style={styles.login}>Login</Text>
                            </TouchableOpacity> */}
                            <Button size="md" variant="solid" action="primary" onPress={handleLogin} style={styles.login} >
                                <ButtonText style={{
                                    color: '#0D92F4', fontSize: 16,
                                    fontWeight: '450',width:'100%'
                                }}>Login</ButtonText>
                            </Button>

                            {/* Show the loader when isLoading is true */}
                            {isLoading && (
                                <View style={styles.loaderContainer}>
                                    <ActivityIndicator size="large" color="#0D92F4" />
                                </View>
                            )}

                            <TouchableOpacity>
                                <Image source={require('./images/finger_print.png')} style={styles.finger_print} />
                            </TouchableOpacity>

                            <View>
                                <Text style={styles.poweredPolicyText}>Powered by Cobalt Software™</Text>
                                <Text style={styles.poweredPolicyText}>Privacy Policy | Terms of Use</Text>
                            </View>
                        </>
                    )}
                </>
            )}

            {/* Modal for "Forgot Password" */}
            <Modal
                transparent={true}
                visible={isModalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={closeModal} style={styles.cross}>
                            <Image source={require('./images/cross.png')} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                        {/* <Icon as={CloseIcon} className="text-typography-500 m-2 w-4 h-4" /> */}
                        {/* <Camera color="#0D92F4" size={48} /> */}
                        <Image source={require('./images/ModeImg.png')} style={styles.lock_img} />
                        <Text style={styles.modalTitle}>Forgot Your Password?</Text>
                        <Text style={styles.inputLabel}>Enter your username*</Text>
                        <Input variant="underlined" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} value={resetpassusername} onChangeText={setResetPassUsername} style={styles.modalInput} >
                            <InputField
                                placeholder='Enter you username' style={{ color: '#000' }}
                            />
                        </Input>
                        <Text style={{ fontSize: 10, marginBottom: 40, textAlign: 'center' }}>
                            If you do not remember which username you registered with our system, please contact info@mycobaltsoftware.com
                        </Text>
                        <TouchableOpacity style={styles.modalButton} onPress={forgetPassSubmit}>
                            <Text style={styles.modalButtonText}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ImageBackground>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    loaderContainer: {
        position: 'absolute',
        top: height / 2 - 20,  // Adjust loader position based on screen height
        left: width / 2 - 20,  // Adjust loader position based on screen width
    },
    devDiv: {
        marginTop: height * 0.4, // Responsive top margin
        marginBottom: 20,
    },
    devText: {
        fontSize: height * 0.025, // Responsive font size
        color: '#fff',
        fontWeight: '500',
    },
    inputRow: {
        width: '90%', // Use percentage width to make it responsive
        flexDirection: 'row',
        alignItems: 'center',  // Align input and icon vertically
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',  // Align input and icon in a row
        width: '100%',  // Ensure the input container takes the full width
    },
    input: {
        height: 40,
        width: '100%',  // Full width of the container
        borderColor: '#fff',
        borderBottomWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        color: '#fff',
        fontSize: 16,
        backgroundColor: 'transparent',
        paddingHorizontal: 5
    },

    fullsection: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    remember: {
        flexDirection: 'row',
    },
    // checkbox:{
    //   width:50,
    //   height:20
    // },
    remText: {
        color: '#fff',
        marginLeft: 10,
        fontSize: 16,  // Adjust font size for responsiveness
    },
    forgot_passText: {
        color: '#fff',
        fontSize: 16,
        fontWeight:450,
    },
    icon: {
        width: 25,
        height: 25,
        marginLeft: 10,
       
    },
    iconborder: {
        position: 'absolute',
        right: 10,  // Position the icon to the right of the input
        top: 10,  // Align icon vertically with the input
    },
    checkicon: {
        width: 25,
        height: 25,
    },
    club_logo: {
        justifyContent: 'center',
        alignItems: 'center',
        // height: height * 0.07, 
        // width: width * 0.5,    
        height: 60,
        width: 210,
        position: 'absolute',
        top: height * 0.08,  // Adjust top position based on screen height
    },
    tooltip: {
        position: 'absolute',
        top: -55,
        left: 0,
        backgroundColor: '#fff',
        padding: 5,
        height: 50,
        borderRadius: 5,
        maxWidth: '100%',
    },
    tooltipText: {
        color: '#000',
        fontSize: 16,
    },
    login: {
        backgroundColor: '#fff',
        paddingVertical: 5,
        paddingHorizontal: width * 0.29,  // Responsive padding for login button
        marginTop: 30,
        borderRadius: 25,
        color: '#0D92F4',
        textAlign: 'center',


        width: '70%',
        marginBottom: 10,
    },
    finger_print: {
        marginTop: 20,
        marginBottom: 10,
        width: 50,
        height: 50,
    },
    poweredPolicyText: {
        textAlign: 'center',
        color: 'white',
        fontSize: height * 0.018,  // Adjust font size based on screen height
        margin: 5,
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '95%',
        height: '50%',  // Adjust modal height based on screen size
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: height * 0.02, // Adjust title size for responsiveness
        fontWeight: 'bold',
        marginBottom: 50,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#B7B7B7',
    },
    inputLabel: {
        fontSize: 18,
        paddingBottom: 10,
    },
    modalInput: {
        width: '90%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#f9f9f9',
        paddingVertical: 5,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#3A6D8C',
    },
    modalButtonText: {
        color: '#3A6D8C',
        fontSize: 16,
        textAlign: 'center',
    },
    lock_img: {
        width: 30,
        height: 40,
        marginBottom: 15,
    },
    cross: {
        position: 'absolute',
        top: 20,
        right: 20,
        width: 30,
        height: 30,
    },
});

