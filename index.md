# Welcome to my homepage

{% for article in site.articles %}
<div style="float:left; text-align:center; max-width:60mm">
  <img src="{{ article.url }}.png" width="80%">
  <p>
    <a href="{{ article.url }}">{{ article.title }}</a><br>
    <span style="font-size:smaller; font-style: italic">{{ article.date | date_to_string }}</span>
  </p>
</div>
{% endfor %}
