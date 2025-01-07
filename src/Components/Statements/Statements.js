import { StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList, ScrollView, Modal } from 'react-native';
import React, { useState, useRef } from 'react';

const tabs = [
    'All',
    'Activities',
    'Gold',

    'Tennis',
    'F&B',
    'Retail',
    'Other',
];

// CalendarTab for displaying the horizontal tab list
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
                horizontal={true}
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
                scrollEnabled={true} 
            />
            <TouchableOpacity style={styles.arrow} onPress={scrollRight}>
                <Text style={styles.arrowText}>{">"}</Text>
            </TouchableOpacity>
        </View>
    );
};





const All = () => {
    const Top = () => {
        const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
    
        // Function to open the modal
        const openModal = () => {
            setIsModalVisible(true);
        };
    
        // Function to close the modal
        const closeModal = () => {
            setIsModalVisible(false);
        };
    
        // Get current date information
        const currentDate = new Date();
        const month = currentDate.toLocaleString('default', { month: 'long' });
        const year = currentDate.getFullYear();
    
        return (
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, paddingHorizontal: 20, borderBottomWidth: 2, borderBottomColor: '#e0e0e0', borderRadius: 10 }}>
                <TouchableOpacity style={styles.date} onPress={openModal}>
                    <Text style={{ color: '#5773A2', textAlign: 'center', fontSize: 17 }}>{month}, {year}</Text>
                </TouchableOpacity>
                <View style={styles.total}>
                    <Text style={{ fontWeight: '500', fontSize: 18 }}>Total $ 0.00</Text>
                </View>
    
                {/* Modal Component */}
                <Modal
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0)' }}>
                        <View 
                            style={{
                                width: 300, 
                                height: 200, 
                                backgroundColor: 'white', 
                                padding: 20, 
                                // borderRadius: 3, 
                                // borderWidth: 0.5,
                                elevation: 10, // Added elevation for Android shadow effect
                            }}
                        >
                            <Text style={{ marginBottom: 20 }}>This is a modal</Text>
                            <TouchableOpacity onPress={closeModal} style={{ alignSelf: 'center' }}>
                                <Text style={{ color: '#5773A2' }}>Close Modal</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    };
    
    const PrevBalance = () => {
        return (
            <ScrollView style={{ height: '43%' }}>
                <View >
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: '#e0e0e0', borderRadius: 10 }}>
                        <Text style={{ paddingTop: '10%', paddingBottom: '5%', paddingLeft: '40%', textAlign: 'center' }}>Previous Balance...</Text>
                        <Text style={{ textAlign: 'center' }}>$0.00</Text>
                    </View>
                    <View>
                        {/* <Text style={{}}>iugfbssfasdfkertec</Text> */}

                    </View>
                </View>
            </ScrollView>

        );
    }

    const Bottom = () => {
        const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

        // Function to open the modal
        const openModal = () => {
            setIsModalVisible(true);
        };

        // Function to close the modal
        const closeModal = () => {
            setIsModalVisible(false);
        };

        return (
            <View style={styles.bottomcontainer}>
                <Text style={styles.download}>Download Statement</Text>
                <TouchableOpacity onPress={openModal}>
                    <Text style={styles.more}>More</Text>
                    {/* <Text></Text> */}
                </TouchableOpacity>

                {/* Modal Component */}
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={isModalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>

                            <TouchableOpacity style={styles.ModelButtons}><Text style={styles.modalOption}>Download Statement</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.ModelButtons}><Text style={styles.modalOption}>Minimum</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.ModelButtons}><Text style={styles.modalOption}>Credit Book</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.ModelButtons}><Text style={styles.modalOption}>Pay Now</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.ModelButtons}><Text style={styles.modalOption}>Auto Payment</Text></TouchableOpacity>
                            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                                <Text style={styles.more}>Close</Text> {/* Changed "More" to "Close" */}
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    };

    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    const date = currentDate.getDate(); // You have the date here but you're not using it in the UI

    return (
        <View style={{ flex: 1 }}>
            <Top />
            <PrevBalance />
            <Bottom />
        </View>
    );
};



