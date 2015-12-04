var koa = require('koa');
var thunkify = require('thunkify');
var json = require('koa-json');
var Router = require('koa-router');
var apiRouter = require('./router/apiRouter');

var app = koa();

app.use(json());

var apiUrlRouter = new Router({
	prefix: '/api'
})

apiUrlRouter.get('/:controllerName/:actionName', function* (next) {
	yield apiRouter.execReq(this.params.controllerName, this.params.actionName, this);
});

app.use(apiUrlRouter.routes()).use(apiUrlRouter.allowedMethods());
// app.use(function*() {
// 	yield execReq(this);
// });



// function* execReq(ctx) {
// 	var method = ctx.method.toUpperCase();
// 	var currentPath = ctx.path;
// 	currentPath = removeBackslash(currentPath);
// 	var valuePair = currentPath.split('/');
// 	if (valuePair.length = 2) {
// 		var controllerName = valuePair[0],
// 			actionName = valuePair[1];
// 		console.log(controllerName);
// 		console.log(actionName);
// 	}

// 	console.log(currentPath);
// 	var execFunc = thunkify(getData);
// 	ctx.body = yield execFunc(ctx);

// }

// function removeBackslash(path) {
// 	var tempPath = path;
// 	if (tempPath.charAt(0) == '/') {
// 		tempPath = tempPath.substring(1);
// 	}

// 	if (tempPath.charAt(tempPath.length - 1) == '/') {
// 		tempPath = tempPath.substring(0, tempPath.length - 2);
// 	}

// 	return tempPath;
// }

// function getData(ctx, callback) {
// 	setTimeout(function () {
// 		callback(null, {
// 			a: "name",
// 			b: "age"
// 		});
// 	}, 2000)
// }

app.listen(3000);