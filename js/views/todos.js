/**
 * Created by ssgonchar on 27.01.2016.
 */

/**
 * --------------------------------------------------------------------------------------------------------------------
 * Используется паттерн Контроллер Элементов.
 * Данный паттерн состоит из двух представлений, одно из которых управляет коллекцией элементов (AppView), а второе
 * работает с отдельными элементами (TodoView).
 * --------------------------------------------------------------------------------------------------------------------
 */

var app = app || {};

/**
 * Представление задачи TodoView.
 * Нижний уровень пользовательского интерфейса.
 */
app.TodoView = Backbone.View.extend({
    /**
     * DOM элемент задачи представляет собой тег списка.
     */
    tagName: 'li',

    className: 'list-group-item list-group-item-success',

    /**
     * Кешировании функции шаблона для отдельного элемента.
     */
    template: _.template($('#item-template').html()),

    /**
     * Добавление обработчиков событий.
     */
    events: {
        'click .toggle': 'togglecompleted',
        'dblclick label': 'edit',
        'click .destroy': 'clear',
        'keypress .edit': 'updateOnEnter',
        'blur .edit': 'close'
    },

    /**
     * Вызывается при создании экземпляра.
     * Представление TodoView прослушивает события модели Todo и выполняет повторное отображение.
     * Связь 1 к 1.
     */
    initialize: function () {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
        this.listenTo(this.model, 'visible', this.toggleVisible);
    },

    /**
     * Повторно отображает заголовки задач.
     */
    render: function () {
        if(this.model.get('completed')) {
            this.$el
                .removeClass("list-group-item-success")
                .addClass("list-group-item-default");
        } else {
            this.$el
                .removeClass("list-group-item-default")
                .addClass("list-group-item-success");
        }
        this.$el.html(this.template(this.model.toJSON()));
        this.$el.toggleClass('completed', this.model.get('completed'));
        this.toggleVisible();
        this.$input = this.$('.edit');
        return this;
    },

    /**
     * Переключение видимости элемента.
     */
    toggleVisible: function() {
        this.$el.toggleClass('hidden', this.isHidden());
    },

    /**
     * Определяет должен ли элемент быть виден.
     */
    isHidden: function() {
        var isCompleted = this.model.get('completed');
        return (
            // Только для скрытых:
            (!isCompleted && app.TodoFilter === 'completed')
            || (isCompleted && app.TodoFilter === 'active')
        );
    },

    /**
     * Переключение состояния completed модели.
     */
    togglecompleted: function () {
        this.model.toggle();
    },

    /**
     * Переключение в режим редактирования.
     */
    edit: function() {
        this.$el.addClass('editing');
        this.$input.focus();
    },

    /**
     * Закрытие режима редактирования.
     * Сохранение изменнений.
     */
    close: function() {
        var value = this.$input.val().trim();
        if(value) {
            this.model.save({
                title: value
            });
        } else {
            this.clear();
        }
        this.$el.removeClass('editing');
    },

    /**
     * Завершение редактиования по нажатию ENTER
     */
    updateOnEnter: function(event) {
        if(event.which === ENTER_KEY) {
            this.close();
        }
    },

    /**
     * Удаление элемента, уничтожение модели в локальном хранилище и ее представления.
     */
    clear: function() {
        this.model.destroy();
    }
});
