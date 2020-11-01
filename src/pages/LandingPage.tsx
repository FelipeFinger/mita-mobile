import React from 'react';

import { StyleSheet, Text, Image, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ListItem } from 'react-native-elements'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import api from '../services/api';

export default function LandingPage() {

    const navigation = useNavigation();

    function handleNavigateToPatientsMap() {
        navigation.navigate('Patients');
    }

    function handleNavigateToVideosMap() {
        navigation.navigate('Videos');
    }

    return (
        <View style={styles.container}>


            <View style={styles.imagem}>
                <Text style={styles.titulo}>MITA</Text>
                <Text style={styles.descricao}>Mirror Therapy Assistant</Text>
                <Image
                    style={{ width: 300, height: 300, marginBottom: 60 }}
                    source={require('../images/vr.png')}
                />
            </View>

            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={handleNavigateToPatientsMap}>
                    <Feather name="user" size={20} color="#12c3d6" />
                    <Text style={styles.buttonText}>Pacientes</Text>
                </RectButton>

                <RectButton style={styles.button} onPress={handleNavigateToVideosMap}>
                    <Feather name="video" size={20} color="#12c3d6" />
                    <Text style={styles.buttonText}>Videos</Text>
                </RectButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#12c3d6',
        alignItems: 'center',
    },

    imagem: {
        height: '100%',
        alignItems: 'center',
        marginTop: 70
    },

    titulo: {
        color: '#FFF',
        fontFamily: 'Nunito_700Bold',
        fontSize: 40
    },

    descricao: {
        color: '#FFF',
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 26
    },

    buttonText: {
        color: '#12c3d6',
        fontFamily: 'Nunito_700Bold'
    },

    footer: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 32,

        height: 56,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    button: {
        width: 150,
        height: 56,
        backgroundColor: '#FFD700',
        borderRadius: 20,

        justifyContent: 'center',
        alignItems: 'center',
    },

    view: {
        height: 100,
    }
});