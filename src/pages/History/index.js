import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";

import Logo from '../../images/logobg.png';
import back from '../../images/back.png';
import Dollar from '../../images/meta/dollar.png';

const History = () => {

    const [bets, setBets] = useState([]);
    const [page, setPage] = useState(1);
    const user = useSelector(state => state.auth);

    useFocusEffect(() => {
        axios.get("/bet/history?page"+page)
            .then(res => setBets(res.data.bets.data));
    })

    return <ScrollView style={styles.container}>
        <TouchableOpacity><Image source={back} /></TouchableOpacity>
        <View style={styles.logoContainer}>
            <Image source={Logo} />
        </View>
        <View style={styles.coinContainer}>
            <Image source={Dollar} />
            <Text style={[styles.bold, styles.white]}> Meta Coins</Text>
            <Text style={styles.white}> {user.metacoins}</Text>
        </View>
        <View style={styles.periodTable}>
            <View style={styles.tableHeader}>
                <Text style={[styles.white, {fontSize: 20, textAlign: 'center'}, styles.bold]}>{user.city.toUpperCase()}</Text>
            </View>
            {
                bets.map(bet => <View style={styles.periodTableRow}>
                        <Text style={{fontSize: 20, color: 'white'}}>
                            {bet.period}
                        </Text>
                        <Text style={{color: bet.finished ? (bet.status == "Fail" ? 'red' : 'green') : 'yellow'}}>
                            {bet.finished ? bet.status : "Waiting"} {bet.finished ? bet.amount : bet.contractcount * bet.contractmoney}
                        </Text>
                    </View>)
            }
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
    white: {
        color: 'white'
    },
    bold: {
        fontWeight: '700'
    },
    tableHeader: {
        backgroundColor: "rgb(63, 67, 69)",
        color: 'white',
        padding: 10
    },
    periodTableRow: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        color: 'white',
        padding: 10
    },
    periodTable: {
        backgroundColor: "rgb(34, 37, 45)",
        borderRadius: 5,
        color: 'white',
        overflow: 'hidden',
        marginTop: 30
    },
})

export default History;