const Activities = () => {
    const Top = () => {
        return (
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, paddingHorizontal: 20, borderBottomWidth: 2, borderBottomColor: '#e0e0e0', borderRadius: 10 }}>
                <View style={styles.date}>
                    <Text style={{ color: '#5773A2', textAlign: 'center', fontSize: 17 }}>{month}, {year}</Text>
                </View>
                <View style={styles.total}>
                    <Text style={{ fontWeight: '500', fontSize: 18 }}>Total $ 0.00</Text>


                </View>
            </View>
        );
    }
    const PrevBalance = () => {
        return (
            <ScrollView style={{ height: '43%' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', }} >
                    {/* <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center',borderBottomWidth:2,borderBottomColor:'#e0e0e0',borderRadius:10 }}>
                <Text style={{ paddingTop: '10%',paddingBottom:'5%',paddingLeft:'40%', textAlign: 'center' }}>Previous Balance...</Text>
                <Text style={{ textAlign: 'center', }}>$0.00</Text>
              
            </View> */}

                    <Text style={{ fontSize: 16, }}>No Record Found</Text>


                </View>
            </ScrollView>
        );
    }
    const Bottom = () => {
        const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

        // Function to open the modal
        const openModal = () => {
            setIsModalVisible(true);
        };

        // Function to close the modal
        const closeModal = () => {
            setIsModalVisible(false);
        };

        return (
            <View style={styles.bottomcontainer}>
                <Text style={styles.download}>Download Statement</Text>
                <TouchableOpacity onPress={openModal}>
                    <Text style={styles.more}>More</Text>
                </TouchableOpacity>

                {/* Modal Component */}
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={isModalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>

                            <TouchableOpacity style={styles.ModelButtons}><Text style={styles.modalOption}>Download Statement</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.ModelButtons}> <Text style={styles.modalOption}>Minimum</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.ModelButtons}>  <Text style={styles.modalOption}>Credit Book</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.ModelButtons}><Text style={styles.modalOption}>Pay Now</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.ModelButtons}><Text style={styles.modalOption}>Auto Payment</Text></TouchableOpacity>
                            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                                {/* <Ionicons name="arrow-down" size={24} color="black" />/ */}
                                <Text style={styles.more}>More</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    };


    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const date = currentDate.getDate(); // You have the date here but you're not using it in the UI
    const year = currentDate.getFullYear();

    return (
        <View>
            <Top />
            <PrevBalance />
            <Bottom />
        </View>
    );
};
const Golf = () => {
    const Top = () => {
        return (
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, paddingHorizontal: 20, borderBottomWidth: 2, borderBottomColor: '#e0e0e0', borderRadius: 10 }}>
                <View style={styles.date}>
                    <Text style={{ color: '#5773A2', textAlign: 'center', fontSize: 17 }}>{month}, {year}</Text>
                </View>
                <View style={styles.total}>
                    <Text style={{ fontWeight: '500', fontSize: 18 }}>Total $ 0.00</Text>


                </View>
            </View>
        );
    }
    const PrevBalance = () => {
        return (

            <ScrollView style={{ height: '43%' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', }} >
                    {/* <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center',borderBottomWidth:2,borderBottomColor:'#e0e0e0',borderRadius:10 }}>
                <Text style={{ paddingTop: '10%',paddingBottom:'5%',paddingLeft:'40%', textAlign: 'center' }}>Previous Balance...</Text>
                <Text style={{ textAlign: 'center', }}>$0.00</Text>
              
            </View> */}

                    <Text style={{ fontSize: 16, }}>No Record Found</Text>


                </View>
            </ScrollView>
        );
    }
    const Bottom = () => {
        const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

        // Function to open the modal
        const openModal = () => {
            setIsModalVisible(true);
        };

        // Function to close the modal
        const closeModal = () => {
            setIsModalVisible(false);
        };

        return (
            <View style={styles.bottomcontainer}>
                <Text style={styles.download}>Download Statement</Text>
                <TouchableOpacity onPress={openModal}>
                    <Text style={styles.more}>More</Text>
                </TouchableOpacity>

                {/* Modal Component */}
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={isModalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>

                            <TouchableOpacity style={styles.ModelButtons}><Text style={styles.modalOption}>Download Statement</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.ModelButtons}> <Text style={styles.modalOption}>Minimum</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.ModelButtons}>  <Text style={styles.modalOption}>Credit Book</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.ModelButtons}><Text style={styles.modalOption}>Pay Now</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.ModelButtons}><Text style={styles.modalOption}>Auto Payment</Text></TouchableOpacity>
                            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                                {/* <Ionicons name="arrow-down" size={24} color="black" />/ */}
                                <Text style={styles.more}>More</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    };


    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const date = currentDate.getDate(); // You have the date here but you're not using it in the UI
    const year = currentDate.getFullYear();

    return (
        <View>
            <Top />
            <PrevBalance />
            <Bottom />
        </View>
    );
};
const Tennis = () => {
    const Top = () => {
        return (
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, paddingHorizontal: 20, borderBottomWidth: 2, borderBottomColor: '#e0e0e0', borderRadius: 10 }}>
                <View style={styles.date}>
                    <Text style={{ color: '#5773A2', textAlign: 'center', fontSize: 17 }}>{month}, {year}</Text>
                </View>
                <View style={styles.total}>
                    <Text style={{ fontWeight: '500', fontSize: 18 }}>Total $ 0.00</Text>


                </View>
            </View>
        );
    }
    const PrevBalance = () => {
        return (
            <ScrollView style={{ height: '43%' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', }} >
                    {/* <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center',borderBottomWidth:2,borderBottomColor:'#e0e0e0',borderRadius:10 }}>
                <Text style={{ paddingTop: '10%',paddingBottom:'5%',paddingLeft:'40%', textAlign: 'center' }}>Previous Balance...</Text>
                <Text style={{ textAlign: 'center', }}>$0.00</Text>
              
            </View> */}

                    <Text style={{ fontSize: 16, }}>No Record Found</Text>

                </View>
            </ScrollView>
        );
    }
    const Bottom = () => {
        const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

        // Function to open the modal
        const openModal = () => {
            setIsModalVisible(true);
        };

        // Function to close the modal
        const closeModal = () => {
            setIsModalVisible(false);
        };

        return (
            <View style={styles.bottomcontainer}>
                <Text style={styles.download}>Download Statement</Text>
                <TouchableOpacity onPress={openModal}>
                    <Text style={styles.more}>More</Text>
                </TouchableOpacity>

                {/* Modal Component */}
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={isModalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>

                            <TouchableOpacity style={styles.ModelButtons}><Text style={styles.modalOption}>Download Statement</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.ModelButtons}> <Text style={styles.modalOption}>Minimum</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.ModelButtons}>  <Text style={styles.modalOption}>Credit Book</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.ModelButtons}><Text style={styles.modalOption}>Pay Now</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.ModelButtons}><Text style={styles.modalOption}>Auto Payment</Text></TouchableOpacity>
                            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                                {/* <Ionicons name="arrow-down" size={24} color="black" />/ */}
                                <Text style={styles.more}>More</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    };


    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const date = currentDate.getDate(); // You have the date here but you're not using it in the UI
    const year = currentDate.getFullYear();

    return (
        <View>
            <Top />
            <PrevBalance />
            <Bottom />
        </View>
    );
};
const FAndB = () => {
    const Top = () => {
        return (
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, paddingHorizontal: 20, borderBottomWidth: 2, borderBottomColor: '#e0e0e0', borderRadius: 10 }}>
                <View style={styles.date}>
                    <Text style={{ color: '#5773A2', textAlign: 'center', fontSize: 17 }}>{month}, {year}</Text>
                </View>
                <View style={styles.total}>
                    <Text style={{ fontWeight: '500', fontSize: 18 }}>Total $ 0.00</Text>


                </View>
            </View>
        );
    }
    const PrevBalance = () => {
        return (
            <ScrollView style={{ height: '43%' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', }} >
                    {/* <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center',borderBottomWidth:2,borderBottomColor:'#e0e0e0',borderRadius:10 }}>
                <Text style={{ paddingTop: '10%',paddingBottom:'5%',paddingLeft:'40%', textAlign: 'center' }}>Previous Balance...</Text>
                <Text style={{ textAlign: 'center', }}>$0.00</Text>
              
            </View> */}

                    <Text style={{ fontSize: 16, }}>No Record Found</Text>

                </View>
            </ScrollView>
        );
    }
    const Bottom = () => {
        const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

        // Function to open the modal
        const openModal = () => {
            setIsModalVisible(true);
        };

        // Function to close the modal
        const closeModal = () => {
            setIsModalVisible(false);
        };

        return (
            <View style={styles.bottomcontainer}>
                <Text style={styles.download}>Download Statement</Text>
                <TouchableOpacity onPress={openModal}>
                    <Text style={styles.more}>More</Text>
                </TouchableOpacity>

                {/* Modal Component */}
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={isModalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>

                            <TouchableOpacity style={styles.ModelButtons}><Text style={styles.modalOption}>Download Statement</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.ModelButtons}> <Text style={styles.modalOption}>Minimum</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.ModelButtons}>  <Text style={styles.modalOption}>Credit Book</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.ModelButtons}><Text style={styles.modalOption}>Pay Now</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.ModelButtons}><Text style={styles.modalOption}>Auto Payment</Text></TouchableOpacity>
                            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                                {/* <Ionicons name="arrow-down" size={24} color="black" />/ */}
                                <Text style={styles.more}>More</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    };


    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const date = currentDate.getDate(); // You have the date here but you're not using it in the UI
    const year = currentDate.getFullYear();

    return (
        <View>
            <Top />
            <PrevBalance />
            <Bottom />
        </View>
    );
};

