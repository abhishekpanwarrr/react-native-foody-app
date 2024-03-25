import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import ProfileTile from '../../components/ProfileTile'
import { COLORS } from '../../constants/theme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LoginContext } from '../../context/LoginContext'
import { AntDesign } from "@expo/vector-icons";
import RegistrationTile from '../../components/RegistrationTile'

const Settings = ({ navigation }) => {
    // const navigation = useNavigation();
    const { setLogin } = useContext(LoginContext)
    const handleLogout = async () => {
        alert("You have been logged out.");
        await AsyncStorage.clear();
        await AsyncStorage.removeItem("foody_token");
        await AsyncStorage.removeItem("foody_id");
        await AsyncStorage.removeItem("foody_user");
        // setUser(null)
        setLogin(false)
        return navigation.navigate('Profile')
    }
    return (
        <View style={styles.wrapper}>
            <View
                style={{
                    height: 140,
                    backgroundColor: COLORS.lightWhite,
                    margin: 10,
                    borderRadius: 12,
                }}
            >
                <RegistrationTile
                    extra="settings"
                    heading={"Change your account settings"}
                    desc={
                        "Update your settings like shipping address, contact with support center etc."
                    }
                />
                <ProfileTile
                    title={"Shipping Address"}
                    icon={"location-outline"}
                    font={1}
                />
                <ProfileTile title={"Services Center"} icon={"customerservice"} />
                <ProfileTile title={"Logout"} icon={"logout"} onPress={handleLogout} />
            </View>
        </View>
    )
}

export default Settings

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    }
})