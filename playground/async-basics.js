console.log('Starting app.');

setTimeout(() => {
	console.log('Hey I\'m running after 2 seconds. Anyone ordered a callback?');
} , 2000);

setTimeout( () => {
	console.log('I\'m faster than the other callback.');
} , 0 );

console.log('Finishing up.');