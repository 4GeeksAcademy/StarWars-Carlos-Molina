import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import "../../styles/item.css"


export const ItemCard = ({ title, gender, hairColor, eyeColor, population, terrain, carga, costInCredits, type, id }) => {
  const imageUrl = type === "planetas" && id === "1" 
    ? "https://upload.wikimedia.org/wikipedia/en/thumb/6/6d/Tatooine_%28fictional_desert_planet%29.jpg/220px-Tatooine_%28fictional_desert_planet%29.jpg" 
    : type === "personajes" 
      ? `https://starwars-visualguide.com/assets/img/characters/${id}.jpg` 
      : type === "planetas" 
        ? `https://starwars-visualguide.com/assets/img/planets/${id}.jpg` 
          : type === "vehiculos"
            ? `https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`
              : null;

        const { actions } = useContext(Context);
        const [isFavorited, setIsFavorited] = useState(false);
      
        useEffect(() => {
          setIsFavorited(actions.isInFavorites(id, type));
      }, [id, type, actions]);
      
        const nuevoFavorito = () => {
          actions.addFavorites(id, type, title);
          setIsFavorited(!isFavorited);
        }; 

 //console.log(carga)
 //console.log(costInCredits)
  
 
 return (
    <div className="card m-6 p-3 border border-warning" style={{ width: "18rem" }}>
      <img src={imageUrl} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title text-warning">{title}</h5>
        {gender && <p className="card-text text-light">Género: {gender}</p>}
        {hairColor && <p className="card-text text-light">Color de Pelo: {hairColor}</p>}
        {eyeColor && <p className="card-text text-light">Color de Ojos: {eyeColor}</p>}
        {population && <p className="card-text text-light">Población: {population}</p>}
        {terrain && <p className="card-text text-light">Terreno: {terrain}</p>}
        {carga && <p className="card-text text-light">Carga: {carga}</p>}
        {costInCredits && <p className="card-text text-light">Precio: {costInCredits}</p>}
      </div>
      <div className="d-flex justify-content-between m-2">
        <Link to={`/detalles/${type}/${id}`} className="btn btn-warning">
          See more
        </Link>

        <button onClick={nuevoFavorito} className="btn btn-secondary">{isFavorited ? '❤️' : '🤍'}</button>
      </div>
      
    </div>
  );
};

ItemCard.propTypes = {
  title: propTypes.string.isRequired,
  gender: propTypes.string,
  hairColor: propTypes.string,
  eyeColor: propTypes.string,
  population: propTypes.string,
  terrain: propTypes.string,
  cargoCapacity: propTypes.string,
  price: propTypes.string,
  type: propTypes.string.isRequired,
  id: propTypes.string.isRequired
};