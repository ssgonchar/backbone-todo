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
 * Представление AppView.
 * Верхний уровень пользовательского интерфейса.
 */
app.AppView = Backbone.View.extend({
    /**
     *  Подключение скелета приложения из DOM дерева текущего html файла.
     */
    el: "#todoapp",

    /**
     * Шаблон строки статистики.
     */
    statsTemplate: _.template($('#stats-template').html()),

    /**
     * Делегирование событий для создания новых задач и удаления старых.
     */
    events: {

        // Событие нажатия клавиши в инпуте
        'keypress #new-todo': 'createOnEnter',

        // Событие нажатия на кнопку "Удалить завершенные"
        'click #clear-completed': 'clearCompleted',

        // Событие нажатия на чекбокс "Отметить все"
        'click #toggle-all': 'toggleAllComplete'
    },

    /**
     * Вызывается при создании экземпляра.
     * При инициализации мы делаем привязку к соответствующим событиям коллекции Todos, когда ее элементы добавляются
     * или удаляются. Мы начинаем с загрузки существующих задач, которые могли быть сохранены в локальном хранилище.
     */
    initialize: function () {
        this.allCheckbox = this.$('#toggle-all')[0];
        this.$input = this.$('#new-todo');
        this.$footer = this.$('#footer');
        this.$main = this.$('#main');
        this.$list = this.$('#todo-list');

        // Вызвать когда происходит событие коллекции app.Todos.trigger('add').
        this.listenTo(app.Todos, 'add', this.addOne);

        // Вызвать когда происходит событие коллекции app.Todos.trigger('reset').
        // *'reset' - обновляем коллекцию целиком при загрузке данных из локального хранилища
        this.listenTo(app.Todos, 'reset', this.addAll);

        // Вызвать когда происходит событие app.Todos.trigger('change:completed').
        // *'change:completed' - обновляем свойство completed.
        this.listenTo(app.Todos, 'change:completed', this.filterOne);

        // Вызвать когда происходит событие app.Todos.trigger('filter').
        // *filter - событие фильтрации по статусу заданий.
        this.listenTo(app.Todos, 'filter', this.filterAll);
        this.listenTo(app.Todos, 'all', this.render);
        app.Todos.fetch();
    },

    /**
     * Повторное отображение приложения обозначает лишь обновление статистики (счетчиков).
     * Остальная часть приложения не меняется.
     */
    render: function () {
        // Получаем количество завершенных заданий.
        var completed = app.Todos.completed().length;
        // Получаем количество незавершенных заданий.
        var remaining = app.Todos.remaining().length;
        this.$main.show();
        if (app.Todos.length) {
            //this.$list.show();
            this.$footer.show();

            // Обновляем счетчики.
            this.$footer.html(this.statsTemplate({
                completed: completed,
                remaining: remaining
            }));

            // Ищем на панели инструментов кнопку активного фильтра и добавляем класс selected.
            var nav = this.$('#filters a')
                .removeClass('selected')
                .removeClass('active');

            var activeNavButton = {};

            if(nav.filter('[href="#/todos/filtered/' + (app.TodoFilter || '') + '"]').length) {

                activeNavButton = nav.filter('[href="#/todos/filtered/' + (app.TodoFilter || '') + '"]');
            } else if(nav.filter('[href="#/todos/"]').length)  {

                activeNavButton = nav.filter('[href="#/todos/"]');
            } else if(nav.filter('[href="#/todos"]').length)  {

                activeNavButton = nav.filter('[href="#/todos"]');
            }

            activeNavButton.addClass('selected').addClass('active');

        } else {
            // Прячем список заданий и счетчики, если нет добавленных заданий.
            //this.$list.hide();
            this.$footer.hide();
        }
        this.allCheckbox.checked = !remaining;
    },

    /**
     * Добавление в список единственной задачи путем создания представления и добавления в #todo-list
     * Создает экземпляр представления, отображает его и добавляет результирующий элемент в список.
     */
    addOne: function (todo) {
        var view = new app.TodoView({
            model: todo
        });
        $('#todo-list').append(view.render().el);
    },

    /**
     * Одновременное добавление всех элементов в коллекцию Todos.
     * Перебирает все модели, имеющиеся в коллекции на данный момент и и вызывает addOne() для каждой из них.
     */
    addAll: function () {
        this.$('#todo-list').html('');

        // Здесь this - ссылка на представление, поскольку listenTo() неявно перевел контекст обратного вызова на
        // представление при создании привязки.
        app.Todos.each(this.addOne, this);
    },

    // Выполняем событие модели Todo 'visible'
    filterOne: function (todo) {
        todo.trigger('visible');
    },

    // Выполняем событие 'visible' каждой модели в коллекции.
    filterAll: function () {
        app.Todos.each(this.filterOne, this);
    },

    /**
     * Генерирование атрибутов для новой модели.
     */
    newAttributes: function () {
        return {
            title: this.$input.val().trim(),
            order: app.Todos.nextOrder(),
            completed: false
        };
    },

    /**
     * Создание и сохранение новой задачи.
     */
    createOnEnter: function (event) {
        if (event.which !== ENTER_KEY || !this.$input.val().trim()) {
            return;
        }
        app.Todos.create(this.newAttributes());
        this.$input.val('');
    },

    /**
     * Удаление всех завершенных задач.
     * Уничтожение моделей.
     */
    clearCompleted: function () {
        _.invoke(app.Todos.completed(), 'destroy');
        return false;
    },

    /**
     * Помечает все задачи, как завершенные.
     */
    toggleAllComplete: function () {
        var completed = this.allCheckbox.checked;
        app.Todos.each(function (todo) {
            todo.save({
                'completed': completed
            });
        });
    }
});
