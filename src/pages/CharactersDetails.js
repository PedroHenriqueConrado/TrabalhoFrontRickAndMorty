import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

//--------------------------------------------------------------------------------------------------------------------------------//

const CharacterDetails = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  //--------------------------------------------------------------------------------------------------------------------------------//

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        setCharacter(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do personagem: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [id]);

  //--------------------------------------------------------------------------------------------------------------------------------//

  if (loading) {
    return <Loading>Carregando detalhes do personagem...</Loading>;
  }

  if (!character) {
    return <Error>Nenhum personagem encontrado com o ID: {id}</Error>;
  }

  //--------------------------------------------------------------------------------------------------------------------------------//

  return (
    <Container>
      <GlobalStyle />
      <CharacterCard>
        <CharacterImage src={character.image} alt={character.name} />
        <CharacterName>{character.name}</CharacterName>
        <CharacterInfo>Status: {character.status}</CharacterInfo>
        <CharacterInfo>Espécie: {character.species}</CharacterInfo>
        <CharacterInfo>Gênero: {character.gender}</CharacterInfo>
        <CharacterInfo>Episódios: {character.episode.length}</CharacterInfo>
        <CharacterInfo>Status: {character.status}</CharacterInfo>
        <CharacterInfo>
          Data de criação: {new Date(character.created).toLocaleDateString()}
        </CharacterInfo>
        <CharacterInfo>Origem: {character.origin.name}</CharacterInfo>
        <CharacterInfo>Localização: {character.location.name}</CharacterInfo>
      </CharacterCard>
    </Container>
  );
};

export default CharacterDetails;

//--------------------------------------------------------------------------------------------------------------------------------//

// Styled components
const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
        background: #f0f0f0; /* Cor de fundo padrão */
    }
`;

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const CharacterCard = styled.div`
  background: #2ecc71; /* Cor de fundo do card */
  border-radius: 150px;
  padding: 27px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Sombra */
  transition: transform 0.2s ease-in-out; /* Transição suave para o efeito de hover */
  &:hover {
    transform: scale(1.05); /* Efeito de escala ao passar o mouse */
  }
`;

const CharacterImage = styled.img`
  border-radius: 50%;
  width: 200px;
  height: 200px;
  margin-bottom: 15px;
  border: 5px solid #27ae60; /* Cor da borda */
  transition: transform 0.2s ease-in-out; /* Transição suave */
  &:hover {
    transform: scale(1.2); /* Aumenta o tamanho ao passar o mouse */
  }
`;

const CharacterName = styled.h2`
  font-size: 2em;
  color: #fff; /* Cor do nome do personagem */
  margin-bottom: 10px;
  margin-top: 3px;
`;

const CharacterInfo = styled.p`
  font-size: 1.2em;
  color: #fff; /* Cor do texto das informações */
  margin: 5px 0;
`;

const Loading = styled.div`
  font-size: 1.5em;
  color: #fff; /* Cor do texto de carregamento */
  margin-top: 20px;
`;

const Error = styled.div`
  font-size: 1.5em;
  color: red; /* Cor do texto de erro */
  margin-top: 20px;
`;