const Retail = () => {
    const Top = () => {
        return (
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, paddingHorizontal: 20, borderBottomWidth: 2, borderBottomColor: '#e0e0e0', borderRadius: 10 }}>
                <View style={styles.date}>
                    <Text style={{ color: '#5773A2', textAlign: 'center', fontSize: 17 }}>{month}, {year}</Text>
                </View>
                <View style={styles.total}>
                    <Text style={{ fontWeight: '500', fontSize: 18 }}>Total $ 0.00</Text>


                </View>
            </View>
        );
    }
    const PrevBalance = () => {
        return (
            <ScrollView style={{ height: '43%' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', }} >
                    {/* <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center',borderBottomWidth:2,borderBottomColor:'#e0e0e0',borderRadius:10 }}>
                <Text style={{ paddingTop: '10%',paddingBottom:'5%',paddingLeft:'40%', textAlign: 'center' }}>Previous Balance...</Text>
                <Text style={{ textAlign: 'center', }}>$0.00</Text>
              
            </View> */}

                    <Text style={{ fontSize: 16, }}>No Record Found</Text>

                </View>
            </ScrollView>
        );
    }
    const Bottom = () => {
        const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

        // Function to open the modal
        const openModal = () => {
            setIsModalVisible(true);
        };

        // Function to close the modal
        const closeModal = () => {
            setIsModalVisible(false);
        };

        return (
            <View style={styles.bottomcontainer}>
                <Text style={styles.download}>Download Statement</Text>
                <TouchableOpacity onPress={openModal}>
                    <Text style={styles.more}>More</Text>
                </TouchableOpacity>

                {/* Modal Component */}
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={isModalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>

                            <TouchableOpacity style={styles.ModelButtons}><Text style={styles.modalOption}>Download Statement</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.ModelButtons}> <Text style={styles.modalOption}>Minimum</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.ModelButtons}>  <Text style={styles.modalOption}>Credit Book</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.ModelButtons}><Text style={styles.modalOption}>Pay Now</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.ModelButtons}><Text style={styles.modalOption}>Auto Payment</Text></TouchableOpacity>
                            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                                {/* <Ionicons name="arrow-down" size={24} color="black" />/ */}
                                <Text style={styles.more}>More</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    };


    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const date = currentDate.getDate(); // You have the date here but you're not using it in the UI
    const year = currentDate.getFullYear();

    return (
        <View>
            <Top />
            <PrevBalance />
            <Bottom />
        </View>
    );
};

