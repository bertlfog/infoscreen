export interface IPlayerConfig {
    competition: string;
    page: string; // 'video', 'ranking', or 'beer_donations'
    id?: string; // Optional ID for the configuration
}