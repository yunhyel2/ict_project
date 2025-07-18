export function fileToBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
    });
}
//동작이 이행이 되면 resolve 함수를, 에러가 발생하면 reject 동작을 수행 한다.

export default {};
