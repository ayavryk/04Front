export default[
    {
        flex: 1,
        type : 'autocomplete',
        placeholder : 'строка поиска',
        name : 'query',
        src : '{server}?method={method}&controller=suggest&query='
    }
];
