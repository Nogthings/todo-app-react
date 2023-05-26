import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from 'swr';
import axiosClient from "../config/axios";
import API_ENDPOINT from "../services/apiRoutes";

export const useAuth = ({ middleware, url }) => {

  const token = localStorage.getItem("AUTH_TOKEN");
  const navigate = useNavigate();

  const { data: user, error, mutate } = useSWR(API_ENDPOINT.USER, () =>
    axiosClient(API_ENDPOINT.USER, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.data)
      .catch(error => {
        throw Error(error?.response?.data?.errors)
      })
  );

  const login = async (datos, setErrores) => {
    try {
      const { data } = await axiosClient.post(API_ENDPOINT.LOGIN, datos)
      localStorage.setItem('AUTH_TOKEN', data.token);
      setErrores([])
      await mutate()
    } catch (error) {
      setErrores(Object.values(error.response.data.errors))
    }
  }

  const registro = async (datos, setErrores) => {
    try {
      const { data } = await axiosClient.post(API_ENDPOINT.REGISTER, datos)
      localStorage.setItem('AUTH_TOKEN', data.token);
      setErrores([])
      await mutate()
    } catch (error) {
      setErrores(Object.values(error.response.data.errors))
    }
    console.log(datos);
  }

  const logout = async () => {
    try {
      await axiosClient.post(API_ENDPOINT.LOGOUT, null, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      localStorage.removeItem('AUTH_TOKEN')
      await mutate(undefined)
    } catch (error) {
      throw Error(error?.response?.data?.errors)
    }
  }

     useEffect(() => {
     if(middleware === 'guest' && url && user) {
         navigate(url);
     }
     if(middleware === 'auth' && user && user.admin){
         navigate('/dashboard');
     }
     if(middleware === 'auth' && user && !user.admin){
        navigate('/');
     }
     if(middleware === 'admin' && error){
         navigate('/auth');
     }
     }, [user, error, middleware, url, navigate])

  return {
    login,
    registro,
    logout,
    user,
    error
  }
}