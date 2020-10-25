import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { RectButton, TextInput } from 'react-native-gesture-handler';
import api from '../services/api';
import NumericInput from 'react-native-numeric-input';

export default function CreatePatient() {
    const navigation = useNavigation();

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [profissao, setProfissao] = useState('');
    const [telefone, setTelefone] = useState('');

    const [eva, setEva] = useState(5);

    const [tratamentosComplementares, setTratamentosComplementares] = useState('');
    const [medicamentosUtilizados, setMedicamentosUtilizados] = useState('');
    const [observacoes, setObservacoes] = useState('');

    async function handleCreatePatient() {
        const registerPatient = {
            nome,
            cpf,
            profissao,
            telefone,
            eva,
            tratamentosComplementares,
            medicamentosUtilizados,
            observacoes
        };

        await api.post('pacientes/salvar', registerPatient);

        navigation.navigate('Patients');
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
            <Text style={styles.title}>Dados do paciente</Text>

            <Text style={styles.label}>Nome*</Text>
            <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
            />

            <Text style={styles.label}>CPF*</Text>
            <TextInput
                style={styles.input}
                value={cpf}
                onChangeText={setCpf}
            />

            <Text style={styles.label}>Profissão*</Text>
            <TextInput
                style={styles.input}
                value={profissao}
                onChangeText={setProfissao}
            />

            <Text style={styles.label}>Telefone*</Text>
            <TextInput
                style={styles.input}
                value={telefone}
                onChangeText={setTelefone}
            />

            <Text style={styles.title}>Informações</Text>

            <Text style={styles.label}>Escala Visual Analógica da dor (EVA)*</Text>
            <View style={styles.eva}>
                <NumericInput
                    initValue={eva}
                    onChange={setEva}
                    totalWidth={200}
                    minValue={0}
                    maxValue={10}
                    textColor='#15c3d6'
                    iconStyle={{ color: 'white' }}
                    rightButtonBackgroundColor='#15c3d6'
                    leftButtonBackgroundColor='#15c3d6'
                />
            </View>

            <Text style={styles.title}>Dados adicionais</Text>

            <Text style={styles.label}>Tratamentos complementares</Text>
            <TextInput
                style={[styles.input, { height: 110 }]}
                multiline
                value={tratamentosComplementares}
                onChangeText={setTratamentosComplementares}
            />

            <Text style={styles.label}>Medicamentos utilizados</Text>
            <TextInput
                style={[styles.input, { height: 110 }]}
                multiline
                value={medicamentosUtilizados}
                onChangeText={setMedicamentosUtilizados}
            />

            <Text style={styles.label}>Observações</Text>
            <TextInput
                style={[styles.input, { height: 110 }]}
                multiline
                value={observacoes}
                onChangeText={setObservacoes}
            />

            <RectButton style={styles.nextButton} onPress={handleCreatePatient}>
                <Text style={styles.nextButtonText}>Cadastrar</Text>
            </RectButton>
            <View style={styles.view}></View>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {

        flex: 1,
    },

    title: {
        color: '#5c8599',
        fontSize: 24,
        fontFamily: 'Nunito_700Bold',
        marginBottom: 12,
        paddingBottom: 24,
        borderBottomWidth: 0.8,
        borderBottomColor: '#D3E2E6'
    },

    label: {
        color: '#8fa7b3',
        fontFamily: 'Nunito_600SemiBold',
        marginBottom: 8,
        fontSize: 18
    },

    input: {
        backgroundColor: '#fff',
        borderWidth: 1.4,
        borderColor: '#d3e2e6',
        borderRadius: 20,
        height: 56,
        paddingVertical: 18,
        paddingHorizontal: 24,
        marginBottom: 16,
        textAlignVertical: 'top',
    },

    picker: {
        marginTop: -70,
        marginBottom: -40
    },

    eva: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
    },

    nextButton: {
        backgroundColor: '#15c3d6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        marginTop: 32,
    },

    nextButtonText: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 16,
        color: '#FFF',
    },

    view: {
        height: 140,
    }
})