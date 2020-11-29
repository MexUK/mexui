mexui.util.createControlConstructor('Year', false, function(window, x, y, w, h, text, styles, callback)
{
	mexui.Control.TextInput.call(this, window, x, y, w, h, text, this.linkControlStyles('Year', styles), callback, false, false);
	
	this.maxYearOffset			= 10;
	this.minYearCallback		= ()=>{ return 1900; };
	this.maxYearCallback		= ()=>{ return new Date().getFullYear() + this.maxYearOffset; }
});
mexui.util.extend(mexui.Control.Year, mexui.Control.TextInput);

// model
mexui.Control.Year.prototype.validateInputCallback = function(e, character)
{
	return mexui.util.isIntChar(character);
};

mexui.Control.Year.prototype.validateValueCallback = function(e)
{
	var _int = parseInt(this.getText());
	
	if(_int < this.minYearCallback() || _int > this.maxYearCallback())
		return false;
	
	return true;
};