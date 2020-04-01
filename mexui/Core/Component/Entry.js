mexui.Entity.Entry = function(control, axisIndex)
{
	this.control			= control;
	this.axisIndex			= axisIndex;
};

// model
mexui.Entity.Entry.prototype.getEntryIndex = function()
{
	return this.control.axis[this.getAxisKey()].entries.indexOf(this);
};

mexui.Entity.Entry.prototype.getAxisKey = function()
{
	return this.axisIndex == 0 ? 'x' : 'y';
};

// api
mexui.Entity.Entry.prototype.remove = function()
{
	this.control.axis[this.getAxisKey()].entries.splice(this.getEntryIndex(), 1);
	this.control.checkToShowScrollBars();
};

