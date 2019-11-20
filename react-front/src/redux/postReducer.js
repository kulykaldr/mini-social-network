import * as axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        Accept: 'application/json',
    }
});

const SET_POST = 'POST/SET_POST';
const SET_POSTS = 'POST/SET_POSTS';
const SET_IS_LOADING = 'POST/SET_IS_LOADING';
const SET_ERROR = 'POST/SET_ERROR';

const initialState = {
    post: {},
    isLoading: false,
    posts: []
};

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POST:
            return ({
                ...state,
                post: action.post
            });
        case SET_IS_LOADING:
            return ({
                ...state,
                isLoading: action.isLoading
            });
        case SET_ERROR:
            return ({
                ...state,
                posts: action.posts
            });
        case SET_POSTS:
            return ({
                ...state,
                posts: action.posts
            });
        default:
            return state;
    }
};

const setPost = post => ({ type: SET_POST, post });
const setIsLoading = isLoading => ({ type: SET_IS_LOADING, isLoading });
const setError = error => ({ type: SET_ERROR, error });
const setPosts = posts => ({ type: SET_POSTS, posts });

const photoDataToImgUrl = photoData => {
    const base64Flag = `data:${photoData.contentType};base64,`;
    return base64Flag + new Buffer(photoData.data.data, 'binary').toString('base64');
};

const mapEncodingToImgUrl = arr => {
    return arr.map(item => {
        if (item.thumbnail) {
            item.thumbnail = photoDataToImgUrl(item.thumbnail);
        }

        return item;
    })
};

export const getUserPosts = userId => async dispatch => {
    dispatch(setIsLoading(true));
    try {
        const { data, status } = await instance.get(`/posts/by/${userId}`);

        if (status === 200) {
            const posts = mapEncodingToImgUrl(data);

            dispatch(setPosts(posts));
            dispatch(setIsLoading(false));
        }
    } catch(e) {
        dispatch(setIsLoading(false));
        dispatch(setError(e.response.data.error));
    }
};

const createFormData = (body) => {
    const data = new FormData();

    Object.keys(body).forEach(key => {
        data.set(key, body[key]);
    });

    return data;
};

export const createNewPost = (userId, body) => async dispatch => {
    dispatch(setIsLoading(true));
    try {
        const formData = createFormData(body);

        const { data, status } = await instance.post(`/posts/new/${userId}`, formData);

        if (status === 200) {
            dispatch(setPost(data));
            dispatch(setIsLoading(false));
        }
    } catch(e) {
        dispatch(setIsLoading(false));
        dispatch(setError(e.response.data.error));
    }
};

export const getPosts = () => async dispatch => {
    dispatch(setIsLoading(true));
    try {
        const { data, status } = await instance.get('/posts');

        if (status === 200) {
            const posts = mapEncodingToImgUrl(data);
            dispatch(setPosts(posts));
            dispatch(setIsLoading(false));
        }
    } catch(e) {
        dispatch(setIsLoading(false));
        dispatch(setError(e.response.data.error));
    }
};

export const getSinglePost = postId => async dispatch => {
    dispatch(setIsLoading(true));
    try {
        const { data, status } = await instance.get(`/posts/${postId}`);

        if (status === 200) {
            if (data.thumbnail) {
                data.thumbnail = photoDataToImgUrl(data.thumbnail);
            }

            dispatch(setPost(data));
            dispatch(setIsLoading(false));
        }
    } catch(e) {
        dispatch(setIsLoading(false));
        dispatch(setError(e.response.data.error));
    }
};

export const deletePost = postId => async dispatch => {
    try {
        const { status } = await instance.delete(`/posts/${postId}`);

        if (status === 200) {
            dispatch(setPost({}));
        }
    } catch(e) {
        dispatch(setIsLoading(false));
        dispatch(setError(e.response.data.error));
    }
};

export const updatePost = (postId, body) => async dispatch => {
    dispatch(setIsLoading(true));
    try {
        const formData = createFormData(body);

        const { data, status } = await instance.put(`/posts/${postId}`, formData);

        if (status === 200) {
            dispatch(setPost(data));
            dispatch(setIsLoading(false));
        }
    } catch(e) {
        dispatch(setIsLoading(false));
        dispatch(setError(e.response.data.error));
    }
};