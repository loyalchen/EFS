var path = require('path');
var koa = require('koa');
var thunkify = require('thunkify');
var json = require('koa-json');
var Router = require('koa-router');
var views = require('koa-views');
var serve = require('koa-static');


var apiRouter = require('./router/apiRouter');

var app = koa();

app.use(json());

app.use(views('public/view/',{
	map:{
		html:'ejs'
	}
}));

app.use(serve(path.join(__dirname,'public')));

var apiUrlRouter = new Router({
	prefix: '/api'
})

var htmlUrlRouter = new Router();

htmlUrlRouter.get('/',function*(next){
	yield this.render('siCargo');
});

apiUrlRouter.get('/:controllerName/:actionName', function* (next) {
	yield apiRouter.execReq(this.params.controllerName, this.params.actionName, this);
});

app.use(htmlUrlRouter.routes()).use(htmlUrlRouter.allowedMethods());
app.use(apiUrlRouter.routes()).use(apiUrlRouter.allowedMethods());


app.listen(3000);