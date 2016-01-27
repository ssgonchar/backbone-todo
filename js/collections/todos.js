/**
 * Created by ssgonchar on 27.01.2016.
 */

var app = app || {};

/**
 * Коллекция задач.
 * Сохраняет данные в локальном хранилище (для учебного приложения вместо сервера).
 */
var TodoList = Backbone.Collection.extend({
    /**
     * Ссылка на модель коллекции.
     */
    model: app.Todo,

    /**
     * Сохранение всех задач в пространстве имен "todos-backbone".
     * Для работы этого кода требуется библиоттека backbone.localStorage. В случае отсутствия закоментируйте следующую
     * строку.
     */
    localStorage: new Backbone.LocalStorage('todos-backbone'),

    /**
     * Фильтрация завершенных задач.
     * Возвращает массив завершенных задач.
     */
    completed: function () {
        return this.filter(function (todo) {
            return todo.get('completed');
        });
    },

    /**
     * Фильтрация незавершенных задач.
     * Возвращает массив незавершенных задач.
     */
    remaining: function () {
        // Метод apply определяет контекст указателя this в области видимости функции
        return this.without.apply(this, this.completed());
    },

    /**
     * Формирование очереди (генератор последовательных чисел).
     * Генерирует следующий порядковый номер для новых элеентов.
     */
    nextOrder: function () {
        if (!this.length) {
            return 1;
        }
        return this.last().get('order') + 1;
    },

    /**
     * Сортировка задач в порядке ввода.
     */
    comparator: function (todo) {
        return todo.get('order');
    }
});

// Создание глобальной коллекции задач "Todos".
app.Todos = new TodoList();
