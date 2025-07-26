import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

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
  {
    question: "Quem escreveu a peça 'Romeu e Julieta'?",
    options: [
      "William Shakespeare",
      "Machado de Assis",
      "Carlos Drummond",
      "Clarice Lispector",
    ],
    answer: "William Shakespeare",
  },
  {
    question: "Qual é o elemento químico representado pelo símbolo 'O'?",
    options: ["Ouro", "Oxigênio", "Osmium", "Prata"],
    answer: "Oxigênio",
  },
  {
    question: "Qual país é conhecido como a terra do sol nascente?",
    options: ["China", "Japão", "Coreia do Sul", "Tailândia"],
    answer: "Japão",
  },
  {
    question: "Quantos continentes existem no mundo?",
    options: ["5", "6", "7", "8"],
    answer: "7",
  },
  {
    question: "Qual é o rio mais longo do mundo?",
    options: ["Amazonas", "Nilo", "Yangtzé", "Mississippi"],
    answer: "Nilo",
  },
  {
    question: "Qual é a capital da França?",
    options: ["Berlim", "Paris", "Roma", "Londres"],
    answer: "Paris",
  },
  {
    question: "Quantos lados tem um hexágono?",
    options: ["5", "6", "7", "8"],
    answer: "6",
  },
  {
    question: "Quem foi o primeiro homem a pisar na Lua?",
    options: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "Alan Shepard"],
    answer: "Neil Armstrong",
  },
];

// Imagens associadas às perguntas
const imageMap: { [key: string]: any } = {
  "Quem pintou a Mona Lisa?": require("./assets/monalisa.jpg"),
  "Qual a capital do Brasil?": require("./assets/brasilia.jpg"),
  "Qual é o maior planeta do sistema solar?": require("./assets/jupiter.jpg"),
  "Quem escreveu a peça 'Romeu e Julieta'?": require("./assets/shakespeare.jpg"),
  "Qual é o elemento químico representado pelo símbolo 'O'?": require("./assets/oxigenio.jpg"),
  "Qual país é conhecido como a terra do sol nascente?": require("./assets/japao.jpg"),
  "Quantos continentes existem no mundo?": require("./assets/continentes.jpg"),
  "Qual é o rio mais longo do mundo?": require("./assets/nilo.jpg"),
  "Qual é a capital da França?": require("./assets/paris.jpg"),
  "Quantos lados tem um hexágono?": require("./assets/hexagono.jpg"),
  "Quem foi o primeiro homem a pisar na Lua?": require("./assets/lua.jpg"),
};

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

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
    const isHappy = score > quizQuestions.length / 2;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>NIA</Text>
        </View>
        <Text style={styles.scoreText}>
          Você acertou {score} de {quizQuestions.length}{" "}
          {isHappy ? "😊" : "😞"}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>NIA</Text>
      </View>

      {imageMap[currentQuestion.question] && (
        <Image
          source={imageMap[currentQuestion.question]}
          style={styles.image}
          resizeMode="contain"
        />
      )}

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#ffbf00",
    justifyContent: "flex-start",
  },
  header: {
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 48,
    fontWeight: "900",
    color: "#000",
  },
  questionText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    color: "#000",
  },
  optionButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
  },
  optionText: {
    fontSize: 18,
    textAlign: "center",
    color: "#000",
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
    marginTop: 100,
    color: "#000",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
});
