import { StyleSheet, ScrollView, Image, View, Text, TouchableOpacity, TextInput } from "react-native";
import axios from 'axios';
import { useState } from "react";
import SelectDropdown from 'react-native-select-dropdown'

import Logo from '../../images/logobg.png';
import back from '../../images/back.png';
import Dollar from '../../images/meta/dollar.png';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useReducer } from "react";

const Withdraw = (props) => {

    const [cards, setCards] = useState([]);
    const [amount, setAmount] = useState("300");
    const dispatch = useDispatch();
    const [cardNum, setCardNum] = useState([]);
    const [card, setCard] = useState("");
    const user = useSelector(state => state.auth);

    useEffect(() => {
        axios.post('/cards')
            .then(res => {if (res.status == 200) {
                setCards(res.data.cards);
                setCardNum(res.data.cards.map(card => card.bankaccount))
            }});
    }, []);

    const withdraw = () => {
        const _amount = Number(amount);
        if (_amount < 0 || card == "") return;
        axios.post('/withdraw', {amount: _amount, address: card})
            .then(res => {
                console.log(res);
                if (res.status == 200)
                    dispatch({type: "BET", payload: _amount})
            })
    }

    const handleChange = (text) => {
        setAmount(text.replace(/[^0-9]/g, ''));
    }

    const navigation = useNavigation();

    return <ScrollView style={styles.container}>
        <View>
            <TouchableOpacity onPress={() => navigation.goBack()}><Image source={back} /></TouchableOpacity>
            <View>
                <View style={styles.logoContainer}>
                    <Image source={Logo} />
                </View>
            </View>
        </View>
        <View style={styles.coinContainer}>
            <Image source={Dollar} />
            <Text style={[styles.bold, styles.white]}> Meta Coins</Text>
            <Text style={styles.white}> {user.metacoins.toFixed(2)}</Text>
        </View>
        <Text style={[styles.white, styles.mt1]}>1 INR = 1 metacoin</Text>
        <Text style={[styles.white, styles.mt1]}>Withdraw Amount</Text>
        <TextInput style={[styles.input, {height: 40}]} onChangeText={handleChange}/>
        <Text style={[styles.white, styles.mt1]}>
            Input Your Address
        </Text>
        <SelectDropdown
            data={cardNum}
            onSelect={(selectedItem, index) => {
                setCard(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
            }}
            dropdownStyle={styles.input}
            rowTextStyle={styles.white}
            buttonTextStyle={styles.white}
            buttonStyle={styles.input}
        />
        <View>
            <TouchableOpacity style={styles.withdrawButton} onPress={withdraw}><Text style={styles.white}>Withdraw</Text></TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity style={styles.withdrawButton} onPress={() => navigation.navigate("Bonus")}><Text style={styles.white}>Bonus</Text></TouchableOpacity>
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
    withdrawButton: {
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
});

export default Withdraw;