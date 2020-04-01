mexui.Entry.ListRow = function(list, text)
{
	mexui.Entity.Entry.call(this, list, 1);
	
	this.text				= text;
};
mexui.util.extend(mexui.Entry.ListRow, mexui.Entity.Entry);