import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import VideosMap from './pages/VideosMap';
import VideoDetails from './pages/VideoDetails';
import CreateVideo from './pages/CreateVideo';
import Header from './components/Header';

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
                <Screen
                    name="Videos"
                    component={VideosMap}
                    options={{
                        headerShown: true,
                        header: () => <Header showBack={false} showCancel={false} title="Vídeos" />
                    }}
                />

                <Screen
                    name="VideoDetails"
                    component={VideoDetails}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Vídeo" />
                    }}
                />

                <Screen
                    name="Novo vídeo"
                    component={CreateVideo}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Novo vídeo" />
                    }}
                />
            </Navigator>
        </NavigationContainer>
    );
}