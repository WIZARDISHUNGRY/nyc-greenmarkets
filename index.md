---
layout: default 
title: NYC Greenmarkets Locator
exclude: [ Gemfile, Gemfile.lock, LICENSE.txt, README.rdoc, Rakefile, fixtures ]
---
<div class="main" style="display: none">
  <h1 class="title real">{{ page.title }}</h1>
  <h1 class="title fake">{{ page.title }}</h1>
  <div class="toolbar real">
      <a href="#" title="Rescan" class="refresh icon-undo"> </a>
      <span class="vrule no-mobile"> &nbsp; </span>
      <a title="Source code on Github" href="https://github.com/WIZARDISHUNGRY/nyc-greenmarkets" target="_new" class="no-mobile"><span class="icon-github" /></a>
      <a title="Share on Facebook" href="javascript:var%20d=document,f='http://www.facebook.com/share',l=d.location,e=encodeURIComponent,p='.php?src=bm&v=4&i=1195068982&u='+e(l.href)+'&t='+e(d.title);1;try%7Bif%20(!/%5E(.*%5C.)?facebook%5C.%5B%5E.%5D*$/.test(l.host))throw(0);share_internal_bookmarklet(p)%7Dcatch(z)%20%7Ba=function()%20%7Bif%20(!window.open(f+'r'+p,'sharer','toolbar=0,status=0,resizable=0,width=626,height=436'))l.href=f+p%7D;if%20(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else%7Ba()%7D%7Dvoid(0)" class="no-mobile"><span class="icon-facebook"/></a>
      <a title="Tweet this" href="https://twitter.com/share" target="_new" class="no-mobile twitter-share-button" data-lang="en"><span class="icon-twitter" /></a>
      <a title="Mail author" href="mailto:jonathan.williams@gmail.com?subject=NYC+Greenmarkets+Locator"><span class="icon-envelope"/> </a>
  </div>
  <div class="results"> </div>
  <div class="errors">
    <div class="error geo-perm">
      <a href="http://support.google.com/maps/bin/answer.py?hl=en&answer=153807">Please make sure location services are enabled in your browser.</a>
    </div>
    <div class="error geo-missing">
      Your browser doesn't seem to support geolocation. Bummer!
    </div>
  </div>
</div>
<div class="init error">
  <p>
    Loading; make sure you have location services enabled and click "accept" on any requests to share your location.
  </p>
</div>

<div class="credits no-mobile">
  {% include credits.html %}
</div>
