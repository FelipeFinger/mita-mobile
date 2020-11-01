import React, { useState } from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ListItem } from 'react-native-elements'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import api from '../services/api';

interface Patient {
    id: number;
    nome: string;
}

export default function PatientsMap() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const navigation = useNavigation();

    useFocusEffect(() => {
        api.get('pacientes/adquirir').then(response => {
            setPatients(response.data);
        })
    });

    function handleNavigateToPatientDetails(id: number) {
        navigation.navigate('PatientDetails', { id });
    }

    function handleNavigateToCreatePatient() {
        navigation.navigate('CreatePatient');
    }

    function handleNavigateToVideosMap() {
        navigation.navigate('Videos');
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    {patients.map(patient => {
                        return (
                            <TouchableOpacity key={patient.id} style={styles.item} onPress={() => handleNavigateToPatientDetails(patient.id)}>
                                <Feather name="user" size={30} color="#12c3d6" />
                                <Text style={styles.itemText}>{patient.nome}</Text>
                            </TouchableOpacity>
                        );
                    })}
                    <View style={styles.view}></View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={handleNavigateToVideosMap}>
                    <Feather name="video" size={20} color="#FFF" />
                    <Text style={styles.buttonText}>Videos</Text>
                </RectButton>

                <RectButton style={styles.button} onPress={handleNavigateToCreatePatient}>
                    <Feather name="plus" size={20} color="#FFF" />
                    <Text style={styles.buttonText}>Novo paciente</Text>
                </RectButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    buttonText: {
        color: '#FFF',
        fontFamily: 'Nunito_700Bold'
    },

    item: {
        borderTopColor: '#EEE',
        borderStyle: 'solid',
        borderTopWidth: 2,

        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },

    itemText: {
        fontFamily: 'Nunito_700Bold',
        marginLeft: 10
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
        backgroundColor: '#12c3d6',
        borderRadius: 20,

        justifyContent: 'center',
        alignItems: 'center',
    },

    view: {
        height: 100,
    }
});