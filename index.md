---
layout: page
title: Index
tagline: Supporting tagline
---
{% include JB/setup %}

ひらとりはやと ([@flatbirdH](https://twitter.com/flatbirdH)) が調べたことを書いていきます。<br>

<h3>Recent Posts</h3>
<ul class="posts">
  {% for post in site.posts limit:7 %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>




