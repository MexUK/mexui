mexui.Entry.DropDownItem = function(dropDown, text)
{
	mexui.Entity.Entry.call(this, dropDown, 1);
	
	this.text				= text;
};
mexui.util.extend(mexui.Entry.DropDownItem, mexui.Entity.Entry);