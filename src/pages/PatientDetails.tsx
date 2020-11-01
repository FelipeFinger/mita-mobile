import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'
import api from '../services/api';

interface PatientDetailsRouteParams {
    id: number;
}

interface Patient {
    id: number;
    nome: string;
    cpf: string;
    profissao: string;
    telefone: string;
    eva: number;
    evaAtual: number;
    tratamentosComplementares: string;
    medicamentosUtilizados: string;
    observacoes: string;
}

export default function PatientDetails() {
    const route = useRoute();
    const params = route.params as PatientDetailsRouteParams;
    const [patient, setPatient] = useState<Patient>();
    const navigation = useNavigation();

    useEffect(() => {
        api.get(`pacientes/adquirir/${params.id}`).then(response => {
            setPatient(response.data);
        })
    }, [params.id]);

    if (!patient) {
        return (
            <View style={styles.container}>
                <Text style={styles.description}>Carregando..</Text>
            </View>
        )
    }

    function handleNavigateToPatientsSessions(id: number) {
        navigation.navigate('PatientSessions', { id });
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{patient.nome}</Text>

                <Text style={styles.description}>Contato: {patient.telefone}</Text>

                <RectButton style={styles.button} onPress={() => { handleNavigateToPatientsSessions(patient.id) }}>
                    <Feather name="list" size={20} color="#FFF" />
                    <Text style={styles.buttonText}>Sesões do paciente</Text>
                </RectButton>

                <Text style={styles.title}>Dados pessoais</Text>

                <View>
                    <Text style={styles.bold}>Nome: </Text>
                    <Text style={styles.description}>{patient.nome}</Text>
                </View>

                <View>
                    <Text style={styles.bold}>CPF: </Text>
                    <Text style={styles.description}>{patient.cpf}</Text>
                </View>

                <View>
                    <Text style={styles.bold}>Profissão: </Text>
                    <Text style={styles.description}>{patient.profissao}</Text>
                </View>

                <View>
                    <Text style={styles.bold}>Telefone: </Text>
                    <Text style={styles.description}>{patient.telefone}</Text>
                </View>

                <Text style={styles.title}>Informações</Text>

                <View>
                    <Text style={styles.bold}>Escala Visual Analógica da dor (EVA)</Text>
                    <View>
                        <View style={styles.evaInicial}>
                            <Feather name="frown" size={30} color="#15B6D6" />
                            <Text style={styles.description}>Antes do tratamento</Text>
                            <Text style={styles.title}>{patient.eva}</Text>
                        </View>
                        <View style={styles.evaAtual}>
                            <Feather name="smile" size={30} color="#39CC83" />
                            <Text style={styles.description}>Atualmente</Text>
                            <Text style={styles.title}>{patient.evaAtual}</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.title}>Dados adicionais</Text>

                <View>
                    <Text style={styles.bold}>Tratamentos complementares: </Text>
                    <Text style={styles.description}>{patient.tratamentosComplementares}</Text>
                </View>

                <View>
                    <Text style={styles.bold}>Medicamentos utilizados: </Text>
                    <Text style={styles.description}>{patient.medicamentosUtilizados}</Text>
                </View>

                <View>
                    <Text style={styles.bold}>Observações: </Text>
                    <Text style={styles.description}>{patient.observacoes}</Text>
                </View>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    evaInicial: {
        backgroundColor: '#E6F7FB',
        borderColor: '#B3DAE2',
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        marginBottom: 12,
        marginTop: 12
    },

    evaAtual: {
        backgroundColor: '#EDFFF6',
        borderColor: '#A1E9C5',
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center'
    },

    button: {
        marginTop: 16,
        marginBottom: 16,
        width: '90%',
        height: 36,
        backgroundColor: '#12c3d6',
        borderRadius: 10,
        flexDirection: 'row',

        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        marginLeft: 15,
        color: '#FFF',
        fontFamily: 'Nunito_700Bold'
    },

    detailsContainer: {
        padding: 24,
    },

    title: {
        marginTop: 12,
        color: '#4D6F80',
        fontSize: 30,
        fontFamily: 'Nunito_700Bold',
    },

    description: {
        fontFamily: 'Nunito_600SemiBold',
        color: '#5c8599',
        lineHeight: 24,
        marginTop: 5,
        fontSize: 20,
    },

    bold: {
        fontFamily: 'Nunito_700Bold',
        color: '#999',
        lineHeight: 24,
        marginTop: 16,
        fontSize: 17,
    },

    contactButton: {
        backgroundColor: '#12c3d6',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        marginTop: 40,
    },

    contactButtonText: {
        fontFamily: 'Nunito_800ExtraBold',
        color: '#FFF',
        fontSize: 16,
        marginLeft: 16,
    }
})