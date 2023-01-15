mexui.util.createControlConstructor('List', true, function(window, x, y, w, h, items, styles, callback)
{
	mexui.Component.Control.call(this, window, x, y, w, h, this.linkControlStyles('List', styles), callback);
	mexui.Entity.ControlWithEntries.call(this, false, false);
	
	this.activeRow			= null;
	this.rowHeight			= 25;

	items.forEach(item =>
	{
		let text = item;
		this.row(text);
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

// default styles
mexui.util.linkBaseControlStyles('List', {
	row:
	{
		backgroundColour:	toColour(255, 255, 255, 255),
		textColour:			toColour(0, 0, 0, 255)
	},
	rowLine:
	{
		lineColour:			toColour(0, 0, 0, 150)
	}
});

// input
mexui.Control.List.prototype.onMouseDown = function(e)
{
	if(e.button == 0 && this.isCursorOverControl())
	{
		this.activeRow = this.axis.y.getEntryByCursor();
		this.checkToCallCallback();
	}
};

// render
mexui.Control.List.prototype.render = function()
{
	var pos = this.getScreenPosition();
	var pos2 = new Vec2(pos.x, pos.y);
	let i2 = 0;

	for(var i=this.axis.y.getEntryStartIndex(),j=this.axis.y.getEntryEndIndex(); i<j; i++)
	{
		if((++i2 * this.rowHeight) >= this.size.y)
			break;

		var row = this.axis.y.entries[i];
		if(!row)
			break;
		
		var rowText = row.text;
		
		mexui.native.drawRectangle(pos, new Vec2(this.size.x, this.rowHeight), this.getStyles('row'));
		mexui.native.drawText(pos, new Vec2(this.size.x, this.rowHeight), rowText, this.getStyles('row'));
		
		pos.y += this.rowHeight;
	}

	i2 = 0;
	pos = new Vec2(pos2.x, pos2.y);

	for(var i=this.axis.y.getEntryStartIndex(),j=this.axis.y.getEntryEndIndex(); i<j; i++)
	{
		if((++i2 * this.rowHeight) >= this.size.y)
			break;

		var row = this.axis.y.entries[i];
		if(!row)
			break;
		
		pos.y += this.rowHeight;
		mexui.native.drawAALine(pos, new Vec2(pos.x + this.size.x, pos.y), this.getStyles('rowLine'));
	}
	
	if(this.isFocused())
		mexui.native.drawRectangleBorder(mexui.util.subtractVec2(pos2,new Vec2(2,2)), mexui.util.addVec2(this.size,new Vec2(3,3)), this.getStyles('focused'));
};

// model
mexui.Control.List.prototype.row = function(text)
{
	var entry = new mexui.Entry.ListRow(this, text);
	this.axis.y.addEntry(entry);
	return entry;
};

mexui.Control.List.prototype.getSizeForInput = function()
{
	return new Vec2(this.size.x, Math.min(this.axis.y.entries.length * this.rowHeight, this.size.y));
};

