export class Ride {
    id?: string;
    title?: string;
    start: string;
    end?: string;
    wayPoints?: any[];
}
export const DEFAULT_RIDE_OBJECT: Ride = {
    start: ''
};
