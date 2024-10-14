import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
    useSharedValue, 
    useAnimatedStyle, 
    withTiming, 
    Easing 
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  // Shared values for door animation, logo rotation, and position
  const topHalfTranslateY = useSharedValue(-height / 2); // Starts at the top
  const bottomHalfTranslateY = useSharedValue(height / 2); // Starts at the bottom
  const logoRotation = useSharedValue(0); // For rotation
  const logoPositionX = useSharedValue(0); // Initial X position (centered)
  const logoPositionY = useSharedValue(0); // Initial Y position (centered)
  const doorColor = useSharedValue('#ffffff'); // Start with white door color
  const navigation = useNavigation();  // Use the navigation hook

  // Start animation on mount
  useEffect(() => {
    console.log("Welcome to Splash Screen...")
    // Step 1: Door closing animation (move halves towards center)
    topHalfTranslateY.value = withTiming(0, {
      duration: 1000,
      easing: Easing.out(Easing.quad),
    });
    bottomHalfTranslateY.value = withTiming(0, {
      duration: 1000,
      easing: Easing.out(Easing.quad),
    });

    // Change the door color to green once the doors have closed
    setTimeout(() => {
      doorColor.value = withTiming('#28a745', {
        duration: 200,  // Change color smoothly over 200ms
      });
    }, 1000);  // Trigger this once the doors close

    // Step 2: Logo animation after doors close
    setTimeout(() => {
      // First part of logo animation (rotate)
      logoRotation.value = withTiming(180, {  // Adjust rotation angle based on the GIF
        duration: 500, // Slower rotation as per the GIF
        easing: Easing.out(Easing.quad),
      });

      // Move the logo to top-left corner after rotation completes
      setTimeout(() => {
        logoPositionX.value = withTiming(width / 2 - 50, { // Adjust X position for top-left
          duration: 800,  // Smooth movement duration
          easing: Easing.out(Easing.quad),
        });
        logoPositionY.value = withTiming(height / 2 - 100, { // Adjust Y position for top-left
          duration: 800,
          easing: Easing.out(Easing.quad),
        });
      }, 500); // Ensure this happens after the rotation completes

      setTimeout(() => {
        navigation.navigate('LoginScreen');  // Navigate to LoginScreen
      }, 1800);  // Adjust timing as needed to make sure the logo animation completes

    }, 1000); // Trigger logo animation after the door animation ends

    
  }, []);

  // Animated styles for the door halves
  const topHalfStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: topHalfTranslateY.value }],
    backgroundColor: doorColor.value,  // Dynamically change the door color
  }));
  const bottomHalfStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bottomHalfTranslateY.value }],
    backgroundColor: doorColor.value,  // Dynamically change the door color
  }));

  // Animated style for the logo (with correct rotation and movement)
  const logoStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${logoRotation.value}deg` }, // Rotation of 180 degrees
      { translateX: logoPositionX.value },   // Smooth move to top-left corner
      { translateY: logoPositionY.value },
    ],
  }));

  return (
    <View style={styles.container}>
      {/* Top half of the door */}
      <Animated.View style={[styles.half, styles.topHalf, topHalfStyle]} />
      
      {/* Bottom half of the door */}
      <Animated.View style={[styles.half, styles.bottomHalf, bottomHalfStyle]} />

      {/* Logo */}
      <Animated.View style={[styles.logoWrapper, logoStyle]}>
        <Image
          source={require('../images/logo.png')} // Path updated as per your request
          style={styles.logo}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#28a745', // Set the background to green as requested
    overflow: 'hidden',
  },
  half: {
    position: 'absolute',
    width: width,
    height: height / 2,
  },
  topHalf: {
    top: 0,
  },
  bottomHalf: {
    bottom: 0,
  },
  logoWrapper: {
    position: 'absolute',
    width: 100, // Adjust based on your logo size
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default SplashScreen;
