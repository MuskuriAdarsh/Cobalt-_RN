import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AddMember from './AddMember';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ApiInterface } from '../../apiInterface';
import { Touchable } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import {
    Button,
    ButtonText,
    ButtonSpinner,
    ButtonIcon,
    ButtonGroup,
} from '@/components/ui/button';
import { fonts } from 'react-native-elements/dist/config';
import Reservations from './Reservations';

const TablePreferenceCheckboxList = () => {
    const [preferences, setPreferences] = useState([]);
    const [selectedPreference, setSelectedPreference] = useState(null);

    useEffect(() => {
        // API call to fetch table preferences
        const fetchPreferences = async () => {
            const url =
                'https://cobaltportal.mycobaltsoftware.com/cssi.cobalt.member.wrapper.EngDev/api/dining/GetTablePreferanceDetails';
            const requestData = {
                DeviceInfo: [
                    {
                        AppVersion: '2.5.5',
                        Browser: 'Android',
                        DeviceModel: 'samsung SM-E146B',
                        DeviceType: 'Android',
                        OSVersion: '14',
                        OriginatingIP: '192.168.1.108',
                        SessionID: '5ee1b01c214fc3ca',
                        SourcePortNo: '0',
                    },
                ],
                CompanyCode: '00',
                FilterDate: '2025-01-16',
                FilterTime: '09:45 AM',
                RestaurantID: '18A98F91-44AA-4777-9BE6-24F4D517FEC4',
            };

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                });
                const data = await response.json();

                if (data.ResponseCode === 'Success') {
                    setPreferences(data.TablePreferanceDetails);
                } else {
                    console.error('Error fetching preferences:', data.ResponseMessage);
                }
            } catch (error) {
                console.error('Error fetching preferences:', error);
            }
        };

        fetchPreferences();
    }, []);

    const selectPreference = (id) => {
        setSelectedPreference(id);
    };

    return (
        <View style={styles.scrollContainer}>
            <View style={{ width: '95%' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Add a Special Request (Optional)</Text>

            </View>
            <View style={styles.checkboxRow}>
                {preferences.map((preference) => (
                    <CheckBox
                        key={preference.TablePreferenceID}
                        title={preference.PreferenceName}
                        checked={selectedPreference === preference.TablePreferenceID}
                        onPress={() => selectPreference(preference.TablePreferenceID)}
                        containerStyle={styles.checkboxContainer}
                        textStyle={styles.checkboxText}
                    />
                ))}
            </View>
        </View>
    );
};
const DiningFooter = () => {
    return (
        <View style={styles.diningFooter}>
            <Text style={styles.footerText}>Dining Policy</Text>
            {/* <Text></Text> */}
        </View>
    );
}

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds
    const [isActive, setIsActive] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            setIsActive(true);
            return () => setIsActive(false);
        }, [])
    );

    useEffect(() => {
        let interval;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            clearInterval(interval);
            alert('Time is up!');
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    return (
        <View style={styles.timerContainer}>
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        </View>
    );
};

const InfoItem = ({ label, value }) => (
    <View style={styles.infoItem}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue} numberOfLines={1} ellipsizeMode="tail">
            {value}
        </Text>
    </View>
);

