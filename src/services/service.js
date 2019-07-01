import axios from 'axios';

class Service{

	constructor(){
	let service = axios.create({});
	this.service = service;
	 }

	get(path,callback){
		return this.service.get(path).then(
			response => callback(response.status,response.data)).catch(err => callback(err.message))
	}
}

export default new Service();