import { useContext } from "react";
import { FavoritesContext } from '../context/FavoritesContext';

export function useFavorites() {
    return useContext(FavoritesContext);
}