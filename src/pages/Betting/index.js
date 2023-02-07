import { View, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import Header from "./header";
import BetPanel from "./BetPanel";

const Betting = (props) => {
    
    const [betId, setBetId] = useState(0);
    const [period, setPeriod] = useState("");
    const [remain, setRemain] = useState(0);
    const dispatch = useDispatch();

    const getCurrentPeriod = () => {
        axios.post('/bet/current')
            .then(res => {
                setBetId(res.data.id);
                setPeriod(res.data.current_period);
                setRemain(180 - res.data.elapsed);
                dispatch({type: "SET_COIN", payload: res.data.coin})
            });
    }

    useEffect(() => {
        getCurrentPeriod();
    }, []);
    
    useEffect(() => {
        const _remain = remain;
        const timer = remain > 0 && setInterval(() => setRemain(remain - 1), 1000);
        if (_remain == 1)
            getCurrentPeriod();
        return () => clearInterval(timer);
    }, [remain]);

    return <ScrollView style={styles.container}>
        <Header />
        <BetPanel betId={betId} remain={remain} period={period}/>
    </ScrollView>

};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgb(21, 25, 28)",
        color: 'white',
        width: '100%',
        height: '100%',
        paddingVertical: 50,
        paddingHorizontal: 10
    },
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
    }
});

export default Betting;