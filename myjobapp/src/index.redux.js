/**
 * Created by liumingyang on 2018/5/2.
 */
const ADD_GUN = '新增设备';
const REMOVE_GUN = '减少设备';

export function counter(state = 0, action) {
	switch (action.type) {
		case ADD_GUN:
			return state + 1
		case REMOVE_GUN:
			return state - 1
		default:
			return 10
	}
}

export function addGun(){
	return {type:ADD_GUN};
}

export function removeGun() {
	return {type: REMOVE_GUN};
}

export function  addThunkAsync() {
	return dispatch=>{
		setTimeout(()=>{
			dispatch(addGun());
		},3000)
	}
}
