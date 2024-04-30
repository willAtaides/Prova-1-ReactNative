import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import axios from "axios";

const Filmes = () => {
  const [genero, setGenero] = useState("");
  const [filmesEncontrados, setFilmesEncontrados] = useState([]);

  const BuscarFilme = () => {
    axios.get('http://172.24.192.1:3005/filmes/')
    .then(response => {
      const filmes = response.data;
      const filmesFiltrados = filmes.filter(filme => filme.Genre.toLowerCase().includes(genero.toLowerCase()));
      if (filmesFiltrados.length > 0) {
        setFilmesEncontrados(filmesFiltrados);
      } else {
        setFilmesEncontrados([]);
      }
    })
    .catch(error => {
      console.error("Erro ao buscar filmes:", error);
      setFilmesEncontrados([]);
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o gênero do filme em inglês"
        value={genero}
        onChangeText={text => setGenero(text)}
      />
      <Button
        title="Buscar Filmes"
        onPress={BuscarFilme}
      />
      {filmesEncontrados.map((filme, index) => (
        <Text key={index} style={styles.filme}>
          {filme.Title}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  filme: {
    marginTop: 5,
    fontSize: 16,
  },
});

export default Filmes;
