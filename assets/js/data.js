const data_links = "links.json";
$(document).ready(function(){
  $.getJSON(data_links, data => {
      const mysource = $('#links-template').html();
      const mytemplate = Handlebars.compile(mysource);
      const myresult = mytemplate(data)
      $('#links').html(myresult);
  });
});

const data_apps = "apps.json";
$(document).ready(function(){
  $.getJSON(data_apps, data => {
      const mysource = $('#apps-template').html();
      const mytemplate = Handlebars.compile(mysource);
      const myresult = mytemplate(data)
      $('#apps').html(myresult);
  });
});

const data_providers = "providers.json";
$(document).ready(function(){
  $.getJSON(data_providers, data => {
      const mysource = $('#providers-template').html();
      const mytemplate = Handlebars.compile(mysource);
      const myresult = mytemplate(data)
      $('#providers').html(myresult);
  });
});

const data_weather = "weather.json"
$(document).ready(function(){
  $.getJSON(data_weather, data => {
    console.log('setting weather template')
      const mysource = $('#weather-template').html();
      const mytemplate = Handlebars.compile(mysource);
      const myresult = mytemplate(data)
      $('#weather').html(myresult);
      console.log('template set, creating weather')
      getCurrentWeatherCondition(data.latitude, data.longitude)
  });
});
