import React, { useState } from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ListItem } from 'react-native-elements'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import api from '../services/api';

interface Video {
    id: number;
    titulo: string;
}

export default function VideosMap() {
    const [videos, setVideos] = useState<Video[]>([]);
    const navigation = useNavigation();

    useFocusEffect(() => {
        api.get('videos/adquirir').then(response => {
            setVideos(response.data);
        })
    });

    function handleNavigateToVideoDetails(id: number) {
        navigation.navigate('VideoDetails', { id });
    }

    function handleNavigateToCreateVideo() {
        navigation.navigate('Novo vídeo');
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.body}>
                    {videos.map(video => {
                        return (
                            <TouchableOpacity key={video.id} style={styles.item} onPress={() => handleNavigateToVideoDetails(video.id)}>
                                <Feather name="play-circle" size={30} color="#12c3d6" />
                                <Text style={styles.itemText}>{video.titulo}</Text>
                            </TouchableOpacity>
                        );
                    })}
                    <View style={styles.view}></View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={() => { }}>
                    <Feather name="user" size={20} color="#FFF" />
                    <Text style={styles.buttonText}>Pacientes</Text>
                </TouchableOpacity>

                <RectButton style={styles.button} onPress={handleNavigateToCreateVideo}>
                    <Feather name="plus" size={20} color="#FFF" />
                    <Text style={styles.buttonText}>Novo video</Text>
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