# Welcome to my homepage

{% for article in site.articles %}
<div style="float:left; text-align: center; max-width:50mm">
  <img src="{{ article.url }}.png" width="80%" style="text-align: center">
  <p>
    <a href="{{ article.url }}">{{ article.title }}</a><br>
    <a href="{{ article.url }}" style="font-size:smaller">{{ article.date | date_to_string }}</a>
  </p>
</div>
{% endfor %}
