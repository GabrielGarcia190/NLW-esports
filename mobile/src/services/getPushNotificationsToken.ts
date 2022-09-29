import * as Notifications from 'expo-notifications';


export async function getpushNotificationToken() {
    const { granted } = await Notifications.getPermissionsAsync();

    if(!granted){
        await Notifications.requestPermissionsAsync();
    }

    if(granted){
        const pushToken = await Notifications.getExpoPushTokenAsync();
        console.log('NOTICIATION TOKEN =>', pushToken.data);

        return pushToken.data;


    }
}