const Other = () => {
    const Top = () => {
        return (
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, paddingHorizontal: 20, borderBottomWidth: 2, borderBottomColor: '#e0e0e0', borderRadius: 10 }}>
                <View style={styles.date}>
                    <Text style={{ color: '#5773A2', textAlign: 'center', fontSize: 17 }}>{month}, {year}</Text>
                </View>
                <View style={styles.total}>
                    <Text style={{ fontWeight: '500', fontSize: 18 }}>Total $ 0.00</Text>


                </View>
            </View>
        );
    }
    const PrevBalance = () => {
        return (
            <ScrollView style={{ height: '43%' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', }} >
                    {/* <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center',borderBottomWidth:2,borderBottomColor:'#e0e0e0',borderRadius:10 }}>
                <Text style={{ paddingTop: '10%',paddingBottom:'5%',paddingLeft:'40%', textAlign: 'center' }}>Previous Balance...</Text>
                <Text style={{ textAlign: 'center', }}>$0.00</Text>
              
            </View> */}

                    <Text style={{ fontSize: 16, }}>No Record Found</Text>

                </View>
            </ScrollView>
        );
    }
    const Bottom = () => {
        const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

        // Function to open the modal
        const openModal = () => {
            setIsModalVisible(true);
        };

        // Function to close the modal
        const closeModal = () => {
            setIsModalVisible(false);
        };

        return (
            <View style={styles.bottomcontainer}>
                <Text style={styles.download}>Download Statement</Text>
                <TouchableOpacity onPress={openModal}>
                    <Text style={styles.more}>More</Text>
                </TouchableOpacity>

                {/* Modal Component */}
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={isModalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>

                            <TouchableOpacity style={styles.ModelButtons}><Text style={styles.modalOption}>Download Statement</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.ModelButtons}> <Text style={styles.modalOption}>Minimum</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.ModelButtons}>  <Text style={styles.modalOption}>Credit Book</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.ModelButtons}><Text style={styles.modalOption}>Pay Now</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.ModelButtons}><Text style={styles.modalOption}>Auto Payment</Text></TouchableOpacity>
                            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                                {/* <Ionicons name="arrow-down" size={24} color="black" />/ */}
                                <Text style={styles.more}>More</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    };


    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const date = currentDate.getDate(); // You have the date here but you're not using it in the UI
    const year = currentDate.getFullYear();

    return (
        <View>
            <Top />
            <PrevBalance />
            <Bottom />
        </View>
    );
};




