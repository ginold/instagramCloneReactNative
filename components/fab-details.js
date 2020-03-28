import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from '@ui-kitten/components';
import { FloatingAction } from "react-native-floating-action";

export const Fab = () => {
    const actions = [
        {
            text: "Language",
            icon: require("../img/2.jpg"),
            name: "bt_language",
            position: 1
        },
        {
            text: "Location",
            icon: require("../img/3.jpg"),
            name: "bt_room",
            position: 3
        },
        {
            text: "Video",
            icon: <Icon name='edit' style={{ fill: 'white', height: 30, width: 20 }} />,
            name: "bt_videocam",
            position: 4
        }
    ];
    const FloatingIcon = <Icon name='plus' style={{ fill: 'white', height: 30, width: 20 }} />
    return (
        <FloatingAction
            showBackground={false}
            actions={actions}
            color={'orange'}
            textBackground={'rgba(268, 68, 68, 0.6)'}
            overlayColor={'rgba(168, 68, 68, 0.6)'}
            floatingIcon={FloatingIcon}
            onPressItem={name => {
                console.log(`selected button: ${name}`);
            }}
        />
    )
}
const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22
    },
    fab: {
    }
});