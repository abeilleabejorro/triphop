$.embedly.defaults.key = '3951a8e29d464d889a3ca0d0ef350fa4';

// Directly
$.embedly.extract('http://embed.ly').progress(function(data){alert(data.title)});

// CSS Selector
$('#someID').embedly();
