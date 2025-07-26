import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const quizQuestions: Question[] = [
  {
    question: "Qual a capital do Brasil?",
    options: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
    answer: "Brasília",
  },
  {
    question: "Quem pintou a Mona Lisa?",
    options: ["Van Gogh", "Picasso", "Leonardo Da Vinci", "Michelangelo"],
    answer: "Leonardo Da Vinci",
  },
   {
    question: "Qual é o maior planeta do sistema solar?",
    options: ["Terra", "Marte", "Júpiter", "Saturno"],
    answer: "Júpiter",
  },
];

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleOptionPress = (option: string) => {
    setSelectedOption(option);

    if (option === currentQuestion.answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setSelectedOption(null);
      if (currentQuestionIndex + 1 < quizQuestions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  if (showScore) {
    return (
      <View style={styles.container}>
        <Text style={styles.scoreText}>
          Você acertou {score} de {quizQuestions.length}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{currentQuestion.question}</Text>
      {currentQuestion.options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.optionButton,
            selectedOption === option &&
              (option === currentQuestion.answer
                ? styles.correct
                : styles.incorrect),
          ]}
          onPress={() => handleOptionPress(option)}
          disabled={!!selectedOption}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  optionButton: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
  },
  optionText: {
    fontSize: 18,
    textAlign: "center",
  },
  correct: {
    backgroundColor: "green",
  },
  incorrect: {
    backgroundColor: "red",
  },
  scoreText: {
    fontSize: 28,
    textAlign: "center",
  },
});