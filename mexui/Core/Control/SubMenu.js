mexui.util.createControlConstructor('SubMenu', false, function(window, entry, x, y, w, h, items, styles, callback)
{
	this.shown			= true;
	this.entry			= entry;
	this.items			= items.slice(0);

	mexui.Control.Menu.call(this, window, x, y, w, h, items, styles, callback);
});
mexui.util.extend(mexui.Control.SubMenu, mexui.Control.Menu);