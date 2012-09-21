---
layout: default 
title: NYC Greenmarkets locator
exclude: [ Gemfile, Gemfile.lock, LICENSE.txt, README.rdoc, Rakefile, fixtures, index.md ]
---
<script src="fixtures/transformed.json"> </script>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"> </script>
<script src="impl.js"> </script>
<script>
window.onload = function() {
	g = Greenmarket(markets,$("#greenmarkets"));
}
</script>
<form id="greenmarkets">
<a href="#" class="refresh"> Refresh</a>
</form>
