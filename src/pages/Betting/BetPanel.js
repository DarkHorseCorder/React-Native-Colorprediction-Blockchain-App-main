import { View, StyleSheet, Image, Text, TouchableOpacity, Modal, TextInput } from "react-native";
import { Table, Row, Rows } from 'react-native-table-component';
import { useEffect, useMemo, useState } from "react";

const tabs = ['LasVegas', 'Paris', 'Mumbai', 'Tokyo'];
const timeDifference = {LasVegas: -7, Paris: 1, Mumbai: 9, Tokyo: 5.5};
import Lasvegas from '../../images/background/lasvegas-am.png';
import Lasvegas1 from '../../images/background/lavegas-pm.png';
import Paris from '../../images/background/paris-am.png';
import Paris1 from '../../images/background/paris-pm.png';
import Mumbai from '../../images/background/mumbai-am.png';
import Mumbai1 from '../../images/background/mumbai-pm.png';
import Tokyo from '../../images/background/tokyo-am.jpg';
import Tokyo1 from '../../images/background/tokyo-pm.png';
import Logo from '../../images/logo.png';
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { displayNumber } from "../../config/config";
import { useNavigation } from "@react-navigation/native";

const BetPanel = (props) => {

    const calcTime = offset => {
        let d = new Date();
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        const nd = new Date(utc + (3600000 * offset));
        return nd;
    }

    const [currentTab, setCurrentTab] = useState(0);
    const [currentImage, setCurrentImage] = useState(0);
    const images = [Lasvegas, Lasvegas1, Paris, Paris1, Mumbai, Mumbai1, Tokyo, Tokyo1];
    const cityImage = useMemo(() => images[currentImage], [currentImage]);
    const user = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const cities = ["Las Vegas", "paris", "mumbai", "tokyo"];
        const index = cities.indexOf(user.city);
        setCurrentTab(index);
        getPeriodHistory();
    }, []);

    const selectTab = (index) => {
        setCurrentTab(index);
        const time = calcTime(timeDifference[tabs[index]]);
        let _currentTab = index * 2;
        if (time.getHours() < 7 || time.getHours() > 16) _currentTab ++;
        setCurrentImage(_currentTab);
        const cities = ["Las Vegas", "paris", "mumbai", "tokyo"];
        axios.post('/selectcity', {city: cities[index]})
            .then(res => {
                if (res.status == 200)
                    getPeriodHistory();
            })
    }

    const periodItems = ["Period", "Price", "Result"];

    const [betModal, setBetModal] = useState(false);

    const showBetModal = (bet) => {
        setCurrentBet(bet);
        setBetModal(true);
    }

    const [currentBet, setCurrentBet] = useState("");
    const [contractmoney, setContractMoney] = useState(1);
    const [contractCount, setContractCount] = useState(1);
    const {remain, betId} = props;
    const bet = () => {
        axios.post("/bet/new", {contractmoney: Math.pow(10, contractmoney), contractcount: contractCount, gameid: betId, bet: currentBet})
            .then(res => {
                if (res.status == 200)
                    dispatch({type: 'BET', payload: contractmoney * contractCount});
                setBetModal(false);
            });
    }

    const [periods, setPeriods] = useState([]);

    const getPeriodHistory = () => {
        axios.post('/period/history')
            .then(res => setPeriods(res.data.periods.data));
    }
    const navigation = useNavigation();

    return <View>
        <Modal animationType="slide" visible={betModal} transparent={true}>
            <View style={styles.modalWrapper}>
                <View style={styles.modalContainer}>
                    <Text style={styles.betHeader}>You bet on {currentBet}</Text>
                    <View style={styles.betModalContainer}>
                        <Text style={styles.white}>Contract Money</Text>
                        <View style={[styles.contractMoneyContainer, {marginTop: 20}]}>
                            {
                                [...Array(4)].map((_, index) => <TouchableOpacity onPress={() => setContractMoney(index + 1)}>
                                    <Text style={[styles.white, styles.contractMoneyTab, index+1 == contractmoney ? styles.contractMoneyActive : {}]}>{Math.pow(10, index + 1)}</Text>
                                </TouchableOpacity>)
                            }
                        </View>
                        <Text style={[styles.white, {marginTop: 5}]}>Contract Count</Text>
                        <View style={[styles.contractMoneyContainer, {marginTop: 20}]}>
                            <TouchableOpacity style={styles.contractButton} onPress={() => contractCount > 1 ? setContractCount(contractCount - 1) : 0}><Text style={styles.white}>-</Text></TouchableOpacity>
                            <Text style={[styles.contractInput]}>{contractCount}</Text>
                            <TouchableOpacity style={styles.contractButton} onPress={() => setContractCount(contractCount + 1)}><Text style={styles.white}>+</Text></TouchableOpacity>
                        </View>
                        <Text style={[styles.white, {marginTop: 10}]}>Total Contract Money is {Math.pow(10, contractmoney) * contractCount}</Text>
                        <View style={styles.modalFooter}>
                            <TouchableOpacity style={styles.modalAction} onPress={() => setBetModal(false)}><Text style={styles.white}>Cancel</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.modalAction} onPress={bet}><Text style={styles.white}>Confirm</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
        <View style={styles.tabHeader}>
            {
                tabs.map((tab, index) => <TouchableOpacity onPress={() => selectTab(index)} style={currentTab != index ? styles.tabButton : [styles.tabActive, styles.tabButton]} key={"tab" + index}><Text style={styles.bold}>{tab}</Text></TouchableOpacity>)
            }
        </View>
        <View style={styles.cityImageContainer}>
            <Image source={cityImage} style={styles.cityImage}/>
            <Image source={Logo} style={styles.logoImage} />
            <View style={styles.periodTextOnImage}>
                <Text style={styles.bold}>{tabs[currentTab]}</Text>
                <Text style={styles.white}>{props.period.substring(0, 8)+"-"+props.period.substring(8, 11)}</Text>
            </View>
        </View>
        <View style={styles.bettingPanel}>
            <View style={[styles.colorBetLine, styles.justifyContentSpace]}>
                <View style={styles.colorBetPanel}>
                    <View style={styles.colorBetConainter} >
                        <TouchableOpacity onPress={() => showBetModal("Join Red")} ><Text style={[{transform: [{rotate: "45deg"}]}, styles.betButton, styles.bRed, styles.colorBetButton]}></Text>
                        </TouchableOpacity>
                        <Text style={styles.textCenter}>R</Text>
                    </View>
                    <View style={styles.colorBetConainter} >
                        <TouchableOpacity onPress={() => showBetModal("Join Violet")} ><Text style={[{transform: [{rotate: "45deg"}]}, styles.betButton, styles.bViolet, styles.colorBetButton]}></Text>
                        </TouchableOpacity>
                        <Text style={styles.textCenter}>V</Text>
                    </View>
                    <View style={styles.colorBetConainter} >
                        <TouchableOpacity onPress={() => showBetModal("Join Green")} ><Text style={[{transform: [{rotate: "45deg"}]}, styles.betButton, styles.bGreen, styles.colorBetButton]}></Text>
                        </TouchableOpacity>
                        <Text style={styles.textCenter}>G</Text>
                    </View>
                </View>
                <View style={styles.timerContainer}>
                    <Text style={styles.white}>Count Down</Text>
                    <Text style={styles.white}>{'0' + (Math.floor(remain / 60))} : {remain % 60 < 10 ? '0' + remain % 60: remain % 60}</Text>
                </View>
            </View>
            <View style={styles.numberPanel}>
                <TouchableOpacity onPress={() => showBetModal(0)} style={[styles.betButton, styles.bViolet]}><Text style={[styles.white, styles.bold]}>0</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => showBetModal(1)} style={[styles.betButton, styles.bGreen]}><Text style={[styles.white, styles.bold]}>1</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => showBetModal(2)} style={[styles.betButton, styles.bRed]}><Text style={[styles.white, styles.bold]}>2</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => showBetModal(3)} style={[styles.betButton, styles.bGreen]}><Text style={[styles.white, styles.bold]}>3</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => showBetModal(4)} style={[styles.betButton, styles.bRed]}><Text style={[styles.white, styles.bold]}>4</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => showBetModal(5)} style={[styles.betButton, styles.bViolet]}><Text style={[styles.white, styles.bold]}>5</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => showBetModal(6)} style={[styles.betButton, styles.bRed]}><Text style={[styles.white, styles.bold]}>6</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => showBetModal(7)} style={[styles.betButton, styles.bGreen]}><Text style={[styles.white, styles.bold]}>7</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => showBetModal(8)} style={[styles.betButton, styles.bRed]}><Text style={[styles.white, styles.bold]}>8</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => showBetModal(9)} style={[styles.betButton, styles.bGreen]}><Text style={[styles.white, styles.bold]}>9</Text></TouchableOpacity>
            </View>
        </View>
        <View style={styles.bettingHistory}>
            <Text style={[styles.white, {marginBottom: 30}]}>{tabs[currentTab]}</Text>
            <View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                    <Text style={[styles.flex1, styles.white, styles.font8]}>Period</Text>
                    <Text style={[styles.flex2, styles.white, styles.font8]}>Price</Text>
                    <Text style={[styles.flex2, styles.white, styles.font8]}>Number</Text>
                    <Text style={[styles.flex2, styles.white, styles.font8]}>Result</Text>
                </View>
                {
                    periods.map(period => <View style={styles.periodTableRow}>
                            <Text style={[styles.flex1, styles.white]}>{"Period "+period.period}</Text>
                            <Text style={[styles.flex2, styles.white]}>{displayNumber(period.fake)}</Text>
                            <Text style={[styles.flex2, styles.white, styles.textCenter, {color: (period.result % 5 == 0 ? 'violet' : (period.result % 2 == 0 ? 'red' : 'green'))}]}>{period.result}</Text>
                            <Text style={[styles.flex2, styles.white, styles.textCenter]}>
                                {
                                    period.result % 2 == 0 ? <View style={[styles.bRed, styles.circle]}></View> : <View style={[styles.bGreen, styles.circle]}></View>
                                }
                                {
                                    period.result % 5 == 0 ? <View style={[styles.bViolet, styles.circle, {marginLeft: 10}]}></View> : ''
                                }
                            </Text>
                        </View>)
                }
                
            </View>
            <View>
                <TouchableOpacity style={styles.recordButton} onPress={() => navigation.navigate('History')}><Text style={styles.white}>My Records</Text></TouchableOpacity>
            </View>
        </View>
    </View>
};

