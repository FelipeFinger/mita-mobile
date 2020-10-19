import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native'
import api from '../services/api';

interface VideoDetailsRouteParams {
    id: number;
}

interface Video {
    id: number;
    titulo: string;
    descricao: string;
    url: string;
}

export default function VideoDetails() {
    const route = useRoute();
    const params = route.params as VideoDetailsRouteParams;
    const [video, setVideo] = useState<Video>();

    useEffect(() => {
        api.get(`videos/adquirir/${params.id}`).then(response => {
            setVideo(response.data);
        })
    }, [params.id]);

    if (!video) {
        return (
            <View style={styles.container}>
                <Text style={styles.description}>Carregando..</Text>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{video.titulo}</Text>

                <Text style={styles.description}>{video.descricao}</Text>

                <RectButton style={styles.contactButton} onPress={() => Linking.openURL(video.url)}>
                    <Feather name="youtube" size={24} color="#FFF" />
                    <Text style={styles.contactButtonText}>Assistir no youtube</Text>
                </RectButton>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    detailsContainer: {
        padding: 24,
    },

    title: {
        color: '#4D6F80',
        fontSize: 30,
        fontFamily: 'Nunito_700Bold',
    },

    description: {
        fontFamily: 'Nunito_600SemiBold',
        color: '#5c8599',
        lineHeight: 24,
        marginTop: 16,
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