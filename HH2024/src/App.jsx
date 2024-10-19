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