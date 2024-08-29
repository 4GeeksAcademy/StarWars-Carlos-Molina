import React, { useContext, useEffect } from "react";
import { ItemCard } from "../component/itemCard";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
    const { store, actions } = useContext(Context)
    
    const personajes = store.listaDePersonajes;
    useEffect(() => {
        actions.traerPersonajes();
    }, [])

    const planetas = store.listaDePlanetas;
    useEffect(() => {
        actions.traerPlanetas();
    }, [])

    const vehiculos = store.listaDeVehiculos;
    useEffect(() => {
        actions.traerVehiculos();
    }, [])

console.log(vehiculos)

    return (
        <div className=" body container-fluid">
            <h2 className="text-warning">Personajes</h2>
            <div className="row mb-4">
                {personajes.map((elemento) => (
                    <ItemCard
                        key={elemento.id}
                        title={elemento.name}
                        gender={elemento.gender}
                        hairColor={elemento.hairColor}
                        eyeColor={elemento.eyeColor}
                        type="personajes"
                        id={elemento.id}
                    />)
                )}
            </div>
            <h2 className="text-warning">Planetas</h2>
            <div className="row">
                {planetas.map((elemento) => (
                    <ItemCard
                        key={elemento.id}
                        title={elemento.name}
                        terrain={elemento.terrain}
                        population={elemento.population}
                        type="planetas"
                        id={elemento.id}
                    />)
                )}
            </div>
            <br/>
            <h2 className="text-warning">Vehículos</h2>
            <div className="row">
                {vehiculos.map((elemento) => (
                    <ItemCard
                        key={elemento.id}
                        title={elemento.name}
                        costInCredits={elemento.costInCredits}
                        carga={elemento.cargoCapacity}
                        type="vehiculos"
                        id={elemento.id}
                    />)
                )}
            </div>
        </div>
    )
};