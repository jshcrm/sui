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
