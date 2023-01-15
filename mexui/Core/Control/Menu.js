mexui.util.createControlConstructor('Menu', true, function(window, x, y, w, h, items, styles, callback)
{
	mexui.Component.Control.call(this, window, x, y, w, h, this.linkControlStyles('Menu', styles), callback);
	mexui.Entity.ControlWithEntries.call(this, false, false);
	//mexui.Component.Entry.call(this, this, 1);

	this.axisIndex			= (this instanceof mexui.Control.SubMenu) ? this.entry._menu.axisIndex : 1;
	this.activeItem			= null;
	this.itemLength			= 25;

	items.forEach(item =>
	{
		let text = item;
		this.item(text);
		/*
		if(Array.isArray(item))
		{
			let [text, cb] = item;
			this.item(text, cb);
		}
		else
		{
			let text = item;
			this.item(text);
		}
		*/
	});
});
//mexui.util.extend(mexui.Control.Menu, mexui.Component.Entry);

// default styles
mexui.util.linkBaseControlStyles('Menu', {
	row:
	{
		backgroundColour:	toColour(255, 255, 255, 255),
		textColour:			toColour(0, 0, 0, 255),

		hover:
		{
			backgroundColour:	toColour(0, 255, 255, 255)
		}
	},
	rowLine:
	{
		lineColour:			toColour(0, 0, 0, 150)
	}
});

// input
mexui.Control.Menu.prototype.onMouseDown = function(e)
{
	if(e.button == 0)
	{
		let menu = this.getMenuForCursor();

		if(menu)
		{
			console.log('a');
			let newItem = menu.getAxis().getEntryByCursor();

			if(menu.activeItem == newItem)
			{
				menu.activeItem = null;
				//menu.checkToCallCallback();
			}
			else
			{
				console.log('b');
				menu.activeItem = newItem;
				menu.checkToCallCallback();

				if(newItem.theMenu)
				{
					console.log('c');
					newItem.theMenu.onMouseDown(e);
				}
			}
		}
	}
};

// render
mexui.Control.Menu.prototype.render = function(pos = null)
{
	pos = pos || this.getScreenPosition();
	let pos2 = new Vec2(pos.x, pos.y);
	
	this.renderItems(this.getScreenPosition());

	if(this.isFocused())
		mexui.native.drawRectangleBorder(mexui.util.subtractVec2(pos2,new Vec2(2,2)), mexui.util.addVec2(this.size,new Vec2(3,3)), this.getStyles('focused'));
};

mexui.Control.Menu.prototype.renderItems = function(pos)
{
	let pos2 = new Vec2(pos.x, pos.y);
	let axis = this.getAxis();

	for(var i in axis.entries)
	{
		if((i * this.rowHeight) >= this.size.y)
			break;

		var row = axis.entries[i];
		var rowText = row.text;
		
		mexui.native.drawRectangle(pos, new Vec2(this.size.x, this.itemLength), this.getStyles('row'));
		mexui.native.drawText(pos, new Vec2(this.size.x, this.itemLength), rowText, this.getStyles('row'));
		
		if(this.axisIndex == 0)
			pos.x += this.itemLength;
		else;
			pos.y += this.itemLength;
	}

	pos = new Vec2(pos2.x, pos2.y);

	for(var i in axis.entries)
	{
		if((i * this.rowHeight) >= this.size.y)
			break;

		var row = axis.entries[i];
		
		if(this.axisIndex == 0)
			pos.x += this.itemLength;
		else;
			pos.y += this.itemLength;
		
		mexui.native.drawAALine(pos, new Vec2(pos.x + this.size.x, pos.y), this.getStyles('rowLine'));
	}
	
	let entry = null;
	if(this.activeItem)
	{
		entry = this.activeItem;
	}
	/*
	else if(this.isCursorOverControl())
	{
		entry = this.getAxis().entries[this.getAxis().getEntryIndexByCursor()];
	}
	*/

	if(entry && entry.theMenu)
	{
		entry.theMenu.render(entry.theMenu.position);
	}
};

// model
mexui.Control.Menu.prototype.checkToShowScrollBars = () =>
{
	return false;
};

mexui.Control.Menu.prototype.item = function(text)
{
	var entry = new mexui.Entry.MenuItem(this, text);
	this.getAxis().addEntry(entry);
	return entry;
};

mexui.Control.Menu.prototype.getAxis = function()
{
	return this.axis[this.axisIndex == 0 ? 'x' : 'y'];
};

mexui.Control.Menu.prototype.getSizeForInput = function()
{
	if(this.axisIndex == 0)
	{

	}
	else
	{
		return new Vec2(this.size.x, Math.min(this.getAxis().entries.length * this.itemLength, this.size.y));
	}
};

mexui.Control.Menu.prototype.getEntry = function(entryIndex)
{
	return this.getAxis().entries[entryIndex];
};

mexui.Control.Menu.prototype.isCursorOverSubControl = function()
{
	if(mexui.Component.Control.prototype.isCursorOverControl.call(this))
		return true;
	
	if(this.activeItem && this.activeItem.theMenu)
	{
		return this.activeItem.theMenu.isCursorOverSubControl();
	}

	return false;
};

mexui.Control.Menu.prototype.getMenuForCursor = function()
{
	if(mexui.Component.Control.prototype.isCursorOverControl.call(this))
		return this;
	
	if(this.activeItem && this.activeItem.theMenu)
	{
		return this.activeItem.theMenu.getMenuForCursor();
	}

	return null;
};

