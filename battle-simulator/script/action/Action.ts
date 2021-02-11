export default interface Action {
    type: string;
    value: string;

    act: () => number;
}