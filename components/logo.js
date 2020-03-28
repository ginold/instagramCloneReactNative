import React, { Component } from 'react';
import { Layout } from '@ui-kitten/components';
import { StyleSheet, Image } from 'react-native';

class Logo extends Component {
    render() {
        return (
            <Image style={styles.logo} source={require('../img/logo.png')} />
        )
    }
}
const styles = StyleSheet.create({
    logo: {
        width: '30%',
        height: 50,
        resizeMode: 'contain',
    },
});

export default Logo;