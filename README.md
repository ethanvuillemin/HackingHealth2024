# HackingHealth2024
 
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, ProgressBarAndroid, Platform, ProgressViewIOS } from 'react-native';
// Import libraries as needed (see below)


const questions = [
  { text: "Did you enjoy your stay?", type: "yesno" },
  { text: "Rate your comfort level from 1 to 6.", type: "scale", scaleMax: 6 },
  { text: "Did the doctors explain things clearly?", type: "yesno" },
  // ... more questions
];

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const fadeAnim = useRef(new Animated.Value(1)).current; 
  const position = useRef(new Animated.Value(0)).current;

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestionIndex]: answer });
    nextQuestion();
  };


  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {      
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(position, { toValue: -100, duration: 0, useNativeDriver: true }),  // Move off screen
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start();
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Handle quiz completion (e.g., submit data)
      console.log("Quiz finished! Answers:", answers);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(position, { toValue: 100, duration: 0, useNativeDriver: true }), // Move off screen other way
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start();

      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };



  const renderQuestion = () => {
    const question = questions[currentQuestionIndex];
    return (
      <View style={styles.questionContainer}>
        <Text>{question.text}</Text>
        {/* Add answer components based on question type (yes/no, scale, etc.) */}
        {question.type === "yesno" && (
           <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => handleAnswer("yes")}><Text>Yes</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => handleAnswer("no")}><Text>No</Text></TouchableOpacity>
          </View>
        )}
        {question.type === "scale" && (
          // ... scale input component ...
          <View />  // Placeholder
        )}

      </View>
    );
  };



  const ProgressBar = Platform.OS === 'ios' ? ProgressViewIOS : ProgressBarAndroid;


  return (
    <View style={styles.container}>

        <ProgressBar 
          styleAttr="Horizontal" 
          progress={(currentQuestionIndex + 1) / questions.length} 
          indeterminate={false} 
        />

      <Animated.View                 // Animated container
        style={[
          styles.animatedView,
          {
            opacity: fadeAnim,                // Bind opacity
            transform: [{ translateX: position }], // Bind position
          },
        ]}
      >
        {renderQuestion()}
      </Animated.View>



      <View style={styles.bottomButtons}>
        <TouchableOpacity><Text>Trash</Text></TouchableOpacity>
        <TouchableOpacity><Text>Info</Text></TouchableOpacity>
        <TouchableOpacity><Text>Voice</Text></TouchableOpacity>
      </View>
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Align items vertically
    padding: 20,
  },
  animatedView: {  // Style for animated container
    flex: 1,
    justifyContent: 'center', // Center the content vertically within the container
    alignItems: 'center'

  },

  questionContainer: {
    alignItems: 'center',
  },  
    buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },

  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20, // Add some spacing between question and buttons

  },

});

export default App;

Recommended Libraries:

    react-native-gesture-handler: For smooth swipe gestures (left/right navigation). This is crucial for the desired UX on tablets and smartphones.

    react-native-tts: For text-to-speech functionality (reading the question aloud).

    react-native-sound or react-native-audio: For recording voice responses. (Consider privacy implications and parental consent for audio recording from minors).

    react-native-progress: A more customizable and cross-platform progress bar component (instead of relying solely on ProgressBarAndroid and ProgressViewIOS). This will be visually better than the basic Progress components.

    react-native-swiper: If you want a highly optimized component specifically designed for swiping between views, this could simplify your code, but react-native-gesture-handler is more flexible.

    Form library (e.g., formik, react-hook-form): If your quiz becomes more complex, a form library helps manage inputs and validation. Probably not needed in the simple case though.

Key Improvements and Explanations in the Code:

    Swiping: I've set up basic transitions, but you'll need react-native-gesture-handler to make the swiping feel more natural. Look into the PanGestureHandler component.

    Animated Transitions: I added Animated.View and the transition code. This will create fade and translate animations for smoother transitions.

    Progress Bar: Added a basic progress bar. Consider react-native-progress for a nicer-looking one.

    Question Rendering: The renderQuestion function now dynamically renders the appropriate answer input based on the type of question.

    Answer Handling: The handleAnswer function stores the answers in the answers state object.

    Button Styling: The buttons are now aligned nicely in a row at the bottom.

    Comments and Structure: The code is more organized and well-commented to improve readability.

Next Steps:

    Implement Swiping: Use react-native-gesture-handler for proper swipe navigation.

    Text-to-Speech: Integrate react-native-tts.

    Voice Recording: Choose and integrate a sound library and address privacy/consent concerns.

    Scale Input: Create a component to handle scale-based questions (1-6).

    Styling and Design: Refine the UI/UX for a child-friendly experience. Use bright colors, clear fonts, and simple interactions. Consider accessibility guidelines.

    Testing: Thoroughly test on target devices (tablets and smartphones).

    Backend Integration (Optional): If you need to store or analyze the quiz results, you'll need a backend service and a way to send the data from your app.

This revised example should provide a much stronger foundation for your quiz app! Remember to install the necessary libraries: npm install react-native-gesture-handler react-native-tts react-native-sound ... (or yarn).