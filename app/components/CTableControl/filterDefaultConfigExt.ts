export default[
    {
        flex: 1,
        type : 'autocomplete',
        placeholder : 'строка поиска',
        name : 'query',
        src : '{server}?method={method}&controller=suggest&query=',
        width : '100%'
    }, {
        name : 'public',
        type : 'select',
        src : [
            {
                0: 'неопубликованные'
            }, {
                1: 'опубликованные'
            }
        ]
    }

];
