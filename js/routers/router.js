/**
 * Created by ssgonchar on 27.01.2016.
 */

/**
 * Определение таблицы маршрутов и функций обратного вызова для маршрутизатора.
 */
var Workspace = Backbone.Router.extend({
    routes: {
        "": "index",
        "todos(/)": "todosMain",
        "todos/filtered/*filter": "todosSetFilter",
        "*other": "default"
    },

    index: function () {
        console.log("Раздел://главная_страница/");

        this.navigate("todos", {trigger: true, replace: true});
    },

    default: function (other) {
        console.log("Раздел://страница_не_существует/адрес/" + other);

        this.navigate("todos", {trigger: true, replace: true});
    },

    todosMain: function () {
        console.log("Раздел://менеджер_заданий/");

        // Применение указанного фильтра.
        window.app.TodoFilter = '';

        // Генерирование события коллекции filter, вызывающего скрытие/отображение задачи.
        window.app.Todos.trigger('filter');
    },

    todosSetFilter: function (param) {
        console.log("Раздел://менеджер_заданий/фильтр/"+param);
        // Применение указанного фильтра.
        window.app.TodoFilter = param.trim() || '';

        // Генерирование события коллекции filter, вызывающего скрытие/отображение задачи.
        window.app.Todos.trigger('filter');
    }
});
