export interface HomeInitialState {
    colorScheme: 'light' | 'dark';
    lightMode: 'light' | 'dark';
    user_data: boolean | UserState
}

export const initialState: HomeInitialState = {
    colorScheme: 'light',
    lightMode: 'light',
    user_data: false
};

interface UserState {
    id: string,
    email: string,
    full_name: string,
    avatar_url: string
}
