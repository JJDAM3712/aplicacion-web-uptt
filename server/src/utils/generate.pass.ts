// generar numeros aleatorios
export const randomPassword = () => {
    const n_min: number = 0;
    const n_max: number = 100000;

    let n: number = Math.floor(Math.random()*(n_max-n_min+1)+n_min);

    return n.toString();
}