import { StyleSheet, ScrollView, Image, View, Text, TouchableOpacity, TextInput, Linking } from "react-native";

import Logo from '../../images/logobg.png';
import back from '../../images/back.png';
import Dollar from '../../images/meta/dollar.png';
import { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Recharge = (props) => {

    const amounts = [100, 300, 500, 1000, 2000, 5000, 10000, 20000]
    const [rechargeMethod, setRechargeMethod] = useState(false);
    const [amount, setAmount] = useState("100");

    const recharge = () => {
        if (amount <= 0) return;
        axios.post('/recharge', {amount: Number(amount), platform: rechargeMethod ? "HRPay" : "Default"})
            .then(res => {
                if(res.status == 200) {
                    const url = res.data.url;
                    Linking.canOpenURL(url).then(supported => {
                        if (supported) {
                            Linking.openURL(url);
                        } else {
                            console.log("Don't know how to open URI: ");
                        }
                    });
                }
            })
    }

    const handleChange = (text) => {
        setAmount(text.replace(/[^0-9]/g, ''));
    }

    const navigation = useNavigation();

    return <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Image source={back} /></TouchableOpacity>
        <View style={styles.logoContainer}>
            <Image source={Logo} />
        </View>
        <View style={styles.coinContainer}>
            <Image source={Dollar} />
            <Text style={[styles.bold, styles.white]}> Meta Coins</Text>
            <Text style={styles.white}> 688018.111</Text>
        </View>
        <Text style={[styles.white, styles.mt1]}>1 INR = 1 metacoin</Text>
        <Text style={[styles.white, styles.mt1]}>Recharge Amount</Text>
        <TextInput style={styles.input} onChangeText={handleChange} value={amount}/>
        <View style={styles.amountButtonWrapper}>
            {
                amounts.map(_amount => <TouchableOpacity style={styles.amountButton} key={"amount"+_amount} onPress={() => setAmount(""+_amount)}><Text style={[styles.white]}>{_amount}</Text></TouchableOpacity>)
            }
        </View>
        <Text style={styles.tip}>
            Tips: Please contact meta.club07@gmail.com if you have any questions about the order or payment.
        </Text>
        <Text style={[styles.white, styles.bold, styles.convenientText]}>
            convenient(100-50000)
        </Text>
        <View>
            <TouchableOpacity onPress = {() => setRechargeMethod(false)} style={styles.flex}><View style={[styles.circle, !rechargeMethod ? styles.bwhite : {}]}></View><Text style={styles.white}>Recharge Method 1</Text></TouchableOpacity>
            <TouchableOpacity onPress = {() => setRechargeMethod(true)} style={[styles.flex, {marginTop: 10}]}><View style={[styles.circle, rechargeMethod ? styles.bwhite : {}]}></View><Text style={styles.white}>Recharge Method 2</Text></TouchableOpacity>
        </View>
        <View style={{marginBottom: 40}}>
            <TouchableOpacity style={styles.rechargeButton} onPress={recharge}><Text style={styles.white}>Recharge</Text></TouchableOpacity>
        </View>
    </ScrollView>

};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgb(21, 25, 28)",
        color: 'white',
        width: '100%',
        height: '100%',
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bold: {
        fontWeight: '700'
    },
    white: {
        color: 'white'
    },
    coinContainer: {
        displat: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    mt1: {
        marginTop: 15
    },
    input: {
        backgroundColor: 'rgb(34, 37, 45)',
        width: '100%',
        marginTop: 5,
        height: 40,
        borderRadius: 5,
        color: 'white',
        paddingHorizontal: 10
    },
    amountButton: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgb(56, 60, 66)',
        width: '23%',
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    amountButtonWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: 20,
        
    },
    tip: {
        color: "#51585E",
        width: '100%',
        padding: 15
    },
    convenientText: {
        textAlign: 'right',
        marginTop: 20
    },
    rechargeButton: {
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
    bwhite: {
        backgroundColor: "white"
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'white',
        marginRight: 20
    },
    flex: {
        display: 'flex',
        flexDirection: 'row'
    }
});

export default Recharge;