# Welcome to my Blog

I've been wanting to try my hand at blogging for a very long time and
finally found the time to get started.

My interests are in the physics, IT, electronics, micro-biology and economics.
You'll probably see it reflected in my blogs in future.

Here follows my long list of articles ;-)

{% for article in site.articles %}
* [*{{ article.date | date_to_string }}* » {{ article.title }}]({{ article.url }})
{% endfor %}
