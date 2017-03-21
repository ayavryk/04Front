export default [
    {
        type: 'icon',
        title: 'Удалить',
        command: 'delete',
        confirm: 'Вы уверены, что хотите удалить текущую позицию? Подтвердите удаление',
        icons: ['fa-trash-o']
    },
    {
        field: 'public',
        type: 'icon',
        title: 'Опубликовать/снять',
        command: 'invert',
        commandUrl: '/admin/command',
        icons: ['fa-eye', 'fa-eye-slash']
    }
];