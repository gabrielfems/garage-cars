import { Marca } from "./marca";

export class Carro {

    id!: number;
    nome!: string;
    marca!: Marca | null;  

    constructor(id: number, nome: string, marca: Marca | null) {
        this.id = id;
        this.nome = nome;
        this.marca = marca;
    }
}
