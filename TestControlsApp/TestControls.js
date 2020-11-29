var testControls = {};

testControls.window				= null;
testControls.textArea			= null;

setImmediate(function()
{
	testControls.init();
});

testControls.init = function()
{
	testControls.window = mexui.window(400, 100, 800, 600);
	testControls.window.shown = false;
	
	testControls.integer	= testControls.window.integer(10, 50, 60, 25);
	testControls.year		= testControls.window.year(10, 90, 60, 25);
	testControls.date		= testControls.window.date(10, 130, 150, 25);
	
	
	
	bindKey(SDLK_F5, KEYSTATE_DOWN, function(e)
	{
		var show = !testControls.window.shown;
		testControls.window.shown = show;
		mexui.setInput(show);
	});
};