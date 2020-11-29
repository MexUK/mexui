mexui.util.createControlConstructor('Day', false, function(window, x, y, w, h, text, styles, callback)
{
	mexui.Control.TextInput.call(this, window, x, y, w, h, text, this.linkControlStyles('Day', styles), callback, false, false);
});
mexui.util.extend(mexui.Control.Day, mexui.Control.TextInput);

// model
mexui.Control.Day.prototype.validateInputCallback = function(e, character)
{
	return mexui.util.isIntChar(character);
};

mexui.Control.Day.prototype.validateValueCallback = function(e)
{
	var _int = parseInt(this.getText());
	
	if(_int < 1 || _int > 31)
		return false;
	
	return true;
};