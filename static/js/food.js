var Food, 
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

var pad = function(a, b) {
  return (1e15 + a + "").slice(-b);
};

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var categoriesToDiscard = ['from the grille', 'salad bar', 'make or build your own', 'brown rice station', 'made to order bar', 'pasta ala carte', 'production salads', 'sandwich bar', 'bean, whole grain', 'breakfast misc', 'bread,rolls, misc bakery', 'desserts', 'accompaniments & fruit', "today's soup", 'special bars - board menu'];

Food = (function() {

  function Food() {
    var currentDate;
    this.menuContainer = $(".meals");
    this.dishContainer = $(".facts");
    this.dishList = $(".navigation .content .dishes");
    currentDate = new Date();
    currentDate.setHours(currentDate.getHours() - 5);
    this.selectDate(currentDate.getTime());
    this.loadDishList();
  }

  Food.prototype.fetchMenu = function(date) {
    return $.getJSON('http://food.cs50.net/api/1.3/menus?sdt=' + date.getFullYear() + '-' + pad(date.getMonth() + 1, 2) + '-' + pad(date.getDate(), 2) + '&output=json');
  };

  Food.prototype.fetchAllDishes = function() {
    return $.getJSON('http://food.cs50.net/api/1.3/recipes?output=json');
  };

  Food.prototype.fetchNutritionFacts = function(dish) {
    return $.getJSON('http://food.cs50.net/api/1.3/facts?portion=1&recipe=' + dish + '&output=json');
  };

  Food.prototype.fetchDishInfo = function(dish) {
    return $.getJSON('http://food.cs50.net/api/1.3/recipes?id=' + dish + '&output=json');
  };

  Food.prototype.loadDishList = function() {
    var self = this;

    $.when(this.fetchAllDishes()).done(function(dishes) {
      var dish, dishHtml, i, _len;
      for (i = 0, _len = dishes.length; i < _len; i++) {
        dish = dishes[i];
        dishHtml = $("<div />").addClass("dish").click(function() {
          return self.selectDish(dish.id);
        });
        $("<div />").addClass("name").text(dish.name).appendTo(dishHtml);
        dishHtml.appendTo(self.dishList);
      }
    });
  };

  Food.prototype.selectDish = function(dish) {
    var self = this;

    $.when(this.fetchNutritionFacts(dish), this.fetchDishInfo(dish), this.menuContainer.fadeOut(200), this.dishContainer.fadeOut(200)).done(function(newDish, newDishInfo) {
      self.renderDish(newDish[0], newDishInfo[0]);
      self.dishContainer.fadeIn(200);
    });
  };

  Food.prototype.selectDate = function(date) {
    var self = this;
    var newDate = new Date(date);

    newDate.setHours(newDate.getHours() + 5);

    $.when(this.fetchMenu(newDate), this.menuContainer.fadeOut(200), this.dishContainer.fadeOut(200)).done(function(newMenu) {
      self.renderMenu(newMenu[0], newDate);
      self.menuContainer.fadeIn(200);
    });
  };

  Food.prototype.renderMenu = function(menu, date) {
    var dish, dishes, dishesHtml, mealHtml, meals, name, self, i, j, _len, _len1, _ref;
    self = this;

    this.menuContainer.empty();
    $("<div />").addClass("date").text(months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()).appendTo(this.menuContainer);
    meals = {};

    for (i = 0, _len = menu.length; i < _len; i++) {
      dish = menu[i];
      if (!(meals[dish.meal] != null)) { meals[dish.meal] = []; }
      meals[dish.meal].push(dish);
    }

    for (name in meals) {
      dishes = meals[name];
      if (name === "BREAKFAST") { continue; }

      mealHtml = $("<div />").addClass("meal");
      $("<div />").addClass("title").text(name.toLowerCase().capitalize()).appendTo(mealHtml);
      dishesHtml = $("<div />").addClass("dishes");

      for (j = 0, _len1 = dishes.length; j < _len1; j++) {
        dish = dishes[j];
        if (!(_ref = dish.category.toLowerCase(), __indexOf.call(categoriesToDiscard, _ref) >= 0)) {
          $("<div />").addClass("dish").text(dish.name).click(function() {
            return self.selectDish(dish.recipe);
          }).appendTo(dishesHtml);
        }
      }

      dishesHtml.appendTo(mealHtml);
      mealHtml.appendTo(this.menuContainer);
    }
  };

  Food.prototype.renderDish = function(dish, dishInfo) {
    var dishFactHtml, dishFactsHtml, fact, self, i, _len;
    self = this;

    this.dishContainer.empty();

    $("<div />").addClass("name").text(dishInfo[0].name).appendTo(this.dishContainer);
    $("<div />").addClass("ingredients").text(dishInfo[0].ingredients).appendTo(this.dishContainer);

    dishFactsHtml = $("<table />").addClass("facts table table-condensed");
    dishFactHtml = $("<tr />").addClass("fact");
    $("<th />").addClass("fact-name").text("Nutrient").appendTo(dishFactHtml);
    $("<th />").addClass("amount").text("Amount").appendTo(dishFactHtml);
    $("<th />").addClass("percent").text("Percent").appendTo(dishFactHtml);
    dishFactHtml.appendTo(dishFactsHtml);

    for (i = 0, _len = dish.length; i < _len; i++) {
      fact = dish[i];
      dishFactHtml = $("<tr />").addClass("fact");
      $("<td />").addClass("fact-name").text(fact.fact).appendTo(dishFactHtml);
      $("<td />").addClass("amount").text(fact.amount).appendTo(dishFactHtml);
      $("<td />").addClass("percent").text(fact.percent).appendTo(dishFactHtml);
      dishFactHtml.appendTo(dishFactsHtml);
    }

    dishFactsHtml.appendTo(this.dishContainer);
  };

  return Food;

})();

$(window).load(function() {
  var food;
  food = new Food();
  $('.datepicker').datepicker().on('changeDate', function(ev) {
    return food.selectDate(ev.date.valueOf());
  });
});
