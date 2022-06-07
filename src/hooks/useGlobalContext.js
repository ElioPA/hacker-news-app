import { useContext } from "react";
import { PostContext } from "../context/PostContext";

export function useGlobalContext() {
    return useContext(PostContext);
}