const styles = StyleSheet.create({
    tabHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50,
        color: 'white'
    },
    tabButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '24%',
        color: 'white',
        height: 40,
        borderRadius: 20
    },
    tabActive: {
        backgroundColor: 'rgb(34, 84, 202)',
    },
    bold: {
        fontWeight: '700',
        color: 'white'
    },
    cityImage: {
        width: '100%',
        height: 200
    },
    cityImageContainer: {
        marginTop: 20,
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative'
    },
    logoImage: {
        position: 'absolute',
        left: 10,
        top: 10
    },
    periodTextOnImage: {
        position: 'absolute',
        left: 10,
        bottom: 10
    },
    white: {
        color: 'white',
        fontWeight: '700'
    },
    bettingPanel: {
        backgroundColor: 'rgb(34, 37, 45)',
        color: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 20,
        borderRadius: 10
    },
    betButton: {
        width: 30,
        height: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold'
    },
    bRed: {
        backgroundColor: 'red'
    },
    bGreen: {
        backgroundColor: 'green'
    },
    bViolet: {
        backgroundColor: 'violet'
    },
    colorBetConainter: {
        position: 'relative',
        width: 44,
        height: 44,
        paddingRight: 14,
        paddingTop: 14
    },
    colorBetButton: {
        position: 'absolute',
        borderRadius: 3,
        shadowColor: "red",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.53,
        shadowRadius: 13.97,

        elevation: 21,
    },
    textCenter: {
        textAlign: 'center',
        color: 'white'
    },
    colorBetLine: {
        display: 'flex',
        flexDirection: 'row'
    },
    colorBetPanel: {
        display: 'flex',
        flexDirection: 'row',
        width: '70%',
        justifyContent: 'center'
    },
    justifyContentSpace: {
        justifyContent: 'space-between'
    },
    timerContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    numberPanel: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between'
    },
    bettingHistory: {
        marginTop: 20,
        paddingBottom: 100
    },
    tableHeader: {
        backgroundColor: "rgb(63, 67, 69)",
        color: 'white',
        padding: 10,
        dislay: 'flex',
        flexDirection: 'row'
    },
    periodTableRow: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        color: 'white',
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
    },
    periodTable: {
        backgroundColor: "rgb(34, 37, 45)",
        borderRadius: 5,
        color: 'white',
        padding: 10
    },
    recordButton: {
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
    circle: {
        width: 10,
        height: 10,
        borderRadius: 5
    },
    red: {
        color: 'red'
    },
    greeen: {
        color: 'green'
    },
    violert: {
        color: 'violet'
    },
    tableContainer: {
        backgroundColor: 'rgb(34, 37, 45)',
        borderRadius: 5,
        overflow: 'hidden'
    },
    modalWrapper: {
        widht: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    betHeader: {
        fontSize: 20,
        color: 'white',
        fontWeight: '700',
        borderBottomWidth: 3,
        borderBottomColor: 'white',
        paddingLeft: 30,
        paddingBottom: 10
    },
    modalContainer: {
        backgroundColor: '#22252D',
        paddingVertical: 20,
        marginTop: 100,
        width: '90%',
        marginLeft: '5%',
        borderRadius: 10
    },
    betModalContainer: {
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    contractMoneyContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    contractMoneyActive: {
        textDecorationLine: 'underline'
    },
    contractMoneyTab: {
        marginRight: 20
    },
    contractButton: {
        width: 30,
        height: 30,
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contractInput: {
        width: 200,
        backgroundColor: 'white',
        color: 'black',
        textAlign: 'center'
    },
    modalFooter: {
        borderTopColor: 'white',
        borderTopWidth: 2,
        marginTop: 20,
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        paddingTop: 20
    },
    modalAction: {
        marginRight: 20
    },
    flex2: {
        flex: 1,
        fontSize: 10
    },
    flex1: {
        flex: 3,
        fontSize: 10
    },
    font8: {
        fontSize: 8
    },
    textCenter: {
        textAlign: 'center'
    }
});

export default BetPanel;