import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { RectButton, TextInput } from 'react-native-gesture-handler';
import api from '../services/api';

export default function CreateVideo() {
    const navigation = useNavigation();

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [url, setUrl] = useState('');

    async function handleCreateVideo() {
        const registerVideo = {
            titulo,
            descricao,
            url
        };

        await api.post('videos/salvarlink', registerVideo);

        navigation.navigate('Videos');
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
            <Text style={styles.title}>Dados do vídeo</Text>

            <Text style={styles.label}>Título*</Text>
            <TextInput
                style={styles.input}
                value={titulo}
                onChangeText={setTitulo}
            />

            <Text style={styles.label}>Descrição*</Text>
            <TextInput
                style={[styles.input, { height: 110 }]}
                multiline
                value={descricao}
                onChangeText={setDescricao}
            />

            <Text style={styles.label}>Link do vídeo*</Text>
            <TextInput
                style={styles.input}
                value={url}
                onChangeText={setUrl}
            />

            <RectButton style={styles.nextButton} onPress={handleCreateVideo}>
                <Text style={styles.nextButtonText}>Cadastrar</Text>
            </RectButton>
            <View style={styles.view}></View>
        </ScrollView>
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