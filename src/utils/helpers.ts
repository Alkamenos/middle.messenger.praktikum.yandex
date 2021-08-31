export function isArray(value: any): value is [] {
    return Array.isArray(value);
}

type PlainObject<T = unknown> = {
    [k in string]: T;
};

export function isPlainObject(value: any): value is PlainObject {
    return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}

export function isArrayOrObject(value: any): value is ([] | PlainObject) {
    return isPlainObject(value) || isArray(value);
}

export function isEqual(lhs: PlainObject, rhs: PlainObject) {
    // Сравнение количества ключей объектов и массивов
    if (Object.keys(lhs).length !== Object.keys(rhs).length) {
        return false;
    }

    for (const [key, value] of Object.entries(lhs)) {
        const rightValue = rhs[key];
        if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
            // Здесь value и rightValue может быть только массивом или объектом
            // И TypeScript это обрабатывает
            if (isEqual(value as {}, rightValue as {})) {
                continue;
            }
            return false;
        }

        if (value !== rightValue) {
            return false;
        }
    }

    return true;
}

export const getAvatarUrl = (link: string) => link ? `https://ya-praktikum.tech/api/v2/resources/${link}` : null