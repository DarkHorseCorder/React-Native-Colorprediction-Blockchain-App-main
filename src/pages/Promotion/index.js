import { View, ScrollView, StyleSheet, Text, Dimensions, Image } from "react-native";  

import Dollar from '../../images/meta/dollar.png';
import userImage from '../../images/meta/user.png';

import {
    BarChart,
    ProgressChart,
  } from "react-native-chart-kit";
import { useSelector } from "react-redux";

const chartConfig={
    backgroundColor: "#22252D",
    backgroundGradientFrom: "transparent",
    backgroundGradientTo: "transparent",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
  }

const Promotion = () => {

    const user = useSelector(state => state.auth);
    console.log(user);

    const data = {
        labels: ["Level1", "Level2", "Level3"],
        datasets: [
            {
                data: [user.level1commission, user.level2commission, user.level3commission],
                colors: [
                    (opacity = 1) => 'red',
                    (opacity = 1) => 'green',
                    (opacity = 1) => 'violet',
                ]
            },
        ],
    };
    
    let sum = user.level1subordinates + user.level2subordinates + user.level3subordinates;
    if (sum == 0) sum = 1;
    
    const data1 = {
        labels: ["L1:", "L2:", "L3:"], // optional
        data: [(user.level1subordinates/sum), (user.level2subordinates/sum), (user.level3subordinates/sum)],
        colors: ["red", "green", "violet"],
      };

    return <ScrollView style={styles.container}>
        <Text style={styles.promotionText}>Promotion</Text>
        <View style={styles.coinAmountContainer}>
            <Image source={Dollar} />
            <Text style={[{marginHorizontal: 30}, styles.white, styles.bold]}>Bonus : {user.commission}</Text>
        </View>
        <View style={styles.gray}>
            <BarChart
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
                data={data}
                width={Dimensions.get("window").width * 0.9}
                height={220}
                chartConfig={chartConfig}
                verticalLabelRotation={0}
                fromZero={true}
                withCustomBarColorFromData={true}
                flatColor={true}
            />
        </View>
        <View style={styles.gray}>
            <ProgressChart
                data={data1}
                width={Dimensions.get("window").width * 0.9}
                height={220}
                strokeWidth={16}
                radius={32}
                chartConfig={chartConfig}
                hideLegend={false}
                withCustomBarColorFromData={true}
                style={{paddingLeft: -300}}
            />
        </View>
        <Text style={[styles.bold, styles.white, styles.mt2, styles.totalCommissionText]}>Total Commission: {(user.level1commission + user.level2commission + user.level3commission).toFixed(2)}</Text>
        <View style={styles.mt2}>
            <View style={[styles.topBar, styles.redB]}></View>
            <View style={[styles.gray, styles.levelContainer, {marginTop:0, paddingTop: 10}]}>
                <View style={styles.imageTextContainer}>
                    <Image source={userImage} />
                    <Text style={[styles.white, {marginLeft: 20}]}>Meta People Registration:{user.level1subordinates}</Text>
                </View>
                <View style={styles.imageTextContainer}>
                    <Image source={userImage} />
                    <Text style={[styles.white, {marginLeft: 20}]}>Meta People Registration:2</Text>
                </View>
                <View style={styles.imageTextContainer}>
                    <Image source={Dollar} />
                    <Text style={[styles.white, {marginLeft: 20}]}>Meta Boom Commission:{user.level1commission}</Text>
                </View>
            </View>
        </View>
        <View style={styles.mt2}>
            <View style={[styles.topBar, styles.greenB]}></View>
            <View style={[styles.gray, styles.levelContainer, {marginTop:0, paddingTop: 10}]}>
            <View style={styles.imageTextContainer}>
                    <Image source={userImage} />
                    <Text style={[styles.white, {marginLeft: 20}]}>Meta People Registration:{user.level2subordinates}</Text>
                </View>
                <View style={styles.imageTextContainer}>
                    <Image source={userImage} />
                    <Text style={[styles.white, {marginLeft: 20}]}>Meta People Registration:2</Text>
                </View>
                <View style={styles.imageTextContainer}>
                    <Image source={Dollar} />
                    <Text style={[styles.white, {marginLeft: 20}]}>Meta Boom Commission:{user.level2commission}</Text>
                </View>
            </View>
        </View>
        <View style={[styles.mt2, {marginBottom: 40}]}>
            <View style={[styles.topBar, styles.violetB]}></View>
            <View style={[styles.gray, styles.levelContainer, {marginTop:0, paddingTop: 10}]}>
            <View style={styles.imageTextContainer}>
                    <Image source={userImage} />
                    <Text style={[styles.white, {marginLeft: 20}]}>Meta People Registration:{user.level3subordinates}</Text>
                </View>
                <View style={styles.imageTextContainer}>
                    <Image source={userImage} />
                    <Text style={[styles.white, {marginLeft: 20}]}>Meta People Registration:2</Text>
                </View>
                <View style={styles.imageTextContainer}>
                    <Image source={Dollar} />
                    <Text style={[styles.white, {marginLeft: 20}]}>Meta Boom Commission:{user.level3commission}</Text>
                </View>
            </View>
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
        paddingHorizontal: 10,
    },
    promotionText: {
        color: '#434853',
        fontWeight: '700'
    },
    gray: {
        backgroundColor: '#22252D',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 30,
        borderRadius: 5,
        marginTop: 20
    },
    coinAmountContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    white: {
        color: 'white',
    },
    bold: {
        fontWeight: '700'
    },
    mt2: {
        marginTop: 20
    },
    totalCommissionText: {
        fontSize: 20
    },
    redB: {
        backgroundColor: 'red'
    },
    greenB: {
        backgroundColor: 'green'
    },
    violetB: {
        backgroundColor: 'violet'
    },
    topBar: {
        width: '60%',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        height: 4,
        marginLeft: '20%'
    },
    levelContainer: {
        padding: 20
    },
    imageTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        borderColor: 'transparent',
        paddingBottom: 5,
        borderBottomColor: 'white',
        borderWidth: 1,
        marginTop: 15
    }
});

export default Promotion;