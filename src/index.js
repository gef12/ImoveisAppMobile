//import React from 'react';

//import Routes from './routes';

//const App = () => <Routes />;

//export default App;

import React from 'react';
import { createAppContainer } from 'react-navigation';
import Routes from './routes';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

MapboxGL.setAccessToken("pk.eyJ1IjoiZ2VmNDgiLCJhIjoiY2p2aDA3MXhtMGRhaTQ5cnp5dXdsMW5iMyJ9.xHXbJ1u_nhipeNTdC_VGag");

const App = createAppContainer(Routes);

export default App;

//entry point