export default[
    {
        flex: 1,
        type : 'autocomplete',
        placeholder : 'строка поиска',
        name : 'query',
        src : '{host}/V04?method={method}&controller=suggest&query='
    }
];
