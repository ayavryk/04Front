export interface IOnChangeParams {
    field: string;
    value: any;
}

export interface IOnChange {
    (params: IOnChangeParams): string;
};
