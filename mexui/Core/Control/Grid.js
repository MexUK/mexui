mexui.util.createControlConstructor('Grid', true, function(window, x, y, w, h, styles)
{
	mexui.Component.Control.call(this, window, x, y, w, h, this.linkControlStyles('Grid', styles));
	mexui.Entity.ControlWithEntries.call(this, false, false, new Vec2(0, 25), new Vec2(this.size.x, 25), new Vec2(0, -25));
});

// default styles
mexui.util.linkBaseControlStyles('Grid', {
	column:
	{
		lineColour:			toColour(0, 0, 0, 255)
	},
	header:
	{
		backgroundColour:	toColour(255, 255, 255, 255),
		textColour:			toColour(0, 0, 0, 255)
	},
	cell:
	{
		backgroundColour:	toColour(255, 255, 255, 255),
		textColour:			toColour(0, 0, 0, 255)
	},
	row:
	{
		lineColour:			toColour(0, 0, 0, 255)
	}
});

// render
mexui.Control.Grid.prototype.render = function()
{
	var pos = this.getScreenPosition();
	
	mexui.native.drawRectangle(pos, this.size, this.getStyles('main'));
	
	var startX = pos.x;
	for(var i in this.axis.x.entries)
	{
		var column = this.axis.x.entries[i];
		
		mexui.native.drawText(new Vec2(startX, pos.y), new Vec2(column.width, 25), column.text, this.getStyles('header'));
		
		startX += column.width;
		mexui.native.drawAALine(new Vec2(startX, pos.y), new Vec2(startX, pos.y + this.size.y), this.getStyles('column'));
	}
	
	var startY = pos.y + 25;
	mexui.native.drawAALine(new Vec2(pos.x, startY), new Vec2(pos.x + this.size.x, startY), this.getStyles('row'));
	
	for(var i=this.axis.y.getEntryStartIndex(),j=this.axis.y.getEntryEndIndex(); i<j; i++)
	{
		var rowCellsText = this.axis.y.entries[i];
		if(!rowCellsText)
			break;
		
		startX = pos.x;
		
		for(var i2 in rowCellsText)
		{
			var column = this.axis.x.entries[i2];
			var cellText = rowCellsText[i2];
			
			mexui.native.drawText(new Vec2(startX, startY), new Vec2(column.width, 25), cellText, this.getStyles('cell'));
			
			startX += column.width;
		}
		
		startY += 25;
		mexui.native.drawAALine(new Vec2(pos.x, startY), new Vec2(pos.x + this.size.x, startY), this.getStyles('row'));
	}
};

// model
mexui.Control.Grid.prototype.column = function(text, width)
{
	var entry = new mexui.Entry.GridColumn(this, text, width);
	this.axis.x.addEntry(entry);
	return entry;
};

mexui.Control.Grid.prototype.row = function(rowCellsText)
{
	for(var i in rowCellsText)
		rowCellsText[i] = rowCellsText[i] + '';
	this.axis.y.addEntry(rowCellsText);
};

mexui.Control.Grid.prototype.getAllEntriesLength = function(axisIndex)
{
	if(axisIndex == 0)
	{
		return 0;
	}
	else
	{
		return this.axis.y.getAllEntriesLength2();
	}
};

