export function getValidatedObject<T>(source: any, compare: T): Partial<T> {
    const result = {};
    if (source == null || typeof source !== 'object' || Array.isArray(source)) {
        return null;
    }
    Object.keys(source).forEach((key) => {
        const value = source[key];
        const compareValue = compare[key];
        if (value == null || compareValue == null) {
            return;
        }
        const array1 = Array.isArray(value);
        const array2 = Array.isArray(compareValue);
        if (array1 || array2) {
            if (array1 && array2) {
                result[key] = value;
            }
        } else if (typeof value === 'object' && typeof compareValue === 'object') {
            result[key] = getValidatedObject(value, compareValue);
        } else if (typeof value === typeof compareValue) {
            result[key] = value;
        }
    });
    return result;
}

export function getPreviousObject<T>(source: any, compare: T): Partial<T> {
    const result = {};
    if (source == null || typeof source !== 'object') {
        return null;
    }
    Object.keys(source).forEach((key) => {
        const value = source[key];
        const compareValue = compare[key];
        if (value == null || compare[key] == null) {
            return;
        }
        // TODO: Array implementation.
        if (typeof value === 'object' && typeof compareValue === 'object') {
            result[key] = getPreviousObject(value, compareValue);
        } else if (value !== compareValue) {
            result[key] = compareValue;
        }
    });
    return result;
}
