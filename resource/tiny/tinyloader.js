
onFocus = null; // переопределяется сверху;
onBlur = null; // переопределяется сверху;
data = 'text';
load = function(data){
    tinymce.init({
    selector: 'textarea',
    height: 500,
    menubar: false,
    plugins: [
        'img2',
       
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table contextmenu paste code' 
    ],
    

    toolbar: 'img2 | code | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    content_css: '//www.tinymce.com/css/codepen.min.css',
    setup: function (editor) {
        editor.on('focus', function (e) {
            if (onFocus) {
                onFocus();
            }
            console.log('Editor got focus!');
        });
        editor.on('blur', function (e) {
            console.log('Editor was blurred!');
            if (onBlur) {
                var data = tinyMCE.activeEditor.getContent();
                onBlur(data);
            }            
        });
        editor.on('init', function (e) {
            if (data) {editor.setContent(data);}
        });
    }
});
}




