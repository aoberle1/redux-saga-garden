import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function PlantList() {
    const dispatch = useDispatch();

    const reduxState = useSelector(store => store.plantList);

    useEffect(() => {
        console.log('component did mount');
        // dispatch an action to request the plantList from the API
        dispatch({ type: 'FETCH_PLANTS' });
    }, []);

const deletePlant = (plantID) => {
    dispatch({ type: 'DELETE_PLANT', payload: plantID})
}

    return (
        <div>
            <h3>This is the plant list</h3>
            <pre>{JSON.stringify((reduxState))}</pre>
            <ul>
                {reduxState.map((plant) => (
                    <form key={plant.id} onSubmit={() => deletePlant(plant.id)}>
                        <li>{plant.name}</li>
                        <input type='submit' value='DELETE' />
                    </form>
                ))}
            </ul>
        </div>
    );
}

export default PlantList;
