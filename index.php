<!DOCTYPE html>
<html lang="en">
  <head>
    <title>CS50 Food</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <link rel="stylesheet" type="html/css" href="static/css/bootstrap.min.css" />
    <link rel="stylesheet" type="html/css" href="static/css/datepicker.css" />
    <link rel="stylesheet" type="html/css" href="static/css/style.css" />
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" src="static/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="static/js/bootstrap-datepicker.js"></script>
    <script type="text/javascript" src="static/js/food.js"></script>
  </head>

  <body>
    <div class="topbar">
      <div class="logo">CS50 Food</div>
      <div id="topbar-border"></div>
    </div>

    <div class="page">

      <div class="navigation">
        <div class="search">
          <input class="search-bar" />
        </div>

        <div class="section calendar">
          <div class="title">Daily Menu</div>
          <div class="content">
            <div class="datepicker"></div>
          </div>
        </div>

        <div class="section dishes">
          <div class="title">Dishes</div>
          <div class="content">
            <div class="dishes">
            </div>
          </div>
        </div>

      </div>

      <div class="content">
        <div class="location">
          <div class="section">Meals</div>
        </div>

        <div class="menu">
          <div class="meals">
          </div>
          <div class="facts">
          </div>
        </div>
      </div>

    </div>
  </body>
</html>