const DiningRestaurant = ({ route, navigation }) => {
    const [dashboardData, setDashboardData] = useState({});
    const { formatDate1, clickedItem, partysize, restaurantName } = route.params;
    const [textColors, setTextColors] = useState(new Array(partysize).fill('#08c3f8'));

    useEffect(() => {
        const fetchDashboardData = async () => {
            const requestData = {
                ID: "EBC475B2-369A-496E-B8B2-AE7F4E846781",
                ParentID: "77209816-9A24-423A-AD28-86DAEFC468FD",
                DeviceInfo: "[deviceInfo]", // Placeholder, replace with actual device info if necessary
                IsAdmin: "0",
                MemberID: "00026 - 00",
                Role: "",
                UserId: "4431",
                UserName: "Wesselman, Bob",
            };

            try {
                const data = await ApiInterface.getDashboard(requestData);
                setDashboardData(data);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchDashboardData();
    }, []);

    if (!formatDate1 || !clickedItem || !partysize || !restaurantName) {
        return (
            <View>
                <Text>Error: Missing formatDate or clickedItem</Text>
            </View>
        );
    }
    const [removedNames, setRemovedNames] = useState(new Array(partysize).fill(false));

    // const handleRemoveName = (index) => {
    //     const updatedRemovedNames = [...removedNames];
    //     updatedRemovedNames[index] = true; 
    //     setRemovedNames(updatedRemovedNames);
    // };
    const handleRemoveName = (index) => {
        const updatedRemovedNames = [...removedNames];
        const updatedTextColors = [...textColors];

        updatedRemovedNames[index] = true;
        updatedTextColors[index] = '#000000';

        setRemovedNames(updatedRemovedNames);
        setTextColors(updatedTextColors);
    };
    const AddMember = () => {
        navigation.navigate('AddMember');
    };
    const AddGuest = () => {
        navigation.navigate('AddGuest');
    };
    const BackToReservations = () => {
        const navigation = useNavigation();
        navigation.navigate('Reservations');
    };
    
    

const BackToHome = () => {
    const navigation = useNavigation(); 
    navigation.navigate('Home');
};

    return (
        <ScrollView
            contentContainerStyle={styles.scrollContentContainer}
            style={styles.scrollView}>
            <View style={styles.container}>

                <View style={styles.topContainer}>
                    <View style={styles.topBox}>
                        <TouchableOpacity onPress={BackToReservations}>
                        <Text>Back</Text>
                      
                        </TouchableOpacity>
                        <TouchableOpacity onPress={BackToHome}>
                       
                        <Text>Home</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomBox}> {/* Changed BottomBox to bottomBox to match convention */}
                        <InfoItem label="Restaurant" value={restaurantName} />
                        <InfoItem label="Restaurant Time" value={clickedItem?.TimeSlot} />
                        <InfoItem label="Requested Date" value={formatDate1} />
                    </View>
                </View>

                <CountdownTimer />
                <Text style={styles.patronsText}>Add Multiple patrons</Text>

                <View style={{ width: '95%', alignItems: 'center', marginBottom: 30 }}>
                    <View style={styles.memsBlock}>
                        <TouchableOpacity onPress={AddMember} style={{ width: '80%' }}>
                            <Text
                                style={[
                                    styles.addMemText,
                                    styles.memName,
                                    styles.defaultName,
                                    { color: removedNames[0] ? '#000000' : textColors[0] },
                                ]}
                            >
                                {!removedNames[0] ? dashboardData.MemberNameDisplay : "Reservation"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleRemoveName(0)}>
                            <Text style={[styles.addMemText, styles.memRemove]}>X</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => alert("Add member functionality")} style={styles.otherStyle}>
                            <Text style={[styles.addMemText, styles.memAdd]}>+</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Loop through remaining members */}
                    {Array.from({ length: Math.max(partysize - 1, 0) }).map((_, index) => (
                        <View style={styles.memsBlock} key={index}>
                            <TouchableOpacity onPress={AddGuest} style={{ width: '80%' }}>
                                <Text style={[styles.addMemText, styles.memName]}>
                                    {!removedNames[index + 1] ? "Reservation" : "Reservation"}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handleRemoveName(index + 1)}>
                                <Text style={[styles.addMemText, styles.memRemove]}>X</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => alert(`Add member ${index + 1}`)} style={styles.otherStyle}>
                                <Text style={[styles.addMemText, styles.memAdd]}>+</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                <TablePreferenceCheckboxList />
                <View style={{ width: '95%', marginBottom: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Reservation Comments (Optional)</Text>
                    <Textarea
                        size="md"
                        isReadOnly={false}
                        isInvalid={false}
                        isDisabled={false}
                        className="w-64"
                        style={{ borderWidth: 1, height: 100, borderRadius: 15, borderColor: '#666' }}
                    >
                        <TextareaInput />
                    </Textarea>
                </View>

                <Button size="md" variant="solid" action="primary" style={{ backgroundColor: '#5773A2', borderRadius: 20, marginBottom: 20 }}>
                    <ButtonText style={{ paddingHorizontal: 20, fontSize: 18, color: '#fff', paddingVertical: 5 }}>SUBMIT</ButtonText>
                </Button>
                < DiningFooter />

            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1, // Ensure it takes up the full screen
    },
    container: {
        alignItems: 'center',
        width: '100%',
    },
    scrollContentContainer: {
        paddingVertical: 10,
        alignItems: 'center',
    },
    scrollContainer: {
        flex: 1,
        // padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    checkboxRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    checkboxContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        // marginRight: 10,
        // marginBottom: 10, 
    },
    checkboxText: {
        fontSize: 13,
    },
    topContainer: {
        width: '95%',
        backgroundColor: '#666666',
        // justifyContent: 'flex-end',
        padding: 10,
        borderRadius: 3,
        height: 150,
    },
    topBox:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    bottomBox: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 'auto',
    },
    infoItem: {
        flex: 1,
        padding: 5,
    },
    infoValue: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        overflow: 'hidden',
    },
    infoLabel: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#fff',
    },
    removedName: {
        color: '#000000',
    },
    timerContainer: {
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#596D8E',
    },
    timerText: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    patronsText: {
        fontSize: 16,
        color: '#596D8E',
        borderWidth: 2,
        borderColor: '#596D8E',
        paddingHorizontal: 30,
        paddingVertical: 4,
        borderRadius: 20,
        marginVertical: 10,
        fontWeight: 'bold',
    },
    memsBlock: { flexDirection: 'row', width: '100%', borderWidth: 1, borderColor: '#666666', marginBottom: 10, borderRadius: 5 },
    addMemText: { fontSize: 16, paddingVertical: 5, paddingHorizontal: 10 },
    memName: { width: '80%' },
    // memRemove:{width:'20%'},
    memAdd: { color: '#08c3f8', fontSize: 18 },
    defaultName: { color: '#08c3f8' },
    otherStyle: {
        marginLeft: 10, // Adds some spacing between the X button and the + button
        fontSize: 24,
        color: '#08c3f8',
        justifyContent: 'flex-end',
    },
    diningFooter: {
        // position: 'absolute',
        width: '100%',
        bottom: 0,
        left: 0,
        right: 0,
        // backgroundColor: '#fff',
        paddingVertical: 15,
        alignItems: 'center',
        // elevation: 5, // Add a shadow effect for visibility
    },
    footerText: {
        color: '#08c3f8',
        fontWeight: 'bold',
        fontSize: 18,
    },
});


export default DiningRestaurant;


