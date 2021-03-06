const defaultComparator = (a, b) => {
    if (a > b) {
        return 1;
    }

    if (a < b) {
        return -1;
    }

    return 0;
};

const quickSort = (array, comparator = defaultComparator) => {
    let sortedArray = [...array];

    const recursiveSort = (start, end) => {
        if (end - start < 1) {
            return null;
        }

        const swap = (a, b) => {
            const temp = sortedArray[b];
            sortedArray[b] = sortedArray[a];
            sortedArray[a] = temp;
        };

        const pivotValue = sortedArray[end];
        let splitIndex = start;

        for (let i = start;  i < end; i++) {
            const sortVector = comparator(sortedArray[i], pivotValue);

            if (sortVector === -1) {
                swap(i, splitIndex);

                //Find split where left side < pivotValue, right side > pivotValue;
                //When we did swap - we move virtual cursor;
                splitIndex++;
            }
        }

        //There are we know that splitIndex is the end of subarray;
        sortedArray[end] = sortedArray[splitIndex];
        //splitIndex- is value between biggest ans smallest values - it's mean it's a pivot!
        sortedArray[splitIndex] = pivotValue;


        //Did recursion for 2 new subarrays
        recursiveSort(start, splitIndex - 1);
        recursiveSort(splitIndex + 1, end);
    };

    recursiveSort(0, array.length - 1);

    return sortedArray;
};

const simpleQuickSort = (array) => {
    const pivot = array[Math.floor(array.length / 2)];
    const less = [];
    const greatest = [];
    const pivots = [];

    if (array.length <= 1) {
        return array;
    }

    for (let i = 0; i < array.length; i++) {
        if (array[i] < pivot) {
            less.push(array[i]);
        }

        if (array[i] > pivot) {
            greatest.push(array[i]);
        }

        if (array[i] === pivot) {
            pivots.push(array[i])
        }
    }

    return [
        ...simpleQuickSort(less),
        ...pivots,
        ...simpleQuickSort(greatest)
    ];
};


console.log('Quick sort', quickSort([1, 2, 8, 6, 3, 6, 8]));
console.log('Simple quick sort', simpleQuickSort([1, 2, 8, 6, 3, 6, 6, 6, 6, 8]));

