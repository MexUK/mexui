mexui.util.createControlConstructor('Month', false, function(window, x, y, w, h, text, styles, callback)
{
	mexui.Control.TextInput.call(this, window, x, y, w, h, text, this.linkControlStyles('Month', styles), callback, false, false);
});
mexui.util.extend(mexui.Control.Month, mexui.Control.TextInput);

// model
mexui.Control.Month.prototype.validateInputCallback = function(e, character)
{
	return mexui.util.isIntChar(character);
};

mexui.Control.Month.prototype.validateValueCallback = function(e)
{
	var _int = parseInt(this.getText());
	
	if(_int < 1 || _int > 12)
		return false;
	
	return true;
};