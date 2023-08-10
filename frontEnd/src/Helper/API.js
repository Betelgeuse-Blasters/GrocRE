import axios from 'axios';

//base url + port + endpoint
//https://axios-http.com/docs/config_defaults
let baseUrl = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_PORT}`;
axios.defaults.withCredentials = true;

let GET_USER_INFO = () => {
    return axios.get(`${baseUrl}/editor/api/login`);
};

let POST_USER_LOGIN = (payload) => {
    return axios.post(`${baseUrl}/auth/login`, payload);
};

let RECIPE_SAVE = (payload) => {
    return axios.post(`${baseUrl}/ai/likeRecipe`, payload);
};

let RECIPE_UNSAVE = (payload) => {
    return axios.post(`${baseUrl}/ai/unlikeRecipe`, payload);
};

let RECIPE_GET = (payload) => {
    return axios.post(`${baseUrl}/ai/getRecipe`, payload);
};

let GET_MEAL = (mealId) => {
    return axios.get(`${baseUrl}/meal/getRecipe?mealID=${mealId}`);
};

let GET_MEALPLANS = () => {
    return axios.get(`${baseUrl}/mealplans`);
};
//http://localhost:3000/mealplans/${selectedMeal.id}/recipe/${meal.id}

let PUT_MEALPLANS = (mealPlanId, mealId) => {
    return axios.put(`${baseUrl}/mealplans/${mealPlanId}/recipe/${mealId}`);
};

let GET_SNS = (count) => {
// axios.get(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_PORT}/sns/posts?count=${posts.length}`, {withCredentials: true}).then((response) => {
    return axios.get(`${baseUrl}/sns/posts?count=${count}`);
};
let POST_SNS = (payload) => {
    return axios.post(`${baseUrl}/sns/posts`, payload);
};

let GET_SNS_LIKES = (postId) => {
    return axios.get(`${baseUrl}/sns/likes?postid=${postId}`);
};

let GET_SNS_SAVE = (mealId) => {
    return axios.get(`${baseUrl}/sns/save?recipeid=${mealId}`);
};

let GET_SNS_MEALS = () => {
    return axios.get(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_PORT}/sns/meals`)
}


export default {
    GET_USER_INFO,
    POST_USER_LOGIN,
    RECIPE_SAVE,
    RECIPE_UNSAVE,
    RECIPE_GET,
    GET_MEAL,
    GET_MEALPLANS,
    PUT_MEALPLANS,
    GET_SNS,
    POST_SNS,
    GET_SNS_LIKES,
    GET_SNS_SAVE,
    GET_SNS_MEALS
}