var getUser = (id, callback) => {
	var user = {
		id : id,
		name: 'Joey'
	}
	setTimeout(()=>{
		callback(user);
	},3000);
	console.log('Retrieving data from DB. JK (I\'m paused)');
	
}

getUser(200, (user)=> {
	console.log(user);
});