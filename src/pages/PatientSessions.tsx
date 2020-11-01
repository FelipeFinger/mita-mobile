import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native'
import api from '../services/api';
import NumericInput from 'react-native-numeric-input';

interface PatientSessionsRouteParams {
    id: number;
}

interface Sessoes {
    id: number;
    codigoPaciente: number;
    numeroSessao: number;
    data: string;
    eva: number;
    observacoes: string;
}

interface SessoesDTO {
    nomePaciente: string;
    listaSessoes: Array<Sessoes>;
}

export default function PatientSessions() {
    const route = useRoute();
    const params = route.params as PatientSessionsRouteParams;
    const [sessoes, setSessoes] = useState<SessoesDTO>();
    const [observacoesConteudo, setObservacoesConteudo] = useState('');
    const [exibirObservacoesSessao, setExibirObservacoesSessao] = useState(0);

    const [observacoes, setObservacoes] = useState('');
    const [eva, setEva] = useState(5);

    const [exibirFormulario, setExibirFormulario] = useState(false);
    const [exibirObservacoes, setExibirObservacoes] = useState(false);

    useEffect(() => {
        adquirirSessoes();
    }, [params.id]);

    if (!sessoes) {
        return (
            <View style={styles.container}>
                <Text style={styles.description}>Carregando..</Text>
            </View>
        )
    }

    function adquirirSessoes() {
        api.get(`sessao/adquirir/${params.id}`).then(response => {
            setSessoes(response.data);
        })
    }

    function handleObservacoes(sessao: Sessoes) {
        setExibirObservacoes(true);
        setObservacoesConteudo(sessao.observacoes);
        setExibirObservacoesSessao(sessao.numeroSessao);
    }

    async function handleSubmit() {

        const registerSession = {
            codigoPaciente: params.id,
            data: null,
            eva,
            observacoes
        };

        await api.post('sessao/salvar', registerSession);

        setEva(5);
        setObservacoes('');

        Alert.alert(
            "Informação",
            "Sessão cadastrada com sucesso!",
            [{
                text: "OK", onPress: () => adquirirSessoes()
            }]
        )
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{sessoes.nomePaciente}</Text>

                <RectButton style={styles.button} onPress={() => setExibirFormulario(!exibirFormulario)}>
                    <Feather name="plus-square" size={20} color="#FFF" />
                    <Text style={styles.buttonText}>Lançar nova sessão</Text>
                </RectButton>

                <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 15 }} />

                {exibirFormulario && (
                    <View>
                        <Text style={styles.title}>Informações da sessão</Text>

                        <Text style={styles.label}>Escala Visual Analógica da dor (EVA)*</Text>
                        <View style={styles.eva}>
                            <NumericInput
                                initValue={eva}
                                onChange={setEva}
                                totalWidth={200}
                                minValue={0}
                                maxValue={10}
                                textColor='#15c3d6'
                                rightButtonBackgroundColor='#15c3d6'
                                leftButtonBackgroundColor='#15c3d6'
                            />
                        </View>

                        <Text style={styles.label}>Observações</Text>
                        <TextInput
                            style={[styles.input, { height: 110 }]}
                            multiline
                            value={observacoes}
                            onChangeText={setObservacoes}
                        />

                        <RectButton style={styles.button} onPress={handleSubmit}>
                            <Feather name="plus-circle" size={20} color="#FFF" />
                            <Text style={styles.buttonText}>Cadastrar</Text>
                        </RectButton>

                        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 15 }} />
                    </View>
                )}

                <Text style={styles.title}>Sessões</Text>

                <View>
                    {sessoes.listaSessoes.map(sessao => {
                        return (
                            <TouchableOpacity key={sessao.id} style={styles.item} onPress={() => { handleObservacoes(sessao) }}>
                                <View style={styles.itemLinha}>
                                    <Feather name="calendar" size={20} color="#12c3d6" />
                                    <Text style={styles.itemText}>{sessao.data}</Text>
                                </View>
                                <View style={styles.itemLinha}>
                                    <Feather name="activity" size={20} color="#12c3d6" />
                                    <Text style={styles.itemText}>EVA: {sessao.eva}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {exibirObservacoes && (
                    <View>
                        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 15 }} />

                        <Text style={styles.description}>Observações {exibirObservacoesSessao}ª sessão</Text>

                        <Text style={styles.description}>{observacoesConteudo}</Text>
                    </View>
                )}

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    item: {
        borderTopColor: '#EEE',
        borderStyle: 'solid',
        borderTopWidth: 2,

        padding: 10,
    },

    itemLinha: {
        flexDirection: 'row',
        margin: 2,
    },

    itemText: {
        fontFamily: 'Nunito_700Bold',
        marginLeft: 10
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

    eva: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
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