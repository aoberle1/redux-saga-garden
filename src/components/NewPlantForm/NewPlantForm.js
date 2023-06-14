import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const NewPlantForm = () => {
    const dispatch = useDispatch();

    //Initial state is an OBJECT, with keys id and name
    // local state variable set to initial value
    let [newPlant, setPlant] = useState({
        name: '',
        kingdom: '',
        clade: '',
        order: '',
        family: '',
        subfamily: '',
        genus: ''
    });


    const handleNameChange = (event, property) => {
        console.log('event happened');
        //Similar to in redux -- we dont want to get rid of the id field when we update name
        setPlant({ ...newPlant, [property]: event.target.value })
    }

    // const handleKingdomChange = (event) => {
    //     setKingdom({...newPlant, kingdom: event.target.value})
    // }

    const addNewPlant = event => {
        event.preventDefault();
        dispatch({ type: 'ADD_PLANT', payload: newPlant });
        //updates the next plant to have a new id
        setPlant({
            name: '',
            kingdom: '',
            clade: '',
            order: '',
            family: '',
            subfamily: '',
            genus: ''
        });
    }
    return (
        <div>
            <h3>This is the form</h3>
            <pre>{JSON.stringify(newPlant)}</pre>
            <form onSubmit={addNewPlant}>
                <input
                    type='text'
                    placeholder='Name'
                    value={newPlant.name}
                    onChange={(event) => handleNameChange(event, 'name')} />
                <br></br>
                <input
                    type='text'
                    placeholder='Kingdom'
                    value={newPlant.kingdom}
                    onChange={(event) => handleNameChange(event, 'kingdom')} />
                <br></br>
                <input
                    type='text'
                    placeholder='Clade'
                    value={newPlant.clade}
                    onChange={(event) => handleNameChange(event, 'clade')} />
                <br></br>
                <input
                    type='text'
                    placeholder='Order'
                    value={newPlant.order}
                    onChange={(event) => handleNameChange(event, 'order')} />
                <br></br>
                <input
                    type='text'
                    placeholder='Family'
                    value={newPlant.family}
                    onChange={(event) => handleNameChange(event, 'family')} />
                <br></br>
                <input
                    type='text'
                    placeholder='Subfamily'
                    value={newPlant.subfamily}
                    onChange={(event) => handleNameChange(event, 'subfamily')} />
                <br></br>
                <input
                    type='text'
                    placeholder='Genus'
                    value={newPlant.genus}
                    onChange={(event) => handleNameChange(event, 'genus')} />

                <input type='submit' value='Add New Plant' />
            </form>
        </div>
    );
}


export default NewPlantForm;
