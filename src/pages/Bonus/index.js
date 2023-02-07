import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";

import Logo from '../../images/logobg.png';
import back from '../../images/back.png';
import Dollar from '../../images/meta/dollar.png';

const Bonus = () => {

    const [bonus, setBonus] = useState([]);
    const [page, setPage] = useState(1);
    const user = useSelector(state => state.auth);

    useFocusEffect(() => {
        axios.post("/bonus")
            .then(res => {if(res.status == 200) setBonus(res.data.bonus)});
    })

    return <ScrollView style={styles.container}>
        <TouchableOpacity><Image source={back} /></TouchableOpacity>
        <View style={styles.logoContainer}>
            <Image source={Logo} />
        </View>
        <View style={styles.coinContainer}>
            <Image source={Dollar} />
            <Text style={[styles.bold, styles.white]}> Meta Coins</Text>
            <Text style={styles.white}> {user.metacoins.toFixed(2)}</Text>
        </View>
        <View style={styles.periodTable}>
            <View style={styles.tableHeader}>
                <Text style={[styles.white, {fontSize: 20, textAlign: 'center'}, styles.bold]}>{user.city.toUpperCase()}</Text>
            </View>
            {
                bonus.map(bo => <View style={styles.periodTableRow}>
                        <Text style={styles.white}>{bo.sender}</Text>
                        <Text style={styles.white}>{bo.reason}</Text>
                        <Text style={styles.white}>{bo.amount.toFixed(2)}</Text>
                        <Text style={styles.white}>{bo.created_at}</Text>
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
        padding: 10,
    },
    periodTable: {
        backgroundColor: "rgb(34, 37, 45)",
        borderRadius: 5,
        color: 'white',
        overflow: 'hidden',
        marginTop: 30,
        paddingBottom: 50
    },
})

export default Bonus;