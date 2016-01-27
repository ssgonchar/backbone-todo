/**
 * Created by ssgonchar on 21.01.2016.
 */
//var TodoRouter = Backbone.Router.extend({
//    /**
//     * Определение таблицы маршрутов и функций для этого маршрутизатора.
//     */
//    routes: {
//        /* http://example.com/# */
//        "": "indexRoute",
//
//        /* http://example.com/#about */
//        "about": "showAbout",
//
//        /* http://example.com/#todo/5 */
//        "todo/:id": "viewTodo",
//
//        /* http://example.com/#todo/5/edit */
//        "todo/:id/edit": "editTodo",
//
//        /* http://example.com/#search/job
//         * http://example.com/#search/task/p2
//         **/
//        "search/:query/p:page": "searchTodos",
//
//        /* http://example.com/#todos/5/download/todos.doc */
//        "todos/:id/download/*documentPath": "downloadDocument",
//
//        /* http://example.com/#anything */
//        "*other": "defaultRoute"
//    },
//
//    indexRoute: function () {
//        console.log("Главная страница.");
//    },
//
//    showAbout: function() {
//        console.log("Приложение Todo v1.0.");
//    },
//
//    viewTodo: function(id) {
//        console.log("Просмотр записи. ID документа: "+id+".");
//    },
//
//    editTodo: function(id) {
//        console.log("Редактирование записи. ID документа: "+id+".");
//    },
//
//    searchTodos: function(query, page) {
//        console.log("Поиск. Параметры: "+query+". Страница: "+page+".");
//    },
//
//    downloadDocument: function(id, path) {
//        console.log("Скачивание файла. ID документа: "+id+". Расположение файла: "+path+".");
//    },
//
//    defaultRoute: function(other) {
//        console.log("Вы обратились к несуществующей странице: "+other+".");
//    }
//});

/**
 * Создание экземпляра роутера.
 */
//var myTodoRouter = new TodoRouter();

/**
 * Инициализация класса Backbone.history
 * обрабатывает маршруты и вызывает колбеки.
 */
//Backbone.history.start();

var app = app || {};
var ENTER_KEY = 13;
$(function(){
    // Создание приложения.
    new app.AppView();
});

/**
 * Создание экземпляра роутера.
 */
app.AppRouter = new Workspace();

/**
 * Инициализация класса Backbone.history
 * обрабатывает маршруты и вызывает колбеки.
 */
Backbone.history.start();
