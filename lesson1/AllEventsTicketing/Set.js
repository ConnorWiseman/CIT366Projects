function Set() {
	
	
	this.intersection = function(listA, listB) {
        if (listA == null || listB == null) {
            return null;
        }

        let resultSet = [];

        for (let i = 0; i < listA.length; i++) {
            for (let j = 0; j < listB.length; j++) {
                if (listA[i] == listB[j]) {
                    resultSet.push(listB[j]);
                    break;
                }
            }


        }

        return resultSet;
	}
    
    
    
	this.union = function(listA, listB) {
        if (listA == null || listB == null) {
            return null;
        }

        return this.symmetricDifference(listA, listB)
            .concat(this.intersection(listA, listB));
	}




	this.relativeComplement = function(listA, listB) {
        if (listA == null || listB == null) {
            return null;
        }

        let resultSet = [];

        for (let i = 0; i < listA.length; i++) {
            let found = false;

            for (let j = 0; j < listB.length; j++) {
                if (listA[i] == listB[j]) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                resultSet.push(listA[i]);
            }
        }

        return resultSet;
	}



	this.symmetricDifference = function(listA, listB) {
        if (listA == null || listB == null) {
            return null;
        }

        return this.relativeComplement(listA, listB)
            .concat(this.relativeComplement(listB, listA));
	}	
	

}
