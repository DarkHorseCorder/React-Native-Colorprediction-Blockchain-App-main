import { View, Text, ScrollView, Image, TextInput, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCurrentUserAction, loginAction } from '../../store/actions/auth';
import Logo from '../../images/logobg.png';

const Login = () => {

    const navigator = useNavigation();
    const user = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const navigateToRegister = () => {
        navigator.navigate('Register');
    }
    
    useEffect(() => {
        (async() => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                setAuthToken(token);
                dispatch(getCurrentUserAction());
            }
        })();
    }, []);

    useEffect(() => {
        if (user.login)
            navigator.navigate('Navigation', {name: 'Betting'});
    }, [user.login]);

    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        const user = {
            mobile,
            password
        };
        dispatch(loginAction(user));
    }

    return <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
            <Text style={[styles.white, styles.bold, styles.logoText]}>Login To Meta-Club</Text>
            <View style={styles.logoContainer}><Image source={Logo} /></View>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput style={styles.input} 
                placeholder="Input your phone number..." 
                placeholderTextColor="white" textContentType='telephoneNumber'
                onChangeText={tx => setMobile(tx)} />
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} 
                placeholder="Input your password" 
                placeholderTextColor="white" secureTextEntry={true}
                onChangeText={tx => setPassword(tx)} />
            <TouchableOpacity style={styles.button} onPress={login}><Text>Login</Text></TouchableOpacity>
            <TouchableOpacity onPress={navigateToRegister}><Text style={styles.link}>Click here to register</Text></TouchableOpacity>
        </View>
    </ScrollView>

};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgb(21, 25, 28)",
        color: 'white',
        width: '100%',
        height: '100%',
        paddingVertical: 50,
        paddingHorizontal: 10,
        display: 'flex',
    },
    logoText: {
        fontSize: 20,
        marginBottom: 20
    },
    formContainer: {
        backgroundColor: '#22252D',
        width: '90%',
        marginLeft: '5%',
        padding: 20,
        borderRadius: 10,
        marginTop: 50
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    white: {
        color: 'white'
    },
    bold: {
        fontWeight: '700'
    },
    input: {
        backgroundColor: 'rgb(34, 37, 45)',
        width: '100%',
        marginTop: 5,
        height: 40,
        borderRadius: 5,
        color: 'white',
        paddingHorizontal: 10,
        borderColor: 'white',
        borderWidth: 2,
    },
    label: {
        fontSize: 12,
        marginTop: 20,
        color: 'white'
    },
    button: {
        backgroundColor: "rgb(162, 75, 219)",
        height: 40,
        width: '60%',
        marginLeft: '20%',
        borderRadius: 20,
        marginTop: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    link: {
        color: 'white',
        marginTop: 30,
        textAlign: 'center',
        textDecorationLine: 'underline'
    }
});

export default Login;