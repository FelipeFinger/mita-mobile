import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import LandingPage from './pages/LandingPage';
import VideosMap from './pages/VideosMap';
import VideoDetails from './pages/VideoDetails';
import CreateVideo from './pages/CreateVideo';
import PatientsMap from './pages/PatientsMap';
import CreatePatient from './pages/CreatePatient';
import PatientDetails from './pages/PatientDetails';
import PatientSessions from './pages/PatientSessions';
import Header from './components/Header';

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
                <Screen
                    name="LandingPage"
                    component={LandingPage}
                    options={{
                        headerShown: false,
                    }}
                />

                <Screen
                    name="Videos"
                    component={VideosMap}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Vídeos" />
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
                    name="CreateVideo"
                    component={CreateVideo}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Novo vídeo" />
                    }}
                />

                <Screen
                    name="Patients"
                    component={PatientsMap}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Pacientes" />
                    }}
                />

                <Screen
                    name="CreatePatient"
                    component={CreatePatient}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Novo paciente" />
                    }}
                />

                <Screen
                    name="PatientDetails"
                    component={PatientDetails}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Paciente" />
                    }}
                />

                <Screen
                    name="PatientSessions"
                    component={PatientSessions}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Sessões" />
                    }}
                />
            </Navigator>
        </NavigationContainer>
    );
}