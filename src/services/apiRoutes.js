const BASE_URL = import.meta.env.VITE_API_URL;

export const API_ENDPOINT ={
  TASKGROUPS: BASE_URL + 'taskgroup',
  TASKS: BASE_URL + 'tasks',
  LOGIN: BASE_URL + 'login',
  USER: BASE_URL + 'user',
  REGISTER: BASE_URL + 'register',
  LOGOUT: BASE_URL + 'logout',
}