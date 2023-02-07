import { View, StyleSheet, Image, Text, TouchableOpacity, Modal, Pressable } from "react-native";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';

import UserIcon from '../../images/meta/user.png';
import DollarIcon from '../../images/meta/dollar.png';
import { displayMemberId } from "../../config/config";
import { useSelector } from "react-redux";

const Header = (props) => {

    const [ruleModal, showRuleModal] = useState(false);
    const navigation = useNavigation();
    const user = useSelector(state => state.auth);

    const recharge = () => {
        navigation.navigate('Recharge');
    }

    const rule = () => {
        showRuleModal(true);
    }
    return <View>
        <View style={styles.header}>
            <View style={styles.headerItem}>
                <Image source={UserIcon} style={styles.headerIcon}/>
                <Text style={styles.bold}>{displayMemberId(user.id)}</Text>
            </View>
            <View style={styles.headerItem}>
                <Image source={DollarIcon} style={styles.headerIcon}/>
                <Text style={styles.bold}>{user.metacoins.toFixed(2)}</Text>
            </View>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.rechargeButton} onPress={recharge}><Text style={styles.textCenter}>Recharge</Text></TouchableOpacity>
            <TouchableOpacity style={styles.ruleButton} onPress={rule}><Text style={styles.textCenter}>Rule</Text></TouchableOpacity>
        </View>
        <Modal animationType="slide" visible={ruleModal} transparent={true}>
            <View style={styles.modalWrapper}>
                <View style={styles.modalContainer}>
                    <Text style={styles.bold}>Game Rule</Text>
                    <Text style={[styles.bold, styles.mt1]}>3 minutes 1 issue, 2 minutes and 30 seconds to order, 30 seconds to show the lottery result. It opens all day. The total number of trade is 480 issues</Text>
                    <Text style={[styles.bold, styles.mt2]}>If you spend 100 to trade, after deducting 2 service fee, your contract amount is 98:</Text>
                    <Text style={[styles.bold, styles.mt2]}>1. JOIN GREEN: if the result shows 1,3,7,9, you will get (98*2) 196</Text>
                    <Text style={[styles.bold, styles.mt2]}>If the result shows 5, you will get (98*1.5) 147</Text>
                    <Text style={[styles.bold, styles.mt2]}>2. JOIN RED: if the result shows 2,4,6,8, you will get (98*2) 196; If the result shows 0, you will get (98*1.5) 147</Text>
                    <Text style={[styles.bold, styles.mt2]}>3. JOIN VIOLET: if the result shows 0 or 5, you will get (98*4.5) 441</Text>
                    <Text style={[styles.bold, styles.mt2]}>4. SELECT NUMBER: if the result is the same as the number you selected, you will get (98*9) 882</Text>
                    <View style={styles.closeButton}><TouchableOpacity onPress={() => showRuleModal(false)}><Text style={styles.bold}>Close</Text></TouchableOpacity></View>
                </View>
            </View>
        </Modal>
    </View>
};

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    headerItem: {
        display: 'flex',
        flexDirection: 'row',
    },
    headerIcon: {
        marginRight: 10,
    },
    bold: {
        fontWeight: '700',
        color: 'white'
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    rechargeButton: {
        height: 40,
        backgroundColor: 'rgb(162, 75, 219)',
        width: '45%',
        borderRadius: 20,
        textAlign: 'center'
    },
    ruleButton: {
        height: 40,
        backgroundColor: 'rgb(34, 84, 202)',
        width: '45%',
        borderRadius: 20,
        textAlign: 'center'
    },
    textCenter: {
        textAlign: 'center',
        color: 'white',
        lineHeight: 33,
    },
    modalContainer: {
        backgroundColor: '#22252D',
        paddingVertical: 20,
        paddingHorizontal: 40,
        marginTop: 100,
        width: '90%',
        marginLeft: '5%',
        borderRadius: 10
    },
    mt1: {
        marginTop: 10
    },
    mt2: {
        marginTop: 20
    },
    closeButton: {
        display: 'flex',
        alignItems: 'flex-end'
    },
    modalWrapper: {
        widht: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
});

export default Header;