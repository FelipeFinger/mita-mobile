import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
    title: string;
    showBack?: boolean;
}

export default function Header({ title, showBack = true }: HeaderProps) {
    const navigation = useNavigation();

    function handleGoBackToAppHomePage() {
        navigation.navigate('LandingPage');
    }

    return (
        <View style={styles.container}>
            { showBack ? (
                <BorderlessButton onPress={navigation.goBack}>
                    <Feather name="arrow-left-circle" size={24} color="#f9fafc" />
                </BorderlessButton>
            ) : (
                    <View />
                )}

            <Text style={styles.title}>{title}</Text>

            { showBack ? (
                <BorderlessButton onPress={handleGoBackToAppHomePage}>
                    <Feather name="home" size={24} color="#FFF" />
                </BorderlessButton>
            ) : (
                    <View />
                )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#12c3d6',
        borderBottomWidth: 1,
        borderColor: '#dde3f0',
        paddingTop: 44,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    title: {
        fontFamily: 'Nunito_600SemiBold',
        color: '#FFF',
        fontSize: 16
    }
})