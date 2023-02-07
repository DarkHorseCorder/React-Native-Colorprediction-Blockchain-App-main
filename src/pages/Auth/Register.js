import { View, Text, ScrollView, Image, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';

import Logo from '../../images/logobg.png';
import axios from 'axios';

const Register = () => {

    const navigator = useNavigation();

    const navigateToLogin = () => {
        navigator.navigate('Login');
    }

    const [mobile, setMobile] = useState("");
    const [otp, setOTP] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = () => {
        const user = {
            mobile,
            verification_code: otp,
            email,
            password
        };
        axios.post('/register', user)
            .then(res => {
                if (res.status == 200)
                    navigateToLogin();
            });
    }

    const verification = () => {
        axios.post('/sendVeritication', {mobile})
            .then(res => {
                
            });
    }

    return <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
            <Text style={[styles.white, styles.bold, styles.logoText]}>Create An Account</Text>
            <View style={styles.logoContainer}><Image source={Logo} /></View>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput style={styles.input} 
                placeholder="Input your phone number..." 
                placeholderTextColor="white"
                name="mobile"
                onChangeText={tx => setMobile(tx)} />
            <Text style={styles.label}>Verification Code</Text>
            <TextInput style={styles.input} 
                placeholder="OTP..." 
                placeholderTextColor="white"
                name="verification"
                onChangeText={tx => setOTP(tx)} />
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} 
                placeholder="Email Address..." 
                placeholderTextColor="white"
                name="email"
                onChangeText={tx => setEmail(tx)} />
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} 
                placeholder="Input your password" 
                placeholderTextColor="white" secureTextEntry={true}
                name="password"
                onChangeText={tx => setPassword(tx)} />
            <TouchableOpacity style={styles.button} onPress={verification}><Text>Receive Verification</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={register}><Text>Register</Text></TouchableOpacity>
            <TouchableOpacity onPress={navigateToLogin}><Text style={styles.link}>Already have an account</Text></TouchableOpacity>
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
        marginTop: 50,
        marginBottom: 70
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
        width: '80%',
        marginLeft: '10%',
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

export default Register;