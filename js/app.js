/**
 * Created by ssgonchar on 21.01.2016.
 */

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
