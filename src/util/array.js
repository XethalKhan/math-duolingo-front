
/*
Function to create rows with items for component to display in Grid
list = [1, 2, 3, 4]
size = 2
createRows(list, size) => [[1, 2], [3, 4]]
*/
function createRows(list, size){

	//Array of all rows to display
	let rows = [[]];
	
	//Number of rows to display, because of indexing, start from zero
	let counter = 0;

	//For each element in a list
	list.forEach((course, index) =>{

		//If it is first element in a row, and index is not zero
		if(index % size === 0 && index !== 0){
			//Add new row
			rows.push([]);

			//Increase number of rows by one
			counter++;
		}

		//Add item to its respectable row
		rows[counter].push(course);
	});

	//Return all created rows
	return rows;

}

/*
Check equality of array
*/
function arraysEqual(a, b){
	//If references point to same address, return true
	if (a === b) return true;

	//If either of references is null, return false
	if (a == null || b == null) return false;

	//If length of array is diffrent, return false
	if (a.length !== b.length) return false;

	//For every element in array check equality.
	//Order of elements is important.
	for (let i = 0; i < a.length; ++i){
		//If elements at same index position are diffrent, return false.
		if (a[i] !== b[i]){
			return false;
		}
	}

	return true;
}

/*
Switch element at index a with element at index b inside array arr
*/
function switchElements(arr, a, b){
	let tmp = arr[a];
	arr[a] = arr[b];
	arr[b] = tmp;
}

export {
	createRows,
	arraysEqual,
	switchElements
}