const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            listaDePersonajes: [],
            listaDePlanetas: [],
            listaDeVehiculos: [],
            listaDeFavoritos: []
        },
        actions: {
            traerPersonajes: async () => {
                try {
                    const result = await fetch("https://www.swapi.tech/api/people");
                    const data = await result.json();
                    const dataPeople = data.results;
                    const personajesDetalles = await Promise.all(
                        dataPeople.map(async (personaje) => {
                            const res = await fetch(`https://www.swapi.tech/api/people/${personaje.uid}`);
                            let detalle = await res.json();
                            let propiedadesPersonaje = {
                                id: detalle.result.uid,
                                name: detalle.result.properties.name,
                                gender: detalle.result.properties.gender,
                                eyeColor: detalle.result.properties.eye_color,
                                hairColor: detalle.result.properties.hair_color,
                                birthYear: detalle.result.properties.birth_year,
                                height: detalle.result.properties.height,
                                skinColor: detalle.result.properties.skin_color
                            };
                            return propiedadesPersonaje;

                        })
                    );
                    setStore({ listaDePersonajes: personajesDetalles });
                } catch (err) {
                    console.error(err);
                }
            },

            traerPlanetas: async () => {
                try {
                    const resultPlanet = await fetch("https://www.swapi.tech/api/planets/");
                    const dataPlanet = await resultPlanet.json();
                    const dataPlanets = dataPlanet.results;

                    const planetasDetalles = await Promise.all(
                        dataPlanets.map(async (planet) => {
                            const res = await fetch(`https://www.swapi.tech/api/planets/${planet.uid}`);
                            let detalle = await res.json();
                            let propiedadesPlaneta = {
                                name: detalle.result.properties.name,
                                climate: detalle.result.properties.climate,
                                population: detalle.result.properties.population,
                                orbitalPeriod: detalle.result.properties.orbital_period,
                                rotationPeriod: detalle.result.properties.rotation_period,
                                diameter: detalle.result.properties.diameter,
                                terrain: detalle.result.properties.terrain,
                                id: detalle.result.uid
                            };
                            return propiedadesPlaneta;
                        })
                    );
                    setStore({ listaDePlanetas: planetasDetalles });
                } catch (err) {
                    console.error(err);
                }
            },

            traerVehiculos: async () => {
                try {
                    const resultVehicle = await fetch("https://www.swapi.tech/api/vehicles/");
                    const dataVehicle = await resultVehicle.json();
                    const dataVehicles = dataVehicle.results;

                    const vehiculosDetalles = await Promise.all(
                        dataVehicles.map(async (vehicle) => {
                            const res = await fetch(`https://www.swapi.tech/api/vehicles/${vehicle.uid}`);
                            let detalle = await res.json();
                            let propiedadesVehiculo = {
                                name: detalle.result.properties.name,
                                cargoCapacity: detalle.result.properties.cargo_capacity,
                                costInCredits: detalle.result.properties.cost_in_credits,
                                created: detalle.result.properties.created,
                                length: detalle.result.properties.length,
                                passengers: detalle.result.properties.passengers,
                                model: detalle.result.properties.model,
                                id: detalle.result.uid
                            };
                            return propiedadesVehiculo;
                        })
                    );
                    setStore({ listaDeVehiculos: vehiculosDetalles });
                } catch (err) {
                    console.error(err);
                }
            },

            addFavorites: (id, type, name, title) => {
                const { listaDeFavoritos } = getStore();
                console.log(listaDeFavoritos)
                if (listaDeFavoritos.length == 0) {
                    const newFavorites = [...listaDeFavoritos, { id, type, name, title }];
                    setStore({ listaDeFavoritos: newFavorites });
                    return 
                }
                const exist = listaDeFavoritos.find(
                    (favorito) => {
                       
                     console.log(favorito.id, id, favorito.type, type)

                       return favorito.id == id && favorito.type == type}
                )
                 console.log(exist)

                if (exist) {
                    const newFavorites = listaDeFavoritos.filter((favorito) => {
                        return (favorito.id !== id && favorito.type !== type)
                    })
                    setStore({
                        listaDeFavoritos: newFavorites
                    })
                } else {
                    const newFavorites = [...listaDeFavoritos, { id, type, name, title }];
                    setStore({ listaDeFavoritos: newFavorites });
                }


                // const foundIndex = listaDeFavoritos.findIndex(
                //     (element) => element.id === id && element.type === type
                // );
                // if (foundIndex !== -1) {
                //     const newFavorites = listaDeFavoritos.filter(
                //         (element, index) => index !== foundIndex
                //     );
                //     setStore({ listaDeFavoritos: newFavorites });
                // } else {
                //     const newFavorites = [...listaDeFavoritos, { id, type, name, title }];
                //     setStore({ listaDeFavoritos: newFavorites });
                // }
            },

            isInFavorites: (id, type) => {
                const { listaDeFavoritos } = getStore();
                return listaDeFavoritos.some(
                    (element) => element.id === id && element.type === type
                );
            },

        }
    };
};

export default getState;