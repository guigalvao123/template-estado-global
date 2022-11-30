import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleCart, handleCadastro } from "../Router/cordinator";
import CardFruta from "../components/CardFruta";
import frutaria from "../frutaria.json";
import styled from "styled-components";

export default function Mercadinho(props) {
    const { carrinho, setCarrinho, frutas, setFrutas  } = props;
    const navigate = useNavigate();

    function comprar(id) {
        const i = carrinho.findIndex((item) => item.id === id);
        console.log(i);
        if (i !== -1) {
            const novoCarrinho = [...carrinho]
            novoCarrinho[i] = { ...novoCarrinho[i], amount: novoCarrinho[i].amount + 1 };
            setCarrinho(novoCarrinho)
        } else {
            const frutaEncontrada = frutas.find((fruta) => fruta.id === id);
            const novaFruta = { ...frutaEncontrada, amount: 1 };
            const novaLista = [...carrinho, novaFruta];

            setCarrinho(novaLista);
        }

    }
    return (
        <MercadinhoContainer>
            <h1>Mercadinho</h1>
            <button onClick={() => handleCart(navigate)}>Vá para Carrinho </button>
            <button onClick={() => handleCadastro(navigate)}>Cadastro de Frutas </button>
            <FrutasContainer>
                {frutas.map((fruta) => {
                    return <CardFruta key={fruta.id} fruta={fruta} comprar={comprar} />
                })}
            </FrutasContainer>
        </MercadinhoContainer>
    );
}
const FrutasContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
`;
const MercadinhoContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
