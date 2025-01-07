import React, { useState } from 'react';
import { Modal, ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Button, ButtonText } from '../../../components/ui/button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalComponent = ({ visible, onRequestClose, onLogout }) => {
    return (
        <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onRequestClose}>
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

const Profile = ({ route, navigation }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const { name } = route.params || {};


    const handleLogout = async () => {
        await AsyncStorage.removeItem('authToken'); // Clear the token
        setIsModalVisible(false); // Close the modal
        navigation.replace('Login'); // Use replace to prevent back navigation
    };

    const closeModal = () => {
        setIsModalVisible(false); // Close the modal
    };

    return (
        <View style={styles.profileTop}>
            <ImageBackground
                source={require('../../images/icon_profile_bg.png')}
                style={styles.background}
                pointerEvents="box-none"
            >
                <Image source={require('../../images/Lia.jpg')} style={styles.profileImage} />
                <View>
                    <Text style={{ position: 'absolute', top: 10, right: -30 }}>{name}</Text>
                </View>
            </ImageBackground>
            <View style={{ width: '60%' }}>
                <Text style={{ color: '#08c3f8', fontWeight: '500', fontSize: 12, textAlign: 'center', paddingVertical: 10 }}>
                    Privacy Policy | Terms of Use
                </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                <Button style={{ width: '45%' }}>
                    <ButtonText style={styles.buttonText}>Settings</ButtonText>
                </Button>
                <Button style={{ width: '45%' }} onPress={() => setIsModalVisible(true)}>
                    <ButtonText style={styles.buttonText}>Logout</ButtonText>
                </Button>
            </View>

            <ModalComponent
                visible={isModalVisible}
                onRequestClose={closeModal}
                onLogout={handleLogout}
            />
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    profileTop: {
        width: '100%',
        height: '23%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomWidth: 3,
        borderBottomColor: '#e0e0e0',
    },
    background: {
        width: '100%',
        height: '75%',
        flexDirection: 'row',
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
        top: 25,
        left: 20,
        borderWidth: 1,
        borderColor: '#fff',
    },
    buttonText: {
        textAlign: 'center',
        padding: 15,
        fontSize: 16,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    modalButton: {
        backgroundColor: '#08c3f8',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
