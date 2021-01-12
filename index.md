# Welcome to my homepage

<div style="display: flex; flex-wrap: wrap; align-items: flex-end;">

{% for article in site.articles %}
<div style="max-width:60mm; text-align:center;">
  <img src="{{ article.url }}.png" width="80%">
  <p>
    <a href="{{ article.url }}">{{ article.title }}</a><br>
    <span style="font-size:smaller; font-style: italic">{{ article.date | date_to_string }}</span>
  </p>
</div>
{% endfor %}

</div>
