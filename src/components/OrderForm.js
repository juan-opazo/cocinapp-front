import React, { useState } from 'react';
import { TextField, Autocomplete, Button, Table, TableBody, TableCell, TableHead, TableRow, Box } from '@mui/material';

const OrderForm = () => {
  const [selectedRecipe, setSelectedRecipe] = useState({});
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const recipes = [
    {
        id: 1,
        label: 'Pizza',
        quantity: 0,
    }, 
    {
        id: 2,
        label: 'Pasta',
        quantity: 0,
    }, 
    {
        id: 3,
        label: 'Salad',
        quantity: 0,
    }
  ];

  const handleSubmit = () => {
    // Logic to handle order submission
    console.log(selectedRecipes);
  };

  const addOrEditLabel = () => {
    if (selectedRecipe && selectedRecipes.find((ele) => ele.id === selectedRecipe.id)) {
        return "Modificar";
    }
    return "Agregar";
  }

  const handleAddOrEditOrderItem = () => {
    if (selectedRecipe && selectedRecipes.find((ele) => ele.id === selectedRecipe.id)) {
        let currentRecipe = selectedRecipes.find((ele) => ele.id === selectedRecipe.id);
        currentRecipe.quantity = quantity;
        setSelectedRecipes([...selectedRecipes]);
    } else if (selectedRecipe && quantity > 0) {
        setSelectedRecipes([...selectedRecipes, { ...selectedRecipe, quantity }]);
    }
  }

  return (
    <Box m={2}>
        <Autocomplete
            options={recipes}
            onChange={(event, value) => setSelectedRecipe(value)}
            renderInput={(params) => <TextField {...params} label="Seleccionar Receta" />}
        />
        <Box m={2} sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <TextField
                label={`Cantidad`}
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
            />
            <Button variant="contained" onClick={() => handleAddOrEditOrderItem()}>{addOrEditLabel()}</Button>
        </Box>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>Receta</TableCell>
                <TableCell>Cantidad</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {selectedRecipes.map((recipe) => (
                <TableRow key={recipe}>
                <TableCell>{recipe.label}</TableCell>
                <TableCell>{recipe.quantity}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        <Box m={2} sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button onClick={handleSubmit} variant="contained" color="success" size="large">Crear</Button>
        </Box>
    </Box>
  );
};

export default OrderForm;
