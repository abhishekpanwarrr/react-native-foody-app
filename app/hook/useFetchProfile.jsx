import { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { LoginContext } from '../context/LoginContext'

const useFetchProfile = () => {
    const [user, setUser] = useState(null)
    const { setLogin } = useContext(LoginContext)
    useEffect(() => {
        (async () => {
            const endpoint = "http://localhost:8000/api/v1/user";
            const foody_token = await AsyncStorage.getItem("foody_token");
            const userId = await AsyncStorage.getItem("foody_id");
            const user = await AsyncStorage.getItem("foody_user");
            if (user) {
                const data = JSON.parse(user)
                setUser(data)
                setLogin(true)
            } else {
                if (userId) {
                    try {
                        const response = await axios.get(endpoint, {
                            headers: {
                                Authorization: `Bearer ${foody_token}`,
                                "content-type": "application/json"
                            }
                        });
                        await AsyncStorage.setItem("foody_user", JSON.stringify(response?.data))
                        setUser(response?.data)
                        setLogin(true)
                    } catch (error) {
                        setUser({});
                        console.log("catch error", error);
                    }
                }
            }

        })()
    }, [])
    return { user, setUser }
}

export default useFetchProfile
