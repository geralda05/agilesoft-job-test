export function ENDPOINT(API:string) {
    return {
        LOGIN: `${API}/auth/login`,
        REFRESH: `${API}/auth/refresh`,
        USER: `${API}/user/me`,
        MOVIES: {
            NEW: `${API}/movies/now_playing`,
            POPULAR: `${API}/movies/popular`,
            DETAIL: (value : string | null) => `${API}/movies/${value}/actors`
        }
    };      
}
