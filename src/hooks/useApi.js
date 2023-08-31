import axios from "axios";
import { useEffect, useState } from "react";

//  GET ALL USERS FROM API
export const useGetUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const gitUsers = async () => {
    return await axios.get("/all_users");
  };
  useEffect(() => {
    gitUsers()
      .then((res) => {
        setUsers(res.data.users);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
        console.log(err.message);
      });
  }, []);
  return { users, loading, error };
};
//  END /////////////////

// GET ALL PRODUCT FROM API //

export const useGetProduct = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProduct = async () => {
    return await axios.get("/all_productes");
  };
  useEffect(() => {
    getProduct()
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
        console.log(err);
      });
  }, []);
  return { product, loading, error };
};
// GET ALL categories // ----------------
 
export const useGetAllCategories =()=>{
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllCategories =async()=>{
    return await axios('/category') 

  }
  useEffect(()=>{
    getAllCategories().then((res)=>{
      setCategories(res.data)
      setLoading(false)
    }).catch((err)=>{
      setError(err)
      console.log(err)
      setLoading(false)
    })
  },[])
  return {categories , loading , error , setCategories}
}