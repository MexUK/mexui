mexui.Entry.MenuItem = function(menu, text)
{
	mexui.Component.Entry.call(this, menu, 1);
	
	this._menu				= menu;
	this.text				= text;
	this.theMenu			= null;
};
mexui.util.extend(mexui.Entry.MenuItem, mexui.Component.Entry);

// model
mexui.Entry.MenuItem.prototype.menu = function(w, h, items, callback)
{
	let x = this._menu.position.x;
	let y = this._menu.position.y;
	if(this._menu.axisIndex == 0)
	{
		x += this.getEntryIndex() * this._menu.itemLength;
		y += this._menu.size.y;
	}
	else
	{
		x += this._menu.size.x;
		y += this.getEntryIndex() * this._menu.itemLength;
	}
	var entry = new mexui.Control.SubMenu(this._menu.window, this, x, y, w, h, items, this.styles, callback);
	this.theMenu = entry;
	return entry;
};

