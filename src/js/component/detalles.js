import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/detalles.css"

export const Detalles = () => {
    const { type, id } = useParams();
    const { store, actions } = useContext(Context);

    useEffect(() => {
        if (store.listaDePersonajes.length === 0) {
            actions.traerPersonajes();
        }
        if (store.listaDePlanetas.length === 0) {
            actions.traerPlanetas();
        }
        if (store.listaDeVehiculos.length === 0) {
            actions.traerVehiculos();
        }
    }, []);

    const personajes = store.listaDePersonajes;
    const planetas = store.listaDePlanetas;
    const vehiculos = store.listaDeVehiculos;

    const personaje = personajes.find((elemento) => elemento.id === id);
    const planeta = planetas.find((elemento) => elemento.id === id);
    const vehiculo = vehiculos.find((elemento) => elemento.id === id);

    const imageUrl = 
    type === "personajes" 
      ? `https://starwars-visualguide.com/assets/img/characters/${id}.jpg` 
      : type === "planetas" 
        ? `https://starwars-visualguide.com/assets/img/planets/${id}.jpg` 
        : type === "vehiculos" 
          ? `https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg` 
          : null;

    return (
        <div className="body  container-fluid">
            <div className="card border border-warning p-3  w-75 d-flex flex-row justify-content-around">
                
                <div className="m-4 d-flex align-items-center">
                    <img src={imageUrl} className="card-img-top" style={{ width: "19rem", margin:"auto" }} alt="cargando..." />
                </div>
                 
                <div className="m-5 d-flex flex-column justify-content-center">
                    <h1 className="card-text text-light">
                        {type === "personajes" ? personaje?.name : planeta?.name}
                        {type === "planetas" ? planeta?.name : vehiculo?.name}
                    </h1>
                    <p className="card-text text-light">
                        Description
                    </p>
                    <div className="card-text text-light border border-warning p-4">
                        {type === "personajes" && personaje && (
                            <>
                                <p><strong>Name:</strong> {personaje.name}</p>
                                <p><strong>Año de Nacimiento:</strong> {personaje.birthYear}</p>
                                <p><strong>Género:</strong> {personaje.gender}</p>
                                <p><strong>Altura:</strong> {personaje.height}</p>
                                <p><strong>Color de Piel:</strong>  {personaje.skinColor}</p>
                                <p><strong>Color de Ojos:</strong> {personaje.eyeColor}</p>
                            </>
                        )}
                        {type === "planetas" && planeta && (
                            <>
                                <p><strong>Name:</strong> {planeta.name}</p>
                                <p><strong>Clima:</strong> {planeta.climate}</p>
                                <p><strong>Población:</strong> {planeta.population}</p>
                                <p><strong>Periodo Orbital:</strong> {planeta.orbitalPeriod}</p>
                                <p><strong>Rotatación Orbital:</strong> {planeta.rotationPeriod}</p>
                                <p><strong>Diámetro:</strong> {planeta.diameter}</p>
                            </>
                        )}
                         {type === "vehiculos" && vehiculo && (
                            <>
                                <p><strong>Name:</strong> {vehiculo.name}</p>
                                <p><strong>Carga:</strong> {vehiculo.cargoCapacity}</p>
                                <p><strong>Precio:</strong> {vehiculo.costInCredits}</p>
                                <p><strong>Tamaño:</strong> {vehiculo.length}</p>
                                <p><strong>Pasajeros:</strong> {vehiculo.passengers}</p>
                                <p><strong>Modelo:</strong> {vehiculo.model}</p>
                            </>
                        )}
                    </div>

                </div>
                
            </div>
        </div>
    );
};
