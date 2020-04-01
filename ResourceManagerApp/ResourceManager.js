var resourceManager = {};

resourceManager.window			= null;
resourceManager.grid			= null;

setImmediate(function()
{
	resourceManager.init();
});

resourceManager.init = function()
{
	resourceManager.window = mexui.window(500, 100, 500, 400, 'Resource Manager');
	resourceManager.window.shown = false;
	resourceManager.window.styles.main.backgroundColour = toColour(0, 0, 255, 255);
	
	resourceManager.grid = resourceManager.window.grid(10, 40, 480, 350);
	resourceManager.grid.styles.main.backgroundColour = toColour(255, 80, 20, 255);
	
	resourceManager.grid.column('Name', 200);
	resourceManager.grid.column('Status', 100);
	resourceManager.grid.column('Actions', 180);
	
	for(var i=0,j=20; i<j; i++)
	{
		resourceManager.grid.row(['mexui', 'running', '']);
		
		var button = resourceManager.window.button(315, 40 + ((i+1)*25) + 2, 60, 21, 'Start');
		button.bindTo(resourceManager.grid);
	}
	
	bindKey(SDLK_F1, KEYSTATE_DOWN, function(e)
	{
		var show = !resourceManager.window.shown;
		resourceManager.window.shown = show;
		mexui.setInput(show);
	});
	mexui.setInput(false);
};