import { Text, View } from '@/components/Themed';
import React from "react";
import { Href, Redirect } from "expo-router";
import { useNavigationContainerRef } from "expo-router";
import { StyleSheet } from 'react-native';
//import { LoadingScreen } from "../components/StyleComponents";

// index.tsx, referring to route /

import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();


export default function index() {
  const navigation = useNavigationContainerRef();
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    navigation.getState()
    if (!navigation?.isReady) return;

    setReady(true);
    SplashScreen.hideAsync();
  }, [navigation?.isReady]);

  const hour = new Date().getHours();
  let landingPath: string = '/matins';
  if (hour < 4 || hour > 19) { // 8pm - 4am
    landingPath = '/compline';
  } else if (hour <= 10) { // < 11am
    landingPath = '/matins';
  } else if (hour <= 15) {// < 4pm
    landingPath = '/noon';
  } else if (hour <= 19) { // 8pm
    landingPath = '/vespers';
  }

  if (ready) return <Redirect href={'' + landingPath as Href<'pathname'>} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>For All The Saints - Online</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>A Prayer Book For and By the Church</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '60%',
  },
});