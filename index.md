# Welcome to my Blog

This is still an experiment.  Your guess is as good as mine as to how this will turn out :).

Here follows my long list of articles ;-)

{% for article in site.articles %}
* [*{{ article.date | date_to_string }}* » {{ article.title }}]({{ article.url }})
{% endfor %}
