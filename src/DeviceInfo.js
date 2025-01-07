
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Network from 'expo-network';
import * as Application from 'expo-application';  // Import expo-application to get app version

export const deviceInfo = async () => {
    try {
        // Get device information using expo-device
        const deviceId = Device.deviceId;  // Returns device ID (can be empty string in Expo-managed apps)
        const deviceName = await Device.getDeviceNameAsync(); // Asynchronously retrieve the device name
        const systemVersion = Device.osVersion;  // OS version
        const appVersion = Application.nativeApplicationVersion; // Get app version using expo-application
        const deviceModel = Device.modelName;  // Model name

        // Dynamically retrieve IP address using expo-network
        const originatingIP = await Network.getIpAddressAsync(); // Retrieve device's IP address

        // Set Browser and DeviceType based on the platform
        const browser = Platform.OS === 'web' ? 'Web' : Platform.OS === 'ios' ? 'Safari' : 'Android';
        const deviceType = Platform.OS === 'ios' ? 'iOS' : 'Android';

        // Return all the collected device information
        return {
            AppVersion: appVersion,  // App version
            Browser: browser,  // Browser/platform
            DeviceModel: deviceModel,  // Device model
            DeviceType: deviceType,  // Device type (iOS/Android)
            OSVersion: systemVersion,  // OS version
            OriginatingIP: originatingIP,  // IP address
            SessionID: "d208b4fd3a6a27c4",  // Static session ID (replace with dynamic if needed)
            SourcePortNo: "0",  // Source port number (if needed)
        };
    } catch (error) {
        console.error("Error fetching device info:", error);
        return {};
    }
};


// import DeviceInfo from 'react-native-device-info';
// import { NetworkInfo } from 'react-native-network-info';
 
// export const deviceInfo = async () => {
//     const deviceId = DeviceInfo.getDeviceId();
//     const deviceName = await DeviceInfo.getDeviceName();
//     const systemVersion = DeviceInfo.getSystemVersion();
//     const appVersion = DeviceInfo.getVersion();
//     const deviceModel = DeviceInfo.getModel();
//     // Dynamically retrieve IP address
//     const originatingIP = await NetworkInfo.getIPV4Address();
//     // Set Browser and DeviceType based on the platform
//     const browser = Platform.OS === 'web' ? 'Web' : Platform.OS === 'ios' ? 'Safari' : 'Android';
//     const deviceType = Platform.OS === 'ios' ? 'iOS' : 'Android';
 
//     return {
//       AppVersion: appVersion,
//       Browser: browser,  // Change based on platform if needed
//       DeviceModel: deviceModel,
//       DeviceType: deviceType,
//       OSVersion: systemVersion,
//       OriginatingIP: originatingIP,  // Use dynamic IP if available
//       SessionID: "d208b4fd3a6a27c4",   // Or generate a session ID dynamically
//       SourcePortNo: "0",
//     };
//   };
 
//   export default deviceInfo;
 
// import DeviceInfo from 'react-native-device-info';
// import { NetworkInfo } from 'react-native-network-info';
 
// export const deviceInfo = async () => {
//     const deviceId = DeviceInfo.getDeviceId();
//     const deviceName = await DeviceInfo.getDeviceName();
//     const systemVersion = DeviceInfo.getSystemVersion();
//     const appVersion = DeviceInfo.getVersion();
//     const deviceModel = DeviceInfo.getModel();
//     // Dynamically retrieve IP address
//     const originatingIP = await NetworkInfo.getIPV4Address();
//     // Set Browser and DeviceType based on the platform
//     const browser = Platform.OS === 'web' ? 'Web' : Platform.OS === 'ios' ? 'Safari' : 'Android';
//     const deviceType = Platform.OS === 'ios' ? 'iOS' : 'Android';
 
//     return {
//       AppVersion: appVersion,
//       Browser: browser,  // Change based on platform if needed
//       DeviceModel: deviceModel,
//       DeviceType: deviceType,
//       OSVersion: systemVersion,
//       OriginatingIP: originatingIP,  // Use dynamic IP if available
//       SessionID: "d208b4fd3a6a27c4",   // Or generate a session ID dynamically
//       SourcePortNo: "0",
//     };
//   };
 
//   export default deviceInfo;
 
