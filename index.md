# Welcome to my homepage

{% for article in site.articles %}
<div style="float:left; text-align: center">
  <img src="{{ article.url }}.png" width="80%" style="text-align: center">
  <p><a href="{{ article.url }}">{{ article.date | date_to_string }}* » {{ article.title }}</a></p>
</div>
{% endfor %}
