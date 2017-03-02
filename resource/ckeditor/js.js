

/* интерфейс */
setData = function (data) { editor.setData(data) };
onMaximize = null; // переопределяется сверху;
onFocus = null; // переопределяется сверху;
onBlur = null; // переопределяется сверху;

/* установка */
editor = null;
load = function(){
    if (CKEDITOR.env.ie && CKEDITOR.env.version < 9) { }
    CKEDITOR.config.height = this.document.body.offsetHeight - 33;
    CKEDITOR.config.width = 'auto';
    var editorElement = CKEDITOR.document.getById('editor');
    CKEDITOR.replace('editor');
    editor = CKEDITOR.instances.editor;
}

/* перехват событий */
    CKEDITOR.on("instanceReady", function () {
        var btnMaximize =  document.getElementsByClassName('cke_button__maximize')[0];
        var btnMaximizeClick  = btnMaximize.onclick;
        btnMaximize.onclick = function (e) {
            // базовое событие;
            btnMaximizeClick(e);
            // событие родителя;
            if (typeof(onMaximize) == 'function') {onMaximize();}
            return true;
        };
    });


var focus = false;
CKEDITOR.on('currentInstance',function(){
    focus = !focus;
    if (focus) {
        if (onFocus) {
            onFocus();
        }
    }   else {
         if (onBlur) {
            onBlur(CKEDITOR.instances.editor.getData());
        }
    }
})
