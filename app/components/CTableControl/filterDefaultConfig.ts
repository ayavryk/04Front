export default[
    {
        flex: 1,
        type : 'autocomplete',
        placeholder : 'строка поиска',
        name : 'query',
        src : '/admin/suggest?method={method}&query=',
        width : '100%'
    }, {
        name : 'public',
        type : 'select',
        src : [
            {
                0: 'неопубликованные'
            }, {
                '-1': 'удаленные'
            }
        ]
    }

];
