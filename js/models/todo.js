/**
 * Created by ssgonchar on 27.01.2016.
 */

var app = app || {};

/**
 * Модель Задача.
 */
app.Todo = Backbone.Model.extend({
    /**
     * Свойства по умолчанию.
     */
    defaults: {
        title: '',
        completed: false
    },

    /**
     * Переключение состояния задачи "completed".
     */
    toggle: function() {
        this.save({
            completed: !this.get('completed')
        });
    }
});