const TabContent = ({ activeTab }) => {
    switch (activeTab) {
        case 0:
            return <Text style={styles.content}><All /></Text>;
        case 1:
            return <Text style={styles.content}><Activities /></Text>;
        case 2:
            return <Text style={styles.content}><Golf /></Text>;
        case 3:
            return <Text style={styles.content}><Tennis /></Text>;
        case 4:
            return <Text style={styles.content}><FAndB /></Text>;
        case 5:
            return <Text style={styles.content}><Retail /></Text>;
        case 6:
            return <Text style={styles.content}><Other /></Text>;
        default:
            return null;
    }
};

// Normal Component
const Normal = () => {
    const [activeTab, setActiveTab] = useState(0); // Active tab state
    return (
        <View>
            <CalendarTab tabs={tabs} setActiveTab={setActiveTab} activeTab={activeTab} />
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <TabContent activeTab={activeTab} />
            </ScrollView>
        </View>
    );
};

// Dues Component
const Dues = () => {
    return <Text style={styles.content}>This is the "DUES" content.</Text>;
};

const Statements = () => {

    const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Dropdown visibility state
    const [selectedOption, setSelectedOption] = useState('NORMAL A/R'); // Selected dropdown option state

    // Toggle the dropdown visibility
    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    // Handle dropdown option selection
    const handleOptionSelect = (option) => {
        setSelectedOption(option); // Set selected option
        setIsDropdownVisible(false); // Close dropdown after selection
    };

    // Function to render content conditionally based on selectedOption
    const renderContent = () => {
        if (selectedOption === 'DUES') {
            return <Dues />;
        } else if (selectedOption === 'NORMAL A/R') {
            return <Normal />;
        }
        return <Text style={styles.content}>No Record Found</Text>;
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search Description or Receipt #"
                        placeholderTextColor='black'
                        keyboardType="default"
                    />
                    <TouchableOpacity onPress={toggleDropdown} style={{ width: "100%", alignItems: 'center' }}>
                        <Text style={styles.selection}>{selectedOption}</Text>
                    </TouchableOpacity>

                    {/* Dropdown List */}
                    {isDropdownVisible && (
                        <View style={styles.dropdown}>
                            <TouchableOpacity onPress={() => handleOptionSelect('DUES')}>
                                <Text style={styles.dropdownItem}>DUES</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleOptionSelect('NORMAL A/R')}>
                                <Text style={styles.dropdownItem}>NORMAL A/R</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>

            {/* Calendar Tabs */}

            {/* Display Tab Content */}
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {renderContent()}
            </ScrollView>
        </View>
    );
};

export default Statements;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        paddingTop: 10,
        paddingBottom: 5,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#e0e0e0',
    },
    input: {
        width: '90%',
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#5773A2',
        borderRadius: 15,
        marginVertical: 10,
        backgroundColor: '#fff',
        fontSize: 18,
        height: 45,
        justifyContent: 'center',
        color: '#000',
    },
    searchContainer: {
        alignItems: 'center',
        backgroundColor: '#fff',
        // marginBottom: 2,
        paddingBottom: 10,
    },
    tabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#f5f5f5',
        borderBottomWidth: 1,
        borderColor: '#e0e0e0',
    },
    tabItem: {
        marginRight: 15,
        padding: 10,
    },
    activeTab: {
        borderBottomWidth: 4,
        borderBottomColor: '#08c3f8',
    },
    tabText: {
        fontSize: 18,
        color: '#58729E',
        fontWeight: '500',
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
        paddingHorizontal: 10,
        alignItems: 'center', // Move alignItems here to fix the issue
    },
    content: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
    },
    selection: {
        borderWidth: 0.5,
        width: '90%',
        borderRadius: 8,
        padding: 10,
        // textAlign: 'center',
    },
    dropdown: {
        position: 'absolute',
        top: "100%",
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        width: '90%',
        borderRadius: 8,
        zIndex: 1000,
        marginTop: 5,
    },
    dropdownItem: {
        padding: 10,
        fontSize: 16,
        color: '#333',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    date: {
        borderWidth: 1,
        borderColor: '#5773A2',
        padding: 5,
        borderRadius: 20,
        width: '40%',

    },
    total: {
        justifyContent: 'center'
    },
    bottomcontainer: {
        flex: 1,
        width: '100%',
        borderTopWidth: 2,
        borderTopColor: '#e0e0e0',
        // justifyContent: 'flex-end', 
        alignItems: 'center',

    },
    download: {
        borderWidth: 1,
        borderColor: '#5773A2',
        borderRadius: 25,
        padding: 10,
        marginVertical: 10,
        color: '#5773A2',
        fontWeight: '500',
        fontSize: 18
    },
    ModelButtons: {
        borderWidth: 1,
        borderColor: '#5773A2',
        borderRadius: 25,
        padding: 8,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center'
    },
    more: {
        color: '#5773A2',
        fontWeight: '500',
        fontSize: 18,
        textDecorationLine: 'underline'
    },
    modalOverlay: {
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        borderWidth: 1
    },
    //   closeButton: {
    //     position: 'absolute',
    //     top: 10,
    //     right: 10,
    //     padding: 10,
    //   },
    modalOption: {
        fontSize: 18,
        marginVertical: 10,
        color: 'black',
        textAlign: 'center',
        color: '#667c9d',
        fontWeight: '500'
    },
});
