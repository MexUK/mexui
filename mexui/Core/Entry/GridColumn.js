mexui.Entry.GridColumn = function(grid, text, width)
{
	mexui.Entity.Entry.call(this, grid, 0);
	
	this.text			= text || 'Column';
	this.width			= width || 100;
};
mexui.util.extend(mexui.Entry.GridColumn, mexui.Entity.Entry);